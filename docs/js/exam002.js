/**
 * 36进制与10进制相互转换
 * 说明：实现一个方法,可将36进制(0-9,a-z)的字符串与10进制(0-9)的数字，相互转换
 * 示例：
 *   convertBinary('a1'); // 361 36进制的'a1'对应10进制的361
 *   convertBinary(371); // 'ab' 10进制的371对应36进制的'ab'
 *   convertBinary(37); //  '11' 10进制的37对应36进制的'11'
 *   convertBinary('11'); // 37  36进制的'11'对应10进制的37
 */
function convertBinary(input) {
  if (typeof input === 'string') {
    return parseInt(input, 36);
  } else if (typeof input === 'number') {
    return input.toString(36);
  }
}

console.log(convertBinary('a1'));
console.log(convertBinary(371));
console.log(convertBinary(37));
console.log(convertBinary('11'));

/**
 * 获取嵌套数组深度
 * 说明：给定一个带嵌套的数组，实现一个方法可获取嵌套数组的最大深度，
 *   数组无嵌套子数组，则返回0，有一层嵌套子数组则1，依此类推。
 * 示例：
 *   getArrayDeep([1, 2, [3, [1, [0]]]]); // 返回 3
 *   getArrayDeep([]); // 返回 0
 *   getArrayDeep([[[[]]]]); // 返回 3
 *   getArrayDeep([0, [2], [2, [3]]]); // 返回 2
 */

function getArrayDeep(arr) {
  return getMax(arr) - 1;
}

function getMax(arr) {
  let flag = false;
  let nums = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flag = true;
      // 递归算出每一个子数组的深度，取最大值即可
      nums.push(getMax(arr[i]));
    }
  }
  if (flag) {
    return Math.max.apply(null, nums) + 1;
  }
  return 1;
}

console.log(getArrayDeep([1, 2, [3, [1, [0]]]]));
console.log(getArrayDeep([]));
console.log(getArrayDeep([[[[]]]]));
console.log(getArrayDeep([0, [2], [2, [3]]]));
