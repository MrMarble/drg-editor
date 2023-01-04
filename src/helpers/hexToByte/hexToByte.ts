export function hexStringToByteArray(hexString: string): number[] {
  if (hexString.length % 2 !== 0) {
    throw new Error(
      'Must have an even number of hex digits to convert to bytes'
    );
  }

  const byteArray = [];
  for (let c = 0; c < hexString.length; c += 2) {
    byteArray.push(Number.parseInt(hexString.slice(c, c + 2), 16));
  }
  return byteArray;
}

export const b = (strs: TemplateStringsArray): number[] =>
  hexStringToByteArray(
    [...strs[0]].map(c => c.codePointAt(0)?.toString(16)).join('')
  );
