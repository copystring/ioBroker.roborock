var module1139 = require('./1139'),
  module1166 = require('./1166'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module1166.default(t, u);
    return module1139.createNavigationContainer(v);
  };

exports.default = u;
