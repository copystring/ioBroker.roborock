var module1140 = require('./1140'),
  module1191 = require('./1191'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module1191.default(t, l);
    return module1140.default(n);
  };

exports.default = l;
