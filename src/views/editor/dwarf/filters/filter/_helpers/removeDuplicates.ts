function removeDuplicates<T>(
  data: T[] | undefined,
  key: (x: T) => unknown
): T[] {
  if (!data) return [];

  return [...new Map(data.map(x => [key(x), x])).values()];
}

export default removeDuplicates;
