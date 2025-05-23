import PlayClearButton from "../PlayClearButton/PlayClearButton"
import GameControls from "./GameControls"
import { useGameStore } from "../../store/gameStore"


import "./game-screen.css"

const GameScreen = () => {
  const phase = useGameStore((s) => s.phase)

  const bets = useGameStore((s) => s.bets)
  const computerChoice = useGameStore((s) => s.computerChoice)
  const result = useGameStore((s) => s.result)

  const start = useGameStore((s) => s.start)

  const confirm = useGameStore((s) => s.confirm)
  const reset = useGameStore((s) => s.reset)


 
  console.log(result);
  
  return (
    <div className="game-screen">
   
      {phase === 'idle' &&  (
        <button onClick={start}>Start New Round</button>
      )}

      {phase === 'betting' && (
        <>
          <GameControls />
          <button
            onClick={confirm}
            disabled={bets.length === 0}
            className="confirm-button"
          >
            Play
          </button>
        </>
      )}

      {phase === 'resolving' && <p>Resolving… please wait</p>}

      {phase === 'result' && result && (
        <div className="result-screen">
          <h2>Computer chose: {computerChoice}</h2>
          <ul>
            {result.betResults.map((br) => (
              <li key={br.position}>
                You bet {br.amount} on {br.position} —{' '}
                {br.outcome.toUpperCase()} (payout: {br.payout})
              </li>
            ))}
          </ul>
          <p>Total returned: {result.totalReturn}</p>
          <PlayClearButton mode="clear" onClick={reset} />
        </div>
      )}
    </div>
  )
}

export default GameScreen