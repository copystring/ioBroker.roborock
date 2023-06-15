exports.extractFont = j;

exports.setTSpan = function (t) {
  p = t;
};

exports.default = function (t, n) {
  var o = t.x,
    c = t.y,
    u = t.dx,
    s = t.dy,
    y = t.rotate,
    b = t.children,
    S = t.baselineShift,
    O = t.verticalAlign,
    h = t.alignmentBaseline,
    v =
      'string' == typeof b || 'number' == typeof b
        ? n
          ? React.default.createElement(p, null, String(b))
          : null
        : React.Children.count(b) > 1 || Array.isArray(b)
        ? React.Children.map(b, P)
        : b;
  return {
    content: null === v ? String(b) : null,
    children: v,
    baselineShift: S,
    verticalAlign: O,
    alignmentBaseline: h,
    font: j(t),
    x: module1352.default(o),
    y: module1352.default(c),
    dx: module1352.default(u),
    dy: module1352.default(s),
    rotate: module1352.default(y),
  };
};

var module50 = require('./50'),
  React = require('react'),
  module1352 = require('./1352'),
  module1357 = require('./1357');

function u(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function s(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      u(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      u(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

var p,
  y = /^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?[ptexm%])*(?:\s*\/.*?)?\s+)?\s*"?([^"]*)/i,
  b = /^[\s"']*/,
  S = /[\s"']*$/,
  O = /\s*,\s*/g,
  h = {};

function v(t) {
  return t ? t.split(O)[0].replace(b, '').replace(S, '') : null;
}

function x(t) {
  if (h.hasOwnProperty(t)) return h[t];
  var n = y.exec(t);

  if (!n) {
    h[t] = null;
    return null;
  }

  var o = /bold/.exec(n[1]),
    l = /italic/.exec(n[1]);
  h[t] = {
    fontSize: n[2] || 12,
    fontWeight: o ? 'bold' : 'normal',
    fontStyle: l ? 'italic' : 'normal',
    fontFamily: v(n[3]),
  };
  return h[t];
}

function j(t) {
  var n = t.fontData,
    o = t.fontStyle,
    l = t.fontVariant,
    f = t.fontWeight,
    u = t.fontStretch,
    p = t.fontSize,
    y = t.fontFamily,
    b = t.textAnchor,
    S = t.textDecoration,
    O = t.letterSpacing,
    h = t.wordSpacing,
    j = t.kerning,
    P = t.fontVariantLigatures,
    w = t.fontFeatureSettings,
    D = t.font,
    A = module1357.pickNotNil({
      fontData: n,
      fontStyle: o,
      fontVariant: l,
      fontWeight: f,
      fontStretch: u,
      fontSize: p,
      fontFamily: v(y),
      textAnchor: b,
      textDecoration: S,
      letterSpacing: O,
      wordSpacing: h,
      kerning: j,
      fontVariantLigatures: P,
      fontFeatureSettings: w,
    });
  return s(s({}, 'string' == typeof D ? x(D) : D), A);
}

function P(t) {
  return 'string' == typeof t || 'number' == typeof t ? React.default.createElement(p, null, String(t)) : t;
}
