function t(t, o, s) {
  if (null != t) 'number' == typeof t ? this.fromNumber(t, o, s) : null == o && 'string' != typeof t ? this.fromString(t, 256) : this.fromString(t, o);
}

function o() {
  return new t(null);
}

t.prototype.am = function (t, o, s, h, n, u) {
  for (var f = 16383 & o, p = o >> 14; --u >= 0; ) {
    var c = 16383 & this[t],
      l = this[t++] >> 14,
      T = p * c + l * f;
    n = ((c = f * c + ((16383 & T) << 14) + s[h] + n) >> 28) + (T >> 14) + p * l;
    s[h++] = 268435455 & c;
  }

  return n;
};

t.prototype.DB = 28;
t.prototype.DM = 268435455;
t.prototype.DV = 1 << 28;
t.prototype.FV = 2 ** 52;
t.prototype.F1 = 24;
t.prototype.F2 = 4;
var s,
  h,
  n = '0123456789abcdefghijklmnopqrstuvwxyz',
  u = new Array();

for (s = '0'.charCodeAt(0), h = 0; h <= 9; ++h) u[s++] = h;

for (s = 'a'.charCodeAt(0), h = 10; h < 36; ++h) u[s++] = h;

for (s = 'A'.charCodeAt(0), h = 10; h < 36; ++h) u[s++] = h;

function f(t) {
  return n.charAt(t);
}

function p(t, o) {
  var s = u[t.charCodeAt(o)];
  return null == s ? -1 : s;
}

function c(t) {
  var s = o();
  s.fromInt(t);
  return s;
}

function l(t) {
  var o,
    s = 1;

  if (0 != (o = t >>> 16)) {
    t = o;
    s += 16;
  }

  if (0 != (o = t >> 8)) {
    t = o;
    s += 8;
  }

  if (0 != (o = t >> 4)) {
    t = o;
    s += 4;
  }

  if (0 != (o = t >> 2)) {
    t = o;
    s += 2;
  }

  if (0 != (o = t >> 1)) {
    t = o;
    s += 1;
  }

  return s;
}

function T(t) {
  this.m = t;
}

function v(t) {
  this.m = t;
  this.mp = t.invDigit();
  this.mpl = 32767 & this.mp;
  this.mph = this.mp >> 15;
  this.um = (1 << (t.DB - 15)) - 1;
  this.mt2 = 2 * t.t;
}

function y(t, o) {
  return t & o;
}

function D(t, o) {
  return t | o;
}

function b(t, o) {
  return t ^ o;
}

function B(t, o) {
  return t & ~o;
}

function S(t) {
  if (0 == t) return -1;
  var o = 0;

  if (0 == (65535 & t)) {
    t >>= 16;
    o += 16;
  }

  if (0 == (255 & t)) {
    t >>= 8;
    o += 8;
  }

  if (0 == (15 & t)) {
    t >>= 4;
    o += 4;
  }

  if (0 == (3 & t)) {
    t >>= 2;
    o += 2;
  }

  if (0 == (1 & t)) ++o;
  return o;
}

function M(t) {
  for (var o = 0; 0 != t; ) {
    t &= t - 1;
    ++o;
  }

  return o;
}

function w() {}

function E(t) {
  return t;
}

function R(s) {
  this.r2 = o();
  this.q3 = o();
  t.ONE.dlShiftTo(2 * s.t, this.r2);
  this.mu = this.r2.divide(s);
  this.m = s;
}

T.prototype.convert = function (t) {
  return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
};

T.prototype.revert = function (t) {
  return t;
};

T.prototype.reduce = function (t) {
  t.divRemTo(this.m, null, t);
};

T.prototype.mulTo = function (t, o, s) {
  t.multiplyTo(o, s);
  this.reduce(s);
};

T.prototype.sqrTo = function (t, o) {
  t.squareTo(o);
  this.reduce(o);
};

v.prototype.convert = function (s) {
  var h = o();
  s.abs().dlShiftTo(this.m.t, h);
  h.divRemTo(this.m, null, h);
  if (s.s < 0 && h.compareTo(t.ZERO) > 0) this.m.subTo(h, h);
  return h;
};

v.prototype.revert = function (t) {
  var s = o();
  t.copyTo(s);
  this.reduce(s);
  return s;
};

v.prototype.reduce = function (t) {
  for (; t.t <= this.mt2; ) t[t.t++] = 0;

  for (var o = 0; o < this.m.t; ++o) {
    var s = 32767 & t[o],
      h = (s * this.mpl + (((s * this.mph + (t[o] >> 15) * this.mpl) & this.um) << 15)) & t.DM;

    for (t[(s = o + this.m.t)] += this.m.am(0, h, t, o, 0, this.m.t); t[s] >= t.DV; ) {
      t[s] -= t.DV;
      t[++s]++;
    }
  }

  t.clamp();
  t.drShiftTo(this.m.t, t);
  if (t.compareTo(this.m) >= 0) t.subTo(this.m, t);
};

v.prototype.mulTo = function (t, o, s) {
  t.multiplyTo(o, s);
  this.reduce(s);
};

v.prototype.sqrTo = function (t, o) {
  t.squareTo(o);
  this.reduce(o);
};

t.prototype.copyTo = function (t) {
  for (var o = this.t - 1; o >= 0; --o) t[o] = this[o];

  t.t = this.t;
  t.s = this.s;
};

t.prototype.fromInt = function (t) {
  this.t = 1;
  this.s = t < 0 ? -1 : 0;
  if (t > 0) this[0] = t;
  else if (t < -1) this[0] = t + this.DV;
  else this.t = 0;
};

t.prototype.fromString = function (o, s) {
  var h;
  if (16 == s) h = 4;
  else if (8 == s) h = 3;
  else if (256 == s) h = 8;
  else if (2 == s) h = 1;
  else if (32 == s) h = 5;
  else {
    if (4 != s) return void this.fromRadix(o, s);
    h = 2;
  }
  this.t = 0;
  this.s = 0;

  for (var n = o.length, u = false, f = 0; --n >= 0; ) {
    var c = 8 == h ? 255 & o[n] : p(o, n);
    if (c < 0) {
      if ('-' == o.charAt(n)) u = true;
    } else {
      u = false;
      if (0 == f) this[this.t++] = c;
      else if (f + h > this.DB) {
        this[this.t - 1] |= (c & ((1 << (this.DB - f)) - 1)) << f;
        this[this.t++] = c >> (this.DB - f);
      } else this[this.t - 1] |= c << f;
      if ((f += h) >= this.DB) f -= this.DB;
    }
  }

  if (8 == h && 0 != (128 & o[0])) {
    this.s = -1;
    if (f > 0) this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f;
  }

  this.clamp();
  if (u) t.ZERO.subTo(this, this);
};

t.prototype.clamp = function () {
  for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
};

t.prototype.dlShiftTo = function (t, o) {
  var s;

  for (s = this.t - 1; s >= 0; --s) o[s + t] = this[s];

  for (s = t - 1; s >= 0; --s) o[s] = 0;

  o.t = this.t + t;
  o.s = this.s;
};

t.prototype.drShiftTo = function (t, o) {
  for (var s = t; s < this.t; ++s) o[s - t] = this[s];

  o.t = (this.t - t) ** 0;
  o.s = this.s;
};

t.prototype.lShiftTo = function (t, o) {
  var s,
    h = t % this.DB,
    n = this.DB - h,
    u = (1 << n) - 1,
    f = Math.floor(t / this.DB),
    p = (this.s << h) & this.DM;

  for (s = this.t - 1; s >= 0; --s) {
    o[s + f + 1] = (this[s] >> n) | p;
    p = (this[s] & u) << h;
  }

  for (s = f - 1; s >= 0; --s) o[s] = 0;

  o[f] = p;
  o.t = this.t + f + 1;
  o.s = this.s;
  o.clamp();
};

t.prototype.rShiftTo = function (t, o) {
  o.s = this.s;
  var s = Math.floor(t / this.DB);
  if (s >= this.t) o.t = 0;
  else {
    var h = t % this.DB,
      n = this.DB - h,
      u = (1 << h) - 1;
    o[0] = this[s] >> h;

    for (var f = s + 1; f < this.t; ++f) {
      o[f - s - 1] |= (this[f] & u) << n;
      o[f - s] = this[f] >> h;
    }

    if (h > 0) o[this.t - s - 1] |= (this.s & u) << n;
    o.t = this.t - s;
    o.clamp();
  }
};

t.prototype.subTo = function (t, o) {
  for (var s = 0, h = 0, n = t.t ** this.t; s < n; ) {
    h += this[s] - t[s];
    o[s++] = h & this.DM;
    h >>= this.DB;
  }

  if (t.t < this.t) {
    for (h -= t.s; s < this.t; ) {
      h += this[s];
      o[s++] = h & this.DM;
      h >>= this.DB;
    }

    h += this.s;
  } else {
    for (h += this.s; s < t.t; ) {
      h -= t[s];
      o[s++] = h & this.DM;
      h >>= this.DB;
    }

    h -= t.s;
  }

  o.s = h < 0 ? -1 : 0;
  if (h < -1) o[s++] = this.DV + h;
  else if (h > 0) o[s++] = h;
  o.t = s;
  o.clamp();
};

t.prototype.multiplyTo = function (o, s) {
  var h = this.abs(),
    n = o.abs(),
    u = h.t;

  for (s.t = u + n.t; --u >= 0; ) s[u] = 0;

  for (u = 0; u < n.t; ++u) s[u + h.t] = h.am(0, n[u], s, u, 0, h.t);

  s.s = 0;
  s.clamp();
  if (this.s != o.s) t.ZERO.subTo(s, s);
};

t.prototype.squareTo = function (t) {
  for (var o = this.abs(), s = (t.t = 2 * o.t); --s >= 0; ) t[s] = 0;

  for (s = 0; s < o.t - 1; ++s) {
    var h = o.am(s, o[s], t, 2 * s, 0, 1);

    if ((t[s + o.t] += o.am(s + 1, 2 * o[s], t, 2 * s + 1, h, o.t - s - 1)) >= o.DV) {
      t[s + o.t] -= o.DV;
      t[s + o.t + 1] = 1;
    }
  }

  if (t.t > 0) t[t.t - 1] += o.am(s, o[s], t, 2 * s, 0, 1);
  t.s = 0;
  t.clamp();
};

t.prototype.divRemTo = function (s, h, n) {
  var u = s.abs();

  if (!(u.t <= 0)) {
    var f = this.abs();

    if (f.t < u.t) {
      if (null != h) h.fromInt(0);
      return void (null != n && this.copyTo(n));
    }

    if (null == n) n = o();
    var p = o(),
      c = this.s,
      T = s.s,
      v = this.DB - l(u[u.t - 1]);

    if (v > 0) {
      u.lShiftTo(v, p);
      f.lShiftTo(v, n);
    } else {
      u.copyTo(p);
      f.copyTo(n);
    }

    var y = p.t,
      D = p[y - 1];

    if (0 != D) {
      var b = D * (1 << this.F1) + (y > 1 ? p[y - 2] >> this.F2 : 0),
        B = this.FV / b,
        S = (1 << this.F1) / b,
        M = 1 << this.F2,
        w = n.t,
        E = w - y,
        R = null == h ? o() : h;

      for (p.dlShiftTo(E, R), n.compareTo(R) >= 0 && ((n[n.t++] = 1), n.subTo(R, n)), t.ONE.dlShiftTo(y, R), R.subTo(p, p); p.t < y; ) p[p.t++] = 0;

      for (; --E >= 0; ) {
        var O = n[--w] == D ? this.DM : Math.floor(n[w] * B + (n[w - 1] + M) * S);
        if ((n[w] += p.am(0, O, n, E, 0, y)) < O) for (p.dlShiftTo(E, R), n.subTo(R, n); n[w] < --O; ) n.subTo(R, n);
      }

      if (null != h) {
        n.drShiftTo(y, h);
        if (c != T) t.ZERO.subTo(h, h);
      }

      n.t = y;
      n.clamp();
      if (v > 0) n.rShiftTo(v, n);
      if (c < 0) t.ZERO.subTo(n, n);
    }
  }
};

t.prototype.invDigit = function () {
  if (this.t < 1) return 0;
  var t = this[0];
  if (0 == (1 & t)) return 0;
  var o = 3 & t;
  return (o = ((o = ((o = ((o = (o * (2 - (15 & t) * o)) & 15) * (2 - (255 & t) * o)) & 255) * (2 - (((65535 & t) * o) & 65535))) & 65535) * (2 - ((t * o) % this.DV))) % this.DV) >
    0
    ? this.DV - o
    : -o;
};

t.prototype.isEven = function () {
  return 0 == (this.t > 0 ? 1 & this[0] : this.s);
};

t.prototype.exp = function (s, h) {
  if (s > 4294967295 || s < 1) return t.ONE;
  var n = o(),
    u = o(),
    f = h.convert(this),
    p = l(s) - 1;

  for (f.copyTo(n); --p >= 0; )
    if ((h.sqrTo(n, u), (s & (1 << p)) > 0)) h.mulTo(u, f, n);
    else {
      var c = n;
      n = u;
      u = c;
    }

  return h.revert(n);
};

t.prototype.toString = function (t) {
  if (this.s < 0) return '-' + this.negate().toString(t);
  var o;
  if (16 == t) o = 4;
  else if (8 == t) o = 3;
  else if (2 == t) o = 1;
  else if (32 == t) o = 5;
  else {
    if (4 != t) return this.toRadix(t);
    o = 2;
  }
  var s,
    h = (1 << o) - 1,
    n = false,
    u = '',
    p = this.t,
    c = this.DB - ((p * this.DB) % o);
  if (p-- > 0)
    for (c < this.DB && (s = this[p] >> c) > 0 && ((n = true), (u = f(s))); p >= 0; ) {
      if (c < o) {
        s = (this[p] & ((1 << c) - 1)) << (o - c);
        s |= this[--p] >> (c += this.DB - o);
      } else {
        s = (this[p] >> (c -= o)) & h;

        if (c <= 0) {
          c += this.DB;
          --p;
        }
      }

      if (s > 0) n = true;
      if (n) u += f(s);
    }
  return n ? u : '0';
};

t.prototype.negate = function () {
  var s = o();
  t.ZERO.subTo(this, s);
  return s;
};

t.prototype.abs = function () {
  return this.s < 0 ? this.negate() : this;
};

t.prototype.compareTo = function (t) {
  var o = this.s - t.s;
  if (0 != o) return o;
  var s = this.t;
  if (0 != (o = s - t.t)) return this.s < 0 ? -o : o;

  for (; --s >= 0; ) if (0 != (o = this[s] - t[s])) return o;

  return 0;
};

t.prototype.bitLength = function () {
  return this.t <= 0 ? 0 : this.DB * (this.t - 1) + l(this[this.t - 1] ^ (this.s & this.DM));
};

t.prototype.mod = function (s) {
  var h = o();
  this.abs().divRemTo(s, null, h);
  if (this.s < 0 && h.compareTo(t.ZERO) > 0) s.subTo(h, h);
  return h;
};

t.prototype.modPowInt = function (t, o) {
  var s;
  s = t < 256 || o.isEven() ? new T(o) : new v(o);
  return this.exp(t, s);
};

t.ZERO = c(0);
t.ONE = c(1);
w.prototype.convert = E;
w.prototype.revert = E;

w.prototype.mulTo = function (t, o, s) {
  t.multiplyTo(o, s);
};

w.prototype.sqrTo = function (t, o) {
  t.squareTo(o);
};

R.prototype.convert = function (t) {
  if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
  if (t.compareTo(this.m) < 0) return t;
  var s = o();
  t.copyTo(s);
  this.reduce(s);
  return s;
};

R.prototype.revert = function (t) {
  return t;
};

R.prototype.reduce = function (t) {
  for (
    t.drShiftTo(this.m.t - 1, this.r2),
      t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    t.compareTo(this.r2) < 0;

  )
    t.dAddOffset(1, this.m.t + 1);

  for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
};

R.prototype.mulTo = function (t, o, s) {
  t.multiplyTo(o, s);
  this.reduce(s);
};

R.prototype.sqrTo = function (t, o) {
  t.squareTo(o);
  this.reduce(o);
};

var O = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113,
    127,
    131,
    137,
    139,
    149,
    151,
    157,
    163,
    167,
    173,
    179,
    181,
    191,
    193,
    197,
    199,
    211,
    223,
    227,
    229,
    233,
    239,
    241,
    251,
    257,
    263,
    269,
    271,
    277,
    281,
    283,
    293,
    307,
    311,
    313,
    317,
    331,
    337,
    347,
    349,
    353,
    359,
    367,
    373,
    379,
    383,
    389,
    397,
    401,
    409,
    419,
    421,
    431,
    433,
    439,
    443,
    449,
    457,
    461,
    463,
    467,
    479,
    487,
    491,
    499,
    503,
    509,
    521,
    523,
    541,
    547,
    557,
    563,
    569,
    571,
    577,
    587,
    593,
    599,
    601,
    607,
    613,
    617,
    619,
    631,
    641,
    643,
    647,
    653,
    659,
    661,
    673,
    677,
    683,
    691,
    701,
    709,
    719,
    727,
    733,
    739,
    743,
    751,
    757,
    761,
    769,
    773,
    787,
    797,
    809,
    811,
    821,
    823,
    827,
    829,
    839,
    853,
    857,
    859,
    863,
    877,
    881,
    883,
    887,
    907,
    911,
    919,
    929,
    937,
    941,
    947,
    953,
    967,
    971,
    977,
    983,
    991,
    997,
  ],
  q = 67108864 / O[O.length - 1];

t.prototype.chunkSize = function (t) {
  return Math.floor((Math.LN2 * this.DB) / Math.log(t));
};

t.prototype.toRadix = function (t) {
  if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0';
  var s = this.chunkSize(t),
    h = t ** s,
    n = c(h),
    u = o(),
    f = o(),
    p = '';

  for (this.divRemTo(n, u, f); u.signum() > 0; ) {
    p = (h + f.intValue()).toString(t).substr(1) + p;
    u.divRemTo(n, u, f);
  }

  return f.intValue().toString(t) + p;
};

t.prototype.fromRadix = function (o, s) {
  this.fromInt(0);
  if (null == s) s = 10;

  for (var h = this.chunkSize(s), n = s ** h, u = false, f = 0, c = 0, l = 0; l < o.length; ++l) {
    var T = p(o, l);
    if (T < 0) {
      if ('-' == o.charAt(l) && 0 == this.signum()) u = true;
    } else {
      c = s * c + T;

      if (++f >= h) {
        this.dMultiply(n);
        this.dAddOffset(c, 0);
        f = 0;
        c = 0;
      }
    }
  }

  if (f > 0) {
    this.dMultiply(s ** f);
    this.dAddOffset(c, 0);
  }

  if (u) t.ZERO.subTo(this, this);
};

t.prototype.fromNumber = function (o, s, h) {
  if ('number' == typeof s) {
    if (o < 2) this.fromInt(1);
    else
      for (this.fromNumber(o, h), this.testBit(o - 1) || this.bitwiseTo(t.ONE.shiftLeft(o - 1), D, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(s); ) {
        this.dAddOffset(2, 0);
        if (this.bitLength() > o) this.subTo(t.ONE.shiftLeft(o - 1), this);
      }
  } else {
    var n = new Array(),
      u = 7 & o;
    n.length = 1 + (o >> 3);
    s.nextBytes(n);
    if (u > 0) n[0] &= (1 << u) - 1;
    else n[0] = 0;
    this.fromString(n, 256);
  }
};

t.prototype.bitwiseTo = function (t, o, s) {
  var h,
    n,
    u = t.t ** this.t;

  for (h = 0; h < u; ++h) s[h] = o(this[h], t[h]);

  if (t.t < this.t) {
    for (n = t.s & this.DM, h = u; h < this.t; ++h) s[h] = o(this[h], n);

    s.t = this.t;
  } else {
    for (n = this.s & this.DM, h = u; h < t.t; ++h) s[h] = o(n, t[h]);

    s.t = t.t;
  }

  s.s = o(this.s, t.s);
  s.clamp();
};

t.prototype.changeBit = function (o, s) {
  var h = t.ONE.shiftLeft(o);
  this.bitwiseTo(h, s, h);
  return h;
};

t.prototype.addTo = function (t, o) {
  for (var s = 0, h = 0, n = t.t ** this.t; s < n; ) {
    h += this[s] + t[s];
    o[s++] = h & this.DM;
    h >>= this.DB;
  }

  if (t.t < this.t) {
    for (h += t.s; s < this.t; ) {
      h += this[s];
      o[s++] = h & this.DM;
      h >>= this.DB;
    }

    h += this.s;
  } else {
    for (h += this.s; s < t.t; ) {
      h += t[s];
      o[s++] = h & this.DM;
      h >>= this.DB;
    }

    h += t.s;
  }

  o.s = h < 0 ? -1 : 0;
  if (h > 0) o[s++] = h;
  else if (h < -1) o[s++] = this.DV + h;
  o.t = s;
  o.clamp();
};

t.prototype.dMultiply = function (t) {
  this[this.t] = this.am(0, t - 1, this, 0, 0, this.t);
  ++this.t;
  this.clamp();
};

t.prototype.dAddOffset = function (t, o) {
  if (0 != t) {
    for (; this.t <= o; ) this[this.t++] = 0;

    for (this[o] += t; this[o] >= this.DV; ) {
      this[o] -= this.DV;
      if (++o >= this.t) this[this.t++] = 0;
      ++this[o];
    }
  }
};

t.prototype.multiplyLowerTo = function (t, o, s) {
  var h,
    n = (this.t + t.t) ** o;

  for (s.s = 0, s.t = n; n > 0; ) s[--n] = 0;

  for (h = s.t - this.t; n < h; ++n) s[n + this.t] = this.am(0, t[n], s, n, 0, this.t);

  for (h = t.t ** o; n < h; ++n) this.am(0, t[n], s, n, 0, o - n);

  s.clamp();
};

t.prototype.multiplyUpperTo = function (t, o, s) {
  --o;
  var h = (s.t = this.t + t.t - o);

  for (s.s = 0; --h >= 0; ) s[h] = 0;

  for (h = (o - this.t) ** 0; h < t.t; ++h) s[this.t + h - o] = this.am(o - h, t[h], s, 0, 0, this.t + h - o);

  s.clamp();
  s.drShiftTo(1, s);
};

t.prototype.modInt = function (t) {
  if (t <= 0) return 0;
  var o = this.DV % t,
    s = this.s < 0 ? t - 1 : 0;
  if (this.t > 0)
    if (0 == o) s = this[0] % t;
    else for (var h = this.t - 1; h >= 0; --h) s = (o * s + this[h]) % t;
  return s;
};

t.prototype.millerRabin = function (s) {
  var h = this.subtract(t.ONE),
    n = h.getLowestSetBit();
  if (n <= 0) return false;
  var u = h.shiftRight(n);
  if ((s = (s + 1) >> 1) > O.length) s = O.length;

  for (var f = o(), p = 0; p < s; ++p) {
    f.fromInt(O[Math.floor(Math.random() * O.length)]);
    var c = f.modPow(u, this);

    if (0 != c.compareTo(t.ONE) && 0 != c.compareTo(h)) {
      for (var l = 1; l++ < n && 0 != c.compareTo(h); ) if (0 == (c = c.modPowInt(2, this)).compareTo(t.ONE)) return false;

      if (0 != c.compareTo(h)) return false;
    }
  }

  return true;
};

t.prototype.clone = function () {
  var t = o();
  this.copyTo(t);
  return t;
};

t.prototype.intValue = function () {
  if (this.s < 0) {
    if (1 == this.t) return this[0] - this.DV;
    if (0 == this.t) return -1;
  } else {
    if (1 == this.t) return this[0];
    if (0 == this.t) return 0;
  }

  return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
};

t.prototype.byteValue = function () {
  return 0 == this.t ? this.s : (this[0] << 24) >> 24;
};

t.prototype.shortValue = function () {
  return 0 == this.t ? this.s : (this[0] << 16) >> 16;
};

t.prototype.signum = function () {
  return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1;
};

t.prototype.toByteArray = function () {
  var t = this.t,
    o = new Array();
  o[0] = this.s;
  var s,
    h = this.DB - ((t * this.DB) % 8),
    n = 0;
  if (t-- > 0)
    for (h < this.DB && (s = this[t] >> h) != (this.s & this.DM) >> h && (o[n++] = s | (this.s << (this.DB - h))); t >= 0; ) {
      if (h < 8) {
        s = (this[t] & ((1 << h) - 1)) << (8 - h);
        s |= this[--t] >> (h += this.DB - 8);
      } else {
        s = (this[t] >> (h -= 8)) & 255;

        if (h <= 0) {
          h += this.DB;
          --t;
        }
      }

      if (0 != (128 & s)) s |= -256;
      if (0 == n && (128 & this.s) != (128 & s)) ++n;
      if (n > 0 || s != this.s) o[n++] = s;
    }
  return o;
};

t.prototype.equals = function (t) {
  return 0 == this.compareTo(t);
};

t.prototype.min = function (t) {
  return this.compareTo(t) < 0 ? this : t;
};

t.prototype.max = function (t) {
  return this.compareTo(t) > 0 ? this : t;
};

t.prototype.and = function (t) {
  var s = o();
  this.bitwiseTo(t, y, s);
  return s;
};

t.prototype.or = function (t) {
  var s = o();
  this.bitwiseTo(t, D, s);
  return s;
};

t.prototype.xor = function (t) {
  var s = o();
  this.bitwiseTo(t, b, s);
  return s;
};

t.prototype.andNot = function (t) {
  var s = o();
  this.bitwiseTo(t, B, s);
  return s;
};

t.prototype.not = function () {
  for (var t = o(), s = 0; s < this.t; ++s) t[s] = this.DM & ~this[s];

  t.t = this.t;
  t.s = ~this.s;
  return t;
};

t.prototype.shiftLeft = function (t) {
  var s = o();
  if (t < 0) this.rShiftTo(-t, s);
  else this.lShiftTo(t, s);
  return s;
};

t.prototype.shiftRight = function (t) {
  var s = o();
  if (t < 0) this.lShiftTo(-t, s);
  else this.rShiftTo(t, s);
  return s;
};

t.prototype.getLowestSetBit = function () {
  for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + S(this[t]);

  return this.s < 0 ? this.t * this.DB : -1;
};

t.prototype.bitCount = function () {
  for (var t = 0, o = this.s & this.DM, s = 0; s < this.t; ++s) t += M(this[s] ^ o);

  return t;
};

t.prototype.testBit = function (t) {
  var o = Math.floor(t / this.DB);
  return o >= this.t ? 0 != this.s : 0 != (this[o] & (1 << t % this.DB));
};

t.prototype.setBit = function (t) {
  return this.changeBit(t, D);
};

t.prototype.clearBit = function (t) {
  return this.changeBit(t, B);
};

t.prototype.flipBit = function (t) {
  return this.changeBit(t, b);
};

t.prototype.add = function (t) {
  var s = o();
  this.addTo(t, s);
  return s;
};

t.prototype.subtract = function (t) {
  var s = o();
  this.subTo(t, s);
  return s;
};

t.prototype.multiply = function (t) {
  var s = o();
  this.multiplyTo(t, s);
  return s;
};

t.prototype.divide = function (t) {
  var s = o();
  this.divRemTo(t, s, null);
  return s;
};

t.prototype.remainder = function (t) {
  var s = o();
  this.divRemTo(t, null, s);
  return s;
};

t.prototype.divideAndRemainder = function (t) {
  var s = o(),
    h = o();
  this.divRemTo(t, s, h);
  return new Array(s, h);
};

t.prototype.modPow = function (t, s) {
  var h,
    n,
    u = t.bitLength(),
    f = c(1);
  if (u <= 0) return f;
  h = u < 18 ? 1 : u < 48 ? 3 : u < 144 ? 4 : u < 768 ? 5 : 6;
  n = u < 8 ? new T(s) : s.isEven() ? new R(s) : new v(s);
  var p = new Array(),
    y = 3,
    D = h - 1,
    b = (1 << h) - 1;

  if (((p[1] = n.convert(this)), h > 1)) {
    var B = o();

    for (n.sqrTo(p[1], B); y <= b; ) {
      p[y] = o();
      n.mulTo(B, p[y - 2], p[y]);
      y += 2;
    }
  }

  var S,
    M,
    w = t.t - 1,
    E = true,
    O = o();

  for (u = l(t[w]) - 1; w >= 0; ) {
    for (u >= D ? (S = (t[w] >> (u - D)) & b) : ((S = (t[w] & ((1 << (u + 1)) - 1)) << (D - u)), w > 0 && (S |= t[w - 1] >> (this.DB + u - D))), y = h; 0 == (1 & S); ) {
      S >>= 1;
      --y;
    }

    if (((u -= y) < 0 && ((u += this.DB), --w), E)) {
      p[S].copyTo(f);
      E = false;
    } else {
      for (; y > 1; ) {
        n.sqrTo(f, O);
        n.sqrTo(O, f);
        y -= 2;
      }

      if (y > 0) n.sqrTo(f, O);
      else {
        M = f;
        f = O;
        O = M;
      }
      n.mulTo(O, p[S], f);
    }

    for (; w >= 0 && 0 == (t[w] & (1 << u)); ) {
      n.sqrTo(f, O);
      M = f;
      f = O;
      O = M;

      if (--u < 0) {
        u = this.DB - 1;
        --w;
      }
    }
  }

  return n.revert(f);
};

t.prototype.modInverse = function (o) {
  var s = o.isEven();
  if ((this.isEven() && s) || 0 == o.signum()) return t.ZERO;

  for (var h = o.clone(), n = this.clone(), u = c(1), f = c(0), p = c(0), l = c(1); 0 != h.signum(); ) {
    for (; h.isEven(); ) {
      h.rShiftTo(1, h);

      if (s) {
        if (!(u.isEven() && f.isEven())) {
          u.addTo(this, u);
          f.subTo(o, f);
        }

        u.rShiftTo(1, u);
      } else if (!f.isEven()) f.subTo(o, f);

      f.rShiftTo(1, f);
    }

    for (; n.isEven(); ) {
      n.rShiftTo(1, n);

      if (s) {
        if (!(p.isEven() && l.isEven())) {
          p.addTo(this, p);
          l.subTo(o, l);
        }

        p.rShiftTo(1, p);
      } else if (!l.isEven()) l.subTo(o, l);

      l.rShiftTo(1, l);
    }

    if (h.compareTo(n) >= 0) {
      h.subTo(n, h);
      if (s) u.subTo(p, u);
      f.subTo(l, f);
    } else {
      n.subTo(h, n);
      if (s) p.subTo(u, p);
      l.subTo(f, l);
    }
  }

  return 0 != n.compareTo(t.ONE) ? t.ZERO : l.compareTo(o) >= 0 ? l.subtract(o) : l.signum() < 0 ? (l.addTo(o, l), l.signum() < 0 ? l.add(o) : l) : l;
};

t.prototype.pow = function (t) {
  return this.exp(t, new w());
};

t.prototype.gcd = function (t) {
  var o = this.s < 0 ? this.negate() : this.clone(),
    s = t.s < 0 ? t.negate() : t.clone();

  if (o.compareTo(s) < 0) {
    var h = o;
    o = s;
    s = h;
  }

  var n = o.getLowestSetBit(),
    u = s.getLowestSetBit();
  if (u < 0) return o;

  for (n < u && (u = n), u > 0 && (o.rShiftTo(u, o), s.rShiftTo(u, s)); o.signum() > 0; ) {
    if ((n = o.getLowestSetBit()) > 0) o.rShiftTo(n, o);
    if ((n = s.getLowestSetBit()) > 0) s.rShiftTo(n, s);

    if (o.compareTo(s) >= 0) {
      o.subTo(s, o);
      o.rShiftTo(1, o);
    } else {
      s.subTo(o, s);
      s.rShiftTo(1, s);
    }
  }

  if (u > 0) s.lShiftTo(u, s);
  return s;
};

t.prototype.isProbablePrime = function (t) {
  var o,
    s = this.abs();

  if (1 == s.t && s[0] <= O[O.length - 1]) {
    for (o = 0; o < O.length; ++o) if (s[0] == O[o]) return true;

    return false;
  }

  if (s.isEven()) return false;

  for (o = 1; o < O.length; ) {
    for (var h = O[o], n = o + 1; n < O.length && h < q; ) h *= O[n++];

    for (h = s.modInt(h); o < n; ) if (h % O[o++] == 0) return false;
  }

  return s.millerRabin(t);
};

t.prototype.square = function () {
  var t = o();
  this.squareTo(t);
  return t;
};

module.exports = t;
