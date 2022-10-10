import { FC, useState } from "react";

export const Input: FC<{
  initialValue: number;
  name: string;
  icon?: string;
  label?: string;
  max?: number;
  onChange?: (value: number) => void;
}> = ({ initialValue, name, icon, label, onChange, max }) => {
  const [value, setValue] = useState(initialValue);
  const [changed, setChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      setValue(0);
      return;
    }

    if (max && newValue > max) {
      newValue = max;
    }

    setChanged(true);
    setValue(newValue);
  };

  // handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!changed) return;
    const newValue = parseInt(e.target.value);

    if (isNaN(newValue)) return;

    setValue(newValue);
    setChanged(false);
    onChange && onChange(newValue);
  };

  // handle enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  // handle max click
  const handleMax = () => {
    if (max === undefined) return;
    if (value === max) return;

    setValue(max);
    onChange && onChange(max);
  };

  return (
    <div className="block">
      <label
        htmlFor={name.toLowerCase()}
        className="label-text capitalize text-sm"
      >
        {name}
      </label>
      <div className="input-group">
        <span className="pointer-events-none select-none border-drg-primary-700 border text-sm">
          {icon && <img src={icon} className="w-6 max-w-none" />}
          {label && <b>{label}</b>}
        </span>
        <input
          id={name.toLowerCase()}
          type="text"
          className="input bg-transparent border-drg-primary-700 w-full lg:w-32 text-sm tracking-wider"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {max && (
          <button
            className="btn btn-square bg-drg-primary-400 hover:bg-drg-secondary-500 text-slate-900 text-xs"
            onClick={handleMax}
          >
            Max
          </button>
        )}
      </div>
    </div>
  );
};
