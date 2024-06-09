/*
  The server for the project
*/
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());    // Control the access of the different device

function logMap(m) {
  console.log(Array.from(m.keys()));
  console.log(Array.from(m.values()));
}

function log(name, value) {
  console.log(`${name}: ${value}`);
}

const INTERVAL = 1000;    // THe time interval in milliseconds for the server to send a data to clients
const SPEED = 5;    // Speed of players
let count = 1;
let grid = new Map();
grid.set("gridid", 1);

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
    // log("data.id", data.id);
    // log("data.direction", data.direction);
    try {
      grid.get(data.id).direction = data.direction;
    } catch(err) {
      console.err(`fail to set the direction of player: ${socket.id}; err: ${err}; grid: ${grid}`);
    }
    // console.log(`new direction = ${grid.get(data.id).direction}`);
    // console.log("===============");
  });

  socket.on("create_player", (newPlayer) => {
    grid.set(socket.id, {x: newPlayer.x, y: newPlayer.y, width: newPlayer.width, height: newPlayer.height, direction: newPlayer.direction});
    console.log(`newPlayer.(x, y) = (${newPlayer.x}, ${newPlayer.y})`);
    logMap(grid);

    socket.emit("set_player_id", {playerID: socket.id});
  });

  log("run()");

  run();
});

const updateGrid = () => {
  console.log(`updateGrid()`);
  // Update grid
  Object.entries(grid).forEach(
    ([key, value]) => {
      console.log(`key, value = ${key}, ${value}`);
      console.log(`direction = ${value.direction}`)
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
  log("setInterval()");
  setInterval(() => {
    // count++;
    // console.log(`grid = ${Object.keys(grid).length}`);
    // Update grid
    updateGrid();

    log("grid in server", Object.keys(grid));
    logMap(grid);
    io.emit("update_coordinates", grid);
  }, INTERVAL);
};

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
});