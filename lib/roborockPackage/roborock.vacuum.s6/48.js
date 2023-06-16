var module49 = require('./49'),
  module50 = require('./50');

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
        module49.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      f(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

require('./51');

var module20 = require('./20'),
  module53 = require('./53'),
  module38 = require('./38'),
  w = {},
  y = new Set(),
  p = {},
  v = false;

function O() {
  if (!v) {
    p = module50.default.getConstants();
    v = true;
  }

  return p;
}

var b = c(
  c({}, module50.default),
  {},
  {
    getConstants: function () {
      return O();
    },
    getViewManagerConfig: function (t) {
      if (undefined === w[t] && module50.default.getConstantsForViewManager)
        try {
          w[t] = module50.default.getConstantsForViewManager(t);
        } catch (n) {
          w[t] = null;
        }
      var n = w[t];
      if (n) return n;
      if (!globals.nativeCallSyncHook) return n;

      if (module50.default.lazilyLoadView && !y.has(t)) {
        var f = module50.default.lazilyLoadView(t);
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
    module38(n, 'Constants', {
      get: function () {
        var t = module20[n.Manager],
          o = {};
        if (t)
          Object.keys(t).forEach(function (n) {
            var f = t[n];
            if ('function' != typeof f) o[n] = f;
          });
        return o;
      },
    });
    module38(n, 'Commands', {
      get: function () {
        var t = module20[n.Manager],
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

module50.default.getViewManagerConfig = b.getViewManagerConfig;
if (O().ViewManagerNames)
  module50.default.getConstants().ViewManagerNames.forEach(function (t) {
    module38(module50.default, t, {
      get: function () {
        return module50.default.getConstantsForViewManager(t);
      },
    });
  });
if (!globals.nativeCallSyncHook)
  Object.keys(O()).forEach(function (t) {
    if (!module53.includes(t)) {
      if (!w[t]) w[t] = O()[t];
      module38(module50.default, t, {
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
