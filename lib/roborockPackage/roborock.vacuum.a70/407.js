var module408 = require('./408'),
  u = 2654435761,
  t = 2246822519,
  f = 3266489917,
  o = 668265263,
  c = 374761393;

function l(n, u) {
  return ((n |= 0) >>> ((32 - (u |= 0)) | 0)) | (n << u) | 0;
}

function U(u, t, f) {
  u |= 0;
  t |= 0;
  f |= 0;
  return 0 | module408.imul((u >>> ((32 - t) | 0)) | (u << t), f);
}

function h(n, u) {
  return (((n |= 0) >>> (u |= 0)) ^ n) | 0;
}

function s(u, t, f, o, c) {
  return U(module408.imul(t, f) + u, o, c);
}

function v(t, f, o) {
  return U(t + module408.imul(f[o], c), 11, u);
}

function _(u, t, c) {
  return s(u, module408.readU32(t, c), f, 17, o);
}

function b(f, o, c) {
  return [
    s(f[0], module408.readU32(o, c + 0), t, 13, u),
    s(f[1], module408.readU32(o, c + 4), t, 13, u),
    s(f[2], module408.readU32(o, c + 8), t, 13, u),
    s(f[3], module408.readU32(o, c + 12), t, 13, u),
  ];
}

exports.hash = function (o, U, s, j) {
  var k, p;

  if (((p = j), j >= 16)) {
    for (k = [o + u + t, o + t, o, o - u]; j >= 16; ) {
      k = b(k, U, s);
      s += 16;
      j -= 16;
    }

    k = l(k[0], 1) + l(k[1], 7) + l(k[2], 12) + l(k[3], 18) + p;
  } else k = (o + c + j) >>> 0;

  for (; j >= 4; ) {
    k = _(k, U, s);
    s += 4;
    j -= 4;
  }

  for (; j > 0; ) {
    k = v(k, U, s);
    s++;
    j--;
  }

  return (k = h(module408.imul(h(module408.imul(h(k, 15), t), 13), f), 16)) >>> 0;
};
