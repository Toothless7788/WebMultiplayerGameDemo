/*
  The server for the project
*/
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());    // Control the access of the different device

const INTERVAL = 1000;    // THe time interval in milliseconds for the server to send a data to clients
let count = 1;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connection: ${socket.id}`);

  socket.emit("set_up", {playerID: socket.id});

  const run = () => {
    setInterval(() => {
      io.emit("update_coordinates", count);
    }, INTERVAL);
    count++;
  };

  socket.on("player_movement", (data) => {
    console.log(`data in server = ${data}`);
  });

  run();
});

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
});