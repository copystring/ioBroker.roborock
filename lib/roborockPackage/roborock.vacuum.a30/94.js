var module11 = require('./11'),
  module8 = require('./8'),
  module95 = require('./95'),
  module96 = require('./96');

function c(f) {
  var p = 'function' == typeof Map ? new Map() : undefined;

  module.exports = c = function (c) {
    if (null === c || !module95(c)) return c;
    if ('function' != typeof c) throw new TypeError('Super expression must either be null or a function');

    if (undefined !== p) {
      if (p.has(c)) return p.get(c);
      p.set(c, f);
    }

    function f() {
      return module96(c, arguments, module11(this).constructor);
    }

    f.prototype = Object.create(c.prototype, {
      constructor: {
        value: f,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    return module8(f, c);
  };

  return c(f);
}

module.exports = c;
