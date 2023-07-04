function t(t) {
  return function () {
    return t;
  };
}

var n = function () {};

n.thatReturns = t;
n.thatReturnsFalse = t(false);
n.thatReturnsTrue = t(true);
n.thatReturnsNull = t(null);

n.thatReturnsThis = function () {
  return this;
};

n.thatReturnsArgument = function (t) {
  return t;
};

module.exports = n;
