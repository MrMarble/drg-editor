import { readFileSync } from "fs";
import { describe, expect, test } from "vitest";
import { U8Array } from "../uint8array";

describe("U8Array", () => {
  const buff = readFileSync("src/__tests__/fixtures/example.sav");

  test("Should find index array", () => {
    const haystack = new U8Array(buff);
    const needle = [
      0x07, 0x85, 0x48, 0xb9, 0x32, 0x32, 0xc0, 0x40, 0x85, 0xf8, 0x92, 0xe0,
      0x84, 0xa7, 0x41, 0x00,
    ];

    expect(haystack.indexOfMulti(needle)).toBe(197355);
  });

  test("Should find index string", () => {
    const haystack = new U8Array(buff);
    const needle = "078548b93232c04085f892e084a74100";

    expect(haystack.indexOfMulti(needle)).toBe(197355);
  });
});
