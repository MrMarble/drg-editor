/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { U8Array } from '@/helpers';
import type { UUID } from '@/helpers/u8array/uint8array';
import updateSize from './updateSize';

const OWNED_NEEDLE: UUID = [
  0x4f, 0x77, 0x6e, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x74, 0x69,
  0x63, 0x73, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x41, 0x72, 0x72, 0x61, 0x79, 0x50,
  0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x00
];
const OWNED_OFFSET = 105;

function handleLock({
  save,
  id,
  owned,
  setSave,
  setOwned
}: {
  save: U8Array;
  id: string;
  owned: string[];
  setSave: (save: U8Array) => void;
  setOwned: (owned: string[]) => void;
}): void {
  updateSize({
    save,
    needle: OWNED_NEEDLE,
    count: owned.length - 1,
    add: false
  });

  const start =
    save.indexOfMulti(OWNED_NEEDLE) +
    OWNED_NEEDLE.length +
    OWNED_OFFSET +
    (owned.length - 1) * 16;
  save.unshift(16, start);

  setSave(save.shrink(16));
  setOwned(owned.filter(o => o !== id));
}

export default handleLock;
