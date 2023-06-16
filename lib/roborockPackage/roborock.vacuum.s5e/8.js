function t(o, n) {
  module.exports = t =
    Object.setPrototypeOf ||
    function (t, o) {
      t.__proto__ = o;
      return t;
    };

  return t(o, n);
}

module.exports = t;
