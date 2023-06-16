module.exports = function t(n, f) {
  var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : -1;
  if (0 === o) return true;
  if (n === f) return false;
  if ('function' == typeof n && 'function' == typeof f) return false;
  if ('object' != typeof n || null === n) return n !== f;
  if ('object' != typeof f || null === f) return true;
  if (n.constructor !== f.constructor) return true;

  if (Array.isArray(n)) {
    var u = n.length;
    if (f.length !== u) return true;

    for (var c = 0; c < u; c++) if (t(n[c], f[c], o - 1)) return true;
  } else {
    for (var l in n) if (t(n[l], f[l], o - 1)) return true;

    for (var v in f) if (undefined === n[v] && undefined !== f[v]) return true;
  }

  return false;
};
