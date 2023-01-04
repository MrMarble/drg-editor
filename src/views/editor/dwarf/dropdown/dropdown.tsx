import type { ReactElement } from 'react';
import { VscWorkspaceUnknown } from 'react-icons/vsc';
import useDropdown from './useDropdown';

interface Properties {
  initialValue: number;
  name: string;
  label?: string;
  onChange: (value: number) => void;
  items: string[];
}

function DwarfPromotionEmblem({ value }: { value: number }): ReactElement {
  const DEFAULT_Y_POSITION = 2;
  const GRID_LENGHT = 3;
  const promotion = value - 1;
  const baseXOffset = 48;
  const baseYOffset = 19.5;

  const xOffsetPercent =
    promotion % GRID_LENGHT ? baseXOffset * (promotion % GRID_LENGHT) : 0;

  const yOffsetPercent =
    promotion < GRID_LENGHT
      ? DEFAULT_Y_POSITION
      : baseYOffset * Math.floor(promotion / GRID_LENGHT) + DEFAULT_Y_POSITION;

  return (
    <span
      className='emblems'
      style={{
        backgroundPosition: `${xOffsetPercent}% ${yOffsetPercent}%, center`
      }}
    />
  );
}

function Dropdown({
  initialValue,
  name,
  label,
  onChange,
  items
}: Properties): ReactElement {
  const {
    state: { value },
    actions: { onPromotionChange }
  } = useDropdown({ onChange, initialValue });

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
          <div className='mx-auto flex w-8 max-w-none'>
            {[0, items.length - 1].includes(value) ? (
              <div className='mx-auto'>
                <VscWorkspaceUnknown size={24} />
              </div>
            ) : (
              <DwarfPromotionEmblem value={value} />
            )}
          </div>

          {label ? <b>{label}</b> : undefined}
        </span>
        <select
          className='drg-select select w-full max-w-xs border-drg-primary-700 bg-transparent text-[13px] tracking-wider lg:w-44'
          onChange={onPromotionChange}
          defaultValue={initialValue}
          id={name.toLowerCase()}
        >
          {items.map((item: string, index: number) => (
            <option className='text-sm' key={item} value={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
