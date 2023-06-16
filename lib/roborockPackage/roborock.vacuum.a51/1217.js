var n = function (n) {};

module.exports = function (o, t, f, u, c, l, s, v) {
  if ((n(t), !o)) {
    var p;
    if (undefined === t) p = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var h = [f, u, c, l, s, v],
        w = 0;
      (p = new Error(
        t.replace(/%s/g, function () {
          return h[w++];
        })
      )).name = 'Invariant Violation';
    }
    throw ((p.framesToPop = 1), p);
  }
};
