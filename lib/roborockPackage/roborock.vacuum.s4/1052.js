exports.default = function (t, n, o) {
  if (t.hasOwnProperty(n) && undefined !== t[n]) return t;
  else {
    t[n] = o;
    return t;
  }
};
