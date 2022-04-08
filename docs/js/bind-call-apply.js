// bind、call、apply实现
Function.prototype.myBind = function (context, ...bindArgs) {
  // context 是 bind 的 this

  // 当前函数本身
  const self = this;
  // 返回的是一个函数
  return function (...args) {
    // 合并参数执行
    return self.apply(context, args.concat(bindArgs));
  };
};

// call 返回的是执行的结果
Function.prototype.myCall = function (context, ...args) {
  // 利用 obj={x:100, fn(){return this.x} } 对象函数返回this原理，绑定context
  if (context == null) {
    context = window; // 默认是window，或者写globalThis
  }
  // 值类型转对象类型
  if (typeof context !== 'object') {
    context = new Object(context);
  }

  const fnKey = Symbol(); // 唯一key，避免属性覆盖

  context[fnKey] = this; // 当前函数
  // 执行函数结果并删除函数，返回函数返回值
  const res = context[fnKey](...args);
  delete context[fnKey];
  return res;
};

// apply 返回的是执行的结果，与call唯一不同的就是参数形式是数组
Function.prototype.myApply = function (context, args) {
  // 利用 obj={x:100, fn(){return this.x} } 对象函数返回this原理，绑定context
  if (context == null) {
    context = window; // 默认是window，或者写globalThis
  }
  // 值类型转对象类型
  if (typeof context !== 'object') {
    context = new Object(context);
  }

  const fnKey = Symbol(); // 唯一key，避免属性覆盖

  context[fnKey] = this; // 当前函数
  // 执行函数结果并删除函数，返回函数返回值
  const res = context[fnKey](...args);
  delete context[fnKey];
  return res;
};

function fn(a) {
  console.log(this, a);
}

const fn1 = fn.myBind({ name: 'xinconan' });
fn1(1);
fn.myCall({ name: 'call' }, 2);
fn.myApply({ name: 'apply' }, [3]);
