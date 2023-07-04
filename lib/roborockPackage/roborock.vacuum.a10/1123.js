exports.__esModule = true;

var module1124 = require('./1124');

exports.default =
  module1124.default ||
  function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var u = arguments[o];

      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (t[l] = u[l]);
    }

    return t;
  };
