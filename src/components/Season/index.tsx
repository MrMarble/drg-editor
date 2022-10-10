import { useState } from "react";
import { ITEMS, RESOURCES } from "../../constant/resources";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";
import { WIP } from "../Wip";

const XP_PER_LEVEL = 5000;
const SEASON_UID = [
  0xb8, 0x60, 0xb5, 0x5f, 0x1d, 0x1b, 0xb5, 0x4d, 0x8e, 0xe2, 0xe4, 0x1f, 0xda,
  0x9f, 0x58, 0x38,
];
const XP_OFFSET = 32;

export const Season = () => {
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();
  const [level, setLevel] = useState(
    Math.floor(save.getInt32(SEASON_UID, XP_OFFSET) / XP_PER_LEVEL)
  );
  const [xp, setXp] = useState(
    Math.floor(save.getInt32(SEASON_UID, XP_OFFSET) % XP_PER_LEVEL)
  );
  const [scrip, setScrip] = useState(save.getInt32(RESOURCES[ITEMS.SCRIP], 0));

  const handleLevelChange = (value: number) => {
    setLevel(value);
    increment();
    save.setInt32(SEASON_UID, XP_OFFSET, value * XP_PER_LEVEL + xp);
    setSave(save);
  };

  const handleXpChange = (value: number) => {
    setXp(value);
    increment();
    save.setInt32(SEASON_UID, XP_OFFSET, level * XP_PER_LEVEL + value);
    setSave(save);
  };

  const handleScripChange = (value: number) => {
    setScrip(value);
    increment();
    save.setInt32(RESOURCES[ITEMS.SCRIP], 0, value);
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
            icon="assets/pb.webp"
            max={Math.floor(0x0fffffff / XP_PER_LEVEL)}
            onChange={handleLevelChange}
          />
          <Input
            name="Experience"
            initialValue={xp}
            label="XP"
            max={XP_PER_LEVEL - 1}
            onChange={handleXpChange}
          />
          <Input
            name={ITEMS.SCRIP}
            icon={`assets/${ITEMS.SCRIP.toLowerCase()}.webp`}
            initialValue={scrip}
            max={0x0fffffff}
            onChange={handleScripChange}
          />
        </div>
      </div>
      <div className="not-first:mt-10">
        <span className="border-b-2 border-drg-primary-500 capitalize text-sm">
          Cosmetic Tree
        </span>
        <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3  max-h-96 overflow-auto">
          <WIP />
        </div>
      </div>
    </div>
  );
};
