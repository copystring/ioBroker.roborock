var module1469 = require('./1469')('meta'),
  module1447 = require('./1447'),
  module1454 = require('./1454'),
  module1445 = require('./1445').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1450 = !require('./1450')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1445(t, module1469, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1469,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1447(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1454(u, module1469)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1469].i;
    },
    getWeak: function (t, u) {
      if (!module1454(t, module1469)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1469].w;
    },
    onFreeze: function (t) {
      if (module1450 && b.NEED && c(t) && !module1454(t, module1469)) E(t);
      return t;
    },
  });
