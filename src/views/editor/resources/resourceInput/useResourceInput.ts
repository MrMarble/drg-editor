import { ITEMS } from '@/constant';
import useChangesStore from '@/stores/changesStore';
import useSaveStore from '@/stores/saveStore';
import { useEffect, useRef, useState } from 'react';

interface Properties {
  item: string;
  uuid: number[];
}

interface ReturnType {
  state: {
    amount: number;
  };
  actions: {
    onInputChange: (value: number) => void;
  };
}

function useResourceInput({ item, uuid }: Properties): ReturnType {
  const saveReference = useRef(useSaveStore.getState());
  const { save, setSave } = saveReference.current;

  const changesReference = useRef(useChangesStore.getState());
  const { increment } = changesReference.current;

  const [amount, setAmount] = useState(() => {
    let resources = 0;
    resources = [ITEMS.CREDITS as string].includes(item)
      ? save.getInt32(uuid, 0)
      : save.getFloat32(uuid, 0);

    return resources < 0 ? 0 : resources;
  });

  useEffect(() => {
    const unsubSave = useSaveStore.subscribe(state => {
      saveReference.current = state;
    });
    const unsubChange = useChangesStore.subscribe(state => {
      changesReference.current = state;
    });

    return () => {
      unsubSave();
      unsubChange();
    };
  }, []);

  const onInputChange = (value: number): void => {
    setAmount(value);
    increment();
    if ([ITEMS.CREDITS as string].includes(item)) {
      save.setInt32(uuid, 0, value);
    } else {
      save.setFloat32(uuid, 0, value);
    }

    setSave(save);
  };

  return { state: { amount }, actions: { onInputChange } };
}

export default useResourceInput;
