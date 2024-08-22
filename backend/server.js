import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { app, server } from "./socket/socket.js";

dotenv.config();
connectDB();
// const app = express(); // dont need this instance anymore since we have one from the socket server

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "5mb" })); //to parse json data in the req.body
app.use(express.urlencoded({ extended: true })); //parse form data in the req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

//changed from app to server to handle http requests and socket server processes
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
