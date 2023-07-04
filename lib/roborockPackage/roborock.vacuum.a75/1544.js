var module1545 = require('./1545'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1545(o), 9007199254740991) : 0;
};
