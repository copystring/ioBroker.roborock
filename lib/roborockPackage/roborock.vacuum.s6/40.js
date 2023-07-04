var module41 = require('./41');

function o(s, p, u) {
  if ('undefined' != typeof Reflect && Reflect.get) {
    module.exports = o = Reflect.get;
    module.exports.default = module.exports;
    module.exports.__esModule = true;
  } else {
    module.exports = o = function (o, s, p) {
      var u = module41(o, s);

      if (u) {
        var f = Object.getOwnPropertyDescriptor(u, s);
        return f.get ? f.get.call(p) : f.value;
      }
    };

    module.exports.default = module.exports;
    module.exports.__esModule = true;
  }

  return o(s, p, u || s);
}

module.exports = o;
module.exports.default = module.exports;
module.exports.__esModule = true;
