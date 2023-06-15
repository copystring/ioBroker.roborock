var module1150 = require('./1150');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1150(n) ? n.split('') : Object(n);
    };
