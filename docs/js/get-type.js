const _toString = Object.prototype.toString;
function getType(s) {
  return _toString.call(s).slice(8, -1).toLowerCase();
}

console.log(getType(''));
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(12));
console.log(getType(NaN));
console.log(getType(Infinity));
console.log(getType(true));
console.log(getType(Symbol(1)));
console.log(getType([]));
console.log(getType({}));
console.log(getType(() => {}));
console.log(getType(new Date()));
