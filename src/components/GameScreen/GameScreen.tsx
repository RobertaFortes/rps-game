import PlayClearButton from '../PlayClearButton/PlayClearButton'
import GameControls from './GameControls'
import { useGameStore } from '../../store/gameStore'
import { pickPlayerChoice } from '../../utils/pickPlayerChoice'
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

  const playerChoice = pickPlayerChoice(result)
  const mainLabel  =
  result?.outcome === 'tie'
    ? 'No winner'
    : result?.outcome === 'win'
    ? `${result.positionWinner} won`
    : `${result?.computerChoice} won`

  const subLabel = result?.outcome === 'tie'
    ? 'bet refunded'
    : result?.outcome === 'win'
    ?  <><span className="primary-color">you win</span> {profit}</>
    : ''
  


    console.log('result', result);
    console.log('computerChoice', computerChoice);
  console.log('playerChoice', playerChoice);
    
  
  return (
    <div className="game-screen">
      <div className="result-screen">
      {(phase === 'idle' || phase === 'betting') && <p className='primary-color'>Pick your positions</p>}
      {phase === 'versus' && computerChoice && playerChoice && (
        <h2 className="versus-title">
          <span>{computerChoice}</span> 
          <span className='primary-color small-font'>vs</span>
          <span>{playerChoice}</span>
        </h2>
      )}
      {phase === 'result' && result && (
        <>
         <h2 className='result-screen__title'>
          {mainLabel}
         </h2>
          <p>
            {subLabel}
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