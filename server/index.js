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
let grid = {
  id: 1
};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connection: ${socket.id}`);

  socket.on("player_movement", (data) => {
    console.log(`data in server = ${data}`);
  });

  socket.on("create_player", (newPlayer) => {
    grid[socket.id] = {x: newPlayer.x, y: newPlayer.y, width: newPlayer.width, height: newPlayer.height, direction: newPlayer.direction};
    console.log(`newPlayer.(x, y) = (${newPlayer.x}, ${newPlayer.y})`);

    socket.emit("set_player_id", {playerID: socket.id});
  });

  setInterval(() => {
    // count++;
    // console.log(`grid = ${Object.keys(grid).length}`);
    // Update grid

    io.emit("update_coordinates", grid);
  }, INTERVAL);

  // run();
});

const updateGrid = () => {
  // Update grid
  grid.array.forEach(element => {
    console.log(`element in grid = ${element}`);
  });
};

const run = () => {
  setInterval(() => {
    // count++;
    // console.log(`grid = ${Object.keys(grid).length}`);
    // Update grid

    io.emit("update_coordinates", grid);
  }, INTERVAL);
};

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
});