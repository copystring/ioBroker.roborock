module.exports = function (t) {
  for (var n = {}, o = 0, c = arguments.length; o < c; o++) {
    var u = arguments[o];

    for (var f in ('function' == typeof u && (u = u.prototype), u)) n[f] = u[f];
  }

  if (!n.initialize) n.initialize = function () {};

  n.constructor = function (t, o, c, u, f, p, l, s) {
    return new n.initialize(t, o, c, u, f, p, l, s);
  };

  n.constructor.prototype = n.initialize.prototype = n;
  return n.constructor;
};
