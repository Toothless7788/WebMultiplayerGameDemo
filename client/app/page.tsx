"use client";
import { useState } from "react";
import Obstacle from "./components/obstacle";
import Player from "./components/sprite/player";
import { useKeyPress } from "./lib/hooks";
import { Direction, PlayerType } from "./lib/definitions";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");


export default function App() {
  const [pressedKey, setKey] = useState("Initial key");
  const [player, setPlayer] = useState<PlayerType>({x: 0, y: 0, width: 30, height: 20, color: "#00416d", direction: Direction.NONE});
  const pressKey = (keyCode: string) => {
    setKey(keyCode);

    // Send data to server

  };

  // Demo
  // useKeyPress((e: KeyboardEvent) => {console.log(`event e = ${e.code}`);setKey(e.code)}, []);    // Ignore the red line. VS code is tripping
  useKeyPress((e: KeyboardEvent) => {pressKey(e.code)}, []);    // Ignore the red line. VS code is tripping


  return (
    // tabIndex defins the order in which the elements are focused when using keyboard navigation
    <div>
      <h1>Hello World123</h1>
      <p>Key pressed: {pressedKey}</p>
      <Player x={player.x} y={player.y} width={player.width} height={player.height} color={player.color} />
      <Obstacle x={105} y={25} width={50} height={50} color="green" />
    </div>
  );
}
