import './App.css'
import Button from './components/button/Button'

function App() {
  return (
    <>
      <h1>Rock Paper Scissors</h1>
      <div className='game'>
        <Button
          onClick={() => console.log('action')}
          variant='bet'
          className='rock'
          >
          <span className='bet-amount'>500</span>
          <span>Rock</span>
        </Button>
        <Button
          onClick={() => console.log('action')}
          variant='bet'
          className='paper'
          >
          <span className='bet-amount'>500</span>
          <span>Paper</span>
        </Button>
        <Button
          onClick={() => console.log('action')}
          variant='bet'
          className='scissors'
          disabled
          >
          <span className='bet-amount'>500</span>
          <span>Scissors</span>
        </Button>
      </div>
      <Button
        onClick={() => console.log('action')}
        >
        <span>Play</span>
      </Button>

      
    </>
  )
}

export default App
