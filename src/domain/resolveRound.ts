import type { Bet, Position } from "./gameLogic"

export type Outcome = "win" | "tie" | "loss"

export interface BetResult extends Bet {
  outcome: Outcome;
  payout: number;
}
export interface RoundResult {
  betResults: BetResult[];
  totalReturn: number;
  computerChoice: Position;
}

const beats: Record<Position, Position> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
}

function getOutcome(player: Position, computer: Position): Outcome {
  if (player === computer) return "tie"
  if (beats[player] === computer) return "win"
  return "loss"
}

export function resolveRound(bets: Bet[], computerChoice: Position): RoundResult {
  const isSingleBet = bets.length === 1
  const winMultiplier = isSingleBet ? 14 : 3
  let totalReturn = 0
  const betResults: BetResult[] = []
  for (const bet of bets) {
    const outcome = getOutcome(bet.position, computerChoice)
    let payout = 0
    if (outcome === "win") {
      payout = bet.amount * winMultiplier
    } else if (outcome === "tie") {
      payout = bet.amount
    }
    totalReturn += payout

    betResults.push({
      ...bet,
      outcome,
      payout,
    })

  }
  return {
    betResults,
    computerChoice,
    totalReturn,
  }
}