exports.default = function (t, n) {
  if (t === n) return true;
  var u = Object.keys(t),
    f = Object.keys(n);
  if (u.length !== f.length) return false;

  for (var l = Object.prototype.hasOwnProperty, o = 0; o < u.length; o++) if (!l.call(n, u[o]) || t[u[o]] !== n[u[o]]) return false;

  return true;
};
