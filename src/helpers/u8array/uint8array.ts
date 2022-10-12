import { HEADER_OFFSET } from "../../constant";
import { hexStringToByteArray } from "../hexToByte/hexToByte";

export type UUID = Array<number> | string;

/**
 * Wrapper for Uint8Array
 */
export class U8Array extends Uint8Array {
  /**
   *
   * Find the first index of a multi-byte needle in a haystack
   *
   * @param needle Array of bytes to search for
   * @param offset Offset to start searching from
   * @returns Index of first byte of needle
   */
  indexOfMulti(needle: UUID | string, offset = 0): number {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }

    let index = Array.prototype.indexOf.call(this, needle[0], offset);

    if (needle.length === 1 || index === -1) {
      // Not found or no other elements to check
      return index;
    }

    let needleIndex = 0;
    let i = index;
    for (; i < this.length; i++) {
      if (this[i] === needle[needleIndex]) {
        needleIndex++;
        index = i;
        if (needleIndex === needle.length) {
          return index - needle.length + 1;
        }
      } else {
        needleIndex = 1;
        i = this.indexOf(needle[0], i);
      }
    }

    return i === index + needle.length ? index : -1;
  }

  getInt32(needle: UUID, offset = 0): number {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);
    if (index === -1) {
      return -1;
    }
    const data = this.slice(
      index + needle.length + offset,
      index + needle.length + offset + 4
    );
    const view = new DataView(data.buffer);
    return view.getInt32(0, true);
  }

  setInt32(needle: UUID, offset: number, value: number): void {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);

    const view = new DataView(new ArrayBuffer(4));
    view.setInt32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + needle.length + offset);
  }

  getFloat32(needle: UUID, offset = 0): number {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);
    if (index === -1) {
      return -1;
    }
    const data = this.slice(
      index + needle.length + offset,
      index + needle.length + offset + 4
    );
    const view = new DataView(data.buffer);
    return view.getFloat32(0, true);
  }

  setFloat32(needle: UUID, offset: number, value: number): void {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + needle.length + offset);
  }
}
