var module1245 = require('./1245');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1245(t);
  };
