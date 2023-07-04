var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1915 = require('./1915'),
  module1121 = require('./1121'),
  module515 = require('./515');

function y() {
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

var C = (function (t) {
  module7.default(B, t);

  var n = B,
    module1121 = y(),
    C = function () {
      var t,
        o = module11.default(n);

      if (module1121) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function B(t) {
    var n;
    module4.default(this, B);

    (n = C.call(this, t)).onMessageForIos = function () {};

    n.state = {};
    return n;
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
          c = n.refrence,
          s = n.buttonTitle,
          u = n.buttonAction,
          w = n.buttonColor,
          y = n.isNotMarginBottom,
          C =
            (o && {
              uri: o,
            }) ||
            (l && {
              html: l,
            }) ||
            c,
          B = null;
        if (globals.app.state.theme == module515.Themes.dark) B = 'javascript:document.body.style.color="white";javascript:document.body.style.background="black";';

        var _ = 'ios' == module12.Platform.OS ? this.onMessageForIos : null;

        return React.default.createElement(
          module12.View,
          {
            style: [
              k.containter,
              {
                backgroundColor: this.context.theme.webPageBackgroundColor,
              },
            ],
          },
          React.default.createElement(module1915.WebView, {
            bounces: false,
            scrollEnabled: true,
            source: C,
            style: [
              k.webView,
              {
                marginBottom: y ? 20 : 70,
                width: module12.Dimensions.get('window').width,
                backgroundColor: 'transparent',
              },
            ],
            allowFileAccess: true,
            allowFileAccessFromFileURLs: true,
            originWhitelist: ['https://*', 'http://*', 'tel://*', 'sms://*'],
            textZoom: 100,
            javaScriptEnabled: true,
            onMessage: _,
            injectedJavaScript: B,
          }),
          s &&
            React.default.createElement(module385.PureButton, {
              funcId: 'webViewButton',
              title: s,
              onPress: function () {
                if (u) u(t);
              },
              fontSize: 18,
              textColor: w || 'white',
              style: [
                k.aButton,
                {
                  backgroundColor: this.context.theme.webPageBackgroundColor,
                },
              ],
            }),
          React.default.createElement(module385.AlertView, {
            ref: function (n) {
              return (t.alertView = n);
            },
          }),
          React.default.createElement(module385.CancelableLoadingView, {
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

exports.default = C;
C.contextType = module1121.AppConfigContext;
var k = module12.StyleSheet.create({
  containter: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
  aButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
});
