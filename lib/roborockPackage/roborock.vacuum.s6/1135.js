var module1136 = require('./1136'),
  module1138 = require('./1138'),
  module1142 = require('./1142'),
  c = Object.defineProperty;

exports.f = require('./1139')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1136(f), (u = module1142(u, true)), module1136(p), module1138))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
