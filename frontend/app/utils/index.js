// helpers

const defined = obj => typeof obj !== 'undefined';
const definedNotNull = obj => defined(obj) && obj != null;
const isFn = fn => typeof fn === 'function';
const isArray = a => Array.isArray(a);
const isObj = obj => typeof obj === 'object';
const isStr = obj => typeof obj === 'string';

let debugState = true;
const debug = (...msg) => debugState 
    ? console.warn(...msg)
    : undefined; 

// ranges

const range = (...args) => {
    let [start, end] = args.length == 2
        ? args
        : [0, args[0]];

    return Array.from({length: (end - start)},
        (v, k) => k + start
    );
}

// array manipulation

const reverse = ([x, ...xs]) => typeof x !== 'undefined'
    ? [...reverse(xs), x]
    : [];

const flatten = ([x, ...xs]) => typeof x !== 'undefined'
    ? Array.isArray(x)
        ? [...flatten(x), ...flatten(xs)]
        : [x, ...flatten(xs)]
    : [];

const zip = (arr, ...arrs) =>
    arr.map((val, i) =>
        arrs.reduce((a, arr) =>
            [...a, arr[i]], [val]
        )
    );

// random no stuff

const random = (max = 1, min) => {
    if(defined(min)) { 
        [min, max] = [max, min];
    } else { 
        min = 0;
    }

    return Math.random() * (max - min) + min;
}

const pluckRandom = (arr) =>
    arr[parseInt(random(arr.length))];

export {
    defined,
    definedNotNull,
    isFn,
    isArray,
    isObj,
    isStr,
    debug, 
    range,
    reverse,
    zip,
    flatten,
    random,
    pluckRandom
};
