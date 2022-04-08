// 防抖, n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(fn, wait) {
  let timer;
  return function () {
    const that = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, wait);
  };
}

// 节流，在n秒内只会执行一次
function throttle(fn, wait) {
  let time = 0;
  return function () {
    const that = this;
    const now = Date.now();
    const args = arguments;
    if (now - time > wait) {
      fn.apply(that, args);
      time = now;
    }
  };
}

// throttle setTimeout 实现
function throttle2(fn, wait) {
  let timer = null;
  return function () {
    const that = this;
    if (timer) {
      return;
    }
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(that, args);
      timer = null;
    }, wait);
  };
}
