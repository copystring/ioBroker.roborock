var module1134 = require('./1134'),
  module1136 = require('./1136'),
  module1140 = require('./1140'),
  c = Object.defineProperty;

exports.f = require('./1137')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1134(f), (u = module1140(u, true)), module1134(p), module1136))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
