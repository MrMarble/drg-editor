import React from 'react'

type Props = {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({children, onClick, ...restProps}: Props) => {
  return (
    <div className="border-drg-primary-600 border-l-4 border-r-4 px-1 hover:border-drg-secondary-400 group transition-all duration-300">
      <button className="px-4 py-1 text-slate-900 bg-drg-primary-500 group-hover:hover:bg-drg-secondary-400" onClick={onClick} {...restProps}>
        {children}
      </button>
    </div>
  )
}

export default Button