module.exports = function t(n) {
  if (null !== n && 'object' == typeof n) {
    if (!Array.isArray(n)) return n;

    for (var f = {}, o = 0, u = n.length; o < u; ++o) {
      var c = t(n[o]);
      if (c) for (var s in c) f[s] = c[s];
    }

    return f;
  }
};
