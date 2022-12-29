import { Input } from "@/components/UI";
import { ITEMS } from "@/constant/resources";
import { useChangesStore } from "@/stores/changesStore";
import { useSaveStore } from "@/stores/saveStore";
import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  item: string;
  uuid: number[];
};

export const ResourceInput = ({ name, item, uuid }: Props) => {
  const saveRef = useRef(useSaveStore.getState());
  const { save, setSave } = saveRef.current;

  const changesRef = useRef(useChangesStore.getState());
  const { increment } = changesRef.current;

  useEffect(() => {
    const unsubSave = useSaveStore.subscribe(
      (state) => (saveRef.current = state)
    );
    const unsubChange = useChangesStore.subscribe(
      (state) => (changesRef.current = state)
    );

    return () => {
      unsubSave();
      unsubChange();
    };
  }, []);

  const [amount, setAmount] = useState(() => {
    let resources = 0;
    if ([ITEMS.CREDITS as string].includes(item)) {
      resources = save.getInt32(uuid, 0);
    } else {
      resources = save.getFloat32(uuid, 0);
    }

    return resources < 0 ? 0 : resources;
  });

  const handleChange = (value: number) => {
    setAmount(value);
    increment();
    if ([ITEMS.CREDITS as string].includes(item)) {
      save.setInt32(uuid, 0, value);
    } else {
      save.setFloat32(uuid, 0, value);
    }

    setSave(save);
  };

  return (
    <Input
      key={item}
      name={name}
      initialValue={amount}
      icon={`assets/${item.toLowerCase()}.webp`}
      max={0x0fffffff}
      onChange={handleChange}
    />
  );
};

export default ResourceInput;
