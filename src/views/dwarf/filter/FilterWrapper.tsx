import React from "react";
import { DWARFS } from "../../../constant";
import Schematics from "../../../../data/schematics.json";

type FilterWrapperType = {
  schema: typeof Schematics;
  children: React.ReactNode;
  dwarf: DWARFS;
};

const FilterWrapper = ({ schema, children, dwarf }: FilterWrapperType) => (
  <div className="absolute top-0 right-0 flex gap-2">
    {React.Children.map<React.ReactNode, React.ReactNode>(
      children,
      (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            items: schema[dwarf],
            key: index,
            tabIndex: index,
          });
        }
      }
    )}
  </div>
);

export default FilterWrapper;
