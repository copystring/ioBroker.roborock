var module1219 = require('./1219'),
  module1270 = require('./1270'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module1270.default(t, l);
    return module1219.default(n);
  };

exports.default = l;
