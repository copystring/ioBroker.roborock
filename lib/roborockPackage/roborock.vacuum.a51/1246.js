exports.default = function (n, o, t, f, u, s, l, c) {
  if (undefined === o) throw new Error('invariant requires an error message argument');

  if (!n) {
    var v;
    if (undefined === o) v = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var w = [t, f, u, s, l, c],
        h = 0;
      (v = new Error(
        o.replace(/%s/g, function () {
          return w[h++];
        })
      )).name = 'Invariant Violation';
    }
    throw ((v.framesToPop = 1), v);
  }
};
