var module938 = require('./938'),
  module968 = require('./968'),
  u = function (t) {
    var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      v = module968.default(t, u);
    return module938.createNavigationContainer(v);
  };

exports.default = u;
