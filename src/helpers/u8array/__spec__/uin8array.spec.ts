import { readFileSync } from "fs";
import { beforeEach, describe, expect, test } from "vitest";
import { DWARFS, UUIDS } from "../../../constant";
import { hexStringToByteArray } from "../../hexToByte";
import { U8Array } from "../uint8array";

describe("U8Array", () => {
  const buff = readFileSync("src/__tests__/fixtures/example.sav");
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
      expect(haystack.indexOfMulti(uuid)).toBe(43723);
    });

    test("Should be able to get int32", () => {
      const offset = 26; // xp offset
      const value = 6093;
      expect(haystack.getInt32(uuid, offset)).toBe(value);
    });

    test("Should be able to set int32", () => {
      const offset = 26; // xp offset
      const value = 1337;

      haystack.setInt32(uuid, offset, value);

      expect(haystack.getInt32(uuid, offset)).toBe(value);
    });
  });
});
