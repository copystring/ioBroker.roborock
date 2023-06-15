var module8 = require('./8'),
  module96 = require('./96');

function p(s, u, n) {
  if (module96()) {
    module.exports = p = Reflect.construct;
    module.exports.default = module.exports;
    module.exports.__esModule = true;
  } else {
    module.exports = p = function (o, p, s) {
      var u = [null];
      u.push.apply(u, p);
      var n = new (Function.bind.apply(o, u))();
      if (s) module8(n, s.prototype);
      return n;
    };

    module.exports.default = module.exports;
    module.exports.__esModule = true;
  }

  return p.apply(null, arguments);
}

module.exports = p;
module.exports.default = module.exports;
module.exports.__esModule = true;
