require('./423');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1575 = require('./1575'),
  module385 = require('./385'),
  module381 = require('./381'),
  module1928 = require('./1928'),
  module419 = require('./419'),
  module415 = require('./415'),
  module387 = require('./387'),
  module394 = require('./394'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module391 = require('./391');

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

require('./389');

var module1265 = require('./1265'),
  module505 = require('./505').strings,
  module393 = require('./393'),
  M = (function (t) {
    module7.default(V, t);

    var module1121 = V,
      module1265 = x(),
      M = function () {
        var t,
          n = module11.default(module1121);

        if (module1265) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var l;
      module4.default(this, V);

      (l = M.call(this, t)).sectionComp = function () {
        return React.default.createElement(module12.View, {
          style: {
            height: 15,
            backgroundColor: l.context.theme.settingBackgroundColor,
          },
        });
      };

      l.renderListRow = function (t) {
        var n = t.index,
          s = t.section.data.length,
          l = t.item;
        return React.default.createElement(
          module385.SettingListItemView,
          module22.default({}, l, {
            key: n,
            shouldShowBottomLine: n < s - 1,
            bottomLineStyle: {
              width: module12.Dimensions.get('window').width - 50,
            },
            touchStyle: [
              {
                borderTopLeftRadius: 0 == n ? 8 : 0,
              },
              {
                borderTopRightRadius: 0 == n ? 8 : 0,
              },
              {
                borderBottomLeftRadius: n == s - 1 ? 8 : 0,
              },
              {
                borderBottomRightRadius: n == s - 1 ? 8 : 0,
              },
            ],
          })
        );
      };

      l.onClickOpenPrivacyPage = function () {
        var t;
        if ((module387.LogEventCommon('click_open_privacy'), !module393.isMiApp))
          if (module393.isSupportNewAgreementAndPolicy()) {
            regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      o.prev = 0;
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(module393.agreementAndPolicy());

                    case 3:
                      t = o.sent;
                      console.log('agreementAndPolicyRes - ' + JSON.stringify(t.privacyProtocol.langUrl));
                      l.props.navigation.navigate('WebViewPage', {
                        title: module505.localization_strings_Main_Views_ImprovementPage_0,
                        url: t.privacyProtocol.langUrl,
                        isNotMarginBottom: true,
                        buttonTitle: module393.isSupportDeleteDevice() ? module505.reset_authoration : null,
                        buttonColor: 'red',
                        buttonAction: l.resetButtonAction.bind(module6.default(l)),
                      });
                      o.next = 12;
                      break;

                    case 8:
                      o.prev = 8;
                      o.t0 = o.catch(0);
                      l.openDefaultPrivacy();
                      console.log('agreementAndPolicyResError - ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
          } else l.openDefaultPrivacy();
      };

      l.onUploadLog = function () {
        l.alert.alert(module390.default.isShowPicUpload() ? module505.log_for_v4_dialog_title : module505.upload_log_legal_statement, '', [
          {
            text: module505.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          {
            text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              l.setLogUploadLevelOnRobot();
            },
          },
        ]);
      };

      l.state = {
        deviceName: module393.deviceName,
        serialNumber: module394.default.sharedCache().serialNumber,
        robotZone: module391.default.timeZoneChange(module394.default.sharedCache().robotTimeZone),
      };
      l.infoStr = ' ';
      return l;
    }

    module5.default(V, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this,
            module2074 = React.default.createElement(module385.PureImageButton, {
              funcId: 'pi_setting_copy',
              accessibilityLabel: module505.debug_info_copy_all,
              image: require('./2074'),
              onPress: function () {
                return t.onPressCopyButton(t.infoStr);
              },
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 40,
                height: 40,
                marginRight: 20,
              },
              ref: function (n) {
                return (t.copyButton = n);
              },
            });
          this.props.navigation.setParams({
            rightItems: [module2074],
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
          this.registerDeviceNameChangeListener();
          this.registerRobotTimeZoneRedDotListener();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.getSerialNumber();
          this.getRobotTimezone();
          if (module393.isMiApp)
            module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
              if (n.ssid || n.localip || n.mac)
                t.setState({
                  ssid: n.ssid || 'Unknown',
                  ip: n.localip || 'Unknown',
                  mac: n.mac || 'Unknown',
                  firmwareVersion: n.lastVersion || 'Unknown',
                });
              else t.fetchNetworkInfo();
            });

          if (!module393.isMiApp) {
            this.fetchNetworkInfo();
            this.getFirmwareVersionRoborock();
          }
        },
      },
      {
        key: 'unreigsterListeners',
        value: function () {
          if (this.deviceNameChangedListener) this.deviceNameChangedListener.remove();
          this.deviceNameChangedListener = null;
          if (this.redPointListener) this.redPointListener.remove();
          this.redPointListener = null;
        },
      },
      {
        key: 'getRobotTimezone',
        value: function () {
          var t, module22, s, l, u;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.next = 2;
                    return regeneratorRuntime.default.awrap(module415.default.getTimeZone());

                  case 2:
                    t = c.sent;
                    module22 = module391.default.timeZoneChange(t.result[0]);
                    console.log('getRobotTimezone - ' + JSON.stringify(t));
                    this.setState({
                      robotZone: module22,
                    });
                    c.next = 8;
                    return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

                  case 8:
                    s = c.sent;
                    l = t.result[0];
                    u = s != l;
                    module394.default.sharedCache().robotTimeZone = l;
                    module394.default.sharedCache().phoneTimeZone = s;
                    module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = u;
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.RedDotDidChange, {
                      name: 'sync_time_zone',
                      value: u,
                    });

                  case 15:
                  case 'end':
                    return c.stop();
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
        key: 'openSyncTimezonePage',
        value: function () {
          this.props.navigation.navigate('SyncTimezonePage', {
            parent: this,
            title: module505.setting_timezone_title,
          });
        },
      },
      {
        key: 'getSerialNumber',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module415.default.getSerialNumber());

                  case 2:
                    t = s.sent;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                    if (t.result) {
                      o = t.result[0].serial_number;
                      module394.default.sharedCache().serialNumber = o;
                      if ('' == o || o.length < 1) o = ' ';
                      this.setState({
                        serialNumber: o,
                      });
                    }

                  case 5:
                  case 'end':
                    return s.stop();
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
        key: 'fetchNetworkInfo',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getNetworkInfo());

                  case 3:
                    t = s.sent;
                    console.log('fetchNetworkInfo --- ' + JSON.stringify(t));
                    this.setState({
                      ssid: t.result.ssid || 'Unknown',
                      ip: t.result.ip || 'Unknown',
                      mac: t.result.mac || 'Unknown',
                      rssi: t.result.rssi || 'Unknown',
                    });
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);

                    if (FetchNetworkInfoRetry < 10) {
                      FetchNetworkInfoRetry++;
                      setTimeout(function () {
                        o.fetchNetworkInfo();
                      }, 1e3);
                    } else {
                      FetchNetworkInfoRetry = 0;
                      this.props.parent.showMsg(module505.localization_strings_Setting_CleanModePage_3);
                    }

                    console.log('fetchNetworkInfo error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 12:
                  case 'end':
                    return s.stop();
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
        key: 'getFirmwareVersionRoborock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module391.default.isShareUser()) {
                      o.next = 3;
                      break;
                    }

                    this.setState({
                      firmwareVersion: module505.share_device,
                    });
                    return o.abrupt('return');

                  case 3:
                    if (module393.isSupportFirmwareVersion()) {
                      o.next = 5;
                      break;
                    }

                    return o.abrupt('return');

                  case 5:
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 7:
                    if (undefined != (t = o.sent) && undefined != t.currentVersion)
                      this.setState({
                        firmwareVersion: t.currentVersion,
                      });

                  case 9:
                  case 'end':
                    return o.stop();
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
        key: 'registerDeviceNameChangeListener',
        value: function () {
          var t = this;
          if (!module393.isMiApp)
            this.deviceNameChangedListener = module12.DeviceEventEmitter.addListener(module393.deviceNameChangedEvent, function (n) {
              t.setState({
                deviceName: n.newName,
              });
              module393.deviceName = n.newName;
            });
        },
      },
      {
        key: 'registerRobotTimeZoneRedDotListener',
        value: function () {
          var t = this;
          this.redPointListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RedDotDidChange, function (n) {
            t.setState({
              timeZoneShouldShowRedDot: module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
            });
          });
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          for (
            var t = this,
              n = [
                {
                  data: [
                    {
                      title: module505.localization_strings_Setting_General_index_1,
                      detail: this.state.deviceName,
                      detailWidth: 150,
                      onPress: function () {
                        return module393.openChangeDeviceName();
                      },
                      visible: !module391.default.isShareUser() && !module393.isMiApp,
                      shouldShowBottomLine: false,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: module505.debug_info_serial_model,
                      funcId: 'debug_info_serial_model',
                      detail: module393.deviceModel,
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(module393.deviceModel);
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                    },
                    {
                      title: module505.debug_info_serial_number,
                      funcId: 'debug_info_serial_number',
                      detail: this.handleEmptyString(this.state.serialNumber),
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(t.state.serialNumber);
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                    },
                    {
                      title: 'DID',
                      funcId: 'DIDDIDDIDDIDDID',
                      detail: module391.default.getDid(),
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(module391.default.getDid());
                      },
                      shouldShowRightArrow: false,
                      visible: !module393.isMiApp,
                    },
                    {
                      title: module505.debug_info_firmware_version,
                      funcId: 'debug_info_firmware_version',
                      detail: this.state.firmwareVersion,
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(t.state.firmwareVersion);
                      },
                      shouldShowRightArrow: false,
                      visible: module393.isMiApp || module393.isSupportFirmwareVersion(),
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: module505.app_vesion_info,
                      funcId: 'app_vesion_info',
                      detail: module391.default.getAppDisplayVersion(),
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(module393.currentAppVersion() + ' ' + ('ios' == module12.Platform.OS ? 'iOS' : 'Android') + ' ' + module12.Platform.Version);
                      },
                      shouldShowRightArrow: false,
                      visible: !module393.isMiApp && module393.currentAppVersion(),
                    },
                    {
                      title: module505.debug_info_plugin_version,
                      funcId: 'debug_info_plugin_version',
                      detail: module391.default.pluginVersion(),
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(module391.default.pluginVersion());
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                    },
                    {
                      title: module393.isMiApp ? module505.debug_info_xiaomi_id : 'UID',
                      funcId: 'debug_info_xiaomi_id',
                      detail: module393.userId,
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(module393.userId);
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: module505.setting_timezone_title,
                      funcId: 'robot_setting_page_timezone',
                      detail: this.state.robotZone,
                      onPress: this.openSyncTimezonePage.bind(this),
                      visible: true,
                      shouldShowRedPoint: this.state.timeZoneShouldShowRedDot,
                      shouldShowTopLine: false,
                      shouldShowTopLongLine: false,
                      shouldShowBottomLine: false,
                      shouldShowBottomLongLine: false,
                      detailWidth: 150,
                      titleWidth: 150,
                    },
                    {
                      title: module505.localization_strings_Setting_General_NetInfoPage_0,
                      funcId: 'localization_strings_Setting_General_NetInfoPage_0',
                      detail: this.state.ssid,
                      detailWidth: 350,
                      onPress: function () {
                        if (module390.default.isWifiManageSupported())
                          t.props.navigation.navigate('WifiPage', {
                            ssid: t.state.ssid,
                            ip: t.state.ip,
                            mac: t.state.mac,
                            rssi: t.state.rssi,
                          });
                        else t.onPressCopyButton(t.state.ssid);
                      },
                      shouldShowRightArrow: !!module390.default.isWifiManageSupported(),
                      visible: true,
                    },
                    {
                      title: module505.localization_strings_Setting_General_NetInfoPage_1,
                      funcId: 'localization_strings_Setting_General_NetInfoPage_1',
                      detail: this.state.ip,
                      detailWidth: 350,
                      onPress: function () {
                        return t.onPressCopyButton(t.state.ip);
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                    },
                    {
                      title: module505.localization_strings_Setting_General_NetInfoPage_2,
                      funcId: 'localization_strings_Setting_General_NetInfoPage_2',
                      detailWidth: 350,
                      detail: this.state.mac,
                      onPress: function () {
                        return t.onPressCopyButton(t.state.mac);
                      },
                      shouldShowRightArrow: false,
                      visible: true,
                      shouldShowBottomLine: false,
                    },
                  ],
                },
              ],
              o = '',
              s = 0;
            s < n.length;
            s++
          ) {
            for (var l = n[s].data, u = 0; u < l.length; u++) l[u].visible ? (o += l[u].title + ' : ' + l[u].detail + ', ') : (l.splice(u, 1), (u -= 1));

            if (!l.length) {
              n.splice(s, 1);
              s -= 1;
            }
          }

          this.infoStr = o;
          return n;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o =
              !module391.default.isShareUser() &&
              React.default.createElement(module1928.default, {
                text1: module390.default.isShowPicUpload() ? module505.log_for_v4_upload : module505.rubys_setting_guide_contact_report_log,
                text2: module390.default.isShowPicUpload() ? module505.log_for_v4_upload_info : module505.rubys_setting_guide_contact_report_tip,
                text3: ' ',
                onClickOpenPrivacyPage: this.onClickOpenPrivacyPage,
                onUploadLog: this.onUploadLog,
              }),
            s = React.default.createElement(module12.SectionList, {
              style: [
                {
                  flex: 1,
                },
                {
                  paddingHorizontal: 15,
                },
              ],
              showsVerticalScrollIndicator: false,
              automaticallyAdjustContentInsets: false,
              sections: this.getMenuDatas(),
              renderItem: this.renderListRow,
              renderSectionHeader: this.sectionComp,
              ListFooterComponent: function () {
                return o;
              },
              keyExtractor: function (t, n) {
                return 'index:' + n + t;
              },
              stickySectionHeadersEnabled: false,
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                B.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            s,
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            })
          );
        },
      },
      {
        key: 'onPressCopyButton',
        value: function (t) {
          module12.Clipboard.setString(t);
          this.showMsg(module505.debug_info_copy_success);
        },
      },
      {
        key: 'handleEmptyString',
        value: function (t) {
          return '' === t || undefined == t || t.length < 1 ? ' ' : t;
        },
      },
      {
        key: 'resetButtonAction',
        value: function () {
          var t = this;
          if (globals.Alert)
            globals.Alert.customAlert(
              module505.reset_monitor_privacy_dialog_title,
              module505.reset_privacy_dialog_content,
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
                    return regeneratorRuntime.default.awrap(module393.setValue(module419.StorageKeys.DeviceActiveTime, ''));

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
            title: module505.localization_strings_Main_Views_ImprovementPage_0,
            refrence: module1575.default.UserPrivacyProtocol(),
            isNotMarginBottom: true,
          });
        },
      },
      {
        key: 'setLogUploadLevelOnRobot',
        value: function () {
          var t, o;
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
                    return regeneratorRuntime.default.awrap(module415.default.userUploadLog());

                  case 14:
                    o = s.sent;
                    console.log('userUploadLog res : ' + JSON.stringify(o));
                    globals.showToast(module505.rubys_setting_guide_contact_report_succ);
                    s.next = 22;
                    break;

                  case 19:
                    s.prev = 19;
                    s.t1 = s.catch(11);
                    globals.showToast(module505.robot_communication_exception);

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
    ]);
    return V;
  })(React.default.Component);

exports.default = M;
M.contextType = module1121.AppConfigContext;
var B = module12.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: module1265.NavigationBarHeight,
    paddingBottom: 20,
  },
});
