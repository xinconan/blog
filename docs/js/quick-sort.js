// ！快速排序，该方法比较通俗易懂，但返回的是新数组，不是在原数组上操作的
function quickSort1(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const mid = len >> 1;
  // 中间元素当做基准值
  const midVal = arr.splice(mid, 1)[0];
  // 小于基准值的放在left，大于基准值的放在right
  const left = []; // 这里借助了额外的空间来辅助
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midVal) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 最后对left、right做一样的排序后拼接起来
  return quickSort1(left).concat(midVal, quickSort1(right));
}
// ！在原数组上操作，找出基准值，然后排序
function quickSort2(arr, left, right) {
  let len = arr.length;
  let partitionIndex;
  left = typeof left !== "number" ? 0 : left;
  right = typeof right !== "number" ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort2(arr, left, partitionIndex - 1);
    quickSort2(arr, partitionIndex + 1, right);
  }
  return arr;
}
// 分区操作
function partition(arr, left, right) {
  let pivot = left; // 基准值
  let index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) { // 降价的话这里改成大于即可
      swap(arr, i, index);
      index++;
    }
  }
  // 交换顺序，确保左侧是小于基准值的
  swap(arr, pivot, index - 1);
  // 返回当前排好序基准值的位置，下次当前值不参与排序
  return index - 1;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(quickSort2([2, 4, 3, 1, 7, 9, 8, 5, 6, 0]));
