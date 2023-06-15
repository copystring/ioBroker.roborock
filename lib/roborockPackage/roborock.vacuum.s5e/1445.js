var module1446 = require('./1446'),
  module1448 = require('./1448'),
  module1452 = require('./1452'),
  c = Object.defineProperty;

exports.f = require('./1449')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1446(f), (u = module1452(u, true)), module1446(p), module1448))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
