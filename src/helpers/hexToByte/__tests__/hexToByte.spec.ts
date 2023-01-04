/* eslint-disable @typescript-eslint/no-magic-numbers */
import { describe, expect, test } from 'vitest';
import { b, hexStringToByteArray } from '../hexToByte';

describe('Hex', () => {
  describe('hexStringToByteArray', () => {
    test('Should convert a hex string to a byte array', () => {
      expect(hexStringToByteArray('078548b93232c04085f892e084a74100')).toEqual([
        0x07, 0x85, 0x48, 0xb9, 0x32, 0x32, 0xc0, 0x40, 0x85, 0xf8, 0x92, 0xe0,
        0x84, 0xa7, 0x41, 0x00
      ]);
    });

    test('Should throw an error if the hex string is not even', () => {
      expect(() => hexStringToByteArray('010')).toThrow();
    });
  });

  describe('b', () => {
    test('Should convert a string to a byte array', () => {
      expect(b`OwnedSchematics`).toEqual([
        0x4f, 0x77, 0x6e, 0x65, 0x64, 0x53, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x74,
        0x69, 0x63, 0x73
      ]);
    });
  });
});
