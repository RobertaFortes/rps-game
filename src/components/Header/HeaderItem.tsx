import { memo } from 'react'

interface HeaderItemProps {
  label: string
  value: number
}

const HeaderItem = (({ label, value }: HeaderItemProps) => { 
  return (
    <div className="header-item">
      <span className="header-item__label">{label}:</span>
      <span className="header-item__value"> {value}</span>
    </div>
  )
})

export default memo(HeaderItem)