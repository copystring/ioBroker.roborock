exports.__esModule = true;

var module1561 = require('./1561');

exports.default = function (n, t) {
  if (!n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || ('object' !== (undefined === t ? 'undefined' : t.default(t)) && 'function' != typeof t) ? n : t;
};
