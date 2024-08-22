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

//think of socket as the user that just connected
io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io, server, app };
