import { createContext, useContext } from "react";

export const SocketContext = createContext(null)

// { emitWithAck, emit } - see SocketProvider
export const useSocket = () => useContext(SocketContext)
