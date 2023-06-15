function o(t) {
  '@babel/helpers - typeof';

  if ('function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator'))
    module.exports = o = function (o) {
      return typeof o;
    };
  else
    module.exports = o = function (o) {
      return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof o;
    };
  return o(t);
}

module.exports = o;
