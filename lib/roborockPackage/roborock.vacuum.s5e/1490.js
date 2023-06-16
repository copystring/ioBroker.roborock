var module1445 = require('./1445'),
  module1446 = require('./1446'),
  module1456 = require('./1456');

module.exports = require('./1449')
  ? Object.defineProperties
  : function (o, c) {
      module1446(o);

      for (var u, p = module1456(c), s = p.length, v = 0; s > v; ) module1445.f(o, (u = p[v++]), c[u]);

      return o;
    };
