var module1545 = require('./1545'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1545(u)) < 0 ? t(u + c, 0) : o(u, c);
};
