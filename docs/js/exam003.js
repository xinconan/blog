// 题目一: 为Function扩展一个方法bindX，可以实现如下功能

function add(num1, num2) {
  return this.value + num1 + num2;
}
Function.prototype.bindX = function (context, ...args) {
  const that = this;
  return function (...newArgs) {
    return that.apply(context, newArgs.concat(args));
  };
};

var data = {
  value: 1,
};
var addEx = add.bindX(data, 2);
console.log(addEx(3)); // 6

// 题目二：请实现find函数，使下列的代码调用正确。

var data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' },
];

var find = function (origin) {
  function fn(data) {
    this.data = data;
    this.tasks = [];

    this.where = function (k, reg) {
      const task = () => {
        this.data = this.data.filter((val) => reg.test(val[k]));
      };
      this.tasks.push(task);
      return this;
    };
    this.orderBy = function (key, order) {
      const task = () => {
        let sortFn = (a, b) => a[key] - b[key];
        if (order === 'desc') {
          sortFn = (a, b) => b[key] - a[key];
        }
        this.data.sort(sortFn);
      };
      this.tasks.push(task);
      this.tasks.forEach((fn) => fn());
      return this.data;
    };
  }
  return new fn(origin);
};

//查找data中，符合条件的数据，并进行排序
var result = find(data).where('title', /\d$/).orderBy('userId', 'desc');

console.log(result); // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
// find({}).next();

// 题目三：完成 convert(list) 函数，实现将 list 转为 tree

/**
 * @param list {object[]},
 * @param parentKey {string}
 * @param currentKey {string}
 * @param rootValue {any}
 * @return object
 */
function convert(list, parentKey, currentKey, rootValue) {
  const result = {};
  result[currentKey] = rootValue;

  function getChild(root) {
    const child = list.filter((v) => v[parentKey] === root[currentKey]);
    if (child.length) {
      root.children = child.map((c) => {
        getChild(c);
        return c;
      });
    }
  }
  getChild(result);
  return result;
}

const list = [
  {
    id: 19,
    parentId: 0,
  },
  {
    id: 18,
    parentId: 16,
  },
  {
    id: 17,
    parentId: 16,
  },
  {
    id: 16,
    parentId: 0,
  },
];

const result2 = convert(list, 'parentId', 'id', 0);
console.log(JSON.stringify(result2))
// result
// {
// "id": 0,
// "children": [
// {
// "id": 19,
// "parentId": 0
// },
// {
// "id": 16,
// "parentId": 0,
// "children": [
//   {
//     "id": 18,
//     "parentId": 16
//   },
//   {
//     "id": 17,
//     "parentId": 16
//   }
// ]
// }
// ]
// }
