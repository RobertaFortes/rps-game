import Button from '../Button/Button'
import './play-clear-button.css'

interface PlayClearButtonProps {
  mode: "play" | "clear"
  onClick: () => void
  disabled?: boolean
}

const PlayClearButton = ({mode, onClick, disabled}: PlayClearButtonProps) => (
  <Button
    onClick={onClick} 
    className="play-clear"
    disabled={disabled}
  >
    {mode === "play" ? "Play" : "Clear"}
  </Button>
)

export default PlayClearButton