import { Download, GithubLink } from '@/components';
import type { PropsWithChildren, ReactElement } from 'react';

function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center py-4'>
      <div className='drg-title drg-framer mb-6 w-auto min-w-[400px] max-w-[90%] justify-center py-2 text-center text-2xl font-medium uppercase'>
        DRG Editor
      </div>
      <div className='drg-framer drg-scrollbar max-h-[90%] max-w-[90%] overflow-auto !border-b-[15px] bg-gray-800 p-6 shadow-md transition-all duration-1000'>
        {children}
      </div>
      <Download />
      <GithubLink />
    </div>
  );
}

export default Layout;
