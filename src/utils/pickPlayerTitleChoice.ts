import type { Position } from "../domain/gameLogic"
import type { RoundResult } from "../domain/resolveRound"

export function pickPlayerTitleChoice(result?: RoundResult): Position | undefined {
  if (!result) return

  switch (result.outcome) {
    case 'win':
      return result.positionWinner

    case 'tie': {
      const tieBet = result.betResults.find(b => b.outcome === 'tie')
      return tieBet?.position
    }

    case 'loss':
      return result.betResults[0].position
  }
}