exports.__esModule = true;

var module1482 = require('./1482');

exports.default = function (n, t) {
  if (!n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || ('object' !== (undefined === t ? 'undefined' : t.default(t)) && 'function' != typeof t) ? n : t;
};
