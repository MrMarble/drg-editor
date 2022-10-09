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
}
