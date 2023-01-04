import { Input, Rank, Wip } from '@/components';
import { ITEMS } from '@/constant';
import type { ReactElement } from 'react';
import type { SEASONS } from '../useSeasons';
import useSeason from './useSeason';

const XP_PER_LEVEL = 5000;
const MAX_LEVEL = 268_435_455;

interface Properties {
  season: keyof typeof SEASONS;
}

function Season({ season }: Properties): ReactElement {
  const {
    state: { level, scrip, xp },
    actions: { onLevelChange, onScripChange, onXpChange }
  } = useSeason({ season });

  return (
    <div className='w-full'>
      <Rank key={season}>
        <Input
          name='Level'
          initialValue={level}
          icon='assets/pb.webp'
          max={Math.floor(MAX_LEVEL / XP_PER_LEVEL)}
          onChange={onLevelChange}
        />
        <Input
          name='Experience'
          initialValue={xp}
          label='XP'
          max={XP_PER_LEVEL - 1}
          onChange={onXpChange}
        />
        <Input
          name={ITEMS.SCRIP}
          icon={`assets/${ITEMS.SCRIP.toLowerCase()}.webp`}
          initialValue={scrip}
          max={0x0f_ff_ff_ff}
          onChange={onScripChange}
        />
      </Rank>
      <div className='not-first:mt-10'>
        <span className='border-b-2 border-drg-primary-500 text-sm capitalize'>
          Cosmetic Tree
        </span>
        <div className='grid-cols mt-3 grid max-h-96 grid-rows-1 gap-2 overflow-auto md:w-auto md:grid-cols-2 lg:grid-cols-2  lg:gap-x-10 xl:grid-cols-3'>
          <Wip />
        </div>
      </div>
    </div>
  );
}
export default Season;
