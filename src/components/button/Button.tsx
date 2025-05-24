import "./button.css"

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'bet'
  className?: string
}

const Button = ({
  children,
  onClick,
  variant = 'default',
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button