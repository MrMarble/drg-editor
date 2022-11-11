import clsx from "clsx";
import { useEffect, useState } from "react";
import { ITEMS, RESOURCES } from "../../constant/resources";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";
import { Rank } from "../UI/Layout";
import { WIP } from "../Wip";

const XP_PER_LEVEL = 5000;

const SEASONS = {
  "RIVAL SCALATION": [
    0xb8, 0x60, 0xb5, 0x5f, 0x1d, 0x1b, 0xb5, 0x4d, 0x8e, 0xe2, 0xe4, 0x1f,
    0xda, 0x9f, 0x58, 0x38,
  ],
  PLAGUEFALL: [
    0xd8, 0x81, 0x0f, 0x6c, 0x76, 0xd3, 0x74, 0x41, 0x9a, 0xe6, 0xa1, 0x8e,
    0xf5, 0xb3, 0xba, 0x26,
  ],
};

const XP_OFFSET = 32;

export const Seasons = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof SEASONS>("PLAGUEFALL");

  const handleChange = (value: keyof typeof SEASONS) => {
    setActiveTab(value);
  };

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center border-b border-drg-primary-500 mb-10">
        <ul className="flex flex-wrap -mb-px">
          {Object.keys(SEASONS).map((season) => (
            <li key={season}>
              <a
                className={clsx(
                  "inline-block p-4 rounded-t-lg border-b-2 border-transparent text-gray-400 hover:text-gray-600 hover:border-drg-primary-400 dark:hover:text-gray-300 cursor-pointer",
                  activeTab === season && "text-gray-200"
                )}
                onClick={() => handleChange(season as keyof typeof SEASONS)}
              >
                {season}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Season season={activeTab} key={activeTab} />
    </div>
  );
};

export const Season = ({ season }: { season: keyof typeof SEASONS }) => {
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();
  const [seasonUid, setSeasonUid] = useState(SEASONS[season]);
  const [level, setLevel] = useState(
    Math.floor(save.getInt32(seasonUid, XP_OFFSET) / XP_PER_LEVEL)
  );
  const [xp, setXp] = useState(
    Math.floor(save.getInt32(seasonUid, XP_OFFSET) % XP_PER_LEVEL)
  );
  const [scrip, setScrip] = useState(
    save.getInt32(RESOURCES[ITEMS.SCRIP], 0, save.indexOfMulti(seasonUid))
  );

  const handleLevelChange = (value: number) => {
    setLevel(value);
    increment();
    save.setInt32(seasonUid, XP_OFFSET, value * XP_PER_LEVEL + xp);
    setSave(save);
  };

  const handleXpChange = (value: number) => {
    setXp(value);
    increment();
    save.setInt32(seasonUid, XP_OFFSET, level * XP_PER_LEVEL + value);
    setSave(save);
  };

  const handleScripChange = (value: number) => {
    setScrip(value);
    increment();
    save.setInt32(
      RESOURCES[ITEMS.SCRIP],
      0,
      value,
      save.indexOfMulti(seasonUid)
    );
    setSave(save);
  };

  useEffect(() => {
    setSeasonUid(SEASONS[season]);
    setLevel(Math.floor(save.getInt32(seasonUid, XP_OFFSET) / XP_PER_LEVEL));
    setXp(Math.floor(save.getInt32(seasonUid, XP_OFFSET) % XP_PER_LEVEL));
    setScrip(
      save.getInt32(RESOURCES[ITEMS.SCRIP], 0, save.indexOfMulti(seasonUid))
    );
  }, [season]);

  return (
    <div className="w-full ">
      <Rank>
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
      </Rank>
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

export default Seasons;
