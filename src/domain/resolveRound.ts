import type { Bet, Position } from './gameLogic'

export type Outcome = 'win' | 'tie' | 'loss'

export interface BetResult extends Bet {
  outcome: Outcome
  payout: number
}

export interface RoundResult {
  computerChoice: Position
  betResults: BetResult[]
  totalReturn: number
  positionWinner?: Position
  outcome: Outcome
}

const beats: Record<Position, Position> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

function getOutcome(player: Position, computer: Position): Outcome {
  if (player === computer) return 'tie'
  return beats[player] === computer ? 'win' : 'loss'
}

export function resolveRound(
  bets: Bet[],
  computerChoice: Position
): RoundResult {
  const isSingleBet = bets.length === 1
  const winMultiplier = isSingleBet ? 14 : 3

  let totalReturn = 0
  const betResults: BetResult[] = []

  let firstWinPos: Position | undefined
  let overallOutcome: Outcome = 'loss'

  for (const bet of bets) {
    const outcome = getOutcome(bet.position, computerChoice)
    let payout = 0

    if (outcome === 'win') {
      payout = bet.amount * winMultiplier
      overallOutcome = 'win'
      if (!firstWinPos) {
        firstWinPos = bet.position
      }
    } else if (outcome === 'tie') {
      payout = bet.amount
      if (overallOutcome !== 'win') {
        overallOutcome = 'tie'
      }
    }

    totalReturn += payout
    betResults.push({ position: bet.position, amount: bet.amount, outcome, payout })
  }

  const positionWinner =
    overallOutcome === 'win'
    ? firstWinPos
    : overallOutcome === 'loss'
    ? computerChoice
    : undefined

  return {
    computerChoice,
    betResults,
    totalReturn,
    positionWinner,
    outcome: overallOutcome
  }
}