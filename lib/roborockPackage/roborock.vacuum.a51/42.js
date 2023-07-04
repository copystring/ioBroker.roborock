var module12 = require('./12');

module.exports = function (n, o) {
  for (; !Object.prototype.hasOwnProperty.call(n, o) && null !== (n = module12(n)); );

  return n;
};
