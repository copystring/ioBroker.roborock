var module1245 = require('./1245');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1245(n) ? n.split('') : Object(n);
    };
