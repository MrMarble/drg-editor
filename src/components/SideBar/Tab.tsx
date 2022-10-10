import clsx from "clsx";

export const Tab = ({
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

export default Tab;
