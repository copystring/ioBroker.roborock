exports.getFurnitureIndexs = function (t, o) {
  var f = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : 0,
    h = n(o);
  if (!h || h.length <= 0) return [];

  for (
    var u = function (t, n, o) {
        var f = Math.floor(o) - t.top,
          h = Math.floor(n) - t.left;
        return f < 0 || f >= t.top + t.height ? -1 : h < 0 || h >= t.left + t.width ? -1 : t.offset + t.width * f + h;
      },
      l = [],
      v = 0;
    v < h.length;
    v++
  ) {
    var s = h[v];

    if (5 == s.length) {
      for (var c = s[0] - f, w = s[1] + f, p = s[2] - f, M = s[3] + f, b = s[4], x = [b], I = p; I <= M; I++)
        for (var _ = c; _ <= w; _++) {
          var F = u(t, _, I);
          if (-1 != F) x.push(F);
        }

      l.push(x);
    }
  }

  return l;
};

exports.convertFloorDataToImage = function (n, f, h) {
  for (var u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null, l = false, v = 0; v < n.length; v++)
    if (0 != n[v]) {
      l = true;
      break;
    }

  if (!l) return '';
  var s = {
      floor: 26,
    },
    c = new Array(3 * (3 * f.width + 1) * f.height);
  o(c, 0);

  for (
    var w = function (t) {
        var n;

        if ((null == u ? undefined : null == (n = u.data) ? undefined : n.length) > 0) {
          var o = u.data,
            f = o.findIndex(function (n) {
              return n[0] === t;
            });
          if (-1 != f) return o[f][1];
        }

        return -1;
      },
      p = function (t) {
        return 0 == w(t) || 180 == w(t);
      },
      M = function (t) {
        return 90 == w(t) || 270 == w(t);
      },
      b = function (t) {
        c[t + 3 * f.width + 1] = s.floor;
        c[t + 3 * f.width + 2] = s.floor;
        c[t + 3 * f.width + 3] = s.floor;
      },
      x = function (t) {
        c[t + 1] = s.floor;
        c[t + 3 * f.width + 2] = s.floor;
        c[t + 6 * f.width + 3] = s.floor;
      },
      I = f.height - 1;
    I >= 0;
    --I
  )
    for (var _ = h.offset + (I + f.top) * h.width, F = 0; F < f.width; ++F) {
      var y = h.data[_ + F + f.left];

      if (0 != (7 & y)) {
        var D = f.height - 1 - I,
          P = 3 * D * (3 * f.width + 1) + 1 + 3 * F,
          j = y >>> 3;

        if (4 == n[j]) {
          if (D % 16 == 0) b(P);
          if (F % 16 == 0) x(P);
        } else if (3 == n[j]) {
          if ((f.width >= f.height && !M(j)) || p(j)) {
            var k = Math.floor(D / 5) % 2 == 0;

            if (D % 5 == 0) {
              b(P);
              if ((k && F % 24 == 0) || (!k && (F + 12) % 24 == 0)) c[P + 1] = s.floor;
              else if ((!k && F % 24 == 0) || (k && (F + 12) % 24 == 0)) c[P + 6 * f.width + 3] = s.floor;
            } else if ((k && (F + 12) % 24 == 0) || (!k && F % 24 == 0)) x(P);
          } else {
            var A = Math.floor(F / 5) % 2 == 0;

            if (F % 5 == 0) {
              x(P);
              if ((A && D % 24 == 0) || (!A && (D + 12) % 24 == 0)) c[P + 3 * f.width + 1] = s.floor;
              else if ((!A && D % 24 == 0) || (A && (D + 12) % 24 == 0)) c[P + 3 * f.width + 3] = s.floor;
            } else if ((A && (D + 12) % 24 == 0) || (!A && D % 24 == 0)) b(P);
          }
        }
      }
    }

  return 'data:image/png;base64,' + module1483(3 * f.width, 3 * f.height, c);
};

exports.precessFurnitureData = function (t) {
  if (!(t && t.num && t.data && t.data.length)) return t;

  for (var n = [], o = [], f = 0; f < t.data.length; f++) {
    if (46 == t.data[f][9] && 0 == t.data[f][10] && !t.data[f][11]) {
      var h = Math.abs(t.data[f][4] - t.data[f][0]) ** Math.abs(t.data[f][5] - t.data[f][1]);
      t.data[f][10] = h >= 40 ? 3 : h > 20 ? 2 : 1;
    }

    if (45 == t.data[f][9] && 0 == t.data[f][10] && !t.data[f][11]) {
      var u = Math.abs(t.data[f][4] - t.data[f][0]) ** Math.abs(t.data[f][5] - t.data[f][1]);
      t.data[f][10] = u <= 24 ? 1 : 2;
    }

    if (!(47 != t.data[f][9] || t.data[f][11]))
      Math.abs(t.data[f][4] - t.data[f][0]) < 30 && Math.abs(t.data[f][5] - t.data[f][1]) < 30 && ((t.data[f][9] = 48), (t.data[f][10] = 2));
    if (t.data[f][11]) n.push(t.data[f]);
    if (!t.data[f][11]) o.push(t.data[f]);
  }

  t.data = n;
  t.hide = o;
  return t;
};

var module1483 = require('./1483').getIndexPngBase64;

function n(t) {
  if (!t || !t.data || t.data.length <= 0) return [];

  for (var n = [], o = 0; o < t.data.length; o++) {
    for (var f = t.data[o], h = f[9], u = [], l = [], v = 0; v < 4; v++) {
      u.push(f[2 * v]);
      l.push(f[2 * v + 1]);
    }

    u.sort(function (t, n) {
      return t - n;
    });
    l.sort(function (t, n) {
      return t - n;
    });
    n.push([u[0], u[3], l[0], l[3], h]);
  }

  return n;
}

function o(t, n) {
  if (t) for (var o = 0; o < t.length; o++) t[o] = n;
}
