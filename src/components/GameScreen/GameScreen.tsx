import { useState } from "react"
import PlayClearButton from "../PlayClearButton/PlayClearButton"
import GameControls from "./GameControls"
import "./game-screen.css"
import type { Position } from "../../domain/gameLogic"
import { randomChoice } from "../../utils/randomChoice"

const GameScreen = () => {
  const [choice, setChoice] = useState<Position | null>(null)
  const [mode, setMode]   = useState<"play" | "clear">("play")

  const play = (pos: Position) => {
    console.log(`Jogando com ${pos}`)
    
    setChoice(pos)
  };
  const handleAction = () => {
    if (mode === "play") {
      const test = randomChoice()
      console.log(`Escolha aleatória: ${test}`);
      
      setMode("clear")
    } else {
      // limpa escolha e volta ao modo play
      setChoice(null)
      setMode("play")
    }
  };
  return (
    <div className="game-screen">
      <h1>Rock Paper Scissors</h1>
      <GameControls play={play} />
      <div className="game-screen__actions">
        <PlayClearButton mode={mode} onClick={handleAction} />
      </div>
    </div>
  )
}

export default GameScreen