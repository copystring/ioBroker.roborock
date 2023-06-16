var module13 = require('./13'),
  n = {},
  s = {};

exports.customBubblingEventTypes = n;
exports.customDirectEventTypes = s;
var o = new Map(),
  u = new Map();

function f(t) {
  var o = t.bubblingEventTypes,
    u = t.directEventTypes;
  if (null != o) for (var f in o) null == n[f] && (n[f] = o[f]);
  if (null != u) for (var l in u) null == s[l] && (s[l] = u[l]);
}

exports.register = function (n, s) {
  module13(!o.has(n), 'Tried to register two views with the same name %s', n);
  o.set(n, s);
  return n;
};

exports.get = function (n) {
  var s;
  if (u.has(n)) s = u.get(n);
  else {
    var l = o.get(n);
    if ('function' != typeof l)
      module13(false, 'View config not found for name %s.%s', n, 'string' == typeof n[0] && /[a-z]/.test(n[0]) ? ' Make sure to start component names with a capital letter.' : '');
    o.set(n, null);
    f((s = l()));
    u.set(n, s);
  }
  module13(s, 'View config not found for name %s', n);
  return s;
};
