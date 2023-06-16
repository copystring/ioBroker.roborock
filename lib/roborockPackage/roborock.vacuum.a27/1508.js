var module1462 = require('./1462');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1462(t);
  };
