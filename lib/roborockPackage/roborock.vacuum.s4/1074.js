exports.default = function (l) {
  if ('number' == typeof l) return l >>> 0 === l && l >= 0 && l <= 4294967295 ? O(l) : null;
  var n = 'string' == typeof l ? I(l) : l;
  if (!Array.isArray(n)) return n;
  var t = n[0],
    o = n[1],
    s = n[2],
    u = n[3],
    h = ((undefined === u ? 4278190080 : Math.round(255 * u) << 24) | (Math.round(255 * t) << 16) | (Math.round(255 * o) << 8) | Math.round(255 * s)) >>> 0;
  return O(h);
};

var module12 = require('./12'),
  n = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  };

for (var t in ((exports.colorNames = n), n))
  if (n.hasOwnProperty(t)) {
    var o = n[t],
      s = o[0],
      u = o[1],
      h = o[2];
    n[t] = (4278190080 | (s << 16) | (u << 8) | h) >>> 0;
  }

function c(l) {
  var n,
    t,
    o,
    s,
    u,
    h = l[0] / 360,
    c = l[1] / 100,
    f = l[2] / 100;
  if (0 === c) return [(u = 255 * f), u, u];
  n = 2 * f - (t = f < 0.5 ? f * (1 + c) : f + c - f * c);
  s = [0, 0, 0];

  for (var b = 0; b < 3; b++) {
    if ((o = h + 0.3333333333333333 * -(b - 1)) < 0) o++;
    if (o > 1) o--;
    u = 6 * o < 1 ? n + 6 * (t - n) * o : 2 * o < 1 ? t : 3 * o < 2 ? n + (t - n) * (0.6666666666666666 - o) * 6 : n;
    s[b] = u;
  }

  return s;
}

function f(l) {
  var n,
    t,
    o,
    s,
    u,
    h,
    c,
    f = l[0] / 360,
    b = l[1] / 100,
    p = l[2] / 100,
    y = b + p;

  switch ((y > 1 && ((b /= y), (p /= y)), (t = 1 - p), (o = 6 * f - (n = Math.floor(6 * f))), 0 != (1 & n) && (o = 1 - o), (s = b + o * (t - b)), n)) {
    default:
    case 6:
    case 0:
      u = t;
      h = s;
      c = b;
      break;

    case 1:
      u = s;
      h = t;
      c = b;
      break;

    case 2:
      u = b;
      h = t;
      c = s;
      break;

    case 3:
      u = b;
      h = s;
      c = t;
      break;

    case 4:
      u = s;
      h = b;
      c = t;
      break;

    case 5:
      u = t;
      h = b;
      c = s;
  }

  return [u, h, c];
}

function b(l, n, t) {
  return (n ** l) ** t;
}

Object.freeze(n);
var p = /^#([a-f0-9]{3,4})$/i,
  y = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
  k = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/,
  v = /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/,
  w = /(\D+)/;

function F(l) {
  var t,
    o,
    s,
    u = [0, 0, 0, 1];

  if ((t = l.match(y))) {
    for (s = t[2], t = t[1], o = 0; o < 3; o++) {
      var h = 2 * o;
      u[o] = parseInt(t.slice(h, h + 2), 16) / 255;
    }

    if (s) u[3] = Math.round((parseInt(s, 16) / 255) * 100) / 100;
  } else if ((t = l.match(p))) {
    for (s = (t = t[1])[3], o = 0; o < 3; o++) u[o] = parseInt(t[o] + t[o], 16) / 255;

    if (s) u[3] = Math.round((parseInt(s + s, 16) / 255) * 100) / 100;
  } else if ((t = l.match(k))) {
    for (o = 0; o < 3; o++) u[o] = parseInt(t[o + 1], 0) / 255;

    if (t[4]) u[3] = parseFloat(t[4]);
  } else {
    if (!(t = l.match(v))) return (t = l.match(w)) ? ('transparent' === t[1] ? [0, 0, 0, 0] : 'number' != typeof (u = n[t[1]]) ? null : O(u)) : null;

    for (o = 0; o < 3; o++) u[o] = parseFloat(t[o + 1]) / 100;

    if (t[4]) u[3] = parseFloat(t[4]);
  }

  for (o = 0; o < 4; o++) u[o] = b(u[o], 0, 1);

  return u;
}

var M = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;

function q(l) {
  var n = l.match(M);
  if (!n) return null;
  var t = parseFloat(n[4]);
  return c([(parseFloat(n[1]) + 360) % 360, b(parseFloat(n[2]), 0, 100), b(parseFloat(n[3]), 0, 100), b(isNaN(t) ? 1 : t, 0, 1)]);
}

var N = /^hwb\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;

function $(l) {
  var n = l.match(N);
  if (!n) return null;
  var t = parseFloat(n[4]);
  return f([((parseFloat(n[1]) % 360) + 360) % 360, b(parseFloat(n[2]), 0, 100), b(parseFloat(n[3]), 0, 100), b(isNaN(t) ? 1 : t, 0, 1)]);
}

function I(l) {
  switch (l.substring(0, 3).toLowerCase()) {
    case 'hsl':
      return q(l);

    case 'hwb':
      return $(l);

    default:
      return F(l);
  }
}

var O =
  'android' === module12.Platform.OS
    ? function (l) {
        return 0 | l;
      }
    : function (l) {
        return l;
      };
exports.integerColor = O;
