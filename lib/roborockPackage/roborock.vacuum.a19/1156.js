var module1157 = require('./1157')('keys'),
  module1159 = require('./1159');

module.exports = function (o) {
  return module1157[o] || (module1157[o] = module1159(o));
};
