
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { render, screen, act, within } from '@testing-library/react'
import { useGameStore } from '../../store/gameStore'
import GameControls from './GameControls'
import { BET_UNIT } from '../../domain/constants'

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

describe('GameControls', () => {
  beforeEach(() => {
    resetStore()
  })
  it('renders three buttons and they are all enabled initially', () => {
    render(<GameControls />)

    const rockBtn = screen.getByRole('button', { name: /rock/i })
    const paperBtn = screen.getByRole('button', { name: /paper/i })
    const scissorsBtn = screen.getByRole('button', { name: /scissors/i })

    expect(rockBtn).toBeEnabled()
    expect(paperBtn).toBeEnabled()
    expect(scissorsBtn).toBeEnabled()
  })

  it('does not show a badge on unbet positions', () => {
    render(<GameControls />)
    const paperBtn = screen.getByRole('button', { name: /paper/i })
    expect(within(paperBtn).queryByText(String(BET_UNIT))).toBeNull()
  })

  it('displays incremented bets when the same position is selected', () => {
    render(<GameControls />)

    act(() => {
      useGameStore.getState().placeBet('rock')
      useGameStore.getState().placeBet('rock')
    })

    const rockBtn = screen.getByRole('button', { name: /rock/i })
    const paperBtn = screen.getByRole('button', { name: /paper/i })
    const scissorsBtn = screen.getByRole('button', { name: /scissors/i })

    expect(rockBtn).toBeEnabled()
    expect(paperBtn).toBeEnabled()
    expect(scissorsBtn).toBeEnabled()

    expect(within(rockBtn).getByText(String(BET_UNIT * 2))).toBeVisible()
  })

  it('disables a third distinct button after betting two positions', () => {
    render(<GameControls />)

    act(() => {
      useGameStore.getState().placeBet('rock')
      useGameStore.getState().placeBet('paper')
    })

    const rockBtn = screen.getByRole('button', { name: /rock/i })
    const paperBtn = screen.getByRole('button', { name: /paper/i })
    const scissorsBtn = screen.getByRole('button', { name: /scissors/i })

    expect(rockBtn).toBeEnabled()
    expect(paperBtn).toBeEnabled()
    expect(scissorsBtn).toBeDisabled()

    expect(within(rockBtn).getByText(String(BET_UNIT))).toBeVisible()
    expect(within(paperBtn).getByText(String(BET_UNIT))).toBeVisible()
  })

  it('disables every button when balance < BET_UNIT even if phase is betting', () => {
    act(() => {
      useGameStore.setState({
        balance: BET_UNIT - 1,
        phase: 'betting',
        bets: []
      })
    })

    render(<GameControls />)

    const rockBtn = screen.getByRole('button', { name: /rock/i })
    const paperBtn = screen.getByRole('button', { name: /paper/i })
    const scissorsBtn = screen.getByRole('button', { name: /scissors/i })

    expect(rockBtn).toBeDisabled()
    expect(paperBtn).toBeDisabled()
    expect(scissorsBtn).toBeDisabled()
  })

  it('calls placeBet once when you click a position button', () => {
    const spy = vi.spyOn(useGameStore.getState(), 'placeBet')
    render(<GameControls />)
  
    const rockBtn = screen.getByRole('button', { name: /rock/i })
    act(() => rockBtn.click())
  
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('rock')
  })
})