import Button from "../Button/Button";
import "./play-clear-button.css";

interface PlayClearButtonProps {
  mode: "play" | "clear";
  onClick: () => void;
}

const PlayClearButton = ({mode, onClick}: PlayClearButtonProps) => (
  <Button onClick={onClick} className="play-clear" variant="default">
    {mode === "play" ? "Play" : "Clear"}
  </Button>
)

export default PlayClearButton