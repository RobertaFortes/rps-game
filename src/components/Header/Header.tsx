import "./header.css"

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="header">
      {children}
    </header>
  )
}

export default Header