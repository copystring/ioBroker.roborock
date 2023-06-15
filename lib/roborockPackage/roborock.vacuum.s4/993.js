require('react');

var module958 = require('./958'),
  module994 = require('./994'),
  module1000 = require('./1000');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module994.default(t, n);
  return module958.default(module1000.default, v, n);
};

exports.default = n;
