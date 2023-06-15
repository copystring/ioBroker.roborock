var module11 = require('./11');

module.exports = function (n, o) {
  for (; !Object.prototype.hasOwnProperty.call(n, o) && null !== (n = module11(n)); );

  return n;
};
