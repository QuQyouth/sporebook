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

// name相同的amount值相加
export const handleData = (arrList:ItemFormDate[], identical: keyof ItemFormDate, Different: keyof ItemFormDate) => {
  const copyList = [...arrList]
  const hello = new Map()
  const arr: HashMap[] = []

  copyList.forEach((item)=>{
      const identicalName = item[identical]

      // get 获取指定成员的值，如不存在则返回 undefined
      // set 为key设置键值，如已经存在该key则更新，否则添加新元素，返回值是实例本身
      hello.set(identicalName, (hello.get(identicalName) || 0) + Number(item[Different]))
      
  })

  hello.forEach((val,key)=>{
      arr.push({name: key, value: val})
  })

  return arr
}




