function curry(fn) {
  // 获取fn 参数的长度
  const fnArgsLength = fn.length;
  let args = [];

  // 不能用 =>
  function calc(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length < fnArgsLength) {
      return calc;
    }
    return fn.apply(this, args.slice(0, fnArgsLength));
  }

  return calc;
}

function add(a, b, c) {
  return a + b + c;
}

const curryA = curry(add);
console.log(curryA(10)(20)(30));
