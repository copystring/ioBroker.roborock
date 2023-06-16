exports.default = function (t, n) {
  var T, P;

  P = T = (function (n) {
    module7.default(R, n);

    var T = R,
      P = v(),
      y = function () {
        var t,
          n = module11.default(T);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = y.call(this, t)).state = {
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
          u,
          c = n.contentPage && n.contentPage.errorView;
        if (c) globals.isTestErrorMode ? null == c || null == (o = c.contentView) || o.startTestError() : null == c || null == (u = c.contentView) || u.stopTestError();
      };

      return n;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          module505.addLanguageListener(this.langChangeListener);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module505.removeLanguageListener(this.langChangeListener);
        },
      },
      {
        key: 'render',
        value: function () {
          var n = this,
            u = module22.default({}, this.props);
          return React.default.createElement(
            t,
            module22.default({}, u, {
              refreshTime: this.state.refresh,
              ref: function (t) {
                return (n.contentPage = t);
              },
            })
          );
        },
      },
    ]);
    return R;
  })(React.Component);

  T.navigationOptions = n
    ? {
        header: null,
      }
    : null;
  return P;
};

var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react');

require('./12');

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

var module505 = require('./505');
