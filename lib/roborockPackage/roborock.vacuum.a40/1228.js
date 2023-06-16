module.exports = function (n) {
  if ('function' != typeof n) throw TypeError(n + ' is not a function!');
  return n;
};
