exports.default = function (u) {
  return Array.isArray(u) ? u : 'number' == typeof u ? [u] : 'string' == typeof u ? u.trim().replace(n, ' ').split(t) : [];
};

var t = /\s+/,
  n = /,/g;
