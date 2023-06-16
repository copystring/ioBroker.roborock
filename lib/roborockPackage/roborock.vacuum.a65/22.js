function t() {
  module.exports = t =
    Object.assign ||
    function (t) {
      for (var n = 1; n < arguments.length; n++) {
        var o = arguments[n];

        for (var p in o) Object.prototype.hasOwnProperty.call(o, p) && (t[p] = o[p]);
      }

      return t;
    };

  return t.apply(this, arguments);
}

module.exports = t;
