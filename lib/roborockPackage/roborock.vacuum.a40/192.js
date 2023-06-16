var module190 = require('./190');

function s(t, s, h, x, y, n) {
  if (t && 'object' == typeof t) {
    s = t.yx;
    x = t.yy;
    n = t.y;
    h = t.xy;
    y = t.x;
    t = t.xx;
  }

  this.xx = null == t ? 1 : t;
  this.yx = s || 0;
  this.xy = h || 0;
  this.yy = null == x ? 1 : x;
  this.x = (null == y ? this.x : y) || 0;
  this.y = (null == n ? this.y : n) || 0;

  this._transform();

  return this;
}

module.exports = module190({
  initialize: s,
  _transform: function () {},
  xx: 1,
  yx: 0,
  x: 0,
  xy: 0,
  yy: 1,
  y: 0,
  transform: function (t, s, h, x, y, n) {
    var o = this;

    if (t && 'object' == typeof t) {
      s = t.yx;
      x = t.yy;
      n = t.y;
      h = t.xy;
      y = t.x;
      t = t.xx;
    }

    if (!y) y = 0;
    if (!n) n = 0;
    return this.transformTo(o.xx * t + o.xy * s, o.yx * t + o.yy * s, o.xx * h + o.xy * x, o.yx * h + o.yy * x, o.xx * y + o.xy * n + o.x, o.yx * y + o.yy * n + o.y);
  },
  transformTo: s,
  translate: function (t, s) {
    return this.transform(1, 0, 0, 1, t, s);
  },
  move: function (t, s) {
    this.x += t || 0;
    this.y += s || 0;

    this._transform();

    return this;
  },
  scale: function (t, s) {
    if (null == s) s = t;
    return this.transform(t, 0, 0, s, 0, 0);
  },
  rotate: function (t, s, h) {
    if (!(null != s && null != h)) {
      s = (this.left || 0) + (this.width || 0) / 2;
      h = (this.top || 0) + (this.height || 0) / 2;
    }

    var x = (t * Math.PI) / 180,
      y = Math.sin(x),
      n = Math.cos(x);
    this.transform(1, 0, 0, 1, s, h);
    return this.transformTo(n * this.xx - y * this.yx, y * this.xx + n * this.yx, n * this.xy - y * this.yy, y * this.xy + n * this.yy, this.x, this.y).transform(
      1,
      0,
      0,
      1,
      -s,
      -h
    );
  },
  moveTo: function (t, s) {
    return this.transformTo(this.xx, this.yx, this.xy, this.yy, t, s);
  },
  rotateTo: function (t, s, h) {
    var x = this.yx / this.xx > this.yy / this.xy ? -1 : 1;
    if (this.xx < 0 ? this.xy >= 0 : this.xy < 0) x = -x;
    return this.rotate(t - (180 * (x * this.yx) ** (x * this.xx)) / Math.PI, s, h);
  },
  scaleTo: function (t, s) {
    var h = Math.sqrt(this.xx * this.xx + this.yx * this.yx);
    this.xx /= h;
    this.yx /= h;
    h = Math.sqrt(this.yy * this.yy + this.xy * this.xy);
    this.yy /= h;
    this.xy /= h;
    return this.scale(t, s);
  },
  resizeTo: function (t, s) {
    var h = this.width,
      x = this.height;
    return h && x ? this.scaleTo(t / h, s / x) : this;
  },
  inversePoint: function (t, s) {
    var h = this.xx,
      x = this.yx,
      y = this.xy,
      n = this.yy,
      o = this.x,
      u = this.y,
      f = x * y - h * n;
    return 0 == f
      ? null
      : {
          x: (n * (o - t) + y * (s - u)) / f,
          y: (h * (u - s) + x * (t - o)) / f,
        };
  },
  point: function (t, s) {
    return {
      x: this.xx * t + this.xy * s + this.x,
      y: this.yx * t + this.yy * s + this.y,
    };
  },
});
