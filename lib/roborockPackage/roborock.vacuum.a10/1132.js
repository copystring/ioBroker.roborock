var module1133 = require('./1133'),
  module1141 = require('./1141');

module.exports = require('./1137')
  ? function (u, f, o) {
      return module1133.f(u, f, module1141(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
