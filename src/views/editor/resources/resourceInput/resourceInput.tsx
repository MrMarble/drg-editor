import { Input } from '@/components';
import type { ReactElement } from 'react';
import useResourceInput from './useResourceInput';

interface Properties {
  name: string;
  item: string;
  uuid: number[];
}

function ResourceInput({ name, item, uuid }: Properties): ReactElement {
  const {
    state: { amount },
    actions: { onInputChange }
  } = useResourceInput({ item, uuid });

  return (
    <Input
      key={item}
      name={name}
      initialValue={amount}
      icon={`assets/${item.toLowerCase()}.webp`}
      max={0x0f_ff_ff_ff}
      onChange={onInputChange}
    />
  );
}

export default ResourceInput;
