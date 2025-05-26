import { memo } from 'react'
import BetButton from '../BetButton/BetButton'
import type { Position } from '../../domain/gameLogic'

interface PositionedBetButtonProps {
  position: Position
  amount: number
  disabled: boolean
  onClick: () => void
  isWinner?: boolean
}

const PositionedBetButton = ({
  position,
  amount,
  disabled,
  onClick,
  isWinner
}: PositionedBetButtonProps) => {
  return (
    <BetButton
      choice={position}
      amount={amount}
      disabled={disabled}
      onClick={onClick}
      isWinner={isWinner}
    />
  )
}

export default memo(PositionedBetButton)
  