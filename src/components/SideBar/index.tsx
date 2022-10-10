import clsx from "clsx";
import { FC, useState } from "react";
import { DWARFS } from "../../constant/dwarfs";

const Tab = ({
  active,
  label,
  icon,
  onClick,
  disabled,
}: {
  active: boolean;
  icon: string;
  label: string;
  disabled?: boolean;
  onClick: (label: string) => void;
}) => {
  const onClickHandler = () => {
    if (disabled) return;
    onClick(label);
  };

  return (
    <li
      onClick={onClickHandler}
      className={clsx(
        disabled ? "disabled" : "hover:border-drg-primary-300",
        "rounded-md my-1 font-medium display-block"
      )}
    >
      <a
        className={clsx(
          active && "border-b-4 !border-drg-primary-500",
          "hover:border-drg-secondary-500 justify-center md:justify-start flex-col md:flex-col lg:flex-row active:bg-drg-primary-400 focus:bg-drg-primary-400 rounded-none"
        )}
      >
        <img src={icon} alt={label} className="w-12" />
        <p className="my-auto text-sm md:text-sm">{label}</p>
      </a>
    </li>
  );
};

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
    <div className="mr-10 p-3 border-drg-primary-500 lg:border-r-2 w-full h-full">
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
