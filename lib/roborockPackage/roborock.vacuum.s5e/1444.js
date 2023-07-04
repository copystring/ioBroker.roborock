var module1445 = require('./1445'),
  module1453 = require('./1453');

module.exports = require('./1449')
  ? function (u, f, o) {
      return module1445.f(u, f, module1453(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
