var module1218 = require('./1218'),
  module1269 = require('./1269'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module1269.default(t, l);
    return module1218.default(n);
  };

exports.default = l;
