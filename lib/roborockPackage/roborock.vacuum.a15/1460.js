var n = {}.toString;

module.exports = function (t) {
  return n.call(t).slice(8, -1);
};
