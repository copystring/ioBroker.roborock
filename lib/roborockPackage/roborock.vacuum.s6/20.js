var module21 = require('./21'),
  module22 = require('./22'),
  module28 = require('./28'),
  module13 = require('./13');

function l(o, l) {
  if (!o) return null;
  var f = module22(o, 5),
    v = f[0],
    h = f[1],
    y = f[2],
    C = f[3],
    p = f[4];
  if ((module13(!v.startsWith('RCT') && !v.startsWith('RK'), "Module name prefixes should've been stripped by the native side but wasn't for " + v), !h && !y))
    return {
      name: v,
    };
  var M = {};
  if (y)
    y.forEach(function (n, t) {
      var o = C && c(C, t),
        f = p && c(p, t);
      module13(!o || !f, 'Cannot have a method that is both async and a sync hook');
      var v = o ? 'promise' : f ? 'sync' : 'async';
      M[n] = s(l, t, v);
    });
  module21(M, h);
  if (null == M.getConstants)
    M.getConstants = function () {
      return h || Object.freeze({});
    };
  else
    console.warn(
      "Unable to define method 'getConstants()' on NativeModule '" + v + "'. NativeModule '" + v + "' already has a constant or method called 'getConstants'. Please remove it."
    );
  return {
    name: v,
    module: M,
  };
}

function f(n, t) {
  module13(globals.nativeRequireModuleConfig, "Can't lazily create module without nativeRequireModuleConfig");
  var o = l(globals.nativeRequireModuleConfig(n), t);
  return o && o.module;
}

function s(n, t, l) {
  var f = null;
  (f =
    'promise' === l
      ? function (...args) {
          var s = new Error();
          s.framesToPop = 1;
          return new Promise(function (u, f) {
            module28.enqueueNativeCall(
              n,
              t,
              args,
              function (n) {
                return u(n);
              },
              function (n) {
                return f(v(n, s));
              }
            );
          });
        }
      : function (...args) {
          var v = args.length > 0 ? args[args.length - 1] : null,
            h = args.length > 1 ? args[args.length - 2] : null,
            y = 'function' == typeof v,
            C = 'function' == typeof h;
          if (C) module13(y, 'Cannot have a non-function arg after a function arg.');
          var p = y ? v : null,
            M = C ? h : null,
            b = y + C;
          if (((args = args.slice(0, args.length - b)), 'sync' === l)) return module28.callNativeSyncHook(n, t, args, M, p);
          module28.enqueueNativeCall(n, t, args, M, p);
        }).type = l;
  return f;
}

function c(n, t) {
  return -1 !== n.indexOf(t);
}

function v(t, o) {
  return module21(o, t || {});
}

globals.__fbGenNativeModule = l;
var h = {};
if (globals.nativeModuleProxy) h = globals.nativeModuleProxy;
else if (!globals.nativeExtensions) {
  var y = globals.__fbBatchedBridgeConfig;
  module13(y, '__fbBatchedBridgeConfig is not set, cannot invoke native modules');

  var module38 = require('./38');

  (y.remoteModuleConfig || []).forEach(function (n, t) {
    var o = l(n, t);
    if (o)
      o.module
        ? (h[o.name] = o.module)
        : module38(h, o.name, {
            get: function () {
              return f(o.name, t);
            },
          });
  });
}
module.exports = h;
