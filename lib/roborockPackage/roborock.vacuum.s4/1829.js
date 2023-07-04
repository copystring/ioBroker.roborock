var n =
    'function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')
      ? function (n) {
          return typeof n;
        }
      : function (n) {
          return n && 'function' == typeof Symbol && n.constructor === Symbol && n !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof n;
        },
  React = require('react'),
  module1830 = require('./1830');

module.exports = function f(u) {
  var b = undefined === u ? 'undefined' : n(u);

  if ('number' === b) {
    if (isNaN(u) || !isFinite(u)) throw new Error("invalid number: '" + u + "'");
    return b;
  }

  if ('boolean' === b) return b;
  if ('string' === b) return b;
  if ('undefined' === b) return null;

  if ('object' === b) {
    if (!u) return null;
    if ('string' == typeof u.uri) return '{uri}';
    if (u.data && u.shape && u.stride) return 'ndarray';

    if (u instanceof Array) {
      var l = u.length;
      if (!l) throw new Error('array is empty');

      for (var s = false, c = false, y = false, p = false, w = 0; w < l; w++) {
        var v = u[w];

        switch (undefined === v ? 'undefined' : n(v)) {
          case 'object':
            if (v && module1830(v)) s = true;
            else {
              if (!v || !React.isValidElement(v)) {
                if (v instanceof Array) return f(v);
                throw new Error('at index ' + w + ", Unrecognized object: '" + v + "'");
              }

              c = true;
            }
            break;

          case 'number':
            if (isNaN(v) || !isFinite(v)) throw new Error('at index ' + w + ", invalid number: '" + v + "'");
            y = true;
            break;

          case 'boolean':
            p = true;
            break;

          default:
            throw new Error('at index ' + w + ', Unrecognized object: ' + v);
        }
      }

      if ((y || p || s) && c) throw new Error('Invalid array. Found both VDOM value and numbers/booleans/animated');
      if (c) return 'vdom[]';
      if (s) return 'animated[]';
      if (y) return 'number[]';
      if (p) return 'boolean[]';
    }

    if (module1830(u)) return 'animated';
    if (React.isValidElement(u)) return 'vdom';
  }

  throw new Error('Unrecognized object: ' + u);
};
