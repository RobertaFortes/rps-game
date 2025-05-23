import { useGameStore } from '../../../store/gameStore'
import HeaderItem from '../HeaderItem'


const BalanceHeaderItem = () => {
  const balance = useGameStore((s) => s.balance)
  return <HeaderItem label="Balance" value={balance} />
}

export default BalanceHeaderItem