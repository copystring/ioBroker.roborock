module.exports = function (n) {
  return 'object' == typeof n ? null !== n : 'function' == typeof n;
};
