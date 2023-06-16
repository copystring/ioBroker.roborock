var n = 4,
  t = 0.001,
  u = 1e-7,
  o = 10,
  f = 0.1,
  c = 'function' == typeof Float32Array;

function v(n, t) {
  return 1 - 3 * t + 3 * n;
}

function s(n, t) {
  return 3 * t - 6 * n;
}

function w(n) {
  return 3 * n;
}

function l(n, t, u) {
  return ((v(t, u) * n + s(t, u)) * n + w(t)) * n;
}

function y(n, t, u) {
  return 3 * v(t, u) * n * n + 2 * s(t, u) * n + w(t);
}

function b(n, t, f, c, v) {
  var s,
    w,
    y = 0,
    b = t,
    h = f;

  do {
    if ((s = l((w = b + (h - b) / 2), c, v) - n) > 0) h = w;
    else b = w;
  } while (Math.abs(s) > u && ++y < o);

  return w;
}

function h(t, u, o, f) {
  for (var c = u, v = 0; v < n; ++v) {
    var s = y(c, o, f);
    if (0 === s) return c;
    c -= (l(c, o, f) - t) / s;
  }

  return c;
}

module.exports = function (n, u, o, v) {
  if (!(n >= 0 && n <= 1 && o >= 0 && o <= 1)) throw new Error('bezier x values must be in [0, 1] range');
  var s = c ? new Float32Array(11) : new Array(11);
  if (n !== u || o !== v) for (var w = 0; w < 11; ++w) s[w] = l(w * f, n, o);

  function A(u) {
    for (var c = 0, v = 1; 10 !== v && s[v] <= u; ++v) c += f;

    var w = c + ((u - s[--v]) / (s[v + 1] - s[v])) * f,
      l = y(w, n, o);
    return l >= t ? h(u, w, n, o) : 0 === l ? w : b(u, c, c + f, n, o);
  }

  return function (t) {
    return n === u && o === v ? t : 0 === t ? 0 : 1 === t ? 1 : l(A(t), u, v);
  };
};
