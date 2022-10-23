import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { U8Array } from "../../helpers";
import { useSaveStore } from "../../stores/saveStore";

const HEADER = [0x47, 0x56, 0x41, 0x53]; // GVAS

export const UploadeFile = () => {
  const fr = new FileReader();
  const { setSave, setName } = useSaveStore();
  fr.onloadend = () => {
    const data = fr.result;
    if (!data || typeof data === "string") return;

    const magic = new Uint8Array(data, 0, 4);

    if (!magic.every((v, i) => v === HEADER[i])) {
      alert("Invalid save file");
      return;
    }

    setSave(new U8Array(data));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      setName(file.name);
      fr.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/octet-stream": [".sav"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-drg-primary-700 hover:bg-drg-primary-400 m-6 cursor-pointer select-none rounded border-2 border-dashed p-6 text-center transition-all duration-200 hover:text-slate-900"
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
