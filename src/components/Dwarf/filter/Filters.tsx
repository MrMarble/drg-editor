import { FC } from "react";
import FilterElement from "./FilterElement";
import FilterWrapper from "./FilterWrapper";
import Schematics from "../../../../data/schematics.json";
import { DWARFS } from "../../../constant";
import { FilterContextType } from "../context/filterContext";

export const AllowedFilters = ["type", "category", "weapon"] as const;

export type AllowedFiltersType = {
  keySelector: "category" | "weapon" | "type";
};

export const flatternFilters = <T extends Pick<FilterContextType, "filters">>(
  filters: T
) => {
  if (Object.getOwnPropertyNames(filters).length === 0) return;
  try {
    return Object.values(filters).flat();
  } catch (err) {
    console.error(err);
  }
};

const Filters: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  return (
    <FilterWrapper schema={Schematics} dwarf={dwarf}>
      {AllowedFilters.map((allowedCategory, index: number) => (
        <FilterElement
          key={index}
          label={
            allowedCategory.charAt(0).toUpperCase() + allowedCategory.slice(1)
          }
          keySelector={allowedCategory}
        />
      ))}
    </FilterWrapper>
  );
};

export default Filters;
