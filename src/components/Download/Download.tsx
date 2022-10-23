import { hit } from "countapi-js";
import { createPortal } from "react-dom";
import { useChangesStore } from "../../stores/changesStore";
import { useSaveStore } from "../../stores/saveStore";
import { Button } from "../UI";

const downloadURL = (data: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
};

const downloadBlob = (
  data: ArrayBuffer,
  fileName: string,
  mimeType: string
) => {
  const blob = new Blob([data], {
    type: mimeType,
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL(url, fileName);

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

export const Download = () => {
  const { save, name } = useSaveStore();
  const { changes, reset } = useChangesStore();

  const handleDownload = () => {
    downloadBlob(save, name, "application/octet-stream");
    reset();

    if (import.meta.env.PROD) {
      hit("mrmarble.dev", import.meta.env.VITE_DOWN_HIT); // Track downloads with countapi
    }
  };

  const component = (
    <div className="drg-framer alert absolute bottom-10 right-10 w-96 rounded-none shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>You made {changes} changes</span>
      </div>
      <div className="flex-none">
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );

  return createPortal(changes ? component : null, document.body);
};

export default Download;
