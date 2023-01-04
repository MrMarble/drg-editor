/* eslint-disable @typescript-eslint/no-magic-numbers */
import clsx from 'clsx';
import type { ReactElement } from 'react';
import Season from './season/season';
import useSeasons from './useSeasons';

function Seasons(): ReactElement {
  const {
    state: { activeTab, tabs },
    actions: { onChange }
  } = useSeasons();

  return (
    <div className='w-full' id='season'>
      <div className='mb-10 border-b border-drg-primary-500 text-center text-sm font-medium'>
        <ul className='-mb-px flex flex-wrap'>
          {tabs.map(season => (
            <li key={season}>
              <button
                type='button'
                className={clsx(
                  'inline-block cursor-pointer rounded-t-lg border-b-2 border-transparent p-4 text-gray-400 hover:border-drg-primary-400 hover:text-gray-600 dark:hover:text-gray-300',
                  activeTab === season && 'text-gray-200'
                )}
                onClick={(): void => onChange(season)}
              >
                {season}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Season season={activeTab} key={activeTab} />
    </div>
  );
}

export default Seasons;
