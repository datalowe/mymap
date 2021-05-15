const aq = (() => {
    // borrowed from https://mostly-adequate.gitbook.io/
    const compose = (...fns) => (...args) => {
        return fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
    };

    function curry(fn) {
        const arity = fn.length;

        return function $curry(...args) {
            if (args.length < arity) {
                return $curry.bind(null, ...args);
            }

            return fn.call(null, ...args);
        };
    }

    const map = curry((fn, xs) => xs.map(fn));

    const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));

    const replace = curry((pattern, repl, str) => str.replace(pattern, repl));

    const trace = curry((tag, x) => {
        console.log(tag, x);
        return x;
    });

    const toUpperCase = x => x.toUpperCase();

    return {
        compose: compose,
        curry: curry,
        map: map,
        reduce: reduce,
        replace: replace,
        trace: trace,
        toUpperCase: toUpperCase
    };
})();

export { aq };
