require('react');

var module1237 = require('./1237'),
  module1271 = require('./1271'),
  module1277 = require('./1277');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module1271.default(t, n);
  return module1237.default(module1277.default, v, n);
};

exports.default = n;
