import { FC, useState } from "react";
import { DWARFS, UUIDS } from "../../constant/dwarfs";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";
import { WIP } from "../Wip";

const XP_OFFSET = 26;
const CLASS_UID = [0x03, 0x00, 0x00, 0x00, 0x58, 0x50];
const XP_TABLE = [
  0, 3000, 7000, 12000, 18000, 25000, 33000, 42000, 52000, 63000, 75000, 88000,
  102000, 117000, 132500, 148500, 165000, 182000, 199500, 217500, 236000,
  255000, 274500, 294500, 315000,
];

const xpToLevel = (xp: number) => {
  for (let i = 0; i < XP_TABLE.length; i++) {
    if (xp < XP_TABLE[i]) {
      return { level: i, xp: xp - XP_TABLE[i - 1] };
    }
  }
  return { level: 25, xp: 0 };
};

export const Dwarf: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  const DWARF_UID = [...UUIDS[dwarf], ...CLASS_UID];
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();

  const [level, setLevel] = useState(
    xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).level
  );
  const [xp, setXp] = useState(
    xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).xp
  );

  const handleLevelChange = (value: number) => {
    if (value < 1) {
      value = 1;
    }
    if (value >= 25) {
      value = 25;
      setXp(0);
    }
    setLevel(value);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET, XP_TABLE[value - 1] + xp);
    setSave(save);
    console.log({ level: value, xp, total: XP_TABLE[value - 1] + xp });
  };

  const handleXpChange = (value: number) => {
    if (value > XP_TABLE[level]) {
      value = XP_TABLE[level];
    }
    setXp(value);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET, XP_TABLE[level - 1] + value);
    console.log({ level, xp: value, total: XP_TABLE[level - 1] + value });
    setSave(save);
  };

  return (
    <div className="w-full ">
      <div className="not-first:mt-10">
        <span className="border-b-2 border-drg-primary-500 capitalize text-sm">
          Rank
        </span>
        <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3">
          <Input
            name="Level"
            initialValue={level}
            icon="assets/level.webp"
            max={25}
            onChange={handleLevelChange}
          />
          <Input
            name="Progress"
            initialValue={xp}
            label="XP"
            max={XP_TABLE[level] - XP_TABLE[level - 1] || undefined}
            onChange={handleXpChange}
          />
        </div>
      </div>
      <div className="not-first:mt-10">
        <span className="border-b-2 border-drg-primary-500 capitalize text-sm">
          Cosmetics
        </span>
        <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3  max-h-96 overflow-auto">
          <WIP />
        </div>
      </div>
    </div>
  );
};
