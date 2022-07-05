interface ButtonProps {
  children: React.ReactNode
  variant: `green` | `blue`
  isButton?: boolean
  href?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  const setupVariant = (variant: `green` | `blue`): string => {
    switch (variant) {
      case `green`:
        return `p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors`
      case `blue`:
        return `p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center transition-colors hover:bg-blue-500 hover:text-gray-900 `
      default:
        return `p-4 text-sm flex items-center rounded font-bold uppercase gap-2 justify-center transition-colors bg-gray-700 text-white`
    }
  }

  return (
    <>
      {props.isButton ? (
        <button className={setupVariant(props.variant)} onClick={props.onClick}>
          {props.children}
        </button>
      ) : (
        <a className={setupVariant(props.variant)} href={props.href ?? `#`}>
          {props.children}
        </a>
      )}
    </>
  )
}

export default Button

Button.defaultProps = {
  variant: `green`,
  isButton: false,
}
