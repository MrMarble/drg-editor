import { readFileSync } from "fs";
import { bench, describe } from "vitest";
import { U8Array } from "../uint8array";

describe("U8Array", () => {
  const buff = readFileSync("src/__tests__/fixtures/with_overclocks.sav");
  const needle = [
    0x07, 0x85, 0x48, 0xb9, 0x32, 0x32, 0xc0, 0x40, 0x85, 0xf8, 0x92, 0xe0,
    0x84, 0xa7, 0x41, 0x00,
  ];

  bench("indexOfMulti", () => {
    const haystack = new U8Array(buff);

    haystack.indexOfMulti(needle);
  });
});
