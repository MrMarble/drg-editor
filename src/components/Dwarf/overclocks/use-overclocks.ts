import { useState } from "react";
import { DWARFS } from "../../../constant";
import type { U8Array } from "../../../helpers";
import { b } from "../../../helpers/hexToByte/hexToByte";
import { UUID } from "../../../helpers/u8array/uint8array";
import { useChangesStore } from "../../../stores/changesStore";
import { useSaveStore } from "../../../stores/saveStore";

const FORGED_NEEDLE: UUID = [
  0x46, 0x6f, 0x72, 0x67, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x74,
  0x69, 0x63, 0x73, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x41, 0x72, 0x72, 0x61, 0x79,
  0x50, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x00,
];

const OWNED_NEEDLE: UUID = [
  0x4f, 0x77, 0x6e, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x74, 0x69,
  0x63, 0x73, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x41, 0x72, 0x72, 0x61, 0x79, 0x50,
  0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x00,
];

const COUNT_OFFSET = 28;
const OWNED_OFFSET = 105;
const FORGED_OFFSET = 106;

export const useOverclocks = (dwarf: DWARFS) => {
  const { save, setSave } = useSaveStore();
  const { increment } = useChangesStore();

  const [owned, setOwned] = useState(() => {
    const length = save.getInt32(OWNED_NEEDLE, COUNT_OFFSET);
    const overclocks = [];
    for (let i = 0; i < length; i++) {
      overclocks.push(save.getUUID(OWNED_NEEDLE, OWNED_OFFSET + i * 16));
    }
    return overclocks;
  });

  const [forged, setForged] = useState(() => {
    if (!save.has("ForgedSchematics")) {
      createForged(save, setSave);
      return [];
    }

    const length = save.getInt32(FORGED_NEEDLE, COUNT_OFFSET);
    const forged = [];
    for (let i = 0; i < length; i++) {
      forged.push(save.getUUID(FORGED_NEEDLE, FORGED_OFFSET + i * 16));
    }
    console.log({ length, forged });
    return forged;
  });

  return {
    state: { owned, forged },
    actions: {
      lock: (id: string) => {
        if (forged.includes(id))
          handleForge({ save, id, forged, setSave, setForged });
        if (!owned.includes(id)) return;

        handleLock({ save, id, owned, setSave, setOwned });
        increment();
      },
      unlock: (id: string) => {
        if (forged.includes(id))
          handleForge({ save, id, forged, setSave, setForged });
        if (owned.includes(id)) return;

        handleUnlock({ save, id, owned, setSave, setOwned });
        increment();
      },
      forge: (id: string) => {
        if (owned.includes(id))
          handleLock({ save, id, owned, setSave, setOwned });

        handleForge({ save, id, forged, setSave, setForged });
        increment();
      },
    },
  };
};

const createForged = (save: U8Array, setSave: (save: U8Array) => void) => {
  const block = [
    0x11, 0x00, 0x00, 0x00, 0x46, 0x6f, 0x72, 0x67, 0x65, 0x64, 0x53, 0x63,
    0x68, 0x65, 0x6d, 0x61, 0x74, 0x69, 0x63, 0x73, 0x00, 0x0e, 0x00, 0x00,
    0x00, 0x41, 0x72, 0x72, 0x61, 0x79, 0x50, 0x72, 0x6f, 0x70, 0x65, 0x72,
    0x74, 0x79, 0x00, 0x4e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f,
    0x00, 0x00, 0x00, 0x53, 0x74, 0x72, 0x75, 0x63, 0x74, 0x50, 0x72, 0x6f,
    0x70, 0x65, 0x72, 0x74, 0x79, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x11,
    0x00, 0x00, 0x00, 0x46, 0x6f, 0x72, 0x67, 0x65, 0x64, 0x53, 0x63, 0x68,
    0x65, 0x6d, 0x61, 0x74, 0x69, 0x63, 0x73, 0x00, 0x0f, 0x00, 0x00, 0x00,
    0x53, 0x74, 0x72, 0x75, 0x63, 0x74, 0x50, 0x72, 0x6f, 0x70, 0x65, 0x72,
    0x74, 0x79, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x47, 0x75, 0x69, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00,
  ];

  const newSave = save.grow(block.length);
  newSave.shift(
    block.length,
    save.indexOfMulti(b`FirstSchematicMessageShown`) + 54
  );

  newSave.set(block, save.indexOfMulti(b`FirstSchematicMessageShown`) + 54);

  setSave(newSave);
};

const updateSize = ({
  save,
  needle,
  add = true,
  count,
}: {
  save: U8Array;
  add?: boolean;
  needle: UUID;
  count: number;
}) => {
  let old = save.getInt32(b`SchematicSave`, 20);
  save.setInt32(b`SchematicSave`, 20, old + (add ? 16 : -16));

  old = save.getInt32(needle, 0);
  save.setInt32(needle, 0, old + (add ? 16 : -16));
  save.setInt32(needle, COUNT_OFFSET, count);
  save.setInt32(needle, 71, count * 16);
};
const handleForge = ({
  save,
  id,
  forged,
  setSave,
  setForged,
}: {
  save: U8Array;
  id: string;
  forged: string[];
  setSave: (save: U8Array) => void;
  setForged: (forged: string[]) => void;
}) => {
  if (forged.includes(id)) {
    updateSize({
      save,
      needle: FORGED_NEEDLE,
      add: false,
      count: forged.length - 1,
    });

    const start =
      save.indexOfMulti(FORGED_NEEDLE) +
      FORGED_NEEDLE.length +
      FORGED_OFFSET +
      (forged.length - 1) * 16;
    save.unshift(16, start);

    setSave(save.shrink(16));
    setForged(forged.filter((f) => f !== id));
  } else {
    updateSize({
      save,
      needle: FORGED_NEEDLE,
      count: forged.length + 1,
    });

    const newSave = save.grow(16);
    const start =
      save.indexOfMulti(FORGED_NEEDLE) +
      FORGED_NEEDLE.length +
      FORGED_OFFSET +
      forged.length * 16;
    newSave.shift(16, start);
    newSave.setUUID(FORGED_NEEDLE, FORGED_OFFSET + forged.length * 16, id);

    setSave(newSave);
    setForged([...forged, id]);
  }
};

const handleLock = ({
  save,
  id,
  owned,
  setSave,
  setOwned,
}: {
  save: U8Array;
  id: string;
  owned: string[];
  setSave: (save: U8Array) => void;
  setOwned: (owned: string[]) => void;
}) => {
  updateSize({
    save,
    needle: OWNED_NEEDLE,
    count: owned.length - 1,
    add: false,
  });

  const start =
    save.indexOfMulti(OWNED_NEEDLE) +
    OWNED_NEEDLE.length +
    OWNED_OFFSET +
    (owned.length - 1) * 16;
  save.unshift(16, start);

  setSave(save.shrink(16));
  setOwned(owned.filter((o) => o !== id));
};

const handleUnlock = ({
  save,
  id,
  owned,
  setSave,
  setOwned,
}: {
  save: U8Array;
  id: string;
  owned: string[];
  setSave: (save: U8Array) => void;
  setOwned: (owned: string[]) => void;
}) => {
  updateSize({ save, needle: OWNED_NEEDLE, count: owned.length + 1 });

  const newSave = save.grow(16);
  const start =
    save.indexOfMulti(OWNED_NEEDLE) +
    OWNED_NEEDLE.length +
    OWNED_OFFSET +
    owned.length * 16;
  newSave.shift(16, start);
  newSave.setUUID(OWNED_NEEDLE, OWNED_OFFSET + owned.length * 16, id);

  setSave(newSave);
  setOwned([...owned, id]);
};
