import { useState } from "react";
import { ITEMS } from "../../constant/resources";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";

type Props = {
  name: string;
  item: string;
  uuid: number[];
};

export const ResourceInput = ({ name, item, uuid }: Props) => {
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();

  const [amount, setAmount] = useState(
    [ITEMS.CREDITS as string].includes(item)
      ? save.getInt32(uuid, 0)
      : save.getFloat32(uuid, 0)
  );

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
