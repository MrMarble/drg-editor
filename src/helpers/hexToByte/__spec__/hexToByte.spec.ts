import { describe, expect, test } from "vitest";
import { hexStringToByteArray } from "../hexToByte";

describe("hexStringToByteArray", () => {
  test("Should convert a hex string to a byte array", () => {
    expect(hexStringToByteArray("078548b93232c04085f892e084a74100")).toEqual([
      0x07, 0x85, 0x48, 0xb9, 0x32, 0x32, 0xc0, 0x40, 0x85, 0xf8, 0x92, 0xe0,
      0x84, 0xa7, 0x41, 0x00,
    ]);
  });

  test("Should throw an error if the hex string is not even", () => {
    expect(() => hexStringToByteArray("010")).toThrow();
  });
});
