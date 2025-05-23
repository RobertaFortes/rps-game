import { memo } from 'react'
import Button from '../Button/Button'
import './bet-button.css'

interface BetButtonProps {
  amount: number;
  choice: "rock" | "paper" | "scissors";
  onClick: () => void;
  disabled?: boolean;
}

const BetButtonComponent = ({amount, choice, onClick, disabled}: BetButtonProps) => {
  console.log(`BetButton: ${choice} - amount: ${amount}`)
  return (
    <Button
      onClick={onClick}
      variant="bet"
      className={choice}
      disabled={disabled}
    >
    {amount !== 0 && <span className="bet-amount">{amount}</span>}
    <span>{choice.charAt(0) + choice.slice(1)}</span>
  </Button>
  )
}
 
  
  


export default memo(BetButtonComponent)