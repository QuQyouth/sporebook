

export const DivideGroup = (sortData: ItemFormDate[], attribute: keyof ItemFormDate) => {
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
    return item[attribute];
  });
  return sorted;
};





