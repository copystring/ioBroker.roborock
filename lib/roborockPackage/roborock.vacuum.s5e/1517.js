var module1447 = require('./1447'),
  module1446 = require('./1446'),
  n = function (n, c) {
    if ((module1446(n), !module1447(c) && null !== c)) throw TypeError(c + ": can't set as prototype!");
  };

module.exports = {
  set:
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function (t, o, c) {
          try {
            (c = require('./1442')(Function.call, require('./1509').f(Object.prototype, '__proto__').set, 2))(t, []);

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
