var module1526 = require('./1526'),
  module1534 = require('./1534');

module.exports = require('./1530')
  ? function (u, f, o) {
      return module1526.f(u, f, module1534(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
