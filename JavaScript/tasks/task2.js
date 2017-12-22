'use strict';

/**
 * Task 2:
 * implement wrapper using prototypes and/or classes
 */

class Wrapper {
  constructor(fn) {
    console.log('Wrap function: ' + fn.name);
    this.fn = fn;
  }
  call(...args) {
    console.log('Called wrapper for: ' + this.fn.name);
    const result = this.fn(...args);
    console.dir({ result });
    return result;
  }
}

// Usage

const square = x => x * x;
const wrapped = new Wrapper(square);
wrapped.call(5);
wrapped.call(6);
wrapped.call(7);
