module.exports = function (n) {
  return -1 !== Function.toString.call(n).indexOf('[native code]');
};
