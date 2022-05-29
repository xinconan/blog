function flatten(arr, deep = false) {
  // array 原生
  // arr.flat();
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      let val = item;
      if (deep) {
        val = flatten(val, true);
      }
      // 方法一
      // val.forEach((v) => {
      //   res.push(v);
      // });
      // 方法二
      res = res.concat(val);
    } else {
      res.push(item);
    }
  });
  return res;
}

console.log(flatten([1, 2, [3, ['a', 'b']], 5]));
console.log(flatten([1, 2, [3, ['a', 'b']], 5], true));
