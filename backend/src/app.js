import 'dotenv/config'
import express from "express";
import http from "node:http";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth-routes.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { userRouter } from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import { connectionRouter } from "./routes/connection-routes.js";
import cors from 'cors'
import { chatRouter } from "./routes/chat-routes.js";
import { initSocket } from "./socket/index.js";
import { assertChatKey } from "./utils/chat-encryption.js";

const app = express();

// using essential middelwares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  // lets the frontend read the cooldown on 429 responses from the verification routes
  exposedHeaders: ['Retry-After'],
}))
app.use(express.json())
app.use(cookieParser())




// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/connection", connectionRouter)
app.use("/api/v1/chat", chatRouter)


// using error middleware to handle error efficiently
app.use(errorMiddleware)



const startServer = async () => {
  try {
    // refuse to start without a valid chat encryption key
    assertChatKey();
    await connectDB();

    // socket.io shares the same http server as express
    const server = http.createServer(app);
    initSocket(server);

    server.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error.message)
  }
};


startServer()
