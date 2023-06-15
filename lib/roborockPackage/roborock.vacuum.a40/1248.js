var module1249 = require('./1249'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1249(o), 9007199254740991) : 0;
};
