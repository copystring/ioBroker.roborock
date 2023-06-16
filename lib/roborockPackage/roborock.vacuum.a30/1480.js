exports.__esModule = true;

var module1481 = require('./1481'),
  module1500 = require('./1500'),
  o =
    'function' == typeof module1500.default && 'symbol' == typeof module1481.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1500.default && t.constructor === module1500.default && t !== module1500.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1500.default && 'symbol' === o(module1481.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1500.default && t.constructor === module1500.default && t !== module1500.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
