var module1542 = require('./1542');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1542(t);
  };
