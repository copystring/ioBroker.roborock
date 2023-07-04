var module1529 = require('./1529'),
  module1522 = require('./1522').document,
  c = module1529(module1522) && module1529(module1522.createElement);

module.exports = function (t) {
  return c ? module1522.createElement(t) : {};
};
