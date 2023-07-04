var module1148 = require('./1148');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1148(n) ? n.split('') : Object(n);
    };
