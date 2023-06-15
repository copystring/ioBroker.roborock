var module1156 = require('./1156'),
  module1127 = require('./1127'),
  module1132 = require('./1132'),
  module1132 = require('./1132'),
  module1175 = require('./1175'),
  module1176 = require('./1176'),
  module1180 = require('./1180'),
  module1182 = require('./1182'),
  module1181 = require('./1181')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1176(w, k, x);

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
    C = B[module1181] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1182(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1180(I, P, true), module1156 || 'function' == typeof I[module1181] || module1132(I, module1181, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1156 && !j) || (!v && !z && B[module1181]) || module1132(B, module1181, D),
    (module1175[k] = D),
    (module1175[P] = p),
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
      for (F in A) F in B || module1132(B, F, A[F]);
    else module1127(module1127.P + module1127.F * (v || z), k, A);
  return A;
};
