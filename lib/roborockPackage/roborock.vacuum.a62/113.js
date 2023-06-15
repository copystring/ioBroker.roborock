var n,
  module114 = require('./114');

n = module114.now
  ? function () {
      return module114.now();
    }
  : function () {
      return Date.now();
    };
module.exports = n;
