var module4 = require('./4'),
  module5 = require('./5'),
  module227 = require('./227'),
  s = (function () {
    function s(n, l) {
      module4(this, s);
      this._delay = l;
      this._callback = n;
    }

    module5(s, [
      {
        key: 'dispose',
        value: function () {
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
        },
      },
      {
        key: 'schedule',
        value: function () {
          var t = this;

          if (!this._taskHandle) {
            var n = setTimeout(function () {
              t._taskHandle = module227.runAfterInteractions(function () {
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
        },
      },
    ]);
    return s;
  })();

module.exports = s;
