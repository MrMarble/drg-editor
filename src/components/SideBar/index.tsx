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
    <li onClick={onClickHandler} className={clsx(disabled && "disabled")}>
      <a className={clsx(active && "active")}>
        <img src={icon} alt={label} className="w-12" />
        {label}
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
    <div className="border-r-2 border-indigo-800">
      <ul className="menu rounded-box p-2">
        {TABS.map((tab) => (
          <Tab
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
