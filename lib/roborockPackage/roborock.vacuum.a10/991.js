require('react');

var module956 = require('./956'),
  module992 = require('./992'),
  module998 = require('./998');

var n = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    v = module992.default(t, n);
  return module956.default(module998.default, v, n);
};

exports.default = n;
