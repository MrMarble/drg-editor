import { useFileUpload } from "./useFileUpload";

export const UploadeFile = ({ onLoad }: { onLoad: () => void }) => {
  const { getInputProps, getRootProps } = useFileUpload({ onLoad });
  return (
    <div
      {...getRootProps()}
      className="rounded m-6 border-dashed border-drg-primary-700 border-2 p-6 text-center cursor-pointer select-none hover:bg-drg-primary-400 hover:text-slate-900 transition-all duration-200"
    >
      <input {...getInputProps()} />
      <p>{`Drag 'n' drop your save here, or click to select files`}</p>
      <em className="text-gray-500">
        (Only *.sav files will be accepted)
        <br />
        (add .sav at the end if using&nbsp;
        <span className="inline-block text-gray-400 underline">Game Pass</span>)
      </em>
    </div>
  );
};

export default UploadeFile;
