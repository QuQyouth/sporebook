

export const DivideGroup = (sortData: ItemFormDate[]) => {
  console.log(11111111111)
  console.log(sortData)
  const groupBy = (array: ItemFormDate[], f: Function) => {
    const groups: {
      [key: string]: ItemFormDate[],
    } = {};
    array.forEach((item) => {
      const group = JSON.stringify(f(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  };
  const sorted = groupBy(sortData, (item: ItemFormDate) => {
    return item.kind;
  });
  return sorted;
};





