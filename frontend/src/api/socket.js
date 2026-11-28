import { io } from "socket.io-client";

// same host as the REST api (see httpReq), the `token` cookie authenticates the handshake
const SOCKET_URL = location.hostname === "localhost" ? "http://localhost:5000" : undefined

export const createSocket = () =>
  io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
  })
