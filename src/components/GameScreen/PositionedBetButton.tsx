import { memo } from 'react'
import { useGameStore } from '../../store/gameStore'
import type { Position } from '../../domain/gameLogic'
import BetButton from '../BetButton/BetButton'
import { BET_UNIT } from '../../domain/constants'


interface PositionedBetButtonProps {
 position: Position
}

const PositionedBetButton = ({ position }: PositionedBetButtonProps) => {
  const amount = useGameStore((s) => s.bets.find((b) => b.position === position)?.amount) || 0
  const bets = useGameStore((s) => s.bets)
  const balance = useGameStore((s) => s.balance)
  const onBet = useGameStore((s) => s.placeBet)
  const alreadyChosen = useGameStore((s) => s.bets.some((b) => b.position === position))
  const maxBetsReached = bets.length >= 2
  const hasBalance = balance >= BET_UNIT
  const isDisabled = !hasBalance || (maxBetsReached && !alreadyChosen)

  return (
    <BetButton
      choice={position}
      amount={amount}
      disabled={isDisabled}
      onClick={() => onBet(position)}
    />
  )
}

export default memo(PositionedBetButton)
  