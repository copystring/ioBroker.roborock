var module1231 = require('./1231'),
  module1233 = require('./1233'),
  module1237 = require('./1237'),
  c = Object.defineProperty;

exports.f = require('./1234')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1231(f), (u = module1237(u, true)), module1231(p), module1233))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
