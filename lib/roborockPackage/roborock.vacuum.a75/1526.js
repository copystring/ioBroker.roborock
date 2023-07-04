var module1527 = require('./1527'),
  module1529 = require('./1529'),
  module1533 = require('./1533'),
  c = Object.defineProperty;

exports.f = require('./1530')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1527(f), (u = module1533(u, true)), module1527(p), module1529))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
