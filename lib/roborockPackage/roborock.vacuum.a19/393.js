function n(n) {
  return n < 0 ? 4294967295 + n + 1 : n;
}

function t(t, o) {
  return n((t << o) | (t >>> (32 - o)));
}

function o(t) {
  return n(4294967295 & t);
}

exports.digest = function (n, f, v) {
  if (!v) v = 0;
  if (!f) f = n.length;
  var u = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
    c = new Array(73 - ((f + 9) & 63 || 64));
  c[0] = 128;

  for (var l = 8 * f, h = 0; h < 4; ++h) c[c.length - h - 1] = (l >>> (8 * h)) & 255;

  for (var s = new Array(16), y = 0; y < f + c.length; y += 64) {
    for (var _ = 0; _ < s.length; ++_) s[_] = 0;

    for (var w = 0; w < 16; ++w)
      for (var A = 0; A < 4; ++A) {
        var b = y + 4 * w + A + v;
        s[w] |= (b < v + f ? n[b] : c[b - v - f]) << (8 * (3 - A));
      }

    for (var j = u[0], p = u[1], M = u[2], O = u[3], P = u[4], k = 0; k < 80; ++k) {
      var q = 0,
        x = 0;

      if (k >= 0 && k < 20) {
        q = (p & M) | (~p & O);
        x = 1518500249;
      } else if (k >= 20 && k < 40) {
        q = p ^ M ^ O;
        x = 1859775393;
      } else if (k >= 40 && k < 60) {
        q = (p & M) | (p & O) | (M & O);
        x = 2400959708;
      } else if (k >= 60 && k < 80) {
        q = p ^ M ^ O;
        x = 3395469782;
      }

      var z = k < 16 ? s[k] : (s[15 & k] = t(s[15 & k] ^ s[(k - 14) & 15] ^ s[(k - 8) & 15] ^ s[(k - 3) & 15], 1)),
        B = t(j, 5) + q + P + x + z;
      P = O;
      O = M;
      M = t(p, 30);
      p = j;
      j = o(B);
    }

    u[0] = o(u[0] + j);
    u[1] = o(u[1] + p);
    u[2] = o(u[2] + M);
    u[3] = o(u[3] + O);
    u[4] = o(u[4] + P);
  }

  for (var C = new Array(20), D = 0; D < u.length; ++D) for (var E = 0; E < 4; ++E) C[4 * D + E] = (u[D] >>> (8 * (3 - E))) & 255;

  return C;
};
