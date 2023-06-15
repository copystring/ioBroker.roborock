var t = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true,
  },
  o = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
  },
  p = Object.defineProperty,
  n = Object.getOwnPropertyNames,
  c = Object.getOwnPropertySymbols,
  s = Object.getOwnPropertyDescriptor,
  y = Object.getPrototypeOf,
  f = y && y(Object);

module.exports = function l(O, u, P) {
  if ('string' != typeof u) {
    if (f) {
      var b = y(u);
      if (b && b !== f) l(O, b, P);
    }

    var v = n(u);
    if (c) v = v.concat(c(u));

    for (var j = 0; j < v.length; ++j) {
      var h = v[j];

      if (!(t[h] || o[h] || (P && P[h]))) {
        var x = s(u, h);

        try {
          p(O, h, x);
        } catch (t) {}
      }
    }

    return O;
  }

  return O;
};
