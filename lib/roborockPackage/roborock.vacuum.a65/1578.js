var module1579 = require('./1579'),
  module1580 = require('./1580'),
  module1569 = require('./1569'),
  module1540 = require('./1540');

module.exports = require('./1567')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1540(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1580(1);
    } else return module1580(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1569.Arguments = module1569.Array;
module1579('keys');
module1579('values');
module1579('entries');
