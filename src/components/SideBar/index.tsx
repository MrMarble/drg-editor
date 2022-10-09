import { FC, useState } from "react";
import clsx from "clsx";

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
    <li onClick={onClickHandler} className={clsx(disabled ? "disabled" : "hover:border-drg-primary-300", "rounded-md my-1 font-medium")}>
      <a className={clsx(active && "border-b-4 border-drg-primary-500", "hover:border-drg-secondary-500 justify-center md:justify-start flex-col md:flex-col lg:flex-row  active:bg-drg-primary-400 focus:bg-drg-primary-400")}>
        <img src={icon} alt={label} className="w-12" />
        <p className="my-auto text-sm md:text-lg">{label}</p>
      </a>
    </li>
  );
};

export const TABS = [
  { name: "Resources", url: 'assets/hollomite.webp' },
  { name: "Driller", url: 'assets/driller.webp' },
  { name: "Gunner", url: 'assets/gunner.webp' },
  { name: "Scout", url: 'assets/scout.webp' },
  { name: "Engineer", url: 'assets/engineer.webp' },
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
            disabled={tab.name !== "Resources"}
          />
        ))}
      </ul>
    </div>
  );
};
