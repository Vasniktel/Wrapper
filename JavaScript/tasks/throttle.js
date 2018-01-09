'use strict';

// Function throttling, executed once per interval

// Implemented with queue for waiting arguments to call with

const throttle = (timeout, fn, ...args) => {
  let timer;
  let wrapped = null;
  const queue = [];

  const throttled = () => {
    timer = undefined;
    if (queue.length) wrapped(...queue.shift());
  };

  wrapped = (...par) => {
    if (!timer) {
      timer = setTimeout(throttled, timeout);
      return fn(...args.concat(par));
    } else {
      queue.push(par);
    }
  };

  return wrapped;
};

// Usage

const fn = (...args) => {
  console.log('Function called, args: ' + args);
};

let counter = 0;
const ft = throttle(200, fn, 'value1');

const timer = setInterval(() => {
  fn('value2');
  ft('value' + counter++);
}, 50);

setTimeout(() => {
  clearInterval(timer);
}, 1000);
