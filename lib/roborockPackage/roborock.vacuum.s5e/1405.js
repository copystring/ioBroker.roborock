exports.getCleanUpedWalls = function (t) {
  for (var l = t.map, v = l.width * l.height, p = {}, c = 0; c < v; ++c) {
    var b = l.data[l.offset + c];

    if (0 != (7 & b)) {
      p.top = Math.floor(c / l.width);
      break;
    }
  }

  if (undefined === p.top) return;

  for (var k = v; k > p.top * l.width; --k) {
    var A = l.data[l.offset + k - 1];

    if (0 != (7 & A)) {
      p.height = Math.floor((k - 1) / l.width) - p.top + 1;
      break;
    }
  }

  for (var M = p.top * l.width, _ = M + p.height * l.width, j = 0; j < l.width && undefined === p.left; ++j)
    for (var C = M + j; C < _; C += l.width) {
      var F = l.data[l.offset + C];

      if (0 != (7 & F)) {
        p.left = j;
        break;
      }
    }

  for (var I = l.width; I > p.left && undefined === p.width; --I)
    for (var O = M + I - 1; O < _; O += l.width) {
      var P = l.data[l.offset + O];

      if (0 != (7 & P)) {
        p.width = I - p.left;
        break;
      }
    }

  var U = module1401(t.map, t.furnitures, 1);
  if (U.length > 0)
    for (var W = 0; W < U.length; W++)
      for (var q = U[W], z = 1; z < q.length; z++) {
        var B = q[z];
        l.data[B] = 7;
      }

  if (t.charger) {
    var D = o(t.map, t.charger, 4);
    if (D.length > 0)
      for (var W = 0; W < D.length; W++) {
        var E = D[W];
        l.data[E] = 7;
      }
  }

  if (t.obstacles && t.obstacles.obstacles.length > 0)
    for (var G = 0; G < t.obstacles.obstacles.length; G++) {
      var H = t.obstacles.obstacles[G],
        J = Math.floor(H[0] / 50),
        K = Math.floor(H[1] / 50),
        L = o(
          t.map,
          {
            x: J,
            y: K,
          },
          1
        );
      if (L.length > 0)
        for (var z = 0; z < L.length; z++) {
          var N = L[z];
          l.data[N] = 7;
        }
    }
  var Q = new Array(),
    R = new Array(p.width * p.height);
  y(R, 0);

  for (var S = new Array(), T = p.height - 1; T >= 0; --T)
    for (var V = l.offset + (T + p.top) * l.width, X = 0; X < p.width; ++X) {
      var Y = l.data[V + X + p.left],
        Z = new Array();
      if (1 == (7 & Y) && 0 == R[T * p.width + X])
        for (
          R[T * p.width + X] = 1,
            Z.push({
              x: X,
              y: T,
            }),
            Q.push({
              x: X,
              y: T,
            });
          Q.length > 0;

        )
          for (var $ = Q.shift(), rr = [u($), s(p, $), x(p, $), w($)], W = 0; W < rr.length; W++) {
            var tr = rr[W];

            if (null != tr) {
              var ar = l.data[l.offset + (tr.y + p.top) * l.width + tr.x + p.left];

              if (1 == (7 & ar) && 0 == R[tr.y * p.width + tr.x]) {
                R[tr.y * p.width + tr.x] = 1;
                Z.push(tr);
                Q.push(tr);
              }
            }
          }
      if (Z.length > 0) S.push(Z);
    }

  for (var er = new Array(), W = 0; W < S.length; W++) {
    for (var fr = S[W], nr = true, z = 0; z < fr.length; z++) {
      for (var $ = fr[z], rr = [u($), s(p, $), x(p, $), w($)], hr = false, or = 0; or < rr.length; or++) {
        var tr = rr[or];

        if (null == tr) {
          hr = true;
          break;
        }

        var ar = l.data[l.offset + (tr.y + p.top) * l.width + tr.x + p.left];

        if (0 == (7 & ar)) {
          hr = true;
          break;
        }
      }

      if (hr) {
        nr = false;
        break;
      }
    }

    if (!nr && fr.length > 1) {
      var ir = h(fr);
      er.push.apply(er, module31.default(ir));
    }
  }

  return er;
};

var module1401 = require('./1401').getFurnitureIndexs;

function h(t) {
  var f = new Array(),
    n = new Array(t.length);
  y(n, 0);

  for (var h = 0; h < t.length; h++)
    if (1 != n[h]) {
      var o = t[h],
        u = new Array(t.length);
      y(u, 0);
      u[h] = 1;

      for (var s = o.x - 1; s >= 0; ) {
        if (
          -1 ==
            (b = l(
              {
                x: s,
                y: o.y,
              },
              t
            )) ||
          1 == n[b]
        )
          break;
        s--;
        u[b] = 1;
      }

      for (var x = o.x + 1; ; ) {
        if (
          -1 ==
            (b = l(
              {
                x: x,
                y: o.y,
              },
              t
            )) ||
          1 == n[b]
        )
          break;
        x++;
        u[b] = 1;
      }

      var w = new Array(t.length);
      y(w, 0);
      w[h] = 1;

      for (var p = o.y - 1; p >= 0; ) {
        if (
          -1 ==
            (b = l(
              {
                x: o.x,
                y: p,
              },
              t
            )) ||
          1 == n[b]
        )
          break;
        p--;
        w[b] = 1;
      }

      for (var c = o.y + 1; ; ) {
        var b;
        if (
          -1 ==
            (b = l(
              {
                x: o.x,
                y: c,
              },
              t
            )) ||
          1 == n[b]
        )
          break;
        c++;
        w[b] = 1;
      }

      var k = {
          x: s + 1,
          y: o.y,
        },
        A = {
          x: x - 1,
          y: o.y,
        },
        M = u;

      if (x - s < c - p) {
        k = {
          x: o.x,
          y: p + 1,
        };
        A = {
          x: o.x,
          y: c - 1,
        };
        M = w;
      }

      n = v(n, M);
      f.push([k, A]);
    }

  return f;
}

function o(t, f, n) {
  for (
    var h = function (t, f, n) {
        var h = Math.floor(n) - t.top,
          o = Math.floor(f) - t.left;
        return h < 0 || h >= t.top + t.height ? -1 : o < 0 || o >= t.left + t.width ? -1 : t.offset + t.width * h + o;
      },
      o = [],
      l = f.x - n,
      v = f.x + n,
      y = f.y - n,
      u = f.y + n,
      s = y;
    s <= u;
    s++
  )
    for (var x = l; x <= v; x++) {
      var w = h(t, x, s);
      if (-1 != w) o.push(w);
    }

  return o;
}

function l(t, f) {
  for (var n = 0; n < f.length; n++) if (t.x == f[n].x && t.y == f[n].y) return n;

  return -1;
}

function v(t, f) {
  for (var n = new Array(t.length < f.length ? t.length : f.length), h = 0; h < t.length && h < f.length; h++) n[h] = t[h] | f[h];

  return n;
}

function y(t, f) {
  for (var n = 0; n < t.length; n++) t[n] = f;
}

function u(t) {
  return 0 == t.x
    ? null
    : {
        x: t.x - 1,
        y: t.y,
      };
}

function s(t, f) {
  return f.x >= t.width - 1
    ? null
    : {
        x: f.x + 1,
        y: f.y,
      };
}

function x(t, f) {
  return f.y >= t.height - 1
    ? null
    : {
        x: f.x,
        y: f.y + 1,
      };
}

function w(t) {
  return 0 == t.y
    ? null
    : {
        x: t.x,
        y: t.y - 1,
      };
}
