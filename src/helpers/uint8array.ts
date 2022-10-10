export class U8Array extends Uint8Array {
  indexOfMulti(needle: Array<number>, offset?: number): number {
    offset = offset || 0;

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
  getInt32(needle: Array<number>, offset: number): number {
    const index = this.indexOfMulti(needle, 0x42d);
    const data = this.slice(
      index + needle.length + offset,
      index + needle.length + offset + 4
    );
    const view = new DataView(data.buffer);
    return view.getInt32(0, true);
  }

  setInt32(needle: Array<number>, offset: number, value: number): void {
    const index = this.indexOfMulti(needle, 0x42d);
    const view = new DataView(new ArrayBuffer(4));
    view.setInt32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + needle.length + offset);
  }

  getFloat32(needle: Array<number>, offset: number): number {
    const index = this.indexOfMulti(needle, 0x42d);
    const data = this.slice(
      index + needle.length + offset,
      index + needle.length + offset + 4
    );
    const view = new DataView(data.buffer);
    return view.getFloat32(0, true);
  }

  setFloat32(needle: Array<number>, offset: number, value: number): void {
    const index = this.indexOfMulti(needle, 0x42d);
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, value, true);

    const u8 = new Uint8Array(view.buffer);

    this.set(u8, index + needle.length + offset);
  }
}
