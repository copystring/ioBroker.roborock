var module4 = require('./4'),
  module5 = require('./5'),
  n = (function () {
    function n(s) {
      module4(this, n);
      this.subscriber = s;
    }

    module5(n, [
      {
        key: 'remove',
        value: function () {
          this.subscriber.removeSubscription(this);
        },
      },
    ]);
    return n;
  })();

module.exports = n;
