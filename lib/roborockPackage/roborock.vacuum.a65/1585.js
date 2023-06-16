var module1551 = require('./1551')('meta'),
  module1529 = require('./1529'),
  module1536 = require('./1536'),
  module1527 = require('./1527').f,
  o = 0,
  c =
    Object.isExtensible ||
    function () {
      return true;
    },
  module1532 = !require('./1532')(function () {
    return c(Object.preventExtensions({}));
  }),
  E = function (t) {
    module1527(t, module1551, {
      value: {
        i: 'O' + ++o,
        w: {},
      },
    });
  },
  b = (module.exports = {
    KEY: module1551,
    NEED: false,
    fastKey: function (u, o) {
      if (!module1529(u)) return 'symbol' == typeof u ? u : ('string' == typeof u ? 'S' : 'P') + u;

      if (!module1536(u, module1551)) {
        if (!c(u)) return 'F';
        if (!o) return 'E';
        E(u);
      }

      return u[module1551].i;
    },
    getWeak: function (t, u) {
      if (!module1536(t, module1551)) {
        if (!c(t)) return true;
        if (!u) return false;
        E(t);
      }

      return t[module1551].w;
    },
    onFreeze: function (t) {
      if (module1532 && b.NEED && c(t) && !module1536(t, module1551)) E(t);
      return t;
    },
  });
