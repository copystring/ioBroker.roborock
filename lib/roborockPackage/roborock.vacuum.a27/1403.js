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
  var u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null,
    l = {
      floor: 26,
    },
    v = new Array(3 * (3 * f.width + 1) * f.height);
  o(v, 0);

  for (
    var s = function (t) {
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
      c = function (t) {
        return 0 == s(t) || 180 == s(t);
      },
      w = function (t) {
        return 90 == s(t) || 270 == s(t);
      },
      p = function (t) {
        v[t + 3 * f.width + 1] = l.floor;
        v[t + 3 * f.width + 2] = l.floor;
        v[t + 3 * f.width + 3] = l.floor;
      },
      M = function (t) {
        v[t + 1] = l.floor;
        v[t + 3 * f.width + 2] = l.floor;
        v[t + 6 * f.width + 3] = l.floor;
      },
      b = f.height - 1;
    b >= 0;
    --b
  )
    for (var x = h.offset + (b + f.top) * h.width, I = 0; I < f.width; ++I) {
      var _ = h.data[x + I + f.left];

      if (0 != (7 & _)) {
        var F = f.height - 1 - b,
          y = 3 * F * (3 * f.width + 1) + 1 + 3 * I,
          D = _ >>> 3;

        if (4 == n[D]) {
          if (F % 16 == 0) p(y);
          if (I % 16 == 0) M(y);
        } else if (3 == n[D]) {
          if ((f.width >= f.height && !w(D)) || c(D)) {
            var P = Math.floor(F / 5) % 2 == 0;

            if (F % 5 == 0) {
              p(y);
              if ((P && I % 24 == 0) || (!P && (I + 12) % 24 == 0)) v[y + 1] = l.floor;
              else if ((!P && I % 24 == 0) || (P && (I + 12) % 24 == 0)) v[y + 6 * f.width + 3] = l.floor;
            } else if ((P && (I + 12) % 24 == 0) || (!P && I % 24 == 0)) M(y);
          } else {
            var j = Math.floor(I / 5) % 2 == 0;

            if (I % 5 == 0) {
              M(y);
              if ((j && F % 24 == 0) || (!j && (F + 12) % 24 == 0)) v[y + 3 * f.width + 1] = l.floor;
              else if ((!j && F % 24 == 0) || (j && (F + 12) % 24 == 0)) v[y + 3 * f.width + 3] = l.floor;
            } else if ((j && (F + 12) % 24 == 0) || (!j && F % 24 == 0)) p(y);
          }
        }
      }
    }

  return 'data:image/png;base64,' + module1404(3 * f.width, 3 * f.height, v);
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

var module1404 = require('./1404').getIndexPngBase64;

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
