var module4 = require('./4'),
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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, c, s);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1890 = require('./1890');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function b() {
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

var y = (function (t) {
  module7.default(B, t);

  var h = B,
    y = b(),
    _ = function () {
      var t,
        n = module11.default(h);

      if (y) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function B(t) {
    var o;
    module4.default(this, B);
    (o = _.call(this, t)).state = {};
    return o;
  }

  module5.default(B, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        if (this.props.navigation.state.params.refreshCurrent) this.props.navigation.state.params.refreshCurrent();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.props.navigation.state.params || {},
          o = n.url,
          l = n.html,
          u = n.refrence,
          c = n.buttonTitle,
          h = n.buttonAction,
          b = n.buttonColor,
          y = n.buttonBackgroundColor,
          _ = n.isNotMarginBottom,
          B =
            (o && {
              uri: o,
            }) ||
            (l && {
              html: l,
            }) ||
            u;
        return React.default.createElement(
          module12.View,
          {
            style: [
              v.containter,
              {
                backgroundColor: y,
              },
            ],
          },
          React.default.createElement(module1890.WebView, {
            bounces: false,
            scrollEnabled: true,
            source: B,
            style: [
              v.webView,
              {
                marginBottom: _ ? 0 : 70,
              },
            ],
            allowFileAccess: true,
            allowFileAccessFromFileURLs: true,
            originWhitelist: ['https://*', 'http://*', 'tel://*', 'sms://*'],
            textZoom: 100,
          }),
          c &&
            React.default.createElement(module381.PureButton, {
              title: c,
              onPress: function () {
                if (h) h(t);
              },
              fontSize: 18,
              textColor: b || 'white',
              style: [
                v.aButton,
                {
                  backgroundColor: y || 'transparent',
                },
              ],
            }),
          React.default.createElement(module381.AlertView, {
            ref: function (n) {
              return (t.alertView = n);
            },
          }),
          React.default.createElement(module381.CancelableLoadingView, {
            loadingAccessibilityLabelKey: 'web_view_loading',
            closeAccessibilityLabelKey: 'web_view_loading_close',
            ref: function (n) {
              t.loadingView = n;
            },
            onPressCancel: function () {
              t.props.navigation.goBack();
            },
            showButton: true,
          })
        );
      },
    },
  ]);
  return B;
})(React.Component);

exports.default = y;
var v = module12.StyleSheet.create({
  containter: {
    width: module12.Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    width: module12.Dimensions.get('window').width,
  },
  aButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: 280,
    height: 40,
    marginBottom: 20,
    borderRadius: 20,
  },
});
