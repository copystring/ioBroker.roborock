var module1218 = require('./1218'),
  module1245 = require('./1245'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module1245.default(t, u);
    return module1218.createNavigationContainer(v);
  };

exports.default = u;
