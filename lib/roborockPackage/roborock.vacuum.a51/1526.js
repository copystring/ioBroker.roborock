var module1522 = require('./1522'),
  module1515 = require('./1515').document,
  c = module1522(module1515) && module1522(module1515.createElement);

module.exports = function (t) {
  return c ? module1515.createElement(t) : {};
};
