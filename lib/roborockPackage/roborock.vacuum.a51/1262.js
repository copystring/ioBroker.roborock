var module1212 = require('./1212'),
  module1263 = require('./1263'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module1263.default(t, l);
    return module1212.default(n);
  };

exports.default = l;
