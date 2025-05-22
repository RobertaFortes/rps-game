import { BET_UNIT } from "../../domain/constants";
import BetButton from "../BetButton/BetButton"
import "./game-screen.css"

interface GameControlsProps {
  play: (choice: "rock" | "paper" | "scissors") => void;
}

const GameControls = ({ play }: GameControlsProps) => {
 
  return (
    <div className="game-screen__controls">
      <BetButton choice="rock" amount={BET_UNIT} onClick={() => play("rock")} />
      <BetButton choice="paper" amount={BET_UNIT} onClick={() => play("paper")} />
      <BetButton choice="scissors"amount={BET_UNIT} onClick={() => play("scissors")} />
    </div>
  )
}

export default GameControls