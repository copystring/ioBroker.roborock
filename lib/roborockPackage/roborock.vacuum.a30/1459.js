var module1460 = require('./1460');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1460(n) ? n.split('') : Object(n);
    };
