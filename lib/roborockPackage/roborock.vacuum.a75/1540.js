var module1541 = require('./1541');

module.exports = Object('z').propertyIsEnumerable(0)
  ? Object
  : function (n) {
      return 'String' == module1541(n) ? n.split('') : Object(n);
    };
