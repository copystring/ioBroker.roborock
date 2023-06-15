var module16 = require('./16'),
  n = {};

module.exports = function (c, o) {
  if (!n[c]) {
    module16(false, o);
    n[c] = true;
  }
};
