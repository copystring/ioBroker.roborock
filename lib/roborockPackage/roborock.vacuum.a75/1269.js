require('react');

var module1236 = require('./1236'),
  module1270 = require('./1270'),
  module1276 = require('./1276');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module1270.default(t, n);
  return module1236.default(module1276.default, v, n);
};

exports.default = n;
