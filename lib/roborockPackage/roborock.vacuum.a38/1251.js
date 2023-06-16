var module1252 = require('./1252')('keys'),
  module1254 = require('./1254');

module.exports = function (o) {
  return module1252[o] || (module1252[o] = module1254(o));
};
