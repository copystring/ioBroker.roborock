var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module344 = require('./344');

function f(t) {
  var n = v();
  return function () {
    var u,
      s = module11.default(t);

    if (n) {
      var l = module11.default(this).constructor;
      u = Reflect.construct(s, arguments, l);
    } else u = s.apply(this, arguments);

    return module9.default(this, u);
  };
}

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module42 = require('./42'),
  module123 = require('./123'),
  module345 = require('./345'),
  module13 = require('./13'),
  S = (function (t) {
    module7.default(c, t);
    var o = f(c);

    function c() {
      var t;
      module4.default(this, c);
      (t = o.call(this, module344.default))._supportedEvents = ['change', 'memoryWarning', 'blur', 'focus'];
      t.isAvailable = true;
      t._eventHandlers = t._supportedEvents.reduce(function (t, n) {
        t[n] = new Map();
        return t;
      }, {});
      t.currentState = module344.default.getConstants().initialAppState;
      var u = false;
      t.addListener('appStateDidChange', function (n) {
        u = true;
        t.currentState = n.app_state;
      });
      module344.default.getCurrentAppState(function (n) {
        if (!(u || t.currentState === n.app_state)) {
          t.currentState = n.app_state;
          t.emit('appStateDidChange', n);
        }
      }, module345);
      return t;
    }

    module5.default(c, [
      {
        key: 'addEventListener',
        value: function (t, n) {
          switch ((module13(-1 !== this._supportedEvents.indexOf(t), 'Trying to subscribe to unknown event: "%s"', t), t)) {
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
          module13(-1 !== this._supportedEvents.indexOf(t), 'Trying to remove listener for unknown event: "%s"', t);

          if (this._eventHandlers[t].has(n)) {
            this._eventHandlers[t].get(n).remove();

            this._eventHandlers[t].delete(n);
          }
        },
      },
    ]);
    return c;
  })(module123);

function b() {
  module13(false, 'Cannot use AppState module when native RCTAppState is not included in the build.\nEither include it, or check AppState.isAvailable before calling any methods.');
}

var k = (function (t, ...args) {
  module7.default(c, t);
  var o = f(c);

  function c() {
    var t;
    module4.default(this, c);
    (t = o.call(this, ...args)).isAvailable = false;
    t.currentState = null;
    return t;
  }

  module5.default(c, [
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
  return c;
})(module42);

S = module344.default ? new S() : new k();
module.exports = S;
