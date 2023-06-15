function t(o) {
  module.exports = t = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      };
  return t(o);
}

module.exports = t;
