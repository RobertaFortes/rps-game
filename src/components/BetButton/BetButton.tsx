import { memo } from 'react'
import Button from '../Button/Button'
import './bet-button.css'

interface BetButtonProps {
  amount: number
  choice: "rock" | "paper" | "scissors"
  onClick: () => void
  disabled?: boolean
}

const BetButtonComponent = ({amount, choice, onClick, disabled}: BetButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="bet"
      className={choice}
      disabled={disabled}
    >
    <span className={`bet-amount ${amount > 0 && 'active'}`}>{amount}</span>
    <span>{choice.charAt(0) + choice.slice(1)}</span>
  </Button>
  )
}
 
  
  


export default memo(BetButtonComponent)