var module936 = require('./936'),
  module966 = require('./966'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module966.default(t, u);
    return module936.createNavigationContainer(v);
  };

exports.default = u;
