var module1520 = require('./1520'),
  module1528 = require('./1528');

module.exports = require('./1524')
  ? function (u, f, o) {
      return module1520.f(u, f, module1528(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
