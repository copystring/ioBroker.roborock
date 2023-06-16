var module1155 = require('./1155')('keys'),
  module1157 = require('./1157');

module.exports = function (o) {
  return module1155[o] || (module1155[o] = module1157(o));
};
