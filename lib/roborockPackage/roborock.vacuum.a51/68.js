function l(l, n, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 0.16666666666666666 ? l + 6 * (n - l) * t : t < 0.5 ? n : t < 0.6666666666666666 ? l + (n - l) * (0.6666666666666666 - t) * 6 : l;
}

function n(n, t, o) {
  var u = o < 0.5 ? o * (1 + t) : o + t - o * t,
    s = 2 * o - u,
    h = l(s, u, n + 0.3333333333333333),
    c = l(s, u, n),
    b = l(s, u, n - 0.3333333333333333);
  return (Math.round(255 * h) << 24) | (Math.round(255 * c) << 16) | (Math.round(255 * b) << 8);
}

var t,
  o = '[-+]?\\d*\\.?\\d+',
  u = '[-+]?\\d*\\.?\\d+%';

function s() {
  return '\\(\\s*(' + args.join(')\\s*,\\s*(') + ')\\s*\\)';
}

function h(l) {
  var n = parseInt(l, 10);
  return n < 0 ? 0 : n > 255 ? 255 : n;
}

function c(l) {
  return (((parseFloat(l) % 360) + 360) % 360) / 360;
}

function b(l) {
  var n = parseFloat(l);
  return n < 0 ? 0 : n > 1 ? 255 : Math.round(255 * n);
}

function p(l) {
  var n = parseFloat(l);
  return n < 0 ? 0 : n > 100 ? 1 : n / 100;
}

var y = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199,
};

module.exports = function (l) {
  if (undefined === t)
    t = {
      rgb: new RegExp('rgb' + s(o, o, o)),
      rgba: new RegExp('rgba' + s(o, o, o, o)),
      hsl: new RegExp('hsl' + s(o, u, u)),
      hsla: new RegExp('hsla' + s(o, u, u, o)),
      hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#([0-9a-fA-F]{6})$/,
      hex8: /^#([0-9a-fA-F]{8})$/,
    };
  var k,
    f = t;
  if ('number' == typeof l) return l >>> 0 === l && l >= 0 && l <= 4294967295 ? l : null;
  else
    return (k = f.hex6.exec(l))
      ? parseInt(k[1] + 'ff', 16) >>> 0
      : y.hasOwnProperty(l)
      ? y[l]
      : (k = f.rgb.exec(l))
      ? ((h(k[1]) << 24) | (h(k[2]) << 16) | (h(k[3]) << 8) | 255) >>> 0
      : (k = f.rgba.exec(l))
      ? ((h(k[1]) << 24) | (h(k[2]) << 16) | (h(k[3]) << 8) | b(k[4])) >>> 0
      : (k = f.hex3.exec(l))
      ? parseInt(k[1] + k[1] + k[2] + k[2] + k[3] + k[3] + 'ff', 16) >>> 0
      : (k = f.hex8.exec(l))
      ? parseInt(k[1], 16) >>> 0
      : (k = f.hex4.exec(l))
      ? parseInt(k[1] + k[1] + k[2] + k[2] + k[3] + k[3] + k[4] + k[4], 16) >>> 0
      : (k = f.hsl.exec(l))
      ? (255 | n(c(k[1]), p(k[2]), p(k[3]))) >>> 0
      : (k = f.hsla.exec(l))
      ? (n(c(k[1]), p(k[2]), p(k[3])) | b(k[4])) >>> 0
      : null;
};
