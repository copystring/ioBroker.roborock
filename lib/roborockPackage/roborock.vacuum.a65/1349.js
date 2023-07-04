var module6 = require('./6');

exports.default = function n(u) {
  module6.default(this, n);
  var c = false,
    o = new Promise(function (n, t) {
      return u(n, t);
    }),
    f = new Promise(function (n, t) {
      return o
        .then(function (u) {
          if (c)
            t({
              isCanceled: true,
            });
          else n(u);
        })
        .catch(function (n) {
          t(
            c
              ? {
                  isCanceled: true,
                }
              : n
          );
        });
    });

  f.cancel = function () {
    c = true;
  };

  return f;
};
