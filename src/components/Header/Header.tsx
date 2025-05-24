import './header.css'

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        {children}
      </div>
    </header>
  )
}

export default Header