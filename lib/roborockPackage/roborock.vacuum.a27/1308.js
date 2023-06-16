exports.default = function (t, n) {
  var c = t.id,
    h = t.children,
    _ = t.gradientTransform,
    y = t.transform,
    b = t.gradientUnits;
  if (!c) return null;

  for (
    var j = [],
      w = React.Children.map(h, function (t) {
        return React.default.cloneElement(t, {
          parent: n,
        });
      }),
      A = w.length,
      C = 0;
    C < A;
    C++
  ) {
    var E = w[C].props,
      M = E.offset,
      N = E.stopColor,
      O = E.stopOpacity,
      T = p(M || 0),
      U = N && module1277.default(N);
    if ('number' != typeof U || isNaN(T)) console.warn('"' + N + '" is not a valid color or "' + M + '" is not a valid offset');
    else {
      var V = Math.round(255 * module1278.default(O));
      j.push([T, (16777215 & U) | (V << 24)]);
    }
  }

  j.sort(v);

  for (var P = [], $ = j.length, k = 0; k < $; k++) {
    var q = j[k];
    P.push(q[0], q[1]);
  }

  return {
    name: c,
    gradient: P,
    children: w,
    gradientUnits: module1309.default[b] || 0,
    gradientTransform: module1281.default(_ || y || t),
  };
};

var React = require('react'),
  module1277 = require('./1277'),
  module1278 = require('./1278'),
  module1281 = require('./1281'),
  module1309 = require('./1309'),
  c = /^([+\-]?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)(%?)$/;

function p(t) {
  if ('number' == typeof t) return t;
  if ('object' == typeof t && 'function' == typeof t.__getAnimatedValue) return t.__getAnimatedValue();
  var n = 'string' == typeof t && t.match(c);
  if (n) return n[2] ? n[1] / 100 : +n[1];
  else {
    console.warn('"' + t + '" is not a valid number or percentage string.');
    return 0;
  }
}

var v = function (t, n) {
  return t[0] - n[0];
};
