import type { PropsWithChildren, ReactElement } from 'react';

function Button({
  onClick,
  children,
  ...restProperties
}: PropsWithChildren<{ onClick: () => void }>): ReactElement {
  return (
    <div className='group border-l-4 border-r-4 border-drg-primary-600 px-1 transition-all duration-300 hover:border-drg-secondary-400'>
      <button
        type='button'
        className='bg-drg-primary-500 px-4 py-1 text-slate-900 group-hover:hover:bg-drg-secondary-400'
        onClick={onClick}
        {...restProperties}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
