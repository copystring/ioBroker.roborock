var module1133 = require('./1133'),
  module1134 = require('./1134'),
  module1144 = require('./1144');

module.exports = require('./1137')
  ? Object.defineProperties
  : function (o, c) {
      module1134(o);

      for (var u, p = module1144(c), s = p.length, v = 0; s > v; ) module1133.f(o, (u = p[v++]), c[u]);

      return o;
    };
