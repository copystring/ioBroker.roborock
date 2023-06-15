var module1447 = require('./1447'),
  module1440 = require('./1440').document,
  c = module1447(module1440) && module1447(module1440.createElement);

module.exports = function (t) {
  return c ? module1440.createElement(t) : {};
};
