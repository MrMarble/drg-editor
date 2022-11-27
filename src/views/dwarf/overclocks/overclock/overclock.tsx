import clsx from "clsx";
import type { FC } from "react";
import { FaLock } from "react-icons/fa";
import { GiAnvil } from "react-icons/gi";
import { HiArchive } from "react-icons/hi";
import { DWARFS } from "../../../../constant";

export const Overclock: FC<{
  ID: string;
  dwarf: DWARFS;
  description?: string;
  name: string;
  type: string;
  owned: boolean;
  forged: boolean;
  asset: string;
  handleLock: (id: string) => void;
  handleUnlock: (id: string) => void;
  handleForge: (id: string) => void;
}> = ({
  ID,
  owned,
  name,
  asset,
  type,
  forged,
  handleLock,
  handleUnlock,
  handleForge,
}) => (
  <div
    className={clsx(
      "flex p-2 bg-gray-800 rounded-lg justify-start align-middle relative pb-4",
      !(owned || forged) && "bg-gray-900"
    )}
  >
    <div
      className={clsx("relative w-16 h-16", !(owned || forged) && "opacity-40")}
    >
      <img
        src={`/assets/frames/${type}.png`}
        alt={type}
        className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2"
      />
      <img
        src={asset}
        alt={name}
        className="absolute w-8  left-1/2 top-1/2  -translate-x-1/2  -translate-y-1/2"
      />
    </div>
    <div
      className={clsx(
        "text-left self-center ml-1 text-sm w-3/5",
        !(owned || forged) && "opacity-40"
      )}
    >
      {name}
    </div>
    <div className="absolute w-18 h-8 bottom-0 right-0 bg-gray-700 p-0 flex flex-row rounded-tl-lg rounded-br-md">
      <button
        className={clsx(
          "btn btn-sm btn-square btn-ghost rounded-none rounded-tl-lg",
          !(owned || forged) && "bg-drg-primary-400 text-black btn-disabled"
        )}
        onClick={() => handleLock(ID)}
      >
        <FaLock />
      </button>
      <button
        className={clsx(
          "btn btn-sm btn-square btn-ghost rounded-none ",
          owned && "bg-drg-primary-400 text-black btn-disabled"
        )}
        onClick={() => handleUnlock(ID)}
      >
        <HiArchive />
      </button>
      <button
        className={clsx(
          "btn btn-sm btn-square btn-ghost rounded-none rounded-br-md",
          forged && "bg-drg-primary-400 text-black btn-disabled"
        )}
        onClick={() => handleForge(ID)}
      >
        <GiAnvil />
      </button>
    </div>
  </div>
);
