import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import PositionedBetButton from "./PositionedBetButton"
import type { Position } from "../../domain/gameLogic"
import { BET_UNIT } from '../../domain/constants'
import { useGameStore, type GameState } from '../../store/gameStore'
import "./game-controls.css"


const positions: Position[] = ['rock', 'paper', 'scissors']
const GameControls = () => {
  const { phase, bets, balance, placeBet, result } = useGameStore(
    (s: GameState) => ({
      phase: s.phase,
      bets: s.bets,
      balance: s.balance,
      placeBet: s.placeBet,
      result: s.result
    }),
    shallow
  )

  const handlers = useMemo(() => {
    return positions.reduce((acc, pos) => {
      acc[pos] = () => placeBet(pos)
      return acc
    }, {} as Record<Position, () => void>)
  }, [placeBet])

  const maxBetsReached = bets.length >= 2
  const hasBalance     = balance >= BET_UNIT

  const buttonProps = useMemo(() => {
    return positions.map((pos) => {
      const bet = bets.find((b) => b.position === pos)
      const chosen = !!bet
      const inPicking = phase === 'idle' || phase === 'betting'
      const winResult = result?.betResults.find(
        (br) => br.position === pos && br.outcome === 'win'
      )

      return {
        position: pos,
        amount: bet?.amount ?? 0,
        disabled:
          !inPicking ||
          !hasBalance ||
          (maxBetsReached && !chosen),
        onClick: handlers[pos],
        isWinner: Boolean(winResult)
      }
    })
  }, [bets, phase, hasBalance, maxBetsReached, result, handlers])

  return (
    <div className="game-screen__controls">
      {buttonProps.map((props) => (
        <PositionedBetButton key={props.position} {...props} />
      ))}
    </div>
  )
}

export default GameControls