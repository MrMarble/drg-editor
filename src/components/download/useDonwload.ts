import useChangesStore from '@/stores/changesStore';
import useSaveStore from '@/stores/saveStore';
import { hit } from 'countapi-js';
import downloadBlob from './_helpers/downloadBlob';

interface ReturnType {
  state: {
    changes: number;
  };
  actions: {
    onDownloadClick: () => void;
  };
}

function useDownload(): ReturnType {
  const { changes, reset } = useChangesStore();
  const { save, name } = useSaveStore();

  const onDownloadClick = (): void => {
    downloadBlob(save, name, 'application/octet-stream');
    reset();

    if (import.meta.env.PROD) {
      // Track downloads with countapi
      hit('mrmarble.dev', import.meta.env.VITE_DOWN_HIT as string)
        .then(() => {})
        .catch(() => {}); // Ignore errors
    }
  };

  return { state: { changes }, actions: { onDownloadClick } };
}

export default useDownload;
