import { FC, useState } from "react";
import { DWARFS } from "../../constant/dwarfs";
import Tab from "./Tab";

export const TABS = [
  { name: "Resources", url: "assets/resources.webp" },
  { name: "Season", url: "assets/pb.webp" },
  { name: DWARFS.DRILLER, url: "assets/driller.webp" },
  { name: DWARFS.GUNNER, url: "assets/gunner.webp" },
  { name: DWARFS.SCOUT, url: "assets/scout.webp" },
  { name: DWARFS.ENGINEER, url: "assets/engineer.webp" },
];

export const SideBar: FC<{ onChange: (tab: string) => void }> = ({
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState("Resources");

  const onClickTabItem = (tab: string) => {
    onChange(tab);
    setActiveTab(tab);
  };

  return (
    <div className="mr-3 p-3 border-drg-primary-500 lg:border-r-2 w-[250px] h-full">
      <ul className="menu mr-4 flex-row justify-evenly flex-wrap md:flex-row lg:flex-col">
        {TABS.map((tab) => (
          <Tab
            key={tab.name}
            active={activeTab === tab.name}
            icon={tab.url}
            label={tab.name}
            onClick={onClickTabItem}
          />
        ))}
      </ul>
    </div>
  );
};
