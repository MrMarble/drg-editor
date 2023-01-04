import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';
import Tab from './tab/tab';

interface SideBarProperties {
  onClick: (name: string) => void;
  tabs: { name: string; icon: string }[];
}

function SideBar({
  children,
  tabs,
  onClick
}: PropsWithChildren<SideBarProperties>): ReactElement {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const onTabClick = (tab: string): void => {
    setActiveTab(tab);
    onClick(tab);
  };

  return (
    <div className='flex max-w-7xl flex-col md:flex-col lg:flex-row'>
      <div className='mr-3 h-full w-auto border-drg-primary-500 p-3 lg:w-[250px] lg:border-r-2'>
        <ul className='menu mr-4 flex-row flex-wrap justify-evenly md:flex-row lg:flex-col'>
          {tabs.map(tab => (
            <Tab
              key={tab.name}
              icon={tab.icon}
              label={tab.name}
              active={tab.name === activeTab}
              onClick={onTabClick}
            />
          ))}
        </ul>
      </div>
      <div className='box-border flex h-full w-auto flex-row p-6 lg:h-[700px] lg:w-[1200px]'>
        {children}
      </div>
    </div>
  );
}

export default SideBar;
