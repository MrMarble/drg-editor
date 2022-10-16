import { FC } from "react";
import Schematics from "../../../../data/schematics.json";
import { DWARFS } from "../../../constant";
import { FilterType } from "../../../stores/filterStore";
import FilterElement from "./FilterElement";
import FilterWrapper from "./FilterWrapper";

const Filters: FC<{ dwarf: DWARFS }> = ({ dwarf }) => {
  return (
    <FilterWrapper schema={Schematics} dwarf={dwarf}>
      {Object.entries(FilterType).map(([, allowedCategory], index: number) => (
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
