globals = require('./1522');

var module1523 = require('./1523'),
  module1524 = require('./1524'),
  module1526 = require('./1526'),
  module1536 = require('./1536'),
  c = function c(p, f, s) {
    var y,
      l,
      v,
      w = p & c.F,
      h = p & c.G,
      F = p & c.S,
      B = p & c.P,
      G = p & c.B,
      P = p & c.W,
      R = h ? module1523 : module1523[f] || (module1523[f] = {}),
      S = R.prototype,
      W = h ? globals : F ? globals[f] : (globals[f] || {}).prototype;

    for (y in (h && (s = f), s))
      ((l = !w && W && undefined !== W[y]) && module1536(R, y)) ||
        ((v = l ? W[y] : s[y]),
        (R[y] =
          h && 'function' != typeof W[y]
            ? s[y]
            : G && l
            ? module1524(v, globals)
            : P && W[y] == v
            ? (function (t) {
                var n = function (n, o, u) {
                  if (this instanceof t) {
                    switch (arguments.length) {
                      case 0:
                        return new t();

                      case 1:
                        return new t(n);

                      case 2:
                        return new t(n, o);
                    }

                    return new t(n, o, u);
                  }

                  return t.apply(this, arguments);
                };

                n.prototype = t.prototype;
                return n;
              })(v)
            : B && 'function' == typeof v
            ? module1524(Function.call, v)
            : v),
        B && (((R.virtual || (R.virtual = {}))[y] = v), p & c.R && S && !S[y] && module1526(S, y, v)));
  };

c.F = 1;
c.G = 2;
c.S = 4;
c.P = 8;
c.B = 16;
c.W = 32;
c.U = 64;
c.R = 128;
module.exports = c;
