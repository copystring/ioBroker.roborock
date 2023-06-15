var module1499 = require('./1499'),
  module1500 = require('./1500'),
  module1489 = require('./1489'),
  module1460 = require('./1460');

module.exports = require('./1487')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1460(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1500(1);
    } else return module1500(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1489.Arguments = module1489.Array;
module1499('keys');
module1499('values');
module1499('entries');
