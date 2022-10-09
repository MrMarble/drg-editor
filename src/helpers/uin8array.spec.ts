import { describe, expect, test } from "vitest";
import { U8Array } from "./uint8array";

describe("U8Array", () => {
  const buff = new Array(200_000).fill(100);
  buff[100] = 0xa;
  buff[101] = 0xb;
  buff[102] = 0xc;

  buff[190_000] = 0xa;
  buff[190_001] = 0xb;
  buff[190_002] = 0xd;

  test("Should match at index 100", () => {
    const haystack = new U8Array(buff);

    const needle = [0xa, 0xb, 0xc];

    expect(haystack.indexOfMulti(needle)).toBe(100);
  });
  test("Should match at index 190000", () => {
    const haystack = new U8Array(buff);

    const needle = [0xa, 0xb, 0xd];

    expect(haystack.indexOfMulti(needle)).toBe(190_000);
  });
});
