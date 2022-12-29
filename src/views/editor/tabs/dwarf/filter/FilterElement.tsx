import { FilterType, useFilterStore } from "@/stores/filterStore";
import clsx from "clsx";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

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
            "px-4 py-1 cursor-pointer rounded-sm  text-sm select-none"
          )}
        >
          {label}
        </label>

        <ul
          tabIndex={tabIndex}
          className="dropdown-content flex-start not-first:px-3 shadow rounded-md w-52 text-xs mt-2 absolute right-0 bg-slate-700 max-h-[300px] overflow-auto scroll-m-0 overflow-x-hidden drg-scrollbar drg-internal-scrollbar pb-2"
        >
          <div className="select-none flex gap-2 mb-2 sticky top-0 bg-slate-700 border-b-2 py-2">
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
                    "flex gap-2 p-1 select-none first:mt-5"
                  )}
                >
                  <input
                    className="checkbox w-4 h-4 rounded-sm"
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
