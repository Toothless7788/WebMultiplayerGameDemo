"use client";
import { useEffect, useState, useRef } from "react";
import Obstacle from "./components/obstacle";
import Player from "./components/sprite/player";
import { useKeyPress } from "./lib/hooks";
import { Direction, PlayerType } from "./lib/definitions";
import { io } from "socket.io-client";
import { createList, log, logMap } from "./lib/utils";

const socketURL = "http://localhost:3001";
// const socket = io("http://localhost:3001");    // Original, which does not allow re-rendering of picture
const socket = io(socketURL);

let playerNum: string | number;

let grid = [];    // The grid in the structure [{block detail1}, {block detail2}, ...]


export default function App() {
  const [pressedKey, setKey] = useState("Initial key");
  const [players, setPlayers] = useState<PlayerType[]>([{x: 100, y: 100, width: 30, height: 20, color: "#00416d", direction: Direction.NONE, id: -1}]);
  // const [players, setPlayers] = useState<PlayerType[]>(new Map());
  const [playerID, setPlayerID] = useState("");    //TODO To be removed when we no longer need to display playerID
  // const [grid, setGrid] = useState(new Map());

  // let socket = useRef(null);

  // Create socket
  // useEffect(() => {
  //   socket.current = io(socketURL, {
  //     autoConnect: false
  //   });
  // }, [socketURL]);

  const pressKey = (keyCode: string) => {
    setKey(keyCode);

    log("Sending playerID", playerNum);

    // Send data to server
    switch(keyCode) {
      case "ArrowUp":
        socket.emit("player_movement", {id: playerNum, direction: "UP"});
        break;
      case "ArrowDown":
        socket.emit("player_movement", {id: playerNum, direction: "DOWN"});
        break;
      case "ArrowLeft":
        socket.emit("player_movement", {id: playerNum, direction: "LEFT"});
        break;
      case "ArrowRight":
        socket.emit("player_movement", {id: playerNum, direction: "RIGHT"});
        break;
      default:
        console.log(`Undefined keyCode = ${keyCode}`);
        break;
    }
  };

  const createPlayer = () => {
    // console.log(`createPlayer()`);
    socket.emit("create_player", {x: 100, y: 100, width: 50, height: 50, color: "red", direction: "NONE", id: -1});
  };

  socket.on("update_coordinates", (data) => {
    // logMap(data);
    // console.log(new Map(Object.entries(JSON.parse(data))));
    // console.log(`JSON.parse(data) = ${JSON.parse(data)}`);
    let entries = Object.entries(JSON.parse(data));    // entries is an array with structure [id, object]
    // console.log(`entries of JSON.parse(data) = ${entries}\n`);

    grid = createList(entries);
    // console.log(`Updated grid = ${grid}`);
  });

  socket.on("set_player_id", (data) => {
    if(data.playerID != null && data.playerID != "") {
      setPlayerID(data.playerID);
      playerNum = data.playerID;
    }
  })

  // Demo
  // useKeyPress((e: KeyboardEvent) => {console.log(`event e = ${e.code}`);setKey(e.code)}, []);    // Ignore the red line. VS code is tripping
  useKeyPress((e: KeyboardEvent) => {pressKey(e.code)}, []);    // Ignore the red line. VS code is tripping

  // Register this user
  useEffect(() => {    // useEffect() is invoked twice because we are using strict mode in REACT, which renders elements twice
    createPlayer();
  }, []);

  return (
    // tabIndex defins the order in which the elements are focused when using keyboard navigation
    <div>
      <h1>Hello World123</h1>
      <p>Key pressed: {pressedKey}</p>
      <p>Player ID: {playerID}</p>
      <Player x={players[0].x} y={players[0].y} width={players[0].width} height={players[0].height} color={players[0].color} />
      <Obstacle x={105} y={125} width={50} height={50} color="green" />
    </div>
  );
}
