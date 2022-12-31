/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { U8Array } from '@/helpers';
import type { UUID } from '@/helpers/u8array/uint8array';
import updateSize from './updateSize';

const FORGED_NEEDLE: UUID = [
  0x46, 0x6f, 0x72, 0x67, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x74,
  0x69, 0x63, 0x73, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x41, 0x72, 0x72, 0x61, 0x79,
  0x50, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x00
];
const FORGED_OFFSET = 106;

function handleForge({
  save,
  id,
  forged,
  setSave,
  setForged
}: {
  save: U8Array;
  id: string;
  forged: string[];
  setSave: (save: U8Array) => void;
  setForged: (forged: string[]) => void;
}): void {
  if (forged.includes(id)) {
    updateSize({
      save,
      needle: FORGED_NEEDLE,
      add: false,
      count: forged.length - 1
    });

    const start =
      save.indexOfMulti(FORGED_NEEDLE) +
      FORGED_NEEDLE.length +
      FORGED_OFFSET +
      (forged.length - 1) * 16;
    save.unshift(16, start);

    setSave(save.shrink(16));
    setForged(forged.filter(f => f !== id));
  } else {
    updateSize({
      save,
      needle: FORGED_NEEDLE,
      count: forged.length + 1
    });

    const grownSave = save.grow(16);
    const start =
      save.indexOfMulti(FORGED_NEEDLE) +
      FORGED_NEEDLE.length +
      FORGED_OFFSET +
      forged.length * 16;
    grownSave.shift(16, start);
    grownSave.setUUID(FORGED_NEEDLE, FORGED_OFFSET + forged.length * 16, id);

    setSave(grownSave);
    setForged([...forged, id]);
  }
}

export default handleForge;
