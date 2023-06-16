var module6 = require('./6'),
  module44 = require('./44'),
  module46 = require('./46'),
  module14 = require('./14'),
  c = function () {
    return true;
  };

class b {
  constructor(n) {
    module6(this, b);
    this._subscriber = n || new module46();
  }

  addListener(t, n, u) {
    return this._subscriber.addSubscription(t, new module44(this, this._subscriber, n, u));
  }

  once(t, n, s) {
    var u = this;
    return this.addListener(t, function (...args) {
      u.removeCurrentListener();
      n.apply(s, args);
    });
  }

  removeAllListeners(t) {
    this._subscriber.removeAllSubscriptions(t);
  }

  removeCurrentListener() {
    module14(!!this._currentSubscription, 'Not in an emitting cycle; there is no current subscription');
    this.removeSubscription(this._currentSubscription);
  }

  removeSubscription(t) {
    module14(t.emitter === this, 'Subscription does not belong to this emitter.');

    this._subscriber.removeSubscription(t);
  }

  listeners(t) {
    var n = this._subscriber.getSubscriptionsForType(t);

    return n
      ? n.filter(c).map(function (t) {
          return t.listener;
        })
      : [];
  }

  emit(t) {
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
  }

  removeListener(t, n) {
    var s = this._subscriber.getSubscriptionsForType(t);

    if (s)
      for (var u = 0, o = s.length; u < o; u++) {
        var c = s[u];
        if (c && c.listener === n) c.remove();
      }
  }
}

module.exports = b;
