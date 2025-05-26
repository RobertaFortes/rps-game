import { describe, it, expect } from 'vitest'
import type { RoundResult } from '../domain/resolveRound'
import { pickPlayerChoice } from './pickPlayerChoice'

describe('pickPlayerChoice()', () => {
  it('returns undefined when result is undefined', () => {
    expect(pickPlayerChoice(undefined)).toBeUndefined()
  })

  it('returns tie bet position when outcome is tie and no loss', () => {
    const result = {
      outcome: 'tie',
      betResults: [
        { position: 'scissors', amount: 500, outcome: 'tie', payout: 500 }
      ],
      computerChoice: 'scissors' as const,
      totalReturn: 500
    } satisfies RoundResult
    expect(pickPlayerChoice(result)).toBe('scissors')
  })

  it('returns first loss bet position when outcome is loss', () => {
    const result = {
      outcome: 'loss',
      betResults: [
        { position: 'paper', amount: 500, outcome: 'loss', payout: 0 }
      ],
      computerChoice: 'rock' as const,
      totalReturn: 0,
      positionWinner: 'rock' as const
    } satisfies RoundResult
    expect(pickPlayerChoice(result)).toBe('paper')
  })

  it('returns winning bet position when outcome is win and two positions selected', () => {
    const result = {
      outcome: 'win',
      betResults: [
        { position: 'rock', amount: 500, outcome: 'loss', payout: 0 },
        { position: 'paper', amount: 500, outcome: 'win', payout: 1500 }
      ],
      computerChoice: 'scissors' as const,
      totalReturn: 1500,
      positionWinner: 'paper' as const
    } satisfies RoundResult
    expect(pickPlayerChoice(result)).toBe('paper')
  })

  it('returns losing bet position when outcome is loss and two positions selected', () => {
    const result = {
      outcome: 'loss',
      betResults: [
        { position: 'paper', amount: 500, outcome: 'loss', payout: 0 },
        { position: 'scissors', amount: 500, outcome: 'tie', payout: 500 }
      ],
      computerChoice: 'scissors' as const,
      totalReturn: 500,
      positionWinner: 'scissors' as const
    } satisfies RoundResult
    expect(pickPlayerChoice(result)).toBe('paper')
  })
})