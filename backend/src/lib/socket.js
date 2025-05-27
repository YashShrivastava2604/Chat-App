import { Server } from "socket.io";
import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";

const app = express();
const server = http.createServer(app);

// Set up middlewares here
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

// Register routes here
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Store online users
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };
