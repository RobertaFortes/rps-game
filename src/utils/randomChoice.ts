import type { Position } from '../domain/gameLogic'

export function randomChoice(): Position {
  const choices: Position[] = ['rock', 'paper', 'scissors']
  const randomIndex = Math.floor(Math.random() * choices.length)
  return choices[randomIndex]
}