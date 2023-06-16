l(
  ['\n          ReactNative.NativeModules.', '.', ' did not have a corresponding prop defined\n          in the mock provided to SafeModule.\n        '],
  ['\n          ReactNative.NativeModules.', '.', ' did not have a corresponding prop defined\n          in the mock provided to SafeModule.\n        ']
);

var t =
    Object.assign ||
    function (n) {
      for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];

        for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (n[u] = o[u]);
      }

      return n;
    },
  o = l(['\n      SafeModule.module(...) was invoked without any options parameter.\n    '], ['\n      SafeModule.module(...) was invoked without any options parameter.\n    ']),
  u = l(
    ['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    '],
    ['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    ']
  ),
  f = l(['\n      Missing a "mock" parameter.\n    '], ['\n      Missing a "mock" parameter.\n    ']),
  module12 = require('./12'),
  module929 = require('./929');

function l(n, t) {
  return Object.freeze(
    Object.defineProperties(n, {
      raw: {
        value: Object.freeze(t),
      },
    })
  );
}

Object.prototype.hasOwnProperty;

var p = {
    addListener: function () {},
    removeListeners: function () {},
  },
  h = function (n, t) {
    for (var o = undefined, u = 0; u < n.length; u++) if ((o = t(n[u]))) return o;

    return null;
  },
  w = function n(t) {
    return t ? (Array.isArray(t) ? h(t, n) : module12.NativeModules[t]) : null;
  },
  y = function n(t) {
    return Array.isArray(t) ? n(t[0]) : t;
  },
  M = function (n, o, u) {
    var f = w(n);
    return f || (u ? t({}, o, p) : o);
  },
  O = function (n) {
    return n.VERSION;
  };

module.exports = function (n) {
  if (!n) throw new Error(c.default(o));
  var c = n.moduleName,
    l = n.mock,
    p = n.isEventEmitter,
    h = n.versionOverrides,
    w = n.getVersion;
  if ((w || (w = O), !c)) throw new Error(c.default(u));
  y(c);
  if (!l) throw new Error(c.default(f));
  var N = {},
    b = M(c, l, p),
    E = w(b);
  if (p) N.emitter = new module12.NativeEventEmitter(b);
  var k = undefined,
    j = undefined;

  if (h) {
    k = h[E];
    j = {};
    if (k)
      Object.keys(k).forEach(function (n) {
        if ('function' == typeof k[n]) j[n] = k[n](b[n], b);
        else j[n] = k[n];
      });
  }

  t(N, l, b, j);
  return N;
};
