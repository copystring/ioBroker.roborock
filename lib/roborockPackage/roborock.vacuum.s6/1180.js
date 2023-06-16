var module1135 = require('./1135'),
  module1136 = require('./1136'),
  module1146 = require('./1146');

module.exports = require('./1139')
  ? Object.defineProperties
  : function (o, c) {
      module1136(o);

      for (var u, p = module1146(c), s = p.length, v = 0; s > v; ) module1135.f(o, (u = p[v++]), c[u]);

      return o;
    };
