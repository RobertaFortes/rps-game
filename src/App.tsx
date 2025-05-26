import './App.css'
import GameScreen from './screens/GameScreen/GameScreen'
import Header from './components/Header/Header'
import BalanceHeaderItem from './components/Header/items/BalanceHeaderItem'
import BetHeaderItem from './components/Header/items/BetHeaderItem'
import WinHeaderItem from './components/Header/items/WinHeaderItem'

function App() {
  return (
    <>
      <Header>
        <BalanceHeaderItem />
        <BetHeaderItem />
        <WinHeaderItem />
      </Header>
      <GameScreen /> 
    </>
  )
}

export default App
