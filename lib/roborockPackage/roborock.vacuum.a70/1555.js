exports.__esModule = true;

var module1556 = require('./1556'),
  module1575 = require('./1575'),
  o =
    'function' == typeof module1575.default && 'symbol' == typeof module1556.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1575.default && t.constructor === module1575.default && t !== module1575.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1575.default && 'symbol' === o(module1556.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1575.default && t.constructor === module1575.default && t !== module1575.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
