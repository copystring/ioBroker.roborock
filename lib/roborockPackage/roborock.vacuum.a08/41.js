var module11 = require('./11');

module.exports = function (o, n) {
  for (; !Object.prototype.hasOwnProperty.call(o, n) && null !== (o = module11(o)); );

  return o;
};

module.exports.default = module.exports;
module.exports.__esModule = true;
