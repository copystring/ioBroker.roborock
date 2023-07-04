var module1174 = require('./1174')(true);

require('./1175')(
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
      n = module1174(h, s);
      this._i += n.length;
      return {
        value: n,
        done: false,
      };
    }
  }
);
