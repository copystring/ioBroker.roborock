exports.__esModule = true;

var module1266 = require('./1266'),
  module1285 = require('./1285'),
  o =
    'function' == typeof module1285.default && 'symbol' == typeof module1266.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1285.default && t.constructor === module1285.default && t !== module1285.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1285.default && 'symbol' === o(module1266.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1285.default && t.constructor === module1285.default && t !== module1285.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
