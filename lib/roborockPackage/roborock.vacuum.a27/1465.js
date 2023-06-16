var module1466 = require('./1466'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1466(o), 9007199254740991) : 0;
};
