var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module355 = require('./355');

function s(t, n) {
  var u = t[n];
  if ('object' == typeof u && 'function' == typeof u.getMonth) t[n] = u.getTime();
}

var l = (function () {
  function t() {
    module6.default(this, t);
  }

  module7.default(t, null, [
    {
      key: 'open',
      value: function (t) {
        var u;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if (null != (u = t)) {
                    s(u, 'date');
                    s(u, 'minDate');
                    s(u, 'maxDate');
                  }

                  return n.abrupt('return', module355.default.open(t));

                case 3:
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

l.dateSetAction = 'dateSetAction';
l.dismissedAction = 'dismissedAction';
module.exports = l;
