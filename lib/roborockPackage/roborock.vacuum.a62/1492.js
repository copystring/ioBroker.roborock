var module1447 = require('./1447'),
  module1448 = require('./1448'),
  module1458 = require('./1458');

module.exports = require('./1451')
  ? Object.defineProperties
  : function (o, c) {
      module1448(o);

      for (var u, p = module1458(c), s = p.length, v = 0; s > v; ) module1447.f(o, (u = p[v++]), c[u]);

      return o;
    };
