import { Server } from "socket.io";
import { parseCookie } from "cookie";
import { getUserFromToken } from "../middlewares/auth-middleware.js";
import { CustomError } from "../middlewares/error-middleware.js";
import { assertConnected, clearChat, markRead, sendMessage } from "../services/chat-service.js";
import { getConnectionIds, getLastSeen, setLastSeen } from "../services/presence-service.js";
import { sendMessageValidator, userIdValidator } from "../joi-validators/chat-validators.js";

// max chat:send events per socket inside the window
const SEND_LIMIT = 20;
const SEND_WINDOW_MS = 10 * 1000;
// typing events fire often, so remember a confirmed connection for a bit
const TYPING_CACHE_MS = 60 * 1000;

let io = null;

const userRoom = (userId) => `user:${userId}`;

// ==================================== PRESENCE ====================================
// a user is online while they have at least one socket in their room (single server only)
const isOnline = (userId) => (io.sockets.adapter.rooms.get(userRoom(userId))?.size ?? 0) > 0;

// presence is only shared with the user's accepted connections
const emitToConnections = async (userId, event, data) => {
  const ids = await getConnectionIds(userId);
  if (ids.length) io.to(ids.map(userRoom)).emit(event, data);
};

const goOnline = (userId) =>
  emitToConnections(userId, "presence:online", { userId }).catch(console.error);

const goOffline = async (userId) => {
  try {
    const lastSeenAt = new Date();
    await setLastSeen(userId, lastSeenAt);
    await emitToConnections(userId, "presence:offline", { userId, lastSeenAt });
  } catch (error) {
    console.error(error);
  }
};

// ==================================== HANDSHAKE AUTH ====================================
const authenticateSocket = async (socket, next) => {
  try {
    const cookies = parseCookie(socket.handshake.headers.cookie ?? "");
    const { user, payload } = await getUserFromToken(cookies.token);

    if (!user.isProfileCompleted) {
      throw new CustomError("please, complete your profile first", 403);
    }

    socket.data.userId = user._id.toString();
    socket.data.tokenExp = payload.exp;
    next();
  } catch (error) {
    const err = new Error(
      error instanceof CustomError ? error.message : "invalid session, please signin!",
    );
    err.data = { statusCode: error.statusCode ?? 401 };
    next(err);
  }
};

// wraps an event handler: validates session, catches errors and replies through the ack
const handle = (socket, handler) => async (payload, ack) => {
  const reply = typeof ack === "function" ? ack : () => {};

  try {
    if (socket.data.tokenExp && Date.now() >= socket.data.tokenExp * 1000) {
      socket.disconnect(true);
      return;
    }
    const data = await handler(payload ?? {});
    reply({ success: true, ...data });
  } catch (error) {
    const isKnown = error instanceof CustomError;
    if (!isKnown) console.error(error);
    reply({ success: false, message: isKnown ? error.message : "something went wrong" });
  }
};

// ==================================== CONNECTION ====================================
const onConnection = (socket) => {
  const { userId, tokenExp } = socket.data;
  socket.join(userRoom(userId));

  // first tab/device of this user - tell their connections
  if (io.sockets.adapter.rooms.get(userRoom(userId))?.size === 1) goOnline(userId);

  // drop the socket when the jwt expires
  const expiryTimer = tokenExp
    ? setTimeout(() => socket.disconnect(true), Math.max(tokenExp * 1000 - Date.now(), 0))
    : null;

  const sendTimestamps = [];
  const typingAllowed = new Map();

  socket.on(
    "chat:send",
    handle(socket, async ({ toUserId, text }) => {
      const now = Date.now();
      while (sendTimestamps.length && now - sendTimestamps[0] > SEND_WINDOW_MS) {
        sendTimestamps.shift();
      }
      if (sendTimestamps.length >= SEND_LIMIT) {
        throw new CustomError("you are sending messages too fast", 429);
      }
      sendTimestamps.push(now);

      const { error, value } = sendMessageValidator({ userId: toUserId, text });
      if (error) throw new CustomError(error, 400);

      const message = await sendMessage(userId, value.userId, value.text);

      io.to(userRoom(value.userId)).emit("chat:message", message);
      // sender's other tabs/devices; this socket gets it through the ack
      socket.to(userRoom(userId)).emit("chat:message", message);

      return { message };
    }),
  );

  socket.on(
    "chat:typing",
    handle(socket, async ({ toUserId }) => {
      const { error, value } = userIdValidator({ userId: toUserId });
      if (error) throw new CustomError(error, 400);

      if ((typingAllowed.get(value.userId) ?? 0) < Date.now()) {
        await assertConnected(userId, value.userId);
        typingAllowed.set(value.userId, Date.now() + TYPING_CACHE_MS);
      }

      io.to(userRoom(value.userId)).emit("chat:typing", { userId });
      return {};
    }),
  );

  socket.on(
    "chat:read",
    handle(socket, async ({ userId: otherUserId }) => {
      const { error, value } = userIdValidator({ userId: otherUserId });
      if (error) throw new CustomError(error, 400);

      const result = await markRead(userId, value.userId);
      if (result.conversationId) {
        const event = { conversationId: result.conversationId, userId, readAt: result.readAt };
        io.to(userRoom(value.userId)).emit("chat:read", event);
        socket.to(userRoom(userId)).emit("chat:read", event);
      }
      return result;
    }),
  );

  socket.on(
    "chat:clear",
    handle(socket, async ({ userId: otherUserId }) => {
      const { error, value } = userIdValidator({ userId: otherUserId });
      if (error) throw new CustomError(error, 400);

      const result = await clearChat(userId, value.userId);
      // one-sided: only this user's other tabs/devices hear about it
      if (result.conversationId) {
        socket.to(userRoom(userId)).emit("chat:cleared", result);
      }
      return result;
    }),
  );

  // online status + last seen of all this user's connections
  socket.on(
    "presence:list",
    handle(socket, async () => {
      const ids = await getConnectionIds(userId);
      const lastSeen = await getLastSeen(ids);

      return {
        users: ids.map((id) => ({
          userId: id,
          online: isOnline(id),
          lastSeenAt: lastSeen[id] ?? null,
        })),
      };
    }),
  );

  socket.on("disconnect", () => {
    if (expiryTimer) clearTimeout(expiryTimer);
    // the socket has already left its rooms here, so an empty room means the last one closed
    if (!isOnline(userId)) goOffline(userId);
  });
};

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    // 16kb is plenty for a 2000 character message
    maxHttpBufferSize: 16 * 1024,
  });

  io.use(authenticateSocket);
  io.on("connection", onConnection);

  return io;
};
