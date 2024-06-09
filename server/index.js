/*
  The server for the project
*/
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());    // Control the access of the different device

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connection: ${soclet.id}`);

  socket,on("player_movement", (data) => {
    console.log(`data = ${data}`);
  });
});

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
})