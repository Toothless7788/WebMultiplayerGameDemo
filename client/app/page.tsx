import Obstacle from "./components/obstacle";
import Player from "./components/sprite/player";

export default function App() {
  return (
    <div>
      <h1>Hello World123</h1>
      <Player x={25} y={25} width={50} height={50} color="#00416d" />
      <Obstacle x={15} y={25} width={50} height={50} color="green" />
    </div>
  );
}
