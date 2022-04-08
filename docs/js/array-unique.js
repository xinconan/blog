// 数组去重

function unique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

function unique2(arr) {
  return [...new Set(arr)];
}
