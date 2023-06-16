exports.getPngBase64 = function (n, t, l) {
  var o = module1485.deflate(l, {
      level: 1,
    }),
    u = new Uint8Array(f.length + c + O + o.length + 4 + y.length);
  u.set(f, 0);
  var A = f.length;
  B(n, t, u, A, s);
  L(u, (A += c), o.length, _);
  A += O;
  u.set(o, A);
  var w = I(_, 0, 4);
  w = U(w, o, 0, o.length);
  A += o.length;
  C(w, u, A);
  u.set(y, u.length - y.length);
  return base64js.fromByteArray(u);
};

exports.getIndexPngBase64 = function (n, o, u) {
  if (!t) D();
  if (!l) T();
  var A = module1485.deflate(u, {
      level: 1,
    }),
    s = f.length + c;
  s += t.length + l.length;
  s += O + A.length + 4 + y.length;
  var E = new Uint8Array(s);
  E.set(f, 0);
  var N = f.length;
  B(n, o, E, N, w);
  N += c;
  E.set(t, N);
  N += t.length;
  E.set(l, N);
  N += l.length;
  L(E, N, A.length, _);
  N += O;
  E.set(A, N);
  var R = I(_, 0, 4);
  R = U(R, A, 0, A.length);
  N += A.length;
  C(R, E, N);
  E.set(y, E.length - y.length);
  return base64js.fromByteArray(E);
};

var t,
  l,
  base64js = require('base64-js'),
  module1485 = require('./1485'),
  f = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
  o = new Uint8Array([73, 72, 68, 82]),
  u = new Uint8Array([80, 76, 84, 69]),
  A = new Uint8Array([116, 82, 78, 83]),
  _ = new Uint8Array([73, 68, 65, 84]),
  y = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]),
  O = 8,
  c = 25,
  s = 6,
  w = 3,
  E = 8,
  N = 37;

exports.COLOR_INDEX_TRANSPARENT = 0;
exports.COLOR_INDEX_WHITE = 1;
exports.COLOR_INDEX_BLACK = 2;

var R = (function () {
  for (var n, t = [], l = 0; l < 256; l++) {
    n = l;

    for (var h = 0; h < 8; h++) n = 1 & n ? 3988292384 ^ (n >>> 1) : n >>> 1;

    t[l] = n;
  }

  return t;
})();

function U(n, t, l, h) {
  var v = l + h;
  n ^= -1;

  for (var f = l; f < v; f++) n = (n >>> 8) ^ R[255 & (n ^ t[f])];

  return -1 ^ n;
}

function I(n, t, l) {
  return U(0, n, t, l);
}

function C(n, t, l) {
  for (var h = 0; h < 4; ++h) t[l + h] = (n >>> (8 * (3 - h))) & 255;
}

function L(n, t, l, h) {
  C(l, n, t);
  n.set(h, t + 4);
}

function B(n, t, l, h, v) {
  L(l, h, 13, o);
  C(n, l, h + 8);
  C(t, l, h + 12);
  l[h + 16] = E;
  l[h + 17] = v;
  l[h + 18] = 0;
  l[h + 19] = 0;
  l[h + 20] = 0;
  C(I(l, h + 4, 17), l, h + 21);
}

function D() {
  L((t = new Uint8Array(123)), 0, 111, u);
  var n = 7;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 255;
  t[++n] = 255;
  t[++n] = 255;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 109;
  t[++n] = 110;
  t[++n] = 112;
  t[++n] = 187;
  t[++n] = 187;
  t[++n] = 187;
  t[++n] = 130;
  t[++n] = 190;
  t[++n] = 255;
  t[++n] = 255;
  t[++n] = 148;
  t[++n] = 120;
  t[++n] = 43;
  t[++n] = 205;
  t[++n] = 187;
  t[++n] = 255;
  t[++n] = 207;
  t[++n] = 78;
  t[++n] = 69;
  t[++n] = 121;
  t[++n] = 181;
  t[++n] = 192;
  t[++n] = 90;
  t[++n] = 64;
  t[++n] = 0;
  t[++n] = 126;
  t[++n] = 129;
  t[++n] = 189;
  t[++n] = 124;
  t[++n] = 0;
  t[++n] = 255;
  t[++n] = 213;
  t[++n] = 209;
  t[++n] = 80;
  t[++n] = 164;
  t[++n] = 255;
  t[++n] = 255;
  t[++n] = 116;
  t[++n] = 77;
  t[++n] = 0;
  t[++n] = 143;
  t[++n] = 168;
  t[++n] = 245;
  t[++n] = 175;
  t[++n] = 16;
  t[++n] = 83;
  t[++n] = 148;
  t[++n] = 223;
  t[++n] = 234;
  t[++n] = 107;
  t[++n] = 75;
  t[++n] = 0;
  t[++n] = 177;
  t[++n] = 182;
  t[++n] = 233;
  t[++n] = 153;
  t[++n] = 0;
  t[++n] = 250;
  t[++n] = 167;
  t[++n] = 159;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 67;
  t[++n] = 67;
  t[++n] = 67;
  t[++n] = 109;
  t[++n] = 109;
  t[++n] = 109;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 0;
  t[++n] = 211;
  t[++n] = 213;
  t[++n] = 219;
  t[++n] = 49;
  t[++n] = 49;
  t[++n] = 49;
  t[++n] = 184;
  t[++n] = 217;
  t[++n] = 254;
  t[++n] = 255;
  t[++n] = 194;
  t[++n] = 178;
  t[++n] = 127;
  t[++n] = 219;
  t[++n] = 222;
  t[++n] = 255;
  t[++n] = 234;
  t[++n] = 161;
  t[++n] = 165;
  t[++n] = 190;
  t[++n] = 217;
  t[++n] = 220;
  t[++n] = 168;
  t[++n] = 155;
  t[++n] = 123;
  t[++n] = 195;
  t[++n] = 197;
  t[++n] = 217;
  t[++n] = 199;
  t[++n] = 133;
  C(I(t, 4, 115), t, 119);
}

function T() {
  L((l = new Uint8Array(49)), 0, N, A);
  var n = 7;
  l[++n] = 0;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 51;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 21;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  l[++n] = 255;
  C(I(l, 4, 41), l, 45);
}
