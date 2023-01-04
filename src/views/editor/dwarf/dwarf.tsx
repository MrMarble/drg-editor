import { Input, Rank } from '@/components/';
import type { DWARFS } from '@/constant';
import { PROMO_RANKS, XP_TABLE } from '@/constant';
import type { ReactElement } from 'react';
import Dropdown from './dropdown/dropdown';
import Filters from './filters/filters';
import Overclocks from './overclocks/overclocks';
import useDwarf from './useDwarf';

interface Properties {
  dwarf: DWARFS;
}

const MAX_PERK_POINTS = 268_435_455;

function Dwarf({ dwarf }: Properties): ReactElement {
  const {
    state: { level, xp, promotion, perks },
    actions: { onLevelChange, onPerkChange, onPromotionChange, onXpChange }
  } = useDwarf({ dwarf });

  return (
    <div className='w-full' id='dwarf'>
      <Rank key={dwarf}>
        <>
          <Input
            name='Level'
            initialValue={level}
            icon={`${import.meta.env.BASE_URL}assets/level.webp`}
            max={25}
            onChange={onLevelChange}
          />
          <Input
            name='Progress'
            initialValue={xp}
            label='XP'
            max={XP_TABLE[level] - XP_TABLE[level - 1] || undefined}
            onChange={onXpChange}
          />
          <Dropdown
            items={PROMO_RANKS}
            name='Promotion'
            initialValue={promotion}
            onChange={onPromotionChange}
          />
          <Input
            name='Perks Points'
            initialValue={perks}
            icon={`${import.meta.env.BASE_URL}assets/perks.webp`}
            max={MAX_PERK_POINTS}
            onChange={onPerkChange}
          />
        </>
      </Rank>
      <div className='relative not-first:mt-10'>
        <Filters dwarf={dwarf} />
        <span className='border-b-2 border-drg-primary-500 text-sm capitalize'>
          Overclocks
        </span>
        <div className='drg-scrollbar drg-internal-scrollbar mt-3 max-h-96 overflow-auto md:w-auto'>
          <div className='grid-cols relative mr-4 grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
            <Overclocks dwarf={dwarf} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dwarf;
