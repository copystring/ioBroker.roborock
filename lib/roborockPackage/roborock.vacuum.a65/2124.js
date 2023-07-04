var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module2004 = require('./2004'),
  module416 = require('./416'),
  module381 = require('./381'),
  module520 = require('./520'),
  module1200 = require('./1200'),
  module418 = require('./418'),
  module391 = require('./391');

function A() {
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

var module393 = require('./393'),
  module510 = require('./510').strings,
  module177 = require('./177'),
  E = (function (t) {
    module9.default(R, t);

    var n = R,
      module1200 = A(),
      E = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);
      (n = E.call(this, t)).state = {
        isSure: false,
      };
      return n;
    }

    module7.default(R, [
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
            c = n.refrence;
          module418.Log.log(module418.LogTypes.KeyEvent, 'wifi debug page html path,' + module177(c).uri);
          var l = module177(c).uri,
            u =
              (o && {
                uri: o,
              }) ||
              (s && {
                html: s,
              }) ||
              c,
            f = null;
          if (globals.app.state.theme == module520.Themes.dark) f = 'javascript:document.body.style.color="white";javascript:document.body.style.background="black";';
          var b = 'ios' == module13.Platform.OS ? this.onMessageForIos : null,
            module2098 = this.state.isSure ? require('./2098') : this.context.theme.monitor.confirmPhoto;
          return React.default.createElement(
            module13.View,
            {
              style: [
                T.containter,
                {
                  backgroundColor: this.context.theme.settingListItem.miSetBackgroundColor,
                },
              ],
            },
            React.default.createElement(module2004.WebView, {
              bounces: false,
              scrollEnabled: true,
              source: module391.default.iOSAndroidReturn(u, {
                uri: l,
              }),
              style: [
                T.webView,
                {
                  width: module13.Dimensions.get('window').width,
                },
              ],
              allowFileAccessFromFileURLs: true,
              originWhitelist: ['*'],
              textZoom: 100,
              javaScriptEnabled: true,
              onMessage: b,
              injectedJavaScript: f,
            }),
            React.default.createElement(module385.PureButton, {
              title: module510.rubys_setting_guide_contact_report_log,
              onPress: function () {
                t.buttonAction();
              },
              fontSize: 18,
              textColor: 'white',
              style: [
                T.aButton,
                {
                  backgroundColor: this.state.isSure ? '#007AFF' : this.context.theme.setting.sureBackgroundColor,
                },
              ],
            }),
            React.default.createElement(
              module13.View,
              {
                style: T.confirmView,
              },
              React.default.createElement(
                module13.TouchableOpacity,
                {
                  style: T.confirmButton,
                  onPress: function () {
                    t.confirmButtonAuction();
                  },
                },
                React.default.createElement(module13.Image, {
                  style: T.confirmButtonImage,
                  source: module2098,
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    T.confirmText,
                    {
                      color: this.context.theme.mainTextColor,
                    },
                  ],
                },
                module510.wifi_debug_mode_title2
              )
            ),
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alertView = n);
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatus(module381.RobotStatusManager.sharedManager().serverCode, 6));

                  case 3:
                    t = n.sent;
                    console.log('postPrivacyAgreementStatus - ' + t);
                    this.uploadDataDebugMode();
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module510.map_object_ignore_failed);
                    console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 12:
                  case 'end':
                    return n.stop();
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.uploadDataDebugMode());

                  case 3:
                    t = n.sent;
                    console.log('getMapBeautificationStatus - ' + JSON.stringify(t));
                    globals.showToast(module510.map_reset_page_operate_success);
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module510.map_object_ignore_failed);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
    return R;
  })(React.Component);

exports.default = E;
E.contextType = module1200.AppConfigContext;
var T = module13.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: 'transparent',
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
