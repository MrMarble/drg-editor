import { Layout, Sidebar } from '@/components';
import { DWARFS } from '@/constant';
import type { ReactElement } from 'react';
import { memo, useState } from 'react';
import Dwarf from './dwarf/dwarf';
import Resources from './resources/resources';
import Season from './seasons/seasons';

const TABS = [
  { name: 'Resources', icon: 'assets/resources.webp' },
  { name: 'Season', icon: 'assets/pb.webp' },
  {
    name: DWARFS.DRILLER,
    icon: 'assets/driller.webp'
  },
  {
    name: DWARFS.GUNNER,
    icon: 'assets/gunner.webp'
  },
  {
    name: DWARFS.SCOUT,
    icon: 'assets/scout.webp'
  },
  {
    name: DWARFS.ENGINEER,
    icon: 'assets/engineer.webp'
  }
];

const RenderSwitch = memo(({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case TABS[0].name: {
      return <Resources key={activeTab} />;
    }
    case TABS[1].name: {
      return <Season key={activeTab} />;
    }
    default: {
      return <Dwarf dwarf={activeTab as DWARFS} key={activeTab} />;
    }
  }
});

function EditorView(): ReactElement {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const onTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <Sidebar onClick={onTabClick} tabs={TABS}>
        <RenderSwitch activeTab={activeTab} />
      </Sidebar>
    </Layout>
  );
}

export default EditorView;
