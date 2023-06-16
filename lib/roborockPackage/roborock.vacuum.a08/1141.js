var module1137 = require('./1137'),
  module1130 = require('./1130').document,
  c = module1137(module1130) && module1137(module1130.createElement);

module.exports = function (t) {
  return c ? module1130.createElement(t) : {};
};
