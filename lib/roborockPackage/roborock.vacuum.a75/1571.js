var module1526 = require('./1526'),
  module1527 = require('./1527'),
  module1537 = require('./1537');

module.exports = require('./1530')
  ? Object.defineProperties
  : function (o, c) {
      module1527(o);

      for (var u, p = module1537(c), s = p.length, v = 0; s > v; ) module1526.f(o, (u = p[v++]), c[u]);

      return o;
    };
