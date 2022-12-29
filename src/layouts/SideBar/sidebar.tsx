import { FC, PropsWithChildren, useState } from "react";
import { DWARFS } from "../../constant/dwarfs";
import Tab from "./Tab";

export const TABS = [
  { name: "Resources", icon: "assets/resources.webp" },
  { name: "Season", icon: "assets/pb.webp" },
  {
    name: DWARFS.DRILLER,
    icon: "assets/driller.webp",
  },
  {
    name: DWARFS.GUNNER,
    icon: "assets/gunner.webp",
  },
  {
    name: DWARFS.SCOUT,
    icon: "assets/scout.webp",
  },
  {
    name: DWARFS.ENGINEER,
    icon: "assets/engineer.webp",
  },
];

export const SideBar: FC<
  PropsWithChildren<{ handleClick: (name: string) => void }>
> = ({ children, handleClick }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    handleClick(tab);
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row max-w-7xl">
      <div className="mr-3 p-3 border-drg-primary-500 lg:border-r-2 w-auto lg:w-[250px] h-full">
        <ul className="menu mr-4 flex-row justify-evenly flex-wrap md:flex-row lg:flex-col">
          {TABS.map((tab) => (
            <Tab
              key={tab.name}
              icon={tab.icon}
              label={tab.name}
              active={tab.name === activeTab}
              onClick={handleTabClick}
            />
          ))}
        </ul>
      </div>
      <div className="p-6 flex flex-row box-border w-auto h-full lg:w-[1200px] lg:h-[700px]">
        {children}
      </div>
    </div>
  );
};
