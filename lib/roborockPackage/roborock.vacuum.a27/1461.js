var module1462 = require('./1462');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1462(n) ? n.split('') : Object(n);
    };
