var module1230 = require('./1230'),
  module1231 = require('./1231'),
  module1241 = require('./1241');

module.exports = require('./1234')
  ? Object.defineProperties
  : function (o, c) {
      module1231(o);

      for (var u, p = module1241(c), s = p.length, v = 0; s > v; ) module1230.f(o, (u = p[v++]), c[u]);

      return o;
    };
