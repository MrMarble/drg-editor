import { FC, useState } from "react";
import { VscWorkspaceUnknown } from "react-icons/vsc";

export const Dropdown: FC<{
  initialValue: number;
  name: string;
  label?: string;
  items: Array<string>;
  onChange?: (value: number) => void;
}> = ({ initialValue, name, label, onChange, items }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: any) => {
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
        className="label-text capitalize text-sm"
      >
        {name}
      </label>
      <div className="input-group">
        <span className="pointer-events-none select-none border-drg-primary-700 border text-sm">
          <div className="w-8 max-w-none flex mx-auto">
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
          className="select w-full max-w-xs bg-transparent border-drg-primary-700 lg:w-44 text-[13px] tracking-wider drg-select"
          onChange={handleChange}
        >
          {items.map((item: string, index: number) => {
            return (
              <option
                className="text-sm"
                key={index}
                value={index}
                selected={initialValue === index}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
