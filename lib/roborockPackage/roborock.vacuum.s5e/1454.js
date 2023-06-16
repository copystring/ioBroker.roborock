var n = {}.hasOwnProperty;

module.exports = function (t, o) {
  return n.call(t, o);
};
