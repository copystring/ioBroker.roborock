var module4 = require('./4'),
  module5 = require('./5'),
  module43 = require('./43'),
  module45 = require('./45'),
  module13 = require('./13'),
  c = function () {
    return true;
  },
  b = (function () {
    function b(n) {
      module4(this, b);
      this._subscriber = n || new module45();
    }

    module5(b, [
      {
        key: 'addListener',
        value: function (t, n, u) {
          return this._subscriber.addSubscription(t, new module43(this, this._subscriber, n, u));
        },
      },
      {
        key: 'once',
        value: function (t, n, s) {
          var u = this;
          return this.addListener(t, function (...args) {
            u.removeCurrentListener();
            n.apply(s, args);
          });
        },
      },
      {
        key: 'removeAllListeners',
        value: function (t) {
          this._subscriber.removeAllSubscriptions(t);
        },
      },
      {
        key: 'removeCurrentListener',
        value: function () {
          module13(!!this._currentSubscription, 'Not in an emitting cycle; there is no current subscription');
          this.removeSubscription(this._currentSubscription);
        },
      },
      {
        key: 'removeSubscription',
        value: function (t) {
          module13(t.emitter === this, 'Subscription does not belong to this emitter.');

          this._subscriber.removeSubscription(t);
        },
      },
      {
        key: 'listeners',
        value: function (t) {
          var n = this._subscriber.getSubscriptionsForType(t);

          return n
            ? n.filter(c).map(function (t) {
                return t.listener;
              })
            : [];
        },
      },
      {
        key: 'emit',
        value: function (t) {
          var n = this._subscriber.getSubscriptionsForType(t);

          if (n) {
            for (var s = 0, u = n.length; s < u; s++) {
              var o = n[s];

              if (o && o.listener) {
                this._currentSubscription = o;
                o.listener.apply(o.context, Array.prototype.slice.call(arguments, 1));
              }
            }

            this._currentSubscription = null;
          }
        },
      },
      {
        key: 'removeListener',
        value: function (t, n) {
          var s = this._subscriber.getSubscriptionsForType(t);

          if (s)
            for (var u = 0, o = s.length; u < o; u++) {
              var c = s[u];
              if (c && c.listener === n) c.remove();
            }
        },
      },
    ]);
    return b;
  })();

module.exports = b;
