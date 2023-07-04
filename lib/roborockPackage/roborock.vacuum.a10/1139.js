var module1135 = require('./1135'),
  module1128 = require('./1128').document,
  c = module1135(module1128) && module1135(module1128.createElement);

module.exports = function (t) {
  return c ? module1128.createElement(t) : {};
};
