var module1254 = require('./1254')('meta'),
  module1232 = require('./1232'),
  module1239 = require('./1239'),
  module1230 = require('./1230').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1235 = !require('./1235')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1230(t, module1254, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1254,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1232(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1239(u, module1254)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1254].i;
    },
    getWeak: function (t, u) {
      if (!module1239(t, module1254)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1254].w;
    },
    onFreeze: function (t) {
      if (module1235 && b.NEED && c(t) && !module1239(t, module1254)) E(t);
      return t;
    },
  });
