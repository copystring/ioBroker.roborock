var module1497 = require('./1497'),
  module1498 = require('./1498'),
  module1487 = require('./1487'),
  module1458 = require('./1458');

module.exports = require('./1485')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1458(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1498(1);
    } else return module1498(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1487.Arguments = module1487.Array;
module1497('keys');
module1497('values');
module1497('entries');
