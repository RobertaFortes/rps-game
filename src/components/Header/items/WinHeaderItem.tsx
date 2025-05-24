import { useGameStore } from '../../../store/gameStore'
import HeaderItem from '../HeaderItem'

const WinHeaderItem = () => {
  const profit = useGameStore(s => s.profit)

  return <HeaderItem label="Win" value={profit} />
}

export default WinHeaderItem