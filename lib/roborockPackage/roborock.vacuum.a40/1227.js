var module1228 = require('./1228');

module.exports = function (t, u, c) {
  if ((module1228(t), undefined === u)) return t;

  switch (c) {
    case 1:
      return function (n) {
        return t.call(u, n);
      };

    case 2:
      return function (n, c) {
        return t.call(u, n, c);
      };

    case 3:
      return function (n, c, o) {
        return t.call(u, n, c, o);
      };
  }

  return function () {
    return t.apply(u, arguments);
  };
};
