var module1253 = require('./1253'),
  module1224 = require('./1224'),
  module1229 = require('./1229'),
  module1229 = require('./1229'),
  module1272 = require('./1272'),
  module1273 = require('./1273'),
  module1277 = require('./1277'),
  module1279 = require('./1279'),
  module1278 = require('./1278')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1273(w, k, x);

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
    C = B[module1278] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1279(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1277(I, P, true), module1253 || 'function' == typeof I[module1278] || module1229(I, module1278, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1253 && !j) || (!v && !z && B[module1278]) || module1229(B, module1278, D),
    (module1272[k] = D),
    (module1272[P] = p),
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
      for (F in A) F in B || module1229(B, F, A[F]);
    else module1224(module1224.P + module1224.F * (v || z), k, A);
  return A;
};
