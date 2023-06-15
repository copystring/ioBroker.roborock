exports.convertState = u;
exports.isConnectionExpensive = f;
exports.isConnected = c;
exports.warnOnce = l;

var module12 = require('./12'),
  module2060 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var u = o(n);
    if (u && u.has(t)) return u.get(t);
    var f = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var p in t)
      if ('default' !== p && Object.prototype.hasOwnProperty.call(t, p)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, p) : null;
        if (l && (l.get || l.set)) Object.defineProperty(f, p, l);
        else f[p] = t[p];
      }

    f.default = t;
    if (u) u.set(t, f);
    return f;
  })(require('./2060'));

function o(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (o = function (t) {
    return t ? u : n;
  })(t);
}

function u(t) {
  var o = 'unknown';
  if ('cellular' === t.type) o = t.details.cellularGeneration || 'unknown';
  return {
    type: t.type === module2060.NetInfoStateType.vpn || t.type === module2060.NetInfoStateType.other ? 'unknown' : t.type,
    effectiveType: o,
  };
}

function f(o) {
  if ('android' === module12.Platform.OS) return o.type !== module2060.NetInfoStateType.none && o.type !== module2060.NetInfoStateType.unknown && o.details.isConnectionExpensive;
  throw new Error('Currently not supported on iOS');
}

function c(t) {
  return t.isConnected;
}

var p = false;

function l() {
  if (!p) {
    console.warn(
      'Warning: RNCNetInfo - You are using the deprecated API. It will still work, but you must upgrade to the new API to receive the new features. The old API will be removed in the future'
    );
    p = true;
  }
}

var s = {
  convertState: u,
  isConnectionExpensive: f,
  isConnected: c,
  warnOnce: l,
};
exports.default = s;
