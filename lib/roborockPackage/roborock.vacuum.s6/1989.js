exports.default = function (t, p) {
  var y, P;

  P = y = (function (p) {
    module7.default(O, p);

    var y = O,
      P = h(),
      T = function () {
        var t,
          n = module11.default(y);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);
      (n = T.call(this, t)).state = {
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
        var o = n.contentPage && n.contentPage.errorView;
        if (o) globals.isTestErrorMode ? null == o || o.startTestError() : null == o || o.stopTestError();
      };

      return n;
    }

    module5.default(O, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          module491.addLanguageListener(this.langChangeListener);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module491.removeLanguageListener(this.langChangeListener);
        },
      },
      {
        key: 'render',
        value: function () {
          var o = this,
            u = module21.default({}, this.props);
          return React.default.createElement(
            t,
            module21.default({}, u, {
              refreshTime: this.state.refresh,
              ref: function (t) {
                return (o.contentPage = t);
              },
            })
          );
        },
      },
    ]);
    return O;
  })(React.Component);

  y.navigationOptions = p
    ? {
        header: null,
      }
    : null;
  return P;
};

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = p(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react'));

require('./12');

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (p = function (t) {
    return t ? o : n;
  })(t);
}

function h() {
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

var module491 = require('./491');
