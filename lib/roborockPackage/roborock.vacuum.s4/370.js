function t(n) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    u = new WeakMap();
  return (t = function (t) {
    return t ? u : o;
  })(n);
}

var module19 = (function (n, o) {
  if (!o && n && n.__esModule) return n;
  if (null === n || ('object' != typeof n && 'function' != typeof n))
    return {
      default: n,
    };
  var u = t(o);
  if (u && u.has(n)) return u.get(n);
  var f = {},
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in n)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(n, l)) {
      var p = c ? Object.getOwnPropertyDescriptor(n, l) : null;
      if (p && (p.get || p.set)) Object.defineProperty(f, l, p);
      else f[l] = n[l];
    }

  f.default = n;
  if (u) u.set(n, f);
  return f;
})(require('./19')).getEnforcing('ToastAndroid');

exports.default = module19;
