import clsx from "clsx";

export const Tab = ({
  label,
  icon,
  disabled,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onClick: (name: string) => void;
}) => {
  return (
    <li
      className={clsx(
        disabled ? "disabled" : "hover:border-drg-primary-300",
        "rounded-md my-1 font-medium display-block"
      )}
      role="tab"
    >
      <a
        onClick={() => onClick(label)}
        className={clsx(
          active && "border-b-4 !border-drg-primary-500",
          "justify-center md:justify-start flex-col md:flex-col lg:flex-row active:bg-slate-200 active:bg-opacity-10 focus:bg-transparent rounded-none"
        )}
      >
        <img src={icon} alt={label} className="w-12" />
        <p className="my-auto text-sm md:text-sm">{label}</p>
      </a>
    </li>
  );
};

export default Tab;
