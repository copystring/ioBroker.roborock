module.exports = function (n) {
  throw new Error('"' + n + '" is read-only');
};
