var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1523 = require('./1523'),
  module385 = require('./385'),
  module381 = require('./381'),
  module1880 = require('./1880'),
  module418 = require('./418'),
  module414 = require('./414'),
  module1881 = require('./1881'),
  module387 = require('./387'),
  module394 = require('./394'),
  module390 = require('./390'),
  module422 = require('./422'),
  module515 = require('./515'),
  module391 = require('./391');

function N() {
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

require('./389');

require('./512');

var module1153 = require('./1153'),
  module500 = require('./500'),
  V = module500.strings,
  module393 = require('./393'),
  D = 'service@roborock.com',
  B = '400-900-1755',
  O = (function (t) {
    module7.default(O, t);

    var module515 = O,
      module1153 = N(),
      U = function () {
        var t,
          o = module11.default(module515);

        if (module1153) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var s;
      module4.default(this, O);

      (s = U.call(this, t)).onClickOpenPrivacyPage = function () {
        var t;
        if ((module387.LogEventCommon('click_open_privacy'), !module393.isMiApp))
          if (module393.isSupportNewAgreementAndPolicy()) {
            regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.prev = 0;
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(module393.agreementAndPolicy());

                    case 3:
                      t = n.sent;
                      console.log('agreementAndPolicyRes - ' + JSON.stringify(t.privacyProtocol.langUrl));
                      s.props.navigation.navigate('WebViewPage', {
                        title: V.localization_strings_Main_Views_ImprovementPage_0,
                        url: t.privacyProtocol.langUrl,
                        isNotMarginBottom: true,
                        buttonTitle: module393.isSupportDeleteDevice() ? V.reset_authoration : null,
                        buttonColor: 'red',
                        buttonAction: s.resetButtonAction.bind(module6.default(s)),
                      });
                      n.next = 12;
                      break;

                    case 8:
                      n.prev = 8;
                      n.t0 = n.catch(0);
                      s.openDefaultPrivacy();
                      console.log('agreementAndPolicyResError - ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

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
          } else s.openDefaultPrivacy();
      };

      s.onUploadLog = function () {
        s.alert.alert(module390.default.isShowPicUpload() ? V.log_for_v4_dialog_title : V.upload_log_legal_statement, '', [
          {
            text: V.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          {
            text: V.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              s.setLogUploadLevelOnRobot();
            },
          },
        ]);
      };

      s.statusManager = module381.RobotStatusManager.sharedManager();
      s.state = {
        phone: B,
        email: D,
        menuData: [],
        serialNumber: module394.default.sharedCache().serialNumber,
        shouldShowDebugInfoView: false,
      };
      s.clickNum = 0;
      return s;
    }

    module5.default(O, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.setEmailAndPhone();
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.getSerialNumber();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          if (module393.isLogFunctionSupported()) !module422.DMM.isV1 || module390.default.isDebuggableV1User();
          return React.default.createElement(
            module12.View,
            {
              style: [
                I.container,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  I.listContainer,
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module12.View, {
                style: I.section,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                  },
                },
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'contract_product_info',
                  title: V.localization_strings_Setting_Guide_index_8,
                  titleColor: 'rgba(0,0,0,0.8)',
                  onPress: this.onClickSerialNumber.bind(this),
                  shouldShowTopLongLine: false,
                  shouldShowBottomLine: false,
                })
              ),
              React.default.createElement(module12.View, {
                style: I.blankView,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                  },
                },
                this.isShowPhone() &&
                  React.default.createElement(module385.SettingListItemView, {
                    title: V.localization_strings_Setting_Guide_index_19,
                    titleColor: 'rgba(0,0,0,0.8)',
                    detail: this.state.phone,
                    detailWidth: 150,
                    shouldShowTopLine: false,
                    shouldShowTopLongLine: false,
                    shouldShowRightArrow: false,
                    onPress: this.onClickPhone.bind(this),
                    detailColor: '#3384ff',
                  }),
                this.isCN() &&
                  React.default.createElement(module385.SettingListItemView, {
                    title: V.localization_strings_Setting_Guide_index_20,
                    titleColor: 'rgba(0,0,0,0.8)',
                    detail: '\u77f3\u5934\u79d1\u6280roborock',
                    detailWidth: 150,
                    shouldShowRightArrow: false,
                    onPress: this.onClickWechat.bind(this),
                    detailColor: '#3384ff',
                  }),
                React.default.createElement(module385.SettingListItemView, {
                  title: V.localization_strings_Setting_Guide_index_21,
                  titleColor: 'rgba(0,0,0,0.8)',
                  detail: this.state.email,
                  detailWidth: 200,
                  shouldShowBottomLine: false,
                  shouldShowBottomLongLine: false,
                  shouldShowRightArrow: false,
                  onPress: this.onClickEmail.bind(this),
                  detailColor: '#3384ff',
                })
              ),
              React.default.createElement(module12.View, {
                style: {
                  flex: 1,
                },
              })
            ),
            React.default.createElement(
              module12.View,
              {
                style: I.uploadContainer,
              },
              !module391.default.isShareUser() &&
                React.default.createElement(module1880.default, {
                  text1: module390.default.isShowPicUpload() ? V.log_for_v4_upload : V.rubys_setting_guide_contact_report_log,
                  text2: module390.default.isShowPicUpload() ? V.log_for_v4_upload_info : V.rubys_setting_guide_contact_report_tip,
                  text3: ' ',
                  onClickOpenPrivacyPage: this.onClickOpenPrivacyPage,
                  onUploadLog: this.onUploadLog,
                })
            ),
            React.default.createElement(module385.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
            }),
            this.state.shouldShowDebugInfoView &&
              React.default.createElement(module1881.default, {
                parent: this,
              })
          );
        },
      },
      {
        key: 'isUS',
        value: function () {
          return 'us' == this.statusManager.countryCode || ('ca' == this.statusManager.countryCode && !module393.isMiApp);
        },
      },
      {
        key: 'isAU',
        value: function () {
          return 'au' == this.statusManager.countryCode;
        },
      },
      {
        key: 'isKR',
        value: function () {
          return 'ko' == this.statusManager.countryCode;
        },
      },
      {
        key: 'isEU',
        value: function () {
          return 'de' == this.statusManager.serverCode || 'ru' == this.statusManager.countryCode;
        },
      },
      {
        key: 'isCN',
        value: function () {
          return 'cn' == this.statusManager.serverCode;
        },
      },
      {
        key: 'isJA',
        value: function () {
          return 'ja' == this.statusManager.countryCode;
        },
      },
      {
        key: 'isShowPhone',
        value: function () {
          return this.isAU() || this.isKR() || this.isCN() || this.isUS() || this.isJA();
        },
      },
      {
        key: 'setEmailAndPhone',
        value: function () {
          if (this.isUS())
            this.setState({
              email: 'support@roborock.com',
              phone: '1 855 960 4321',
            });
          else if (this.isAU())
            this.setState({
              email: 'service@roborock.com.au',
              phone: '1800 413 621',
            });
          else if (this.isKR())
            this.setState({
              email: 'support@roborock.co.kr',
              phone: '1566 5534',
            });
          else if (this.isEU())
            this.setState({
              email: 'support@roborock-eu.com',
            });
          else if (this.isCN())
            this.setState({
              email: D,
              phone: B,
            });
          else if (this.isJA())
            this.setState({
              email: 'support@roborock.jp',
              phone: '0120-992-878',
            });
          else
            this.setState({
              email: 'support@roborock.com',
            });
        },
      },
      {
        key: 'resetButtonAction',
        value: function () {
          var t = this;
          if (globals.Alert)
            globals.Alert.customAlert(
              V.reset_monitor_privacy_dialog_title,
              V.reset_privacy_dialog_content,
              function () {
                t.updatePrivacy();
              },
              function () {
                module387.LogEventCommon('reset_privacy_cancel');
              },
              {
                titleColor: this.context.theme.navTitleColor,
                confirmColor: '#007AFF',
              }
            );
        },
      },
      {
        key: 'updatePrivacy',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module393.deleteDevice());

                  case 3:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module393.setValue(module418.StorageKeys.DeviceActiveTime, ''));

                  case 6:
                    module393.closeCurrentPage();
                    t.next = 12;
                    break;

                  case 9:
                    t.prev = 9;
                    t.t0 = t.catch(0);
                    console.log('updatePrivacyDeleteDevice - ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 12:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'openDefaultPrivacy',
        value: function () {
          this.props.navigation.navigate('WebViewPage', {
            title: V.localization_strings_Main_Views_ImprovementPage_0,
            refrence: module1523.default.UserPrivacyProtocol(),
            isNotMarginBottom: true,
          });
        },
      },
      {
        key: 'setLogUploadLevelOnRobot',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!module390.default.isShowPicUpload()) {
                      s.next = 11;
                      break;
                    }

                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatusWithVersion(module381.RobotStatusManager.sharedManager().serverCode, 1, 9999));

                  case 4:
                    t = s.sent;
                    console.warn('postPrivacyAgreementStatusWithVersion - ' + t);
                    s.next = 11;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(1);
                    console.warn('postPrivacyAgreementStatusWithVersion  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 11:
                    s.prev = 11;
                    s.next = 14;
                    return regeneratorRuntime.default.awrap(module414.default.userUploadLog());

                  case 14:
                    n = s.sent;
                    console.log('userUploadLog res : ' + JSON.stringify(n));
                    globals.showToast(V.rubys_setting_guide_contact_report_succ);
                    s.next = 22;
                    break;

                  case 19:
                    s.prev = 19;
                    s.t1 = s.catch(11);
                    globals.showToast(V.robot_communication_exception);

                  case 22:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            [
              [1, 8],
              [11, 19],
            ],
            Promise
          );
        },
      },
      {
        key: 'showMsg',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'getSerialNumber',
        value: function () {
          var t, n, module5;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.next = 2;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.RobotSerialNumber));

                  case 2:
                    if ((t = l.sent) && undefined != t && !(t.length < 10)) {
                      l.next = 16;
                      break;
                    }

                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module414.default.getSerialNumber());

                  case 6:
                    if (((n = l.sent), console.log('getSerialNumber --- ' + JSON.stringify(n)), !n.result)) {
                      l.next = 14;
                      break;
                    }

                    module5 = n.result[0].serial_number;
                    module394.default.sharedCache().serialNumber = module5;
                    this.setState({
                      serialNumber: module5,
                    });
                    l.next = 14;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.RobotSerialNumber, module5));

                  case 14:
                    l.next = 17;
                    break;

                  case 16:
                    this.setState({
                      serialNumber: t,
                    });

                  case 17:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'onClickSerialNumber',
        value: function () {
          this.setState({
            shouldShowDebugInfoView: true,
          });
          module387.LogEventStat(module387.LogEventMap.GuideProductInfo);
        },
      },
      {
        key: 'onClickPhone',
        value: function () {
          var t = this;
          module12.Linking.canOpenURL('tel: ' + this.state.phone)
            .then(function (o) {
              if (o) return module12.Linking.openURL('tel: ' + t.state.phone);
              console.log('Cannot handle url: ' + t.state.phone);
            })
            .catch(function (t) {
              return console.log('An error occurred ' + t);
            });
          module387.LogEventCommon('tap_call_service');
        },
      },
      {
        key: 'onClickEmail',
        value: function () {
          var t = this;
          module12.Linking.canOpenURL('mailto: ' + this.state.email)
            .then(function (o) {
              if (o) return module12.Linking.openURL('mailto: ' + t.state.email);
              console.log('Cannot handle url: ' + t.state.email);
            })
            .catch(function (t) {
              return console.log('An error occurred ' + t);
            });
          module387.LogEventCommon('tap_send_email');
        },
      },
      {
        key: 'onClickWechat',
        value: function () {
          module12.Clipboard.setString('\u77f3\u5934\u79d1\u6280roborock');
          globals.showToast(V.debug_info_copy_success);
          module387.LogEventCommon('tap_copy_wechat');
        },
      },
    ]);
    return O;
  })(React.default.Component);

exports.default = O;
O.contextType = module515.AppConfigContext;
var I = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module1153.NavigationBarHeight,
  },
  listContainer: {
    flex: 7,
    width: module12.Dimensions.get('window').width - 30,
    backgroundColor: '#f8f8f8',
    marginTop: module1153.NavigationBarHeight,
    paddingBottom: 20,
  },
  uploadContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#f8f8f8',
  },
  blankView: {
    width: module12.Dimensions.get('window').width,
    height: 14,
  },
  section: {
    paddingVertical: 7,
  },
});
