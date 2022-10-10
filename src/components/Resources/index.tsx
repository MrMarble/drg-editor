import { useState } from "react";
import {
  CATEGORIES,
  EXPANDED_RESOURCE_NAMES,
  ITEMS,
  RESOURCES,
} from "../../constant/resources";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Input } from "../UI";

type Props = {
  name: string;
  item: string;
  uuid: number[];
};

const Resource = ({ name, item, uuid }: Props) => {
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
      save.setFloat32(uuid, 4, value);
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

export const Resources = () => {
  return (
    <div className="w-full ">
      {Object.entries(CATEGORIES).map(([category, items]) => {
        return (
          <div className="not-first:mt-10" key={category}>
            <span className="border-b-2 border-drg-primary-500 capitalize">
              {category}
            </span>
            <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3">
              {items.map((item: ITEMS) => (
                <Resource
                  key={item}
                  item={item}
                  name={EXPANDED_RESOURCE_NAMES[item] ?? item}
                  uuid={RESOURCES[item]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
