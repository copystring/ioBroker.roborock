var regeneratorRuntime = require('regenerator-runtime'),
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
    var o = x(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, l, u);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1892 = require('./1892'),
  module407 = require('./407'),
  module377 = require('./377'),
  module507 = require('./507'),
  module506 = require('./506');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (x = function (t) {
    return t ? o : n;
  })(t);
}

function S() {
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

var module389 = require('./389'),
  module491 = require('./491').strings,
  B = (function (t) {
    module7.default(C, t);

    var module506 = C,
      x = S(),
      B = function () {
        var t,
          n = module11.default(module506);

        if (x) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = B.call(this, t)).state = {
        isSure: false,
      };
      return n;
    }

    module5.default(C, [
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
            s = n.html,
            c = n.refrence,
            l =
              (o && {
                uri: o,
              }) ||
              (s && {
                html: s,
              }) ||
              c,
            u = null;
          if (globals.app.state.theme == module507.Themes.dark) u = 'javascript:document.body.style.color="white";javascript:document.body.style.background="black";';
          var v = 'ios' == module12.Platform.OS ? this.onMessageForIos : null,
            module1981 = this.state.isSure ? require('./1981') : this.context.theme.monitor.confirmPhoto;
          return React.default.createElement(
            module12.View,
            {
              style: [
                A.containter,
                {
                  backgroundColor: this.context.theme.settingListItem.miSetBackgroundColor,
                },
              ],
            },
            React.default.createElement(module1892.WebView, {
              bounces: false,
              scrollEnabled: true,
              source: l,
              style: A.webView,
              allowFileAccess: true,
              allowFileAccessFromFileURLs: true,
              originWhitelist: ['*'],
              textZoom: 100,
              javaScriptEnabled: true,
              onMessage: v,
              injectedJavaScript: u,
            }),
            React.default.createElement(module381.PureButton, {
              title: module491.rubys_setting_guide_contact_report_log,
              onPress: function () {
                t.buttonAction();
              },
              fontSize: 18,
              textColor: 'white',
              style: [
                A.aButton,
                {
                  backgroundColor: this.state.isSure ? '#007AFF' : this.context.theme.setting.delBackgroundColor,
                },
              ],
            }),
            React.default.createElement(
              module12.View,
              {
                style: A.confirmView,
              },
              React.default.createElement(
                module12.TouchableOpacity,
                {
                  style: A.confirmButton,
                  onPress: function () {
                    t.confirmButtonAuction();
                  },
                },
                React.default.createElement(module12.Image, {
                  style: A.confirmButtonImage,
                  source: module1981,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    A.confirmText,
                    {
                      color: this.context.theme.mainTextColor,
                    },
                  ],
                },
                module491.wifi_debug_mode_title2
              )
            ),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alertView = n);
              },
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'wifi_debug_view_loading',
              closeAccessibilityLabelKey: 'wifi_debug_view_loading_close',
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
      {
        key: 'buttonAction',
        value: function () {
          if (this.state.isSure) this.postPrivacyAgreement();
        },
      },
      {
        key: 'confirmButtonAuction',
        value: function () {
          this.setState({
            isSure: !this.state.isSure,
          });
        },
      },
      {
        key: 'postPrivacyAgreement',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.postPrivacyAgreementStatus(module377.RobotStatusManager.sharedManager().serverCode, 6));

                  case 3:
                    t = o.sent;
                    console.log('postPrivacyAgreementStatus - ' + t);
                    this.uploadDataDebugMode();
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module491.map_object_ignore_failed);
                    console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 12:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'uploadDataDebugMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.uploadDataDebugMode());

                  case 3:
                    t = o.sent;
                    console.log('getMapBeautificationStatus - ' + JSON.stringify(t));
                    globals.showToast(module491.map_reset_page_operate_success);
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module491.map_object_ignore_failed);
                    console.log(o.t0);

                  case 12:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            null,
            [[0, 8]],
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
var A = module12.StyleSheet.create({
  containter: {
    width: module12.Dimensions.get('window').width,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    width: module12.Dimensions.get('window').width,
    marginBottom: 70,
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
  confirmView: {
    color: '#009eff',
    height: 30,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
    marginVertical: 20,
    marginHorizontal: 20,
    marginBottom: 65,
  },
  confirmButton: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 45,
    width: 25,
  },
  confirmButtonImage: {
    resizeMode: 'contain',
    height: 18,
    width: 18,
  },
  confirmText: {
    alignSelf: 'center',
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'left',
    marginRight: 20,
    fontSize: 12,
  },
});
