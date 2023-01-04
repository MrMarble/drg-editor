import type { FilterType } from '@/stores/filterStore';
import { useFilterStore } from '@/stores/filterStore';
import removeDuplicates from './_helpers/removeDuplicates';

interface ItemsType {
  name: string;
  description?: string;
  type: string;
  category?: string;
  weapon: string;
  asset: string;
  ID: string;
}

interface Properties {
  keySelector: FilterType;
  items?: ItemsType[];
}

interface ReturnType {
  state: {
    filters: Partial<Record<FilterType, string[]>>;
    filterWithoutDuplicates: ItemsType[];
  };
  actions: {
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

function useFilter({ keySelector, items }: Properties): ReturnType {
  const { filters, addFilter, removeFilter } = useFilterStore();

  const filterWithoutDuplicates: ItemsType[] = removeDuplicates(
    items,
    (previous: ItemsType) => previous[keySelector]
  );

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    if (checked) {
      addFilter(keySelector, name);
    } else {
      removeFilter(keySelector, name);
    }
  };

  return {
    state: { filters, filterWithoutDuplicates },
    actions: { onFilterChange }
  };
}

export default useFilter;
