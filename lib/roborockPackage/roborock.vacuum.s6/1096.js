exports.extractFont = P;

exports.setTSpan = function (t) {
  s = t;
};

exports.default = function (t, n) {
  var f = t.x,
    c = t.y,
    u = t.dx,
    p = t.dy,
    y = t.rotate,
    b = t.children,
    O = t.baselineShift,
    S = t.verticalAlign,
    h = t.alignmentBaseline,
    v =
      'string' == typeof b || 'number' == typeof b
        ? n
          ? React.default.createElement(s, null, String(b))
          : null
        : React.Children.count(b) > 1 || Array.isArray(b)
        ? React.Children.map(b, w)
        : b;
  return {
    content: null === v ? String(b) : null,
    children: v,
    baselineShift: O,
    verticalAlign: S,
    alignmentBaseline: h,
    font: P(t),
    x: module1077.default(f),
    y: module1077.default(c),
    dx: module1077.default(u),
    dy: module1077.default(p),
    rotate: module1077.default(y),
  };
};

var module49 = require('./49'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = c(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var p = f ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (p && (p.get || p.set)) Object.defineProperty(l, u, p);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module1077 = require('./1077'),
  module1082 = require('./1082');

function c(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (c = function (t) {
    return t ? o : n;
  })(t);
}

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

function p(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      u(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      u(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

var s,
  y = /^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?[ptexm%])*(?:\s*\/.*?)?\s+)?\s*"?([^"]*)/i,
  b = /^[\s"']*/,
  O = /[\s"']*$/,
  S = /\s*,\s*/g,
  h = {};

function v(t) {
  return t ? t.split(S)[0].replace(b, '').replace(O, '') : null;
}

function j(t) {
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

function P(t) {
  var n = t.fontData,
    o = t.fontStyle,
    l = t.fontVariant,
    c = t.fontWeight,
    u = t.fontStretch,
    s = t.fontSize,
    y = t.fontFamily,
    b = t.textAnchor,
    O = t.textDecoration,
    S = t.letterSpacing,
    h = t.wordSpacing,
    P = t.kerning,
    w = t.fontVariantLigatures,
    x = t.fontFeatureSettings,
    D = t.font,
    k = module1082.pickNotNil({
      fontData: n,
      fontStyle: o,
      fontVariant: l,
      fontWeight: c,
      fontStretch: u,
      fontSize: s,
      fontFamily: v(y),
      textAnchor: b,
      textDecoration: O,
      letterSpacing: S,
      wordSpacing: h,
      kerning: P,
      fontVariantLigatures: w,
      fontFeatureSettings: x,
    });
  return p(p({}, 'string' == typeof D ? j(D) : D), k);
}

function w(t) {
  return 'string' == typeof t || 'number' == typeof t ? React.default.createElement(s, null, String(t)) : t;
}
