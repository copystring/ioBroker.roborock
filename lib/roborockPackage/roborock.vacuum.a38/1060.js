var module1034 = require('./1034'),
  module1061 = require('./1061'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module1061.default(t, u);
    return module1034.createNavigationContainer(v);
  };

exports.default = u;
