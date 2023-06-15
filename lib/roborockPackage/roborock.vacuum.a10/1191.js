var module1157 = require('./1157')('meta'),
  module1135 = require('./1135'),
  module1142 = require('./1142'),
  module1133 = require('./1133').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1138 = !require('./1138')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1133(t, module1157, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1157,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1135(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1142(u, module1157)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1157].i;
    },
    getWeak: function (t, u) {
      if (!module1142(t, module1157)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1157].w;
    },
    onFreeze: function (t) {
      if (module1138 && b.NEED && c(t) && !module1142(t, module1157)) E(t);
      return t;
    },
  });
