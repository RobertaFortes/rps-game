import { useGameStore } from '../../../store/gameStore'
import HeaderItem from '../HeaderItem'

const BetHeaderItem = () => {
  const totalBet = useGameStore(
    (s) => s.bets.reduce((sum, bet) => sum + bet.amount, 0)
  )
  return <HeaderItem label="Bet" value={totalBet} />
}

export default BetHeaderItem