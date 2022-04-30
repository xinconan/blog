// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// 改进算法，记录每次交换的位置pos，在pos之后已经交换完成
function bubbleSort2(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let i = len - 1;
  while (i > 0) {
    let pos = 0; // 每次开始时，无交换记录
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        pos = j;
      }
    }
    i = pos; // 下一次排序的位置
  }
  return arr;
}

console.log(bubbleSort([2, 4, 3, 1, 7, 9, 8, 6, 0]));
console.log(bubbleSort2([2, 4, 3, 1, 7, 9, 8, 6, 0]));
