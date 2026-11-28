import { Connection } from "../models/connection-model.js";
import { User } from "../models/user-model.js";

// ids of every user with an accepted connection to this user
export const getConnectionIds = async (userId) => {
  const connections = await Connection.find({
    $or: [{ fromUser: userId }, { toUser: userId }],
    status: "accepted",
  })
    .select("fromUser toUser")
    .lean();

  const id = userId.toString();
  return connections.map((c) =>
    (c.fromUser.toString() === id ? c.toUser : c.fromUser).toString(),
  );
};

export const setLastSeen = async (userId, lastSeenAt) => {
  await User.updateOne({ _id: userId }, { $set: { lastSeenAt } });
};

// lastSeenAt of the given users as { [userId]: Date | null }
export const getLastSeen = async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } })
    .select("lastSeenAt")
    .lean();

  return Object.fromEntries(users.map((u) => [u._id.toString(), u.lastSeenAt ?? null]));
};
