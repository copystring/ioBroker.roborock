var module49 = require('./49');

function n(t, n) {
  var c = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    c.push.apply(c, o);
  }

  return c;
}

function c(c) {
  for (var o = 1; o < arguments.length; o++) {
    var p = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      n(Object(p), true).forEach(function (n) {
        module49(c, n, p[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(c, Object.getOwnPropertyDescriptors(p));
    else
      n(Object(p)).forEach(function (t) {
        Object.defineProperty(c, t, Object.getOwnPropertyDescriptor(p, t));
      });
  }

  return c;
}

var React = require('react');

module.exports = function (t, n) {
  for (var p = n.ref, l = t.ref, f = arguments.length, u = new Array(f > 2 ? f - 2 : 0), O = 2; O < f; O++) u[O - 2] = arguments[O];

  return null == l || null == p
    ? React.cloneElement(t, n, ...u)
    : 'function' != typeof l
    ? React.cloneElement(t, n, ...u)
    : React.cloneElement(
        t,
        c(
          c({}, n),
          {},
          {
            ref: function (t) {
              p(t);
              l(t);
            },
          }
        ),
        ...u
      );
};
