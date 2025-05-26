import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useGameStore } from './gameStore'
import { act } from '@testing-library/react'

function resetStore() {
  useGameStore.setState({
    phase: 'idle',
    balance: 5000,
    bets: [],
    computerChoice: undefined,
    result: undefined,
    profit: 0
  })
}

describe('gameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetStore()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    resetStore()
  })

  it('placeBet: from the first bet it goes from phase idle to betting and deducts balance', () => {
    const { placeBet, phase, balance, bets } = useGameStore.getState()
    expect(phase).toBe('idle')
    expect(balance).toBe(5000)
    expect(bets).toHaveLength(0)
    act(() => placeBet('rock'))
    const state1 = useGameStore.getState()
    expect(state1.phase).toBe('betting')
    expect(state1.bets).toEqual([{ position: 'rock', amount: 500 }])
    expect(state1.balance).toBe(4500)
  })

  it('placeBet: increments existing bet and does not change phase after idle -> betting', () => {
    const { placeBet } = useGameStore.getState()
    act(() => placeBet('rock'))
    act(() => placeBet('rock'))
    const { bets, balance } = useGameStore.getState()
    expect(bets).toHaveLength(1)
    expect(bets[0]).toEqual({ position: 'rock', amount: 1000 })
    expect(balance).toBe(4000)
  })

  it('confirm: change phase versus to phase result, update balance and profit', () => {
    const rnd = useGameStore.getState().confirm
    const { placeBet } = useGameStore.getState()
    act(() => placeBet('paper'))
    act(() => placeBet('scissors'))
    vi.mock('../utils/randomChoice', () => ({ randomChoice: () => 'paper' as const }))
    act(() => rnd())
    let s = useGameStore.getState()
    expect(s.phase).toBe('versus')
    expect(s.computerChoice).toBe('paper')
    vi.advanceTimersByTime(3000)
    s = useGameStore.getState()
    expect(s.phase).toBe('result')
    expect(s.profit).toBe(1500)
    expect(s.balance).toBe(6000)
  })

  it('reset: clears everything and returns to phase idle', () => {
    act(() => useGameStore.getState().reset())
    const s = useGameStore.getState()
    expect(s.phase).toBe('idle')
    expect(s.bets).toHaveLength(0)
    expect(s.balance).toBe(5000)
    expect(s.profit).toBe(0)
    expect(s.computerChoice).toBeUndefined()
    expect(s.result).toBeUndefined()
  })
})