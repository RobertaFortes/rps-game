import { memo } from 'react'
import Button from '../button/Button'
import './bet-button.css'

interface BetButtonProps {
  amount: number
  choice: "rock" | "paper" | "scissors"
  onClick: () => void
  disabled?: boolean
  isWinner?: boolean
}

const BetButtonComponent = ({
  amount,
  choice,
  onClick,
  disabled,
  isWinner
}: BetButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="bet"
      className={`${choice} ${isWinner ? 'isWinner' : ''}`}
      disabled={disabled}
    >
    <span className={`bet-amount ${amount > 0 && 'active'}`}>{amount}</span>
    <span>{choice.charAt(0) + choice.slice(1)}</span>
  </Button>
  )
}

export default memo(BetButtonComponent)