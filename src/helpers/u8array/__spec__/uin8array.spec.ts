import { readFileSync } from "fs";
// eslint-disable-next-line import/no-unresolved
import { beforeEach, describe, expect, test } from "vitest";
import { DWARFS, HEADER_OFFSET, UUIDS } from "../../../constant";
import { hexStringToByteArray } from "../../hexToByte";
import { U8Array } from "../uint8array";

describe("U8Array", () => {
  const buff = readFileSync("src/__tests__/fixtures/with_overclocks.sav");
  let haystack: U8Array;

  beforeEach(() => {
    haystack = new U8Array([...buff]);
  });

  const cases = [
    { uuid: UUIDS[DWARFS.DRILLER] + "030000005850", type: "string" },
    {
      uuid: hexStringToByteArray(UUIDS[DWARFS.DRILLER] + "030000005850"),
      type: "bytes",
    },
  ];

  describe.each(cases)("UUID as $type", ({ uuid }) => {
    test(`Should find the UUID ${uuid}`, () => {
      expect(haystack.indexOfMulti(uuid)).toBe(44531);
    });

    test("Should be able to get int32", () => {
      const offset = 26; // xp offset
      const value = 318093;
      expect(haystack.getInt32(uuid, offset)).toBe(value);
    });

    test("Should be able to set int32", () => {
      const offset = 26; // xp offset
      const value = 1337;

      haystack.setInt32(uuid, offset, value);

      expect(haystack.getInt32(uuid, offset)).toBe(value);
    });
  });

  test("Should get UUID", () => {
    expect(
      haystack.getUUID(
        [
          0x4f, 0x77, 0x6e, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61,
          0x74, 0x69, 0x63, 0x73, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x53, 0x74,
          0x72, 0x75, 0x63, 0x74, 0x50, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74,
          0x79, 0x00,
        ],
        34
      )
    ).toBe("5885a33b15ae844591a66b65a2e5494e");
  });

  test("Should set UUID", () => {
    const uuid = "4ccc7e994163a14aaac97ab3777ff1f9";

    const haystack = new U8Array(new Array(HEADER_OFFSET + 17).fill(0));

    haystack.setUUID([0], 0, uuid);
    expect(haystack.getUUID([0])).toBe(uuid);
  });

  test("Should grow", () => {
    const size = 100;
    const haystack = new U8Array(new Array(50).fill(1));
    const u8 = haystack.grow(size);

    expect(haystack.length).toBe(50);
    expect(u8.length).toBe(haystack.length + size);
    expect(u8.slice(haystack.length)).toEqual(
      new U8Array(new Array(size).fill(0))
    );
  });

  test("Should shift", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack.shift(2);
    expect(haystack).toEqual(new U8Array([0, 0, 1, 2, 3, 4, 5, 6, 7, 8]));
  });

  test("Should shift with start", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack.shift(2, 2);
    expect(haystack).toEqual(new U8Array([1, 2, 0, 0, 3, 4, 5, 6, 7, 8]));
  });

  test("Should shift with grow", () => {
    let haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack = haystack.grow(2);
    haystack.shift(2, 5);
    expect(haystack).toEqual(
      new U8Array([1, 2, 3, 4, 5, 0, 0, 6, 7, 8, 9, 10])
    );
  });

  test("Should shrink", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(haystack.shrink(2)).toEqual(new U8Array([1, 2, 3, 4, 5, 6, 7, 8]));
  });

  test("Should unshift", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack.unshift(2);
    expect(haystack).toEqual(new U8Array([3, 4, 5, 6, 7, 8, 9, 10, 0, 0]));
  });

  test("Should unshift with start", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack.unshift(2, 4);
    expect(haystack).toEqual(new U8Array([1, 2, 3, 4, 7, 8, 9, 10, 0, 0]));
  });

  test("Should unshift with shrink", () => {
    const haystack = new U8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    haystack.unshift(2, 4);
    expect(haystack.shrink(2)).toEqual(new U8Array([1, 2, 3, 4, 7, 8, 9, 10]));
  });

  test("Should return true if save has substring", () => {
    expect(haystack.has("ForgedSchematics")).toBe(true);
  });

  test("Should return false if save doesnt have substring", () => {
    const buff = readFileSync("src/__tests__/fixtures/without_overclocks.sav");
    const haystack = new U8Array([...buff]);

    expect(haystack.has("ForgedSchematics")).toBe(false);
  });
});
