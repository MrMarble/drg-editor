import clsx from 'clsx';
import type { ReactElement } from 'react';

interface TabProperties {
  icon: string;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onClick: (name: string) => void;
}

function Tab({
  label,
  icon,
  disabled,
  active,
  onClick
}: TabProperties): ReactElement {
  return (
    <li
      className={clsx(
        disabled ? 'disabled' : 'hover:border-drg-primary-300',
        'display-block my-1 rounded-md font-medium'
      )}
      role='tab'
    >
      <button
        type='button'
        onClick={(): void => onClick(label)}
        className={clsx(
          active && 'border-b-4 !border-drg-primary-500',
          'flex-col justify-center rounded-none focus:bg-transparent active:bg-slate-200 active:bg-opacity-10 md:flex-col md:justify-start lg:flex-row'
        )}
      >
        <img src={icon} alt={label} className='w-12' />
        <p className='my-auto text-sm md:text-sm'>{label}</p>
      </button>
    </li>
  );
}

export default Tab;
