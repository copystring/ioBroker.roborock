var module1521 = require('./1521'),
  module1523 = require('./1523'),
  module1527 = require('./1527'),
  c = Object.defineProperty;

exports.f = require('./1524')
  ? Object.defineProperty
  : function (f, u, p) {
      if ((module1521(f), (u = module1527(u, true)), module1521(p), module1523))
        try {
          return c(f, u, p);
        } catch (t) {}
      if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
      if ('value' in p) f[u] = p.value;
      return f;
    };
