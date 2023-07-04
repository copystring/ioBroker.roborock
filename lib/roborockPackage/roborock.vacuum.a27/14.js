var module15 = require('./15'),
  n = {};

module.exports = function (c, o) {
  if (!n[c]) {
    module15(false, o);
    n[c] = true;
  }
};
