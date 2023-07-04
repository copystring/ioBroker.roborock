var module1185 = require('./1185'),
  module1186 = require('./1186'),
  module1175 = require('./1175'),
  module1146 = require('./1146');

module.exports = require('./1173')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1146(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1186(1);
    } else return module1186(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1175.Arguments = module1175.Array;
module1185('keys');
module1185('values');
module1185('entries');
