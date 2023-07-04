var module1135 = require('./1135'),
  module1134 = require('./1134'),
  n = function (n, c) {
    if ((module1134(n), !module1135(c) && null !== c)) throw TypeError(c + ": can't set as prototype!");
  };

module.exports = {
  set:
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function (t, o, c) {
          try {
            (c = require('./1130')(Function.call, require('./1197').f(Object.prototype, '__proto__').set, 2))(t, []);

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
