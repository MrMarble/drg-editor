import type { ReactElement } from 'react';
import useUpload from './useUpload';

export function Upload(): ReactElement {
  const {
    actions: { getInputProps, getRootProps }
  } = useUpload();
  return (
    <div
      {...getRootProps()}
      className='m-6 cursor-pointer select-none rounded border-2 border-dashed border-drg-primary-700 p-6 text-center transition-all duration-200 hover:bg-drg-primary-400 hover:text-slate-900'
    >
      <input {...getInputProps()} role='button' />
      <p>{`Drag 'n' drop your save here, or click to select files`}</p>
      <em className='text-gray-500'>
        (Only *.sav files will be accepted)
        <br />
        (add .sav at the end if using&nbsp;
        <span className='inline-block text-gray-400 underline'>Game Pass</span>)
      </em>
    </div>
  );
}

export default Upload;
