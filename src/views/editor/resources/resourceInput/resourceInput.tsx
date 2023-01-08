import { Input } from '@/components';
import type { ReactElement } from 'react';
import useResourceInput from './useResourceInput';

interface Properties {
  name: string;
  item: string;
  uuid: number[];
  from: number;
}

function ResourceInput({ name, item, uuid, from }: Properties): ReactElement {
  const {
    state: { amount },
    actions: { onInputChange }
  } = useResourceInput({ item, uuid, from });

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
