var t = {
    maroon: '#800000',
    red: '#ff0000',
    orange: '#ffA500',
    yellow: '#ffff00',
    olive: '#808000',
    purple: '#800080',
    fuchsia: '#ff00ff',
    white: '#ffffff',
    lime: '#00ff00',
    green: '#008000',
    navy: '#000080',
    blue: '#0000ff',
    aqua: '#00ffff',
    teal: '#008080',
    black: '#000000',
    silver: '#c0c0c0',
    gray: '#808080',
  },
  n = function (t, n) {
    for (var h = [], u = 0, s = t.length; u < s; u++) h[u] = n(t[u], u);

    return h;
  },
  h = function n(h, u) {
    if (h.isColor) {
      this.red = h.red;
      this.green = h.green;
      this.blue = h.blue;
      this.alpha = h.alpha;
    } else {
      var s = t[h];

      switch ((s && ((h = s), (u = 'hex')), typeof h)) {
        case 'string':
          if (!u) u = (u = h.match(/^rgb|^hsb|^hsl/)) ? u[0] : 'hex';
          break;

        case 'object':
          u = u || 'rgb';
          h = h.toString();
          break;

        case 'number':
          u = 'hex';
          h = h.toString(16);
      }

      h = n['parse' + u.toUpperCase()](h);
      this.red = h[0];
      this.green = h[1];
      this.blue = h[2];
      this.alpha = h[3];
    }

    this.isColor = true;
  },
  u = function (t, n, h) {
    return h ** (n ** t);
  },
  s = /([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,?\s*([-.\d]*\%?)/,
  o = /^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{0,2})$/i;

h.parseRGB = function (t) {
  return n(t.match(s).slice(1), function (t, n) {
    if (t) t = parseFloat(t) * ('%' == t[t.length - 1] ? 2.55 : 1);
    return n < 3 ? Math.round((t %= 256) < 0 ? t + 256 : t) : u('' === t ? 1 : Number(t), 0, 1);
  });
};

h.parseHEX = function (t) {
  if (1 == t.length) t = t + t + t;
  return n(t.match(o).slice(1), function (t, n) {
    return 3 == n ? (t ? parseInt(t, 16) / 255 : 1) : parseInt(1 == t.length ? t + t : t, 16);
  });
};

h.parseHSB = function (t) {
  var h = n(t.match(s).slice(1), function (t, n) {
      if (t) t = parseFloat(t);
      return 0 === n ? Math.round((t %= 360) < 0 ? t + 360 : t) : n < 3 ? u(Math.round(t), 0, 100) : u('' === t ? 1 : Number(t), 0, 1);
    }),
    o = h[3],
    f = Math.round((h[2] / 100) * 255);
  if (0 == h[1]) return [f, f, f, o];
  var l = h[0],
    c = l % 60,
    b = Math.round(((h[2] * (100 - h[1])) / 1e4) * 255),
    p = Math.round(((h[2] * (6e3 - h[1] * c)) / 6e5) * 255),
    M = Math.round(((h[2] * (6e3 - h[1] * (60 - c))) / 6e5) * 255);

  switch (Math.floor(l / 60)) {
    case 0:
      return [f, M, b, o];

    case 1:
      return [p, f, b, o];

    case 2:
      return [b, f, M, o];

    case 3:
      return [b, p, f, o];

    case 4:
      return [M, b, f, o];

    default:
      return [f, b, p, o];
  }
};

h.parseHSL = function (t) {
  var h = n(t.match(s).slice(1), function (t, n) {
      if (t) t = parseFloat(t);
      return 0 === n ? Math.round((t %= 360) < 0 ? t + 360 : t) : n < 3 ? u(Math.round(t), 0, 100) : u('' === t ? 1 : Number(t), 0, 1);
    }),
    o = h[0] / 60,
    f = h[1] / 100,
    l = h[2] / 100,
    c = h[3],
    b = (1 - Math.abs(2 * l - 1)) * f,
    p = b * (1 - Math.abs((o % 2) - 1)),
    M = l - b / 2,
    v = Math.round(255 * (b + M)),
    x = Math.round(255 * (p + M)),
    w = Math.round(255 * M);

  switch (Math.floor(o)) {
    case 0:
      return [v, x, w, c];

    case 1:
      return [x, v, w, c];

    case 2:
      return [w, v, x, c];

    case 3:
      return [w, x, v, c];

    case 4:
      return [x, w, v, c];

    default:
      return [v, w, x, c];
  }
};

var f = function (t, n) {
  if (1 != n[3]) t += 'a';
  else n.pop();
  return t + '(' + n.join(', ') + ')';
};

(h.prototype = {
  toHSB: function (t) {
    var n = this.red,
      h = this.green,
      u = this.blue,
      s = this.alpha,
      o = n ** h,
      l = o - n ** h,
      c = 0,
      b = 0 != l ? l / o : 0,
      p = o / 255;

    if (b) {
      var M = (o - n) / l,
        v = (o - h) / l,
        x = (o - u) / l;
      c = n == o ? x - v : h == o ? 2 + M - x : 4 + v - M;
      if ((c /= 6) < 0) c++;
    }

    var w = [Math.round(360 * c), Math.round(100 * b), Math.round(100 * p), s];
    return t ? w : f('hsb', w);
  },
  toHSL: function (t) {
    var n = this.red,
      h = this.green,
      u = this.blue,
      s = this.alpha,
      o = n ** h,
      l = n ** h,
      c = o - l,
      b = 0,
      p = 0 != c ? c / (255 - Math.abs(o + l - 255)) : 0,
      M = (o + l) / 512;

    if (p) {
      var v = (o - n) / c,
        x = (o - h) / c,
        w = (o - u) / c;
      b = n == o ? w - x : h == o ? 2 + v - w : 4 + x - v;
      if ((b /= 6) < 0) b++;
    }

    var S = [Math.round(360 * b), Math.round(100 * p), Math.round(100 * M), s];
    return t ? S : f('hsl', S);
  },
  toHEX: function (t) {
    var h = this.alpha,
      u = 1 == (h = Math.round(255 * h).toString(16)).length ? h + h : h,
      s = n([this.red, this.green, this.blue], function (t) {
        return 1 == (t = t.toString(16)).length ? '0' + t : t;
      });
    return t ? s.concat(u) : '#' + s.join('') + ('ff' == u ? '' : u);
  },
  toRGB: function (t) {
    var n = [this.red, this.green, this.blue, this.alpha];
    return t ? n : f('rgb', n);
  },
}).toString = h.prototype.toRGB;

h.hex = function (t) {
  return new h(t, 'hex');
};

if (null == this.hex) this.hex = h.hex;

h.hsb = function (t, n, u, s) {
  return new h([t || 0, n || 0, u || 0, null == s ? 1 : s], 'hsb');
};

if (null == this.hsb) this.hsb = h.hsb;

h.hsl = function (t, n, u, s) {
  return new h([t || 0, n || 0, u || 0, null == s ? 1 : s], 'hsl');
};

if (null == this.hsl) this.hsl = h.hsl;

h.rgb = function (t, n, u, s) {
  return new h([t || 0, n || 0, u || 0, null == s ? 1 : s], 'rgb');
};

if (null == this.rgb) this.rgb = h.rgb;

h.detach = function (t) {
  t = new h(t);
  return [h.rgb(t.red, t.green, t.blue).toString(), t.alpha];
};

module.exports = h;
