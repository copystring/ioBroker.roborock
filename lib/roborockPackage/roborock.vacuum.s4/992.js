var module939 = require('./939'),
  module993 = require('./993'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module993.default(t, l);
    return module939.default(n);
  };

exports.default = l;
