class MyPromise {
  static resolve(value) {
    if (value && value.then) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  constructor(fn) {
    this.value = undefined;
    this.reson = undefined;
    this.status = 'PENDING';

    this.resolveFns = [];
    this.rejectFns = [];

    const resolve = (value) => {
      // 注意setTimeout
      setTimeout(() => {
        this.status = 'RESOLVED';
        this.value = value;
        this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) => {
          return res(fn(value));
        });
      });
    };

    const reject = (value) => {
      setTimeout(() => {
        this.status = 'REJECTED';
        this.reson = value;
        this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) => {
          return rej(fn(value));
        });
      });
    };

    fn(resolve, reject);
  }

  then(fn) {
    if (this.status === 'RESOLVED') {
      const result = fn(this.value);
      return MyPromise.resolve(result);
    }
    if (this.status === 'PENDING') {
      return new MyPromise((resolve, reject) => {
        this.resolveFns.push({ fn, resolve, reject });
      });
    }
  }

  catch(fn) {
    if (this.status === 'REJECTED') {
      const result = fn(this.value);
      return MyPromise.resolve(result);
    }
    if (this.status === 'PENDING') {
      return new MyPromise((resolve, reject) => {
        this.rejectFns.push({ fn, resolve, reject });
      });
    }
  }
}

MyPromise.resolve(10)
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
    return v * 2;
  });

new MyPromise((resolve) => {
  resolve(100);
})
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => console.log(v));
