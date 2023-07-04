var module1152 = require('./1152'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1152(u)) < 0 ? t(u + c, 0) : o(u, c);
};
