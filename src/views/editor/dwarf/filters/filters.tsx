import Schematics from '@/../data/schematics.json';
import type { DWARFS } from '@/constant';
import { FilterType } from '@/stores/filterStore';
import type { ReactElement } from 'react';
import FilterElement from './filter/filter';

function Filters({ dwarf }: { dwarf: DWARFS }): ReactElement {
  return (
    <div className='absolute top-0 right-0 flex gap-2'>
      {Object.entries(FilterType).map(([, allowedCategory], index: number) => (
        <FilterElement
          key={allowedCategory}
          label={
            allowedCategory.charAt(0).toUpperCase() + allowedCategory.slice(1)
          }
          keySelector={allowedCategory}
          items={Schematics[dwarf]}
          tabIndex={index}
        />
      ))}
    </div>
  );
}

export default Filters;
