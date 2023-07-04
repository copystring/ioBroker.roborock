var module50 = require('./50'),
  module51 = require('./51');

function f(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(t);
    if (n)
      f = f.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, f);
  }

  return o;
}

function c(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      f(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      f(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

require('./52');

var module21 = require('./21'),
  module54 = require('./54'),
  module39 = require('./39'),
  w = {},
  y = new Set(),
  p = {},
  v = false;

function O() {
  if (!v) {
    p = module51.default.getConstants();
    v = true;
  }

  return p;
}

var b = c(
  c({}, module51.default),
  {},
  {
    getConstants: function () {
      return O();
    },
    getViewManagerConfig: function (t) {
      if (undefined === w[t] && module51.default.getConstantsForViewManager)
        try {
          w[t] = module51.default.getConstantsForViewManager(t);
        } catch (n) {
          w[t] = null;
        }
      var n = w[t];
      if (n) return n;
      if (!globals.nativeCallSyncHook) return n;

      if (module51.default.lazilyLoadView && !y.has(t)) {
        var f = module51.default.lazilyLoadView(t);
        y.add(t);

        if (f.viewConfig) {
          O()[t] = f.viewConfig;
          C(t);
        }
      }

      return w[t];
    },
  }
);

function C(t) {
  var n = O()[t];
  w[t] = n;

  if (n.Manager) {
    module39(n, 'Constants', {
      get: function () {
        var t = module21[n.Manager],
          o = {};
        if (t)
          Object.keys(t).forEach(function (n) {
            var f = t[n];
            if ('function' != typeof f) o[n] = f;
          });
        return o;
      },
    });
    module39(n, 'Commands', {
      get: function () {
        var t = module21[n.Manager],
          o = {},
          f = 0;
        if (t)
          Object.keys(t).forEach(function (n) {
            if ('function' == typeof t[n]) o[n] = f++;
          });
        return o;
      },
    });
  }
}

module51.default.getViewManagerConfig = b.getViewManagerConfig;
if (O().ViewManagerNames)
  module51.default.getConstants().ViewManagerNames.forEach(function (t) {
    module39(module51.default, t, {
      get: function () {
        return module51.default.getConstantsForViewManager(t);
      },
    });
  });
if (!globals.nativeCallSyncHook)
  Object.keys(O()).forEach(function (t) {
    if (!module54.includes(t)) {
      if (!w[t]) w[t] = O()[t];
      module39(module51.default, t, {
        get: function () {
          console.warn(
            "Accessing view manager configs directly off UIManager via UIManager['" + t + "'] is no longer supported. Use UIManager.getViewManagerConfig('" + t + "') instead."
          );
          return b.getViewManagerConfig(t);
        },
      });
    }
  });
module.exports = b;
