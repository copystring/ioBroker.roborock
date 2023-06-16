var module1486 = require('./1486')(true);

require('./1487')(
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
      n = module1486(h, s);
      this._i += n.length;
      return {
        value: n,
        done: false,
      };
    }
  }
);
