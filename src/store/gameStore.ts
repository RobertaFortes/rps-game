
import { create } from 'zustand'
import {
  canPlaceAnotherPosition,
  placeBet as domainPlaceBet,
  hasSufficientBalance,
  type Bet,
  type Position
} from '../domain/gameLogic'
import { resolveRound as domainResolveRound } from '../domain/resolveRound'
import { randomChoice } from '../utils/randomChoice'

interface GameState {
  balance: number
  bets: Bet[]
  phase: 'idle' | 'betting' | 'resolving' | 'result'
  computerChoice?: Position
  result?: ReturnType<typeof domainResolveRound>
  start: () => void
  placeBet: (pos: Position) => void
  confirm: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  balance: 5000,
  bets: [],
  phase: 'idle',
  computerChoice: undefined,
  result: undefined,

  start: () =>
    set({
      phase: 'betting',
      bets: [],
      computerChoice: undefined,
      result: undefined,
    }),

  placeBet: (position) => {
    const { balance, bets } = get()
    if (!hasSufficientBalance({ balance, bets: bets } )) return
    if (!canPlaceAnotherPosition({ balance, bets: bets }, position)) return
    console.log('bets', bets);
    
    const { bets: newBets, balance: newBal } = domainPlaceBet(
      { balance, bets },
      position
    )
    set({ bets: newBets, balance: newBal })
  },

  confirm: () => {
    const { balance, bets } = get()
    if (bets.length === 0) return

    set({ phase: 'resolving' })
    const comp = randomChoice()
    const round = domainResolveRound(bets, comp)
    set({
      phase: 'result',
      computerChoice: comp,
      result: round,
      balance: balance + round.totalReturn,
    })
  },

  reset: () =>
    set({
      phase: 'idle',
      balance: 5000,
      bets: [],
      computerChoice: undefined,
      result: undefined,
    }),
}))