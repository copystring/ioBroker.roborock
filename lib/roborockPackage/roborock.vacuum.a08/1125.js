exports.__esModule = true;

var module1126 = require('./1126');

exports.default =
  module1126.default ||
  function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var u = arguments[o];

      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (t[l] = u[l]);
    }

    return t;
  };
