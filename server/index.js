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
  // console.log(Array.from(m.keys()));
  // console.log(Array.from(m.values()));
  console.log(JSON.stringify(m));
}

function log(name, value) {
  console.log(`${name}: ${value}`);
}

const INTERVAL = 1000;    // THe time interval in milliseconds for the server to send a data to clients
const SPEED = 1;    // Speed of players
let count = 1;
let grid = new Map();

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
    // log("player_movement instance", grid.get(data.id));
    // log("data.id", data.id);
    // log("data.direction", data.direction);
    try {
      grid.get(data.id).direction = data.direction;
      // console.log(`New direction`, grid.get(data.id).direction);
    } catch(err) {
      console.err(`fail to set the direction of player: ${socket.id}; err: ${err}; grid: ${grid}`);
    }
    // console.log(`new direction = ${grid.get(data.id).direction}`);
    // console.log("===============");
  });

  socket.on("create_player", (newPlayer) => {
    grid.set(socket.id, {x: newPlayer.x, y: newPlayer.y, width: newPlayer.width, height: newPlayer.height, direction: newPlayer.direction, color: newPlayer.color});
    // console.log(`newPlayer.(x, y) = (${newPlayer.x}, ${newPlayer.y})`);
    // logMap(grid);

    socket.emit("set_player_id", {playerID: socket.id});
  });

  // log("run()");

  run(socket);
});

const updateGrid = () => {
  // console.log(`\nupdateGrid()`);
  // console.log(`grid = ${JSON.stringify(Object.fromEntries(grid))}`);
  // Update grid
  Object.entries(Object.fromEntries(grid)).forEach(
    ([key, instance]) => {
      // console.log(`key, instance = ${key}, ${JSON.stringify(instance)}`);
      // console.log(`direction = ${instance.direction}`)
      // console.log("=====");
      
      // Update coordinates
      switch(instance.direction) {
        case "UP":
          instance.y = instance.y + SPEED;
          break;
        case "DOWN":
          instance.y = instance.y - SPEED;
          break;
        case "LEFT":
          instance.x = instance.x - SPEED;
          break;
        case "RIGHT":
          instance.x = instance.x + SPEED;
          break;
        default:
          break;
      }

      instance.direction = "NONE";    // Prevent the player from continuous motion
    }
  );
};

const run = (socket) => {
  // log("setInterval()");
  setInterval(() => {
    count++;
    // console.log(`grid = ${Object.keys(grid).length}`);
    // Update grid
    updateGrid();

    // log("grid in server", Object.keys(grid));
    // logMap(grid);
    // socket.emit("update_coordinates", count);
    // console.log(`run().grid in JSON: ${JSON.stringify(Object.fromEntries(grid))}`);
    socket.emit("update_coordinates", JSON.stringify(Object.fromEntries(grid)));    // Note that emit can only transmit integer, string etc. but not map, object, function etc. 
  }, INTERVAL);
};

server.listen(3001, () => {
  console.log(`Server is running on Port 3001`);
});