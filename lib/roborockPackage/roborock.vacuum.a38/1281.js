var module1282 = require('./1282'),
  module1283 = require('./1283'),
  module1272 = require('./1272'),
  module1243 = require('./1243');

module.exports = require('./1270')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1243(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1283(1);
    } else return module1283(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1272.Arguments = module1272.Array;
module1282('keys');
module1282('values');
module1282('entries');
