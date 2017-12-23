'use strict';

/**
 * Implementation of multifunctional wrapper.
 * Returns: object of { [fn.name]: returnValue }
 */
const multiwrap = (...funcs) => {
  const wrapped = funcs.reduce((acc, fn) => {
    acc[fn.name] = fn;
    return acc;
  }, {});
  // obj: object of { [fn.name]: [ args ] }
  return obj => Object.keys(obj).reduce((acc, fnName) => {
    if (wrapped[fnName])
      acc[fnName] = wrapped[fnName](...obj[fnName]);
    return acc;
  }, {});
};

// Usage

const square = x => x * x;
const cube = x => x * x * x;
const wrapper = multiwrap(square, cube);

console.dir(wrapper({ square: [ 2 ], cube: [ 3 ] }));
console.dir(wrapper({ square: [ 4 ], cube: [ 5 ] }));
