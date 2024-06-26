// 判断正整数是质数还是合数
function isPrimeOrComposite(num) {
  if (num < 2) {
    return '非法输入';
  }
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      return '合数';
    }
  }
  return '质数';
}
console.log(isPrimeOrComposite(100));
console.log(isPrimeOrComposite(10011));
console.log(isPrimeOrComposite(10891));
console.log(isPrimeOrComposite(89199));

function getSecond(len, nums) {
  nums.sort();
  const max = nums[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    if (nums[i] < max) {
      return nums[i];
    }
  }
  return -1;
}
console.log(getSecond(2, [1, 2]) === 1);
console.log(getSecond(3, [1, 2, 3]) === 2);
console.log(getSecond(5, [1, 2, 1, 2, 3]) === 2);
console.log(getSecond(7, [4, 3, 2, 1, 2, 3, 4]) === 3);

// 判断是否为超完全数字不变数
function isSuperNumber(number) {
  const numStr = String(number);
  const len = numStr.length;
  let currentSum = 0;
  for (let i = 0; i < len; i++) {
    currentSum += Math.pow(parseInt(numStr[i]), len);
    if (currentSum > number) {
      return false;
    }
  }
  return currentSum === number;
}

console.log('==========');
console.log(isSuperNumber(153));
console.log(isSuperNumber(370));
console.log(isSuperNumber(371));