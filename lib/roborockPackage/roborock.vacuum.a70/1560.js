var module1543 = require('./1543'),
  module1514 = require('./1514'),
  module1519 = require('./1519'),
  module1519 = require('./1519'),
  module1562 = require('./1562'),
  module1563 = require('./1563'),
  module1567 = require('./1567'),
  module1569 = require('./1569'),
  module1568 = require('./1568')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1563(w, k, x);

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
    C = B[module1568] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1569(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1567(I, P, true), module1543 || 'function' == typeof I[module1568] || module1519(I, module1568, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1543 && !j) || (!v && !z && B[module1568]) || module1519(B, module1568, D),
    (module1562[k] = D),
    (module1562[P] = p),
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
      for (F in A) F in B || module1519(B, F, A[F]);
    else module1514(module1514.P + module1514.F * (v || z), k, A);
  return A;
};
