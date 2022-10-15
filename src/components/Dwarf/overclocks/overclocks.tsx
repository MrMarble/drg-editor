import type { FC } from "react";
import Schematics from "../../../../data/schematics.json";
import { DWARFS } from "../../../constant";
import { Overclock } from "./overclock";
import { useOverclocks } from "./use-overclocks";

export const Overclocks: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  const {
    state: { owned, forged },
    actions: { lock, unlock, forge },
  } = useOverclocks(dwarf);

  return (
    <>
      {Schematics[dwarf].map((oc) => (
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
      ))}
    </>
  );
};
