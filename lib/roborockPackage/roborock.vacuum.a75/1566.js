var module1549 = require('./1549'),
  module1520 = require('./1520'),
  module1525 = require('./1525'),
  module1525 = require('./1525'),
  module1568 = require('./1568'),
  module1569 = require('./1569'),
  module1573 = require('./1573'),
  module1575 = require('./1575'),
  module1574 = require('./1574')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1569(w, k, x);

  var A,
    F,
    I,
    O = function (t) {
      if (!v && t in B) return B[t];

      switch (t) {
        case 'keys':
        case 'values':
          return function () {
            return new w(this, t);
          };
      }

      return function () {
        return new w(this, t);
      };
    },
    P = k + ' Iterator',
    q = 'values' == _,
    z = false,
    B = h.prototype,
    C = B[module1574] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1575(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1573(I, P, true), module1549 || 'function' == typeof I[module1574] || module1525(I, module1574, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1549 && !j) || (!v && !z && B[module1574]) || module1525(B, module1574, D),
    (module1568[k] = D),
    (module1568[P] = p),
    _)
  )
    if (
      ((A = {
        values: q ? D : O('values'),
        keys: b ? D : O('keys'),
        entries: E,
      }),
      j)
    )
      for (F in A) F in B || module1525(B, F, A[F]);
    else module1520(module1520.P + module1520.F * (v || z), k, A);
  return A;
};
