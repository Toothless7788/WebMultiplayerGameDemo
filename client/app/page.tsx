"use client";
import { useState } from "react";
import Obstacle from "./components/obstacle";
import Player from "./components/sprite/player";
import { useKeyDown, useKeyPress } from "./lib/hooks";

export default function App() {

  const [pressedKey, setKey] = useState("Initial key");
  const pressKey = (keyCode: string) => {
    setKey(keyCode);
  };

  // Demo
  // useKeyPress((e: KeyboardEvent) => {console.log(`event e = ${e.code}`);setKey(e.code)}, []);    // Ignore the red line. VS code is tripping
  useKeyPress((e: KeyboardEvent) => {pressKey(e.code)}, []);    // Ignore the red line. VS code is tripping


  return (
    // tabIndex defins the order in which the elements are focused when using keyboard navigation
    <div>
      <h1>Hello World123</h1>
      <p>Key pressed: {pressedKey}</p>
      <Player x={25} y={25} width={50} height={50} color="#00416d" />
      <Obstacle x={15} y={25} width={50} height={50} color="green" />
    </div>
  );
}
