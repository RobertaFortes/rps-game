import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import {
  canPlaceAnotherPosition,
  placeBet as domainPlaceBet,
  hasSufficientBalance,
  type Bet,
  type Position
} from '../domain/gameLogic'
import { resolveRound as domainResolveRound } from '../domain/resolveRound'
import { randomChoice } from '../utils/randomChoice'

export interface GameState {
  balance: number
  bets: Bet[]
  phase: 'idle' | 'betting' | 'versus' | 'result'
  computerChoice?: Position
  result?: ReturnType<typeof domainResolveRound>
  placeBet: (pos: Position) => void
  confirm: () => void
  reset: () => void
  profit: number  
}

export const useGameStore = createWithEqualityFn<GameState>((set, get) => ({
  balance: 5000,
  bets: [],
  phase: 'idle',
  computerChoice: undefined,
  result: undefined,
  profit: 0,
  placeBet: (position) => {
    const { balance, bets, phase } = get()

    if (!hasSufficientBalance({ balance, bets }) ||
        !canPlaceAnotherPosition({ balance, bets }, position)) return

    const { bets: newBets, balance: newBal } = domainPlaceBet(
      { balance, bets },
      position
    )

    set({
      bets: newBets,
      balance: newBal,
      phase: phase === 'idle' ? 'betting' : phase
    })
  },


  confirm: () => {
    const { bets, balance, phase } = get()
    if (phase !== 'betting' || bets.length === 0) return
    const comp = randomChoice()
    const round = domainResolveRound(bets, comp)

    set({ phase: 'versus', computerChoice: comp, result: round })
    const winAmount = round.betResults
    .filter(b => b.outcome === 'win')
    .reduce((sum, b) => sum + b.payout, 0)
    setTimeout(() => {
      set({
        phase: 'result',
        balance: balance + round.totalReturn,
        profit: winAmount
      })
    }, 2000)
  },


  reset: () =>
    set({
      phase: 'idle',
      balance: 5000,
      bets: [],
      computerChoice: undefined,
      result: undefined,
      profit: 0
    }),
}),
 shallow
)