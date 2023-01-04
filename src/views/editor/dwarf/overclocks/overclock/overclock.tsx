import clsx from 'clsx';
import type { ReactElement } from 'react';
import { FaLock } from 'react-icons/fa';
import { GiAnvil } from 'react-icons/gi';
import { HiArchive } from 'react-icons/hi';

interface Properties {
  ID: string;
  name: string;
  type: string;
  owned: boolean;
  forged: boolean;
  asset: string;
  onLock: (id: string) => void;
  onUnlock: (id: string) => void;
  onForge: (id: string) => void;
}

function Overclock({
  ID,
  owned,
  name,
  asset,
  type,
  forged,
  onLock,
  onUnlock,
  onForge
}: Properties): ReactElement {
  return (
    <div
      className={clsx(
        'relative flex justify-start rounded-lg bg-gray-800 p-2 pb-4 align-middle',
        !(owned || forged) && 'bg-gray-900'
      )}
    >
      <div
        className={clsx(
          'relative h-16 w-16',
          !(owned || forged) && 'opacity-40'
        )}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/frames/${type}.png`}
          alt={type}
          className='absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2'
        />
        <img
          src={`${import.meta.env.BASE_URL}${asset}`}
          alt={name}
          className='absolute left-1/2  top-1/2 w-8  -translate-x-1/2  -translate-y-1/2'
        />
      </div>
      <div
        className={clsx(
          'ml-1 w-3/5 self-center text-left text-sm',
          !(owned || forged) && 'opacity-40'
        )}
      >
        {name}
      </div>
      <div className='w-18 absolute bottom-0 right-0 flex h-8 flex-row rounded-tl-lg rounded-br-md bg-gray-700 p-0'>
        <button
          type='button'
          title='Lock'
          className={clsx(
            'btn btn-ghost btn-square btn-sm rounded-none rounded-tl-lg',
            !(owned || forged) && 'btn-disabled bg-drg-primary-400 text-black'
          )}
          onClick={(): void => onLock(ID)}
        >
          <FaLock />
        </button>
        <button
          type='button'
          title='Unlock'
          className={clsx(
            'btn btn-ghost btn-square btn-sm rounded-none ',
            owned && 'btn-disabled bg-drg-primary-400 text-black'
          )}
          onClick={(): void => onUnlock(ID)}
        >
          <HiArchive />
        </button>
        <button
          type='button'
          title='Forge'
          className={clsx(
            'btn btn-ghost btn-square btn-sm rounded-none rounded-br-md',
            forged && 'btn-disabled bg-drg-primary-400 text-black'
          )}
          onClick={(): void => onForge(ID)}
        >
          <GiAnvil />
        </button>
      </div>
    </div>
  );
}

export default Overclock;
