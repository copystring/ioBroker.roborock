var module1528 = require('./1528'),
  module1530 = require('./1530'),
  module1534 = require('./1534'),
  c = Object.defineProperty;

exports.f = require('./1531')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1528(f), (u = module1534(u, true)), module1528(p), module1530))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
