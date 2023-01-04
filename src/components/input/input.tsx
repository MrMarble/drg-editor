import type { ReactElement } from 'react';
import { useState } from 'react';

interface InputProperties {
  initialValue: number;
  name: string;
  icon?: string;
  label?: string;
  max?: number;
  onChange?: (value: number) => void;
}

// handle enter key
const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  if (event.key === 'Enter') {
    event.currentTarget.blur();
  }
};

function Input({
  initialValue,
  name,
  icon,
  label,
  onChange,
  max
}: InputProperties): ReactElement {
  const [value, setValue] = useState(initialValue);
  const [changed, setChanged] = useState(false);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let changedValue = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(changedValue)) {
      setValue(0);
      return;
    }

    if (max && changedValue > max) {
      changedValue = max;
    }

    setChanged(true);
    setValue(changedValue);
  };

  // handle blur
  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (!changed) return;
    const changedValue = Number.parseInt(event.target.value, 10);

    if (Number.isNaN(changedValue)) return;

    setValue(changedValue);
    setChanged(false);
    if (onChange) onChange(changedValue);
  };

  // handle max click
  const onMaxClick = (): void => {
    if (max === undefined) return;
    if (value === max) return;

    setValue(max);
    if (onChange) onChange(max);
  };

  return (
    <div className='block'>
      <label
        htmlFor={name.toLowerCase()}
        className='label-text text-sm capitalize'
      >
        {name}
      </label>
      <div className='input-group'>
        <span className='pointer-events-none select-none border border-drg-primary-700 text-sm'>
          {icon ? (
            <img src={icon} className='w-6 max-w-none' alt={label} />
          ) : undefined}
          {label ? <b>{label}</b> : undefined}
        </span>
        <input
          id={name.toLowerCase()}
          type='text'
          className='input w-full border-drg-primary-700 bg-transparent text-sm tracking-wider lg:w-32'
          value={value}
          onChange={onInputChange}
          onBlur={onInputBlur}
          onKeyDown={onInputKeyDown}
        />
        <button
          type='button'
          className='btn btn-square bg-drg-primary-400 text-xs text-slate-900 hover:bg-drg-secondary-500 disabled:border-2 disabled:border-l-0 disabled:border-drg-primary-700'
          onClick={onMaxClick}
          disabled={!max}
        >
          Max
        </button>
      </div>
    </div>
  );
}

export default Input;
