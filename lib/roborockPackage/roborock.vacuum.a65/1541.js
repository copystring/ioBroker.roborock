var module1542 = require('./1542');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1542(n) ? n.split('') : Object(n);
    };
