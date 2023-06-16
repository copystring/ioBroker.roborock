var module937 = require('./937'),
  module991 = require('./991'),
  l = function (t) {
    var l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      n = module991.default(t, l);
    return module937.default(n);
  };

exports.default = l;
