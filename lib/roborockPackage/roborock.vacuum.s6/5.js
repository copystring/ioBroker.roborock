function t(t, n) {
  for (var o = 0; o < n.length; o++) {
    var u = n[o];
    u.enumerable = u.enumerable || false;
    u.configurable = true;
    if ('value' in u) u.writable = true;
    Object.defineProperty(t, u.key, u);
  }
}

module.exports = function (n, o, u) {
  if (o) t(n.prototype, o);
  if (u) t(n, u);
  return n;
};

module.exports.default = module.exports;
module.exports.__esModule = true;
