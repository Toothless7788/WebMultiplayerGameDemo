/*
  The server for the project
*/
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());    // Control the access of the different device

const INTERVAL = 5000;    // THe time interval in milliseconds for the server to send a data to clients
const SPEED = 5;    // Speed of players
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

  run();
});

const updateGrid = () => {
  // console.log(`updateGrid()`);
  // Update grid
  Object.entries(grid).forEach(
    ([key, value]) => {
      console.log(`key, value = ${key}, ${value}`);
      console.log("=====");
      // Update coordinates
      switch(value.direction) {
        case "UP":
          y = y + SPEED;
          break;
        case "DOWN":
          y = y - SPEED;
          break;
        case "LEFT":
          x = x - SPEED;
          break;
        case "RIGHT":
          x = x + SPEED;
          break;
        default:
          break;
      }
    }
  );
};

const run = () => {
  setInterval(() => {
    // count++;
    // console.log(`grid = ${Object.keys(grid).length}`);
    // Update grid
    updateGrid();

    io.emit("update_coordinates", grid);
  }, INTERVAL);
};

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
});