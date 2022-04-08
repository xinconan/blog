// map 是用来避免循环引用的
function cloneDeep(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  const mapObj = map.get(obj);
  if (mapObj) {
    return mapObj;
  }
  let res = {};
  map.set(obj, res);
  if (obj instanceof Map) {
    res = new Map();
    obj.forEach((v, k) => {
      const k1 = cloneDeep(k, map);
      const v1 = cloneDeep(v, map);
      res.set(k1, v1);
    });
  } else if (obj instanceof Set) {
    res = new Set();
    obj.forEach((v) => {
      const v1 = cloneDeep(v, map);
      res.set(v1);
    });
  } else if (obj instanceof Array) {
    res = [];
    obj.forEach((v) => {
      res.push(cloneDeep(v));
    });
  } else {
    // object
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        res[k] = cloneDeep(obj[k]);
      }
    }
  }

  return res;
}

const obj = {
  name: 'xx',
  like: ['ap', 'ba'],
  ob: { age: 18, n: 'd', ob: { name: 'deep' } },
};
const obj2 = cloneDeep(obj);
console.log(obj2);
