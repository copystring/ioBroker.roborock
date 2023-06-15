var module1150 = require('./1150');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1150(t);
  };
