var module2 = require('./2'),
  module8 = require('./8');

module.exports = function (o, c) {
  return !c || ('object' !== module2(c) && 'function' != typeof c) ? module8(o) : c;
};
