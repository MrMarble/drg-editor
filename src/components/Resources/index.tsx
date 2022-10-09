import { useEffect, useState } from "react";
import {
  ITEMS,
  RESOURCES,
  CATEGORIES,
  EXPANDED_RESOURCE_NAMES,
} from "../../constant/resources";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";

type Props = {
  name: string;
  item: string;
  uuid: number[];
};

const Resource = ({ name, item, uuid }: Props) => {
  const [amount, setAmount] = useState(0);
  const [oldAmount, setOldAmount] = useState(0);
  const [resourceOffset, setResourceOffset] = useState(0);

  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setAmount(0);
      return;
    }
    setAmount(value);
    setOldAmount(amount);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    if (value === oldAmount) return;

    increment();
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    save.set(u8, resourceOffset);
    setSave(save);
  };

  const handleMax = () => {
    const max = 0x0fffffff;

    if (amount === max) return;
    const view = new DataView(new ArrayBuffer(4));
    if ([ITEMS.CREDITS as string, ITEMS.SCRIP].includes(item)) {
      view.setUint32(0, max, true);
    } else {
      view.setFloat32(0, max, true);
    }

    const u8 = new Uint8Array(view.buffer);

    save.set(u8, resourceOffset);
    setSave(save);
    setAmount(max);
    setOldAmount(amount);
    increment();
  };

  useEffect(() => {
    const resourceIndex = save.indexOfMulti(uuid, 0x42d);
    setResourceOffset(resourceIndex + uuid.length);
    const data = save.slice(
      resourceIndex + uuid.length,
      resourceIndex + uuid.length + 4
    );
    const view = new DataView(data.buffer);

    let value = 0;

    // little hackish but it works
    if ([ITEMS.CREDITS as string, ITEMS.SCRIP].includes(item)) {
      value = view.getUint32(0, true);
    } else {
      value = view.getFloat32(0, true);
    }
    setAmount(value);
    setOldAmount(value);
  }, [save]);

  return (
    <div className="block">
      <label htmlFor={name.toLowerCase()} className="label-text capitalize">
        {name}
      </label>
      <div className="input-group">
        <span className="pointer-events-none select-none border-drg-primary-700 border">
          <img
            src={`assets/${item.toLowerCase()}.webp`}
            className="w-6 max-w-none"
          />
        </span>
        <input
          id={name.toLowerCase()}
          type="text"
          className="input bg-transparent border-drg-primary-700 w-full lg:w-32"
          value={amount}
          onChange={handleChanged}
          onBlur={handleBlur}
        />
        <button
          className="btn btn-square bg-drg-primary-400 hover:bg-drg-secondary-500 text-slate-900"
          onClick={handleMax}
        >
          Max
        </button>
      </div>
    </div>
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
