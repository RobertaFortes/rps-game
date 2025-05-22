import Button from "../Button/Button";
import "./bet-button.css";

interface BetButtonProps {
  amount: number;
  choice: "rock" | "paper" | "scissors";
  onClick: () => void;
}

const BetButton = ({amount, choice, onClick}: BetButtonProps) => (
  <Button
    onClick={onClick}
    variant="bet"
    className={choice}
  >
    <span className="bet-amount">{amount}</span>
    <span>{choice.charAt(0) + choice.slice(1)}</span>
  </Button>
)

export default BetButton