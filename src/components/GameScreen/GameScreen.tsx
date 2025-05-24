import PlayClearButton from '../PlayClearButton/PlayClearButton'
import GameControls from './GameControls'
import { useGameStore } from '../../store/gameStore'
import { pickPlayerTitleChoice } from '../../utils/pickPlayerTitleChoice'
import './game-screen.css'


const GameScreen = () => {
  const phase = useGameStore((s) => s.phase)
  const bets = useGameStore((s) => s.bets)
  const computerChoice = useGameStore((s) => s.computerChoice)
  const result = useGameStore((s) => s.result)
  const profit = useGameStore(s => s.profit)
  const confirm = useGameStore((s) => s.confirm)
  const reset = useGameStore((s) => s.reset)
  const isDisabled = bets?.length === 0 || phase === 'versus'

  const playerTitle = pickPlayerTitleChoice(result)
  const winnerTitle  =
  result?.outcome === 'tie'
    ? 'game tied'
    : `${result?.positionWinner!.toUpperCase()} won`
    const winSubtitle = (result?.outcome !== 'tie' && result?.outcome !== 'loss') && (
      <>
        <span className="primary-color">you win</span> {profit}
      </>
    )
  
  return (
    <div className="game-screen">
      <div className="result-screen">
      {(phase === 'idle' || phase === 'betting') && <p className='primary-color'>Pick your positions</p>}
      {phase === 'versus' && computerChoice && playerTitle && (
        <h2 className="versus-title">
          <span>{computerChoice}</span> 
          <span className='primary-color small-font'>vs</span>
          <span>{playerTitle}</span>
        </h2>
      )}
      {phase === 'result' && result && (
        <>
         <h2 className='result-screen__title'>
          {winnerTitle}
         </h2>
          <p>
            {winSubtitle}
          </p>
        </>
      )}
      </div>
      <GameControls />
      {(phase !== 'result') ? (
        <PlayClearButton mode="play" onClick={confirm} disabled={isDisabled} />
      ) : (
        <PlayClearButton mode="clear" onClick={reset} />
      )}

      
    </div>
  )
}

export default GameScreen