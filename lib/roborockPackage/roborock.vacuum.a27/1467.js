var module1466 = require('./1466'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1466(u)) < 0 ? t(u + c, 0) : o(u, c);
};
