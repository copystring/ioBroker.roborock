exports.__esModule = true;

var module1563 = require('./1563'),
  module1582 = require('./1582'),
  o =
    'function' == typeof module1582.default && 'symbol' == typeof module1563.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1582.default && t.constructor === module1582.default && t !== module1582.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1582.default && 'symbol' === o(module1563.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1582.default && t.constructor === module1582.default && t !== module1582.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
