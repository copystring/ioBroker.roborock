!(function () {
  'use strict';

  var ERROR = 'input is invalid type',
    WINDOW = 'object' == typeof window,
    root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) WINDOW = false;
  var WEB_WORKER = !WINDOW && 'object' == typeof self,
    NODE_JS = !root.JS_MD5_NO_NODE_JS && 'object' == typeof process && process.versions && process.versions.node;
  if (NODE_JS) root = globals;
  else if (WEB_WORKER) root = self;
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && 'object' == typeof module && module.exports,
    AMD = 'function' == typeof define && define.amd,
    ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
    HEX_CHARS = '0123456789abcdef'.split(''),
    EXTRA = [128, 32768, 8388608, -2147483648],
    SHIFT = [0, 8, 16, 24],
    OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'],
    BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
    blocks = [],
    buffer8;

  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (!(!root.JS_MD5_NO_NODE_JS && Array.isArray))
    Array.isArray = function (t) {
      return '[object Array]' === Object.prototype.toString.call(t);
    };
  if (!(!ARRAY_BUFFER || (!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView)))
    ArrayBuffer.isView = function (t) {
      return 'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
    };

  var createOutputMethod = function (t) {
      return function (s) {
        return new Md5(true).update(s)[t]();
      };
    },
    createMethod = function () {
      var t = createOutputMethod('hex');
      if (NODE_JS) t = nodeWrap(t);

      t.create = function () {
        return new Md5();
      };

      t.update = function (s) {
        return t.create().update(s);
      };

      for (var s = 0; s < OUTPUT_TYPES.length; ++s) {
        var o = OUTPUT_TYPES[s];
        t[o] = createOutputMethod(o);
      }

      return t;
    },
    nodeWrap = function nodeWrap(method) {
      var crypto = eval("require('crypto')"),
        Buffer = eval("require('buffer').Buffer"),
        nodeMethod = function (t) {
          if ('string' == typeof t) return crypto.createHash('md5').update(t, 'utf8').digest('hex');
          if (null === t || undefined === t) throw ERROR;
          if (t.constructor === ArrayBuffer) t = new Uint8Array(t);
          return Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === Buffer ? crypto.createHash('md5').update(new Buffer(t)).digest('hex') : method(t);
        };

      return nodeMethod;
    };

  function Md5(t) {
    if (t) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else if (ARRAY_BUFFER) {
      var s = new ArrayBuffer(68);
      this.buffer8 = new Uint8Array(s);
      this.blocks = new Uint32Array(s);
    } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  Md5.prototype.update = function (t) {
    if (!this.finalized) {
      var s,
        o = typeof t;

      if ('string' !== o) {
        if ('object' !== o) throw ERROR;
        if (null === t) throw ERROR;
        if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t);
        else if (!(Array.isArray(t) || (ARRAY_BUFFER && ArrayBuffer.isView(t)))) throw ERROR;
        s = true;
      }

      for (var h, f, n = 0, A = t.length, u = this.blocks, R = this.buffer8; n < A; ) {
        if (
          (this.hashed &&
            ((this.hashed = false), (u[0] = u[16]), (u[16] = u[1] = u[2] = u[3] = u[4] = u[5] = u[6] = u[7] = u[8] = u[9] = u[10] = u[11] = u[12] = u[13] = u[14] = u[15] = 0)),
          s)
        ) {
          if (ARRAY_BUFFER) for (f = this.start; n < A && f < 64; ++n) R[f++] = t[n];
          else for (f = this.start; n < A && f < 64; ++n) u[f >> 2] |= t[n] << SHIFT[3 & f++];
        } else if (ARRAY_BUFFER)
          for (f = this.start; n < A && f < 64; ++n)
            (h = t.charCodeAt(n)) < 128
              ? (R[f++] = h)
              : h < 2048
              ? ((R[f++] = 192 | (h >> 6)), (R[f++] = 128 | (63 & h)))
              : h < 55296 || h >= 57344
              ? ((R[f++] = 224 | (h >> 12)), (R[f++] = 128 | ((h >> 6) & 63)), (R[f++] = 128 | (63 & h)))
              : ((h = 65536 + (((1023 & h) << 10) | (1023 & t.charCodeAt(++n)))),
                (R[f++] = 240 | (h >> 18)),
                (R[f++] = 128 | ((h >> 12) & 63)),
                (R[f++] = 128 | ((h >> 6) & 63)),
                (R[f++] = 128 | (63 & h)));
        else
          for (f = this.start; n < A && f < 64; ++n)
            (h = t.charCodeAt(n)) < 128
              ? (u[f >> 2] |= h << SHIFT[3 & f++])
              : h < 2048
              ? ((u[f >> 2] |= (192 | (h >> 6)) << SHIFT[3 & f++]), (u[f >> 2] |= (128 | (63 & h)) << SHIFT[3 & f++]))
              : h < 55296 || h >= 57344
              ? ((u[f >> 2] |= (224 | (h >> 12)) << SHIFT[3 & f++]), (u[f >> 2] |= (128 | ((h >> 6) & 63)) << SHIFT[3 & f++]), (u[f >> 2] |= (128 | (63 & h)) << SHIFT[3 & f++]))
              : ((h = 65536 + (((1023 & h) << 10) | (1023 & t.charCodeAt(++n)))),
                (u[f >> 2] |= (240 | (h >> 18)) << SHIFT[3 & f++]),
                (u[f >> 2] |= (128 | ((h >> 12) & 63)) << SHIFT[3 & f++]),
                (u[f >> 2] |= (128 | ((h >> 6) & 63)) << SHIFT[3 & f++]),
                (u[f >> 2] |= (128 | (63 & h)) << SHIFT[3 & f++]));
        this.lastByteIndex = f;
        this.bytes += f - this.start;

        if (f >= 64) {
          this.start = f - 64;
          this.hash();
          this.hashed = true;
        } else this.start = f;
      }

      if (this.bytes > 4294967295) {
        this.hBytes += (this.bytes / 4294967296) << 0;
        this.bytes = this.bytes % 4294967296;
      }

      return this;
    }
  };

  Md5.prototype.finalize = function () {
    if (!this.finalized) {
      this.finalized = true;
      var t = this.blocks,
        s = this.lastByteIndex;
      t[s >> 2] |= EXTRA[3 & s];

      if (s >= 56) {
        if (!this.hashed) this.hash();
        t[0] = t[16];
        t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0;
      }

      t[14] = this.bytes << 3;
      t[15] = (this.hBytes << 3) | (this.bytes >>> 29);
      this.hash();
    }
  };

  Md5.prototype.hash = function () {
    var t,
      s,
      o,
      h,
      f,
      n,
      A = this.blocks;
    if (this.first)
      s =
        ((((s =
          ((t = ((((t = A[0] - 680876937) << 7) | (t >>> 25)) - 271733879) << 0) ^
            ((o =
              ((((o = (-271733879 ^ ((h = ((((h = (-1732584194 ^ (2004318071 & t)) + A[1] - 117830708) << 12) | (h >>> 20)) + t) << 0) & (-271733879 ^ t))) + A[2] - 1126478375) <<
                17) |
                (o >>> 15)) +
                h) <<
              0) &
              (h ^ t))) +
          A[3] -
          1316259209) <<
          22) |
          (s >>> 10)) +
          o) <<
        0;
    else {
      t = this.h0;
      s = this.h1;
      o = this.h2;
      s =
        ((((s +=
          ((t = ((((t += ((h = this.h3) ^ (s & (o ^ h))) + A[0] - 680876936) << 7) | (t >>> 25)) + s) << 0) ^
            ((o =
              ((((o += (s ^ ((h = ((((h += (o ^ (t & (s ^ o))) + A[1] - 389564586) << 12) | (h >>> 20)) + t) << 0) & (t ^ s))) + A[2] + 606105819) << 17) | (o >>> 15)) + h) << 0) &
              (h ^ t))) +
          A[3] -
          1044525330) <<
          22) |
          (s >>> 10)) +
          o) <<
        0;
    }
    s =
      ((((s +=
        ((t = ((((t += (h ^ (s & (o ^ h))) + A[4] - 176418897) << 7) | (t >>> 25)) + s) << 0) ^
          ((o =
            ((((o += (s ^ ((h = ((((h += (o ^ (t & (s ^ o))) + A[5] + 1200080426) << 12) | (h >>> 20)) + t) << 0) & (t ^ s))) + A[6] - 1473231341) << 17) | (o >>> 15)) + h) << 0) &
            (h ^ t))) +
        A[7] -
        45705983) <<
        22) |
        (s >>> 10)) +
        o) <<
      0;
    s =
      ((((s +=
        ((t = ((((t += (h ^ (s & (o ^ h))) + A[8] + 1770035416) << 7) | (t >>> 25)) + s) << 0) ^
          ((o = ((((o += (s ^ ((h = ((((h += (o ^ (t & (s ^ o))) + A[9] - 1958414417) << 12) | (h >>> 20)) + t) << 0) & (t ^ s))) + A[10] - 42063) << 17) | (o >>> 15)) + h) << 0) &
            (h ^ t))) +
        A[11] -
        1990404162) <<
        22) |
        (s >>> 10)) +
        o) <<
      0;
    s =
      ((((s +=
        ((t = ((((t += (h ^ (s & (o ^ h))) + A[12] + 1804603682) << 7) | (t >>> 25)) + s) << 0) ^
          ((o =
            ((((o += (s ^ ((h = ((((h += (o ^ (t & (s ^ o))) + A[13] - 40341101) << 12) | (h >>> 20)) + t) << 0) & (t ^ s))) + A[14] - 1502002290) << 17) | (o >>> 15)) + h) << 0) &
            (h ^ t))) +
        A[15] +
        1236535329) <<
        22) |
        (s >>> 10)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ (o & ((t = ((((t += (o ^ (h & (s ^ o))) + A[1] - 165796510) << 5) | (t >>> 27)) + s) << 0) ^ s))) + A[6] - 1069501632) << 9) | (h >>> 23)) + t) << 0) ^
          (t & ((o = ((((o += (t ^ (s & (h ^ t))) + A[11] + 643717713) << 14) | (o >>> 18)) + h) << 0) ^ h))) +
        A[0] -
        373897302) <<
        20) |
        (s >>> 12)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ (o & ((t = ((((t += (o ^ (h & (s ^ o))) + A[5] - 701558691) << 5) | (t >>> 27)) + s) << 0) ^ s))) + A[10] + 38016083) << 9) | (h >>> 23)) + t) << 0) ^
          (t & ((o = ((((o += (t ^ (s & (h ^ t))) + A[15] - 660478335) << 14) | (o >>> 18)) + h) << 0) ^ h))) +
        A[4] -
        405537848) <<
        20) |
        (s >>> 12)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ (o & ((t = ((((t += (o ^ (h & (s ^ o))) + A[9] + 568446438) << 5) | (t >>> 27)) + s) << 0) ^ s))) + A[14] - 1019803690) << 9) | (h >>> 23)) + t) << 0) ^
          (t & ((o = ((((o += (t ^ (s & (h ^ t))) + A[3] - 187363961) << 14) | (o >>> 18)) + h) << 0) ^ h))) +
        A[8] +
        1163531501) <<
        20) |
        (s >>> 12)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ (o & ((t = ((((t += (o ^ (h & (s ^ o))) + A[13] - 1444681467) << 5) | (t >>> 27)) + s) << 0) ^ s))) + A[2] - 51403784) << 9) | (h >>> 23)) + t) << 0) ^
          (t & ((o = ((((o += (t ^ (s & (h ^ t))) + A[7] + 1735328473) << 14) | (o >>> 18)) + h) << 0) ^ h))) +
        A[12] -
        1926607734) <<
        20) |
        (s >>> 12)) +
        o) <<
      0;
    s =
      ((((s +=
        ((n = (h = ((((h += ((f = s ^ o) ^ (t = ((((t += (f ^ h) + A[5] - 378558) << 4) | (t >>> 28)) + s) << 0)) + A[8] - 2022574463) << 11) | (h >>> 21)) + t) << 0) ^ t) ^
          (o = ((((o += (n ^ s) + A[11] + 1839030562) << 16) | (o >>> 16)) + h) << 0)) +
        A[14] -
        35309556) <<
        23) |
        (s >>> 9)) +
        o) <<
      0;
    s =
      ((((s +=
        ((n = (h = ((((h += ((f = s ^ o) ^ (t = ((((t += (f ^ h) + A[1] - 1530992060) << 4) | (t >>> 28)) + s) << 0)) + A[4] + 1272893353) << 11) | (h >>> 21)) + t) << 0) ^ t) ^
          (o = ((((o += (n ^ s) + A[7] - 155497632) << 16) | (o >>> 16)) + h) << 0)) +
        A[10] -
        1094730640) <<
        23) |
        (s >>> 9)) +
        o) <<
      0;
    s =
      ((((s +=
        ((n = (h = ((((h += ((f = s ^ o) ^ (t = ((((t += (f ^ h) + A[13] + 681279174) << 4) | (t >>> 28)) + s) << 0)) + A[0] - 358537222) << 11) | (h >>> 21)) + t) << 0) ^ t) ^
          (o = ((((o += (n ^ s) + A[3] - 722521979) << 16) | (o >>> 16)) + h) << 0)) +
        A[6] +
        76029189) <<
        23) |
        (s >>> 9)) +
        o) <<
      0;
    s =
      ((((s +=
        ((n = (h = ((((h += ((f = s ^ o) ^ (t = ((((t += (f ^ h) + A[9] - 640364487) << 4) | (t >>> 28)) + s) << 0)) + A[12] - 421815835) << 11) | (h >>> 21)) + t) << 0) ^ t) ^
          (o = ((((o += (n ^ s) + A[15] + 530742520) << 16) | (o >>> 16)) + h) << 0)) +
        A[2] -
        995338651) <<
        23) |
        (s >>> 9)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ ((t = ((((t += (o ^ (s | ~h)) + A[0] - 198630844) << 6) | (t >>> 26)) + s) << 0) | ~o)) + A[7] + 1126891415) << 10) | (h >>> 22)) + t) << 0) ^
          ((o = ((((o += (t ^ (h | ~s)) + A[14] - 1416354905) << 15) | (o >>> 17)) + h) << 0) | ~t)) +
        A[5] -
        57434055) <<
        21) |
        (s >>> 11)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ ((t = ((((t += (o ^ (s | ~h)) + A[12] + 1700485571) << 6) | (t >>> 26)) + s) << 0) | ~o)) + A[3] - 1894986606) << 10) | (h >>> 22)) + t) << 0) ^
          ((o = ((((o += (t ^ (h | ~s)) + A[10] - 1051523) << 15) | (o >>> 17)) + h) << 0) | ~t)) +
        A[1] -
        2054922799) <<
        21) |
        (s >>> 11)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ ((t = ((((t += (o ^ (s | ~h)) + A[8] + 1873313359) << 6) | (t >>> 26)) + s) << 0) | ~o)) + A[15] - 30611744) << 10) | (h >>> 22)) + t) << 0) ^
          ((o = ((((o += (t ^ (h | ~s)) + A[6] - 1560198380) << 15) | (o >>> 17)) + h) << 0) | ~t)) +
        A[13] +
        1309151649) <<
        21) |
        (s >>> 11)) +
        o) <<
      0;
    s =
      ((((s +=
        ((h = ((((h += (s ^ ((t = ((((t += (o ^ (s | ~h)) + A[4] - 145523070) << 6) | (t >>> 26)) + s) << 0) | ~o)) + A[11] - 1120210379) << 10) | (h >>> 22)) + t) << 0) ^
          ((o = ((((o += (t ^ (h | ~s)) + A[2] + 718787259) << 15) | (o >>> 17)) + h) << 0) | ~t)) +
        A[9] -
        343485551) <<
        21) |
        (s >>> 11)) +
        o) <<
      0;

    if (this.first) {
      this.h0 = (t + 1732584193) << 0;
      this.h1 = (s - 271733879) << 0;
      this.h2 = (o - 1732584194) << 0;
      this.h3 = (h + 271733878) << 0;
      this.first = false;
    } else {
      this.h0 = (this.h0 + t) << 0;
      this.h1 = (this.h1 + s) << 0;
      this.h2 = (this.h2 + o) << 0;
      this.h3 = (this.h3 + h) << 0;
    }
  };

  Md5.prototype.hex = function () {
    this.finalize();
    var t = this.h0,
      s = this.h1,
      o = this.h2,
      h = this.h3;
    return (
      HEX_CHARS[(t >> 4) & 15] +
      HEX_CHARS[15 & t] +
      HEX_CHARS[(t >> 12) & 15] +
      HEX_CHARS[(t >> 8) & 15] +
      HEX_CHARS[(t >> 20) & 15] +
      HEX_CHARS[(t >> 16) & 15] +
      HEX_CHARS[(t >> 28) & 15] +
      HEX_CHARS[(t >> 24) & 15] +
      HEX_CHARS[(s >> 4) & 15] +
      HEX_CHARS[15 & s] +
      HEX_CHARS[(s >> 12) & 15] +
      HEX_CHARS[(s >> 8) & 15] +
      HEX_CHARS[(s >> 20) & 15] +
      HEX_CHARS[(s >> 16) & 15] +
      HEX_CHARS[(s >> 28) & 15] +
      HEX_CHARS[(s >> 24) & 15] +
      HEX_CHARS[(o >> 4) & 15] +
      HEX_CHARS[15 & o] +
      HEX_CHARS[(o >> 12) & 15] +
      HEX_CHARS[(o >> 8) & 15] +
      HEX_CHARS[(o >> 20) & 15] +
      HEX_CHARS[(o >> 16) & 15] +
      HEX_CHARS[(o >> 28) & 15] +
      HEX_CHARS[(o >> 24) & 15] +
      HEX_CHARS[(h >> 4) & 15] +
      HEX_CHARS[15 & h] +
      HEX_CHARS[(h >> 12) & 15] +
      HEX_CHARS[(h >> 8) & 15] +
      HEX_CHARS[(h >> 20) & 15] +
      HEX_CHARS[(h >> 16) & 15] +
      HEX_CHARS[(h >> 28) & 15] +
      HEX_CHARS[(h >> 24) & 15]
    );
  };

  Md5.prototype.toString = Md5.prototype.hex;

  Md5.prototype.digest = function () {
    this.finalize();
    var t = this.h0,
      s = this.h1,
      o = this.h2,
      h = this.h3;
    return [
      255 & t,
      (t >> 8) & 255,
      (t >> 16) & 255,
      (t >> 24) & 255,
      255 & s,
      (s >> 8) & 255,
      (s >> 16) & 255,
      (s >> 24) & 255,
      255 & o,
      (o >> 8) & 255,
      (o >> 16) & 255,
      (o >> 24) & 255,
      255 & h,
      (h >> 8) & 255,
      (h >> 16) & 255,
      (h >> 24) & 255,
    ];
  };

  Md5.prototype.array = Md5.prototype.digest;

  Md5.prototype.arrayBuffer = function () {
    this.finalize();
    var t = new ArrayBuffer(16),
      s = new Uint32Array(t);
    s[0] = this.h0;
    s[1] = this.h1;
    s[2] = this.h2;
    s[3] = this.h3;
    return t;
  };

  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  Md5.prototype.base64 = function () {
    for (var t, s, o, h = '', f = this.array(), n = 0; n < 15; ) {
      t = f[n++];
      s = f[n++];
      o = f[n++];
      h += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[63 & ((t << 4) | (s >>> 4))] + BASE64_ENCODE_CHAR[63 & ((s << 2) | (o >>> 6))] + BASE64_ENCODE_CHAR[63 & o];
    }

    t = f[n];
    h += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[(t << 4) & 63] + '==';
    return h;
  };

  var exports = createMethod();
  if (COMMON_JS) module.exports = exports;
  else {
    root.md5 = exports;
    if (AMD)
      define(function () {
        return exports;
      });
  }
})();
