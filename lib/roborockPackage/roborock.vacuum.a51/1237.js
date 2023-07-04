var module1211 = require('./1211'),
  module1238 = require('./1238'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module1238.default(t, u);
    return module1211.createNavigationContainer(v);
  };

exports.default = u;
