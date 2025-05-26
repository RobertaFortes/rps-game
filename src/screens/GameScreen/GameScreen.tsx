import PlayClearButton from '../../components/PlayClearButton/PlayClearButton'
import GameControls from '../../components/GameControls/GameControls'
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
    ? <span className="primary-color">bet refunded</span>
    : result?.outcome === 'win'
    ?  <><span className="primary-color">you win</span> {profit}</>
    : <span className="primary-color">computer win</span>

  return (
    <div className="game-screen">
      <div className={`game-screen__label ${phase === 'idle' || phase === 'betting' ? 'label-initial' : 'label-result'}`}>
      {(phase === 'idle' || phase === 'betting') && <p className='primary-color'>Pick your positions</p>}
      {phase === 'versus' && computerChoice && playerChoice && (
        <h2 className="label-result-versus__title">
          <span>{computerChoice}</span> 
          <span className='primary-color small-font'>vs</span>
          <span>{playerChoice}</span>
        </h2>
      )}
      {phase === 'result' && result && (
        <>
         <h2 className='label-result__title'>
          {mainLabel}
         </h2>
          <p className='label-result__subtitle'>
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