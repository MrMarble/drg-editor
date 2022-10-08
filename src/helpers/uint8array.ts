export class U8Array extends Uint8Array {
  indexOfMulti(searchElements: Array<number>, offset?: number): number {
    offset = offset || 0;

    var index = Array.prototype.indexOf.call(this, searchElements[0], offset);
    if (searchElements.length === 1 || index === -1) {
      // Not found or no other elements to check
      return index;
    }

    for (
      var i = index, j = 0;
      j < searchElements.length && i < this.length;
      i++, j++
    ) {
      if (this[i] !== searchElements[j]) {
        return this.indexOfMulti(searchElements, i);
      }
    }

    return i === index + searchElements.length ? index : -1;
  }
}
