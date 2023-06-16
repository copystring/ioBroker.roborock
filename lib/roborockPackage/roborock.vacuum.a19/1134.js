var module1135 = require('./1135'),
  module1143 = require('./1143');

module.exports = require('./1139')
  ? function (u, f, o) {
      return module1135.f(u, f, module1143(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
