function t(n) {
  if ('function' != typeof WeakMap) return null;
  var u = new WeakMap(),
    o = new WeakMap();
  return (t = function (t) {
    return t ? o : u;
  })(n);
}

var module19 = (function (n, u) {
  if (!u && n && n.__esModule) return n;
  if (null === n || ('object' != typeof n && 'function' != typeof n))
    return {
      default: n,
    };
  var o = t(u);
  if (o && o.has(n)) return o.get(n);
  var f = {},
    p = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in n)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(n, c)) {
      var l = p ? Object.getOwnPropertyDescriptor(n, c) : null;
      if (l && (l.get || l.set)) Object.defineProperty(f, c, l);
      else f[c] = n[c];
    }

  f.default = n;
  if (o) o.set(n, f);
  return f;
})(require('./19')).get('HeadlessJsTaskSupport');

exports.default = module19;
