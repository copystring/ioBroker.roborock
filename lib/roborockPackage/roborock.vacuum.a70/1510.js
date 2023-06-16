exports.__esModule = true;

var module1511 = require('./1511');

exports.default =
  module1511.default ||
  function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var u = arguments[o];

      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (t[l] = u[l]);
    }

    return t;
  };
