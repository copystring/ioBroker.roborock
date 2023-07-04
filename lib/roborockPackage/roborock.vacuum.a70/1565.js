var module1520 = require('./1520'),
  module1521 = require('./1521'),
  module1531 = require('./1531');

module.exports = require('./1524')
  ? Object.defineProperties
  : function (o, c) {
      module1521(o);

      for (var u, p = module1531(c), s = p.length, v = 0; s > v; ) module1520.f(o, (u = p[v++]), c[u]);

      return o;
    };
