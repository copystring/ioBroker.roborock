var module11 = require('./11'),
  module8 = require('./8'),
  module94 = require('./94'),
  module95 = require('./95');

function p(s) {
  var f = 'function' == typeof Map ? new Map() : undefined;

  module.exports = p = function (p) {
    if (null === p || !module94(p)) return p;
    if ('function' != typeof p) throw new TypeError('Super expression must either be null or a function');

    if (undefined !== f) {
      if (f.has(p)) return f.get(p);
      f.set(p, s);
    }

    function s() {
      return module95(p, arguments, module11(this).constructor);
    }

    s.prototype = Object.create(p.prototype, {
      constructor: {
        value: s,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    return module8(s, p);
  };

  module.exports.default = module.exports;
  module.exports.__esModule = true;
  return p(s);
}

module.exports = p;
module.exports.default = module.exports;
module.exports.__esModule = true;
