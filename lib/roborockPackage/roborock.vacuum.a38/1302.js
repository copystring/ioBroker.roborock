var module1232 = require('./1232'),
  module1231 = require('./1231'),
  n = function (n, c) {
    if ((module1231(n), !module1232(c) && null !== c)) throw TypeError(c + ": can't set as prototype!");
  };

module.exports = {
  set:
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function (t, o, c) {
          try {
            (c = require('./1227')(Function.call, require('./1294').f(Object.prototype, '__proto__').set, 2))(t, []);

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
