require('react');

var module1230 = require('./1230'),
  module1264 = require('./1264'),
  module1270 = require('./1270');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module1264.default(t, n);
  return module1230.default(module1270.default, v, n);
};

exports.default = n;
