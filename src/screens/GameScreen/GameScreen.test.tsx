import { describe, it, beforeEach, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useGameStore } from '../../store/gameStore'
import GameScreen from './GameScreen'

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

describe('GameScreen', () => {
  beforeEach(() => {
    resetStore()
  })

  it('starts in idle; betting after selecting a position; Play enables', () => {
    render(<GameScreen />)

    const rockBtn = screen.getByRole('button', { name: /rock/i })
    const playBtn = screen.getByRole('button', { name: /play/i })

    expect(useGameStore.getState().phase).toBe('idle')
    expect(rockBtn).toBeEnabled()
    expect(playBtn).toBeDisabled()

    act(() => fireEvent.click(rockBtn))
    expect(useGameStore.getState().phase).toBe('betting')
    expect(playBtn).toBeEnabled()
  })

  it('moves to versus on Play click', () => {
    render(<GameScreen />)

    act(() => fireEvent.click(screen.getByRole('button', { name: /rock/i })))
    const playBtn = screen.getByRole('button', { name: /play/i })

    act(() => fireEvent.click(playBtn))
    expect(useGameStore.getState().phase).toBe('versus')
  })

  it('after 3s moves from versus to result', () => {
    vi.useFakeTimers()
    render(<GameScreen />)
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /rock/i }))
    })
    const playBtn = screen.getByRole('button', { name: /play/i })
    act(() => fireEvent.click(playBtn))
    expect(useGameStore.getState().phase).toBe('versus')
    act(() => vi.advanceTimersByTime(3000))
    expect(useGameStore.getState().phase).toBe('result')

    vi.useRealTimers()
  })
  
})