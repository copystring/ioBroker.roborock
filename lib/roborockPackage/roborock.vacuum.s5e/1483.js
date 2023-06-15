var module1484 = require('./1484')(true);

require('./1485')(
  String,
  'String',
  function (t) {
    this._t = String(t);
    this._i = 0;
  },
  function () {
    var n,
      h = this._t,
      s = this._i;
    if (s >= h.length)
      return {
        value: undefined,
        done: true,
      };
    else {
      n = module1484(h, s);
      this._i += n.length;
      return {
        value: n,
        done: false,
      };
    }
  }
);
