var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module348 = require('./348');

function f(t) {
  var n = v();
  return function () {
    var u,
      s = module12.default(t);

    if (n) {
      var l = module12.default(this).constructor;
      u = Reflect.construct(s, arguments, l);
    } else u = s.apply(this, arguments);

    return module11.default(this, u);
  };
}

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module43 = require('./43'),
  module125 = require('./125'),
  module349 = require('./349'),
  module14 = require('./14'),
  S = (function (t) {
    module9.default(o, t);
    var c = f(o);

    function o() {
      var t;
      module6.default(this, o);
      (t = c.call(this, module348.default))._supportedEvents = ['change', 'memoryWarning', 'blur', 'focus'];
      t.isAvailable = true;
      t._eventHandlers = t._supportedEvents.reduce(function (t, n) {
        t[n] = new Map();
        return t;
      }, {});
      t.currentState = module348.default.getConstants().initialAppState;
      var u = false;
      t.addListener('appStateDidChange', function (n) {
        u = true;
        t.currentState = n.app_state;
      });
      module348.default.getCurrentAppState(function (n) {
        if (!(u || t.currentState === n.app_state)) {
          t.currentState = n.app_state;
          t.emit('appStateDidChange', n);
        }
      }, module349);
      return t;
    }

    module7.default(o, [
      {
        key: 'addEventListener',
        value: function (t, n) {
          switch ((module14(-1 !== this._supportedEvents.indexOf(t), 'Trying to subscribe to unknown event: "%s"', t), t)) {
            case 'change':
              this._eventHandlers[t].set(
                n,
                this.addListener('appStateDidChange', function (t) {
                  n(t.app_state);
                })
              );

              break;

            case 'memoryWarning':
              this._eventHandlers[t].set(n, this.addListener('memoryWarning', n));

              break;

            case 'blur':
            case 'focus':
              this._eventHandlers[t].set(
                n,
                this.addListener('appStateFocusChange', function (u) {
                  if (!('blur' !== t || u)) n();
                  if ('focus' === t && u) n();
                })
              );
          }
        },
      },
      {
        key: 'removeEventListener',
        value: function (t, n) {
          module14(-1 !== this._supportedEvents.indexOf(t), 'Trying to remove listener for unknown event: "%s"', t);

          if (this._eventHandlers[t].has(n)) {
            this._eventHandlers[t].get(n).remove();

            this._eventHandlers[t].delete(n);
          }
        },
      },
    ]);
    return o;
  })(module125);

function b() {
  module14(false, 'Cannot use AppState module when native RCTAppState is not included in the build.\nEither include it, or check AppState.isAvailable before calling any methods.');
}

var k = (function (t, ...args) {
  module9.default(o, t);
  var c = f(o);

  function o() {
    var t;
    module6.default(this, o);
    (t = c.call(this, ...args)).isAvailable = false;
    t.currentState = null;
    return t;
  }

  module7.default(o, [
    {
      key: 'addEventListener',
      value: function () {
        b();
      },
    },
    {
      key: 'removeEventListener',
      value: function () {
        b();
      },
    },
    {
      key: 'addListener',
      value: function () {
        b();
      },
    },
    {
      key: 'removeAllListeners',
      value: function () {
        b();
      },
    },
    {
      key: 'removeSubscription',
      value: function () {
        b();
      },
    },
  ]);
  return o;
})(module43);

S = module348.default ? new S() : new k();
module.exports = S;
