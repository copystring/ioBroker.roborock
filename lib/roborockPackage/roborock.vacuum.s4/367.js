var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module368 = require('./368'),
  c = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'open',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!module368.default) {
                      n.next = 4;
                      break;
                    }

                    return n.abrupt('return', module368.default.open(t));

                  case 4:
                    return n.abrupt(
                      'return',
                      Promise.reject({
                        message: 'TimePickerAndroid is not supported on this platform.',
                      })
                    );

                  case 5:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
    ]);
    return t;
  })();

c.timeSetAction = 'timeSetAction';
c.dismissedAction = 'dismissedAction';
module.exports = c;
