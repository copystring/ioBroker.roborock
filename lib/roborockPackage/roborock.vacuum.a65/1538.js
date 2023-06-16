var module1539 = require('./1539'),
  module1552 = require('./1552');

module.exports =
  Object.keys ||
  function (c) {
    return module1539(c, module1552);
  };
