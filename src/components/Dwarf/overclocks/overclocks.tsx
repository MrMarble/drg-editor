import { FC, useContext } from "react";
import Schematics from "../../../../data/schematics.json";
import { DWARFS } from "../../../constant";
import FilterContext, { FilterContextType } from "../context/filterContext";
import { flatternFilters } from "../filter/Filters";
import { Overclock } from "./overclock";
import { useOverclocks } from "./use-overclocks";

export const Overclocks: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  const {
    state: { owned, forged },
    actions: { lock, unlock, forge },
  } = useOverclocks();

  const { filters } = useContext(FilterContext) as FilterContextType;

  const flattenedFilters = flatternFilters(
    filters as FilterContextType
  ) as Array<unknown>;

  return (
    <>
      {Schematics[dwarf].map((oc) => {
        if (
          flattenedFilters !== undefined &&
          flattenedFilters.length > 0 &&
          !Object.values(oc).some((el: string) =>
            flattenedFilters?.includes(el)
          )
        )
          return;

        return (
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
        );
      })}
    </>
  );
};
