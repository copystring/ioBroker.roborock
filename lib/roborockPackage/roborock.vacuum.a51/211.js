var n = function (n) {
  if (undefined === n) throw new Error('invariant(...): Second argument must be a string.');
};

module.exports = function (o, t) {
  for (var f = arguments.length, s = new Array(f > 2 ? f - 2 : 0), u = 2; u < f; u++) s[u - 2] = arguments[u];

  if ((n(t), !o)) {
    var c;
    if (undefined === t) c = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var v = 0;
      (c = new Error(
        t.replace(/%s/g, function () {
          return String(s[v++]);
        })
      )).name = 'Invariant Violation';
    }
    throw ((c.framesToPop = 1), c);
  }
};
