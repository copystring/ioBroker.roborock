var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module356 = require('./356');

function s() {
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

require('./51');

var module227 = require('./227'),
  module123 = require('./123'),
  module13 = require('./13'),
  p = (function (t) {
    module7.default(h, t);

    var module123 = h,
      p = s(),
      L = function () {
        var t,
          n = module11.default(module123);

        if (p) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function h() {
      module4.default(this, h);
      return L.call(this, module356.default);
    }

    module5.default(h, [
      {
        key: 'addEventListener',
        value: function (t, n) {
          this.addListener(t, n);
        },
      },
      {
        key: 'removeEventListener',
        value: function (t, n) {
          this.removeListener(t, n);
        },
      },
      {
        key: 'openURL',
        value: function (t) {
          this._validateURL(t);

          return module356.default.openURL(t);
        },
      },
      {
        key: 'canOpenURL',
        value: function (t) {
          this._validateURL(t);

          return module356.default.canOpenURL(t);
        },
      },
      {
        key: 'openSettings',
        value: function () {
          return module356.default.openSettings();
        },
      },
      {
        key: 'getInitialURL',
        value: function () {
          return module227.runAfterInteractions().then(function () {
            return module356.default.getInitialURL();
          });
        },
      },
      {
        key: 'sendIntent',
        value: function (t, n) {
          return module356.default.sendIntent(t, n);
        },
      },
      {
        key: '_validateURL',
        value: function (t) {
          module13('string' == typeof t, 'Invalid URL: should be a string. Was: ' + t);
          module13(t, 'Invalid URL: cannot be empty');
        },
      },
    ]);
    return h;
  })(module123);

module.exports = new p();
