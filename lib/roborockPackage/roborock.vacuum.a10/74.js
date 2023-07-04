var module46 = require('./46');

module.exports = function (t, o) {
  return function (c, u, p) {
    if (!(module46.getViewManagerConfig(p) || undefined === c[u])) console.warn('`' + u + '` supplied to `' + p + '` has been deprecated. ' + o);

    for (var s = arguments.length, f = new Array(s > 3 ? s - 3 : 0), l = 3; l < s; l++) f[l - 3] = arguments[l];

    return t.apply(undefined, [c, u, p].concat(f));
  };
};
