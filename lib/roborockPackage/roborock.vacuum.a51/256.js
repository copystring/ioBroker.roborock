var module6 = require('./6'),
  module231 = require('./231');

class s {
  constructor(n, l) {
    module6(this, s);
    this._delay = l;
    this._callback = n;
  }

  dispose() {
    var t =
      arguments.length > 0 && undefined !== arguments[0]
        ? arguments[0]
        : {
            abort: false,
          };

    if (this._taskHandle) {
      this._taskHandle.cancel();

      if (!t.abort) this._callback();
      this._taskHandle = null;
    }
  }

  schedule() {
    var t = this;

    if (!this._taskHandle) {
      var n = setTimeout(function () {
        t._taskHandle = module231.runAfterInteractions(function () {
          t._taskHandle = null;

          t._callback();
        });
      }, this._delay);
      this._taskHandle = {
        cancel: function () {
          return clearTimeout(n);
        },
      };
    }
  }
}

module.exports = s;
