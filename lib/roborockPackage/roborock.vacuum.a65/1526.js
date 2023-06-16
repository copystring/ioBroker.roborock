var module1527 = require('./1527'),
  module1535 = require('./1535');

module.exports = require('./1531')
  ? function (u, f, o) {
      return module1527.f(u, f, module1535(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
