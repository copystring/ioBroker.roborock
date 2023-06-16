var module47 = require('./47');

module.exports = function (t, o) {
  return function (c, u, p) {
    if (!(module47.getViewManagerConfig(p) || undefined === c[u])) console.warn('`' + u + '` supplied to `' + p + '` has been deprecated. ' + o);

    for (var s = arguments.length, f = new Array(s > 3 ? s - 3 : 0), l = 3; l < s; l++) f[l - 3] = arguments[l];

    return t.apply(undefined, [c, u, p].concat(f));
  };
};
