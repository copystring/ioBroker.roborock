var module1538 = require('./1538'),
  module1551 = require('./1551');

module.exports =
  Object.keys ||
  function (c) {
    return module1538(c, module1551);
  };
