/* eslint-disable @typescript-eslint/no-magic-numbers */
import useSaveStore from '@/stores/saveStore';
import { useState } from 'react';

export const SEASONS = {
  'RIVAL SCALATION': [
    0xb8, 0x60, 0xb5, 0x5f, 0x1d, 0x1b, 0xb5, 0x4d, 0x8e, 0xe2, 0xe4, 0x1f,
    0xda, 0x9f, 0x58, 0x38
  ],
  PLAGUEFALL: [
    0xd8, 0x81, 0x0f, 0x6c, 0x76, 0xd3, 0x74, 0x41, 0x9a, 0xe6, 0xa1, 0x8e,
    0xf5, 0xb3, 0xba, 0x26
  ]
};

interface ReturnType {
  state: {
    activeTab: keyof typeof SEASONS;
    tabs: (keyof typeof SEASONS)[];
  };
  actions: {
    onChange: (value: keyof typeof SEASONS) => void;
  };
}

function useSeasons(): ReturnType {
  const { save } = useSaveStore();
  const tabs = Object.keys(SEASONS).filter(
    key => save.indexOfMulti(SEASONS[key as keyof typeof SEASONS]) !== -1
  ) as (keyof typeof SEASONS)[];

  const [activeTab, setActiveTab] = useState<keyof typeof SEASONS>(
    tabs.at(-1) as keyof typeof SEASONS
  );

  const onChange = (value: keyof typeof SEASONS): void => {
    setActiveTab(value);
  };

  return {
    state: { activeTab, tabs },
    actions: { onChange }
  };
}

export default useSeasons;
