var module1448 = require('./1448'),
  module1450 = require('./1450'),
  module1454 = require('./1454'),
  c = Object.defineProperty;

exports.f = require('./1451')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1448(f), (u = module1454(u, true)), module1448(p), module1450))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
