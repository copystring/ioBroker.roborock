var module1035 = require('./1035'),
  module1086 = require('./1086'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module1086.default(t, l);
    return module1035.default(n);
  };

exports.default = l;
