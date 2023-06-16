var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module377 = require('./377'),
  module1229 = require('./1229'),
  module390 = require('./390'),
  module411 = require('./411'),
  module506 = require('./506'),
  module507 = require('./507'),
  module1367 = require('./1367'),
  module936 = require('./936'),
  module2072 = require('./2072'),
  module2075 = require('./2075'),
  module1909 = require('./1909'),
  module1855 = require('./1855'),
  module383 = require('./383'),
  module1922 = require('./1922'),
  module2076 = require('./2076'),
  module386 = require('./386'),
  module409 = require('./409'),
  module387 = require('./387'),
  module2057 = require('./2057'),
  module415 = require('./415'),
  module1352 = require('./1352'),
  module1376 = require('./1376'),
  module381 = require('./381'),
  module407 = require('./407'),
  module1061 = require('./1061'),
  module1799 = require('./1799');

function j() {
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
  module934 = require('./934'),
  module404 = require('./404').JsExecutor,
  module491 = require('./491'),
  Z = module491.strings,
  q = module12.NativeModules.Orientation;

module1229.MM.createJsExecutor();
module389.fixDeviceScreenHeight();
module389.adjustDefaultFont();
module389.adjustDefaultTextAlign();
module12.AppState.addEventListener('change', function (t) {
  console.log('_handleAppStateChange - ' + t + ' - agreed - ' + module377.RSM.hasAgreedPrivacyPolicy);
  var n = 'inactive' == t || 'background' == t,
    o = 'active' == t;
  if (n) module409.Log.exit(true);
  if (o) module409.Log.enter(true);

  if (module377.RSM.hasAgreedPrivacyPolicy) {
    if (n) {
      module377.RSM.isEnterBackgroundWhenCleaning = module377.RSM.isCleaning() || module377.RSM.isInCleanMopping() || module377.RSM.isPureMopping();
      module1229.MM.stop();
    }

    if (o) {
      module409.Log.log(module409.LogTypes.KeyEvent, 'timers start by AppStateChange - ' + t);
      module1229.MM.lastMapRequestHasHandled = true;
      module1229.MM.start();
    }
  }
});
module404
  .createJsExecutor(require('./2077'))
  .then(function (t) {
    module390.MC.rsaExecutor = t;
  })
  .catch(function (t) {
    console.warn('initially create RSA executor failed');
  });

var X = function () {
  if (module389.isTestModeSupport() && globals.TestModeMenu) globals.TestModeMenu.show();
};

globals.PressTitleAction = X;

globals.dlog = function (...args) {
  (t = console).log.apply(t, ['@dlog', new Date().toLocaleTimeString()].concat(args));
};

globals.console.log = function () {};

globals.console.info = function () {};

var Y = null;

function Q() {
  module409.Log.exit();
  module377.RSM.stop();
  module1229.MM.stop();
  module377.RSM.reset();
  module390.MC.reset();
  module389.closeCurrentPage();
}

var $ = 0,
  ee = module386.default.isTestUploadEn() ? 3 : module415.DMM.agreeProtocolLevel,
  te = (function (t) {
    module7.default(re, t);

    var module404 = re,
      te = j(),
      ne = function () {
        var t,
          n = module11.default(module404);

        if (te) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function re(t) {
      var n;
      module4.default(this, re);
      (n = ne.call(this, t)).state = {
        theme: module389.isDarkMode() ? module507.Themes.dark : module507.Themes.light,
      };
      globals.app = module6.default(n);
      var s = n.props,
        l = null == s ? undefined : s.initialPage;
      globals.lastNavigationChangeTime = new Date();
      globals.initialData = s;
      Y = n.getRootStack(null == l ? undefined : l.name);

      n.themeListener = function (t) {
        var o = t.colorScheme;
        if (o) n.changeTheme(o == module389.Theme.dark ? module507.Themes.dark : module507.Themes.light);
      };

      return n;
    }

    module5.default(re, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.getThemeMode();
          this.destroyed = false;
          this.hasHandledValidConnectEvent = false;
          module383.PluginDidEnter();
          module383.LogEventCommon('enter_plugin');
          module383.LogEventStatus('plugin_info', {
            pluginVersion: module387.default.pluginVersion(),
          });
          this.handleScreen();
          this.handleDyy();
          globals.isNetworkOn = true;
          module2057.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          this.init();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.destroyed = true;
          module2057.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
          if (this.volumeKeyListener) this.volumeKeyListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.specialEventListener) this.specialEventListener.remove();
          module389.removeThemeChangeListener();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            o,
            s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    module409.Log.enter();
                    this.registerStatusListener();
                    this.registerSpecialEvent();
                    this.registerThemeChangeListener();

                    if (module389.isMiApp) {
                      if (!(null == (t = module389.PackageEvent) || null == (o = t.packageDidResume) || null == o.addListener))
                        o.addListener(function () {
                          l.registerThemeChangeListener();
                          l.changeTheme(module389.isDarkMode() ? module507.Themes.dark : module507.Themes.light);
                        });
                      if (!(null == (s = module389.PackageEvent) || null == (c = s.packageWillPause) || null == c.addListener))
                        c.addListener(function () {
                          l.removeThemeChangeListener();
                        });
                    }

                    console.log('DarkMode:' + module389.isDarkMode());

                  case 6:
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
        key: 'registerThemeChangeListener',
        value: function () {
          module389.addThemeChangeListener(this.themeListener);
        },
      },
      {
        key: 'removeThemeChangeListener',
        value: function () {
          module389.removeThemeChangeListener(this.themeListener);
        },
      },
      {
        key: 'registerStatusListener',
        value: function () {
          var t = this;
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (module377.RSM.shouldStopFetchMap()) module1229.MM.stop();
            else module1229.MM.start();

            if (module377.RSM.isValidConnect && !t.hasHandledValidConnectEvent) {
              module1229.MM.start();
              t.startPreloadTasks();
              t.setFDSEndpoint();
              t.setLogLevel(ee);
              t.hasHandledValidConnectEvent = true;
            }
          });
        },
      },
      {
        key: 'getRootStack',
        value: function (t) {
          return module936.createStackNavigator(module1367.routes, {
            initialRouteName: t || 'MainPage',
            navigationOptions: function (n) {
              var o = n.navigation;
              globals.navigation = o;
              return {
                header:
                  o.state.params && o.state.params.header
                    ? o.state.params.header
                    : React.default.createElement(module2072.default, {
                        title: o.state.params ? o.state.params.title : null,
                        subTitle: o.state.params ? o.state.params.subTitle : null,
                        rightItems: o.state.params ? o.state.params.rightItems : [],
                        backgroundColor: o.state.params && o.state.params.navBarBackgroundColor,
                        style: [
                          {
                            position: (o.state.params && o.state.params.navBarPosition) || 'relative',
                          },
                        ],
                        onPressLeft: function () {
                          if (o.state.routeName == (t || 'MainPage')) {
                            if (module1061.default.shared().isDisableBackAndMore) return;
                            Q();
                          } else o.state.params && o.state.params.onPressLeft ? o.state.params.onPressLeft() : o.pop();
                        },
                        onPressTitle:
                          o.state.params && o.state.params.onPressTitle
                            ? function () {
                                X();
                                o.state.params.onPressTitle();
                              }
                            : X,
                        hiddenBottomLine: !!o.state.params && o.state.params.hiddenBottomLine,
                      }),
                gesturesEnabled: !globals.isRTL && (!o.state.params || o.state.params.gesturesEnabled),
                headerTransprent: !!o.state.params && o.state.params.transparent,
              };
            },
            transitionConfig: function () {
              return {
                screenInterpolator: module1367.interpolator,
              };
            },
          });
        },
      },
      {
        key: 'registerSpecialEvent',
        value: function () {
          var t = this;
          this.specialEventListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module411.EventKeys.Error10002) t.handle10002Error();
          });
        },
      },
      {
        key: 'init',
        value: function () {
          this.fetchCountryInfo();
          this.getPhoneTimezone();
          this.getPhoneMcc();
        },
      },
      {
        key: 'exit',
        value: function () {
          Q();
        },
      },
      {
        key: 'handleScreen',
        value: function () {
          if ('android' == module12.Platform.OS) module12.StatusBar.setTranslucent(true);
          if ('ios' == module12.Platform.OS) module12.StatusBar.setBarStyle('dark-content');
          if (q) q.lockToPortrait();
        },
      },
      {
        key: 'handleDyy',
        value: function () {
          if (module389.isTestModeSupport())
            this.volumeKeyListener = module12.DeviceEventEmitter.addListener('volume_key', function (t) {
              console.log('volume_key', t);
              if ('volume_up' == t) module491.changePrevLang();
              if ('volume_down' == t) module491.changeNextLang();
            });
        },
      },
      {
        key: 'changeTheme',
        value: function (t) {
          module12.StatusBar.setBarStyle(t.statusbarStyle);
          this.setState(
            {
              theme: t,
            },
            function () {
              module12.DeviceEventEmitter.emit(module411.NotificationKeys.ThemeDidChange);
            }
          );
        },
      },
      {
        key: 'onNetWorkChange',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this.networkErrorView)
                      this.networkErrorView.setState({
                        shouldShow: !t,
                      });
                    globals.isNetworkOn = t;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module2057.default.getConnectionInfo());

                  case 4:
                    o = s.sent;
                    module409.Log.log(module409.LogTypes.KeyEvent, 'network changed,now is ' + o.type);

                  case 6:
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
        key: 'fetchCountryInfo',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(SmartApi.getCountryCode());

                  case 3:
                    t = c.sent;
                    o = (o = t.countryCode.toLowerCase()).replace('jp', 'ja').replace('kr', 'ko');
                    module377.RSM.countryCode = o;
                    s = (s = t.serverCode || module934.areaServerMap[o].code).replace('eu', 'de');
                    module377.RSM.serverCode = s;
                    module409.Log.log(module409.LogTypes.Home, 'fetchCountryInfo - ' + JSON.stringify(t), module409.InfoColors.Success);
                    this.checkShouldShowAgreementDialog();
                    c.next = 18;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(0);
                    this.fetchCountryInfo();
                    module409.Log.log(module409.LogTypes.Home, 'fetchCountryInfo  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module409.InfoColors.Fail);

                  case 18:
                  case 'end':
                    return c.stop();
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
        key: 'checkShouldShowAgreementDialog',
        value: function () {
          var t, module4, module5;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    t = module377.RSM.serverCode;
                    module4 = '';
                    module5 = '';
                    c.prev = 3;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module389.getValue(module411.StorageKeys.UserSelectedCountryServerCode));

                  case 6:
                    if (((module4 = c.sent), console.log('storedServer GET - ' + JSON.stringify(module4)), module389.isMiApp)) {
                      c.next = 13;
                      break;
                    }

                    c.next = 11;
                    return regeneratorRuntime.default.awrap(module389.getValue(module411.StorageKeys.DeviceActiveTime));

                  case 11:
                    module5 = c.sent;
                    console.log('deviceActiveTime GET - ' + module5);

                  case 13:
                    c.next = 18;
                    break;

                  case 15:
                    c.prev = 15;
                    c.t0 = c.catch(3);
                    console.log('storedServer GET error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 18:
                    if (t != module4 || (!module389.isMiApp && module5 != module389.activeTime)) this.openPrivacyLicense();
                    else this.fetchDeviceLocation();

                  case 19:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[3, 15]],
            Promise
          );
        },
      },
      {
        key: 'startPreloadTasks',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = this;
                    setTimeout(function () {
                      module1855.default.checkSuppliesRedPoint();
                      module1855.default.checkFirmwareRedPoint();
                      module1855.default.checkTimeZoneRedPoint();
                      t.checkFirmwareUpdateAndAlert();
                    }, 2e3);
                    setTimeout(function () {
                      var t, o;
                      return regeneratorRuntime.default.async(
                        function (s) {
                          for (;;)
                            switch ((s.prev = s.next)) {
                              case 0:
                                s.next = 2;
                                return regeneratorRuntime.default.awrap(module1909.default.getInUseSoundPackage());

                              case 2:
                                s.next = 4;
                                return regeneratorRuntime.default.awrap(module1909.default.getListDataFromServer());

                              case 4:
                                t = module1909.default.checkSoundPackageNeedUpgrade();
                                o = t > 0;
                                module377.RSM.soundPackageShouldShowRedDot = o;
                                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                                  name: 'update_sound_package',
                                  value: o,
                                });

                              case 8:
                              case 'end':
                                return s.stop();
                            }
                        },
                        null,
                        null,
                        null,
                        Promise
                      );
                    }, 3e3);

                  case 3:
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
        key: 'openPrivacyLicense',
        value: function () {
          var t,
            o,
            s,
            c = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = module377.RSM.serverCode;
                    o = this.serverCodeToPrivacyName(t);

                    if (module389.isMiApp && module415.DMM.isTopazS) {
                      s = {
                        privacyURL: module1376.default.UserPrivacyProtocol(),
                        agreementURL: module1376.default.UserAgreement(),
                        hideAgreement: false,
                        hideUserExperiencePlan: true,
                      };
                      module389.alertLegalInformationAuthorization(s, function (o) {
                        var s;
                        return regeneratorRuntime.default.async(
                          function (l) {
                            for (;;)
                              switch ((l.prev = l.next)) {
                                case 0:
                                  if ((console.log('isAccept - ' + o), !o)) {
                                    l.next = 16;
                                    break;
                                  }

                                  c.fetchDeviceLocation();
                                  l.prev = 3;
                                  l.next = 6;
                                  return regeneratorRuntime.default.awrap(module389.setValue(module411.StorageKeys.UserSelectedCountryServerCode, t));

                                case 6:
                                  if (((s = l.sent), console.log('storedServer Set - ' + s), module389.isMiApp)) {
                                    l.next = 11;
                                    break;
                                  }

                                  l.next = 11;
                                  return regeneratorRuntime.default.awrap(module389.setValue(module411.StorageKeys.DeviceActiveTime, module389.activeTime + ''));

                                case 11:
                                  l.next = 16;
                                  break;

                                case 13:
                                  l.prev = 13;
                                  l.t0 = l.catch(3);
                                  console.log('storedServer SET  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                                case 16:
                                case 'end':
                                  return l.stop();
                              }
                          },
                          null,
                          null,
                          [[3, 13]],
                          Promise
                        );
                      });
                    } else
                      module389.openPrivacyLicense(
                        Z.localization_strings_Main_Views_AgreementPage_0,
                        module1376.default.UserAgreement(),
                        Z.rubys_main_alert_title_privacy,
                        module1376.default.UserPrivacyProtocol(),
                        function (o) {
                          var s, l;
                          return regeneratorRuntime.default.async(
                            function (u) {
                              for (;;)
                                switch ((u.prev = u.next)) {
                                  case 0:
                                    if ((console.log('isAccept - ' + o), !o)) {
                                      u.next = 16;
                                      break;
                                    }

                                    c.fetchDeviceLocation();
                                    u.prev = 3;
                                    u.next = 6;
                                    return regeneratorRuntime.default.awrap(module389.setValue(module411.StorageKeys.UserSelectedCountryServerCode, t));

                                  case 6:
                                    if (((s = u.sent), console.log('storedServer Set - ' + s), module389.isMiApp)) {
                                      u.next = 11;
                                      break;
                                    }

                                    u.next = 11;
                                    return regeneratorRuntime.default.awrap(module389.setValue(module411.StorageKeys.DeviceActiveTime, module389.activeTime + ''));

                                  case 11:
                                    u.next = 16;
                                    break;

                                  case 13:
                                    u.prev = 13;
                                    u.t0 = u.catch(3);
                                    console.log('storedServer SET  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                                  case 16:
                                    if (module389.isMiApp) {
                                      u.next = 27;
                                      break;
                                    }

                                    u.prev = 17;
                                    u.next = 20;
                                    return regeneratorRuntime.default.awrap(module389.postPrivacyAgreementStatus(module377.RSM.serverCode, o ? 0 : 1));

                                  case 20:
                                    l = u.sent;
                                    console.log('postPrivacyAgreementStatus - ' + l);
                                    u.next = 27;
                                    break;

                                  case 24:
                                    u.prev = 24;
                                    u.t1 = u.catch(17);
                                    console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof u.t1 ? JSON.stringify(u.t1) : u.t1));

                                  case 27:
                                  case 'end':
                                    return u.stop();
                                }
                            },
                            null,
                            null,
                            [
                              [3, 13],
                              [17, 24],
                            ],
                            Promise
                          );
                        }
                      );

                    (function t() {
                      var s;
                      return regeneratorRuntime.default.async(
                        function (c) {
                          for (;;)
                            switch ((c.prev = c.next)) {
                              case 0:
                                c.prev = 0;
                                c.next = 3;
                                return regeneratorRuntime.default.awrap(module407.default.setLogLevel(0, o));

                              case 3:
                                s = c.sent;
                                console.log('setLogLevel before privacy  level : 0 - res: ' + JSON.stringify(s));
                                c.next = 11;
                                break;

                              case 7:
                                c.prev = 7;
                                c.t0 = c.catch(0);
                                if ($ <= 4)
                                  setTimeout(function () {
                                    return regeneratorRuntime.default.async(
                                      function (n) {
                                        for (;;)
                                          switch ((n.prev = n.next)) {
                                            case 0:
                                              $++;
                                              console.log('retry - setLogLevel before privacy -' + $);
                                              t();

                                            case 3:
                                            case 'end':
                                              return n.stop();
                                          }
                                      },
                                      null,
                                      null,
                                      null,
                                      Promise
                                    );
                                  }, 1e3);
                                console.log('setLogLevel before privacy  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                              case 11:
                              case 'end':
                                return c.stop();
                            }
                        },
                        null,
                        null,
                        [[0, 7]],
                        Promise
                      );
                    })();

                  case 5:
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
        key: 'fetchDeviceLocation',
        value: function () {
          var t,
            module4,
            module5,
            c = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = module377.RSM.countryCode;
                    module377.RSM.hasAgreedPrivacyPolicy = true;
                    l.prev = 2;
                    module409.Log.log(module409.LogTypes.Home, 'fetchDeviceLocation  begin');
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.getInitStatus());

                  case 6:
                    module4 = l.sent;
                    module5 = module4.result[0].local_info.location.replace('prc', 'cn');
                    module377.RSM.deviceLocation = module5;
                    module386.default.deviceLocation = module5;
                    module377.RSM.robotFeatures = module4.result[0].feature_info;
                    module386.default.robotFeatures = module4.result[0].feature_info;
                    module377.RSM.FCCState = 1 & module4.result[0].local_info.featureset;
                    module377.RSM.robotNewFeatures = module4.result[0].new_feature_info;
                    module386.default.robotNewFeatures = module4.result[0].new_feature_info;
                    module409.Log.log(module409.LogTypes.Home, 'fetchDeviceLocation - ' + JSON.stringify(module4) + ' -location - ' + module5, module409.InfoColors.Success);
                    this.getSerialNumber();
                    this.autoSyncTimeZone();
                    console.log('' + Number.MAX_SAFE_INTEGER);
                    console.log('newFeature: ' + module386.default.robotNewFeatures);
                    console.log('isSupport: ' + module386.default.isSupportSmartScene());
                    module1799.MapListDataProvider.syncSmartSceneIfNeeded();
                    l.next = 24;
                    return regeneratorRuntime.default.awrap(module1352.ModeDataInstance.getCustomMopList());

                  case 24:
                    l.next = 30;
                    break;

                  case 26:
                    l.prev = 26;
                    l.t0 = l.catch(2);
                    module409.Log.log(module409.LogTypes.Home, 'fetchDeviceLocation  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0), module409.InfoColors.Fail);
                    if (!this.destroyed)
                      setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  o.next = 2;
                                  return regeneratorRuntime.default.awrap(c.fetchDeviceLocation(t));

                                case 2:
                                case 'end':
                                  return o.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      }, 1e3);

                  case 30:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[2, 26]],
            Promise
          );
        },
      },
      {
        key: 'dispatchWithCountryCodeAndDeviceLocation',
        value: function () {
          var t = module377.RSM.countryCode,
            n = module377.RSM.deviceLocation;

          if ('cn' == t && 'cn' != n && 'roborock.vacuum.a19v2' !== module389.deviceModel) {
            this.updateLogConfigAndValidConnectFlag(true);
            return void this.alert.alert(
              '',
              Z.rubys_main_device_location_ziyou_alert,
              [
                {
                  text: Z.localization_strings_Setting_RemoteControlPage_51,
                  onPress: function () {
                    module389.closeCurrentPage();
                    module389.closeCurrentPage();
                    module389.closeCurrentPage();
                  },
                },
              ],
              {
                cancelable: false,
              }
            );
          }

          if ('cn' == t || 'cn' == n) this.startGetStatusOrMap(true);
          else this.startGetStatusOrMap(false);
        },
      },
      {
        key: 'updateLogConfigAndValidConnectFlag',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.ValidConnect, t ? '' : module411.StorageKeys.ValidConnect));

                  case 2:
                    this.setFDSEndpoint(t ? 'de' : '');
                    this.setLogLevel(t ? 1 : 9);

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
        key: 'startGetStatusOrMap',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (
                      (this.getMonitorPrivacyVersionAgreedVersionOnServer(),
                      this.getPhotoPrivacyVersionAgreedVersionOnServer(),
                      this.handleRemoteViewingAlert(),
                      (module415.DMM.isTanosV || module415.DMM.isTanosSV || module415.DMM.isTopazSV) &&
                        (module389.enableAVCall(!module415.DMM.isTanosV), module389.setMaxFramerate(module415.DMM.isTanosV ? 15 : 12)),
                      (s.t0 = !t),
                      s.t0)
                    ) {
                      s.next = 9;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.ValidConnect));

                  case 8:
                    s.t0 = s.sent;

                  case 9:
                    o = s.t0;
                    console.log('isValidConnect - ' + o);

                    if (o) {
                      module377.RSM.start();
                      module1229.MM.start();
                    } else module377.RSM.start();

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
        key: 'getMonitorPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDeviceExtraInfoForKey('RRMonitorPrivacyVersion'));

                  case 3:
                    t = o.sent;
                    console.log('getMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                    module390.MC.MonitorPrivacyVersionAgreedOnServer = t.RRMonitorPrivacyVersion;
                    o.next = 10;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);

                  case 10:
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
        key: 'getPhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = o.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module390.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
                    o.next = 10;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);

                  case 10:
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
        key: 'handleRemoteViewingAlert',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module389.saveDeviceExtraValue('xxxx', 'xxxx'));

                  case 3:
                    if (!(module389.isMiApp || module387.default.isShareUser() || !module415.DMM.isTanosV_CE || module386.default.isVideoMonitorSupported()))
                      this.getRemoteViewingAlertAgreedTimesOnServer();
                    t.next = 8;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);

                  case 8:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: 'getRemoteViewingAlertAgreedTimesOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDeviceExtraInfoForKey('RRVAlertPopTimes'));

                  case 3:
                    t = o.sent;
                    module409.Log.log(module409.LogTypes.Debug, 'getRemoteViewingAlertAgreedTimesOnServer - ' + JSON.stringify(t), module409.InfoColors.Normal);
                    if (t.RRVAlertPopTimes) module390.MC.RemoteViewingAlertAgreedTimesOnServer = t.RRVAlertPopTimes;
                    else module390.MC.RemoteViewingAlertAgreedTimesOnServer = 0;
                    module409.Log.log(
                      module409.LogTypes.Debug,
                      'getRemoteViewingAlertAgreedTimesOnServer - ' + parseInt(module390.MC.RemoteViewingAlertAgreedTimesOnServer),
                      module409.InfoColors.Normal
                    );
                    o.next = 11;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(0);

                  case 11:
                  case 'end':
                    return o.stop();
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
        key: 'autoSyncTimeZone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (((o.prev = 0), module377.RSM.timeZone)) {
                      o.next = 4;
                      break;
                    }

                    o.next = 4;
                    return regeneratorRuntime.default.awrap(this.getPhoneTimezone());

                  case 4:
                    if (0 != this.mcc) {
                      o.next = 7;
                      break;
                    }

                    o.next = 7;
                    return regeneratorRuntime.default.awrap(this.getPhoneMcc());

                  case 7:
                    o.next = 9;
                    return regeneratorRuntime.default.awrap(module407.default.setAppTimezone([module377.RSM.timeZone, this.mcc || 0]));

                  case 9:
                    t = o.sent;
                    console.log('setAppTimezone - ' + JSON.stringify(t) + ' - mcc - ' + this.mcc + ' - timezone - ' + module377.RSM.timeZone);
                    this.dispatchWithCountryCodeAndDeviceLocation();
                    o.next = 18;
                    break;

                  case 14:
                    o.prev = 14;
                    o.t0 = o.catch(0);
                    console.log('setAppTimezone  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                    this.dispatchWithCountryCodeAndDeviceLocation();

                  case 18:
                  case 'end':
                    return o.stop();
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
        key: 'setFDSEndpoint',
        value: function (t) {
          var module4, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (((c.prev = 0), !module377.RSM.isSupportFDSEndPoint())) {
                      c.next = 9;
                      break;
                    }

                    module4 = (module4 = (module4 = module934.areaServerMap[t || module377.RSM.serverCode].host).replace('cdn.', '')).replace('mi-img', 'xiaomi');
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(module407.default.setFDSEndpoint(module4));

                  case 7:
                    s = c.sent;
                    module409.Log.log(module409.LogTypes.Home, 'setFDSEndpoint - ' + JSON.stringify(s), module409.InfoColors.Success);

                  case 9:
                    c.next = 14;
                    break;

                  case 11:
                    c.prev = 11;
                    c.t0 = c.catch(0);
                    module409.Log.log(module409.LogTypes.Home, 'setFDSEndpoint  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module409.InfoColors.Fail);

                  case 14:
                  case 'end':
                    return c.stop();
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
        key: 'serverCodeToPrivacyName',
        value: function (t) {
          return 'cn' == t ? module934.privacyName.PN_CN : 'de' == t ? module934.privacyName.PN_EU : module934.privacyName.PN_GENERAL;
        },
      },
      {
        key: 'getPhoneTimezone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getPhoneTimezone());

                  case 3:
                    t = o.sent;
                    module377.RSM.timeZone = t;
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('getPhoneTimezone  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'getPhoneMcc',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((t.prev = 0), !(module389.apiLevel >= (module389.isMiApp ? 10022 : 10002)))) {
                      t.next = 10;
                      break;
                    }

                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module389.getOperatorsCountryCode());

                  case 5:
                    if (((t.t0 = t.sent), t.t0)) {
                      t.next = 8;
                      break;
                    }

                    t.t0 = 0;

                  case 8:
                    this.mcc = t.t0;
                    console.log('getPhoneMcc - mcc :  ' + this.mcc);

                  case 10:
                    t.next = 14;
                    break;

                  case 12:
                    t.prev = 12;
                    t.t1 = t.catch(0);

                  case 14:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
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
                    return regeneratorRuntime.default.awrap(module407.default.getSerialNumber());

                  case 2:
                    t = s.sent;
                    o = t.result[0].serial_number;
                    module390.MC.serialNumber = o;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                  case 6:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'handle10002Error',
        value: function () {
          this.updateLogConfigAndValidConnectFlag(true);
          module377.RSM.stop();
          module1229.MM.stop();
          if (this.invalidConnectWarningView)
            this.invalidConnectWarningView.setState({
              shouldShow: true,
            });
        },
      },
      {
        key: 'setLogLevel',
        value: function (t) {
          var module4,
            module5,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    module4 = module377.RSM.serverCode;
                    module5 = this.serverCodeToPrivacyName(module4);
                    u.prev = 2;
                    u.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setLogLevel(t, module5));

                  case 5:
                    c = u.sent;
                    $ = 0;
                    console.log('setLogLevel  level : ' + t + ' - res: ' + JSON.stringify(c));
                    u.next = 14;
                    break;

                  case 10:
                    u.prev = 10;
                    u.t0 = u.catch(2);
                    if ($ <= 4)
                      setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  o.next = 2;
                                  return regeneratorRuntime.default.awrap(l.setLogLevel(t));

                                case 2:
                                  $++;
                                  console.log('retry - setLogLevel -' + $);

                                case 4:
                                case 'end':
                                  return o.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      }, 1e3);
                    console.log('setLogLevel  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 14:
                  case 'end':
                    return u.stop();
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
        key: 'checkFirmwareUpdateAndAlert',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((t = module377.RSM.state),
                      (o = module377.RSM.battery),
                      !((t == module377.RobotState.CHARGING && o >= 20) || t == module377.RobotState.FULL_CHARGE) || module387.default.isShareUser() || !module389.isMiApp)
                    ) {
                      c.next = 13;
                      break;
                    }

                    c.prev = 3;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module389.checkFirmwareUpdateAndAlert());

                  case 6:
                    s = c.sent;
                    module409.Log.log(module409.LogTypes.Home, 'checkFirmwareUpdateAndAlert success ' + JSON.stringify(s), module409.InfoColors.Success);
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(3);
                    module409.Log.log(module409.LogTypes.Home, 'checkFirmwareUpdateAndAlert error ' + JSON.stringify(c.t0), module409.InfoColors.Fail);

                  case 13:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            null,
            [[3, 10]],
            Promise
          );
        },
      },
      {
        key: 'getThemeMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasDarkMode));

                  case 2:
                    t = o.sent;
                    globals.app.changeTheme('true' == t ? module507.Themes.dark : this.state.theme);

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
        key: 'getActiveRouteName',
        value: (function (t) {
          function n(n) {
            return t.apply(this, arguments);
          }

          n.toString = function () {
            return t.toString();
          };

          return n;
        })(function (t) {
          if (!t) return null;
          var n = t.routes[t.index];
          return n.routes ? getActiveRouteName(n) : n.routeName;
        }),
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module506.AppConfigContext.Provider,
            {
              value: {
                theme: this.state.theme,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                },
              },
              React.default.createElement(Y, {
                onNavigationStateChange: function (n, o) {
                  var s = t.getActiveRouteName(o),
                    c = t.getActiveRouteName(n);

                  if (((globals.currentPageName = t.getActiveRouteName(o)), c !== s)) {
                    var l = new Date().getTime(),
                      u = (l - globals.lastNavigationChangeTime) ** 0;
                    globals.lastNavigationChangeTime = l;
                    module383.LogEventRecordView(c, s, u, {});
                    console.log('From: ' + c + ' to ' + s + ', DurationMiliSecs: ' + u);
                  }
                },
              }),
              React.default.createElement(module1922.default, {
                ref: function (n) {
                  t.networkErrorView = n;
                },
              }),
              React.default.createElement(module2075.default, {
                ref: function (n) {
                  t.invalidConnectWarningView = n;
                },
              }),
              React.default.createElement(module381.AlertView, {
                ref: function (n) {
                  t.alert = n;
                  globals.Alert = n;
                },
                isModal: 'ios' != module12.Platform.OS,
              }),
              React.default.createElement(module381.Toast, {
                ref: function (t) {
                  globals.Toast = t;

                  globals.showToast = function (t) {
                    if (globals.Toast && globals.Toast.contentView) globals.Toast.contentView.toast(t);
                  };
                },
              }),
              module389.isTestModeSupport() &&
                React.default.createElement(module2076.default, {
                  ref: function (t) {
                    globals.TestModeMenu = t;
                  },
                  onConfirm: this.onTestModeMenuConfirm.bind(this),
                })
            )
          );
        },
      },
      {
        key: 'onTestModeMenuConfirm',
        value: function (t) {
          console.log('onTestModeMenuConfirm', t);
          module491.changeLang(t);
        },
      },
    ]);
    return re;
  })(React.default.Component);

exports.default = te;
console.disableYellowBox = true;
module12.AppRegistry.registerComponent('App', function () {
  return te;
});
