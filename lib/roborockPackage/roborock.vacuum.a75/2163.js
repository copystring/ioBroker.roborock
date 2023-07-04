exports.default = function (t, f, l) {
  if (f === l) return t;

  if (f > l) {
    var c = [l, f];
    f = c[0];
    l = c[1];
  }

  return [].concat(module31.default(t.slice(0, f)), [t[l]], module31.default(t.slice(f + 1, l)), [t[f]], module31.default(t.slice(l + 1)));
};
