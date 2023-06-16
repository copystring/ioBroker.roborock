var module1152 = require('./1152'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1152(o), 9007199254740991) : 0;
};
