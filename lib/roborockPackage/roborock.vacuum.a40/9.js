var module10 = require('./10'),
  module6 = require('./6');

module.exports = function (o, c) {
  return !c || ('object' !== module10(c) && 'function' != typeof c) ? module6(o) : c;
};
