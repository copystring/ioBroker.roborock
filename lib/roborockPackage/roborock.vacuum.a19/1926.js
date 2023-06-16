var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = T(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module407 = require('./407'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1363 = require('./1363'),
  module1378 = require('./1378'),
  module411 = require('./411'),
  module386 = require('./386'),
  module1807 = require('./1807'),
  module1803 = require('./1803'),
  module383 = require('./383'),
  module390 = require('./390'),
  module506 = require('./506'),
  module507 = require('./507'),
  module1261 = require('./1261');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (T = function (t) {
    return t ? n : o;
  })(t);
}

function R() {
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

require('./936');

var module389 = require('./389'),
  module491 = require('./491').strings,
  module385 = require('./385'),
  module1249 = require('./1249'),
  module403 = require('./403'),
  module1930 = [require('./1927'), require('./1928'), require('./1929'), require('./1930')],
  I = (function (t) {
    module7.default(H, t);

    var module506 = H,
      T = R(),
      I = function () {
        var t,
          o = module11.default(module506);

        if (T) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function H(t) {
      var o;
      module4.default(this, H);
      (o = I.call(this, t)).state = {
        mode: (t.navigation.state.params && t.navigation.state.params.mode) || 0,
        rraiEnabled: module1363.default.cameraEnabled,
        explorationEnabled: module1363.default.explorationEnabled,
        monitorEnabled: module1363.default.realTimeMonitorEnabled,
        petModeEnabled: module1363.default.petModeEnabled,
        mapObjectPhotoEnabled: module1363.default.mapObjectPhotoEnabled,
        videoSetting: module1363.default.realVideoSetting,
      };
      return o;
    }

    module5.default(H, [
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
          var o = [
            module491.camera_setting_rrai_title,
            module491.robot_setting_exploration_mode_title,
            module491.setting_realtime_monitor_switch_title,
            module491.obstacle_pop_type_photo,
          ];
          this.props.navigation.setParams({
            title: o[this.state.mode],
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (o) {
            if (t._mounted)
              t.setState({
                monitorEnabled: module1363.default.realTimeMonitorEnabled,
              });
          });
          this.vodeoSettingListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RealTimeVideoSettingChange, function (o) {
            if (t.state.videoSetting != o.data)
              t.setState({
                videoSetting: o.data,
              });
          });
        },
      },
      {
        key: 'getRRAIMenus',
        value: function () {
          return [
            {
              title: module491.camera_setting_rrai_title,
              visible: true,
              shouldShowSwitch: true,
              switchOn: this.state.rraiEnabled,
              switchValueChanged: this.rraiValueChanged.bind(this),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
              shouldShowTitleLine: true,
              bottomDetailLineHeight: module387.default.isRRAndroid() ? 18 : 28,
              bottomDetail:
                '1.' +
                module491.camera_setting_rrai_introduction_1 +
                '\n2.' +
                module491.camera_setting_rrai_introduction_2 +
                '\n3.' +
                module491.camera_setting_rrai_introduction_4 +
                '\n4.' +
                module491.camera_setting_rrai_introduction_3 +
                '\n5.' +
                module491.camera_setting_rrai_introduction_5 +
                ' ',
            },
            {
              visible: true,
            },
          ];
        },
      },
      {
        key: 'getExplorationMenus',
        value: function () {
          return [
            {
              title: module491.robot_setting_exploration_mode_title,
              visible: true,
              shouldShowSwitch: true,
              switchOn: this.state.explorationEnabled,
              shouldShowRightArrow: false,
              switchValueChanged: this.explorationValueChanged.bind(this),
              shouldShowBottomLongLine: true,
              shouldShowBottomLongLine: true,
              bottomDetailLineHeight: module387.default.isRRAndroid() ? 18 : 28,
              bottomDetail: '1.' + module491.exploration_setting_introduction_1 + '\n2.' + module491.exploration_setting_introduction2,
            },
          ];
        },
      },
      {
        key: 'getMonitorMenus',
        value: function () {
          var t = this,
            o = this.context.theme.settingListItem.disableColor;
          return [
            {
              title: module491.setting_realtime_monitor_switch_title,
              detail: module1363.default.realTimeMonitorEnabled ? module491.setting_camera_on : module491.setting_camera_off,
              detailColor: module1363.default.realTimeMonitorEnabled ? '#007AFF' : o,
              isDetailCenter: false,
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              shouldShowTitleLine: true,
              shouldShowRightArrow: false,
              bottomDetailLineHeight: module387.default.isRRAndroid() ? 18 : 28,
              bottomDetail:
                '1.' + module491.monitor_setting_introduction_1 + '\n2.' + module491.monitor_setting_introduction_2 + '\n3.' + module491.monitor_setting_introduction_3 + '\n',
            },
            {
              visible: true,
            },
            {
              title: module491.realtime_video_title,
              visible: module386.default.isVideoSettingSupported(),
              style: {
                paddingVertical: 10,
              },
              shouldShowRightArrow: true,
              shouldShowBottomLongLine: true,
              detailColor: '#007AFF',
              detailWidth: 300,
              detail: this.getVideoSettingDetail(this.state.videoSetting),
              funcId: 'camera_setting_video_reminder_setting',
              onPress: function () {
                return t.props.navigation.navigate('VideoCallSettingPage');
              },
            },
            {
              title: module491.common_setting_secure_setting,
              visible: module386.default.isNewFuncSupported() && !(this.props.navigation.state.params && this.props.navigation.state.params.isMonitorPage),
              style: {
                paddingVertical: 10,
              },
              shouldShowRightArrow: true,
              shouldShowBottomLine: false,
              funcId: 'camera_setting_security_setting',
              onPress: function () {
                return t.props.navigation.navigate('SecuritySettingPage');
              },
            },
            {
              visible: true,
            },
            {
              title: module491.camera_monitor_privacy_title,
              shouldShowRightArrow: true,
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: false,
              style: {
                paddingVertical: 15,
              },
              funcId: 'camera_setting_monitor_privacy',
              onPress: this.goMonitorPrivacyPage.bind(this),
            },
            {
              visible: true,
            },
          ];
        },
      },
      {
        key: 'goMonitorPrivacyPage',
        value: function () {
          var t = this;
          this.props.navigation.navigate('WebViewPage', {
            title: module491.camera_monitor_privacy_title,
            refrence: module1378.default.MonitorPrivacy(),
            buttonTitle: module1363.default.monitorPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
            buttonColor: module1363.default.monitorPrivacyPolicyAgreed ? 'red' : '#007aff',
            buttonBackgroundColor: this.context.theme.netWorkError.backgroundColor,
            buttonAction: function (n) {
              if (module377.RSM.isRunning)
                n.alertView &&
                  n.alertView.customAlert(
                    '',
                    module491.map_object_cancel_privacy_stop_robot_alert,
                    function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                n.loadingView.showWithText();
                                t.next = 3;
                                return regeneratorRuntime.default.awrap(module407.default.stop());

                              case 3:
                                if (!t.sent) {
                                  t.next = 7;
                                  break;
                                }

                                if (n && n.loadingView) n.loadingView.hide();
                                t.next = 9;
                                break;

                              case 7:
                                if (n && n.loadingView) n.loadingView.hide();
                                globals.showToast(module491.localization_strings_Setting_History_index_1);

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
                      confirmTitle: module491.map_object_cancel_privacy_stop,
                    }
                  );
              else {
                var l = function () {
                  setTimeout(function () {
                    if (n.loadingView) n.loadingView.showWithText(module491.map_object_cancel_privacy_loading);
                  }, 100);
                  if (t.timerForUnlock) module1249.clearTimeout(t.timerForUnlock);
                  module377.RSM.hardLockCameraStatus();
                  module1363.default.updateMonitorPrivacy(!module1363.default.monitorPrivacyPolicyAgreed, function (o) {
                    if (
                      ((t.timerForUnlock = module1249.setTimeout(function () {
                        module377.RSM.unHardLockCameraStatus();
                      }, 500)),
                      setTimeout(function () {
                        if (n && n.loadingView) n.loadingView.hide();
                      }, 100),
                      o)
                    ) {
                      t.postPrivacyAgreement();
                      if ('' != (l = module1363.default.monitorPrivacyPolicyAgreed ? '' : module491.map_object_cancel_privacy_success)) globals.showToast(l);
                      n.props.navigation.setParams({
                        buttonTitle: module1363.default.monitorPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
                        buttonColor: module1363.default.monitorPrivacyPolicyAgreed ? 'red' : '#007AFF',
                      });
                      module383.LogEventCommon(module1363.default.monitorPrivacyPolicyAgreed ? 'accept_monitor_privacy' : 'reset_monitor_privacy_confirm');
                    } else {
                      var l = module1363.default.monitorPrivacyPolicyAgreed ? module491.map_object_cancel_privacy_timeout : module491.map_object_ignore_failed;
                      globals.showToast(l);
                    }
                  });
                };

                if (module1363.default.monitorPrivacyPolicyAgreed) {
                  if (n.alertView)
                    n.alertView.customAlert(
                      module491.reset_monitor_privacy_dialog_title,
                      module491.reset_monitor_privacy_dialog_content,
                      function () {
                        l();
                      },
                      function () {
                        module383.LogEventCommon('reset_monitor_privacy_cancel');
                      },
                      {
                        titleColor: t.context.theme.navTitleColor,
                        confirmColor: '#007AFF',
                      }
                    );
                } else l();
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module389.postPrivacyAgreementStatus(module377.RobotStatusManager.sharedManager().serverCode, module1363.default.monitorPrivacyPolicyAgreed ? 3 : 2)
                    );

                  case 3:
                    t = n.sent;
                    console.log('postPrivacyAgreementStatus - ' + t);
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 10:
                  case 'end':
                    return n.stop();
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
        key: 'getMapObjectPhotoMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module491.obstacle_pop_type_photo,
              visible: true,
              shouldShowSwitch: true,
              switchOn: this.state.mapObjectPhotoEnabled,
              switchValueChanged: this.photoFeatureValueChanged.bind(this),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
              shouldShowTitleLine: true,
              bottomDetailLineHeight: module387.default.isRRAndroid() ? 18 : 28,
              bottomDetail: module491.map_object_enable_intro,
            },
            {
              visible: true,
            },
            {
              title: module491.map_object_privacy_title,
              shouldShowRightArrow: true,
              visible: !module387.default.isShareUser(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              style: {
                paddingVertical: 15,
              },
              funcId: 'camera_setting_map_object_privacy',
              onPress: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module491.map_object_privacy_title,
                  refrence: module1378.default.PhotoPrivacy(),
                  buttonTitle: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
                  buttonColor: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                  buttonBackgroundColor: t.context.theme.netWorkError.backgroundColor,
                  refreshCurrent: function () {
                    setTimeout(function () {
                      t.setState({
                        mapObjectPhotoEnabled: module1363.default.mapObjectPhotoEnabled,
                      });
                    }, 2e3);
                  },
                  buttonAction: function (n) {
                    if (module377.RSM.isRunning)
                      n.alertView &&
                        n.alertView.customAlert(
                          '',
                          module491.map_object_cancel_privacy_stop_robot_alert,
                          function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      n.loadingView.showWithText();
                                      t.next = 3;
                                      return regeneratorRuntime.default.awrap(module407.default.stop());

                                    case 3:
                                      if (!t.sent) {
                                        t.next = 7;
                                        break;
                                      }

                                      if (n && n.loadingView) n.loadingView.hide();
                                      t.next = 9;
                                      break;

                                    case 7:
                                      if (n && n.loadingView) n.loadingView.hide();
                                      globals.showToast(module491.localization_strings_Setting_History_index_1);

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
                            confirmTitle: module491.map_object_cancel_privacy_stop,
                          }
                        );
                    else {
                      var l = function () {
                        setTimeout(function () {
                          if (n && n.loadingView) n.loadingView.showWithText(module491.map_object_cancel_privacy_loading);
                        }, 100);
                        if (t.timerForUnlock) module1249.clearTimeout(t.timerForUnlock);
                        module377.RSM.hardLockCameraStatus();
                        module389
                          .postPrivacyAgreementStatusWithVersion(
                            module377.RobotStatusManager.sharedManager().serverCode,
                            module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 5 : 4,
                            1
                          )
                          .then(function (t) {})
                          .catch(function (t) {});
                        module1363.default.updatePhotoPrivacy(!module1363.default.mapObjectPhotoPrivacyPolicyAgreed, function (o) {
                          if (
                            ((t.timerForUnlock = module1249.setTimeout(function () {
                              module377.RSM.unHardLockCameraStatus();
                            }, 500)),
                            setTimeout(function () {
                              if (n && n.loadingView) n.loadingView.hide();
                            }, 100),
                            o)
                          ) {
                            if ('' != (l = module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? '' : module491.map_object_cancel_privacy_success)) globals.showToast(l);
                            n.props.navigation.setParams({
                              buttonTitle: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
                              buttonColor: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                            });
                            module390.MC.mapObjectPhotos = {};
                            module390.MC.mapObjectLargePhotos = {};
                            module383.LogEventCommon(module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'accept_photo_privacy' : 'reset_photo_privacy_confirm');
                          } else {
                            var l = module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.map_object_cancel_privacy_timeout : module491.map_object_ignore_failed;
                            if (n) globals.showToast(l);
                          }
                        });
                      };

                      if (module1363.default.mapObjectPhotoPrivacyPolicyAgreed) {
                        if (n.alertView)
                          n.alertView.customAlert(
                            module491.reset_monitor_privacy_dialog_title,
                            module491.map_object_privacy_reset_dialog_content,
                            function () {
                              l();
                            },
                            null,
                            {
                              titleColor: t.context.theme.navTitleColor,
                              confirmColor: '#007AFF',
                            }
                          );
                      } else l();
                    }
                  },
                });
              },
            },
            {
              visible: true,
            },
          ];
        },
      },
      {
        key: 'getMenus',
        value: function () {
          return [this.getRRAIMenus(), this.getExplorationMenus(), this.getMonitorMenus(), this.getMapObjectPhotoMenus()][this.state.mode];
        },
      },
      {
        key: 'rraiValueChanged',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!module377.RSM.isRunning) {
                      l.next = 3;
                      break;
                    }

                    module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return l.abrupt('return');

                  case 3:
                    this.setState({
                      rraiEnabled: t,
                    });
                    module1363.default.cameraEnabled = t;
                    if (!t) module1363.default.explorationEnabled = t;
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                  case 8:
                    n = l.sent;
                    module383.LogEventStatus('rrai_switch', {
                      on: t,
                    });

                    if (!n) {
                      this.setState({
                        rraiEnabled: !t,
                      });
                      module1363.default.cameraEnabled = !t;
                    }

                  case 11:
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
        key: 'explorationValueChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!module377.RSM.isRunning) {
                      n.next = 3;
                      break;
                    }

                    module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return n.abrupt('return');

                  case 3:
                    if (!t || module1363.default.cameraEnabled) {
                      n.next = 6;
                      break;
                    }

                    this.alert.alert(module491.camera_setting_open_rrai_tip, '', [
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {},
                      },
                    ]);
                    return n.abrupt('return');

                  case 6:
                    this.setState({
                      explorationEnabled: t,
                    });
                    module1363.default.explorationEnabled = t;
                    n.next = 10;
                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                  case 10:
                    if (!n.sent) {
                      this.setState({
                        explorationEnabled: !t,
                      });
                      module1363.default.explorationEnabled = !t;
                    }

                  case 12:
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
        key: 'off_monitor',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if ((t = !this.state.monitorEnabled)) {
                      if (this.alert)
                        this.alert.customAlert('', module491.camera_setting_open_monitor_function_tip, null, null, {
                          confirmColor: '#007AFF',
                          shouldShowCancel: false,
                        });
                      module383.LogEventStat(module383.LogEventMap.RealTimeOn);
                      module383.LogEventStatus('realtime_monitor_status', {
                        on: t,
                      });
                    } else if (this.alert)
                      this.alert.customAlert(
                        '',
                        module491.camera_setting_monitor_off_tip,
                        function () {
                          return regeneratorRuntime.default.async(
                            function (l) {
                              for (;;)
                                switch ((l.prev = l.next)) {
                                  case 0:
                                    n.setState({
                                      monitorEnabled: t,
                                    });
                                    module1363.default.realTimeMonitorEnabled = t;
                                    l.next = 4;
                                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                                  case 4:
                                    if (!l.sent) {
                                      n.setState({
                                        monitorEnabled: !t,
                                      });
                                      module1363.default.realTimeMonitorEnabled = !t;
                                    }

                                    n.props.navigation.popToTop();
                                    setTimeout(function () {
                                      if (globals.app.state.theme == module507.Themes.dark) {
                                        module12.StatusBar.setBarStyle('light-content');
                                        if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
                                      } else {
                                        module12.StatusBar.setBarStyle('dark-content');
                                        if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
                                      }
                                    }, 1e3);
                                    module383.LogEventStat(module383.LogEventMap.RealTimeOff);
                                    module383.LogEventStatus('realtime_monitor_status', {
                                      on: t,
                                    });

                                  case 10:
                                  case 'end':
                                    return l.stop();
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
        key: 'photoFeatureValueChanged',
        value: function (t) {
          var module21, l, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (module389.isMiApp || !(module389.apiLevel < 10005)) {
                      c.next = 3;
                      break;
                    }

                    globals.showToast(module491.map_object_app_version_tip);
                    return c.abrupt('return');

                  case 3:
                    if (module1363.default.cameraEnabled) {
                      c.next = 6;
                      break;
                    }

                    globals.showToast(module491.camera_setting_open_rrai_tip);
                    return c.abrupt('return');

                  case 6:
                    if (!t) {
                      c.next = 24;
                      break;
                    }

                    module21 = module1363.default.mapObjectPhotoPrivacyPolicyAgreed;
                    c.next = 10;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.PhotoPrivacyVersion));

                  case 10:
                    if (
                      ((l = !!c.sent),
                      (s = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion),
                      0 != l || -1 != module390.MC.photoPrivacyVersionAgreedOnServer)
                    ) {
                      c.next = 21;
                      break;
                    }

                    c.next = 15;
                    return regeneratorRuntime.default.awrap(this.getPhotoPrivacyVersionAgreedVersionOnServer());

                  case 15:
                    if ((s = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion)) {
                      c.next = 19;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 19:
                    c.next = 24;
                    break;

                  case 21:
                    if (module21 && (l || s)) {
                      c.next = 24;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 24:
                    if (t || !module377.RSM.isRunning) {
                      c.next = 27;
                      break;
                    }

                    module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return c.abrupt('return');

                  case 27:
                    this.setState({
                      mapObjectPhotoEnabled: t,
                    });
                    module1363.default.mapObjectPhotoEnabled = t;
                    c.next = 31;
                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                  case 31:
                    if (c.sent)
                      module383.LogEventStatus('map_object_photo_switch', {
                        on: t,
                      });
                    else {
                      console.warn('switch failed');
                      this.setState({
                        mapObjectPhotoEnabled: !t,
                      });
                      module1363.default.mapObjectPhotoEnabled = !t;
                      globals.showToast(module491.robot_communication_exception);
                    }

                  case 33:
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
        key: 'getPhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = n.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module390.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 11:
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
      {
        key: 'savePhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module389.saveDeviceExtraValue('RRPhotoPrivacyVersion', module403.RRPhotoPrivacyVersion.toString()));

                  case 3:
                    t = n.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 10:
                  case 'end':
                    return n.stop();
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
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          console.log('thme', this.context.theme);
          var l = this.getMenus().map(function (t, o) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: o,
                      fontSize: 16,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, {
                    style: N.section,
                    key: o,
                  })
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: [
                N.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: [
                    N.top,
                    {
                      backgroundColor: o.componentBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(module12.Image, {
                  style: N.banner,
                  source: module1930[this.state.mode],
                })
              ),
              l,
              React.default.createElement(module381.PureButton, {
                funcId: 'off_monitor',
                style: [
                  N.offMonitor,
                  {
                    backgroundColor: o.setting.delBackgroundColor,
                    borderColor: o.setting.borderColor,
                  },
                ],
                textColor: '#3777F7',
                fontSize: 16,
                title: module491.camera_setting_detail1,
                onPress: function () {
                  return t.off_monitor();
                },
              }),
              React.default.createElement(module381.AlertView, {
                ref: function (o) {
                  return (t.alert = o);
                },
              })
            ),
            React.default.createElement(module1807.PhotoFeaturePrivacyDialog, {
              ref: function (o) {
                return (t.photoPrivacyDialog = o);
              },
              confirmTextColor: '#007AFF',
              confirmTitle: module491.button_title_agree,
              onConfirm: function () {
                return module1363.default.updatePhotoPrivacy(true, function (o) {
                  if (!o) globals.showToast(module491.robot_communication_exception);
                  if (o) module411.SetStorageKey(module411.StorageKeys.PhotoPrivacyVersion, module411.StorageKeys.PhotoPrivacyVersion);
                  if (o) t.savePhotoPrivacyVersionAgreedVersionOnServer();
                  if (o) t.photoFeatureValueChanged(true);
                  module389
                    .postPrivacyAgreementStatusWithVersion(module377.RobotStatusManager.sharedManager().serverCode, 4, 1)
                    .then(function (t) {})
                    .catch(function (t) {});
                });
              },
              onPressLink: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module491.map_object_privacy_title,
                  refrence: module1378.default.PhotoPrivacy(),
                });
              },
              onShowListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: o.modalBackgroundColor,
                  onPressLeft: function () {},
                });
              },
              onHideListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: o.navBackgroundColor,
                  onPressLeft: function () {
                    return navigation.pop();
                  },
                });
              },
            }),
            React.default.createElement(module1803.MonitorPrivacyDialogWithNavbar, {
              ref: function (o) {
                return (t.monitorPrivacyDialog = o);
              },
              confirmTextColor: '#007AFF',
              confirmTitle: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onConfirm: function () {},
              noTitle: true,
              desc1: module491.camera_setting_open_monitor_function_tip_1,
              desc2: module491.camera_setting_open_monitor_function_tip,
              shouldShowCancel: false,
              onPressLink: this.goMonitorPrivacyPage.bind(this),
              onShowListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: o.modalBackgroundColor,
                  onPressLeft: function () {},
                });
              },
              onHideListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: o.navBackgroundColor,
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
          var module21;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module21 = 0 == t;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module1363.default.updatePetModeEnabled(module21));

                  case 3:
                    this.setState({
                      petModeEnabled: module1363.default.petModeEnabled,
                    });

                  case 4:
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
        key: 'getVideoSettingDetail',
        value: function (t) {
          return t == module385.VideoSettingMap().VideoSettingStrongReminder
            ? module491.realtime_video_title_3
            : t == module385.VideoSettingMap().VideoSettingNotDisturb
            ? module491.realtime_video_title_1
            : module491.realtime_video_title_2;
        },
      },
    ]);
    return H;
  })(React.Component);

exports.default = I;
I.contextType = module506.AppConfigContext;
var N = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  banner: {
    width: module12.Dimensions.get('window').width,
    height: 0.5333333333333333 * module12.Dimensions.get('window').width,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
  },
  section: {
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  offMonitor: {
    marginTop: 10,
    alignSelf: 'stretch',
    height: 60,
    marginTop: 10,
    marginBottom: 20,
  },
});
