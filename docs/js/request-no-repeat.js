// 取消重复的请求，当请求没有返回时，不再重复发送请求
function norepeat(fn) {
  let p = null;
  return function (...args) {
    // 请求实例存在时，返回已有的实例，否则返回请求，请求完成时将p置空
    return p ? p : (p = fn.apply(null, args).finally(() => (p = null)));
  };
}

let count = 1;
let promiseFunction = () =>
  new Promise((rs) =>
    setTimeout(() => {
      rs(count++);
    }, 1000)
  );

let req = norepeat(promiseFunction);
req().then(console.log);
req().then(console.log);
req().then(console.log);

setTimeout(() => {
  req().then(console.log);
  req().then(console.log);
  req().then(console.log);
}, 2000);
