import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // Express 5.x: use an explicit regex for catch-all
  app.get(/(.*)/, (req, res) => {
    // `req.params[0]` will contain the path
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
