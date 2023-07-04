function t(n) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    f = new WeakMap();
  return (t = function (t) {
    return t ? f : o;
  })(n);
}

var module19 = (function (n, o) {
  if (!o && n && n.__esModule) return n;
  if (null === n || ('object' != typeof n && 'function' != typeof n))
    return {
      default: n,
    };
  var f = t(o);
  if (f && f.has(n)) return f.get(n);
  var u = {},
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in n)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(n, l)) {
      var p = c ? Object.getOwnPropertyDescriptor(n, l) : null;
      if (p && (p.get || p.set)) Object.defineProperty(u, l, p);
      else u[l] = n[l];
    }

  u.default = n;
  if (f) f.set(n, u);
  return u;
})(require('./19')).getEnforcing('PlatformConstants');

exports.default = module19;
