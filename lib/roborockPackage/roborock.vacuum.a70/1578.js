var module1544 = require('./1544')('meta'),
  module1522 = require('./1522'),
  module1529 = require('./1529'),
  module1520 = require('./1520').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1525 = !require('./1525')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1520(t, module1544, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1544,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1522(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1529(u, module1544)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1544].i;
    },
    getWeak: function (t, u) {
      if (!module1529(t, module1544)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1544].w;
    },
    onFreeze: function (t) {
      if (module1525 && b.NEED && c(t) && !module1529(t, module1544)) E(t);
      return t;
    },
  });
