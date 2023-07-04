var module1217 = require('./1217'),
  module1244 = require('./1244'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module1244.default(t, u);
    return module1217.createNavigationContainer(v);
  };

exports.default = u;
