var module183 = require('./183'),
  module174 = require('./174');

module.exports = function (u) {
  return module183(u, function () {
    return module174(u);
  });
};
