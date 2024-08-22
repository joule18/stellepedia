import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

//think of socket as the user that just connected
io.on("connection", (socket) => {
  console.log("User connected ", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //sample output: [1, 2, 3, 4]

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
