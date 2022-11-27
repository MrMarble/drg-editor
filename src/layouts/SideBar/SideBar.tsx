import { FC } from "react";
import { Outlet } from "react-router-dom";
import { DWARFS } from "../../constant/dwarfs";
import Tab from "./Tab";

export const TABS = [
  { name: "Resources", icon: "assets/resources.webp", url: "/resources" },
  { name: "Season", icon: "assets/pb.webp", url: "/season" },
  {
    name: DWARFS.DRILLER,
    icon: "assets/driller.webp",
    url: `/dwarf/${DWARFS.DRILLER}`,
  },
  {
    name: DWARFS.GUNNER,
    icon: "assets/gunner.webp",
    url: `/dwarf/${DWARFS.GUNNER}`,
  },
  {
    name: DWARFS.SCOUT,
    icon: "assets/scout.webp",
    url: `/dwarf/${DWARFS.SCOUT}`,
  },
  {
    name: DWARFS.ENGINEER,
    icon: "assets/engineer.webp",
    url: `/dwarf/${DWARFS.ENGINEER}`,
  },
];

export const SideBar: FC = () => {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row max-w-7xl">
      <div className="mr-3 p-3 border-drg-primary-500 lg:border-r-2 w-auto lg:w-[250px] h-full">
        <ul className="menu mr-4 flex-row justify-evenly flex-wrap md:flex-row lg:flex-col">
          {TABS.map((tab) => (
            <Tab
              key={tab.name}
              icon={tab.icon}
              label={tab.name}
              url={tab.url}
            />
          ))}
        </ul>
      </div>
      <div className="p-6 flex flex-row box-border w-auto h-full lg:w-[1200px] lg:h-[700px]">
        <Outlet />
      </div>
    </div>
  );
};
