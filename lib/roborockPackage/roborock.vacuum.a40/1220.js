exports.__esModule = true;

var module1221 = require('./1221');

exports.default =
  module1221.default ||
  function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var u = arguments[o];

      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (t[l] = u[l]);
    }

    return t;
  };
