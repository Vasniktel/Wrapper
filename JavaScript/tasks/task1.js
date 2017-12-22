'use strict';

/**
 * Task 1:
 * rewrite wrapper function to have custom callbacks: `beforeCall,
 * afterCall, beforeCallback, afterCallback` passed as parameters.
 */

const wrapper = (
  beforeCall,
  afterCall,
  beforeCb,
  afterCb,
  fn
) => {
  console.log('Wrap function: ' + fn.name);
  return (...args) => {
    console.log('Called wrapper for: ' + fn.name);
    console.dir({ args });
    if (args.length > 0) {
      let callback = args[args.length - 1];
      if (typeof(callback) === 'function') {
        args[args.length - 1] = (...args) => {
          console.log('Callback: ' + fn.name);
          afterCb(callback(...beforeCb(...args)));
        };
      } else {
        callback = null;
      }
    }
    console.log('Call: ' + fn.name);
    console.dir(args);
    const result = afterCall(fn(...beforeCall(...args)));
    console.log('Ended wrapper for: ' + fn.name);
    console.dir({ result });
    return result;
  };
};

// Usage

const before = (on, ...args) => {
  console.log('before' + on + ': ', args);
  return args;
};

const after = (on, arg) => {
  console.log('after' + on + ': ', arg);
  return arg;
};

const beforeCall = before.bind(null, 'Call');
const afterCall = after.bind(null, 'Call');
const beforeCb = before.bind(null, 'Cb');
const afterCb = after.bind(null, 'Cb');
const cb = arg => (console.log(arg), arg);

const squareCb = (x, cb) => cb(x * x);
const square = x => x * x;

const wrappedCb = wrapper(beforeCall, afterCall, beforeCb, afterCb, squareCb);
const wrapped = wrapper(beforeCall, afterCall, beforeCb, afterCb, square);

console.log('==== With CallBack ====');

wrappedCb(5, cb);
wrappedCb(6, cb);
wrappedCb(7, cb);

console.log('==== Without CallBack ====');

wrapped(5);
wrapped(6);
wrapped(7);
