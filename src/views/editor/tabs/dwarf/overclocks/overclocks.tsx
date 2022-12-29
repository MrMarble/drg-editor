import Schematics from "@/../data/schematics.json";
import { DWARFS } from "@/constant";
import { FilterType, useFilterStore } from "@/stores/filterStore";
import { FC } from "react";
import { Overclock } from "./overclock";
import { useOverclocks } from "./use-overclocks";

export const Overclocks: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  const {
    state: { owned, forged },
    actions: { lock, unlock, forge },
  } = useOverclocks();

  const { filters } = useFilterStore();

  return (
    <>
      {Schematics[dwarf].map((oc) => {
        return (
          Object.keys(filters).every((key) =>
            filters[key as FilterType]?.includes(
              (oc as { [key: string]: string } & typeof oc)?.[key]
            )
          ) && (
            <Overclock
              key={oc.ID}
              dwarf={dwarf}
              owned={owned.includes(oc.ID)}
              forged={forged.includes(oc.ID)}
              handleLock={lock}
              handleUnlock={unlock}
              handleForge={forge}
              {...oc}
            />
          )
        );
      })}
    </>
  );
};
