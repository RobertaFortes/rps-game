import { BET_UNIT } from "./constants";
import type { RoundResult } from "./resolveRound";

export type Position = 'rock' | 'paper' | 'scissors'

export interface Bet {
  position: Position; 
  amount: number;
}

export interface GameContext {
  balance: number;
  bets: Bet[];
  computerChoice?: Position;
  result?: RoundResult;
}

export function hasSufficientBalance(context: GameContext): boolean {
  return context.balance >= BET_UNIT
}

export function canPlaceAnotherPosition(context: GameContext, position: Position): boolean {
  const currentPositions = context.bets.map(bet => bet.position)
  const isNewPosition = !currentPositions.includes(position)
  return currentPositions.length < 2 || !isNewPosition
}

export function placeBet(context: GameContext, position: Position): {bets: Bet[], balance: number} {
  const updatedBets = [...context.bets]
  const index = updatedBets.findIndex(bet => bet.position === position);
  if (index >= 0) {
    updatedBets[index].amount += BET_UNIT
  }
  else {
    updatedBets.push({ position, amount: BET_UNIT })
  }
  const newBalance = context.balance - BET_UNIT
  return {
    bets: updatedBets,
    balance: newBalance
  }
}