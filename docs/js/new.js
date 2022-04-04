// new 一个对象的过程
function customNew(constructor, ...args) {
  // 先创建一个空对象，继承constructor原型
  const obj = Object.create(constructor.prototype);
  // 将obj作为 this，执行constructor，传入参数
  constructor.apply(obj, args);
  // 返回
  return obj;
}
