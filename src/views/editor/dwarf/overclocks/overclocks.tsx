import Schematics from '@/../data/schematics.json';
import type { DWARFS } from '@/constant';
import type { FilterType } from '@/stores/filterStore';
import type { ReactElement } from 'react';
import Overclock from './overclock/overclock';
import useOverclocks from './useOverclocks';

function Overclocks({ dwarf }: { dwarf: DWARFS }): ReactElement {
  const {
    state: { owned, forged, filters },
    actions: { onLock, onUnlock, onForge }
  } = useOverclocks();

  return (
    <>
      {Schematics[dwarf].map(
        oc =>
          Object.keys(filters).every(key =>
            filters[key as FilterType]?.includes(
              (oc as Record<string, string> & typeof oc)[key]
            )
          ) && (
            <Overclock
              key={oc.ID}
              owned={owned.includes(oc.ID)}
              forged={forged.includes(oc.ID)}
              onLock={onLock}
              onUnlock={onUnlock}
              onForge={onForge}
              name={oc.name}
              type={oc.type}
              asset={oc.asset}
              ID={oc.ID}
            />
          )
      )}
    </>
  );
}

export default Overclocks;
