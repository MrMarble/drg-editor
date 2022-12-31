import { ITEMS, RESOURCES } from '@/constant';
import useChangesStore from '@/stores/changesStore';
import useSaveStore from '@/stores/saveStore';
import { useEffect, useState } from 'react';
import { SEASONS } from '../useSeasons';

const XP_PER_LEVEL = 5000;
const XP_OFFSET = 32;

interface Properties {
  season: keyof typeof SEASONS;
}

interface ReturnType {
  state: {
    level: number;
    xp: number;
    scrip: number;
  };
  actions: {
    onLevelChange: (value: number) => void;
    onXpChange: (value: number) => void;
    onScripChange: (value: number) => void;
  };
}

function useSeason({ season }: Properties): ReturnType {
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

  const onLevelChange = (value: number): void => {
    setLevel(value);
    increment();
    save.setInt32(seasonUid, XP_OFFSET, value * XP_PER_LEVEL + xp);
    setSave(save);
  };

  const onXpChange = (value: number): void => {
    setXp(value);
    increment();
    save.setInt32(seasonUid, XP_OFFSET, level * XP_PER_LEVEL + value);
    setSave(save);
  };

  const onScripChange = (value: number): void => {
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
  }, [save, season, seasonUid]);

  return {
    state: { level, xp, scrip },
    actions: {
      onXpChange,
      onScripChange,
      onLevelChange
    }
  };
}

export default useSeason;
