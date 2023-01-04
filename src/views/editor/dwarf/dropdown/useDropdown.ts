import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface Properties {
  onChange: (value: number) => void;
  initialValue: number;
}

interface ReturnType {
  state: {
    value: number;
  };
  actions: {
    onPromotionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  };
}

function useDropdown({ onChange, initialValue }: Properties): ReturnType {
  const [value, setValue] = useState(initialValue);

  const onPromotionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const changedValue = Number.parseInt(event.target.value, 10);
    if (changedValue === value) return;

    if (Number.isNaN(changedValue)) {
      setValue(0);
      return;
    }

    setValue(changedValue);
    onChange(changedValue);
  };

  return { state: { value }, actions: { onPromotionChange } };
}

export default useDropdown;
