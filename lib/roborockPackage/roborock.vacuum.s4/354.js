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
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in n)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(n, l)) {
      var p = c ? Object.getOwnPropertyDescriptor(n, l) : null;
      if (p && (p.get || p.set)) Object.defineProperty(f, l, p);
      else f[l] = n[l];
    }

  f.default = n;
  if (o) o.set(n, f);
  return f;
})(require('./19')).get('ImagePickerIOS');

exports.default = module19;
