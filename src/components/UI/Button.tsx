import type { FC, ReactNode } from "react";

const Button: FC<{ children: ReactNode; onClick: () => void }> = ({
  children,
  onClick,
  ...restProps
}) => {
  return (
    <div className="group border-drg-primary-600 hover:border-drg-secondary-400 border-x-4 px-1 transition-all duration-300">
      <button
        className="bg-drg-primary-500 group-hover:hover:bg-drg-secondary-400 px-4 py-1 text-slate-900"
        onClick={onClick}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
