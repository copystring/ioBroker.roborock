var module1535 = require('./1535');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1535(n) ? n.split('') : Object(n);
    };
