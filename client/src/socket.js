import { io } from "socket.io-client";
export const initSocket = async () => {
  const options = {
    transports: ["websocket"],
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999,
    timeout: 10000,
  };
  return io("http://localhost:5000", options);
};
