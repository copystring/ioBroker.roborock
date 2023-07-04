var module1159 = require('./1159')('meta'),
  module1137 = require('./1137'),
  module1144 = require('./1144'),
  module1135 = require('./1135').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1140 = !require('./1140')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1135(t, module1159, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1159,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1137(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1144(u, module1159)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1159].i;
    },
    getWeak: function (t, u) {
      if (!module1144(t, module1159)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1159].w;
    },
    onFreeze: function (t) {
      if (module1140 && b.NEED && c(t) && !module1144(t, module1159)) E(t);
      return t;
    },
  });
