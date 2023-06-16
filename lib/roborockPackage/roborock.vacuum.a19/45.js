var module4 = require('./4'),
  module5 = require('./5'),
  module13 = require('./13'),
  o = (function () {
    function o() {
      module4(this, o);
      this._subscriptionsForType = {};
      this._currentSubscription = null;
    }

    module5(o, [
      {
        key: 'addSubscription',
        value: function (s, t) {
          module13(t.subscriber === this, 'The subscriber of the subscription is incorrectly set.');
          if (!this._subscriptionsForType[s]) this._subscriptionsForType[s] = [];
          var o = this._subscriptionsForType[s].length;

          this._subscriptionsForType[s].push(t);

          t.eventType = s;
          t.key = o;
          return t;
        },
      },
      {
        key: 'removeAllSubscriptions',
        value: function (s) {
          if (undefined === s) this._subscriptionsForType = {};
          else delete this._subscriptionsForType[s];
        },
      },
      {
        key: 'removeSubscription',
        value: function (s) {
          var t = s.eventType,
            n = s.key,
            o = this._subscriptionsForType[t];
          if (o) delete o[n];
        },
      },
      {
        key: 'getSubscriptionsForType',
        value: function (s) {
          return this._subscriptionsForType[s];
        },
      },
    ]);
    return o;
  })();

module.exports = o;
