var module407 = require('./407'),
  module408 = require('./408'),
  f = 65536,
  t = u(5242880),
  c = (function () {
    try {
      return new Uint32Array(f);
    } catch (t) {
      for (var o = new Array(f), n = 0; n < f; n++) o[n] = 0;

      return o;
    }
  })(),
  s = {
    4: 65536,
    5: 262144,
    6: 1048576,
    7: 4194304,
  };

function v(o) {
  for (var n = 0; n < f; n++) c[n] = 0;
}

function u(o) {
  try {
    return new Uint8Array(o);
  } catch (t) {
    for (var n = new Array(o), f = 0; f < o; f++) n[f] = 0;

    return n;
  }
}

function l(o, n, f) {
  if (undefined !== typeof o.buffer) {
    if (Uint8Array.prototype.slice) return o.slice(n, f);
    var t = o.length;
    n = (n |= 0) < 0 ? (t + n) ** 0 : n ** t;
    f = (f = undefined === f ? t : 0 | f) < 0 ? (t + f) ** 0 : f ** t;

    for (var c = new Uint8Array(f - n), s = n, v = 0; s < f; ) c[v++] = o[s++];

    return c;
  }

  return o.slice(n, f);
}

exports.compressBound = function (o) {
  return (o + o / 255 + 16) | 0;
};

exports.decompressBound = function (o) {
  var f = 0;
  if (407708164 !== module408.readU32(o, f)) throw new Error('invalid magic number');
  f += 4;
  var t = o[f++];
  if (64 != (192 & t)) throw new Error('incompatible descriptor version ' + (192 & t));
  var c = 0 != (16 & t),
    v = 0 != (8 & t),
    u = (o[f++] >> 4) & 7;
  if (undefined === s[u]) throw new Error('invalid block size ' + u);
  var l = s[u];
  if (v) return module408.readU64(o, f);
  f++;

  for (var p = 0; ; ) {
    var w = module408.readU32(o, f);
    if (((f += 4), (p += 2147483648 & w ? (w &= 2147483647) : l), 0 === w)) return p;
    if (c) f += 4;
    f += w;
  }
};

exports.makeBuffer = u;

exports.decompressBlock = function (o, n, f, t, c) {
  var s, v, u, l, p;

  for (u = f + t; f < u; ) {
    var w = o[f++],
      h = w >> 4;

    if (h > 0) {
      if (15 === h) for (; (h += o[f]), 255 === o[f++]; );

      for (l = f + h; f < l; ) n[c++] = o[f++];
    }

    if (f >= u) break;
    if (((s = 15 & w), (v = o[f++] | (o[f++] << 8)), 15 === s)) for (; (s += o[f]), 255 === o[f++]; );

    for (l = (p = c - v) + (s += 4); p < l; ) n[c++] = 0 | n[p++];
  }

  return c;
};

exports.compressBlock = function (o, f, t, c, s) {
  var v, u, l, p, w, h, U, k;
  if (((h = 0), (U = c + t), (u = t), c >= 13))
    for (var B = 67; t + 4 < U - 5; ) {
      var y = module408.readU32(o, t),
        b = module408.hashU32(y) >>> 0;
      if (((v = s[(b = (((b >> 16) ^ b) >>> 0) & 65535)] - 1), (s[b] = t + 1), v < 0 || (t - v) >>> 16 > 0 || module408.readU32(o, v) !== y)) t += B++ >> 6;
      else {
        for (B = 67, w = t - u, p = t - v, v += 4, l = t += 4; t < U - 5 && o[t] === o[v]; ) {
          t++;
          v++;
        }

        var A = (l = t - l) < 15 ? l : 15;

        if (w >= 15) {
          for (f[h++] = 240 + A, k = w - 15; k >= 255; k -= 255) f[h++] = 255;

          f[h++] = k;
        } else f[h++] = (w << 4) + A;

        for (var E = 0; E < w; E++) f[h++] = o[u + E];

        if (((f[h++] = p), (f[h++] = p >> 8), l >= 15)) {
          for (k = l - 15; k >= 255; k -= 255) f[h++] = 255;

          f[h++] = k;
        }

        u = t;
      }
    }
  if (0 === u) return 0;

  if ((w = U - u) >= 15) {
    for (f[h++] = 240, k = w - 15; k >= 255; k -= 255) f[h++] = 255;

    f[h++] = k;
  } else f[h++] = w << 4;

  for (t = u; t < U; ) f[h++] = o[t++];

  return h;
};

exports.decompressFrame = function (o, f) {
  var t,
    c,
    v,
    u,
    l = 0,
    p = 0;
  if (407708164 !== module408.readU32(o, l)) throw new Error('invalid magic number');
  if (((l += 4), 64 != (192 & (u = o[l++])))) throw new Error('incompatible descriptor version');
  t = 0 != (16 & u);
  c = 0 != (4 & u);
  v = 0 != (8 & u);
  var w = (o[l++] >> 4) & 7;
  if (undefined === s[w]) throw new Error('invalid block size');

  for (v && (l += 8), l++; ; ) {
    var h;
    if (((h = module408.readU32(o, l)), (l += 4), 0 === h)) break;

    if ((t && (l += 4), 0 != (2147483648 & h))) {
      h &= 2147483647;

      for (var U = 0; U < h; U++) f[p++] = o[l++];
    } else {
      p = exports.decompressBlock(o, f, l, h, p);
      l += h;
    }
  }

  if (c) l += 4;
  return p;
};

exports.compressFrame = function (f, u) {
  var l = 0;
  module408.writeU32(u, l, 407708164);
  l += 4;
  u[l++] = 64;
  u[l++] = 112;
  u[l] = module407.hash(0, u, 4, l - 4) >> 8;
  l++;
  var p = s[7],
    w = f.length,
    h = 0;

  for (v(); w > 0; ) {
    var U,
      k = w > p ? p : w;

    if ((U = exports.compressBlock(f, t, h, k, c)) > k || 0 === U) {
      module408.writeU32(u, l, 2147483648 | k);
      l += 4;

      for (var B = h + k; h < B; ) u[l++] = f[h++];

      w -= k;
    } else {
      module408.writeU32(u, l, U);
      l += 4;

      for (var y = 0; y < U; ) u[l++] = t[y++];

      h += k;
      w -= k;
    }
  }

  module408.writeU32(u, l, 0);
  l += 4;
  return l;
};

exports.decompress = function (o, n) {
  var f, t;
  if (undefined === n) n = exports.decompressBound(o);
  f = exports.makeBuffer(n);
  if ((t = exports.decompressFrame(o, f)) !== n) f = l(f, 0, t);
  return f;
};

exports.compress = function (o, n) {
  var f, t;
  if (undefined === n) n = exports.compressBound(o.length);
  f = exports.makeBuffer(n);
  if ((t = exports.compressFrame(o, f)) !== n) f = l(f, 0, t);
  return f;
};
