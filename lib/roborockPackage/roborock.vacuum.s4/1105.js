exports.default = function (t, c) {
  var p = t.id,
    y = t.children,
    b = t.gradientTransform,
    h = t.transform,
    O = t.gradientUnits;
  if (!p) return null;

  for (
    var _ = [],
      j = React.Children.map(y, function (t) {
        return React.default.cloneElement(t, {
          parent: c,
        });
      }),
      w = j.length,
      M = 0;
    M < w;
    M++
  ) {
    var P = j[M].props,
      k = P.offset,
      W = P.stopColor,
      A = P.stopOpacity,
      C = s(k || 0),
      D = W && module1074.default(W);
    if ('number' != typeof D || isNaN(C)) console.warn('"' + W + '" is not a valid color or "' + k + '" is not a valid offset');
    else {
      var E = Math.round(255 * module1075.default(A));

      _.push([C, (16777215 & D) | (E << 24)]);
    }
  }

  _.sort(v);

  for (var N = [], T = _.length, U = 0; U < T; U++) {
    var V = _[U];
    N.push(V[0], V[1]);
  }

  return {
    name: p,
    gradient: N,
    children: j,
    gradientUnits: module1106.default[O] || 0,
    gradientTransform: module1078.default(b || h || t),
  };
};

var React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = c(n);
    if (o && o.has(t)) return o.get(t);
    var f = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var p = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (p && (p.get || p.set)) Object.defineProperty(f, l, p);
        else f[l] = t[l];
      }

    f.default = t;
    if (o) o.set(t, f);
    return f;
  })(require('react')),
  module1074 = require('./1074'),
  module1075 = require('./1075'),
  module1078 = require('./1078'),
  module1106 = require('./1106');

function c(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (c = function (t) {
    return t ? o : n;
  })(t);
}

var p = /^([+\-]?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)(%?)$/;

function s(t) {
  if ('number' == typeof t) return t;
  if ('object' == typeof t && 'function' == typeof t.__getAnimatedValue) return t.__getAnimatedValue();
  var n = 'string' == typeof t && t.match(p);
  if (n) return n[2] ? n[1] / 100 : +n[1];
  else {
    console.warn('"' + t + '" is not a valid number or percentage string.');
    return 0;
  }
}

var v = function (t, n) {
  return t[0] - n[0];
};
