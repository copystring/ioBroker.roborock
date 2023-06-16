var t =
    Object.assign ||
    function (t) {
      for (var o = 1; o < arguments.length; o++) {
        var n = arguments[o];

        for (var c in n) Object.prototype.hasOwnProperty.call(n, c) && (t[c] = n[c]);
      }

      return t;
    },
  module1832 = require('./1832'),
  module1834 = require('./1834');

module.exports = function (c, p) {
  for (var f = [], s = p, u = c; u && 'function' == typeof u.type; u = module1832(u, s, f))
    if (((s = t({}, s, module1834(u.props, ['width', 'height', 'pixelRatio']))), u.type.isGLNode))
      return {
        childGLNode: u,
        via: f,
        context: s,
      };
};
