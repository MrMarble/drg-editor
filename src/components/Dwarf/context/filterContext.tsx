import React, { useState } from "react";

export type FilterContextType = {
  filters: Record<string, any> | null;
  setFilters: (value: Record<string, unknown>) => void;
};

const FilterContext = React.createContext<FilterContextType | null>(null);
export default FilterContext;

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<Record<string, unknown> | null>({});

  const value = React.useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
