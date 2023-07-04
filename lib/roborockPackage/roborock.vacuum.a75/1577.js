var module1578 = require('./1578'),
  module1579 = require('./1579'),
  module1568 = require('./1568'),
  module1539 = require('./1539');

module.exports = require('./1566')(
  Array,
  'Array',
  function (t, s) {
    this._t = module1539(t);
    this._i = 0;
    this._k = s;
  },
  function () {
    var t = this._t,
      n = this._k,
      u = this._i++;

    if (!t || u >= t.length) {
      this._t = undefined;
      return module1579(1);
    } else return module1579(0, 'keys' == n ? u : 'values' == n ? t[u] : [u, t[u]]);
  },
  'values'
);
module1568.Arguments = module1568.Array;
module1578('keys');
module1578('values');
module1578('entries');
