function o(t) {
  '@babel/helpers - typeof';

  if ('function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')) {
    module.exports = o = function (o) {
      return typeof o;
    };

    module.exports.default = module.exports;
    module.exports.__esModule = true;
  } else {
    module.exports = o = function (o) {
      return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof o;
    };

    module.exports.default = module.exports;
    module.exports.__esModule = true;
  }

  return o(t);
}

module.exports = o;
module.exports.default = module.exports;
module.exports.__esModule = true;
