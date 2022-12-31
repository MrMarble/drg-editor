import type { DWARFS } from '@/constant';
import { PERK_UID, UUIDS, XP_TABLE } from '@/constant';
import useChangesStore from '@/stores/changesStore';
import { useFilterStore } from '@/stores/filterStore';
import useSaveStore from '@/stores/saveStore';
import { useEffect, useState } from 'react';
import xpToLevel from './_helpers/xpToLevel';

const XP_OFFSET = 26;
const CLASS_UID = '030000005850';
const PROMOTION_OFFSET = 108;
const PERK_OFFSET = 26;
const MAX_LEVEL = 25;

interface Properties {
  dwarf: DWARFS;
}

interface ReturnType {
  state: {
    level: number;
    xp: number;
    promotion: number;
    perks: number;
  };
  actions: {
    onLevelChange: (value: number) => void;
    onXpChange: (value: number) => void;
    onPromotionChange: (value: number) => void;
    onPerkChange: (value: number) => void;
  };
}

function useDwarf({ dwarf }: Properties): ReturnType {
  const DWARF_UID = `${UUIDS[dwarf] as string}${CLASS_UID}`;
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();
  const { clearFilters } = useFilterStore();

  const [level, setLevel] = useState(
    () => xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).level
  );
  const [xp, setXp] = useState(
    () => xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).xp
  );

  const [promotion, setPromotion] = useState(() =>
    save.getInt32(DWARF_UID, XP_OFFSET + PROMOTION_OFFSET)
  );

  // Perks points are shared between all dwarfs, maybe move this somewhere else?
  const [perks, setPerks] = useState(() => {
    const points = save.getInt32(PERK_UID, PERK_OFFSET);
    return points > 0 ? points : 0;
  });

  useEffect(
    () => () => {
      clearFilters();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setLevel(xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).level);
    setXp(xpToLevel(save.getInt32(DWARF_UID, XP_OFFSET)).xp);
    setPromotion(save.getInt32(DWARF_UID, XP_OFFSET + PROMOTION_OFFSET));
  }, [DWARF_UID, save]);

  const onLevelChange = (value: number): void => {
    const changedLevel = Math.max(1, Math.min(MAX_LEVEL, value));
    if (changedLevel >= MAX_LEVEL) {
      setXp(0);
    }

    setLevel(changedLevel);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET, XP_TABLE[changedLevel - 1] + xp);
    setSave(save);
  };

  const onXpChange = (value: number): void => {
    const ChangedXp = Math.max(0, Math.min(XP_TABLE[level], value));

    setXp(ChangedXp);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET, XP_TABLE[level - 1] + ChangedXp);
    setSave(save);
  };

  const onPromotionChange = (value: number): void => {
    setPromotion(value);
    increment();
    save.setInt32(DWARF_UID, XP_OFFSET + PROMOTION_OFFSET, value);
    setSave(save);
  };

  const onPerkChange = (value: number): void => {
    setPerks(value);
    increment();
    save.setInt32(PERK_UID, PERK_OFFSET, value);
    setSave(save);
  };

  return {
    state: {
      level,
      xp,
      promotion,
      perks
    },
    actions: {
      onLevelChange,
      onXpChange,
      onPromotionChange,
      onPerkChange
    }
  };
}

export default useDwarf;
