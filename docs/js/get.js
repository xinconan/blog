function get(source, path, defaultValue = undefined) {
  // a[0].b -> a.0.b, a['b'].c -> a.b.c
  const paths = path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/\[\'(\w+)\'\]/g, '.$1')
    .replace(/\[\"(\w+)\"\]/g, '.$1')
    .split('.');

  let res = source;
  for (let k of paths) {
    res = res?.[k];
  }
  return res === undefined ? defaultValue : res;
}

const obj = { a: { b: 'x' } };
const arr = { a: [[[2, 3], 4]] };
console.log(get(obj, 'a.b'));
console.log(get(obj, 'a["b"]'));
console.log(get(arr, 'a[0][1]'));
