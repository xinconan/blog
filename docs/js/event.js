class Event {
  constructor() {
    this.events = {};
  }

  emit(type, ...args) {
    const listeners = this.events[type] || [];
    for (const listener of listeners) {
      listener(...args);
    }
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  once(type, listener) {
    this.events[type] = this.events[type] || [];
    const fn = (...args) => {
      this.off(type, fn);
      listener(...args);
    };
    this.on(type, fn);
  }

  off(type, listener) {
    this.events[type] = this.events[type] || [];
    if (listener) {
      this.events[type] = this.events[type].filter((fn) => fn !== listener);
    } else {
      this.events[type] = [];
    }
  }
}

const e = new Event();
const fn = (id) => {
  console.log('click', id);
};
const fnOnce = () => {
  console.log('once');
};
e.on('click', fn);
e.once('once', fnOnce);

e.emit('click', 1);
e.emit('click', 2);
e.emit('once');
e.emit('once');
