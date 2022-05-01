// 插入排序
function insertSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

console.log(insertSort([2, 4, 3, 1, 7, 9, 8, 5, 6, 0]));
