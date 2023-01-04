import { HEADER_OFFSET } from '../../constant';
import { hexStringToByteArray } from '../hexToByte/hexToByte';

export type UUID = number[] | string;

const INT32_NUM_BYTES = 4;
const FLOAT32_NUM_BYTES = 4;

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
  public indexOfMulti(needle: UUID, offset = 0): number {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;

    let index = Array.prototype.indexOf.call(this, needle[0], offset);

    if (hexNeedle.length === 1 || index === -1) {
      // Not found or no other elements to check
      return index;
    }

    let currentIndex = 0;
    let temporaryIndex = index;

    for (; temporaryIndex < this.length; temporaryIndex++) {
      if (this[temporaryIndex] === hexNeedle[currentIndex]) {
        currentIndex += 1;
        index = temporaryIndex;
        if (currentIndex === hexNeedle.length) {
          return index - hexNeedle.length + 1;
        }
      } else {
        currentIndex = 1;
        temporaryIndex = this.indexOf(hexNeedle[0], temporaryIndex);
        if (temporaryIndex === -1) {
          return -1;
        }
      }
    }

    return temporaryIndex === index + hexNeedle.length ? index : -1;
  }

  public getInt32(needle: UUID, offset = 0, from = HEADER_OFFSET): number {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;

    const index = this.indexOfMulti(hexNeedle, from);
    if (index === -1) {
      return -1;
    }
    const data = this.slice(
      index + hexNeedle.length + offset,
      index + hexNeedle.length + offset + INT32_NUM_BYTES
    );
    const view = new DataView(data.buffer);
    return view.getInt32(0, true);
  }

  public setInt32(
    needle: UUID,
    offset: number,
    value: number,
    from = HEADER_OFFSET
  ): void {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;

    const index = this.indexOfMulti(hexNeedle, from);

    const view = new DataView(new ArrayBuffer(INT32_NUM_BYTES));
    view.setInt32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + hexNeedle.length + offset);
  }

  public getFloat32(needle: UUID, offset = 0): number {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;

    const index = this.indexOfMulti(hexNeedle, HEADER_OFFSET);
    if (index === -1) {
      return -1;
    }
    const data = this.slice(
      index + hexNeedle.length + offset,
      index + hexNeedle.length + offset + FLOAT32_NUM_BYTES
    );
    const view = new DataView(data.buffer);
    return view.getFloat32(0, true);
  }

  public setFloat32(needle: UUID, offset: number, value: number): void {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;
    const index = this.indexOfMulti(hexNeedle, HEADER_OFFSET);
    const view = new DataView(new ArrayBuffer(FLOAT32_NUM_BYTES));
    view.setFloat32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + hexNeedle.length + offset);
  }

  public getUUID(needle: UUID, offset = 0): string {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;
    const index = this.indexOfMulti(hexNeedle, HEADER_OFFSET);
    if (index === -1) {
      return '';
    }
    const data = this.slice(
      index + hexNeedle.length + offset,
      index + hexNeedle.length + offset + 16
    );

    return [...data].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  public setUUID(needle: UUID, offset: number, value: string): void {
    const hexNeedle =
      typeof needle === 'string' ? hexStringToByteArray(needle) : needle;
    const index = this.indexOfMulti(hexNeedle, HEADER_OFFSET);
    const data = hexStringToByteArray(value);

    this.set(data, index + hexNeedle.length + offset);
  }

  public grow(size: number): U8Array {
    const buff = new ArrayBuffer(this.length + size);
    const u8 = new U8Array(buff);
    u8.set(this, 0);
    return u8;
  }

  public shrink(size: number): U8Array {
    const buff = new ArrayBuffer(this.length - size);
    const u8 = new U8Array(buff);
    u8.set(this.subarray(0, -size), 0);
    return u8;
  }

  public shift(steps = 1, start = 0): void {
    this.set(this.subarray(start, -steps), start > 0 ? start + steps : steps);
    this.fill(0, start, start > 0 ? start + steps : steps);
  }

  public unshift(steps = 1, start = 0): void {
    this.set(this.subarray(start > 0 ? start + steps : steps), start);
    this.fill(0, -steps);
  }

  public has(string_: string): boolean {
    const temporary = new TextDecoder('utf8').decode(this.buffer);
    return temporary.includes(string_);
  }
}
