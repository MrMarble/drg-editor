export function hexStringToByteArray(hexString: string): Array<number> {
  if (hexString.length % 2 !== 0) {
    throw "Must have an even number of hex digits to convert to bytes";
  }

  const byteArray = [];
  for (let c = 0; c < hexString.length; c += 2) {
    byteArray.push(parseInt(hexString.substring(c, c + 2), 16));
  }
  return byteArray;
}

export const b = (strs: TemplateStringsArray): Array<number> =>
  hexStringToByteArray(
    strs[0]
      .split("")
      .map((c) => c.charCodeAt(0).toString(16))
      .join("")
  );
