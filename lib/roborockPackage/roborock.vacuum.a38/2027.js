var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2028 = require('./2028'),
  module385 = require('./385'),
  module2032 = require('./2032'),
  module391 = require('./391'),
  module2033 = require('./2033'),
  module381 = require('./381'),
  module418 = require('./418'),
  module1153 = require('./1153'),
  module2047 = require('./2047'),
  module2048 = require('./2048'),
  module390 = require('./390'),
  module394 = require('./394'),
  module416 = require('./416'),
  module2049 = require('./2049'),
  module2055 = require('./2055'),
  module414 = require('./414'),
  module2056 = require('./2056'),
  module2058 = require('./2058'),
  module2057 = require('./2057'),
  module2062 = require('./2062'),
  module2064 = require('./2064'),
  module2066 = require('./2066'),
  module1507 = require('./1507'),
  module515 = require('./515'),
  module1925 = require('./1925'),
  module422 = require('./422'),
  module387 = require('./387'),
  module2036 = require('./2036'),
  module2035 = require('./2035'),
  module516 = require('./516'),
  module1157 = require('./1157'),
  module2037 = require('./2037');

function Y(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function Z() {
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
  module2068 = module393.monitorAllowed() ? require('./2068').default : module12.View,
  module500 = require('./500').strings,
  ie = module12.NativeModules.Orientation,
  oe = module12.NativeModules.RRVideoViewManager,
  module1153 = require('./1153'),
  re = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  ae = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  se = module391.default.scaledPixel(176),
  le = module12.StatusBar.currentHeight || 0,
  ce = [module500.monitor_bumper_tip_front, module500.monitor_bumper_tip_left, module500.monitor_bumper_tip_right],
  ue = [module500.monitor_obstacle_tip_front, module500.monitor_obstacle_tip_left, module500.monitor_obstacle_tip_right],
  de = re() > 500 ? 414 : re(),
  he = module391.default.isIphoneX() ? 44 : 0,
  ge = module391.default.iOSAndroidReturn(he, 0),
  fe = function () {
    return (281 * (ae() - ge)) / 768;
  },
  module2041 = (function (t) {
    module7.default(Y, t);

    var o = Y,
      module50 = Z(),
      N = function () {
        var t,
          s = module11.default(o);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function Y(t) {
      var o;
      module4.default(this, Y);

      (o = N.call(this, t))._handleAppStateChange = function (t) {
        var n, s;
        return regeneratorRuntime.default.async(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  if (
                    (o.appStateTimer &&
                      (console.log('appStateTimer \u5feb\u901f\u8fdb\u5165 \u524d\u53f0 \u548c\u540e\u53f0\uff01\uff01'), clearTimeout(o.appStateTimer), (o.appStateTimer = null)),
                    console.log('\u5207\u6362\u524d\u540e\u53f0\u901a\u77e5 --\x3e _handleAppStateChange -- state = ' + t),
                    (n = module391.default.iOSAndroidReturn('background' == t, 'background' == t)),
                    (s = 'active' == t),
                    n && o.stopMonitor(),
                    (c.t0 = n),
                    !c.t0)
                  ) {
                    c.next = 9;
                    break;
                  }

                  c.next = 9;
                  return regeneratorRuntime.default.awrap(module414.default.remoteEnd());

                case 9:
                  if (s && !o.isMonitoring)
                    o.appStateTimer = setTimeout(function () {
                      o.retryTimes = 0;
                      if (!module381.RSM.isChargingOnDock()) o.checkShouldStartWithNetStatus(0, null, module500.video_is_loading);
                      clearTimeout(o.appStateTimer);
                      o.appStateTimer = null;
                    }, 50);

                case 10:
                case 'end':
                  return c.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o.tipTimer = null;
      o.retryTimes = 0;
      o._isMounted = false;
      o.shouldHandleRobotOnOrLeaveDock = true;
      o.isLastTimeChargingOnDock = module381.RSM.isChargingOnDock();
      o.userClickBackButtonFirst = false;
      o.lastOperationTime = null;
      o.state = {
        currentDefinition: module500.video_definition_normal,
        shouldShowTip: false,
        tip: null,
        fixedTip: null,
        isLoading: false,
        isLoadFailed: false,
        sdkinfoString: null,
        error: null,
        isPortrait: true,
        portraitTabIndex: 0,
        shouldShowUI: true,
        shouldShowRecordToast: false,
        calling: false,
        soundVolume: 0,
        robotMic: false,
        screenRecording: false,
        showChatTips: false,
        showChatVolume: false,
      };
      o.remoteRpcSeqnum = 0;
      o.isCelluarAlertShownBeforeMonitoring = false;
      o.isCelluarAlertShownWhenMonitoring = false;
      o.isMonitoring = false;
      o.startMonitorTime = 0;
      return o;
    }

    module5.default(Y, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          console.log('MonitorPage --\x3e componentWillMount ' + new Date());
          module1157.default.shared().popGestureEnabled = false;
          module393.keepScreenOn(true);
          module12.StatusBar.setBarStyle('light-content');
          if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('black', false);
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            if (globals.isNetworkOn) t.back();
            else module393.closeCurrentPage();
            return true;
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1925.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.endVideoOperation();
          module416.Log.log(module416.LogTypes.Monitor, 'MonitorPage componentWillUnmount');
          if (this.props.navigation.state.params && this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
          this._isMounted = false;

          if (globals.app.state.theme == module516.Themes.dark) {
            module12.StatusBar.setBarStyle('light-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          } else {
            module12.StatusBar.setBarStyle('dark-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          }

          if (ie) ie.lockToPortrait();
          if (this.statusListener) this.statusListener.remove();
          if (this.backListener) this.backListener.remove();
          module12.AppState.removeEventListener('change', this._handleAppStateChange);
          if (this.tipTimer) clearInterval(this.tipTimer);
          module393.keepScreenOn(false);
          this.stopMonitor();
          if (this.remoteView) this.remoteView.stop();
          clearInterval(this.checkUIShouldHideTimer);
          regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((t.t0 = module381.RSM.state == module381.RobotState.GOTO_TARGET), !t.t0)) {
                      t.next = 4;
                      break;
                    }

                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.pause());

                  case 4:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
          if (this.gotoFailListener) this.gotoFailListener.remove();
          if (this.props.navigation.state.params && this.props.navigation.state.params.monitorPageUnmount) this.props.navigation.state.params.monitorPageUnmount();
          var t = Math.ceil((new Date().getTime() - this.startMonitorTime) / 1e3);
          module387.LogEventStatus('video_duration', {
            duration: t,
          });
        },
      },
      {
        key: 'startMonitor',
        value: function (t) {
          var o, n, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (!module381.RSM.isChargingOnDock()) {
                      c.next = 2;
                      break;
                    }

                    return c.abrupt('return');

                  case 2:
                    console.log('\u5f53\u524d homeSecClientID = ' + module381.RSM.homeSecClientID + ' \u5f53\u524dappClientID = ' + module393.appClientID);
                    this.loadingTip = t || module500.connecting_video_security_channel;
                    this.setState({
                      isLoading: true,
                      isLoadFailed: false,
                      error: null,
                    });
                    c.prev = 5;
                    c.next = 8;
                    return regeneratorRuntime.default.awrap(module414.default.getHomeSecConnectStatus());

                  case 8:
                    o = c.sent;
                    console.log('startMonitor \u65f6 \u4e3b\u52a8\u83b7\u53d6\u7684 camera status = ' + ('object' == typeof o.result ? JSON.stringify(o.result) : o));
                    n = o.result.client_id;
                    module381.RSM.homeSecClientID = n;
                    c.next = 17;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(5);
                    module381.RSM.homeSecClientID = 'none';

                  case 17:
                    if (module381.RSM.isHomeSecDisconnected()) {
                      this.hasCallStart = true;
                      s = {
                        quality: module1153.VideoQuality.SD,
                        password: module394.MC.gesturePassword,
                        client_id: module393.appClientID,
                      };
                      if (module393.monitorAllowed() && this.videoView)
                        this.videoView.startCameraPreview_IoT(s, function (t) {
                          console.log('\u6536\u5230 startPreview \u6210\u529f\u56de\u8c03');
                        });
                    } else if (module381.RSM.isHomeSecRunning())
                      module381.RSM.isHomeSecControlledByCurrentClient()
                        ? (module416.Log.log(
                            module416.LogTypes.Monitor,
                            'do nothing, because current user is already in preview - ' + module381.RSM.homeSecStatus,
                            module416.InfoColors.Fail
                          ),
                          this.setState({
                            shouldShowTip: false,
                            isLoading: false,
                          }))
                        : (module416.Log.log(
                            module416.LogTypes.Monitor,
                            'not start and show retry dialog, because other guy is already in preview - ' + module381.RSM.homeSecStatus,
                            module416.InfoColors.Fail
                          ),
                          this.setState({
                            isLoading: false,
                            isLoadFailed: true,
                            error: module1153.VideoError.Video_StartPreviewFailed_alreadyInPreview,
                          }));
                    else if (module381.RSM.isHomeSecDisconnecting()) {
                      module416.Log.log(module416.LogTypes.Monitor, 'not start and auto retry,because monitor is exiting,not ready');
                      this.setState({
                        isLoading: true,
                        isLoadFailed: false,
                        error: null,
                      });
                      this.checkShouldAutoRetry();
                    }

                  case 18:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[5, 14]],
            Promise
          );
        },
      },
      {
        key: 'checkShouldAutoRetry',
        value: function () {
          var t = this;

          if (this.retryTimes <= 8) {
            this.retryTimes++;
            setTimeout(function () {
              t.startMonitor(t.loadingTip);
            }, 500);
          } else {
            this.setState({
              isLoading: false,
              isLoadFailed: true,
              error: this.error,
            });
            this.retryTimes = 0;
            module416.Log.log(module416.LogTypes.Monitor, 'auto retry exceeded max 8 times,show retry dialog', module416.InfoColors.Fail);
          }
        },
      },
      {
        key: 'stopMonitor',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    console.log('\u89c6\u9891\u8c03\u7528 stopMonitor');

                    if (this.hasCallStart) {
                      this.endVideoOperation();
                      module381.RSM.homeSecStatus = module381.RRHomeSecStatus.RRHomeSecStatusDisconnecting;
                      module381.RSM.lockHomeSecStatus();
                      if (module393.monitorAllowed() && this.videoView)
                        this.videoView.stopCameraPreview_IoT({
                          client_id: module393.appClientID,
                        });
                      this.isMonitoring = false;
                      this.lastOperationTime = null;
                    }

                  case 2:
                  case 'end':
                    return t.stop();
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
        key: 'getFirmwareVersion',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 2:
                    t = o.sent;
                    this.firmVersion = t && t.currentVersion;

                  case 4:
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
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this._isMounted = true;
          this.getFirmwareVersion();
          this.handleRobotOnOrLeaveDock(0);
          var o = module381.RSM.voiceChat;
          this.statusListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.shouldHandleRobotOnOrLeaveDock = t.isLastTimeChargingOnDock != module381.RSM.isChargingOnDock();
            if (t.shouldHandleRobotOnOrLeaveDock) t.handleRobotOnOrLeaveDock(2500);
            if (module381.RSM.bumperLeft) t.showTip(ce[module2055.DirectionLeft]);
            if (module381.RSM.bumperRight) t.showTip(ce[module2055.DirectionRight]);
            if (module381.RSM.bumperMiddle) t.showTip(ce[module2055.DirectionMiddle]);
            if (module381.RSM.obstacleLeft) t.showTip(ue[module2055.DirectionLeft]);
            if (module381.RSM.obstacleRight) t.showTip(ue[module2055.DirectionRight]);
            if (module381.RSM.obstacleMiddle) t.showTip(ue[module2055.DirectionMiddle]);
            if (t.navbar) t.navbar.update();

            if (t.lastState != module381.RSM.state) {
              t.lastState = module381.RSM.state;
              if (t.actionMenu) t.actionMenu.forceUpdate();
            }

            if (module381.RSM.isChargingOnDock() && null != t.state.error)
              t.setState({
                error: null,
              });

            if (o != module381.RSM.voiceChat && !(o = module381.RSM.voiceChat) && t.state.calling) {
              t.endVideoOperation();
              t.popToHome();
            }
          });
          this.checkUIShouldHideTimer = setInterval(function () {
            if (!t.forceHideUI) {
              var o = new Date().getTime(),
                n =
                  !t.lastOperationTime ||
                  (o - t.lastOperationTime) / 1e3 <= 10 ||
                  (t.gotoView && t.gotoView.state.isMax) ||
                  (t.navbar && t.navbar.state.showChatVolume) ||
                  (t.remoteView && t.remoteView.isTouched);
              if (t.state.shouldShowUI != n)
                t.setState({
                  shouldShowUI: n,
                });
            }
          }, 1e3);
          module12.AppState.addEventListener('change', this._handleAppStateChange);
          module1925.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.gotoFailListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.EventToastChange, function (o) {
            if ('target_not_reachable' == o.data) t.showTip(module1507.getToast()[o.data][0]);
          });
          this.startMonitorTime = new Date().getTime();
        },
      },
      {
        key: 'popToHome',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.customAlert(
              '',
              module500.monitor_page_video_end,
              function () {
                t.props.navigation.popToTop();
              },
              null,
              {
                confirmColor: '#007AFF',
                shouldShowCancel: false,
              }
            );
        },
      },
      {
        key: 'getNetworkStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module1925.default.getConnectionInfo());

                  case 3:
                    t = o.sent;
                    return o.abrupt('return', t.type);

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('getNetworkStatus  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                    return o.abrupt('return', null);

                  case 11:
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
        key: 'onNetWorkChange',
        value: function (t) {
          var o, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (t) {
                      s.next = 2;
                      break;
                    }

                    return s.abrupt('return');

                  case 2:
                    if (!this.isCelluarAlertShownBeforeMonitoring) {
                      s.next = 5;
                      break;
                    }

                    this.checkShouldStartWithNetStatus(0);
                    return s.abrupt('return');

                  case 5:
                    s.next = 7;
                    return regeneratorRuntime.default.awrap(this.getNetworkStatus());

                  case 7:
                    o = s.sent;
                    n = o != this.lastNetStatus;
                    module416.Log.log(module416.LogTypes.Monitor, 'network status changed ' + o + ',isMonitoring ' + this.isMonitoring, module416.InfoColors.Normal);

                    if (n && 'cellular' == o && this.isMonitoring) {
                      this.isCelluarAlertShownWhenMonitoring = true;
                      globals.showToast(module500.use_celluar_for_monitor_tip);
                    }

                    this.lastNetStatus = o;

                  case 12:
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
        key: 'backToHome',
        value: function () {
          var t = this;
          if (
            module381.RSM.state == module381.RobotState.PAUSE ||
            module381.RSM.state == module381.RobotState.WAITING ||
            module381.RSM.state == module381.RobotState.SLEEPING ||
            module381.RSM.state == module381.RobotState.REMOTE
          ) {
            if (this.alert)
              this.alert.customAlert(
                '',
                module500.ask_whether_back_to_charge,
                function () {
                  var o;
                  return regeneratorRuntime.default.async(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            module387.LogEventCommon('back_to_charge_confirm');
                            n.prev = 1;
                            n.next = 4;
                            return regeneratorRuntime.default.awrap(module414.default.charge());

                          case 4:
                            o = n.sent;
                            console.log('backToHome  charge ' + JSON.stringify(o) + '}');
                            n.next = 11;
                            break;

                          case 8:
                            n.prev = 8;
                            n.t0 = n.catch(1);
                            console.log('backToHome  charge error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                          case 11:
                            t.props.navigation.popToTop();

                          case 12:
                          case 'end':
                            return n.stop();
                        }
                    },
                    null,
                    null,
                    [[1, 8]],
                    Promise
                  );
                },
                function () {
                  module387.LogEventCommon('back_to_charge_cancel');
                  t.props.navigation.popToTop();
                },
                {
                  confirmColor: '#007AFF',
                }
              );
          } else this.props.navigation.popToTop();
        },
      },
      {
        key: 'handleRobotOnOrLeaveDock',
        value: function (t) {
          var o = this,
            n = module381.RSM.state == module381.RobotState.COLLECTING_DUST;
          this.isLastTimeChargingOnDock = module381.RSM.isChargingOnDock();

          if (module381.RSM.isChargingOnDock() || n) {
            console.log('handleRobotOnOrLeaveDock ---handleOnDock');
            o.stopMonitor();
            o.setState({
              fixedTip: n ? module500.video_error116_resolve : module500.monitor_page_robot_on_dock_tip,
              isLoading: false,
              error: null,
              isLoadFailed: false,
            });
          } else {
            console.log('handleRobotOnOrLeaveDock ---handleLeaveDock');
            o.setState({
              fixedTip: null,
            });
            o.checkShouldStartWithNetStatus(t);
          }

          this.shouldHandleRobotOnOrLeaveDock = false;
        },
      },
      {
        key: 'checkShouldStartWithNetStatus',
        value: function (t, o, n) {
          var s,
            c,
            u = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (
                      ((s = function () {
                        setTimeout(function () {
                          return u.startMonitor(n);
                        }, t);
                      }),
                      (h.t0 = o),
                      h.t0)
                    ) {
                      h.next = 6;
                      break;
                    }

                    h.next = 5;
                    return regeneratorRuntime.default.awrap(this.getNetworkStatus());

                  case 5:
                    h.t0 = h.sent;

                  case 6:
                    c = h.t0;
                    s();
                    if ('wifi' == c) this.isCelluarAlertShownBeforeMonitoring = false;
                    else {
                      this.isCelluarAlertShownBeforeMonitoring = true;
                      globals.showToast(module500.would_you_like_to_monitor_with_celluar);
                    }

                  case 9:
                  case 'end':
                    return h.stop();
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
        key: 'getTipMask',
        value: function (t, o, n) {
          return React.default.createElement(
            module12.View,
            {
              style: [
                me.mask,
                {
                  top: n ? ge : 0,
                  backgroundColor: t ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)',
                  width: re(!n),
                  height: n ? fe() : ae(!n),
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  me.tip,
                  {
                    maxWidth: n ? '90%' : '75%',
                  },
                ],
              },
              o
            )
          );
        },
      },
      {
        key: 'getRetryView',
        value: function (t) {
          var o = this,
            n = module500.video_load_failed;
          return this.state.isLoadFailed
            ? React.default.createElement(
                module12.View,
                {
                  style: [
                    me.mask,
                    {
                      top: t ? ge : 0,
                      zIndex: 5,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: re(!t),
                      height: t ? fe() : ae(!t),
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      me.tip,
                      {
                        fontSize: 16,
                      },
                    ],
                  },
                  n + (this.state.error ? ' (error ' + this.state.error.code + ')' : '')
                ),
                !module422.DMM.isV1 &&
                  this.state.error &&
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        me.tip,
                        {
                          textAlign: 'left',
                          fontSize: 12,
                          marginTop: 5,
                        },
                      ],
                    },
                    this.state.error.resolve +
                      ' \n App Version:' +
                      module393.currentAppVersion() +
                      ',Firmware Versioin:' +
                      this.firmVersion +
                      ',PluginVersion:' +
                      module391.default.pluginVersion() +
                      ',time:' +
                      (this.errorTime && module416.LogHeper.getTime(this.errorTime))
                  ),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    },
                  },
                  React.default.createElement(module385.PureButton, {
                    funcId: 'retry_view',
                    textColor: 'white',
                    title: module500.button_title_retry,
                    style: me.retryButton,
                    onPress: function () {
                      return o.startMonitor();
                    },
                  }),
                  React.default.createElement(module385.PureButton, {
                    funcId: 'accessibility_guide',
                    textColor: 'white',
                    title: module500.accessibility_guide,
                    style: me.retryButton,
                    onPress: function () {
                      return o.props.navigation.navigate('MonitorErrorPage', {
                        title: module500.accessibility_guide,
                        isPortrait: o.state.isPortrait,
                      });
                    },
                  })
                )
              )
            : null;
        },
      },
      {
        key: 'getLoadingView',
        value: function (t) {
          return this.state.isLoading
            ? React.default.createElement(
                module12.View,
                {
                  style: [
                    me.mask,
                    {
                      top: t ? ge : 0,
                      zIndex: 6,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: re(!t),
                      height: t ? fe() : ae(!t),
                    },
                  ],
                },
                React.default.createElement(module12.Image, {
                  style: me.loadingView,
                  source: require('./2071'),
                }),
                React.default.createElement(
                  module12.Text,
                  module22.default({}, module391.default.getAccessibilityLabel('connecting_video_security_channel'), {
                    style: [
                      me.tip,
                      {
                        fontSize: 14,
                      },
                    ],
                  }),
                  this.loadingTip + '  '
                )
              )
            : null;
        },
      },
      {
        key: 'getVideoView',
        value: function (t) {
          var o = this,
            n = re(!t),
            s = t ? fe() : ae(!t),
            l = {
              width: n,
              height: s,
            },
            c = React.default.createElement(module2068, {
              ref: function (t) {
                return (o.videoView = t);
              },
              style: [
                me.video,
                l,
                {
                  position: t ? 'relative' : 'absolute',
                  top: 0,
                },
              ],
              backgroundColor: t ? 'transparent' : '#eeeeee',
              onDidReceivedToastMsg: this.didRecieveMsg.bind(this),
              onFirstFrameRendered: this.videoIsReady.bind(this),
              onFrameRateValueChanged: this.rateDidChange.bind(this),
              onDidReceivedVideoErrorCode: this.didRecieveError.bind(this),
              onFrameStuck: this.onFrameStuck.bind(this),
              getVolumeChanged: this.getVolumeChanged.bind(this),
              parent: this,
              videoWidth: n,
              videoHeight: s,
              isFullScreen: !t,
              hasLoadedVideo: !this.state.isLoading,
            }),
            module2072 = React.default.createElement(
              module12.View,
              {
                style: [
                  me.video,
                  l,
                  {
                    position: t ? 'relative' : 'absolute',
                  },
                ],
              },
              React.default.createElement(module12.Image, {
                source: require('./2072'),
              })
            ),
            h = React.default.createElement(
              module12.View,
              {
                style: {
                  backgroundColor: 'black',
                },
              },
              c
            );
          return module393.monitorAllowed() ? module391.default.iOSAndroidReturn(h, c) : module2072;
        },
      },
      {
        key: 'didRecieveMsg',
        value: function (t) {},
      },
      {
        key: 'rateDidChange',
        value: function (t) {
          this.rate = t;
          if (this.navbar)
            this.navbar.setState({
              rate: t,
            });
        },
      },
      {
        key: 'didRecieveError',
        value: function (t, o) {
          if (!(t.code == module1153.VideoError.Video_SendSDKSdpToDeviceFailed_responseTimeout.code && this.isMonitoring))
            t.code == module1153.VideoError.Video_StartPreviewFailed_alreadyInPreview.code &&
            (module416.Log.log(
              module416.LogTypes.Monitor,
              '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef\uff0cerror clientID=' + o + ', current clientID=' + module393.appClientID
            ),
            o && ((module381.RSM.homeSecClientID = o), o == module393.appClientID))
              ? module416.Log.log(
                  module416.LogTypes.Monitor,
                  '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef: \u5176\u5b9e\u8fd8\u662f\u81ea\u5df1\uff0c\u5ffd\u7565\u8fd9\u79cd\u9519\u8bef'
                )
              : (module416.Log.log(module416.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891\u62a5\u9519 \u9519\u8bef\u7801 code=' + t.code),
                this.stopMonitor(),
                (this.error = t),
                (this.errorTime = new Date().getTime()),
                t.code == module1153.VideoError.Video_StartPreviewFailed_unKnownReason.code ||
                t.code == module1153.VideoError.Video_StartPreviewFailed_innerUnknowReason.code ||
                t.code == module1153.VideoError.Video_PreviewTimeout
                  ? (module416.Log.log(module416.LogTypes.Monitor, 'not start and auto retry,because recieve errors which may be retryed to handle,' + t.code),
                    this.checkShouldAutoRetry())
                  : this.setState({
                      isLoading: false,
                      isLoadFailed: true,
                      error: t,
                    }));
        },
      },
      {
        key: 'onFrameStuck',
        value: function () {
          var t = 'SD' == this.definition ? module500.monitor_video_net_speed_slow_sd + ' ' + this.rate : module500.monitor_video_net_speed_slow_hd;
          if (!this.state.isLoading && !this.state.isLoadFailed) this.showTip(t);
        },
      },
      {
        key: 'showTip',
        value: function (t) {
          var o = this;
          this.lastTipTime = new Date();
          if (!this.tipTimer)
            this.tipTimer = setInterval(function () {
              var t = (new Date() - o.lastTipTime) / 1e3 <= 3;
              if (o.state.shouldShowTip != t)
                o.setState({
                  shouldShowTip: t,
                });
            }, 500);
          this.setState({
            shouldShowTip: true,
            tip: t,
          });
        },
      },
      {
        key: 'videoIsReady',
        value: function () {
          module416.Log.log(module416.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891 SDK \u9996\u5e27\u6e32\u67d3\u6210\u529f \u901a\u77e5\uff01');
          this.setState({
            shouldShowTip: false,
            isLoading: false,
          });
          this.isMonitoring = true;
          this.lastOperationTime = new Date().getTime();
        },
      },
      {
        key: 'onPressDefinitionButton',
        value: function () {
          if (this.definitionView) this.definitionView.show();
        },
      },
      {
        key: 'definitionDidChange',
        value: function (t, o) {
          if (t) {
            this.setState({
              currentDefinition: o.title,
            });
            this.definition = o.command;
          } else if (this.isMonitoring) this.showTip(module500.robot_communication_exception);
        },
      },
      {
        key: '_actionMenuWillRunCmd',
        value: function () {
          if (this.remoteView) this.remoteView.stopRemoteMove();

          this._userDidOperate();
        },
      },
      {
        key: '_userDidOperate',
        value: function () {
          this.lastOperationTime = new Date().getTime();
        },
      },
      {
        key: 'toggleUI',
        value: function () {
          var t = this;
          this.setState(
            {
              shouldShowUI: !this.state.shouldShowUI,
            },
            function () {
              if (t.state.shouldShowUI) {
                t.forceHideUI = false;
                t.lastOperationTime = new Date().getTime();
              } else t.forceHideUI = true;
            }
          );
        },
      },
      {
        key: '_shouldRunCmd',
        value: function (t, o) {
          var n = {
            clean: module500.monitor_page_whether_stop_current_task + module500.main_page_clean_1,
            charge: module500.monitor_page_whether_stop_current_task + module500.main_page_charge_2,
            remote: module500.localization_strings_abort_current_task_and_start_remote,
            goto: module500.monitor_page_whether_stop_current_task + module500.rubys_main_button_text_goto,
          };
          if (this.alert)
            this.alert.customAlert(
              '',
              '' + n[o],
              function () {
                return t(true);
              },
              function () {
                return t(false);
              },
              {
                confirmColor: '#007AFF',
              }
            );
        },
      },
      {
        key: '_robotStartMove',
        value: function () {
          console.log('\u673a\u5668\u5f00\u59cb \u8fd0\u52a8');
        },
      },
      {
        key: 'switchScreen',
        value: function (t) {
          var o = this;
          module12.StatusBar.setHidden(!t, 'none');
          setTimeout(function () {
            if (t) {
              if (ie) ie.lockToPortrait();
              setTimeout(function () {
                console.log('switchScreen width ' + re() + ',height ' + ae());
                if (re() > ae())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + re() + ',height ' + ae());
                    o.setState({
                      isPortrait: true,
                    });
                  }, 200);
                else
                  o.setState({
                    isPortrait: true,
                  });
                if (o.state.calling)
                  o.setState({
                    portraitTabIndex: 2,
                  });
              }, 200);
            } else {
              if (ie) ie.lockToLandscapeLeft();
              setTimeout(function () {
                if (re() < ae())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + re() + ',height ' + ae());
                    o.setState({
                      isPortrait: false,
                      shouldShowUI: true,
                    });
                  }, 200);
                else
                  o.setState({
                    isPortrait: false,
                    shouldShowUI: true,
                  });
                o.lastOperationTime = new Date().getTime();
              }, 200);
            }
          }, 200);
        },
      },
      {
        key: 'goToSetting',
        value: function () {
          console.log('voiceChat - ' + module381.RSM.voiceChat);
          if (module381.RSM.voiceChat) globals.showToast(module500.voice_chat_title2);
          else
            this.props.navigation.navigate('CameraSettingDetail', {
              isMonitorPage: true,
            });
        },
      },
      {
        key: 'getNavbar',
        value: function (t) {
          var o = this;
          return React.default.createElement(module2033.default, {
            battery: module381.RSM.battery,
            isPortrait: t,
            shouldShowUI: this.state.shouldShowUI,
            isRemoteLaunching: this.remoteView && this.remoteView.state.isRemoteLaunching,
            onPressBackButton: this.back.bind(this),
            onPressSettingButton: this.goToSetting.bind(this),
            onPressDefinitionButton: this.onPressDefinitionButton.bind(this),
            miniScreen: this.back.bind(this),
            onPressVoiceRecordButton: this.voiceRecord.bind(this),
            onPressSoundOffButton: this.soundOff.bind(this),
            onPressScreenRecordingButton: this.screenRecording.bind(this),
            onPressScreenShotButton: this.screenShot.bind(this),
            stopRecordVideo: this.stopRecordVideo.bind(this),
            currentDefinition: this.state.currentDefinition,
            robotMic: this.state.robotMic,
            screenRecording: this.state.screenRecording,
            calling: this.state.calling,
            ref: function (t) {
              return (o.navbar = t);
            },
            style: [
              me.navbar,
              {
                backgroundColor: 'transparent',
                top: t ? ge + 10 : 10,
              },
            ],
          });
        },
      },
      {
        key: 'back',
        value: function () {
          if (this.state.isPortrait) this.backToHome();
          else this.switchScreen(true);
        },
      },
      {
        key: 'getRemoteView',
        value: function (t) {
          var o = this;
          return React.default.createElement(module2049.default, {
            ref: function (t) {
              return (o.remoteView = t);
            },
            seqnum: this.remoteRpcSeqnum,
            isPortrait: t,
            width: t ? de : se,
            askShouldRunCmd: this._shouldRunCmd.bind(this),
            style: [
              t ? me.portraitRemoteView : me.remoteView,
              t
                ? {}
                : {
                    left: module1153.AppBarMarginTop + 24,
                  },
            ],
            didBeginRemote: function () {
              return o.navbar && o.navbar.forceUpdate();
            },
            didOperate: this._userDidOperate.bind(this),
            updateSeqnum: function (t) {
              return (o.remoteRpcSeqnum = t);
            },
          });
        },
      },
      {
        key: 'getMapGotoView',
        value: function (t) {
          var o = this;
          return React.default.createElement(module2048.default, {
            isPortrait: t,
            ref: function (t) {
              return (o.gotoView = t);
            },
            askShouldRunCmd: this._shouldRunCmd.bind(this),
            toastMsg: function (t) {
              return globals.showToast(t);
            },
            userDidOperate: this._userDidOperate.bind(this),
          });
        },
      },
      {
        key: 'getRecordView',
        value: function () {
          return React.default.createElement(module2058.default, {
            style: me.recordView,
            isLandscape: true,
            didOperate: this._userDidOperate.bind(this),
            alertOwner: this,
            recordToastHide: this.recordToastHide.bind(this),
            recordToastShow: this.recordToastShow.bind(this),
          });
        },
      },
      {
        key: 'getRecordListView',
        value: function () {
          return React.default.createElement(module2057.default, {
            isLandscape: false,
            alertOwner: this,
          });
        },
      },
      {
        key: 'getCallView',
        value: function (t) {
          return React.default.createElement(module2064.default, {
            style: me.callView,
            isLandscape: t,
            calling: this.state.calling,
            alertOwner: this.props.alertOwner,
            start: this.callStart.bind(this),
            end: this.endCalls.bind(this),
          });
        },
      },
      {
        key: 'getPortraitVideoBottomView',
        value: function () {
          var t = this,
            o = module422.DMM.isTopazSV_CN && 'cn' == module381.RSM.countryCode && 'cn' == module381.RSM.deviceLocation,
            n = module422.DMM.isTopazSV || module422.DMM.isTanosSV,
            s = module381.RSM.isChargingOnDock();
          return React.default.createElement(
            module12.View,
            {
              style: [
                me.videoBottomView,
                this.state.showChatVolume && {
                  height: 150,
                },
              ],
            },
            React.default.createElement(module385.PureImageButton, {
              funcId: 'fullScreenButton',
              style: [
                me.fullScreenButton,
                globals.isRTL
                  ? {
                      left: 14,
                    }
                  : {
                      right: 14,
                    },
              ],
              imageWidth: 30,
              imageHeight: 30,
              hitSlop: {
                top: 15,
                left: 15,
                bottom: 15,
                right: 15,
              },
              image: require('./2073'),
              onPress: function () {
                return t.switchScreen(false);
              },
            }),
            n
              ? React.default.createElement(
                  module12.View,
                  {
                    style: [
                      me.videoToolView,
                      globals.isRTL
                        ? {
                            right: 25,
                          }
                        : {
                            left: 25,
                          },
                    ],
                  },
                  o && !s
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_snapshop_button_click',
                        image: require('./2045'),
                        imageWidth: 30,
                        imageHeight: 30,
                        onPress: function () {
                          return t.screenShot();
                        },
                        style: [me.videoToolButton],
                      })
                    : null,
                  this.state.screenRecording || !o || s
                    ? null
                    : React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_recording_botton_click',
                        image: require('./2044'),
                        imageWidth: 30,
                        imageHeight: 30,
                        onPress: function () {
                          return t.screenRecording();
                        },
                        style: [me.videoToolButton],
                      }),
                  this.state.screenRecording && o && !s
                    ? React.default.createElement(module2035.default, {
                        onPress: function () {
                          return t.screenRecording();
                        },
                        style: me.timeButton,
                        stopRecordVideo: function () {
                          return t.stopRecordVideo();
                        },
                      })
                    : null,
                  this.state.calling
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'soundOffButton',
                        image: this.state.robotMic ? require('./2042') : require('./2043'),
                        imageWidth: 30,
                        imageHeight: 30,
                        onPress: function () {
                          return t.soundOff();
                        },
                        style: [me.videoToolButton],
                      })
                    : React.default.createElement(module12.View, {
                        style: {
                          width: 30,
                        },
                      }),
                  this.state.calling && module390.default.isSupportSetVolumeInCall()
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: {
                            width: 30,
                            justifyContent: 'flex-end',
                            flexDirection: 'column-reverse',
                          },
                        },
                        React.default.createElement(module385.PureImageButton, {
                          funcId: 'record_robot_volume_botton_click',
                          image: require('./2041'),
                          imageWidth: 30,
                          imageHeight: 30,
                          onPress: function () {
                            return t.setChatVolume();
                          },
                          style: [me.videoToolButton],
                        }),
                        this.state.showChatVolume
                          ? React.default.createElement(module2037.default, {
                              checkSliderShouldHide: function () {
                                return t.checkSliderShouldHide();
                              },
                              style: {
                                height: 100,
                              },
                            })
                          : null
                      )
                    : React.default.createElement(module12.View, {
                        style: {
                          width: 30,
                        },
                      })
                )
              : null
          );
        },
      },
      {
        key: 'checkSliderShouldHide',
        value: function () {
          this.setState({
            showChatVolume: false,
          });
        },
      },
      {
        key: 'setChatVolume',
        value: function () {
          this.setState({
            showChatVolume: !this.state.showChatVolume,
          });
        },
      },
      {
        key: 'getVolumeChanged',
        value: function (t) {
          if (this.callToastView && this.callToastView.changeVolume) this.callToastView.changeVolume(t);
        },
      },
      {
        key: 'screenShot',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (this.isMonitoring) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(oe.getDiskWritePermission());

                  case 4:
                    if ('yes' == (t = o.sent)) this.checkDiskSize(this.captureCurrent.bind(this));
                    else if ('android' == module12.Platform.OS || 'undecided' == t) this.requestDiskWritePermission();
                    else this.diskWriteSetting();

                  case 6:
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
        key: 'requestDiskWritePermission',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(oe.requestDiskWritePermission());

                  case 2:
                    if ('no' == t.sent && 'android' == module12.Platform.OS) this.diskWriteSetting();

                  case 4:
                  case 'end':
                    return t.stop();
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
        key: 'diskWriteSetting',
        value: function () {
          var t = this;
          this.alert.alert(module500.screen_recording7, module500.screen_recording8, [
            {
              text: module500.localization_strings_Main_MainPage_11,
            },
            {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.goRecordSetting();
              },
            },
          ]);
        },
      },
      {
        key: 'captureCurrent',
        value: function () {
          if (this.videoView)
            this.videoView.captureCurrentFrame(function (t) {
              if (t) globals.showToast(module500.screen_recording4);
              else globals.showToast(module500.screen_recording5);
            });
        },
      },
      {
        key: 'screenRecording',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(oe.getDiskWritePermission());

                  case 2:
                    if ('yes' == (t = n.sent))
                      this.state.screenRecording
                        ? this.alert.alert('', module500.voice_chat_title1, [
                            {
                              text: module500.localization_strings_Main_MainPage_11,
                            },
                            {
                              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                o.stopRecordVideo();
                              },
                            },
                          ])
                        : this.checkDiskSize(this.startRecordVideo.bind(this));
                    else if ('android' == module12.Platform.OS || 'undecided' == t) this.requestDiskWritePermission();
                    else this.diskWriteSetting();

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
        key: 'checkDiskSize',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.t0 = parseInt;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getDiskSize());

                  case 3:
                    if (((o.t1 = o.sent), (o.t2 = o.t0(o.t1)), !(o.t2 > 1024))) {
                      o.next = 9;
                      break;
                    }

                    if (t) t();
                    o.next = 10;
                    break;

                  case 9:
                    this.alert.alert('', module500.screen_recording6, [
                      {
                        text: module500.localization_strings_Main_MainPage_11,
                      },
                      {
                        text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          if (t) t();
                        },
                      },
                    ]);

                  case 10:
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
        key: 'startRecordVideo',
        value: function () {
          var t = this;
          if (this.isMonitoring && this.videoView)
            this.videoView.startRecordVideo(function (o) {
              if (o) {
                module2036.timeTool.startRecordTime();
                t.setState({
                  screenRecording: !t.state.screenRecording,
                });
                globals.showToast(module500.screen_recording1);
              } else globals.showToast(module500.screen_recording2);
            });
        },
      },
      {
        key: 'stopRecordVideo',
        value: function () {
          if (this.state.screenRecording) {
            module387.LogEventStatus('screen_recording_duration', {
              duration: module2036.timeTool.getRecordSpan(),
            });
            module2036.timeTool.cancleRecord();
            this.setState({
              screenRecording: !this.state.screenRecording,
            });
            if (this.videoView)
              this.videoView.stopRecordVideo(function (t) {
                if (t) globals.showToast(module500.screen_recording3);
                else globals.showToast(module500.screen_recording2);
              });
          }
        },
      },
      {
        key: 'endVideoOperation',
        value: function () {
          if (module422.DMM.isTopazSV || module422.DMM.isTanosSV) {
            this.stopRecordVideo();
            this.endCalls();
          }
        },
      },
      {
        key: 'funcMenuDidChange',
        value: function (t) {
          if (0 == t) module387.LogEventCommon('tap_remote_control_tab');
          if (1 == t) module387.LogEventCommon('tap_map_tab');
          if (2 == t) module387.LogEventCommon('tap_voice_tab');
          this.setState({
            portraitTabIndex: t,
          });
        },
      },
      {
        key: 'showNotReadyTip',
        value: function () {
          var t = module500.map_object_app_version_tip;
          if (module393.isRecordSupported() || 1 != module393.iotType) {
            if (module393.isRecordSupported() && 1 == module393.iotType) t = module500.resetting_device_wifi_and_reconnecting;
          } else t = module500.upgrading_the_App_to_the_latest_version;
          if (this.alert)
            this.alert.alert('', t, [
              {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {},
              },
            ]);
        },
      },
      {
        key: 'voiceRecord',
        value: function () {
          if (module393.isRecordSupported() && 2 == module393.iotType) this.recordView.show();
          else this.showNotReadyTip();
        },
      },
      {
        key: 'setInitialChatVolume',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(GetStorageKey(StorageKeys.ChatVolumeValue));

                  case 3:
                    t = o.sent;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module414.default.setVoiceChatVolume(t ? parseInt(t) : 50));

                  case 6:
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('get Volume  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
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
      {
        key: 'callStart',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if ((module390.default.isSupportSetVolumeInCall() && this.setInitialChatVolume(), !module381.RSM.isChargingOnDock())) {
                      o.next = 4;
                      break;
                    }

                    globals.showToast(module500.localization_strings_Common_Constants_8);
                    return o.abrupt('return');

                  case 4:
                    if (module381.RSM.state != module381.RobotState.WASHING_DUSTER) {
                      o.next = 7;
                      break;
                    }

                    globals.showToast(module500.robot_status_washing_duster);
                    return o.abrupt('return');

                  case 7:
                    if (this.isMonitoring) {
                      o.next = 9;
                      break;
                    }

                    return o.abrupt('return');

                  case 9:
                    o.next = 11;
                    return regeneratorRuntime.default.awrap(oe.getRecordPermission());

                  case 11:
                    if ('yes' == (t = o.sent))
                      module381.RSM.state == module381.RobotState.BACK_TO_DOCK || module381.RSM.isCleaning() ? this.checkRobotState() : this.startVoiceChat();
                    else {
                      this.setState({
                        calling: false,
                        robotMic: false,
                      });
                      if ('android' == module12.Platform.OS || 'undecided' == t) this.requestRecordPermission();
                      else this.recordSetting();
                    }

                  case 13:
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
        key: 'checkRobotState',
        value: function () {
          var t = this;
          this.alert.alert('', module500.voice_chat_alert, [
            {
              text: module500.localization_strings_Main_MainPage_11,
              onPress: function () {},
            },
            {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.startVoiceChat();
              },
            },
          ]);
        },
      },
      {
        key: 'startVoiceChat',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      calling: true,
                      robotMic: true,
                    });
                    module2036.timeTool.startTime();
                    if (this.videoView) this.videoView.enableMicrophone(true);
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module414.default.startVoiceChat());

                  case 6:
                    t = o.sent;
                    console.log('result---' + t.result);
                    o.next = 14;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t0 = o.catch(3);
                    console.log('startVoiceChat--error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                    this.cancle();

                  case 14:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 10]],
            Promise
          );
        },
      },
      {
        key: 'recordSetting',
        value: function () {
          var t = this;
          this.alert.alert('', module500.ask_if_go_record_setting, [
            {
              text: module500.localization_strings_Main_MainPage_11,
            },
            {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.goRecordSetting();
              },
            },
          ]);
        },
      },
      {
        key: 'goRecordSetting',
        value: function () {
          oe.goRecordSetting();
        },
      },
      {
        key: 'requestRecordPermission',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(oe.requestRecordPermission());

                  case 2:
                    if ('no' == t.sent && 'android' == module12.Platform.OS) this.recordSetting();

                  case 4:
                  case 'end':
                    return t.stop();
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
        key: 'endCalls',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (
                      (this.setState({
                        showChatVolume: false,
                      }),
                      !this.state.calling)
                    ) {
                      t.next = 13;
                      break;
                    }

                    module387.LogEventStatus('call_duration', {
                      duration: module2036.timeTool.getSpan(),
                    });
                    this.cancle();
                    if (this.videoView) this.videoView.enableMicrophone(false);
                    t.prev = 5;
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module414.default.stopVoiceChat());

                  case 8:
                    t.next = 13;
                    break;

                  case 10:
                    t.prev = 10;
                    t.t0 = t.catch(5);
                    console.error(t.t0);

                  case 13:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[5, 10]],
            Promise
          );
        },
      },
      {
        key: 'cancle',
        value: function () {
          this.setState({
            calling: false,
            robotMic: false,
            showChatTips: false,
          });
          if (this.callToastView) this.callToastView.cancle();
          module2036.timeTool.cancle();
        },
      },
      {
        key: 'soundOff',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!module381.RSM.voiceChat) {
                      t.next = 10;
                      break;
                    }

                    this.setState({
                      robotMic: !this.state.robotMic,
                    });
                    t.prev = 2;
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.enableHomeSecVoice(!this.state.robotMic));

                  case 5:
                    t.next = 10;
                    break;

                  case 7:
                    t.prev = 7;
                    t.t0 = t.catch(2);
                    console.error(t.t0);

                  case 10:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[2, 7]],
            Promise
          );
        },
      },
      {
        key: 'recordToastHide',
        value: function () {
          this.setState({
            shouldShowRecordToast: false,
          });
        },
      },
      {
        key: 'recordToastShow',
        value: function (t) {
          this.setState({
            shouldShowRecordToast: true,
            soundVolume: t,
          });
        },
      },
      {
        key: 'showChatTips',
        value: function () {
          if (!this.state.showChatTips)
            this.setState({
              showChatTips: true,
            });
        },
      },
      {
        key: 'portraitView',
        value: function () {
          var t = this,
            o = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: [
                me.containerPortrait,
                {
                  height: ae() - le,
                },
              ],
            },
            this.getNavbar(true),
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  zIndex: 2,
                  paddingTop: ge,
                  height: fe() + ge,
                  backgroundColor: '#000000',
                },
              },
              this.getVideoView(true),
              this.getPortraitVideoBottomView(),
              this.state.shouldShowTip && this.getTipMask(true, this.state.tip, true),
              this.state.fixedTip && this.getTipMask(false, this.state.fixedTip, true),
              this.getLoadingView(true),
              this.getRetryView(true)
            ),
            React.default.createElement(module2047.FuncTabMenu, {
              style: {
                position: 'absolute',
                width: module12.Dimensions.get('window').width,
                top: fe() + ge,
                zIndex: 2,
              },
              current: this.state.portraitTabIndex,
              didSelectItem: this.funcMenuDidChange.bind(this),
              showNotReadyTip: this.showNotReadyTip.bind(this),
            }),
            this.state.calling && 2 == this.state.portraitTabIndex && this.state.showChatTips
              ? React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      position: 'absolute',
                      top: fe() + ge + 70,
                      alignSelf: 'center',
                      color: o.monitor.tabTitleSelColor,
                      zIndex: 2,
                    },
                  },
                  module500.voice_chat_tips
                )
              : null,
            React.default.createElement(
              module12.View,
              {
                style: [
                  me.portraitContentWrap,
                  {
                    backgroundColor: o.monitor.backgroundColor,
                  },
                  {
                    width: re(),
                    height: ae() - fe() - le - ge - module2047.FuncTabBackgroundHeight + 15,
                  },
                ],
              },
              0 == t.state.portraitTabIndex
                ? t.getRemoteView(true)
                : 1 == t.state.portraitTabIndex
                ? t.getMapGotoView(true)
                : module390.default.isRecordAllowed() && 2 == t.state.portraitTabIndex
                ? module422.DMM.isTopazSV || module422.DMM.isTanosSV
                  ? t.getCallView()
                  : t.getRecordListView()
                : 2 == t.state.portraitTabIndex
                ? null
                : undefined
            ),
            React.default.createElement(module385.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: re(),
                height: ae(),
              },
            }),
            React.default.createElement(module2032.default, {
              ref: function (o) {
                return (t.definitionView = o);
              },
              definitionDidChange: this.definitionDidChange.bind(this),
              height: fe() + 44,
            }),
            this.state.calling && 2 == this.state.portraitTabIndex
              ? React.default.createElement(module2066.default, {
                  ref: function (o) {
                    return (t.callToastView = o);
                  },
                  isLandscape: false,
                  calling: this.state.calling,
                  showChatTips: this.showChatTips.bind(this),
                })
              : null
          );
        },
      },
      {
        key: 'landscapeView',
        value: function () {
          var t = this,
            o = this.state.shouldShowUI,
            n = module381.RSM.state == module381.RobotState.REMOTE;
          return React.default.createElement(
            module12.View,
            {
              style: [
                me.container,
                {
                  height: ae(true),
                },
              ],
            },
            this.getNavbar(),
            this.getVideoView(false),
            this.state.shouldShowTip && this.getTipMask(true, this.state.tip, false),
            this.state.fixedTip && this.getTipMask(false, this.state.fixedTip, false),
            this.getLoadingView(false),
            this.getRetryView(false),
            o &&
              React.default.createElement(module2032.default, {
                ref: function (o) {
                  return (t.definitionView = o);
                },
                definitionDidChange: this.definitionDidChange.bind(this),
              }),
            React.default.createElement(module12.TouchableOpacity, {
              activeOpacity: 1,
              style: [
                me.menuWrap,
                {
                  width: re(true),
                  height: ae(true),
                },
              ],
              onPress: this.toggleUI.bind(this),
            }),
            o &&
              React.default.createElement(module2028.default, {
                style: [me.actionMenu],
                ref: function (o) {
                  return (t.actionMenu = o);
                },
                willRunCmd: this._actionMenuWillRunCmd.bind(this),
                askShouldRunCmd: this._shouldRunCmd.bind(this),
                robotStartMove: this._robotStartMove.bind(this),
                onPressSendVoiceButton: function () {
                  return globals.showToast(module500.the_function_is_not_enabled_tip);
                },
              }),
            o && this.getRemoteView(false),
            this.getMapGotoView(false),
            n && (module381.RSM.bumperMiddle || module381.RSM.obstacleMiddle)
              ? React.default.createElement(module2055.BumperView, {
                  direction: module2055.DirectionMiddle,
                })
              : null,
            n && (module381.RSM.bumperLeft || module381.RSM.obstacleLeft)
              ? React.default.createElement(module2055.BumperView, {
                  direction: module2055.DirectionLeft,
                })
              : null,
            n && (module381.RSM.bumperRight || module381.RSM.obstacleRight)
              ? React.default.createElement(module2055.BumperView, {
                  direction: module2055.DirectionRight,
                })
              : null,
            React.default.createElement(module385.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: re(true),
                height: ae(true),
              },
            }),
            module390.default.isRecordAllowed() && module393.isRecordSupported() && 2 == module393.iotType
              ? React.default.createElement(module2056.default, {
                  ref: function (o) {
                    return (t.recordView = o);
                  },
                  parent: this,
                })
              : null,
            module390.default.isRecordAllowed() && o && !module422.DMM.isTopazSV && !module422.DMM.isTanosSV ? this.getRecordView() : null,
            module390.default.isRecordAllowed() && (module422.DMM.isTopazSV || module422.DMM.isTanosSV) ? this.getCallView(true) : null,
            !this.state.shouldShowRecordToast || module422.DMM.isTopazSV || module422.DMM.isTanosSV
              ? null
              : React.default.createElement(module2062.default, {
                  ref: function (o) {
                    return (t.recordToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: true,
                }),
            this.state.calling
              ? React.default.createElement(module2066.default, {
                  ref: function (o) {
                    return (t.callToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: true,
                })
              : null
          );
        },
      },
      {
        key: 'render',
        value: function () {
          return this.state.isPortrait ? this.portraitView() : this.landscapeView();
        },
      },
    ]);
    return Y;
  })(React.Component);

exports.default = module2041;
module2041.contextType = module515.AppConfigContext;
module2041.navigationOptions = {
  header: null,
};
var me = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 0.3,
  },
  videoBottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    zIndex: 4,
  },
  videoToolView: {
    position: 'absolute',
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    bottom: 10,
    width: 200,
  },
  timeButton: {
    bottom: 5,
  },
  definitionButton: {
    alignSelf: 'center',
    minWidth: 34,
    height: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 2,
  },
  videoToolButton: {
    width: 30,
    height: 30,
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 14,
    width: 30,
    height: 30,
  },
  recordView: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    zIndex: 4,
  },
  callView: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 4,
  },
  containerPortrait: {
    backgroundColor: '#fff',
    marginTop: le,
  },
  loadingView: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  navbar: {
    position: 'absolute',
    height: 44,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 99,
  },
  video: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  menuWrap: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'transparent',
  },
  actionMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 4,
  },
  remoteView: {
    position: 'absolute',
    left: 0,
    bottom: 12,
    width: se,
    height: se + module391.default.iOSAndroidReturn(0, 40),
    zIndex: 4,
  },
  portraitRemoteView: {
    alignSelf: 'center',
    width: de,
    height: de + module391.default.iOSAndroidReturn(0, 40),
  },
  portraitContentWrap: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginHorizontal: 10,
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 30,
    backgroundColor: '#007AFF',
  },
  loadingAnim: {
    width: 300,
    height: 300,
  },
  tip: (function (t) {
    for (var o = 1; o < arguments.length; o++) {
      var s = null != arguments[o] ? arguments[o] : {};
      if (o % 2)
        Y(Object(s), true).forEach(function (o) {
          module50.default(t, o, s[o]);
        });
      else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
      else
        Y(Object(s)).forEach(function (o) {
          Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
        });
    }

    return t;
  })(
    {
      marginHorizontal: 15,
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
    },
    module391.default.textShadow()
  ),
  cross: {
    position: 'absolute',
    width: 50,
    height: 30,
    zIndex: 4,
  },
});
