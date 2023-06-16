require('react');

var module1158 = require('./1158'),
  module1192 = require('./1192'),
  module1198 = require('./1198');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module1192.default(t, n);
  return module1158.default(module1198.default, v, n);
};

exports.default = n;
