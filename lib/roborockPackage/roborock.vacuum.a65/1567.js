var module1550 = require('./1550'),
  module1521 = require('./1521'),
  module1526 = require('./1526'),
  module1526 = require('./1526'),
  module1569 = require('./1569'),
  module1570 = require('./1570'),
  module1574 = require('./1574'),
  module1576 = require('./1576'),
  module1575 = require('./1575')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1570(w, k, x);

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
    C = B[module1575] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1576(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1574(I, P, true), module1550 || 'function' == typeof I[module1575] || module1526(I, module1575, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1550 && !j) || (!v && !z && B[module1575]) || module1526(B, module1575, D),
    (module1569[k] = D),
    (module1569[P] = p),
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
      for (F in A) F in B || module1526(B, F, A[F]);
    else module1521(module1521.P + module1521.F * (v || z), k, A);
  return A;
};
