// 选择排序
function selectionSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let minIdx, temp;
  for (let i = 0; i < len - 1; i++) {
    minIdx = i; // 最小数的索引
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j; // 找到最小数的索引
      }
    }
    if (minIdx !== i) {
      temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
}

console.log(selectionSort([2, 4, 3, 1, 7, 9, 8, 5, 6, 0]));
