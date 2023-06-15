var module19 = (function (t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var f = o(n);
  if (f && f.has(t)) return f.get(t);
  var u = {},
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in t)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
      var p = c ? Object.getOwnPropertyDescriptor(t, l) : null;
      if (p && (p.get || p.set)) Object.defineProperty(u, l, p);
      else u[l] = t[l];
    }

  u.default = t;
  if (f) f.set(t, u);
  return u;
})(require('./19'));

function o(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    f = new WeakMap();
  return (o = function (t) {
    return t ? f : n;
  })(t);
}

var module51 = 'android' === require('./51').default.OS ? module19.getEnforcing('IntentAndroid') : module19.getEnforcing('LinkingManager');
exports.default = module51;
