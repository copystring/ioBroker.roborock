var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1869 = require('./1869'),
  module414 = require('./414'),
  module381 = require('./381'),
  module516 = require('./516'),
  module515 = require('./515');

function x() {
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
  module500 = require('./500').strings,
  A = (function (t) {
    module7.default(P, t);

    var n = P,
      module515 = x(),
      A = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = A.call(this, t)).state = {
        isSure: false,
      };
      return n;
    }

    module5.default(P, [
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
          if (globals.app.state.theme == module516.Themes.dark) u = 'javascript:document.body.style.color="white";javascript:document.body.style.background="black";';
          var f = 'ios' == module12.Platform.OS ? this.onMessageForIos : null,
            module1957 = this.state.isSure ? require('./1957') : this.context.theme.monitor.confirmPhoto;
          return React.default.createElement(
            module12.View,
            {
              style: [
                B.containter,
                {
                  backgroundColor: this.context.theme.settingListItem.miSetBackgroundColor,
                },
              ],
            },
            React.default.createElement(module1869.WebView, {
              bounces: false,
              scrollEnabled: true,
              source: l,
              style: [
                B.webView,
                {
                  width: module12.Dimensions.get('window').width,
                },
              ],
              allowFileAccessFromFileURLs: true,
              originWhitelist: ['*'],
              textZoom: 100,
              javaScriptEnabled: true,
              onMessage: f,
              injectedJavaScript: u,
            }),
            React.default.createElement(module385.PureButton, {
              title: module500.rubys_setting_guide_contact_report_log,
              onPress: function () {
                t.buttonAction();
              },
              fontSize: 18,
              textColor: 'white',
              style: [
                B.aButton,
                {
                  backgroundColor: this.state.isSure ? '#007AFF' : this.context.theme.setting.sureBackgroundColor,
                },
              ],
            }),
            React.default.createElement(
              module12.View,
              {
                style: B.confirmView,
              },
              React.default.createElement(
                module12.TouchableOpacity,
                {
                  style: B.confirmButton,
                  onPress: function () {
                    t.confirmButtonAuction();
                  },
                },
                React.default.createElement(module12.Image, {
                  style: B.confirmButtonImage,
                  source: module1957,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    B.confirmText,
                    {
                      color: this.context.theme.mainTextColor,
                    },
                  ],
                },
                module500.wifi_debug_mode_title2
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
                    globals.showToast(module500.map_object_ignore_failed);
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
                    return regeneratorRuntime.default.awrap(module414.default.uploadDataDebugMode());

                  case 3:
                    t = n.sent;
                    console.log('getMapBeautificationStatus - ' + JSON.stringify(t));
                    globals.showToast(module500.map_reset_page_operate_success);
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module500.map_object_ignore_failed);
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
    return P;
  })(React.Component);

exports.default = A;
A.contextType = module515.AppConfigContext;
var B = module12.StyleSheet.create({
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
