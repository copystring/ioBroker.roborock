exports.default = function (t, n) {
  var y, L;

  L = y = (function (n) {
    module9.default(E, n);

    var y = E,
      L = T(),
      C = function () {
        var t,
          n = module12.default(y);

        if (L) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = C.call(this, t)).state = {
        refresh: new Date().getTime(),
      };

      n.langChangeListener = function () {
        console.log('');
        n.setState({
          refresh: new Date().getTime(),
        });
        if (n.contentPage) n.contentPage.forceUpdate();
        if (n.contentPage && n.contentPage.forceRefreshForTestMode) n.contentPage.forceRefreshForTestMode();
        var t = n.contentPage && n.contentPage.eventToast;
        if (t) globals.isRobotToastTestMode ? t.startTest() : t.stopTest();
        var o,
          s,
          c = n.contentPage && n.contentPage.errorView;
        if (c) globals.isTestErrorMode ? null == c || null == (o = c.contentView) || o.startTestError() : null == c || null == (s = c.contentView) || s.stopTestError();
      };

      n.themeChangeListener = function () {
        var t;
        if (!(null == (t = n.contentPage) || null == t.onThemeChange)) t.onThemeChange(globals.app.state.theme);
      };

      return n;
    }

    module7.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          module13.DeviceEventEmitter.addListener(module420.NotificationKeys.ThemeDidChange, this.themeChangeListener.bind(this));
          module510.addLanguageListener(this.langChangeListener);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module510.removeLanguageListener(this.langChangeListener);
          module13.DeviceEventEmitter.removeListener(module420.NotificationKeys.ThemeDidChange, this.themeChangeListener.bind(this));
        },
      },
      {
        key: 'render',
        value: function () {
          var n = this,
            s = module22.default({}, this.props);
          return React.default.createElement(
            t,
            module22.default({}, s, {
              refreshTime: this.state.refresh,
              ref: function (t) {
                return (n.contentPage = t);
              },
            })
          );
        },
      },
    ]);
    return E;
  })(React.Component);

  y.navigationOptions = n
    ? {
        header: null,
      }
    : null;
  return L;
};

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module420 = require('./420');

function T() {
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

var module510 = require('./510');
