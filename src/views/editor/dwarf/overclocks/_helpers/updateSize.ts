import type { U8Array } from '@/helpers';
import { b } from '@/helpers';
import type { UUID } from '@/helpers/u8array/uint8array';

const COUNT_OFFSET = 28;
const SCHEMATIC_OFFSET = 20;
const SCHEMATIC_NUM_BYTES = 16;
const SCHEMATIC_LENGHT_OFFSET = 71;

function updateSize({
  save,
  needle,
  add = true,
  count
}: {
  save: U8Array;
  add?: boolean;
  needle: UUID;
  count: number;
}): void {
  let old = save.getInt32(b`SchematicSave`, SCHEMATIC_OFFSET);
  save.setInt32(
    b`SchematicSave`,
    SCHEMATIC_OFFSET,
    old + (add ? SCHEMATIC_NUM_BYTES : -SCHEMATIC_NUM_BYTES)
  );

  old = save.getInt32(needle, 0);
  save.setInt32(
    needle,
    0,
    old + (add ? SCHEMATIC_NUM_BYTES : -SCHEMATIC_NUM_BYTES)
  );
  save.setInt32(needle, COUNT_OFFSET, count);
  save.setInt32(needle, SCHEMATIC_LENGHT_OFFSET, count * SCHEMATIC_NUM_BYTES);
}

export default updateSize;
