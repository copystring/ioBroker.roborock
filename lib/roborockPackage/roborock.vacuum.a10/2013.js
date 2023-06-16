require('./925');

require('./2019');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
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
    var n = K(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module2014 = require('./2014'),
  module381 = require('./381'),
  module2018 = require('./2018'),
  module387 = require('./387'),
  module2024 = require('./2024'),
  module377 = require('./377'),
  module411 = require('./411'),
  module934 = require('./934'),
  module2036 = require('./2036'),
  module2037 = require('./2037'),
  module386 = require('./386'),
  module390 = require('./390'),
  module409 = require('./409'),
  module2038 = require('./2038'),
  module2044 = require('./2044'),
  module407 = require('./407'),
  module2045 = require('./2045'),
  module2047 = require('./2047'),
  module2046 = require('./2046'),
  module2051 = require('./2051'),
  module2053 = require('./2053'),
  module2055 = require('./2055'),
  module1360 = require('./1360'),
  module506 = require('./506'),
  module2057 = require('./2057'),
  module415 = require('./415'),
  module383 = require('./383'),
  module2027 = require('./2027'),
  module2026 = require('./2026'),
  module507 = require('./507'),
  module1061 = require('./1061');

function K(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (K = function (t) {
    return t ? n : o;
  })(t);
}

function Q(t, o) {
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

function X() {
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

var module389 = require('./389'),
  module2066 = module389.monitorAllowed() ? require('./2066').default : module12.View,
  module491 = require('./491').strings,
  ee = module12.NativeModules.Orientation,
  te = module12.NativeModules.RRVideoViewManager,
  module934 = require('./934'),
  oe = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  ne = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  re = module387.default.scaledPixel(176),
  ae = module12.StatusBar.currentHeight || 0,
  se = [module491.monitor_bumper_tip_front, module491.monitor_bumper_tip_left, module491.monitor_bumper_tip_right],
  le = [module491.monitor_obstacle_tip_front, module491.monitor_obstacle_tip_left, module491.monitor_obstacle_tip_right],
  ue = oe() > 500 ? 414 : oe(),
  ce = module387.default.isIphoneX() ? 44 : 0,
  de = module387.default.iOSAndroidReturn(ce, 0),
  he = function () {
    return (281 * (ne() - de)) / 768;
  },
  module2032 = (function (t) {
    module7.default(Q, t);

    var module49 = Q,
      module506 = X(),
      K = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function Q(t) {
      var o;
      module4.default(this, Q);
      (o = K.call(this, t)).tipTimer = null;
      o.retryTimes = 0;
      o._isMounted = false;
      o.shouldHandleRobotOnOrLeaveDock = true;
      o.isLastTimeChargingOnDock = module377.RSM.isChargingOnDock();
      o.userClickBackButtonFirst = false;
      o.lastOperationTime = null;
      o.state = {
        currentDefinition: module491.video_definition_normal,
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
      };
      o.remoteRpcSeqnum = 0;
      o.isCelluarAlertShownBeforeMonitoring = false;
      o.isCelluarAlertShownWhenMonitoring = false;
      o.isMonitoring = false;
      return o;
    }

    module5.default(Q, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          console.log('MonitorPage --\x3e componentWillMount ' + new Date());
          module1061.default.shared().popGestureEnabled = false;
          module389.keepScreenOn(true);
          module12.StatusBar.setBarStyle('light-content');
          if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('black', false);
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            if (globals.isNetworkOn) t.back();
            else module389.closeCurrentPage();
            return true;
          });
          module2057.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.endVideoOperation();
          module409.Log.log(module409.LogTypes.Monitor, 'MonitorPage componentWillUnmount');
          if (this.props.navigation.state.params && this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
          this._isMounted = false;

          if (globals.app.state.theme == module507.Themes.dark) {
            module12.StatusBar.setBarStyle('light-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          } else {
            module12.StatusBar.setBarStyle('dark-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('transparent', false);
          }

          if (ee) ee.lockToPortrait();
          if (this.statusListener) this.statusListener.remove();
          if (this.backListener) this.backListener.remove();
          module12.AppState.removeEventListener('change', this._handleAppStateChange);
          if (this.tipTimer) clearInterval(this.tipTimer);
          module389.keepScreenOn(false);
          this.stopMonitor();
          if (this.remoteView) this.remoteView.stop();
          clearInterval(this.checkUIShouldHideTimer);
          regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((t.t0 = module377.RSM.state == module377.RobotState.GOTO_TARGET), !t.t0)) {
                      t.next = 4;
                      break;
                    }

                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.pause());

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
        },
      },
      {
        key: 'startMonitor',
        value: function (t) {
          var n, s, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!module377.RSM.isChargingOnDock()) {
                      u.next = 2;
                      break;
                    }

                    return u.abrupt('return');

                  case 2:
                    console.log('\u5f53\u524d homeSecClientID = ' + module377.RSM.homeSecClientID + ' \u5f53\u524dappClientID = ' + module389.appClientID);
                    this.loadingTip = t || module491.connecting_video_security_channel;
                    this.setState({
                      isLoading: true,
                      isLoadFailed: false,
                      error: null,
                    });
                    u.prev = 5;
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.getHomeSecConnectStatus());

                  case 8:
                    n = u.sent;
                    console.log('startMonitor \u65f6 \u4e3b\u52a8\u83b7\u53d6\u7684 camera status = ' + ('object' == typeof n.result ? JSON.stringify(n.result) : n));
                    s = n.result.client_id;
                    module377.RSM.homeSecClientID = s;
                    u.next = 17;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);
                    module377.RSM.homeSecClientID = 'none';

                  case 17:
                    if (module377.RSM.isHomeSecDisconnected()) {
                      this.hasCallStart = true;
                      l = {
                        quality: module934.VideoQuality.SD,
                        password: module390.MC.gesturePassword,
                        client_id: module389.appClientID,
                      };
                      if (module389.monitorAllowed() && this.videoView)
                        this.videoView.startCameraPreview_IoT(l, function (t) {
                          console.log('\u6536\u5230 startPreview \u6210\u529f\u56de\u8c03');
                        });
                    } else if (module377.RSM.isHomeSecRunning())
                      module377.RSM.isHomeSecControlledByCurrentClient()
                        ? (module409.Log.log(
                            module409.LogTypes.Monitor,
                            'do nothing, because current user is already in preview - ' + module377.RSM.homeSecStatus,
                            module409.InfoColors.Fail
                          ),
                          this.setState({
                            shouldShowTip: false,
                            isLoading: false,
                          }))
                        : (module409.Log.log(
                            module409.LogTypes.Monitor,
                            'not start and show retry dialog, because other guy is already in preview - ' + module377.RSM.homeSecStatus,
                            module409.InfoColors.Fail
                          ),
                          this.setState({
                            isLoading: false,
                            isLoadFailed: true,
                            error: module934.VideoError.Video_StartPreviewFailed_alreadyInPreview,
                          }));
                    else if (module377.RSM.isHomeSecDisconnecting()) {
                      module409.Log.log(module409.LogTypes.Monitor, 'not start and auto retry,because monitor is exiting,not ready');
                      this.setState({
                        isLoading: true,
                        isLoadFailed: false,
                        error: null,
                      });
                      this.checkShouldAutoRetry();
                    }

                  case 18:
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
            module409.Log.log(module409.LogTypes.Monitor, 'auto retry exceeded max 8 times,show retry dialog', module409.InfoColors.Fail);
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
                      module377.RSM.homeSecStatus = module377.RRHomeSecStatus.RRHomeSecStatusDisconnecting;
                      module377.RSM.lockHomeSecStatus();
                      if (module389.monitorAllowed() && this.videoView)
                        this.videoView.stopCameraPreview_IoT({
                          client_id: module389.appClientID,
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 2:
                    t = n.sent;
                    this.firmVersion = t && t.currentVersion;

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
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this._isMounted = true;
          this.getFirmwareVersion();
          this.handleRobotOnOrLeaveDock(0);
          var o = module377.RSM.voiceChat;
          this.statusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.shouldHandleRobotOnOrLeaveDock = t.isLastTimeChargingOnDock != module377.RSM.isChargingOnDock();
            if (t.shouldHandleRobotOnOrLeaveDock) t.handleRobotOnOrLeaveDock(1500);
            if (module377.RSM.bumperLeft) t.showTip(se[module2044.DirectionLeft]);
            if (module377.RSM.bumperRight) t.showTip(se[module2044.DirectionRight]);
            if (module377.RSM.bumperMiddle) t.showTip(se[module2044.DirectionMiddle]);
            if (module377.RSM.obstacleLeft) t.showTip(le[module2044.DirectionLeft]);
            if (module377.RSM.obstacleRight) t.showTip(le[module2044.DirectionRight]);
            if (module377.RSM.obstacleMiddle) t.showTip(le[module2044.DirectionMiddle]);
            if (t.navbar) t.navbar.update();

            if (t.lastState != module377.RSM.state) {
              t.lastState = module377.RSM.state;
              if (t.actionMenu) t.actionMenu.forceUpdate();
            }

            if (module377.RSM.isChargingOnDock() && null != t.state.error)
              t.setState({
                error: null,
              });
            if (o != module377.RSM.voiceChat) (o = module377.RSM.voiceChat) || t.endCalls();
          });
          this.checkUIShouldHideTimer = setInterval(function () {
            if (!t.forceHideUI) {
              var o = new Date().getTime(),
                n = !t.lastOperationTime || (o - t.lastOperationTime) / 1e3 <= 10 || (t.gotoView && t.gotoView.state.isMax) || (t.remoteView && t.remoteView.isTouched);
              if (t.state.shouldShowUI != n)
                t.setState({
                  shouldShowUI: n,
                });
            }
          }, 1e3);
          module12.AppState.addEventListener('change', function (o) {
            t._handleAppStateChange(o);
          });
          module2057.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.gotoFailListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.EventToastChange, function (o) {
            if ('target_not_reachable' == o.data) t.showTip(module1360.getToast()[o.data][0]);
          });
        },
      },
      {
        key: 'getNetworkStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module2057.default.getConnectionInfo());

                  case 3:
                    t = n.sent;
                    return n.abrupt('return', t.type);

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('getNetworkStatus  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));
                    return n.abrupt('return', null);

                  case 11:
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
        key: 'onNetWorkChange',
        value: function (t) {
          var n,
            s = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (t) {
                      l.next = 2;
                      break;
                    }

                    return l.abrupt('return');

                  case 2:
                    if (!this.isCelluarAlertShownBeforeMonitoring) {
                      l.next = 5;
                      break;
                    }

                    this.checkShouldStartWithNetStatus(0);
                    return l.abrupt('return');

                  case 5:
                    l.next = 7;
                    return regeneratorRuntime.default.awrap(this.getNetworkStatus());

                  case 7:
                    n = l.sent;
                    module409.Log.log(module409.LogTypes.Monitor, 'network status changed ' + n + ',isMonitoring ' + this.isMonitoring, module409.InfoColors.Normal);

                    if ('cellular' == n && this.isMonitoring) {
                      this.isCelluarAlertShownWhenMonitoring = true;
                      if (this.alert)
                        this.alert.customAlert(
                          '',
                          module491.use_celluar_for_monitor_tip,
                          function () {
                            s.isCelluarAlertShownWhenMonitoring = false;
                          },
                          function () {
                            return s.backToHome();
                          },
                          {
                            confirmColor: '#007AFF',
                          }
                        );
                      setTimeout(function () {
                        if (s.isCelluarAlertShownWhenMonitoring) s.backToHome();
                      }, 1e4);
                    }

                  case 10:
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
        key: 'backToHome',
        value: function () {
          var t = this;
          if (
            module377.RSM.state == module377.RobotState.PAUSE ||
            module377.RSM.state == module377.RobotState.WAITING ||
            module377.RSM.state == module377.RobotState.SLEEPING ||
            module377.RSM.state == module377.RobotState.REMOTE
          ) {
            if (this.alert)
              this.alert.customAlert(
                '',
                module491.ask_whether_back_to_charge,
                function () {
                  var n;
                  return regeneratorRuntime.default.async(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            module383.LogEventCommon('back_to_charge_confirm');
                            s.prev = 1;
                            s.next = 4;
                            return regeneratorRuntime.default.awrap(module407.default.charge());

                          case 4:
                            n = s.sent;
                            console.log('backToHome  charge ' + JSON.stringify(n) + '}');
                            s.next = 11;
                            break;

                          case 8:
                            s.prev = 8;
                            s.t0 = s.catch(1);
                            console.log('backToHome  charge error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                          case 11:
                            t.props.navigation.popToTop();

                          case 12:
                          case 'end':
                            return s.stop();
                        }
                    },
                    null,
                    null,
                    [[1, 8]],
                    Promise
                  );
                },
                function () {
                  module383.LogEventCommon('back_to_charge_cancel');
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
        key: '_handleAppStateChange',
        value: function (t) {
          var n,
            s,
            l = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      (this.appStateTimer &&
                        (console.log('appStateTimer \u5feb\u901f\u8fdb\u5165 \u524d\u53f0 \u548c\u540e\u53f0\uff01\uff01'),
                        clearTimeout(this.appStateTimer),
                        (this.appStateTimer = null)),
                      console.log('\u5207\u6362\u524d\u540e\u53f0\u901a\u77e5 --\x3e _handleAppStateChange -- state = ' + t),
                      (n = module387.default.iOSAndroidReturn('background' == t, 'background' == t)),
                      (s = 'active' == t),
                      n && this.stopMonitor(),
                      (u.t0 = n),
                      !u.t0)
                    ) {
                      u.next = 9;
                      break;
                    }

                    u.next = 9;
                    return regeneratorRuntime.default.awrap(module407.default.remoteEnd());

                  case 9:
                    if (s && !this.isMonitoring)
                      this.appStateTimer = setTimeout(function () {
                        l.retryTimes = 0;
                        if (!module377.RSM.isChargingOnDock()) l.checkShouldStartWithNetStatus(0, null, module491.video_is_loading);
                        clearTimeout(l.appStateTimer);
                        l.appStateTimer = null;
                      }, 50);

                  case 10:
                  case 'end':
                    return u.stop();
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
        key: 'handleRobotOnOrLeaveDock',
        value: function (t) {
          var o = this;
          this.isLastTimeChargingOnDock = module377.RSM.isChargingOnDock();

          if (module377.RSM.isChargingOnDock()) {
            console.log('handleRobotOnOrLeaveDock ---handleOnDock');
            o.stopMonitor();
            o.setState({
              fixedTip: module491.monitor_page_robot_on_dock_tip,
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
        value: function (t, n, s) {
          var l,
            u,
            c = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (
                      ((l = function () {
                        setTimeout(function () {
                          return c.startMonitor(s);
                        }, t);
                      }),
                      (h.t0 = n),
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
                    if (this.isCelluarAlertShownBeforeMonitoring && 'wifi' == u && this.alert) this.alert.hide();

                    if ('wifi' == u) {
                      l();
                      this.isCelluarAlertShownBeforeMonitoring = false;
                    } else {
                      this.isCelluarAlertShownBeforeMonitoring = true;
                      if (this.alert)
                        this.alert.customAlert(
                          '',
                          module491.would_you_like_to_monitor_with_celluar,
                          function () {
                            return l();
                          },
                          function () {
                            return c.props.navigation.popToTop();
                          },
                          {
                            confirmColor: '#007AFF',
                          }
                        );
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
                ge.mask,
                {
                  top: n ? de : 0,
                  backgroundColor: t ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)',
                  width: oe(!n),
                  height: n ? he() : ne(!n),
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  ge.tip,
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
            n = module491.video_load_failed;
          return this.state.isLoadFailed
            ? React.default.createElement(
                module12.View,
                {
                  style: [
                    ge.mask,
                    {
                      top: t ? de : 0,
                      zIndex: 5,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: oe(!t),
                      height: t ? he() : ne(!t),
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ge.tip,
                      {
                        fontSize: 16,
                      },
                    ],
                  },
                  n + (this.state.error ? ' (error ' + this.state.error.code + ')' : '')
                ),
                !module415.DMM.isV1 &&
                  this.state.error &&
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        ge.tip,
                        {
                          textAlign: 'left',
                          fontSize: 12,
                          marginTop: 5,
                        },
                      ],
                    },
                    this.state.error.resolve +
                      ' \n App Version:' +
                      module389.currentAppVersion() +
                      ',Firmware Versioin:' +
                      this.firmVersion +
                      ',PluginVersion:' +
                      module387.default.pluginVersion() +
                      ',time:' +
                      (this.errorTime && module409.LogHeper.getTime(this.errorTime))
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
                  React.default.createElement(module381.PureButton, {
                    textColor: 'white',
                    title: module491.button_title_retry,
                    style: ge.retryButton,
                    onPress: function () {
                      return o.startMonitor();
                    },
                  }),
                  React.default.createElement(module381.PureButton, {
                    textColor: 'white',
                    title: module491.monitor_error_help_button_title,
                    style: ge.retryButton,
                    onPress: function () {
                      return o.props.navigation.navigate('MonitorErrorPage', {
                        title: module491.monitor_error_help_button_title,
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
                    ge.mask,
                    {
                      top: t ? de : 0,
                      zIndex: 6,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: oe(!t),
                      height: t ? he() : ne(!t),
                    },
                  ],
                },
                React.default.createElement(module12.Image, {
                  style: ge.loadingView,
                  source: require('./2069'),
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ge.tip,
                      {
                        fontSize: 14,
                      },
                    ],
                  },
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
            n = oe(!t),
            s = t ? he() : ne(!t),
            l = {
              width: n,
              height: s,
            },
            u = React.default.createElement(module2066, {
              ref: function (t) {
                return (o.videoView = t);
              },
              style: [
                ge.video,
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
            module2070 = React.default.createElement(
              module12.View,
              {
                style: [
                  ge.video,
                  l,
                  {
                    position: t ? 'relative' : 'absolute',
                  },
                ],
              },
              React.default.createElement(module12.Image, {
                source: require('./2070'),
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
          return module389.monitorAllowed() ? module387.default.iOSAndroidReturn(h, u) : module2070;
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
          if (
            t.code == module934.VideoError.Video_StartPreviewFailed_alreadyInPreview.code &&
            (module409.Log.log(
              module409.LogTypes.Monitor,
              '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef\uff0cerror clientID=' + o + ', current clientID=' + module389.appClientID
            ),
            o && ((module377.RSM.homeSecClientID = o), o == module389.appClientID))
          )
            module409.Log.log(
              module409.LogTypes.Monitor,
              '\u6536\u5230 \u6b63\u5728\u9884\u89c8\u4e2d \u9519\u8bef: \u5176\u5b9e\u8fd8\u662f\u81ea\u5df1\uff0c\u5ffd\u7565\u8fd9\u79cd\u9519\u8bef'
            );
          else {
            module409.Log.log(module409.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891\u62a5\u9519 \u9519\u8bef\u7801 code=' + t.code);
            this.stopMonitor();
            this.error = t;
            this.errorTime = new Date().getTime();

            if (
              t.code == module934.VideoError.Video_StartPreviewFailed_unKnownReason.code ||
              t.code == module934.VideoError.Video_StartPreviewFailed_innerUnknowReason.code ||
              t.code == module934.VideoError.Video_PreviewTimeout
            ) {
              module409.Log.log(module409.LogTypes.Monitor, 'not start and auto retry,because recieve errors which may be retryed to handle,' + t.code);
              this.checkShouldAutoRetry();
            } else
              this.setState({
                isLoading: false,
                isLoadFailed: true,
                error: t,
              });
          }
        },
      },
      {
        key: 'onFrameStuck',
        value: function () {
          var t = 'SD' == this.definition ? module491.monitor_video_net_speed_slow_sd + ' ' + this.rate : module491.monitor_video_net_speed_slow_hd;
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
          module409.Log.log(module409.LogTypes.Monitor, '\u6536\u5230\u89c6\u9891 SDK \u9996\u5e27\u6e32\u67d3\u6210\u529f \u901a\u77e5\uff01');
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
          } else if (this.isMonitoring) this.showTip(module491.robot_communication_exception);
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
            clean: module491.main_page_clean_1,
            charge: module491.main_page_charge_2,
            remote: module491.rebot_action_begin_remote,
            goto: module491.rubys_main_button_text_goto,
          };
          if (this.alert)
            this.alert.customAlert(
              '',
              '' + module491.monitor_page_whether_stop_current_task + n[o],
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
              if (ee) ee.lockToPortrait();
              setTimeout(function () {
                console.log('switchScreen width ' + oe() + ',height ' + ne());
                if (oe() > ne())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + oe() + ',height ' + ne());
                    o.setState({
                      isPortrait: true,
                    });
                  }, 200);
                else
                  o.setState({
                    isPortrait: true,
                  });
              }, 200);
            } else {
              if (ee) ee.lockToLandscapeLeft();
              setTimeout(function () {
                if (oe() < ne())
                  setTimeout(function () {
                    console.log('switchScreen delay width ' + oe() + ',height ' + ne());
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
          console.log('voiceChat - ' + module377.RSM.voiceChat);
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else
            this.props.navigation.navigate('CameraSettingPage', {
              isMonitorPage: true,
            });
        },
      },
      {
        key: 'getNavbar',
        value: function (t) {
          var o = this;
          return React.default.createElement(module2024.default, {
            battery: module377.RSM.battery,
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
            ref: function (t) {
              return (o.navbar = t);
            },
            style: [
              ge.navbar,
              {
                backgroundColor: 'transparent',
                top: t ? de + 10 : 10,
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
          return React.default.createElement(module2038.default, {
            ref: function (t) {
              return (o.remoteView = t);
            },
            seqnum: this.remoteRpcSeqnum,
            isPortrait: t,
            width: t ? ue : re,
            askShouldRunCmd: this._shouldRunCmd.bind(this),
            style: [
              t ? ge.portraitRemoteView : ge.remoteView,
              t
                ? {}
                : {
                    left: module934.AppBarMarginTop + 24,
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
          return React.default.createElement(module2037.default, {
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
          return React.default.createElement(module2047.default, {
            style: ge.recordView,
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
          return React.default.createElement(module2046.default, {
            isLandscape: false,
            alertOwner: this,
          });
        },
      },
      {
        key: 'getCallView',
        value: function (t) {
          return React.default.createElement(module2053.default, {
            style: ge.callView,
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
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: ge.videoBottomView,
            },
            React.default.createElement(module381.PureImageButton, {
              funcId: 'fullScreenButton',
              style: [
                ge.fullScreenButton,
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
              image: require('./2071'),
              onPress: function () {
                return t.switchScreen(false);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  ge.videoToolView,
                  globals.isRTL
                    ? {
                        right: 25,
                      }
                    : {
                        left: 25,
                      },
                ],
              },
              module415.DMM.isTopazSV || module415.DMM.isTanosSV
                ? React.default.createElement(module381.PureButton, {
                    funcId: 'definitionButton',
                    title: this.state.currentDefinition,
                    textColor: 'white',
                    fontSize: 14,
                    onPress: function () {
                      return t.onPressDefinitionButton();
                    },
                    style: [ge.definitionButton],
                  })
                : null,
              module415.DMM.isTopazSV || module415.DMM.isTanosSV
                ? React.default.createElement(module381.PureImageButton, {
                    funcId: 'screenShotButton',
                    image: require('./2034'),
                    imageWidth: 30,
                    imageHeight: 30,
                    onPress: function () {
                      return t.screenShot();
                    },
                    style: [ge.videoToolButton],
                  })
                : null,
              (!module415.DMM.isTopazSV && !module415.DMM.isTanosSV) || this.state.screenRecording
                ? null
                : React.default.createElement(module381.PureImageButton, {
                    funcId: 'screenRecordingButton',
                    image: require('./2033'),
                    imageWidth: 30,
                    imageHeight: 30,
                    onPress: function () {
                      return t.screenRecording();
                    },
                    style: [ge.videoToolButton],
                  }),
              (module415.DMM.isTopazSV || module415.DMM.isTanosSV) && this.state.screenRecording
                ? React.default.createElement(module2026.default, {
                    onPress: function () {
                      return t.screenRecording();
                    },
                    style: ge.timeButton,
                    stopRecordVideo: function () {
                      return t.stopRecordVideo();
                    },
                  })
                : null,
              module415.DMM.isTopazSV || module415.DMM.isTanosSV
                ? React.default.createElement(module381.PureImageButton, {
                    funcId: 'soundOffButton',
                    image: this.state.robotMic ? require('./2031') : require('./2032'),
                    imageWidth: 30,
                    imageHeight: 30,
                    onPress: function () {
                      return t.soundOff();
                    },
                    style: [ge.videoToolButton],
                  })
                : null
            )
          );
        },
      },
      {
        key: 'getVolumeChanged',
        value: function (t) {
          this.setState({
            soundVolume: t,
          });
        },
      },
      {
        key: 'screenShot',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(te.getDiskWritePermission());

                  case 2:
                    if ('yes' == (t = n.sent)) this.checkDiskSize(this.captureCurrent.bind(this));
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
        key: 'requestDiskWritePermission',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(te.requestDiskWritePermission());

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
          this.alert.alert(module491.screen_recording7, module491.screen_recording8, [
            {
              text: module491.localization_strings_Main_MainPage_11,
            },
            {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
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
              if (t) globals.showToast(module491.screen_recording4);
              else globals.showToast(module491.screen_recording5);
            });
        },
      },
      {
        key: 'screenRecording',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(te.getDiskWritePermission());

                  case 2:
                    if ('yes' == (t = s.sent))
                      this.state.screenRecording
                        ? this.alert.alert('', module491.voice_chat_title1, [
                            {
                              text: module491.localization_strings_Main_MainPage_11,
                            },
                            {
                              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                              onPress: function () {
                                n.stopRecordVideo();
                              },
                            },
                          ])
                        : this.checkDiskSize(this.startRecordVideo.bind(this));
                    else if ('android' == module12.Platform.OS || 'undecided' == t) this.requestDiskWritePermission();
                    else this.diskWriteSetting();

                  case 4:
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
        key: 'checkDiskSize',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.t0 = parseInt;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDiskSize());

                  case 3:
                    if (((n.t1 = n.sent), (n.t2 = n.t0(n.t1)), !(n.t2 > 300))) {
                      n.next = 9;
                      break;
                    }

                    if (t) t();
                    n.next = 10;
                    break;

                  case 9:
                    this.alert.alert('', module491.screen_recording6, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          if (t) t();
                        },
                      },
                    ]);

                  case 10:
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
        key: 'startRecordVideo',
        value: function () {
          var t = this;
          if (this.videoView)
            this.videoView.startRecordVideo(function (o) {
              if (o) {
                module2027.timeTool.startRecordTime();
                t.setState({
                  screenRecording: !t.state.screenRecording,
                });
                globals.showToast(module491.screen_recording1);
              } else globals.showToast(module491.screen_recording2);
            });
        },
      },
      {
        key: 'stopRecordVideo',
        value: function () {
          if (this.state.screenRecording) {
            module2027.timeTool.cancleRecord();
            this.setState({
              screenRecording: !this.state.screenRecording,
            });
            if (this.videoView)
              this.videoView.stopRecordVideo(function (t) {
                if (t) globals.showToast(module491.screen_recording3);
                else globals.showToast(module491.screen_recording2);
              });
          }
        },
      },
      {
        key: 'endVideoOperation',
        value: function () {
          if (module415.DMM.isTopazSV || module415.DMM.isTanosSV) {
            this.stopRecordVideo();
            this.endCalls();
          }
        },
      },
      {
        key: 'funcMenuDidChange',
        value: function (t) {
          if (0 == t) module383.LogEventCommon('tap_remote_control_tab');
          if (1 == t) module383.LogEventCommon('tap_map_tab');
          if (2 == t) module383.LogEventCommon('tap_voice_tab');
          this.setState({
            portraitTabIndex: t,
          });
        },
      },
      {
        key: 'showNotReadyTip',
        value: function () {
          var t = module491.map_object_app_version_tip;
          if (module389.isRecordSupported() || 1 != module389.iotType) {
            if (module389.isRecordSupported() && 1 == module389.iotType) t = module491.resetting_device_wifi_and_reconnecting;
          } else t = module491.upgrading_the_App_to_the_latest_version;
          if (this.alert)
            this.alert.alert('', t, [
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {},
              },
            ]);
        },
      },
      {
        key: 'voiceRecord',
        value: function () {
          if (module389.isRecordSupported() && 2 == module389.iotType) this.recordView.show();
          else this.showNotReadyTip();
        },
      },
      {
        key: 'callStart',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(te.getRecordPermission());

                  case 2:
                    if ('yes' != (t = s.sent)) {
                      s.next = 20;
                      break;
                    }

                    this.setState({
                      calling: true,
                      robotMic: true,
                    });
                    module2027.timeTool.startTime();
                    if (this.videoView) this.videoView.enableMicrophone(true);
                    s.prev = 7;
                    s.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.startVoiceChat());

                  case 10:
                    n = s.sent;
                    console.log('result---' + n.result);
                    s.next = 18;
                    break;

                  case 14:
                    s.prev = 14;
                    s.t0 = s.catch(7);
                    console.log('startVoiceChat--error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                    this.cancle();

                  case 18:
                    s.next = 22;
                    break;

                  case 20:
                    this.setState({
                      calling: false,
                      robotMic: false,
                    });
                    if ('android' == module12.Platform.OS || 'undecided' == t) this.requestRecordPermission();
                    else this.recordSetting();

                  case 22:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[7, 14]],
            Promise
          );
        },
      },
      {
        key: 'recordSetting',
        value: function () {
          var t = this;
          this.alert.alert('', module491.ask_if_go_record_setting, [
            {
              text: module491.localization_strings_Main_MainPage_11,
            },
            {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
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
          te.goRecordSetting();
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
                    return regeneratorRuntime.default.awrap(te.requestRecordPermission());

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
                    if (!this.state.calling) {
                      t.next = 11;
                      break;
                    }

                    this.cancle();
                    if (this.videoView) this.videoView.enableMicrophone(false);
                    t.prev = 3;
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.stopVoiceChat());

                  case 6:
                    t.next = 11;
                    break;

                  case 8:
                    t.prev = 8;
                    t.t0 = t.catch(3);
                    console.error(t.t0);

                  case 11:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[3, 8]],
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
          });
          if (this.callToastView) this.callToastView.cancle();
          module2027.timeTool.cancle();
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
                    if (!module377.RSM.voiceChat) {
                      t.next = 10;
                      break;
                    }

                    this.setState({
                      robotMic: !this.state.robotMic,
                    });
                    t.prev = 2;
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.enableHomeSecVoice(!this.state.robotMic));

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
        key: 'portraitView',
        value: function () {
          var t = this,
            o = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: [
                ge.containerPortrait,
                {
                  height: ne() - ae,
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
                  paddingTop: de,
                  height: he() + de,
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
            React.default.createElement(module2036.FuncTabMenu, {
              style: {
                position: 'absolute',
                top: he() + de,
                zIndex: 2,
              },
              current: this.state.portraitTabIndex,
              didSelectItem: this.funcMenuDidChange.bind(this),
              showNotReadyTip: this.showNotReadyTip.bind(this),
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  ge.portraitContentWrap,
                  {
                    backgroundColor: o.monitor.backgroundColor,
                  },
                  {
                    width: oe(),
                    height: ne() - he() - ae - de - module2036.FuncTabBackgroundHeight + 15,
                  },
                ],
              },
              0 == t.state.portraitTabIndex
                ? t.getRemoteView(true)
                : 1 == t.state.portraitTabIndex
                ? t.getMapGotoView(true)
                : module386.default.isRecordAllowed() && 2 == t.state.portraitTabIndex
                ? module415.DMM.isTopazSV || module415.DMM.isTanosSV
                  ? t.getCallView()
                  : t.getRecordListView()
                : 2 == t.state.portraitTabIndex
                ? null
                : undefined
            ),
            React.default.createElement(module381.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: oe(),
                height: ne(),
              },
            }),
            React.default.createElement(module2018.default, {
              ref: function (o) {
                return (t.definitionView = o);
              },
              definitionDidChange: this.definitionDidChange.bind(this),
              height: he() + 44,
            }),
            this.state.calling && 2 == this.state.portraitTabIndex
              ? React.default.createElement(module2055.default, {
                  ref: function (o) {
                    return (t.callToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: false,
                  calling: this.state.calling,
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
            n = module377.RSM.state == module377.RobotState.REMOTE;
          return React.default.createElement(
            module12.View,
            {
              style: [
                ge.container,
                {
                  height: ne(true),
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
              React.default.createElement(module2018.default, {
                ref: function (o) {
                  return (t.definitionView = o);
                },
                definitionDidChange: this.definitionDidChange.bind(this),
              }),
            React.default.createElement(module12.TouchableOpacity, {
              activeOpacity: 1,
              style: [
                ge.menuWrap,
                {
                  width: oe(true),
                  height: ne(true),
                },
              ],
              onPress: this.toggleUI.bind(this),
            }),
            o &&
              React.default.createElement(module2014.default, {
                style: [ge.actionMenu],
                ref: function (o) {
                  return (t.actionMenu = o);
                },
                willRunCmd: this._actionMenuWillRunCmd.bind(this),
                askShouldRunCmd: this._shouldRunCmd.bind(this),
                robotStartMove: this._robotStartMove.bind(this),
                onPressSendVoiceButton: function () {
                  return globals.showToast(module491.the_function_is_not_enabled_tip);
                },
              }),
            o && this.getRemoteView(false),
            this.getMapGotoView(false),
            n && (module377.RSM.bumperMiddle || module377.RSM.obstacleMiddle)
              ? React.default.createElement(module2044.BumperView, {
                  direction: module2044.DirectionMiddle,
                })
              : null,
            n && (module377.RSM.bumperLeft || module377.RSM.obstacleLeft)
              ? React.default.createElement(module2044.BumperView, {
                  direction: module2044.DirectionLeft,
                })
              : null,
            n && (module377.RSM.bumperRight || module377.RSM.obstacleRight)
              ? React.default.createElement(module2044.BumperView, {
                  direction: module2044.DirectionRight,
                })
              : null,
            React.default.createElement(module381.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
              isModal: false,
              hidePopGestureEnabled: false,
              style: {
                width: oe(true),
                height: ne(true),
              },
            }),
            module386.default.isRecordAllowed() && module389.isRecordSupported() && 2 == module389.iotType
              ? React.default.createElement(module2045.default, {
                  ref: function (o) {
                    return (t.recordView = o);
                  },
                  parent: this,
                })
              : null,
            module386.default.isRecordAllowed() && o && !module415.DMM.isTopazSV && !module415.DMM.isTanosSV ? this.getRecordView() : null,
            module386.default.isRecordAllowed() && (module415.DMM.isTopazSV || module415.DMM.isTanosSV) ? this.getCallView(true) : null,
            !this.state.shouldShowRecordToast || module415.DMM.isTopazSV || module415.DMM.isTanosSV
              ? null
              : React.default.createElement(module2051.default, {
                  ref: function (o) {
                    return (t.recordToastView = o);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: true,
                }),
            this.state.calling
              ? React.default.createElement(module2055.default, {
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
    return Q;
  })(React.Component);

exports.default = module2032;
module2032.contextType = module506.AppConfigContext;
module2032.navigationOptions = {
  header: null,
};
var ge = module12.StyleSheet.create({
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
    height: 30,
    bottom: 10,
    width: 240,
  },
  timeButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e22920',
    borderRadius: 3.33,
    height: 20,
    width: 40,
    top: 5,
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
    alignSelf: 'center',
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
    marginTop: ae,
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
    width: re,
    height: re + module387.default.iOSAndroidReturn(0, 40),
    zIndex: 4,
  },
  portraitRemoteView: {
    alignSelf: 'center',
    width: ue,
    height: ue + module387.default.iOSAndroidReturn(0, 40),
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
        Q(Object(s), true).forEach(function (o) {
          module49.default(t, o, s[o]);
        });
      else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
      else
        Q(Object(s)).forEach(function (o) {
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
    module387.default.textShadow()
  ),
  cross: {
    position: 'absolute',
    width: 50,
    height: 30,
    zIndex: 4,
  },
});
