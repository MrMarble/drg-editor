import type { FilterType } from '@/stores/filterStore';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import useFilter from './useFilter';

interface ItemsType {
  name: string;
  description?: string;
  type: string;
  category?: string;
  weapon: string;
  asset: string;
  ID: string;
}

interface Properties {
  keySelector: FilterType;
  items?: ItemsType[];
  label: string;
  tabIndex?: number;
}

function FilterElement({
  items,
  label,
  keySelector,
  tabIndex
}: Properties): ReactElement {
  const {
    state: { filters, filterWithoutDuplicates },
    actions: { onFilterChange }
  } = useFilter({ items, keySelector });

  return (
    <div className='dropdown'>
      <span
        tabIndex={tabIndex}
        className={clsx(
          filters[keySelector]?.length ? 'bg-drg-primary-600' : 'bg-slate-800',
          'cursor-pointer select-none rounded-sm px-4  py-1 text-sm'
        )}
      >
        {label}
      </span>

      <ul
        tabIndex={tabIndex}
        className='flex-start drg-scrollbar drg-internal-scrollbar dropdown-content absolute right-0 mt-2 max-h-[300px] w-52 scroll-m-0 overflow-auto overflow-x-hidden rounded-md bg-slate-700 pb-2 text-xs shadow not-first:px-3'
      >
        <div className='sticky top-0 mb-2 flex select-none gap-2 border-b-2 bg-slate-700 py-2'>
          {label}
        </div>
        {filterWithoutDuplicates.map(content =>
          content[keySelector] ? (
            <li
              key={content.ID}
              className='flex select-none gap-2 p-1 first:mt-5'
            >
              <input
                className='checkbox h-4 w-4 rounded-sm'
                type='checkbox'
                name={content[keySelector]}
                onChange={onFilterChange}
                id={content[keySelector]}
                defaultChecked={false}
              />
              <label
                htmlFor={content[keySelector]}
                className='my-auto cursor-pointer'
              >
                <span className='w-[30px] whitespace-normal'>
                  {content[keySelector]?.split(/(?=[A-Z])/).join(' ')}
                </span>
              </label>
            </li>
          ) : undefined
        )}
        ;
      </ul>
    </div>
  );
}

export default FilterElement;
