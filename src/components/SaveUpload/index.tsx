import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { U8Array } from "../../helpers/uint8array";
import { useSaveStore } from "../../stores/saveStore";

const HEADER = [0x47, 0x56, 0x41, 0x53]; // GVAS

export const SaveUpload = () => {
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
    console.log(acceptedFiles);
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
      className="rounded m-6 border-dashed border-drg-primary-700 border-2 p-6 text-center cursor-pointer select-none hover:bg-drg-primary-400 hover:text-slate-900 transition-all duration-200"
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop your save here, or click to select files</p>
      <em>(Only *.sav files will be accepted)</em>
    </div>
  );
};
