var t = Object.prototype.hasOwnProperty;

function n(t, n) {
  return t === n ? 0 !== t || 0 !== n || 1 / t == 1 / n : t != t && n != n;
}

var u = function (u, o) {
  if (n(u, o)) return true;
  if ('object' != typeof u || null === u || 'object' != typeof o || null === o) return false;
  var f = Object.keys(u),
    l = Object.keys(o);
  if (f.length !== l.length) return false;

  for (var c = 0; c < f.length; c++) if (!t.call(o, f[c]) || !n(u[f[c]], o[f[c]])) return false;

  return true;
};

exports.default = u;
