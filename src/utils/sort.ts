export const sortByFieldName = (
  array: Array<any>,
  fieldName: string,
  direction: 'asc' | 'desc'
) => {
  const sortedArray = array.sort((a: any, b: any) => {
    let itemA = a[fieldName];
    let itemB = b[fieldName];

    if (itemA > itemB) {
      return direction === 'asc' ? 1 : -1;
    }
    if (itemA < itemB) {
      return direction === 'asc' ? -1 : 1;
    }
    // id must be equal
    return 0;
  });

  return sortedArray;
};
