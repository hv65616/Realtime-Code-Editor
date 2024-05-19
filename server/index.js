const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const ACTIONS = require("./Action");
const io = new Server(server);
const userSocketMap = {};

const getAllConnectionClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log(`Socket connected at ${socket.id}`);
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    // console.log(username);
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectionClients(roomId);
    // console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });
  socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
    // console.log(code);
    socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(5000, (req, res) => {
  console.log("Server is running");
});
