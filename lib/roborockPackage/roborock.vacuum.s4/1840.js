var o =
  'function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')
    ? function (o) {
        return typeof o;
      }
    : function (o) {
        return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof o;
      };

module.exports = function (t) {
  var n = [];

  for (var y in t) {
    var f = t[y];
    if (f && 'object' === (undefined === f ? 'undefined' : o(f)) && 'uri' === f.type && f.uri && 'string' == typeof f.uri) n.push(f);
  }

  return n;
};
