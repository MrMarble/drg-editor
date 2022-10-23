import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { VscWorkspaceUnknown } from "react-icons/vsc";

export const Dropdown: FC<{
  initialValue: number;
  name: string;
  label?: string;
  items: Array<string>;
  onChange?: (value: number) => void;
}> = ({ initialValue, name, label, onChange, items }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue === value) return;

    if (isNaN(newValue)) {
      setValue(0);
      return;
    }

    setValue(newValue);
    onChange && onChange(newValue);
  };

  const DwarfPromotionEmblem = ({ value }: { value: number }) => {
    const DEFAULT_Y_POSITION = 2;
    const GRID_LENGHT = 3;
    let xOffsetPercent = 48,
      yOffsetPercent = 19.5;
    value -= 1;

    xOffsetPercent =
      value % GRID_LENGHT ? xOffsetPercent * (value % GRID_LENGHT) : 0;

    yOffsetPercent =
      value < GRID_LENGHT
        ? DEFAULT_Y_POSITION
        : yOffsetPercent * Math.floor(value / GRID_LENGHT) + DEFAULT_Y_POSITION;

    return (
      <span
        className="emblems"
        style={{
          backgroundPosition: `${xOffsetPercent}% ${yOffsetPercent}%, center`,
        }}
      />
    );
  };

  return (
    <div className="block">
      <label
        htmlFor={name.toLowerCase()}
        className="label-text text-sm capitalize"
      >
        {name}
      </label>
      <div className="input-group">
        <span className="border-drg-primary-700 pointer-events-none select-none border text-sm">
          <div className="mx-auto flex w-8 max-w-none">
            {![0, items.length - 1].includes(value) ? (
              <DwarfPromotionEmblem value={value} />
            ) : (
              <div className="mx-auto">
                <VscWorkspaceUnknown size={24} />
              </div>
            )}
          </div>

          {label && <b>{label}</b>}
        </span>
        <select
          className="drg-select select border-drg-primary-700 w-full max-w-xs bg-transparent text-[13px] tracking-wider lg:w-44"
          onChange={handleChange}
          defaultValue={initialValue}
        >
          {items.map((item: string, index: number) => {
            return (
              <option className="text-sm" key={index} value={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
