import clsx from "clsx";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FilterType, useFilterStore } from "../../../stores/filterStore";

type ItemsType = {
  name: string;
  description: string;
  type: string;
  category: string;
  weapon: string;
  asset: string;
  ID: string;
};

type Props = {
  keySelector: FilterType;
  items?: ItemsType[];
  label: string;
  tabIndex?: number;
};

function removeDuplicates<T>(data: T[] | undefined, key: (x: T) => void): T[] {
  if (!data) return [];

  return [...new Map(data.map((x) => [key(x), x])).values()];
}

const FilterElement = ({ items, label, keySelector, tabIndex }: Props) => {
  const { filters, addFilter, removeFilter } = useFilterStore();
  const [visibility, setVisibility] = useState<boolean>(true);

  const filterWithoutDuplicates: ItemsType[] = removeDuplicates(
    items,
    (prev: ItemsType) => prev[keySelector]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked) {
      addFilter(keySelector, name);
    } else {
      removeFilter(keySelector, name);
    }
  };

  const handleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <>
      <div className="dropdown">
        <label
          tabIndex={tabIndex}
          className={clsx(
            filters?.[keySelector]?.length
              ? "bg-drg-primary-600"
              : "bg-slate-800",
            "cursor-pointer select-none rounded-sm px-4  py-1 text-sm"
          )}
        >
          {label}
        </label>

        <ul
          tabIndex={tabIndex}
          className="flex-start drg-scrollbar drg-internal-scrollbar dropdown-content not-first:px-3 absolute right-0 mt-2 max-h-[300px] w-52 scroll-m-0 overflow-auto overflow-x-hidden rounded-md bg-slate-700 pb-2 text-xs shadow"
        >
          <div className="sticky top-0 mb-2 flex select-none gap-2 border-b-2 bg-slate-700 py-2">
            <button className="flex gap-2" onClick={handleVisibility}>
              {label} {visibility ? <FaMinus /> : <FaPlus />}
            </button>
          </div>

          {filterWithoutDuplicates.map(
            (content: { [key: string]: string }, index: number) => {
              if (!content[keySelector]) return;

              return (
                <li
                  key={index}
                  className={clsx(
                    !visibility && "hidden",
                    "flex select-none gap-2 p-1 first:mt-5"
                  )}
                >
                  <input
                    className="checkbox h-4 w-4 rounded-sm"
                    type="checkbox"
                    name={content[keySelector]}
                    onChange={handleChange}
                    id={content[keySelector]}
                    defaultChecked={false}
                  />
                  <label
                    htmlFor={content[keySelector]}
                    className="my-auto cursor-pointer"
                  >
                    <span className="w-[30px] whitespace-normal">
                      {content[keySelector].split(/(?=[A-Z])/).join(" ")}
                    </span>
                  </label>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default FilterElement;
