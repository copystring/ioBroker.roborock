var module1460 = require('./1460');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1460(t);
  };
