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
        if (i == -1) {
          return -1;
        }
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

  getUUID(needle: UUID, offset = 0): string {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);
    if (index === -1) {
      return "";
    }
    const data = this.slice(
      index + needle.length + offset,
      index + needle.length + offset + 16
    );

    return Array.from(data)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  setUUID(needle: UUID, offset: number, value: string): void {
    if (typeof needle === "string") {
      needle = hexStringToByteArray(needle);
    }
    const index = this.indexOfMulti(needle, HEADER_OFFSET);
    const data = hexStringToByteArray(value);

    this.set(data, index + needle.length + offset);
  }

  grow(size: number): U8Array {
    const buff = new ArrayBuffer(this.length + size);
    const u8 = new U8Array(buff);
    u8.set(this, 0);
    return u8;
  }

  shrink(size: number): U8Array {
    const buff = new ArrayBuffer(this.length - size);
    const u8 = new U8Array(buff);
    u8.set(this.subarray(0, -size), 0);
    return u8;
  }

  shift(steps = 1, start = 0): void {
    this.set(this.subarray(start, -steps), start > 0 ? start + steps : steps);
    this.fill(0, start, start > 0 ? start + steps : steps);
  }

  unshift(steps = 1, start = 0): void {
    this.set(this.subarray(start > 0 ? start + steps : steps), start);
    this.fill(0, -steps);
  }

  has(str: string): boolean {
    const tmp = new TextDecoder("utf-8").decode(this.buffer);
    return tmp.includes(str);
  }
}
