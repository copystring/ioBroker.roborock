var module6 = require('./6'),
  h = Math.PI / 180,
  n = [1, 0, 0, 1, 0, 0];

exports.identity = n;

exports.default = function t() {
  module6.default(this, t);

  this.reset = function () {
    if (!this.hasInitialState) {
      this.a = this.d = 1;
      this.b = this.c = this.tx = this.ty = 0;
      this.hasInitialState = true;
    }
  };

  this.toArray = function () {
    return this.hasInitialState ? n : [this.a, this.b, this.c, this.d, this.tx, this.ty];
  };

  this.append = function (t, s, h, n, f, c) {
    if (this.hasInitialState) {
      this.hasInitialState = false;
      this.a = t;
      this.b = s;
      this.c = h;
      this.d = n;
      this.tx = f;
      return void (this.ty = c);
    }

    var l = this.a,
      o = this.b,
      u = this.c,
      v = this.d;

    if (!(1 === t && 0 === s && 0 === h && 1 === n)) {
      this.a = l * t + u * s;
      this.b = o * t + v * s;
      this.c = l * h + u * n;
      this.d = o * h + v * n;
    }

    this.tx = l * f + u * c + this.tx;
    this.ty = o * f + v * c + this.ty;
  };

  this.appendTransform = function (t, s, n, f, c, l, o, u, v) {
    if (0 !== t || 0 !== s || 1 !== n || 1 !== f || 0 !== c || 0 !== l || 0 !== o || 0 !== u || 0 !== v) {
      var y, p;

      if (c % 360) {
        var b = c * h;
        y = Math.cos(b);
        p = Math.sin(b);
      } else {
        y = 1;
        p = 0;
      }

      var I = y * n,
        x = p * n,
        M = -p * f,
        S = y * f;

      if (l || o) {
        var _ = Math.tan(o * h),
          P = Math.tan(l * h);

        this.append(I + P * x, _ * I + x, M + P * S, _ * M + S, t, s);
      } else this.append(I, x, M, S, t, s);

      if (u || v) {
        this.tx -= u * this.a + v * this.c;
        this.ty -= u * this.b + v * this.d;
        this.hasInitialState = false;
      }
    }
  };

  this.reset();
};
