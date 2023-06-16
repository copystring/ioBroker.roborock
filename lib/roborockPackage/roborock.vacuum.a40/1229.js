var module1230 = require('./1230'),
  module1238 = require('./1238');

module.exports = require('./1234')
  ? function (u, f, o) {
      return module1230.f(u, f, module1238(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
