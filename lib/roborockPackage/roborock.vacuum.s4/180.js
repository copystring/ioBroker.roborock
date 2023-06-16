var module181 = require('./181'),
  module172 = require('./172');

module.exports = function (u) {
  return module181(u, function () {
    return module172(u);
  });
};
