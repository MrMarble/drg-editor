import create from 'zustand';

export enum FilterType {
  CATEGORY = 'category',
  WEAPON = 'weapon',
  TYPE = 'type'
}

interface FilterState {
  filters: Partial<Record<FilterType, string[]>>;
  addFilter: (type: FilterType, value: string) => void;
  removeFilter: (type: FilterType, value: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>(set => ({
  filters: {},
  clearFilters: (): void => set({ filters: {} }),
  addFilter: (type, value): void => {
    set(state => ({
      filters: {
        ...state.filters,
        [type]: [...(state.filters[type] ?? []), value]
      }
    }));
  },
  removeFilter: (type, value): void => {
    set(state => {
      const filters = state.filters[type]?.filter(v => v !== value);

      if (filters?.length === 0) {
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-dynamic-delete
        delete state.filters[type];
        return { filters: { ...state.filters } };
      }

      return {
        filters: {
          ...state.filters,
          [type]: filters
        }
      };
    });
  }
}));
