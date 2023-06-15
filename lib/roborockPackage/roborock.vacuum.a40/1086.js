require('react');

var module1053 = require('./1053'),
  module1087 = require('./1087'),
  module1093 = require('./1093');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module1087.default(t, n);
  return module1053.default(module1093.default, v, n);
};

exports.default = n;
