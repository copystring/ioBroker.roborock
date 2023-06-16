var module1529 = require('./1529'),
  module1528 = require('./1528'),
  n = function (n, c) {
    if ((module1528(n), !module1529(c) && null !== c)) throw TypeError(c + ": can't set as prototype!");
  };

module.exports = {
  set:
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function (t, o, c) {
          try {
            (c = require('./1524')(Function.call, require('./1591').f(Object.prototype, '__proto__').set, 2))(t, []);

            o = !(t instanceof Array);
          } catch (t) {
            o = true;
          }

          return function (t, _) {
            n(t, _);
            if (o) t.__proto__ = _;
            else c(t, _);
            return t;
          };
        })({}, false)
      : undefined),
  check: n,
};
