var module1148 = require('./1148');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1148(t);
  };
