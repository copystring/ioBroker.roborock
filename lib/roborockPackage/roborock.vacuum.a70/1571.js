var module1572 = require('./1572'),
  module1573 = require('./1573'),
  module1562 = require('./1562'),
  module1533 = require('./1533');

module.exports = require('./1560')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1533(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1573(1);
    } else return module1573(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1562.Arguments = module1562.Array;
module1572('keys');
module1572('values');
module1572('entries');
