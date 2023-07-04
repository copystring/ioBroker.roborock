var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1376 = require('./1376'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1900 = require('./1900'),
  module411 = require('./411'),
  module407 = require('./407'),
  module1901 = require('./1901'),
  module383 = require('./383'),
  module390 = require('./390'),
  module386 = require('./386'),
  module415 = require('./415'),
  module506 = require('./506');

function U() {
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

require('./385');

require('./503');

var module934 = require('./934'),
  module491 = require('./491'),
  N = module491.strings,
  module389 = require('./389'),
  V = 'service@roborock.com',
  A = '400-900-1755',
  B = (function (t) {
    module7.default(B, t);

    var module506 = B,
      module934 = U(),
      M = function () {
        var t,
          o = module11.default(module506);

        if (module934) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);

      (o = M.call(this, t)).onClickOpenPrivacyPage = function () {
        if ((module383.LogEventCommon('click_open_privacy'), module389.isMiApp)) {
          var t = {
            privacyURL: module1376.default.UserPrivacyProtocol(),
            agreementURL: module1376.default.UserAgreement(),
            hideUserExperiencePlan: true,
          };
          module389.previewLegalInformationAuthorization(t);
        } else
          o.props.navigation.navigate('WebViewPage', {
            title: N.localization_strings_Main_Views_ImprovementPage_0,
            refrence: module1376.default.UserPrivacyProtocol(),
            isNotMarginBottom: true,
          });
      };

      o.onUploadLog = function () {
        o.alert.alert(module386.default.isShowPicUpload() ? N.log_for_v4_dialog_title : N.upload_log_legal_statement, '', [
          {
            text: N.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          {
            text: N.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              o.setLogUploadLevelOnRobot();
            },
          },
        ]);
      };

      o.statusManager = module377.RobotStatusManager.sharedManager();
      o.state = {
        phone: A,
        email: V,
        menuData: [],
        serialNumber: module390.default.sharedCache().serialNumber,
        shouldShowDebugInfoView: false,
      };
      o.clickNum = 0;
      return o;
    }

    module5.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.setEmailAndPhone();
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
          if (module389.isLogFunctionSupported()) !module415.DMM.isV1 || module386.default.isDebuggableV1User();
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
              React.default.createElement(module381.SettingListItemView, {
                funcId: 'contract_product_info',
                title: N.localization_strings_Setting_Guide_index_8,
                titleColor: 'rgba(0,0,0,0.8)',
                onPress: this.onClickSerialNumber.bind(this),
                shouldShowTopLongLine: true,
                shouldShowBottomLine: true,
                shouldShowBottomLongLine: true,
              }),
              React.default.createElement(module12.View, {
                style: I.blankView,
              }),
              this.isShowPhone() &&
                React.default.createElement(module381.SettingListItemView, {
                  title: N.localization_strings_Setting_Guide_index_19,
                  titleColor: 'rgba(0,0,0,0.8)',
                  detail: this.state.phone,
                  detailWidth: 150,
                  shouldShowTopLine: true,
                  shouldShowTopLongLine: true,
                  shouldShowRightArrow: false,
                  onPress: this.onClickPhone.bind(this),
                  detailColor: '#3384ff',
                }),
              this.isCN() &&
                React.default.createElement(module381.SettingListItemView, {
                  title: N.localization_strings_Setting_Guide_index_20,
                  titleColor: 'rgba(0,0,0,0.8)',
                  detail: '\u77f3\u5934\u79d1\u6280roborock',
                  detailWidth: 150,
                  shouldShowRightArrow: false,
                  onPress: this.onClickWechat.bind(this),
                  detailColor: '#3384ff',
                }),
              React.default.createElement(module381.SettingListItemView, {
                title: N.localization_strings_Setting_Guide_index_21,
                titleColor: 'rgba(0,0,0,0.8)',
                detail: this.state.email,
                detailWidth: 200,
                shouldShowBottomLine: true,
                shouldShowBottomLongLine: true,
                shouldShowRightArrow: false,
                onPress: this.onClickEmail.bind(this),
                detailColor: '#3384ff',
              }),
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
              React.default.createElement(module1900.default, {
                text1: module386.default.isShowPicUpload() ? N.log_for_v4_upload : N.rubys_setting_guide_contact_report_log,
                text2: module386.default.isShowPicUpload() ? N.log_for_v4_upload_info : N.rubys_setting_guide_contact_report_tip,
                text3: ' ',
                onClickOpenPrivacyPage: this.onClickOpenPrivacyPage,
                onUploadLog: this.onUploadLog,
              })
            ),
            React.default.createElement(module381.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
            }),
            this.state.shouldShowDebugInfoView &&
              React.default.createElement(module1901.default, {
                parent: this,
              })
          );
        },
      },
      {
        key: 'isUS',
        value: function () {
          return 'us' == this.statusManager.countryCode || ('ca' == this.statusManager.countryCode && !module389.isMiApp);
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
              email: V,
              phone: A,
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
        key: 'setLogUploadLevelOnRobot',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!module386.default.isShowPicUpload()) {
                      s.next = 11;
                      break;
                    }

                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module389.postPrivacyAgreementStatusWithVersion(module377.RobotStatusManager.sharedManager().serverCode, 1, 9999));

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
                    return regeneratorRuntime.default.awrap(module407.default.userUploadLog());

                  case 14:
                    n = s.sent;
                    console.log('userUploadLog res : ' + JSON.stringify(n));
                    globals.showToast(N.rubys_setting_guide_contact_report_succ);
                    s.next = 22;
                    break;

                  case 19:
                    s.prev = 19;
                    s.t1 = s.catch(11);
                    globals.showToast(N.robot_communication_exception);

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
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.RobotSerialNumber));

                  case 2:
                    if ((t = l.sent) && undefined != t && !(t.length < 10)) {
                      l.next = 16;
                      break;
                    }

                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.getSerialNumber());

                  case 6:
                    if (((n = l.sent), console.log('getSerialNumber --- ' + JSON.stringify(n)), !n.result)) {
                      l.next = 14;
                      break;
                    }

                    module5 = n.result[0].serial_number;
                    module390.default.sharedCache().serialNumber = module5;
                    this.setState({
                      serialNumber: module5,
                    });
                    l.next = 14;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.RobotSerialNumber, module5));

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
          module383.LogEventStat(module383.LogEventMap.GuideProductInfo);
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
          module383.LogEventCommon('tap_call_service');
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
          module383.LogEventCommon('tap_send_email');
        },
      },
      {
        key: 'onClickWechat',
        value: function () {
          module12.Clipboard.setString('\u77f3\u5934\u79d1\u6280roborock');
          globals.showToast(N.debug_info_copy_success);
          module383.LogEventCommon('tap_copy_wechat');
        },
      },
    ]);
    return B;
  })(React.default.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
var I = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module934.NavigationBarHeight,
  },
  listContainer: {
    flex: 7,
    width: module12.Dimensions.get('window').width,
    backgroundColor: '#f8f8f8',
    marginTop: module934.NavigationBarHeight,
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
