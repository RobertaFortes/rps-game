import { useGameStore } from '../../../store/gameStore'
import HeaderItem from '../HeaderItem'


const WinHeaderItem = () => {
  const balance = useGameStore((s) => s.balance)
  return <HeaderItem label="Win" value={0} />
}

export default WinHeaderItem