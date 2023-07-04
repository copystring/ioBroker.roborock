exports.__esModule = true;

var module1171 = require('./1171'),
  module1190 = require('./1190'),
  o =
    'function' == typeof module1190.default && 'symbol' == typeof module1171.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1190.default && t.constructor === module1190.default && t !== module1190.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1190.default && 'symbol' === o(module1171.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1190.default && t.constructor === module1190.default && t !== module1190.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
