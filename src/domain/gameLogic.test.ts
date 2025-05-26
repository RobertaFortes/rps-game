import { describe, it, expect } from 'vitest'
import { BET_UNIT } from './constants'
import {
  hasSufficientBalance,
  canPlaceAnotherPosition,
  placeBet,
  type GameContext,
  type Position
} from './gameLogic'

describe('gameLogic utilities', () => {
  describe('hasSufficientBalance', () => {
    it('returns true when balance is greater than BET_UNIT', () => {
      const context: GameContext = { balance: BET_UNIT + 100, bets: [] }
      expect(hasSufficientBalance(context)).toBe(true)
    })

    it('returns true when balance equals BET_UNIT', () => {
      const context: GameContext = { balance: BET_UNIT, bets: [] }
      expect(hasSufficientBalance(context)).toBe(true)
    })

    it('returns false when balance is less than BET_UNIT', () => {
      const context: GameContext = { balance: BET_UNIT - 1, bets: [] }
      expect(hasSufficientBalance(context)).toBe(false)
    })
  })

  describe('canPlaceAnotherPosition', () => {
    const positionRock: Position = 'rock'
    const positionPaper: Position = 'paper'
    const positionScissors: Position = 'scissors'

    it('allows placing when no bets yet', () => {
      const context: GameContext = { balance: 5000, bets: [] }
      expect(canPlaceAnotherPosition(context, positionRock)).toBe(true)
    })

    it('allows second distinct bet', () => {
      const context: GameContext = { balance: 5000, bets: [{ position: positionRock, amount: BET_UNIT }] }
      expect(canPlaceAnotherPosition(context, positionPaper)).toBe(true)
    })

    it('disallows third distinct bet', () => {
      const context: GameContext = {
        balance: 5000,
        bets: [
          { position: positionRock, amount: BET_UNIT },
          { position: positionPaper, amount: BET_UNIT }
        ]
      }
      expect(canPlaceAnotherPosition(context, positionScissors)).toBe(false)
    })

    it('allows incrementing an existing bet when two bets placed', () => {
      const context: GameContext = {
        balance: 5000,
        bets: [
          { position: positionRock, amount: BET_UNIT },
          { position: positionPaper, amount: BET_UNIT }
        ]
      }
      expect(canPlaceAnotherPosition(context, positionRock)).toBe(true)
    })
  })

  describe('placeBet', () => {
    const pos: Position = 'rock'

    it('places a new bet when none exists', () => {
      const context: GameContext = { balance: 5000, bets: [] }
      const { bets, balance } = placeBet(context, pos)

      expect(balance).toBe(5000 - BET_UNIT)
      expect(bets).toHaveLength(1)
      expect(bets[0]).toEqual({ position: pos, amount: BET_UNIT })
    })

    it('increments amount when bet already exists', () => {
      const context: GameContext = {
        balance: 4500,
        bets: [{ position: pos, amount: BET_UNIT }]
      }
      const { bets, balance } = placeBet(context, pos)

      expect(balance).toBe(4500 - BET_UNIT)
      expect(bets).toHaveLength(1)
      expect(bets[0].amount).toBe(BET_UNIT * 2)
    })

    it('does not modify original context', () => {
      const original: GameContext = { balance: 5000, bets: [] }
      const copy = { ...original, bets: [...original.bets] }
      placeBet(original, 'paper')
      expect(original).toEqual(copy)
    })
  })
})