import { bench, describe } from "vitest";
import { U8Array } from "./uint8array";

describe("U8Array", () => {
  const buff = new Array(200_000).fill(100);
  buff[100] = 0xa;
  buff[101] = 0xb;
  buff[102] = 0xc;

  buff[190_000] = 0xa;
  buff[190_001] = 0xb;
  buff[190_002] = 0xd;

  bench("indexOfMulti", () => {
    const haystack = new U8Array(buff);
    const needle = [0xa, 0xb, 0xd];
    haystack.indexOfMulti(needle);
  });
});
