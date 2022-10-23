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
        "display-block my-1 rounded-md font-medium"
      )}
    >
      <a
        className={clsx(
          active && "!border-drg-primary-500 border-b-4",
          "hover:border-drg-secondary-500 focus:bg-drg-primary-400 active:bg-drg-primary-400 flex-col justify-center rounded-none md:flex-col md:justify-start lg:flex-row"
        )}
      >
        <img src={icon} alt={label} className="w-12" />
        <p className="my-auto text-sm md:text-sm">{label}</p>
      </a>
    </li>
  );
};

export default Tab;
