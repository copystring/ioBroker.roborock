module.exports = function (n, o, t, f, s, u, c, l) {
  if (!n) {
    var v;
    if (undefined === o) v = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var p = [t, f, s, u, c, l],
        h = 0;
      (v = new Error(
        o.replace(/%s/g, function () {
          return p[h++];
        })
      )).name = 'Invariant Violation';
    }
    throw ((v.framesToPop = 1), v);
  }
};
