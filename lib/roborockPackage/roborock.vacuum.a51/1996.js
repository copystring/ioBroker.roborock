var t = /[|\\{}()[\]^$+*?.-]/g;

module.exports = function (n) {
  if ('string' != typeof n) throw new TypeError('Expected a string');
  return n.replace(t, '\\$&');
};
