var module1541 = require('./1541');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1541(t);
  };
