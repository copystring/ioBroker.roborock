var n,
  module112 = require('./112');

n = module112.now
  ? function () {
      return module112.now();
    }
  : function () {
      return Date.now();
    };
module.exports = n;
