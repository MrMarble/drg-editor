import { FC, useState } from "react";
import { DWARFS, PERK_UID, PROMO_RANKS, UUIDS, XP_TABLE } from "../../constant";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";
import { Rank } from "../UI/Layout";
import { WIP } from "../Wip";
import { Dropdown } from "./Dropdown";

const XP_OFFSET = 26;
const CLASS_UID = "030000005850";

const xpToLevel = (xp: number) => {
  for (let i = 0; i < XP_TABLE.length; i++) {
    if (xp < XP_TABLE[i]) {
      return { level: i, xp: xp - XP_TABLE[i - 1] };
    }
  }
  return { level: 25, xp: 0 };
};

export const Dwarf: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  const DWARF_UID = UUIDS[dwarf] + CLASS_UID;
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();

  const [level, setLevel] = useState(
    xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).level
  );
  const [xp, setXp] = useState(
    xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).xp
  );

  const [promotion, setPromotion] = useState(() =>
    save.getInt32(DWARF_UID, XP_OFFSET + 108)
  );

  // Perks points are shared between all dwarfs, maybe move this somewhere else?
  const [perks, setPerks] = useState(() => {
    const points = save.getInt32(PERK_UID, 26);
    return points > 0 ? points : 0;
  });

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

  const handlePromotionChange = (value: number) => {
    setPromotion(value);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET + 108, value);
    setSave(save);
  };

  const handlePerkChange = (value: number) => {
    setPerks(value);
    increment();
    save.setInt32(PERK_UID, 26, value);
    setSave(save);
  };

  return (
    <div className="w-full ">
      <Rank>
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
        <Dropdown
          items={PROMO_RANKS}
          name="Promotion"
          initialValue={promotion}
          onChange={handlePromotionChange}
        />
        <Input
          name="Perks Points"
          initialValue={perks}
          icon="assets/perks.webp"
          max={0x0fffffff}
          onChange={handleXpChange}
        />
      </Rank>

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

export default Dwarf;
