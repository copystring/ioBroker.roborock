var module1158 = require('./1158'),
  module1129 = require('./1129'),
  module1134 = require('./1134'),
  module1134 = require('./1134'),
  module1177 = require('./1177'),
  module1178 = require('./1178'),
  module1182 = require('./1182'),
  module1184 = require('./1184'),
  module1183 = require('./1183')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1178(w, k, x);

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
    C = B[module1183] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1184(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1182(I, P, true), module1158 || 'function' == typeof I[module1183] || module1134(I, module1183, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1158 && !j) || (!v && !z && B[module1183]) || module1134(B, module1183, D),
    (module1177[k] = D),
    (module1177[P] = p),
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
      for (F in A) F in B || module1134(B, F, A[F]);
    else module1129(module1129.P + module1129.F * (v || z), k, A);
  return A;
};
