require('./424');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1655 = require('./1655'),
  module385 = require('./385'),
  module381 = require('./381'),
  module2015 = require('./2015'),
  module420 = require('./420'),
  module416 = require('./416'),
  module387 = require('./387'),
  module394 = require('./394'),
  module390 = require('./390'),
  module1200 = require('./1200'),
  module391 = require('./391');

function D() {
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

var module1344 = require('./1344'),
  module510 = require('./510').strings,
  module393 = require('./393'),
  V = (function (t) {
    module9.default(B, t);

    var module1200 = B,
      module1344 = D(),
      V = function () {
        var t,
          n = module12.default(module1200);

        if (module1344) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var l;
      module6.default(this, B);

      (l = V.call(this, t)).sectionComp = function () {
        return React.default.createElement(module13.View, {
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
              width: module13.Dimensions.get('window').width - 50,
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
                        title: module510.localization_strings_Main_Views_ImprovementPage_0,
                        url: t.privacyProtocol.langUrl,
                        isNotMarginBottom: true,
                        buttonTitle: module393.isSupportDeleteDevice() ? module510.reset_authoration : null,
                        buttonColor: 'red',
                        buttonAction: l.resetButtonAction.bind(module8.default(l)),
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
        l.alert.alert(module390.default.isShowPicUpload() ? module510.log_for_v4_dialog_title : module510.upload_log_legal_statement, '', [
          {
            text: module510.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          {
            text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
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
        dockVersion: null,
        dockSN: null,
      };
      l.infoStr = null;
      l.watchingRequests = [];
      l.requestSuccessCount = 0;
      return l;
    }

    module7.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this,
            module2176 = React.default.createElement(module385.PureImageButton, {
              funcId: 'pi_setting_copy',
              accessibilityLabel: module510.debug_info_copy_all,
              image: require('./2176'),
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
            rightItems: [module2176],
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
          this.registerDeviceNameChangeListener();
          this.registerRobotTimeZoneRedDotListener();
        },
      },
      {
        key: 'watchRobotRequest',
        value: function (t, o) {
          var s, l, module8;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      -1 ==
                      (l = this.watchingRequests.findIndex(function (n) {
                        return n == t;
                      }))
                    )
                      this.watchingRequests.push(t);
                    console.log('begin watchRobotRequest ' + t, o);
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(o);

                  case 5:
                    module8 = c.sent;
                    this.requestSuccessCount++;
                    console.log('end watchRobotRequest ' + t, module8);
                    if (
                      -1 !=
                      (l = this.watchingRequests.findIndex(function (n) {
                        return n == t;
                      }))
                    )
                      this.watchingRequests.splice(l, 1);
                    console.log('check watchRobotRequest', this.watchingRequests);
                    if (0 == this.watchingRequests.length) null == this || null == (s = this.loadingView) || s.hide();
                    return c.abrupt('return', module8);

                  case 13:
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
        key: 'handleRequestTimeout',
        value: function () {
          var t = this;
          setTimeout(function () {
            var n;
            if (!(null == t || null == (n = t.loadingView))) n.hide();
            if (0 == t.requestSuccessCount) globals.showToast(module510.robot_communication_exception);
          }, 5e3);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n = this;
          if (!(null == this || null == (t = this.loadingView))) t.showWithText();
          this.handleRequestTimeout();
          this.getSerialNumber();
          this.getRobotTimezone();
          if (module393.isMiApp)
            module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (t) {
              if (t.ssid || t.localip || t.mac)
                n.setState({
                  ssid: t.ssid || 'Unknown',
                  ip: t.localip || 'Unknown',
                  mac: t.mac || 'Unknown',
                  rssi: t.rssi || 'Unknow',
                  firmwareVersion: t.lastVersion || 'Unknown',
                });
              else n.fetchNetworkInfo();
            });

          if (!module393.isMiApp) {
            this.fetchNetworkInfo();
            this.getFirmwareVersionRoborock();
          }

          if (module381.RSM.isO4Dock()) this.getDockInfo();
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
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(this.watchRobotRequest('get_time_zone', module416.default.getTimeZone()));

                  case 3:
                    t = c.sent;
                    module22 = module391.default.timeZoneChange(t.result[0]);
                    console.log('getRobotTimezone', t);
                    this.setState({
                      robotZone: module22,
                    });
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

                  case 9:
                    s = c.sent;
                    l = t.result[0];
                    u = s != l;
                    module394.default.sharedCache().robotTimeZone = l;
                    module394.default.sharedCache().phoneTimeZone = s;
                    module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = u;
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
                      name: 'sync_time_zone',
                      value: u,
                    });
                    c.next = 21;
                    break;

                  case 18:
                    c.prev = 18;
                    c.t0 = c.catch(0);
                    console.log('getRobotTimezone error', c.t0);

                  case 21:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 18]],
            Promise
          );
        },
      },
      {
        key: 'openSyncTimezonePage',
        value: function () {
          this.props.navigation.navigate('SyncTimezonePage', {
            parent: this,
            title: module510.setting_timezone_title,
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
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(this.watchRobotRequest('get_serial_number', module416.default.getSerialNumber()));

                  case 3:
                    t = s.sent;
                    console.log('getSerialNumber', t);

                    if (t.result) {
                      o = t.result[0].serial_number;
                      module394.default.sharedCache().serialNumber = o;
                      if ('' == o || o.length < 1) o = ' ';
                      this.setState({
                        serialNumber: o,
                      });
                    }

                    s.next = 11;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);
                    console.log('getSerialNumber error', s.t0);

                  case 11:
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
                    return regeneratorRuntime.default.awrap(this.watchRobotRequest('get_network_info', module416.default.getNetworkInfo()));

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
                      this.props.parent.showMsg(module510.localization_strings_Setting_CleanModePage_3);
                    }

                    console.log('fetchNetworkInfo', s.t0);

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
                      firmwareVersion: module510.share_device,
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
        key: 'getDockInfo',
        value: function () {
          var t, o, s, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(this.watchRobotRequest('get_dock_info', module416.default.getDockInfo()));

                  case 3:
                    t = u.sent;
                    o = t.result;
                    s = o.version;
                    l = o.sn;
                    this.setState({
                      dockVersion: s || null,
                      dockSN: l || null,
                    });
                    console.log('getDockInfo', t);
                    u.next = 12;
                    break;

                  case 9:
                    u.prev = 9;
                    u.t0 = u.catch(0);
                    console.log('getDockInfo error', u.t0);

                  case 12:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'registerDeviceNameChangeListener',
        value: function () {
          var t = this;
          if (!module393.isMiApp)
            this.deviceNameChangedListener = module13.DeviceEventEmitter.addListener(module393.deviceNameChangedEvent, function (n) {
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
          this.redPointListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RedDotDidChange, function (n) {
            t.setState({
              timeZoneShouldShowRedDot: module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
            });
          });
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          var t = this,
            n = [
              {
                data: [
                  {
                    title: module510.localization_strings_Setting_General_index_1,
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
                    title: module510.debug_info_serial_model,
                    funcId: 'debug_info_serial_model',
                    detail: module393.deviceModel,
                    detailWidth: 250,
                    onPress: function () {
                      return t.onPressCopyButton(module393.deviceModel);
                    },
                    shouldShowRightArrow: false,
                    visible: true,
                  },
                  {
                    title: module510.debug_info_serial_number,
                    funcId: 'debug_info_serial_number',
                    detail: this.handleEmptyString(this.state.serialNumber),
                    detailWidth: 250,
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
                    detailWidth: 250,
                    onPress: function () {
                      return t.onPressCopyButton(module391.default.getDid());
                    },
                    shouldShowRightArrow: false,
                    visible: !module393.isMiApp,
                  },
                  {
                    title: module510.debug_info_firmware_version,
                    funcId: 'debug_info_firmware_version',
                    detail: this.state.firmwareVersion,
                    detailWidth: 250,
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
                    title: module510.app_vesion_info,
                    funcId: 'app_vesion_info',
                    detail: module391.default.getAppDisplayVersion(),
                    detailWidth: 250,
                    onPress: function () {
                      return t.onPressCopyButton(module393.currentAppVersion() + ' ' + ('ios' == module13.Platform.OS ? 'iOS' : 'Android') + ' ' + module13.Platform.Version);
                    },
                    shouldShowRightArrow: false,
                    visible: !module393.isMiApp && module393.currentAppVersion(),
                  },
                  {
                    title: module510.debug_info_plugin_version,
                    funcId: 'debug_info_plugin_version',
                    detail: module391.default.pluginVersion(),
                    detailWidth: 250,
                    onPress: function () {
                      return t.onPressCopyButton(module391.default.pluginVersion());
                    },
                    shouldShowRightArrow: false,
                    visible: true,
                  },
                  {
                    title: module393.isMiApp ? module510.debug_info_xiaomi_id : 'UID',
                    funcId: 'debug_info_xiaomi_id',
                    detail: module393.userId,
                    detailWidth: 250,
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
                    title: module510.setting_timezone_title,
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
                    title: module510.localization_strings_Setting_General_NetInfoPage_0,
                    funcId: 'localization_strings_Setting_General_NetInfoPage_0',
                    detail: this.state.ssid,
                    detailWidth: 180,
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
                    title: module510.localization_strings_Setting_General_NetInfoPage_1,
                    funcId: 'localization_strings_Setting_General_NetInfoPage_1',
                    detail: this.state.ip,
                    detailWidth: 180,
                    onPress: function () {
                      return t.onPressCopyButton(t.state.ip);
                    },
                    shouldShowRightArrow: false,
                    visible: true,
                  },
                  {
                    title: module510.localization_strings_Setting_General_NetInfoPage_2,
                    funcId: 'localization_strings_Setting_General_NetInfoPage_2',
                    detailWidth: 180,
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
            o = {
              data: [
                {
                  title: module510.product_info_dock_sn,
                  funcId: 'dock_sn',
                  detailWidth: 180,
                  detail: this.state.dockSN,
                  onPress: function () {
                    return t.onPressCopyButton(t.state.dockSN);
                  },
                  shouldShowRightArrow: false,
                  visible: true,
                  shouldShowBottomLine: false,
                },
                {
                  title: module510.product_info_dock_version,
                  funcId: 'dock_version',
                  detailWidth: 180,
                  detail: this.state.dockVersion,
                  onPress: function () {
                    return t.onPressCopyButton(t.state.dockVersion);
                  },
                  shouldShowRightArrow: false,
                  visible: true,
                  shouldShowBottomLine: false,
                },
              ],
            };
          if (module381.RSM.isO4Dock()) n.splice(2, 0, o);

          for (var s = '', l = 0; l < n.length; l++) {
            for (var u = n[l].data, c = 0; c < u.length; c++) u[c].visible ? (s += u[c].title + ' : ' + u[c].detail + ', ') : (u.splice(c, 1), (c -= 1));

            if (!u.length) {
              n.splice(l, 1);
              l -= 1;
            }
          }

          this.infoStr = s;
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
              React.default.createElement(module2015.default, {
                text1: module390.default.isShowPicUpload() ? module510.log_for_v4_upload : module510.rubys_setting_guide_contact_report_log,
                text2: module390.default.isShowPicUpload() ? module510.log_for_v4_upload_info : module510.rubys_setting_guide_contact_report_tip,
                text3: ' ',
                onClickOpenPrivacyPage: this.onClickOpenPrivacyPage,
                onUploadLog: this.onUploadLog,
              }),
            s = React.default.createElement(module13.SectionList, {
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
            module13.View,
            {
              style: [
                M.container,
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
            }),
            React.default.createElement(module385.ALoadingView, {
              ref: function (n) {
                t.loadingView = n;
              },
            })
          );
        },
      },
      {
        key: 'onPressCopyButton',
        value: function (t) {
          module13.Clipboard.setString(t);
          this.showMsg(module510.debug_info_copy_success);
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
              module510.reset_monitor_privacy_dialog_title,
              module510.reset_privacy_dialog_content,
              function () {
                t.revertPrivacy();
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
        key: 'revertPrivacy',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatus(module381.RSM.serverCode, 1));

                  case 3:
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module393.deleteDevice());

                  case 5:
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module393.setValue(module420.StorageKeys.DeviceActiveTime, ''));

                  case 8:
                    module393.closeCurrentPage();
                    t.next = 14;
                    break;

                  case 11:
                    t.prev = 11;
                    t.t0 = t.catch(0);
                    console.log('revertPrivacyDeleteDevice - ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 14:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: 'openDefaultPrivacy',
        value: function () {
          this.props.navigation.navigate('WebViewPage', {
            title: module510.localization_strings_Main_Views_ImprovementPage_0,
            refrence: module1655.default.UserPrivacyProtocol(),
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
                    return regeneratorRuntime.default.awrap(module416.default.userUploadLog());

                  case 14:
                    o = s.sent;
                    console.log('userUploadLog res : ' + JSON.stringify(o));
                    globals.showToast(module510.rubys_setting_guide_contact_report_succ);
                    s.next = 22;
                    break;

                  case 19:
                    s.prev = 19;
                    s.t1 = s.catch(11);
                    globals.showToast(module510.robot_communication_exception);

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
    return B;
  })(React.default.Component);

exports.default = V;
V.contextType = module1200.AppConfigContext;
var M = module13.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: module1344.NavigationBarHeight,
    paddingBottom: 20,
  },
});
