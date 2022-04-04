class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    // 等任务注册完后执行
    setTimeout(() => {
      this.next();
    });
  }

  next() {
    const task = this.tasks.shift();
    if (task) {
      task();
    }
  }

  eat(s) {
    const task = () => {
      console.log(`${this.name} eat ${s}`);
      this.next(); // 立刻执行下一个任务
    };
    this.tasks.push(task);
    return this;
  }

  sleep(time) {
    const task = () => {
      console.log(`sleep ${time} s`);
      setTimeout(() => {
        console.log(`sleep done`);
        this.next();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }
}

const p = new LazyMan('xx');
p.eat('苹果').eat('香蕉').sleep(3).eat('橘子').sleep(2).eat('xiang');
