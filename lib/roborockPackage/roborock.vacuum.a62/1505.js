var module1471 = require('./1471')('meta'),
  module1449 = require('./1449'),
  module1456 = require('./1456'),
  module1447 = require('./1447').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1452 = !require('./1452')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1447(t, module1471, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1471,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1449(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1456(u, module1471)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1471].i;
    },
    getWeak: function (t, u) {
      if (!module1456(t, module1471)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1471].w;
    },
    onFreeze: function (t) {
      if (module1452 && b.NEED && c(t) && !module1456(t, module1471)) E(t);
      return t;
    },
  });
