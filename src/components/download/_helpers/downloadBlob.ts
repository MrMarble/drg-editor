import { SECOND } from 'time-constants';

function downloadURL(data: string, fileName: string): void {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.append(a);
  a.style.display = 'none';
  a.click();
  a.remove();
}

function downloadBlob(
  data: ArrayBuffer,
  fileName: string,
  mimeType: string
): void {
  const blob = new Blob([data], {
    type: mimeType
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL(url, fileName);

  setTimeout(() => window.URL.revokeObjectURL(url), SECOND);
}

export default downloadBlob;
