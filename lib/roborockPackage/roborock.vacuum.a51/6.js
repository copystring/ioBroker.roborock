module.exports = function (n, o) {
  if (!(n instanceof o)) throw new TypeError('Cannot call a class as a function');
};
