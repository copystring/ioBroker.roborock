p(
  [
    '\n             When attempting to resolve the native component ',
    ',\n             componentOverrides.',
    ' is expected to be a function, but found\n             ',
    ' instead.\n          ',
  ],
  [
    '\n             When attempting to resolve the native component ',
    ',\n             componentOverrides.',
    ' is expected to be a function, but found\n             ',
    ' instead.\n          ',
  ]
);
p(
  [
    '\n            When attempting to resolve the native component ',
    ',\n            componentOverrides.',
    ' is expected to be a function that returns a React\n            component. Instead, ',
    ' was found.\n          ',
  ],
  [
    '\n            When attempting to resolve the native component ',
    ',\n            componentOverrides.',
    ' is expected to be a function that returns a React\n            component. Instead, ',
    ' was found.\n          ',
  ]
);

var n =
    Object.assign ||
    function (n) {
      for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];

        for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (n[u] = o[u]);
      }

      return n;
    },
  t = p(['\n      SafeModule.create(...) was invoked without any options parameter.\n    '], ['\n      SafeModule.create(...) was invoked without any options parameter.\n    ']),
  module12 = require('./12'),
  module1029 = require('./1029'),
  module1028 = require('./1028');

function p(n, t) {
  return Object.freeze(
    Object.defineProperties(n, {
      raw: {
        value: Object.freeze(t),
      },
    })
  );
}

var s = module12.UIManager,
  v = function (n, t) {
    for (var o = undefined, u = 0; u < n.length; u++) if ((o = t(n[u]))) return o;

    return null;
  },
  l = function n(t) {
    return t ? (Array.isArray(t) ? v(t, n) : t in s ? t : null) : null;
  },
  h = function n(t) {
    return Array.isArray(t) ? n(t[0]) : t;
  },
  w = function (n) {
    return n.VERSION;
  };

module.exports = function (f) {
  if (!f) throw new Error(module1029.default(t));
  var p = f.viewName,
    s = f.propOverrides,
    v = f.componentOverrides,
    b = f.mockComponent,
    y = f.mock,
    O = f.getVersion;
  if ((O || (O = w), !p)) throw new Error('\n      SafeModule.component(...) requires a viewName property to be specified.\n    ');
  if (!b) throw new Error('\n      SafeModule.component(...) requires a mockComponent property to be specified.\n    ');
  h(p);
  var M = l(p),
    N = module12.UIManager[M];
  if (!M || !N) return b;
  var I = n({}, f, {
      mock: y || {},
      moduleName: M + 'Manager',
    }),
    C = module1028.default(I),
    k = O(N.Constants || {});

  if (s) {
    var P = s[k],
      j = {};
    if (P) j = 'function' == typeof P ? P(N.NativeProps, N, C) : n({}, P);
    n(N.NativeProps, j);
  }

  var x = module12.requireNativeComponent(M),
    A = x;

  if (
    ((A.runCommand = function (n, t) {
      for (var u = arguments.length, c = Array(u > 2 ? u - 2 : 0), f = 2; f < u; f++) c[f - 2] = arguments[f];

      return module12.Platform.select({
        android: function () {
          return module12.UIManager.dispatchViewManagerCommand(module12.findNodeHandle(n), module12.UIManager[M].Commands[t], c);
        },
        ios: function () {
          return C[t](module12.findNodeHandle(n), ...c);
        },
        default: function () {},
      })();
    }),
    (A.updateView = function (n, t) {
      var u = function () {
        return module12.UIManager.updateView(module12.findNodeHandle(n), M, t);
      };

      module12.Platform.select({
        ios: u,
        android: u,
        default: function () {},
      })();
    }),
    v)
  ) {
    var S = v[k];
    if (S) A = S(x, C);
  }

  return A;
};
