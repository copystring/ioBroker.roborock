var module1232 = require('./1232'),
  module1225 = require('./1225').document,
  c = module1232(module1225) && module1232(module1225.createElement);

module.exports = function (t) {
  return c ? module1225.createElement(t) : {};
};
