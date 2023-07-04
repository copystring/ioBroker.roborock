exports.__esModule = true;

var module1562 = require('./1562'),
  module1581 = require('./1581'),
  o =
    'function' == typeof module1581.default && 'symbol' == typeof module1562.default
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t && 'function' == typeof module1581.default && t.constructor === module1581.default && t !== module1581.default.prototype ? 'symbol' : typeof t;
        };

exports.default =
  'function' == typeof module1581.default && 'symbol' === o(module1562.default)
    ? function (t) {
        return undefined === t ? 'undefined' : o(t);
      }
    : function (t) {
        return t && 'function' == typeof module1581.default && t.constructor === module1581.default && t !== module1581.default.prototype
          ? 'symbol'
          : undefined === t
          ? 'undefined'
          : o(t);
      };
