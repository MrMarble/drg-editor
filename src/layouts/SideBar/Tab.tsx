import clsx from "clsx";
import { NavLink } from "react-router-dom";

export const Tab = ({
  label,
  icon,
  disabled,
  url,
}: {
  icon: string;
  label: string;
  disabled?: boolean;
  url: string;
}) => {
  return (
    <li
      className={clsx(
        disabled ? "disabled" : "hover:border-drg-primary-300",
        "rounded-md my-1 font-medium display-block"
      )}
    >
      <NavLink
        to={url}
        className={({ isActive }) =>
          clsx(
            isActive && "border-b-4 !border-drg-primary-500",
            "hover:border-drg-secondary-500 justify-center md:justify-start flex-col md:flex-col lg:flex-row active:bg-drg-primary-400 focus:bg-drg-primary-400 rounded-none"
          )
        }
      >
        <img src={icon} alt={label} className="w-12" />
        <p className="my-auto text-sm md:text-sm">{label}</p>
      </NavLink>
    </li>
  );
};

export default Tab;
