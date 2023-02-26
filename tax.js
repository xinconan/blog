const config = {
  salary: 33000,
  fundNum: 33000, // 公积金缴纳基数
  fund: 7, // 公积金缴纳比例
  socialNum: 33000,
  social: 10.5, // 社保五险缴纳总比例
  deductions: 1500, // 附加扣除
};

// const config = {
//   salary: 29000,
//   fundNum: 29000, // 公积金缴纳基数
//   fund: 12, // 公积金缴纳比例
//   socialNum: 4000,
//   social: 10.5, // 社保五险缴纳总比例
//   deductions: 1000, // 附加扣除
// };

function getTax(config) {
  const res = [];
  const socialNum = ((config.socialNum * config.social) / 100).toFixed(2);
  const fundNum = ((config.fundNum * config.fund) / 100).toFixed(2);
  console.log(socialNum, fundNum);
  const deduct = [0];
  // 每月扣除五险一金后
  const monthNum = config.salary - socialNum - fundNum;
  const monthTax = monthNum - 5000 - config.deductions;
  let total = 0;
  for (let i = 1; i < 13; i++) {
    // 扣除5000后计税部分
    const sum = monthTax * i;
    let tax = 0;
    if (sum <= 36000) {
      tax = sum * 0.03 - deduct[i - 1];
    } else if (sum > 36000 && sum <= 144000) {
      tax = sum * 0.1 - 2520 - deduct[i - 1];
    } else if (sum > 144000 && sum <= 300000) {
      tax = sum * 0.2 - 16920 - deduct[i - 1];
    } else if (sum > 300000 && sum <= 420000) {
      tax = sum * 0.25 - 31920 - deduct[i - 1];
    } else if (sum > 420000 && sum <= 660000) {
      tax = sum * 0.3 - 52920 - deduct[i - 1];
    } else if (sum > 660000 && sum <= 960000) {
      tax = sum * 0.35 - 85920 - deduct[i - 1];
    } else if (sum > 960000) {
      tax = sum * 0.45 - 181920 - deduct[i - 1];
    }
    deduct[i] = tax + deduct[i - 1];
    res[i - 1] = monthNum - tax;
    total += res[i - 1];
  }

  const average = parseFloat((total / 12).toFixed(2));

  return {
    month: res,
    total,
    average,
    averageWithFund: average + parseFloat(fundNum) * 2,
  };
}
console.log(getTax(config));
