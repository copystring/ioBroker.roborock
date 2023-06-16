var module289 = require('./289'),
  module184 = require('./184');

!(function (t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = u(n);
  if (o && o.has(t)) return o.get(t);
  var f = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var p in t)
    if ('default' !== p && Object.prototype.hasOwnProperty.call(t, p)) {
      var c = l ? Object.getOwnPropertyDescriptor(t, p) : null;
      if (c && (c.get || c.set)) Object.defineProperty(f, p, c);
      else f[p] = t[p];
    }

  f.default = t;
  if (o) o.set(t, f);
})(require('react'));

function u(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (u = function (t) {
    return t ? o : n;
  })(t);
}

var f = module289.default({
  supportedCommands: ['openDrawer', 'closeDrawer'],
});
exports.Commands = f;
var l = module184.default('AndroidDrawerLayout');
exports.default = l;
