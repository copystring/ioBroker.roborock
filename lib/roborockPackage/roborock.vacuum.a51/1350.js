exports.default = function (n) {
  var t = +n;
  return 'number' != typeof t || isNaN(t) ? 1 : t;
};
