import { useGameStore } from '../../../store/gameStore'
import HeaderItem from '../HeaderItem'


const BetHeaderItem = () => {
  const balance = useGameStore((s) => s.balance)
  return <HeaderItem label="Bet" value={0} />
}

export default BetHeaderItem