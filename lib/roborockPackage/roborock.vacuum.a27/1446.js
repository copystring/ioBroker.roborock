var module1447 = require('./1447'),
  module1455 = require('./1455');

module.exports = require('./1451')
  ? function (u, f, o) {
      return module1447.f(u, f, module1455(1, o));
    }
  : function (n, t, u) {
      n[t] = u;
      return n;
    };
