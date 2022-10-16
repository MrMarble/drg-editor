import create from "zustand";

export enum FilterType {
  CATEGORY = "category",
  WEAPON = "weapon",
  TYPE = "type",
}

interface FilterState {
  filters: Partial<Record<FilterType, string[]>>;
  addFilter: (type: FilterType, value: string) => void;
  removeFilter: (type: FilterType, value: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {},
  clearFilters: () => set({ filters: {} }),
  addFilter: (type, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [type]: [...(state.filters?.[type] ?? []), value],
      },
    }));
  },
  removeFilter: (type, value) => {
    set((state) => {
      const newFilters = state.filters[type]?.filter((v) => v !== value);

      if (newFilters?.length === 0) {
        delete state.filters[type];
        return { filters: { ...state.filters } };
      }

      return {
        filters: {
          ...state.filters,
          [type]: newFilters,
        },
      };
    });
  },
}));
