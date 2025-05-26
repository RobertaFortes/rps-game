import { describe, it, expect } from 'vitest'
import { resolveRound } from './resolveRound'
import type { Bet } from './gameLogic'

describe('resolveRound()', () => {
  it('should return win for single bet', () => {
    const bets: Bet[] = [{ position: 'rock', amount: 500 }]
    const result = resolveRound(bets, 'scissors')
    expect(result.outcome).toBe('win')
    expect(result.totalReturn).toBe(500 * 14)
  })

  it('should return loss for single bet', () => {
    const bets: Bet[] = [{ position: 'rock', amount: 500 }]
    const result = resolveRound(bets, 'paper')
    expect(result.outcome).toBe('loss')
    expect(result.totalReturn).toBe(0)
  })

  it('should refund on tie for single bet', () => {
    const bets: Bet[] = [{ position: 'paper', amount: 500 }]
    const result = resolveRound(bets, 'paper')
    expect(result.outcome).toBe('tie')
    expect(result.totalReturn).toBe(500)
  })

  it('should handle two bets: win+tie', () => {
    const bets: Bet[] = [
      { position: 'rock', amount: 500 },
      { position: 'paper', amount: 500 }
    ]
    const result = resolveRound(bets, 'rock')
    expect(result.outcome).toBe('win')
    expect(result.totalReturn).toBe(500 * 3 + 500)
  })
  it('should handle two bets: win+tloss', () => {
    const bets: Bet[] = [
      { position: 'rock', amount: 500 },
      { position: 'paper', amount: 500 }
    ]
    const result = resolveRound(bets, 'scissors')
    expect(result.outcome).toBe('win')
    expect(result.totalReturn).toBe(500 * 3)
  })
})