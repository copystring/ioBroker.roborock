var module1527 = require('./1527'),
  module1528 = require('./1528'),
  module1538 = require('./1538');

module.exports = require('./1531')
  ? Object.defineProperties
  : function (o, c) {
      module1528(o);

      for (var u, p = module1538(c), s = p.length, v = 0; s > v; ) module1527.f(o, (u = p[v++]), c[u]);

      return o;
    };
