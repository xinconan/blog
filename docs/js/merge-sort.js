// 归并排序
function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const mid = len >> 1;
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  res = res.concat(left.length ? left : right);
  return res;
}

console.log(mergeSort([2, 4, 3, 1, 7, 9, 8, 5, 6, 0]));
