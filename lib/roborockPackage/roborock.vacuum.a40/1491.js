function t(t) {
  if (!t || !t.data || t.data.length <= 0) return [];

  for (var n = [], o = 0; o < t.data.length; o++) {
    for (var u = t.data[o], f = u[9], h = [], l = [], s = 0; s < 4; s++) {
      h.push(u[2 * s]);
      l.push(u[2 * s + 1]);
    }

    h.sort(function (t, n) {
      return t - n;
    });
    l.sort(function (t, n) {
      return t - n;
    });
    n.push([h[0], h[3], l[0], l[3], f]);
  }

  return n;
}

exports.getFurnitureIndexs = function (n, o) {
  var u = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : 0,
    f = t(o);
  if (!f || f.length <= 0) return [];

  for (
    var h = function (t, n, o) {
        var u = Math.floor(o) - t.top,
          f = Math.floor(n) - t.left;
        return u < 0 || u >= t.top + t.height ? -1 : f < 0 || f >= t.left + t.width ? -1 : t.offset + t.width * u + f;
      },
      l = [],
      s = 0;
    s < f.length;
    s++
  ) {
    var v = f[s];

    if (5 == v.length) {
      for (var c = v[0] - u, p = v[1] + u, _ = v[2] - u, M = v[3] + u, w = v[4], b = [w], j = _; j <= M; j++)
        for (var x = c; x <= p; x++) {
          var y = h(n, x, j);
          if (-1 != y) b.push(y);
        }

      l.push(b);
    }
  }

  return l;
};
