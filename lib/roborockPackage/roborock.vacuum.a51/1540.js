var module1539 = require('./1539'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1539(u)) < 0 ? t(u + c, 0) : o(u, c);
};
