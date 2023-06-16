var module1470 = require('./1470'),
  module1441 = require('./1441'),
  module1446 = require('./1446'),
  module1446 = require('./1446'),
  module1489 = require('./1489'),
  module1490 = require('./1490'),
  module1494 = require('./1494'),
  module1496 = require('./1496'),
  module1495 = require('./1495')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1490(w, k, x);

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
    C = B[module1495] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1496(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1494(I, P, true), module1470 || 'function' == typeof I[module1495] || module1446(I, module1495, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1470 && !j) || (!v && !z && B[module1495]) || module1446(B, module1495, D),
    (module1489[k] = D),
    (module1489[P] = p),
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
      for (F in A) F in B || module1446(B, F, A[F]);
    else module1441(module1441.P + module1441.F * (v || z), k, A);
  return A;
};
