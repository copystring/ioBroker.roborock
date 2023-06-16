require('./2091');

var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2084 = require('./2084'),
  module385 = require('./385'),
  module2088 = require('./2088'),
  module391 = require('./391'),
  module2089 = require('./2089'),
  module381 = require('./381'),
  module419 = require('./419'),
  module1265 = require('./1265'),
  module2103 = require('./2103'),
  module2104 = require('./2104'),
  module390 = require('./390'),
  module394 = require('./394'),
  module417 = require('./417'),
  module2105 = require('./2105'),
  module2111 = require('./2111'),
  module415 = require('./415'),
  module2112 = require('./2112'),
  module2114 = require('./2114'),
  module2113 = require('./2113'),
  module2118 = require('./2118'),
  module2120 = require('./2120'),
  module2122 = require('./2122'),
  module1559 = require('./1559'),
  module1121 = require('./1121'),
  module1976 = require('./1976'),
  module423 = require('./423'),
  module387 = require('./387'),
  module2092 = require('./2092'),
  module515 = require('./515'),
  module1421 = require('./1421'),
  module2093 = require('./2093');

function X(t, o) {
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

function Y() {
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
  module2124 = module393.monitorAllowed() ? require('./2124').default : module12.View,
  module505 = require('./505').strings,
  te = module12.NativeModules.Orientation,
  ie = module12.NativeModules.RRVideoViewManager,
  module1265 = require('./1265'),
  ne = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  re = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  ae = module391.default.scaledPixel(176),
  se = module12.StatusBar.currentHeight || 0,
  le = [module505.monitor_bumper_tip_front, module505.monitor_bumper_tip_left, module505.monitor_bumper_tip_right],
  ue = [module505.monitor_obstacle_tip_front, module505.monitor_obstacle_tip_left, module505.monitor_obstacle_tip_right],
  ce = ne() > 500 ? 414 : ne(),
  de = module391.default.isIphoneX() ? 44 : 0,
  he = module391.default.iOSAndroidReturn(de, 0),
  ge = function () {
    return (281 * (re() - he)) / 768;
  },
  module2128 = (function (t) {
    module7.default(X, t);

    var o = X,
      module50 = Y(),
      N = function () {
        var t,
          s = module11.default(o);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function X(t) {
      var o;
      module4.default(this, X);

      (o = N.call(this, t))._handleAppStateChange = function (t) {
        var n, s;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  if (
                    (o.appStateTimer &&
                      (console.log('appStateTimer \u5feb\u901f\u8fdb\u5165 \u524d\u53f0 \u548c\u540e\u53f0\uff01\uff01'), clearTimeout(o.appStateTimer), (o.appStateTimer = null)),
                    console.log('\u5207\u6362\u524d\u540e\u53f0\u901a\u77e5 --\x3e _handleAppStateChange -- state = ' + t),
                    (n = module391.default.iOSAndroidReturn('background' == t, 'background' == t)),
                    (s = 'active' == t),
                    n && o.stopMonitor(),
                    (u.t0 = n),
                    !u.t0)
                  ) {
                    u.next = 9;
                    break;
                  }

                  u.next = 9;
                  return regeneratorRuntime.default.awrap(module415.default.remoteEnd());

                case 9:
                  if (s && !o.isMonitoring)
                    o.appStateTimer = setTimeout(function () {
                      o.retryTimes = 0;
                      if (!module381.RSM.isChargingOnDock()) o.checkShouldStartWithNetStatus(0, null, module505.video_is_loading);
                      clearTimeout(o.appStateTimer);
                      o.appStateTimer = null;
                    }, 50);

                case 10:
                case 'end':
                  return u.stop();
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
      o.animatedPortraitPopupViewHeight = new module12.Animated.Value(0);
      o.state = {
        currentDefinition: module505.video_definition_normal,
        shouldShowTip: false,
        tip: null,
        fixedTip: null,
        isLoading: false,
        isLoadFailed: false,
        sdkinfoString: null,
        error: null,
        isPortrait: true,
        shouldShowUI: true,
        shouldShowRecordToast: false,
        calling: false,
        soundVolume: 0,
        robotMic: false,
        screenRecording: false,
        showChatVolume: false,
        shouldShowPortaitPopup: false,
        isRemoteActive: false,
      };
      o.remoteRpcSeqnum = 0;
      o.isCelluarAlertShownBeforeMonitoring = false;
      o.isCelluarAlertShownWhenMonitoring = false;
      o.isMonitoring = false;
      o.startMonitorTime = 0;
      return o;
    }

    module5.default(X, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          console.log('MonitorPage --\x3e componentWillMount ' + new Date());
          module1421.default.shared().popGestureEnabled = false;
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
          var t;
          if (!(null == (t = this.remoteView))) t.stop();
          regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module415.default.remoteEnd());

                  case 2:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
          module1976.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.endVideoOperation();
          module417.Log.log(module417.LogTypes.Monitor, 'MonitorPage componentWillUnmount');
          if (this.props.navigation.state.params && this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
          this._isMounted = false;

          if (globals.app.state.theme == module515.Themes.dark) {
            module12.StatusBar.setBarStyle('light-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          } else {
            module12.StatusBar.setBarStyle('dark-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          }

          if (te) te.lockToPortrait();
          if (this.statusListener) this.statusListener.remove();
          if (this.backListener) this.backListener.remove();
          module12.AppState.removeEventListener('change', this._handleAppStateChange);
          if (this.tipTimer) clearInterval(this.tipTimer);
          module393.keepScreenOn(false);
          this.stopMonitor();
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
                    return regeneratorRuntime.default.awrap(module415.default.pause());

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
          var o = Math.ceil((new Date().getTime() - this.startMonitorTime) / 1e3);
          module387.LogEventStatus('video_duration', {
            duration: o,
          });
        },
      },
      {
        key: 'startMonitor',
        value: function (t) {
          var o, n, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!module381.RSM.isChargingOnDock()) {
                      u.next = 2;
                      break;
                    }

                    return u.abrupt('return');

                  case 2:
                    console.log('\u5f53\u524d homeSecClientID = ' + module381.RSM.homeSecClientID + ' \u5f53\u524dappClientID = ' + module393.appClientID);
                    this.loadingTip = t || module505.connecting_video_security_channel;
                    this.setState({
                      isLoading: true,
                      isLoadFailed: false,
                      error: null,
                    });
                    u.prev = 5;
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module415.default.getHomeSecConnectStatus());

                  case 8:
                    o = u.sent;
                    console.log('startMonitor \u65f6 \u4e3b\u52a8\u83b7\u53d6\u7684 camera status = ' + ('object' == typeof o.result ? JSON.stringify(o.result) : o));
                    n = o.result.client_id;
                    module381.RSM.homeSecClientID = n;
                    u.next = 16;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);

                  case 16:
                    if (module381.RSM.isHomeSecDisconnected()) {
                      this.hasCallStart = true;
                      s = {
                        quality: module1265.VideoQuality.SD,
                        password: module394.MC.gesturePassword,
                        client_id: module393.appClientID,
                      };
                      if (module393.monitorAllowed() && this.videoView)
                        this.videoView.startCameraPreview_IoT(s, function (t) {
                          console.log('\u6536\u5230 startPreview \u6210\u529f\u56de\u8c03');
                        });
                    } else if (module381.RSM.isHomeSecRunning())
                      module381.RSM.isHomeSecControlledByCurrentClient()
                        ? (module417.Log.log(
                            module417.LogTypes.Monitor,
                            'do nothing, because current user is already in preview - ' + module381.RSM.homeSecStatus,
                            module417.InfoColors.Fail
                          ),
                          (this.isMonitoring = true),
                          this.setState({
                            shouldShowTip: false,
                            isLoading: false,
                          }))
                        : (module417.Log.log(
                            module417.LogTypes.Monitor,
                            'not start and show retry dialog, because other guy is already in preview - ' + module381.RSM.homeSecStatus,
                            module417.InfoColors.Fail
                          ),
                          this.setState({
                            isLoading: false,
                            isLoadFailed: true,
                            error: module1265.VideoError.Video_StartPreviewFailed_alreadyInPreview,
                          }));
                    else if (module381.RSM.isHomeSecDisconnecting()) {
                      module417.Log.log(module417.LogTypes.Monitor, 'not start and auto retry,because monitor is exiting,not ready');
                      this.setState({
                        isLoading: true,
                        isLoadFailed: false,
                        error: null,
                      });
                      this.checkShouldAutoRetry();
                    }

                  case 17:
                  case 'end':
                    return u.stop();
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
            module417.Log.log(module417.LogTypes.Monitor, 'auto retry exceeded max 8 times,show retry dialog', module417.InfoColors.Fail);
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
          this.statusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.shouldHandleRobotOnOrLeaveDock = t.isLastTimeChargingOnDock != module381.RSM.isChargingOnDock();
            if (t.shouldHandleRobotOnOrLeaveDock) t.handleRobotOnOrLeaveDock(2500);
            if (module381.RSM.bumperLeft) t.showTip(le[module2111.DirectionLeft]);
            if (module381.RSM.bumperRight) t.showTip(le[module2111.DirectionRight]);
            if (module381.RSM.bumperMiddle) t.showTip(le[module2111.DirectionMiddle]);
            if (module381.RSM.obstacleLeft) t.showTip(ue[module2111.DirectionLeft]);
            if (module381.RSM.obstacleRight) t.showTip(ue[module2111.DirectionRight]);
            if (module381.RSM.obstacleMiddle) t.showTip(ue[module2111.DirectionMiddle]);
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
          module1976.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.gotoFailListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.EventToastChange, function (o) {
            if ('target_not_reachable' == o.data) t.showTip(module1559.getToast()[o.data][0]);
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
              module505.monitor_page_video_end,
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
                    return regeneratorRuntime.default.awrap(module1976.default.getConnectionInfo());

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
                    module417.Log.log(module417.LogTypes.Monitor, 'network status changed ' + o + ',isMonitoring ' + this.isMonitoring, module417.InfoColors.Normal);

                    if (n && 'cellular' == o && this.isMonitoring) {
                      this.isCelluarAlertShownWhenMonitoring = true;
                      globals.showToast(module505.use_celluar_for_monitor_tip);
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
                module505.ask_whether_back_to_charge,
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
                            return regeneratorRuntime.default.awrap(module415.default.charge());

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
              fixedTip: n ? module505.video_error116_resolve : module505.monitor_page_robot_on_dock_tip,
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
            u,
            c = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (
                      ((s = function () {
                        setTimeout(function () {
                          return c.startMonitor(n);
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
                    u = h.t0;
                    s();
                    if ('wifi' == u) this.isCelluarAlertShownBeforeMonitoring = false;
                    else {
                      this.isCelluarAlertShownBeforeMonitoring = true;
                      globals.showToast(module505.would_you_like_to_monitor_with_celluar);
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
                pe.mask,
                {
                  top: n ? he : 0,
                  backgroundColor: t ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)',
                  width: ne(!n),
                  height: n ? ge() : re(!n),
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  pe.tip,
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
            n = module505.video_load_failed;
          return this.state.isLoadFailed
            ? React.default.createElement(
                module12.View,
                {
                  style: [
                    pe.mask,
                    {
                      top: t ? he : 0,
                      zIndex: 5,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: ne(!t),
                      height: t ? ge() : re(!t),
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      pe.tip,
                      {
                        fontSize: 16,
                      },
                    ],
                  },
                  n + (this.state.error ? ' (error ' + this.state.error.code + ')' : '')
                ),
                !module423.DMM.isV1 &&
                  this.state.error &&
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        pe.tip,
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
                      (this.errorTime && module417.LogHeper.getTime(this.errorTime))
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
                    title: module505.button_title_retry,
                    style: pe.retryButton,
                    onPress: function () {
                      return o.startMonitor();
                    },
                  }),
                  React.default.createElement(module385.PureButton, {
                    funcId: 'accessibility_guide',
                    textColor: 'white',
                    title: module505.accessibility_guide,
                    style: pe.retryButton,
                    onPress: function () {
                      return o.props.navigation.navigate('MonitorErrorPage', {
                        title: module505.accessibility_guide,
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
                    pe.mask,
                    {
                      top: t ? he : 0,
                      zIndex: 6,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: ne(!t),
                      height: t ? ge() : re(!t),
                    },
                  ],
                },
                React.default.createElement(module12.Image, {
                  style: pe.loadingView,
                  source: require('./2127'),
                }),
                React.default.createElement(
                  module12.Text,
                  module22.default({}, module391.default.getAccessibilityLabel('connecting_video_security_channel'), {
                    style: [
                      pe.tip,
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
            n = ne(!t),
            s = t ? ge() : re(!t),
            l = {
              width: n,
              height: s,
            },
            u = React.default.createElement(module2124, {
              ref: function (t) {
                return (o.videoView = t);
              },
              style: [
                pe.video,
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
            module1849 = React.default.createElement(
              module12.View,
              {
                style: [
                  pe.video,
                  l,
                  {
                    position: t ? 'relative' : 'absolute',
                  },
                ],
              },
              React.default.createElement(module12.Image, {
                source: require('./1849'),
              })
            ),
            h = React.default.createElement(
              module12.View,
              {
                style: {
                  backgroundColor: 'black',
                },
              },
              u
            );
          return module393.monitorAllowed() ? module391.default.iOSAndroidReturn(h, u) : module1849;
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
          if (!(t.code == module1265.VideoError.Video_SendSDKSdpToDeviceFailed_responseTimeout.code && this.isMonitoring))
            t.code == module1265.VideoError.Video_StartPreviewFailed_alreadyInPreview.code &&
            (module417.Log.log(
              module417.LogTypes.Monitor,
              '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef\uff0cerror clientID=' + o + ', current clientID=' + module393.appClientID
            ),
            o && ((module381.RSM.homeSecClientID = o), o == module393.appClientID))
              ? module417.Log.log(
                  module417.LogTypes.Monitor,
                  '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef: \u5176\u5b9e\u8fd8\u662f\u81ea\u5df1\uff0c\u5ffd\u7565\u8fd9\u79cd\u9519\u8bef'
                )
              : (module417.Log.log(module417.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891\u62a5\u9519 \u9519\u8bef\u7801 code=' + t.code),
                this.stopMonitor(),
                (this.error = t),
                (this.errorTime = new Date().getTime()),
                t.code == module1265.VideoError.Video_StartPreviewFailed_unKnownReason.code ||
                t.code == module1265.VideoError.Video_StartPreviewFailed_innerUnknowReason.code ||
                t.code == module1265.VideoError.Video_PreviewTimeout
                  ? (module417.Log.log(module417.LogTypes.Monitor, 'not start and auto retry,because recieve errors which may be retryed to handle,' + t.code),
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
          var t = 'SD' == this.definition ? module505.monitor_video_net_speed_slow_sd + ' ' + this.rate : module505.monitor_video_net_speed_slow_hd;
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
          module417.Log.log(module417.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891 SDK \u9996\u5e27\u6e32\u67d3\u6210\u529f \u901a\u77e5\uff01');
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
          var t;
          if (!(null == this || null == (t = this.definitionView))) t.show();
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
          } else if (this.isMonitoring) this.showTip(module505.robot_communication_exception);
        },
      },
      {
        key: 'portraitDefinitionChange',
        value: function (t) {
          var o, module50, module22, module4, c;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    module50 = module1265.Definitions[t];
                    module22 = module50.command;
                    module4 = module50.title;
                    module387.LogEventCommon('tap_video_quality_' + module22);
                    h.next = 5;
                    return regeneratorRuntime.default.awrap(module415.default.setVideoQuality(module22));

                  case 5:
                    this.setState({
                      currentDefinition: module4,
                    });
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MonitorVideoDefinition, module22));

                  case 9:
                    if ('SD' == module22) module387.LogEventStat(module387.LogEventMap.RealTimeDefinitionLD);
                    if ('HD' == module22) module387.LogEventStat(module387.LogEventMap.RealTimeDefinitionHD);
                    if (!(null == this || null == (o = this.definitionView))) o.hide();
                    h.next = 18;
                    break;

                  case 14:
                    h.prev = 14;
                    h.t0 = h.catch(0);
                    if (!(null == this || null == (c = this.definitionView))) c.hide();
                    if (this.isMonitoring) this.showTip(module505.robot_communication_exception);

                  case 18:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[0, 14]],
            Promise
          );
        },
      },
      {
        key: '_actionMenuWillRunCmd',
        value: function () {
          var t;
          if (!(null == (t = this.remoteView))) t.stopRemoteMove();

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
            clean: module505.monitor_page_whether_stop_current_task + module505.main_page_clean_1,
            charge: module505.monitor_page_whether_stop_current_task + module505.main_page_charge_2,
            remote: module505.localization_strings_abort_current_task_and_start_remote,
            goto: module505.monitor_page_whether_stop_current_task + module505.rubys_main_button_text_goto,
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
              if (te) te.lockToPortrait();
              setTimeout(function () {
                console.log('switchScreen width ' + ne() + ',height ' + re());
                if (ne() > re())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + ne() + ',height ' + re());
                    o.setState({
                      isPortrait: true,
                    });
                  }, 200);
                else
                  o.setState({
                    isPortrait: true,
                  });
                o.state.calling;
              }, 200);
            } else {
              if (te) te.lockToLandscapeLeft();
              setTimeout(function () {
                if (ne() < re())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + ne() + ',height ' + re());
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
          if (module381.RSM.voiceChat) globals.showToast(module505.voice_chat_title2);
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
          return React.default.createElement(module2089.default, {
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
            onPressScreenRecordingButton: this.handleScreenCast.bind(this),
            onPressScreenShotButton: this.screenShot.bind(this),
            stopRecordVideo: this.stopScreenCasting.bind(this),
            currentDefinition: this.state.currentDefinition,
            robotMic: this.state.robotMic,
            screenRecording: this.state.screenRecording,
            calling: this.state.calling,
            ref: function (t) {
              return (o.navbar = t);
            },
            style: [
              pe.navbar,
              {
                backgroundColor: 'transparent',
                top: t ? he + 10 : 10,
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
          var o = this,
            n = {
              left: module1265.AppBarMarginTop + 24,
            },
            l = ae;

          if (!t && module12.Dimensions.get('window').width < 414) {
            l = module391.default.scaledPixel(140);
            module22.default(n, {
              width: l,
              height: l + module391.default.iOSAndroidReturn(0, 40),
              bottom: 10,
            });
          }

          return React.default.createElement(module2105.default, {
            ref: function (t) {
              return (o.remoteView = t);
            },
            seqnum: this.remoteRpcSeqnum,
            isPortrait: t,
            width: t ? ce : l,
            askShouldRunCmd: this._shouldRunCmd.bind(this),
            style: [t ? pe.portraitRemoteView : pe.remoteView, t ? {} : n],
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
          return React.default.createElement(module2104.default, {
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
          return React.default.createElement(module2114.default, {
            style: pe.recordView,
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
          return React.default.createElement(module2113.default, {
            isLandscape: false,
            alertOwner: this,
          });
        },
      },
      {
        key: 'getCallView',
        value: function (t) {
          return React.default.createElement(module2120.default, {
            style: pe.callView,
            isLandscape: t,
            calling: this.state.calling,
            alertOwner: this.props.alertOwner,
            start: this.handleLiveCall.bind(this),
            end: this.endLiveCall.bind(this),
          });
        },
      },
      {
        key: 'getPortraitVideoBottomView',
        value: function () {
          var t = this;
          module381.RSM.isChargingOnDock();
          return React.default.createElement(
            module12.View,
            {
              style: pe.videoBottomView,
            },
            React.default.createElement(module385.PureButton, {
              funcId: 'portraitDefinitionButton',
              title: this.state.currentDefinition,
              textColor: 'white',
              fontSize: 14,
              onPress: this.onPressDefinitionButton.bind(this),
              style: pe.definitionButton,
            }),
            module390.default.isVideoLiveCallSupported() &&
              this.state.calling &&
              React.default.createElement(module385.PureImageButton, {
                funcId: 'soundOffButton',
                image: this.state.robotMic ? require('./2098') : require('./2099'),
                imageWidth: 30,
                imageHeight: 30,
                onPress: function () {
                  return t.soundOff();
                },
                style: pe.videoBottomButton,
              }),
            this.state.calling &&
              module390.default.isSupportSetVolumeInCall() &&
              React.default.createElement(
                module12.View,
                {
                  style: {},
                },
                this.state.showChatVolume &&
                  React.default.createElement(module2093.default, {
                    checkSliderShouldHide: function () {
                      return t.checkSliderShouldHide();
                    },
                    style: {
                      height: 100,
                    },
                  }),
                React.default.createElement(module385.PureImageButton, {
                  funcId: 'record_robot_volume_botton_click',
                  image: require('./2097'),
                  imageWidth: 30,
                  imageHeight: 30,
                  onPress: function () {
                    return t.setChatVolume();
                  },
                  style: pe.videoBottomButton,
                })
              ),
            React.default.createElement(module385.PureImageButton, {
              funcId: 'fullScreenButton',
              imageWidth: 30,
              imageHeight: 30,
              hitSlop: {
                top: 15,
                left: 15,
                bottom: 15,
                right: 15,
              },
              image: require('./2128'),
              onPress: function () {
                return t.switchScreen(false);
              },
              style: pe.videoBottomButton,
            })
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
                    return regeneratorRuntime.default.awrap(ie.getDiskWritePermission());

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
                    return regeneratorRuntime.default.awrap(ie.requestDiskWritePermission());

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
          this.alert.alert(module505.screen_recording7, module505.screen_recording8, [
            {
              text: module505.localization_strings_Main_MainPage_11,
            },
            {
              text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
              if (t) globals.showToast(module505.screen_recording4);
              else globals.showToast(module505.screen_recording5);
            });
        },
      },
      {
        key: 'handleScreenCast',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(ie.getDiskWritePermission());

                  case 2:
                    if ('yes' == (t = o.sent)) this.state.screenRecording ? this.stopScreenCasting(true) : this.checkDiskSize(this.startRecordVideo.bind(this));
                    else if ('android' == module12.Platform.OS || 'undecided' == t) this.requestDiskWritePermission();
                    else this.diskWriteSetting();

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
                    this.alert.alert('', module505.screen_recording6, [
                      {
                        text: module505.localization_strings_Main_MainPage_11,
                      },
                      {
                        text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
                module2092.timeTool.startRecordTime();
                t.setState({
                  screenRecording: !t.state.screenRecording,
                });
                globals.showToast(module505.screen_recording1);
              } else globals.showToast(module505.screen_recording2);
            });
        },
      },
      {
        key: 'stopScreenCasting',
        value: function (t) {
          var o = this,
            n = function () {
              var t;

              if (o.state.screenRecording) {
                module387.LogEventStatus('screen_recording_duration', {
                  duration: module2092.timeTool.getRecordSpan(),
                });
                module2092.timeTool.cancleRecord();
                o.setState({
                  screenRecording: !o.state.screenRecording,
                });
                if (!(null == o || null == (t = o.videoView)))
                  t.stopRecordVideo(function (t) {
                    if (t) globals.showToast(module505.screen_recording3);
                    else globals.showToast(module505.screen_recording2);
                  });
              }
            };

          if (t) n();
          else
            this.alert.alert('', module505.voice_chat_title1, [
              {
                text: module505.localization_strings_Main_MainPage_11,
              },
              {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return n();
                },
              },
            ]);
        },
      },
      {
        key: 'endVideoOperation',
        value: function () {
          if (module390.default.isVideoLiveCallSupported()) {
            this.stopScreenCasting(true);
            this.endLiveCall();
          }
        },
      },
      {
        key: 'handleLiveCall',
        value: function () {
          var t = this;
          if (module381.RSM.isChargingOnDock()) globals.showToast(module505.localization_strings_Common_Constants_8);
          else if (module381.RSM.state != module381.RobotState.WASHING_DUSTER)
            this.isMonitoring
              ? this.state.calling
                ? this.endLiveCall()
                : module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None || module381.RSM.backDockResumeFlag != module381.BackDockResumeFlag.None
                ? this.alert.alert('', module505.voice_chat_alert, [
                    {
                      text: module505.localization_strings_Main_MainPage_11,
                      onPress: function () {},
                    },
                    {
                      text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        return t.startLiveCall();
                      },
                    },
                  ])
                : this.startLiveCall()
              : globals.showToast(module505.video_is_loading);
          else globals.showToast(module505.robot_status_washing_duster);
        },
      },
      {
        key: 'funcMenuDidChange',
        value: function (t) {
          var o = t == module2103.PortraitActionCall;

          if (t == module2103.PortraitActionRemote || o) {
            module387.LogEventCommon(t == module2103.PortraitActionRemote ? 'tap_remote_control_tab' : 'tap_voice_tab');
            if (o && module390.default.isVideoLiveCallSupported()) this.handleLiveCall();
            else this.togglePortaitPopup(t);
          } else if (t == module2103.PortraitActionRecord) this.handleScreenCast();
          else if (t == module2103.PortraitActionShortcut) this.screenShot();
        },
      },
      {
        key: 'showNotReadyTip',
        value: function () {
          var t = module505.map_object_app_version_tip;
          if (module393.isRecordSupported() || 1 != module393.iotType) {
            if (module393.isRecordSupported() && 1 == module393.iotType) t = module505.resetting_device_wifi_and_reconnecting;
          } else t = module505.upgrading_the_App_to_the_latest_version;
          if (this.alert)
            this.alert.alert('', t, [
              {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ChatVolumeValue));

                  case 3:
                    t = o.sent;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module415.default.setVoiceChatVolume(t ? parseInt(t) : 50));

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
        key: 'startLiveCall',
        value: function () {
          var t, o, n, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (module390.default.isSupportSetVolumeInCall()) this.setInitialChatVolume();
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(ie.getRecordPermission());

                  case 3:
                    if ('yes' != (t = u.sent)) {
                      u.next = 40;
                      break;
                    }

                    this.setState({
                      calling: true,
                      robotMic: true,
                    });
                    module2092.timeTool.startTime();
                    if (this.videoView) this.videoView.enableMicrophone(true);
                    u.prev = 8;
                    u.next = 11;
                    return regeneratorRuntime.default.awrap(module415.default.startVoiceChat());

                  case 11:
                    if (
                      ((o = u.sent),
                      console.log('result---' + o.result),
                      module381.RSM.state != module381.RobotState.REMOTE && module381.RSM.state != module381.RobotState.GOTO_TARGET)
                    ) {
                      u.next = 32;
                      break;
                    }

                    if (!module390.default.isSupportRemoteControlInCall()) {
                      u.next = 27;
                      break;
                    }

                    this.setState({
                      robotMic: false,
                    });
                    u.next = 18;
                    return regeneratorRuntime.default.awrap(module415.default.enableHomeSecVoice(false));

                  case 18:
                    u.next = 20;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.LiveCallAutoSoundOffWhenMoving));

                  case 20:
                    if (u.sent) {
                      u.next = 25;
                      break;
                    }

                    if (!(null == this || null == (n = this.alert)))
                      n.customAlert(module505.livecall_autosoundoff_whenmoving_alerttitle, module505.livecall_autosoundoff_whenmoving_alertdesc, null, null, {
                        confirmColor: '#007AFF',
                        shouldShowCancel: false,
                      });
                    u.next = 25;
                    return regeneratorRuntime.default.awrap(
                      module419.SetStorageKey(module419.StorageKeys.LiveCallAutoSoundOffWhenMoving, module419.StorageKeys.LiveCallAutoSoundOffWhenMoving)
                    );

                  case 25:
                    u.next = 32;
                    break;

                  case 27:
                    if (
                      (module381.RSM.state == module381.RobotState.REMOTE && (null == this || null == (s = this.remoteView) || s.stop()),
                      (u.t0 = module381.RSM.state == module381.RobotState.GOTO_TARGET),
                      !u.t0)
                    ) {
                      u.next = 32;
                      break;
                    }

                    u.next = 32;
                    return regeneratorRuntime.default.awrap(module415.default.gotoTargetStop());

                  case 32:
                    u.next = 38;
                    break;

                  case 34:
                    u.prev = 34;
                    u.t1 = u.catch(8);
                    console.log('startVoiceChat--error: ' + ('object' == typeof u.t1 ? JSON.stringify(u.t1) : u.t1));
                    this.cancleLiveCall();

                  case 38:
                    u.next = 42;
                    break;

                  case 40:
                    this.setState({
                      calling: false,
                      robotMic: false,
                    });
                    if ('android' == module12.Platform.OS || 'undecided' == t) this.requestRecordPermission();
                    else this.recordSetting();

                  case 42:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[8, 34]],
            Promise
          );
        },
      },
      {
        key: 'recordSetting',
        value: function () {
          var t = this;
          this.alert.alert('', module505.ask_if_go_record_setting, [
            {
              text: module505.localization_strings_Main_MainPage_11,
            },
            {
              text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
          ie.goRecordSetting();
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
                    return regeneratorRuntime.default.awrap(ie.requestRecordPermission());

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
        key: 'endLiveCall',
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
                      duration: module2092.timeTool.getSpan(),
                    });
                    this.cancleLiveCall();
                    if (this.videoView) this.videoView.enableMicrophone(false);
                    t.prev = 5;
                    t.next = 8;
                    return regeneratorRuntime.default.awrap(module415.default.stopVoiceChat());

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
        key: 'cancleLiveCall',
        value: function () {
          this.setState({
            calling: false,
            robotMic: false,
          });
          if (this.callToastView) this.callToastView.cancle();
          module2092.timeTool.cancle();
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
                    return regeneratorRuntime.default.awrap(module415.default.enableHomeSecVoice(!this.state.robotMic));

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
        key: 'didExceedCallingMaxTime',
        value: function () {
          var t;
          if (!(null == this || null == (t = this.alert)))
            t.customAlert('', module505.voice_chat_tips, null, null, {
              confirmTitle: module505.localization_strings_Main_Error_ErrorDetailPage_3,
            });
        },
      },
      {
        key: 'togglePortaitPopup',
        value: function (t) {
          if (this.state.shouldShowPortaitPopup) this.hidePortraitPopup();
          else this.showPortraitPopup(t);
        },
      },
      {
        key: 'showPortraitPopup',
        value: function (t) {
          var o = this,
            n = t == module2103.PortraitActionRemote;
          this.setState(
            {
              shouldShowPortaitPopup: true,
              isRemoteActive: n,
            },
            function () {
              module12.Animated.spring(o.animatedPortraitPopupViewHeight, {
                toValue: re() - (ge() + se + he + module2103.FuncTabBackgroundHeight - 15),
                duration: 800,
              }).start();
            }
          );
        },
      },
      {
        key: 'hidePortraitPopup',
        value: function () {
          var t = this;
          module12.Animated.timing(this.animatedPortraitPopupViewHeight, {
            toValue: 0,
            duration: 300,
          }).start(function () {
            t.setState({
              shouldShowPortaitPopup: false,
              isRemoteActive: false,
            });
          });
        },
      },
      {
        key: 'portraitView',
        value: function () {
          var t = this,
            o = this.context.theme,
            n = this.state,
            s = n.shouldShowPortaitPopup,
            l = n.screenRecording,
            u = n.calling,
            c = n.isRemoteActive;
          return React.default.createElement(
            module12.View,
            {
              style: [
                pe.containerPortrait,
                {
                  height: re() - se + 3,
                  backgroundColor: o.pageBackgroundColor,
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
                  paddingTop: he,
                  height: ge() + he,
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
            React.default.createElement(module2103.PortraitActionMenu, {
              isRemoteActive: c,
              isScreenCasting: l,
              isLiveCall: u,
              isMonitoring: this.isMonitoring,
              style: {
                position: 'absolute',
                width: module12.Dimensions.get('window').width,
                top: ge() + he,
                zIndex: 2,
              },
              didSelectItem: this.funcMenuDidChange.bind(this),
              showNotReadyTip: this.showNotReadyTip.bind(this),
              stopScreenCast: this.stopScreenCasting.bind(this),
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  pe.portraitContentWrap,
                  {
                    backgroundColor: o.monitor.backgroundColor,
                  },
                  {
                    width: ne(),
                    height: re() - ge() - se - he - module2103.FuncTabBackgroundHeight + 15,
                  },
                ],
              },
              this.getMapGotoView(true),
              s && this.portraitPopupView,
              this.state.calling &&
                React.default.createElement(module2122.default, {
                  ref: function (o) {
                    return (t.callToastView = o);
                  },
                  isLandscape: false,
                  calling: this.state.calling,
                  didExceedCallingMaxTime: this.didExceedCallingMaxTime.bind(this),
                })
            ),
            React.default.createElement(module385.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: ne(),
                height: re(),
              },
            }),
            React.default.createElement(module385.ActionSheetView, {
              ref: function (o) {
                return (t.definitionView = o);
              },
              actions: module1265.Definitions.map(function (t) {
                return t.title;
              }),
              didSelectRow: this.portraitDefinitionChange.bind(this),
              onPressCancel: function () {
                return t.definitionView.hide();
              },
            })
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
                pe.container,
                {
                  height: re(true),
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
              React.default.createElement(module2088.default, {
                ref: function (o) {
                  return (t.definitionView = o);
                },
                definitionDidChange: this.definitionDidChange.bind(this),
              }),
            React.default.createElement(module12.TouchableOpacity, {
              activeOpacity: 1,
              style: [
                pe.menuWrap,
                {
                  width: ne(true),
                  height: re(true),
                },
              ],
              onPress: this.toggleUI.bind(this),
            }),
            o &&
              React.default.createElement(module2084.default, {
                style: [pe.actionMenu],
                ref: function (o) {
                  return (t.actionMenu = o);
                },
                willRunCmd: this._actionMenuWillRunCmd.bind(this),
                askShouldRunCmd: this._shouldRunCmd.bind(this),
                robotStartMove: this._robotStartMove.bind(this),
                onPressSendVoiceButton: function () {
                  return globals.showToast(module505.the_function_is_not_enabled_tip);
                },
              }),
            o && this.getRemoteView(false),
            this.getMapGotoView(false),
            n && (module381.RSM.bumperMiddle || module381.RSM.obstacleMiddle)
              ? React.default.createElement(module2111.BumperView, {
                  direction: module2111.DirectionMiddle,
                })
              : null,
            n && (module381.RSM.bumperLeft || module381.RSM.obstacleLeft)
              ? React.default.createElement(module2111.BumperView, {
                  direction: module2111.DirectionLeft,
                })
              : null,
            n && (module381.RSM.bumperRight || module381.RSM.obstacleRight)
              ? React.default.createElement(module2111.BumperView, {
                  direction: module2111.DirectionRight,
                })
              : null,
            React.default.createElement(module385.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: ne(true),
                height: re(true),
              },
            }),
            module390.default.isRecordAllowed() && module393.isRecordSupported() && 2 == module393.iotType
              ? React.default.createElement(module2112.default, {
                  ref: function (o) {
                    return (t.recordView = o);
                  },
                  parent: this,
                })
              : null,
            module390.default.isRecordAllowed() && o && !module390.default.isVideoLiveCallSupported() ? this.getRecordView() : null,
            module390.default.isRecordAllowed() && module390.default.isVideoLiveCallSupported() ? this.getCallView(true) : null,
            this.state.shouldShowRecordToast && !module390.default.isVideoLiveCallSupported()
              ? React.default.createElement(module2118.default, {
                  ref: function (o) {
                    return (t.recordToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: true,
                })
              : null,
            this.state.calling
              ? React.default.createElement(module2122.default, {
                  ref: function (o) {
                    return (t.callToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: true,
                  didExceedCallingMaxTime: this.didExceedCallingMaxTime.bind(this),
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
      {
        key: 'portraitPopupView',
        get: function () {
          var t = this.context.theme.monitor,
            o = this.state.isRemoteActive || module390.default.isVideoLiveCallSupported() ? this.getRemoteView(true) : this.getRecordListView();
          return React.default.createElement(
            module12.Animated.View,
            {
              style: [
                pe.portraitContentWrap,
                {
                  top: 0,
                  zIndex: 7,
                  width: ne(),
                  backgroundColor: t.backgroundColor,
                  height: this.animatedPortraitPopupViewHeight,
                },
              ],
            },
            o
          );
        },
      },
    ]);
    return X;
  })(React.Component);

exports.default = module2128;
module2128.contextType = module1121.AppConfigContext;
module2128.navigationOptions = {
  header: null,
};
var pe = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 0.3,
    overflow: 'hidden',
  },
  videoBottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: ne(),
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 4,
  },
  videoBottomButton: {
    width: 30,
    height: 30,
  },
  timeButton: {
    bottom: 5,
  },
  definitionButton: {
    minWidth: 40,
    height: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginBottom: 4,
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
    marginTop: se - 3,
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
    width: ae,
    height: ae,
    zIndex: 4,
  },
  portraitRemoteView: {
    alignSelf: 'center',
    width: ce,
    height: ce,
  },
  portraitContentWrap: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
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
        X(Object(s), true).forEach(function (o) {
          module50.default(t, o, s[o]);
        });
      else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
      else
        X(Object(s)).forEach(function (o) {
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
