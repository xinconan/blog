// 目标
// 实现一个 query 方法，实现对数据的链式查询和处理
//
// 要求
// query 传入参数为原始数据（数组格式，每个元素都是对象）
// 通过进行链式调用对数据执行操作，支持的方法有
// where(predicate): 根据参数的条件进行筛选，参数与 [].filter 的参数类似
// orderBy(key, desc): 根据 key 的值进行排列，默认升序排列，当第二个参数为 true 时降序排列
// groupBy(key): 根据 key 的值对数据元素进行分组，合并为二维数组
// execute(): 执行所有处理并返回最终结果
// 执行 execute 方法时才真正执行操作并返回结果
// 请结合下面示例理解需求
// 示例
const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' },
];
//

//     .where(item => item.age > 18)
//     .orderBy('age')
//     .groupBy('city')

//
// // 结果返回
// [
//     [
//         { name: 'baz', age: 19, city: 'hangzhou' },
//         { name: 'bar', age: 24, city: 'hangzhou' },
//     ],
//     [
//         { name: 'fiz', age: 22, city: 'shanghai' },
//     ]
// ]

class Find {
  constructor(data) {
    this.data = data;
    this.tasks = [];
  }

  where(fn) {
    const task = () => {
      this.data = this.data.filter(fn);
    };
    this.tasks.push(task);
    return this;
  }

  orderBy(key, desc = false) {
    const task = () => {
      let fn = (a, b) => a[key] - b[key];
      if (desc) {
        fn = (a, b) => b[key] - a[key];
      }
      this.data.sort(fn);
    };
    this.tasks.push(task);
    return this;
  }

  execute() {
    this.tasks.forEach((fn) => fn());
    return this.data;
  }

  groupBy(key) {
    const task = () => {
      const keyMap = {};
      this.data.forEach((val) => {
        const kv = val[key];
        if (keyMap[kv] == null) {
          keyMap[kv] = [];
        }
        keyMap[kv].push(val);
      });
      const arr = [];
      for (const k in keyMap) {
        if (keyMap.hasOwnProperty(k)) {
          arr.push(keyMap[k]);
        }
      }
      this.data = arr;
    };
    this.tasks.push(task);
    return this;
  }
}

function query(data) {
  return new Find(data);
}

console.log(
  query(data)
    .where((item) => item.age > 18)
    .orderBy('age')
    .groupBy('city')
    .execute()
);
