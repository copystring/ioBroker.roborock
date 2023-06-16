exports.__esModule = true;

var module1169 = require('./1169'),
  module1188 = require('./1188'),
  o =
    'function' == typeof module1188.default && 'symbol' == typeof module1169.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1188.default && t.constructor === module1188.default && t !== module1188.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1188.default && 'symbol' === o(module1169.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1188.default && t.constructor === module1188.default && t !== module1188.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
