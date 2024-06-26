// 10进制转任意N进制（2-36以内）
// function decimalToBaseN(num, base) {
//   if (base < 2 || base > 36) {
//     throw new Error('参数错误');
//   }
//   if (base === 10) {
//     return num;
//   }
//   let result = '';
//   while (num > 0) {
//     let remain = num % base;
//     if (remain < 10) {
//       result = remain + result;
//     } else {
//       result = String.fromCharCode(remain + 55) + result;
//     }
//     num = Math.floor(num / base);
//   }
//   return result;
// }

// // N进制转0进制
// function baseNToDecimal(num, base) {
//   if (base < 2 || base > 36) {
//     throw new Error('参数错误');
//   }
//   if (base === 10) {
//     return num;
//   }
//   let result = 0;
//   const digits = num.toString().split('').reverse();
//   for (let i = 0; i < digits.length; i++) {
//     const digit = parseInt(digits[i], base);
//     result += digit * Math.pow(base, i);
//   }
//   return result;
// }

function decimalToBaseN(num, base) {
  if (base < 2 || base > 36) {
    return new Error('非法参数');
  }
  if (base === 10) {
    return num;
  }
  let result = '';
  while (num > 0) {
    const remain = num % base;
    if (remain < 10) {
      result = remain + result;
    } else {
      result = String.fromCharCode(remain + 55) + result;
    }
    num = Math.floor(num / base);
  }
  return result;
}

function baseNToDecimal(num, base) {
  if (base < 2 || base > 36) {
    return new Error('Invalid base');
  }
  if (base === 10) {
    return num;
  }
  const numStr = String(num).split('').reverse();
  // 字母索引的位置就是对应十进制数字
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 0;
  for (let i = 0; i < numStr.length; i++) {
    let digit = digits.indexOf(numStr[i].toUpperCase());
    if (digit === -1) {
      return new Error('Invlid number');
    }
    result += Math.pow(base, i) * digit;
  }
  return result;
}

console.log(decimalToBaseN(20, 8) == '24');
console.log(decimalToBaseN(20, 16) == '14');
console.log(decimalToBaseN(20, 2) === '10100');
console.log(baseNToDecimal(20, 8) === 16);
console.log(baseNToDecimal('1A1', 27) === 1000);
console.log(baseNToDecimal('1A1', 36) === 1657);
console.log('===========');

// 股票
// function calcMaxProfit(initMoney, days, prices) {
//   let maxProfit = 0;
//   let stocks = 0;

//   for (let i = 0; i< days;i++) {
//     if (i === 0 && )
//   }
// }
function calculateMaxProfit(initialCapital, numDays, prices) {
  let maxProfit = 0;
  let stocks = 0;
  let buyPrice = 0;

  for (let i = 0; i < numDays; i++) {
    if (stocks === 0) {
      // 如果没有持有股票，判断是否买入股票
      if (i + 1 < numDays && prices[i] < prices[i + 1]) {
        stocks = Math.floor(initialCapital / prices[i]);
        initialCapital -= stocks * prices[i];
        buyPrice = prices[i];
      }
    } else {
      // 如果持有股票，判断是否卖出股票
      if (i + 1 === numDays || prices[i] > prices[i + 1]) {
        initialCapital += stocks * prices[i];
        maxProfit += initialCapital - stocks * buyPrice;
        stocks = 0;
        initialCapital = 0;
      }
    }
  }
  return maxProfit;
}

// 示例用法
console.log(calculateMaxProfit(10000, 3, [1, 2, 1])); // 输出: 10000
console.log(calculateMaxProfit(10000, 5, [5, 4, 3, 2, 1])); // 输出: 0
console.log(calculateMaxProfit(10000, 2, [1, 1])); // 输出: 0
console.log(calculateMaxProfit(10000, 5, [1, 2, 3, 4, 5])); // 输出: 40000
console.log(calculateMaxProfit(10000, 5, [3, 3, 3, 3, 3])); // 输出: 0
console.log(calculateMaxProfit(10000, 10, [5, 1, 2, 3, 5, 3, 3, 1, 2, 2])); // 输出: 90000
