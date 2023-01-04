import { useDropzone } from 'react-dropzone';
import { U8Array } from '../../helpers';
import useSaveStore from '../../stores/saveStore';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const HEADER = [0x47, 0x56, 0x41, 0x53]; // GVAS
const MAX_FILES = 1;

interface ReturnType {
  actions: {
    getRootProps: () => Record<string, unknown>;
    getInputProps: () => Record<string, unknown>;
  };
}

function useFileUpload(): ReturnType {
  const fr = new FileReader();
  const { setSave, setName } = useSaveStore();

  fr.onloadend = (): void => {
    const data = fr.result;
    if (!data || typeof data === 'string') return;

    const magic = new Uint8Array(data, 0, HEADER.length);

    if (!magic.every((v, index) => v === HEADER[index])) {
      // eslint-disable-next-line no-alert
      alert('Invalid save file'); // TODO: implement a custom alert
      return;
    }

    setSave(new U8Array(data));
  };

  const onDrop = (acceptedFiles: File[]): void => {
    // Do something with the files
    for (const file of acceptedFiles) {
      setName(file.name);
      fr.readAsArrayBuffer(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: MAX_FILES,
    accept: {
      'application/octet-stream': ['.sav']
    }
  });

  return { actions: { getRootProps, getInputProps } };
}

export default useFileUpload;
