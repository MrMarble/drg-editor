import { Button } from '@/components';
import type { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import useDownload from './useDonwload';

const Download = (): ReactPortal => {
  const {
    state: { changes },
    actions: { onDownloadClick }
  } = useDownload();

  return createPortal(
    changes ? (
      <div className='drg-framer alert absolute bottom-10 right-10 w-96 rounded-none shadow-lg'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='h-6 w-6 flex-shrink-0 stroke-info'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>You made {changes} changes</span>
        </div>
        <div className='flex-none'>
          <Button onClick={onDownloadClick}>Download</Button>
        </div>
      </div>
    ) : undefined,
    document.body
  );
};

export default Download;
