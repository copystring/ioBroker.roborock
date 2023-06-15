exports.__esModule = true;

var module1483 = require('./1483'),
  module1502 = require('./1502'),
  o =
    'function' == typeof module1502.default && 'symbol' == typeof module1483.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1502.default && t.constructor === module1502.default && t !== module1502.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1502.default && 'symbol' === o(module1483.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1502.default && t.constructor === module1502.default && t !== module1502.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
