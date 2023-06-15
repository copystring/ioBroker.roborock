module.exports = function (t, n) {
  for (var s = {}, c = Object.keys(t), f = Array.isArray(n), o = 0; o < c.length; o++) {
    var u = c[o],
      y = t[u];
    if (f ? -1 !== n.indexOf(u) : n(u, y, t)) s[u] = y;
  }

  return s;
};
