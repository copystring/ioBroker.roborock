exports.getPngBase64 = function (l, o, f) {
  var u = module1341.deflate(f, {
      level: 1,
    }),
    v = new Uint8Array(c.length + _ + A + u.length + 4 + s.length);
  v.set(c, 0);
  var h = c.length;
  D(l, o, v, h, p);
  C(v, (h += _), u.length, O);
  h += A;
  v.set(u, h);
  var y = U(O, 0, 4);
  y = R(y, u, 0, u.length);
  h += u.length;
  I(y, v, h);
  v.set(s, v.length - s.length);
  return base64js.fromByteArray(v);
};

exports.getIndexPngBase64 = function (l, o, v) {
  if (!f) L();
  if (!u) b();
  var h = module1341.deflate(v, {
      level: 1,
    }),
    y = c.length + _;
  y += f.length + u.length;
  y += A + h.length + 4 + s.length;
  var p = new Uint8Array(y);
  p.set(c, 0);
  var E = c.length;
  D(l, o, p, E, w);
  E += _;
  p.set(f, E);
  E += f.length;
  p.set(u, E);
  E += u.length;
  C(p, E, h.length, O);
  E += A;
  p.set(h, E);
  var N = U(O, 0, 4);
  N = R(N, h, 0, h.length);
  E += h.length;
  I(N, p, E);
  p.set(s, p.length - s.length);
  return base64js.fromByteArray(p);
};

var base64js = o(require('base64-js')),
  module1341 = o(require('./1341'));

function l(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (l = function (t) {
    return t ? o : n;
  })(t);
}

function o(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = l(n);
  if (o && o.has(t)) return o.get(t);
  var f = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var v = u ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (v && (v.get || v.set)) Object.defineProperty(f, c, v);
      else f[c] = t[c];
    }

  f.default = t;
  if (o) o.set(t, f);
  return f;
}

var f,
  u,
  c = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
  v = new Uint8Array([73, 72, 68, 82]),
  h = new Uint8Array([80, 76, 84, 69]),
  y = new Uint8Array([116, 82, 78, 83]),
  O = new Uint8Array([73, 68, 65, 84]),
  s = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]),
  A = 8,
  _ = 25,
  p = 6,
  w = 3,
  E = 8,
  N = 27;
exports.COLOR_INDEX_TRANSPARENT = 0;
exports.COLOR_INDEX_WHITE = 1;
exports.COLOR_INDEX_BLACK = 2;

var P = (function () {
  for (var t, n = [], l = 0; l < 256; l++) {
    t = l;

    for (var o = 0; o < 8; o++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;

    n[l] = t;
  }

  return n;
})();

function R(t, n, l, o) {
  var f = l + o;
  t ^= -1;

  for (var u = l; u < f; u++) t = (t >>> 8) ^ P[255 & (t ^ n[u])];

  return -1 ^ t;
}

function U(t, n, l) {
  return R(0, t, n, l);
}

function I(t, n, l) {
  for (var o = 0; o < 4; ++o) n[l + o] = (t >>> (8 * (3 - o))) & 255;
}

function C(t, n, l, o) {
  I(l, t, n);
  t.set(o, n + 4);
}

function D(t, n, l, o, f) {
  C(l, o, 13, v);
  I(t, l, o + 8);
  I(n, l, o + 12);
  l[o + 16] = E;
  l[o + 17] = f;
  l[o + 18] = 0;
  l[o + 19] = 0;
  l[o + 20] = 0;
  I(U(l, o + 4, 17), l, o + 21);
}

function L() {
  C((f = new Uint8Array(93)), 0, 81, h);
  var t = 7;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 255;
  f[++t] = 255;
  f[++t] = 255;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 109;
  f[++t] = 110;
  f[++t] = 112;
  f[++t] = 187;
  f[++t] = 187;
  f[++t] = 187;
  f[++t] = 130;
  f[++t] = 190;
  f[++t] = 255;
  f[++t] = 255;
  f[++t] = 148;
  f[++t] = 120;
  f[++t] = 43;
  f[++t] = 205;
  f[++t] = 187;
  f[++t] = 255;
  f[++t] = 207;
  f[++t] = 78;
  f[++t] = 69;
  f[++t] = 121;
  f[++t] = 181;
  f[++t] = 192;
  f[++t] = 90;
  f[++t] = 64;
  f[++t] = 0;
  f[++t] = 126;
  f[++t] = 129;
  f[++t] = 189;
  f[++t] = 124;
  f[++t] = 0;
  f[++t] = 255;
  f[++t] = 213;
  f[++t] = 209;
  f[++t] = 80;
  f[++t] = 164;
  f[++t] = 255;
  f[++t] = 255;
  f[++t] = 116;
  f[++t] = 77;
  f[++t] = 0;
  f[++t] = 143;
  f[++t] = 168;
  f[++t] = 245;
  f[++t] = 175;
  f[++t] = 16;
  f[++t] = 83;
  f[++t] = 148;
  f[++t] = 223;
  f[++t] = 234;
  f[++t] = 107;
  f[++t] = 75;
  f[++t] = 0;
  f[++t] = 177;
  f[++t] = 182;
  f[++t] = 233;
  f[++t] = 153;
  f[++t] = 0;
  f[++t] = 250;
  f[++t] = 167;
  f[++t] = 159;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 0;
  f[++t] = 67;
  f[++t] = 67;
  f[++t] = 67;
  f[++t] = 109;
  f[++t] = 109;
  f[++t] = 109;
  f[++t] = 255;
  f[++t] = 255;
  f[++t] = 255;
  I(U(f, 4, 85), f, 89);
}

function b() {
  C((u = new Uint8Array(39)), 0, N, y);
  var t = 7;
  u[++t] = 0;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 51;
  u[++t] = 255;
  u[++t] = 255;
  u[++t] = 51;
  I(U(u, 4, 31), u, 35);
}
