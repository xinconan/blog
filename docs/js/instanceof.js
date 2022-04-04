function myInstanceOf(instance, origin) {
  // null 与 undefined 返回false
  if (instance == null) return false;
  // 值类型返回false
  const type = typeof instance;
  if (type !== 'object' && type !== 'function') {
    return false;
  }

  let temp = instance;
  while (temp) {
    // 向上查找，匹配到就返回true
    if (temp.__proto__ === origin.prototype) {
      return true;
    }
    temp = temp.__proto__;
  }
  // 没找到，返回false
  return false;
}

console.log(myInstanceOf([], Array) === true);
console.log(myInstanceOf({}, Object) === true);
console.log(myInstanceOf([], Object) === true);
console.log(myInstanceOf('s', String) === false);
