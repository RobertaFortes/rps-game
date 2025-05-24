import { shallow } from 'zustand/shallow'
import type { Position } from "../../domain/gameLogic"
import PositionedBetButton from "./PositionedBetButton"
import { useGameStore, type GameState } from '../../store/gameStore'
import "./game-screen.css"
import { BET_UNIT } from '../../domain/constants'


const GameControls = () => {
  const selector = (s: GameState) => ({
    phase:    s.phase,
    bets:     s.bets,
    balance:  s.balance,
    placeBet: s.placeBet
  } as const) 
  const { phase, bets, balance, placeBet } = useGameStore(selector, shallow)

  const maxBetsReached = bets.length >= 2
  const hasBalance     = balance >= BET_UNIT

  const getProps = (pos: Position) => {
    
    const bet = bets.find((b) => b.position === pos)
    const chosen = !!bet
    const inPickingPhase = phase === 'idle' || phase === 'betting'

    const disabled =
      !inPickingPhase ||
      !hasBalance ||
      (maxBetsReached && !chosen)

    return {
      amount: bet?.amount ?? 0,
      disabled,
      onClick: () => placeBet(pos)
    }
  }

  return (
    <div className="game-screen__controls">
      {(['rock', 'paper', 'scissors'] as Position[]).map((pos) => (
        <PositionedBetButton key={pos} position={pos} {...getProps(pos)} />
      ))}
    </div>
  )
}

export default GameControls