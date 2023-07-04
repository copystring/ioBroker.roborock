var module1550 = require('./1550')('meta'),
  module1528 = require('./1528'),
  module1535 = require('./1535'),
  module1526 = require('./1526').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1531 = !require('./1531')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1526(t, module1550, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1550,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1528(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1535(u, module1550)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1550].i;
    },
    getWeak: function (t, u) {
      if (!module1535(t, module1550)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1550].w;
    },
    onFreeze: function (t) {
      if (module1531 && b.NEED && c(t) && !module1535(t, module1550)) E(t);
      return t;
    },
  });
