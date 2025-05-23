import type { Position } from "../../domain/gameLogic";
import PositionedBetButton from "./PositionedBetButton";
import "./game-screen.css"


const GameControls 
 = () => {
  
  return (
    <div className="game-screen__controls">
      {(['rock', 'paper', 'scissors'] as Position[]).map((pos) => (
        <PositionedBetButton key={pos} position={pos} />
      ))}
    </div>
  )
}

export default GameControls