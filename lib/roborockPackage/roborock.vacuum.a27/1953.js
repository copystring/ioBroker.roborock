var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module415 = require('./415'),
  module385 = require('./385'),
  module381 = require('./381'),
  module1560 = require('./1560'),
  module1575 = require('./1575'),
  module419 = require('./419'),
  module390 = require('./390'),
  module1851 = require('./1851'),
  module387 = require('./387'),
  module1121 = require('./1121'),
  module515 = require('./515'),
  module423 = require('./423');

function L() {
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
  module505 = require('./505').strings,
  module389 = require('./389'),
  module1340 = require('./1340'),
  D = (function (t) {
    module7.default(O, t);

    var o = O,
      module1121 = L(),
      D = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);
      (o = D.call(this, t)).state = {
        monitorEnabled: module1560.default.realTimeMonitorEnabled,
        videoSetting: module1560.default.realVideoSetting,
        watermarkSwitch: false,
      };
      return o;
    }

    module5.default(O, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this._mounted = false;
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.vodeoSettingListener) this.vodeoSettingListener.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this._mounted = true;
          this.props.navigation.setParams({
            title: module505.setting_realtime_monitor_switch_title,
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (o) {
            if (t._mounted)
              t.setState({
                monitorEnabled: module1560.default.realTimeMonitorEnabled,
              });
          });
          this.vodeoSettingListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RealTimeVideoSettingChange, function (o) {
            if (t.state.videoSetting != o.data)
              t.setState({
                videoSetting: o.data,
              });
          });
          var o, n;
          regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MonitorVideoWatermark));

                  case 2:
                    o = s.sent;
                    n = 'ON' == o;
                    t.setWatermarkSwitch(n);

                  case 5:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'getMonitorMenus',
        value: function () {
          var t = this;
          this.context.theme.settingListItem.disableColor;
          return [
            {
              title: module505.realtime_video_title,
              visible: module390.default.isVideoSettingSupported() && module390.default.isSupportDisturbInVideoSetting(),
              shouldShowRightArrow: true,
              shouldShowBottomLine: true,
              detailColor: '#007AFF',
              detailWidth: 300,
              detail: this.getVideoSettingDetail(this.state.videoSetting),
              funcId: 'camera_setting_video_reminder_setting',
              onPress: function () {
                return t.props.navigation.navigate('VideoCallSettingPage');
              },
            },
            {
              title: module505.common_setting_secure_setting,
              visible: module390.default.isNewFuncSupported() && !(this.props.navigation.state.params && this.props.navigation.state.params.isMonitorPage),
              shouldShowRightArrow: true,
              shouldShowBottomLine: false,
              funcId: 'camera_setting_security_setting',
              onPress: function () {
                return t.props.navigation.navigate('SecuritySettingPage');
              },
            },
            {
              title: module505.common_setting_water_mark,
              visible: true,
              shouldShowSwitch: true,
              switchOn: this.state.watermarkSwitch,
              switchValueChanged: function (o) {
                return t.setWatermarkSwitch.apply(t, [o]);
              },
              visible: false,
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'setWatermarkSwitch',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      watermarkSwitch: t,
                    });
                    o = t ? 'ON' : 'OFF';
                    n.prev = 2;
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module415.default.setWatermark(o));

                  case 5:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MonitorVideoWatermark, o));

                  case 8:
                    n.next = 13;
                    break;

                  case 10:
                    n.prev = 10;
                    n.t0 = n.catch(2);
                    console.log('watermarkSwitch  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 10]],
            Promise
          );
        },
      },
      {
        key: 'goMonitorPrivacyPage',
        value: function () {
          var t = this;
          this.props.navigation.navigate('WebViewPage', {
            title: module423.DMM.isTopazSV ? module505.camera_monitor_voice_privacy_title : module505.camera_monitor_privacy_title,
            refrence: module1575.default.MonitorPrivacy(),
            buttonTitle: module1560.default.monitorPrivacyPolicyAgreed ? module505.reset_authoration : module505.button_title_agree,
            buttonColor: module1560.default.monitorPrivacyPolicyAgreed ? 'red' : '#007aff',
            buttonAction: function (o) {
              if (module381.RSM.isRunning && module1560.default.monitorPrivacyPolicyAgreed)
                o.alertView &&
                  o.alertView.customAlert(
                    '',
                    module505.map_object_cancel_privacy_stop_robot_alert,
                    function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                o.loadingView.showWithText();
                                t.next = 3;
                                return regeneratorRuntime.default.awrap(module415.default.stop());

                              case 3:
                                if (!t.sent) {
                                  t.next = 7;
                                  break;
                                }

                                if (o && o.loadingView) o.loadingView.hide();
                                t.next = 9;
                                break;

                              case 7:
                                if (o && o.loadingView) o.loadingView.hide();
                                globals.showToast(module505.localization_strings_Setting_History_index_1);

                              case 9:
                              case 'end':
                                return t.stop();
                            }
                        },
                        null,
                        null,
                        null,
                        Promise
                      );
                    },
                    null,
                    {
                      confirmColor: '#007AFF',
                      confirmTitle: module505.map_object_cancel_privacy_stop,
                    }
                  );
              else {
                var n = function () {
                  setTimeout(function () {
                    if (o.loadingView) o.loadingView.showWithText(module505.map_object_cancel_privacy_loading);
                  }, 100);
                  if (t.timerForUnlock) module1340.clearTimeout(t.timerForUnlock);
                  module381.RSM.hardLockCameraStatus();
                  module1560.default.updateMonitorPrivacy(!module1560.default.monitorPrivacyPolicyAgreed, function (n) {
                    if (
                      ((t.timerForUnlock = module1340.setTimeout(function () {
                        module381.RSM.unHardLockCameraStatus();
                      }, 500)),
                      setTimeout(function () {
                        if (o && o.loadingView) o.loadingView.hide();
                      }, 100),
                      n)
                    ) {
                      t.postPrivacyAgreement();
                      if ('' != (l = module1560.default.monitorPrivacyPolicyAgreed ? '' : module505.map_object_cancel_privacy_success)) globals.showToast(l);
                      o.props.navigation.setParams({
                        buttonTitle: module1560.default.monitorPrivacyPolicyAgreed ? module505.reset_authoration : module505.button_title_agree,
                        buttonColor: module1560.default.monitorPrivacyPolicyAgreed ? 'red' : '#007AFF',
                      });
                      module387.LogEventCommon(module1560.default.monitorPrivacyPolicyAgreed ? 'accept_monitor_privacy' : 'reset_monitor_privacy_confirm');
                    } else {
                      var l = module1560.default.monitorPrivacyPolicyAgreed ? module505.map_object_cancel_privacy_timeout : module505.map_object_ignore_failed;
                      globals.showToast(l);
                    }
                  });
                };

                if (module1560.default.monitorPrivacyPolicyAgreed) {
                  if (o.alertView)
                    o.alertView.customAlert(
                      module505.reset_monitor_privacy_dialog_title,
                      module505.reset_monitor_privacy_dialog_content,
                      function () {
                        n();
                      },
                      function () {
                        module387.LogEventCommon('reset_monitor_privacy_cancel');
                      },
                      {
                        titleColor: t.context.theme.navTitleColor,
                        confirmColor: '#007AFF',
                      }
                    );
                } else n();
              }
            },
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
                    return regeneratorRuntime.default.awrap(
                      module393.postPrivacyAgreementStatus(module381.RobotStatusManager.sharedManager().serverCode, module1560.default.monitorPrivacyPolicyAgreed ? 3 : 2)
                    );

                  case 3:
                    t = o.sent;
                    console.log('postPrivacyAgreementStatus - ' + t);
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 10:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            null,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'getMenus',
        value: function () {
          return this.getMonitorMenus();
        },
      },
      {
        key: 'off_monitor',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if ((t = !this.state.monitorEnabled)) {
                      if (this.alert)
                        this.alert.customAlert('', module505.camera_setting_open_monitor_function_tip, null, null, {
                          confirmColor: '#007AFF',
                          shouldShowCancel: false,
                        });
                      module387.LogEventStat(module387.LogEventMap.RealTimeOn);
                      module387.LogEventStatus('realtime_monitor_status', {
                        on: t,
                      });
                    } else if (this.alert)
                      this.alert.customAlert(
                        '',
                        module505.camera_setting_monitor_off_tip,
                        function () {
                          return regeneratorRuntime.default.async(
                            function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    o.setState({
                                      monitorEnabled: t,
                                    });
                                    module1560.default.realTimeMonitorEnabled = t;
                                    n.next = 4;
                                    return regeneratorRuntime.default.awrap(module1560.default.updateCameraStatus());

                                  case 4:
                                    if (!n.sent) {
                                      o.setState({
                                        monitorEnabled: !t,
                                      });
                                      module1560.default.realTimeMonitorEnabled = !t;
                                    }

                                    o.props.navigation.popToTop();
                                    setTimeout(function () {
                                      if (globals.app.state.theme == module515.Themes.dark) {
                                        module12.StatusBar.setBarStyle('light-content');
                                        if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
                                      } else {
                                        module12.StatusBar.setBarStyle('dark-content');
                                        if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
                                      }
                                    }, 1e3);
                                    module387.LogEventStat(module387.LogEventMap.RealTimeOff);
                                    module387.LogEventStatus('realtime_monitor_status', {
                                      on: t,
                                    });

                                  case 10:
                                  case 'end':
                                    return n.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        },
                        null,
                        {
                          confirmColor: '#007AFF',
                        }
                      );

                  case 2:
                  case 'end':
                    return n.stop();
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
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          console.log('thme', this.context.theme);
          var l = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: o,
                        fontSize: 16,
                        titleColor: 'rgba(0,0,0,0.8)',
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: W.section,
                      key: o,
                    })
                : null;
            }),
            s = {
              title: module505.setting_realtime_monitor_switch_title,
              detail: module1560.default.realTimeMonitorEnabled ? module505.setting_camera_on : module505.setting_camera_off,
              detailColor: module1560.default.realTimeMonitorEnabled ? '#007AFF' : this.context.theme.settingListItem.disableColor,
              isDetailCenter: false,
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              shouldShowTitleLine: true,
              shouldShowRightArrow: false,
              enabled: false,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              bottomDetailLineHeight: module391.default.isRRAndroid() ? 18 : 28,
              bottomDetail:
                '1.' + module505.monitor_setting_introduction_1 + '\n2.' + module505.monitor_setting_introduction_2 + '\n3.' + module505.monitor_setting_introduction_3 + '\n',
            },
            c = React.default.createElement(
              module12.View,
              {
                style: [
                  {
                    flex: 1,
                    borderRadius: 8,
                    overflow: 'hidden',
                  },
                ],
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, s, {
                  key: 9999,
                  fontSize: 16,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              )
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                W.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: {
                  marginHorizontal: 15,
                },
                showsVerticalScrollIndicator: false,
              },
              c,
              React.default.createElement(module12.View, {
                style: W.section,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    flex: 1,
                    borderRadius: 8,
                    overflow: 'hidden',
                  },
                },
                l
              ),
              React.default.createElement(module385.AlertView, {
                ref: function (o) {
                  return (t.alert = o);
                },
              })
            ),
            React.default.createElement(
              module12.View,
              {
                style: {
                  alignSelf: 'center',
                  height: 40,
                },
              },
              React.default.createElement(
                module12.Text,
                module22.default({}, module391.default.getAccessibilityLabel('camera_setting_monitor_privacy_text'), {
                  style: [
                    W.privacyButton,
                    {
                      color: o.customService.highlightTextColor,
                    },
                  ],
                  onPress: this.goMonitorPrivacyPage.bind(this),
                }),
                module423.DMM.isTopazSV ? module505.monitor_voice_privacy_dialog_title : module505.monitor_privacy_dialog_title
              )
            ),
            this.state.monitorEnabled &&
              React.default.createElement(
                module385.GradientView,
                {
                  pointerEvents: 'box-none',
                  colors: [o.gradientColorStart, o.gradientColorEnd],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: [
                    W.monitorButton,
                    {
                      minWidth: module12.Dimensions.get('window').width - 100,
                    },
                  ],
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'camera_setting_monitor_privacy',
                  style: {
                    backgroundColor: 'transparent',
                    height: 40,
                  },
                  textColor: '#FFFFFF',
                  fontSize: 16,
                  title: module505.camera_setting_detail1,
                  onPress: function () {
                    return t.off_monitor();
                  },
                })
              ),
            React.default.createElement(module1851.MonitorPrivacyDialogWithNavbar, {
              ref: function (o) {
                return (t.monitorPrivacyDialog = o);
              },
              confirmTextColor: '#007AFF',
              confirmTitle: module505.localization_strings_Main_Error_ErrorDetailPage_3,
              onConfirm: function () {},
              noTitle: true,
              desc1: module505.camera_setting_open_monitor_function_tip_1,
              desc2: module505.camera_setting_open_monitor_function_tip,
              shouldShowCancel: false,
              onPressLink: this.goMonitorPrivacyPage.bind(this),
              onShowListener: function () {
                t.props.navigation.setParams({
                  onPressLeft: function () {},
                });
              },
              onHideListener: function () {
                t.props.navigation.setParams({
                  onPressLeft: function () {
                    return navigation.pop();
                  },
                });
              },
            })
          );
        },
      },
      {
        key: 'petModeDidChange',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    o = 0 == t;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module1560.default.updatePetModeEnabled(o));

                  case 3:
                    this.setState({
                      petModeEnabled: module1560.default.petModeEnabled,
                    });

                  case 4:
                  case 'end':
                    return n.stop();
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
        key: 'getVideoSettingDetail',
        value: function (t) {
          return t == module389.VideoSettingMap().VideoSettingStrongReminder
            ? module505.realtime_video_title_3
            : t == module389.VideoSettingMap().VideoSettingNotDisturb
            ? module505.realtime_video_title_1
            : module505.realtime_video_title_2;
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = D;
D.contextType = module1121.AppConfigContext;
var W = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  section: {
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  monitorButton: {
    position: 'absolute',
    alignSelf: 'center',
    height: 40,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 26,
    bottom: 50,
  },
  privacyButton: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 13,
    bottom: 30,
  },
});
