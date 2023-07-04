var module1535 = require('./1535');

module.exports =
  Array.isArray ||
  function (t) {
    return 'Array' == module1535(t);
  };
