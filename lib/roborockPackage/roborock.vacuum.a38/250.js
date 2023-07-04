var n,
  module4 = require('./4'),
  o = (function () {
    function o() {
      module4(this, o);
    }

    module5(o, null, [
      {
        key: 'step0',
        value: function (n) {
          return n > 0 ? 1 : 0;
        },
      },
      {
        key: 'step1',
        value: function (n) {
          return n >= 1 ? 1 : 0;
        },
      },
      {
        key: 'linear',
        value: function (n) {
          return n;
        },
      },
      {
        key: 'ease',
        value: function (u) {
          if (!n) n = o.bezier(0.42, 0, 1, 1);
          return n(u);
        },
      },
      {
        key: 'quad',
        value: function (n) {
          return n * n;
        },
      },
      {
        key: 'cubic',
        value: function (n) {
          return n * n * n;
        },
      },
      {
        key: 'poly',
        value: function (n) {
          return function (u) {
            return u ** n;
          };
        },
      },
      {
        key: 'sin',
        value: function (n) {
          return 1 - Math.cos((n * Math.PI) / 2);
        },
      },
      {
        key: 'circle',
        value: function (n) {
          return 1 - Math.sqrt(1 - n * n);
        },
      },
      {
        key: 'exp',
        value: function (n) {
          return 2 ** (10 * (n - 1));
        },
      },
      {
        key: 'elastic',
        value: function () {
          var n = (arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 1) * Math.PI;
          return function (u) {
            return 1 - Math.cos((u * Math.PI) / 2) ** 3 * Math.cos(u * n);
          };
        },
      },
      {
        key: 'back',
        value: function () {
          var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 1.70158;
          return function (u) {
            return u * u * ((n + 1) * u - n);
          };
        },
      },
      {
        key: 'bounce',
        value: function (n) {
          if (n < 0.36363636363636365) return 7.5625 * n * n;

          if (n < 0.7272727272727273) {
            var u = n - 0.5454545454545454;
            return 7.5625 * u * u + 0.75;
          }

          if (n < 0.9090909090909091) {
            var t = n - 0.8181818181818182;
            return 7.5625 * t * t + 0.9375;
          }

          var o = n - 0.9545454545454546;
          return 7.5625 * o * o + 0.984375;
        },
      },
      {
        key: 'bezier',
        value: function (n, u, t, module251) {
          return require('./251')(n, u, t, module251);
        },
      },
      {
        key: 'in',
        value: function (n) {
          return n;
        },
      },
      {
        key: 'out',
        value: function (n) {
          return function (u) {
            return 1 - n(1 - u);
          };
        },
      },
      {
        key: 'inOut',
        value: function (n) {
          return function (u) {
            return u < 0.5 ? n(2 * u) / 2 : 1 - n(2 * (1 - u)) / 2;
          };
        },
      },
    ]);
    return o;
  })();

module.exports = o;
