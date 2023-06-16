var module188 = require('./188');

module.exports = module188({
  initialize: function (t) {
    this.reset().push(t);
  },
  push: function () {
    var t = Array.prototype.join.call(arguments, ' ').match(/[a-df-z]|[\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+/gi);
    if (!t) return this;

    for (var n, s = t[0], h = 1; s; ) {
      switch (s) {
        case 'm':
          this.move(t[h++], t[h++]);
          break;

        case 'l':
          this.line(t[h++], t[h++]);
          break;

        case 'c':
          this.curve(t[h++], t[h++], t[h++], t[h++], t[h++], t[h++]);
          break;

        case 's':
          this.curve(t[h++], t[h++], null, null, t[h++], t[h++]);
          break;

        case 'q':
          this.curve(t[h++], t[h++], t[h++], t[h++]);
          break;

        case 't':
          this.curve(t[h++], t[h++]);
          break;

        case 'a':
          this.arc(t[h + 5], t[h + 6], t[h], t[h + 1], t[h + 3], !+t[h + 4], t[h + 2]);
          h += 7;
          break;

        case 'h':
          this.line(t[h++], 0);
          break;

        case 'v':
          this.line(0, t[h++]);
          break;

        case 'M':
          this.moveTo(t[h++], t[h++]);
          break;

        case 'L':
          this.lineTo(t[h++], t[h++]);
          break;

        case 'C':
          this.curveTo(t[h++], t[h++], t[h++], t[h++], t[h++], t[h++]);
          break;

        case 'S':
          this.curveTo(t[h++], t[h++], null, null, t[h++], t[h++]);
          break;

        case 'Q':
          this.curveTo(t[h++], t[h++], t[h++], t[h++]);
          break;

        case 'T':
          this.curveTo(t[h++], t[h++]);
          break;

        case 'A':
          this.arcTo(t[h + 5], t[h + 6], t[h], t[h + 1], t[h + 3], !+t[h + 4], t[h + 2]);
          h += 7;
          break;

        case 'H':
          this.lineTo(t[h++], this.penY);
          break;

        case 'V':
          this.lineTo(this.penX, t[h++]);
          break;

        case 'Z':
        case 'z':
          this.close();
          break;

        default:
          s = n;
          h--;
          continue;
      }

      if ('m' == (n = s)) n = 'l';
      else if ('M' == n) n = 'L';
      s = t[h++];
    }

    return this;
  },
  reset: function () {
    this.penX = this.penY = 0;
    this.penDownX = this.penDownY = null;
    this._pivotX = this._pivotY = 0;
    this.onReset();
    return this;
  },
  move: function (t, n) {
    this.onMove(this.penX, this.penY, (this._pivotX = this.penX += +t), (this._pivotY = this.penY += +n));
    return this;
  },
  moveTo: function (t, n) {
    this.onMove(this.penX, this.penY, (this._pivotX = this.penX = +t), (this._pivotY = this.penY = +n));
    return this;
  },
  line: function (t, n) {
    return this.lineTo(this.penX + +t, this.penY + +n);
  },
  lineTo: function (t, n) {
    if (null == this.penDownX) {
      this.penDownX = this.penX;
      this.penDownY = this.penY;
    }

    this.onLine(this.penX, this.penY, (this._pivotX = this.penX = +t), (this._pivotY = this.penY = +n));
    return this;
  },
  curve: function (t, n, s, h, o, u) {
    var p = this.penX,
      c = this.penY;
    return this.curveTo(p + +t, c + +n, null == s ? null : p + +s, null == h ? null : c + +h, null == o ? null : p + +o, null == u ? null : c + +u);
  },
  curveTo: function (t, n, s, h, o, u) {
    var p = this.penX,
      c = this.penY;

    if (null == s) {
      s = +t;
      h = +n;
      t = 2 * p - (this._pivotX || 0);
      n = 2 * c - (this._pivotY || 0);
    }

    if (null == o) {
      this._pivotX = +t;
      this._pivotY = +n;
      s = ((o = +s) + 2 * +t) / 3;
      h = ((u = +h) + 2 * +n) / 3;
      t = (p + 2 * +t) / 3;
      n = (c + 2 * +n) / 3;
    } else {
      this._pivotX = +s;
      this._pivotY = +h;
    }

    if (null == this.penDownX) {
      this.penDownX = p;
      this.penDownY = c;
    }

    this.onBezierCurve(p, c, +t, +n, +s, +h, (this.penX = +o), (this.penY = +u));
    return this;
  },
  arc: function (t, n, s, h, o, u, p) {
    return this.arcTo(this.penX + +t, this.penY + +n, s, h, o, u, p);
  },
  arcTo: function (t, n, s, h, o, u, p) {
    if (((h = Math.abs(+h || +s || +n - this.penY)), !(s = Math.abs(+s || +module188 - this.penX)) || !h || (module188 == this.penX && n == this.penY)))
      return this.lineTo(module188, n);

    var c = this.penX,
      l = this.penY,
      v = !+u,
      X = !!+o,
      Y = p ? (p * Math.PI) / 180 : 0,
      f = Math.cos(Y),
      M = Math.sin(Y),
      b = (f * (module188 -= c)) / 2 + (M * (n -= l)) / 2,
      T = (-M * module188) / 2 + (f * n) / 2,
      k = s * s * h * h,
      w = h * h * b * b,
      _ = s * s * T * T,
      D = k - _ - w;

    if (D < 0) {
      s *= D = Math.sqrt(1 - D / k);
      h *= D;
      b = module188 / 2;
      T = n / 2;
    } else {
      D = Math.sqrt(D / (_ + w));
      if (X == v) D = -D;
      var z = (-D * T * s) / h,
        C = (D * b * h) / s;
      b = f * z - M * C + module188 / 2;
      T = M * z + f * C + n / 2;
    }

    var B = f / s,
      A = M / s,
      L = -M / h,
      I = f / h,
      P = (L * -b + I * -T) ** (B * -b + A * -T),
      N = (L * (module188 - b) + I * (n - T)) ** (B * (module188 - b) + A * (n - T));
    b += c;
    T += l;
    module188 += c;
    n += l;

    if (null == this.penDownX) {
      this.penDownX = this.penX;
      this.penDownY = this.penY;
    }

    this.onArc(c, l, (this._pivotX = this.penX = module188), (this._pivotY = this.penY = n), b, T, s, h, P, N, !v, p);
    return this;
  },
  counterArc: function (t, n, s, h, o) {
    return this.arc(t, n, s, h, o, true);
  },
  counterArcTo: function (t, n, s, h, o) {
    return this.arcTo(t, n, s, h, o, true);
  },
  close: function () {
    if (null != this.penDownX) {
      this.onClose(this.penX, this.penY, (this.penX = this.penDownX), (this.penY = this.penDownY));
      this.penDownX = null;
    }

    return this;
  },
  onReset: function () {},
  onMove: function (t, n, s, h) {},
  onLine: function (t, n, s, h) {
    this.onBezierCurve(t, n, t, n, s, h, s, h);
  },
  onBezierCurve: function (t, n, s, h, o, u, p, c) {
    var l,
      v,
      X,
      Y,
      f,
      M = p - t,
      b = c - n,
      T = M * M + b * b;
    if (
      ((f = (X = s - t) * M + (Y = h - n) * b) > T ? ((X -= M), (Y -= b)) : f > 0 && 0 != T && ((X -= (f / T) * M), (Y -= (f / T) * b)),
      (l = X * X + Y * Y),
      (f = (X = o - t) * M + (Y = u - n) * b) > T ? ((X -= M), (Y -= b)) : f > 0 && 0 != T && ((X -= (f / T) * M), (Y -= (f / T) * b)),
      (v = X * X + Y * Y),
      l < 0.01 && v < 0.01)
    )
      this.onLine(t, n, p, c);
    else {
      if (isNaN(l) || isNaN(v)) throw new Error('Bad input');

      var k = 0.5 * (s + o),
        w = 0.5 * (h + u),
        _ = 0.5 * (s + t),
        D = 0.5 * (h + n),
        z = 0.5 * (_ + k),
        C = 0.5 * (D + w),
        B = 0.5 * (p + o),
        A = 0.5 * (c + u),
        L = 0.5 * (B + k),
        I = 0.5 * (A + w),
        P = 0.5 * (z + L),
        N = 0.5 * (C + I);

      this.onBezierCurve(t, n, _, D, z, C, P, N);
      this.onBezierCurve(P, N, L, I, B, A, p, c);
    }
  },
  onArc: function (t, n, s, h, o, u, p, c, l, v, X, Y) {
    var f = Y ? (Y * Math.PI) / 180 : 0,
      M = Math.cos(f),
      b = Math.sin(f),
      T = M * p,
      k = -b * c,
      w = b * p,
      _ = M * c,
      D = v - l;

    if (D < 0 && !X) D += 2 * Math.PI;
    else if (D > 0 && X) D -= 2 * Math.PI;

    for (var z = Math.ceil(Math.abs(D / (Math.PI / 2))), C = D / z, B = 1.3333333333333333 * Math.tan(C / 4), A = Math.cos(l), L = Math.sin(l), I = 0; I < z; I++) {
      var P = A - B * L,
        N = L + B * A;
      l += C;
      var q = (A = Math.cos(l)) + B * (L = Math.sin(l)),
        y = L - B * A;
      this.onBezierCurve(t, n, o + T * P + k * N, u + w * P + _ * N, o + T * q + k * y, u + w * q + _ * y, (t = o + T * A + k * L), (n = u + w * A + _ * L));
    }
  },
  onClose: function (t, n, s, h) {
    this.onLine(t, n, s, h);
  },
});
