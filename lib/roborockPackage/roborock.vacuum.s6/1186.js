var module1187 = require('./1187'),
  module1188 = require('./1188'),
  module1177 = require('./1177'),
  module1148 = require('./1148');

module.exports = require('./1175')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1148(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1188(1);
    } else return module1188(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1177.Arguments = module1177.Array;
module1187('keys');
module1187('values');
module1187('entries');
