import { memo } from 'react'
import type { Position } from '../../domain/gameLogic'
import BetButton from '../BetButton/BetButton'

interface PositionedBetButtonProps {
  position: Position
  amount: number
  disabled: boolean
  onClick: () => void
}

const PositionedBetButton = ({
  position,
  amount,
  disabled,
  onClick
}: PositionedBetButtonProps) => {
  return (
    <BetButton choice={position} amount={amount} disabled={disabled} onClick={onClick} />
  )
}
export default memo(PositionedBetButton)
  