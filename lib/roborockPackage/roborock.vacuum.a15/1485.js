var module1468 = require('./1468'),
  module1439 = require('./1439'),
  module1444 = require('./1444'),
  module1444 = require('./1444'),
  module1487 = require('./1487'),
  module1488 = require('./1488'),
  module1492 = require('./1492'),
  module1494 = require('./1494'),
  module1493 = require('./1493')('iterator'),
  v = !([].keys && 'next' in [].keys()),
  p = function () {
    return this;
  };

module.exports = function (h, k, w, x, _, b, j) {
  module1488(w, k, x);

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
    C = B[module1493] || B['@@iterator'] || (_ && B[_]),
    D = C || O(_),
    E = _ ? (q ? O('entries') : D) : undefined,
    G = ('Array' == k && B.entries) || C;

  if (
    (G &&
      (I = module1494(G.call(new h()))) !== Object.prototype &&
      I.next &&
      (module1492(I, P, true), module1468 || 'function' == typeof I[module1493] || module1444(I, module1493, p)),
    q &&
      C &&
      'values' !== C.name &&
      ((z = true),
      (D = function () {
        return C.call(this);
      })),
    (module1468 && !j) || (!v && !z && B[module1493]) || module1444(B, module1493, D),
    (module1487[k] = D),
    (module1487[P] = p),
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
      for (F in A) F in B || module1444(B, F, A[F]);
    else module1439(module1439.P + module1439.F * (v || z), k, A);
  return A;
};
