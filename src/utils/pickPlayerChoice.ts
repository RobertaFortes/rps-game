import type { Position } from "../domain/gameLogic"
import type { RoundResult } from "../domain/resolveRound"

export function pickPlayerChoice(result?: RoundResult): Position | undefined {
  if (!result) return

  switch (result.outcome) {
    case 'win':{
      const winBet = result.betResults.find(b => b.outcome === 'win')
      return winBet?.position
    }
    case 'tie': {
      const tieBet = result.betResults.find(b => b.outcome === 'tie')
      return tieBet?.position
    }

    case 'loss': {
      const lossBet = result.betResults.find(b => b.outcome === 'loss')
      return lossBet?.position
    }
  }
}