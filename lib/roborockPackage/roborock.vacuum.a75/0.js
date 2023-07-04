var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module13 = require('./13'),
  React = require('react'),
  module381 = require('./381'),
  module415 = require('./415'),
  module394 = require('./394'),
  module420 = require('./420'),
  module1199 = require('./1199'),
  module520 = require('./520'),
  module1645 = require('./1645'),
  module1217 = require('./1217'),
  module1395 = require('./1395'),
  module2237 = require('./2237'),
  module2023 = require('./2023'),
  module1963 = require('./1963'),
  module387 = require('./387'),
  module2038 = require('./2038'),
  module2238 = require('./2238'),
  module390 = require('./390'),
  module418 = require('./418'),
  module391 = require('./391'),
  module2063 = require('./2063'),
  module424 = require('./424'),
  module1654 = require('./1654'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1347 = require('./1347'),
  module389 = require('./389');

function B() {
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

if ('android' === module13.Platform.OS) module13.I18nManager.isRTL = false;
module13.I18nManager.allowRTL(false);
module13.I18nManager.forceRTL(false);

var module393 = require('./393'),
  module1343 = require('./1343'),
  module412 = require('./412').JsExecutor,
  module510 = require('./510'),
  Z = module510.strings,
  q = module13.NativeModules.Orientation,
  module411 = require('./411'),
  Y = module411.entry || 'MainPage';

module415.MM.createJsExecutor();
module393.fixDeviceScreenHeight();
module393.adjustDefaultFont();
module393.adjustDefaultTextAlign();
module13.AppState.addEventListener('change', function (t) {
  console.log('_handleAppStateChange - ' + t + ' - agreed - ' + module381.RSM.hasAgreedPrivacyPolicy);
  var n = 'inactive' == t || 'background' == t,
    o = 'active' == t;
  if (n) module418.Log.exit(true);
  if (o) module418.Log.enter(true);

  if (module381.RSM.hasAgreedPrivacyPolicy) {
    if (n) {
      module381.RSM.stop();
      module381.RSM.isEnterBackgroundWhenCleaning = module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None;
      module415.MM.stop();
    }

    if (o) {
      module418.Log.log(module418.LogTypes.KeyEvent, 'timers start by AppStateChange - ' + t);
      module381.RSM.start();
      module415.MM.lastMapRequestHasHandled = true;
      module415.MM.backToForeground();
    }
  }
});
module412
  .createJsExecutor(require('./2239'))
  .then(function (t) {
    module394.MC.rsaExecutor = t;
    module394.MC.getRsaKey();
  })
  .catch(function (t) {
    console.warn('initially create RSA executor failed');
  });

var Q = function () {
  if (module393.isTestModeSupport() && globals.TestModeMenu) globals.TestModeMenu.show();
};

globals.PressTitleAction = Q;

globals.dlog = function (t) {
  for (var n, o = new Date(), s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), l = 1; l < s; l++) c[l - 1] = arguments[l];

  (n = console).log.apply(n, ['%c ' + o.toLocaleTimeString() + '\u3010' + t + '\u3011', 'background:#222;color:#bada55'].concat(c));
};

globals.console.log = function () {};

globals.console.info = function () {};

globals.console.warn = function () {};

globals.console.debug = function () {};

var $ = null;

function ee() {
  var t, n, o;
  module418.Log.exit();
  module381.RSM.stop();
  module415.MM.stop();
  module381.RSM.reset();
  module394.MC.reset();
  module13.BackHandler.removeEventListener(module13.BackHandler.DEVICE_BACK_EVENT);
  if ('SmartCommandList' == (null == (t = globals) ? undefined : null == (n = t.initialData) ? undefined : null == (o = n.initialPage) ? undefined : o.name))
    null == module393 || null == module393.notifyNativeUpdateSceneDataSource || module393.notifyNativeUpdateSceneDataSource();
  module393.closeCurrentPage();
}

var te = 0,
  ne = module424.DMM.agreeProtocolLevel,
  ae = 'agreed',
  re = 'failed',
  oe = 'pop_dialog_success',
  ie = (function (t) {
    module9.default(se, t);

    var n = se,
      module412 = B(),
      ie = function () {
        var t,
          o = module12.default(n);

        if (module412) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function se(t) {
      var n;
      module6.default(this, se);
      (n = ie.call(this, t)).state = {
        theme: module393.isDarkMode() ? module520.Themes.dark : module520.Themes.light,
      };
      globals.app = module8.default(n);
      var o = n.props,
        c = null == o ? undefined : o.initialPage;
      globals.lastNavigationChangeTime = new Date();
      globals.initialData = o;
      $ = n.getRootStack(null == c ? undefined : c.name);

      n.themeListener = function (t) {
        var o = t.colorScheme;
        if (o) n.changeTheme(o == module393.Theme.dark ? module520.Themes.dark : module520.Themes.light);
      };

      return n;
    }

    module7.default(se, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t, n, o;
          this.getThemeMode();
          this.destroyed = false;
          this.hasHandledValidConnectEvent = false;
          module387.PluginDidEnter();
          module387.LogEventCommon('enter_plugin');
          module387.LogEventStatus('plugin_info', {
            pluginVersion: module391.default.pluginVersion(),
          });
          this.handleScreen();
          this.handleDyy();
          globals.isNetworkOn = true;
          module2063.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          if (!(null == (t = globals) ? undefined : null == (n = t.initialData) ? undefined : null == (o = n.initialPage) ? undefined : o.offLine)) this.init();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          this.destroyed = true;
          module2063.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
          if (this.volumeKeyListener) this.volumeKeyListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.specialEventListener) this.specialEventListener.remove();
          module393.removeThemeChangeListener();
          if (this._cloudPrivacyEvent) this._cloudPrivacyEvent.remove();
          if (!(null == (t = this.dimListener))) t.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    module418.Log.enter();
                    module393.syncTheme(function (t) {
                      return l.changeTheme(module411.darkMode || 'dark' == t ? module520.Themes.dark : module520.Themes.light);
                    });
                    this.registerStatusListener();
                    this.registerSpecialEvent();
                    this.registerThemeChangeListener();

                    if (module393.isMiApp) {
                      if (!(null == (t = module393.PackageEvent) || null == (n = t.packageDidResume) || null == n.addListener))
                        n.addListener(function () {
                          l.registerThemeChangeListener();
                          l.changeTheme(module393.isDarkMode() ? module520.Themes.dark : module520.Themes.light);
                        });
                      if (!(null == (s = module393.PackageEvent) || null == (c = s.packageWillPause) || null == c.addListener))
                        c.addListener(function () {
                          l.removeThemeChangeListener();
                        });
                    }

                    console.log('DarkMode:' + module393.isDarkMode());

                  case 7:
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
        key: 'registerThemeChangeListener',
        value: function () {
          module393.addThemeChangeListener(this.themeListener);
        },
      },
      {
        key: 'removeThemeChangeListener',
        value: function () {
          module393.removeThemeChangeListener(this.themeListener);
        },
      },
      {
        key: 'registerStatusListener',
        value: function () {
          var t = this;
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (module381.RSM.shouldStopFetchMap()) module415.MM.stop();
            else module415.MM.start();

            if (module381.RSM.isValidConnect && !t.hasHandledValidConnectEvent) {
              module415.MM.start();
              t.startPreloadTasks();
              t.setFDSEndpoint();
              t.setLogLevel(ne);
              t.hasHandledValidConnectEvent = true;
            }
          });
          this.dimListener = module13.DeviceEventEmitter.addListener('ScreenHeightUpdate', function () {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'getRootStack',
        value: function (t) {
          return module1217.createStackNavigator(module1645.routes, {
            initialRouteName: t || Y,
            navigationOptions: function (n) {
              var o,
                s,
                c,
                l,
                u,
                f = n.navigation;
              globals.navigation = f;
              return {
                header:
                  f.state.params && f.state.params.header
                    ? f.state.params.header
                    : React.default.createElement(module1395.default, {
                        title: f.state.params ? f.state.params.title : null,
                        subTitle: f.state.params ? f.state.params.subTitle : null,
                        naviBackImage: null == f ? undefined : null == (o = f.state) ? undefined : null == (s = o.params) ? undefined : s.naviBackImage,
                        rightItems: f.state.params ? f.state.params.rightItems : [],
                        backgroundColor: f.state.params && f.state.params.navBarBackgroundColor,
                        style: [
                          {
                            position: (f.state.params && f.state.params.navBarPosition) || 'relative',
                          },
                        ],
                        onPressLeft: function () {
                          if (f.state.routeName == (t || Y)) {
                            if (f.state.params && !f.state.params.onPressLeft) ee();
                          } else if (f.state.params && f.state.params.onPressLeft) f.state.params.onPressLeft();
                          else f.pop();
                        },
                        onPressTitle:
                          f.state.params && f.state.params.onPressTitle
                            ? function () {
                                Q();
                                f.state.params.onPressTitle();
                              }
                            : Q,
                        hiddenBottomLine: !!f.state.params && f.state.params.hiddenBottomLine,
                        isLandscape: null != (c = null == f ? undefined : null == (l = f.state) ? undefined : null == (u = l.params) ? undefined : u.isLandscape) && c,
                      }),
                headerStyle: {
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                },
                gesturesEnabled: !globals.isRTL && (!f.state.params || f.state.params.gesturesEnabled),
                headerTransprent: !!f.state.params && f.state.params.transparent,
              };
            },
            transitionConfig: function () {
              return {
                screenInterpolator: module1645.interpolator,
              };
            },
          });
        },
      },
      {
        key: 'registerSpecialEvent',
        value: function () {
          var t = this;
          this.specialEventListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module420.EventKeys.Error10002) t.handle10002Error();
          });
        },
      },
      {
        key: 'init',
        value: function () {
          var t = this;
          this.fetchCountryInfo();
          this.getPhoneTimezone();
          this.getPhoneMcc();
          module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.exit();
          });
        },
      },
      {
        key: 'exit',
        value: function () {
          ee();
        },
      },
      {
        key: 'handleScreen',
        value: function () {
          if ('android' == module13.Platform.OS) module13.StatusBar.setTranslucent(true);
          if ('ios' == module13.Platform.OS) module13.StatusBar.setBarStyle('dark-content');
          if (q) q.lockToPortrait();
        },
      },
      {
        key: 'handleDyy',
        value: function () {
          if (module393.isTestModeSupport())
            this.volumeKeyListener = module13.DeviceEventEmitter.addListener('volume_key', function (t) {
              console.log('volume_key', t);
              if ('volume_up' == t) module510.changePrevLang();
              if ('volume_down' == t) module510.changeNextLang();
            });
        },
      },
      {
        key: 'changeTheme',
        value: function (t) {
          module13.StatusBar.setBarStyle(t.statusbarStyle);
          this.setState(
            {
              theme: t,
            },
            function () {
              module13.DeviceEventEmitter.emit(module420.NotificationKeys.ThemeDidChange);
            }
          );
        },
      },
      {
        key: 'onNetWorkChange',
        value: function (t) {
          var n;
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
                    return regeneratorRuntime.default.awrap(module2063.default.getConnectionInfo());

                  case 4:
                    n = s.sent;
                    module418.Log.log(module418.LogTypes.KeyEvent, 'network changed,now is ' + n.type);

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
          var t, n, s;
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
                    n = (n = t.countryCode.toLowerCase()).replace('jp', 'ja').replace('kr', 'ko');
                    module381.RSM.countryCode = n;
                    s = (s = t.serverCode || module1343.areaServerMap[n].code).replace('eu', 'de');
                    module381.RSM.serverCode = s;
                    module418.Log.log(module418.LogTypes.Home, 'fetchCountryInfo - ' + JSON.stringify(t), module418.InfoColors.Success);
                    if (module393.isMiApp) this.addMiPrivacyEventListener();
                    else this.checkShouldShowAgreementDialog();
                    c.next = 18;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(0);
                    this.fetchCountryInfo();
                    module418.Log.log(module418.LogTypes.Home, 'fetchCountryInfo  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module418.InfoColors.Fail);

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
        key: 'addMiPrivacyEventListener',
        value: function () {
          var t,
            n,
            o = this;
          this._cloudPrivacyEvent =
            null == (t = module393.PrivacyEvent)
              ? undefined
              : null == (n = t.cloudPrivacyEvent)
              ? undefined
              : null == n.addListener
              ? undefined
              : n.addListener(function (t) {
                  if ((console.log('\u6536\u5230\u4e91\u7aef\u9690\u79c1\u901a\u77e5\u6570\u636e\uff1a' + JSON.stringify(t)), t))
                    switch (t.eventType) {
                      case ae:
                        o.fetchDeviceLocation();
                        break;

                      case oe:
                        break;

                      case re:
                        o.alert.alert(
                          '',
                          Z.privacy_access_failure,
                          [
                            {
                              text: Z.localization_strings_Setting_RemoteControlPage_51,
                              onPress: function () {
                                module393.closeCurrentPage();
                              },
                            },
                          ],
                          {
                            cancelable: false,
                          }
                        );
                    }
                  else console.log('\u6536\u5230\u4e91\u7aef\u9690\u79c1\u901a\u77e5\u6570\u636e\u4e3a\u7a7a');
                });
        },
      },
      {
        key: 'checkShouldShowAgreementDialog',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    t = '';
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module393.getValue(module420.StorageKeys.DeviceActiveTime));

                  case 4:
                    t = n.sent;
                    console.log('deviceActiveTime GET - ' + t);
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(1);
                    console.log('storedServer GET error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 11:
                    if (t != module393.activeTime) this.openPrivacyLicense();
                    else this.fetchDeviceLocation();

                  case 12:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 8]],
            Promise
          );
        },
      },
      {
        key: 'startPreloadTasks',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    t = this;
                    setTimeout(function () {
                      module1963.default.checkSuppliesRedPoint();
                      module1963.default.checkFirmwareRedPoint();
                      module1963.default.checkTimeZoneRedPoint();
                      t.checkFirmwareUpdateAndAlert();
                    }, 2e3);
                    setTimeout(function () {
                      var t, s;
                      return regeneratorRuntime.default.async(
                        function (c) {
                          for (;;)
                            switch ((c.prev = c.next)) {
                              case 0:
                                c.next = 2;
                                return regeneratorRuntime.default.awrap(module2023.default.getInUseSoundPackage());

                              case 2:
                                c.next = 4;
                                return regeneratorRuntime.default.awrap(module2023.default.getListDataFromServer());

                              case 4:
                                t = module2023.default.checkSoundPackageNeedUpgrade();
                                s = t > 0;
                                module381.RSM.soundPackageShouldShowRedDot = s;
                                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
                                  name: 'update_sound_package',
                                  value: s,
                                });
                                c.next = 10;
                                return regeneratorRuntime.default.awrap(n.fixCECarpetMode());

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
                    }, 3e3);

                  case 3:
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
        key: 'fixCECarpetMode',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!((module424.DMM.isUltron || module424.DMM.isUltronSPlus || module424.DMM.isTopazSC) && module390.default.isCE())) {
                      s.next = 10;
                      break;
                    }

                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module416.default.getCarpetCleanMode());

                  case 4:
                    if (((t = s.sent), (n = t.result[0].carpet_clean_mode), (s.t0 = n == module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode), !s.t0)) {
                      s.next = 10;
                      break;
                    }

                    s.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode));

                  case 10:
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
        key: 'openPrivacyLicense',
        value: function () {
          var t,
            n,
            s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module381.RSM.serverCode;
                    n = this.serverCodeToPrivacyName(t);

                    s = function (t) {
                      var n;
                      return regeneratorRuntime.default.async(
                        function (s) {
                          for (;;)
                            switch ((s.prev = s.next)) {
                              case 0:
                                if ((console.log('isAccept - ' + t), !t)) {
                                  s.next = 12;
                                  break;
                                }

                                if ((l.fetchDeviceLocation(), (s.prev = 3), module393.isMiApp)) {
                                  s.next = 7;
                                  break;
                                }

                                s.next = 7;
                                return regeneratorRuntime.default.awrap(module393.setValue(module420.StorageKeys.DeviceActiveTime, module393.activeTime + ''));

                              case 7:
                                s.next = 12;
                                break;

                              case 9:
                                s.prev = 9;
                                s.t0 = s.catch(3);
                                console.log('storedServer SET  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                              case 12:
                                if (module393.isMiApp) {
                                  s.next = 23;
                                  break;
                                }

                                s.prev = 13;
                                s.next = 16;
                                return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatus(module381.RSM.serverCode, t ? 0 : 1));

                              case 16:
                                n = s.sent;
                                console.log('postPrivacyAgreementStatus - ' + n);
                                s.next = 23;
                                break;

                              case 20:
                                s.prev = 20;
                                s.t1 = s.catch(13);
                                console.log('postPrivacyAgreementStatus  error: ' + ('object' == typeof s.t1 ? JSON.stringify(s.t1) : s.t1));

                              case 23:
                              case 'end':
                                return s.stop();
                            }
                        },
                        null,
                        null,
                        [
                          [3, 9],
                          [13, 20],
                        ],
                        Promise
                      );
                    };

                    c = function () {
                      module393.openPrivacyLicense(
                        Z.localization_strings_Main_Views_AgreementPage_0,
                        module1654.default.UserAgreement(),
                        Z.rubys_main_alert_title_privacy,
                        module1654.default.UserPrivacyProtocol(),
                        s
                      );
                    };

                    if (!module393.isMiApp)
                      module393.isSupportNewAgreementAndPolicy()
                        ? (function () {
                            var t, n, l, u, f;
                            return regeneratorRuntime.default.async(
                              function (v) {
                                for (;;)
                                  switch ((v.prev = v.next)) {
                                    case 0:
                                      v.prev = 0;
                                      v.next = 3;
                                      return regeneratorRuntime.default.awrap(module393.agreementAndPolicy());

                                    case 3:
                                      t = v.sent;
                                      console.log('agreementAndPolicyRes - ' + JSON.stringify(t.privacyProtocol));
                                      n = Z.localization_strings_Main_Views_AgreementPage_0;
                                      l = Z.rubys_main_alert_title_privacy;
                                      u = t.userAgreement.langUrl;
                                      f = t.privacyProtocol.langUrl;
                                      module393.openPrivacyLicenseNew(n, u, l, f, s);
                                      v.next = 16;
                                      break;

                                    case 12:
                                      v.prev = 12;
                                      v.t0 = v.catch(0);
                                      c();
                                      console.log('agreementAndPolicyResError - ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0));

                                    case 16:
                                    case 'end':
                                      return v.stop();
                                  }
                              },
                              null,
                              null,
                              [[0, 12]],
                              Promise
                            );
                          })()
                        : c();

                    (function t() {
                      var s;
                      return regeneratorRuntime.default.async(
                        function (c) {
                          for (;;)
                            switch ((c.prev = c.next)) {
                              case 0:
                                c.prev = 0;
                                c.next = 3;
                                return regeneratorRuntime.default.awrap(module416.default.setLogLevel(0, n));

                              case 3:
                                s = c.sent;
                                console.log('setLogLevel before privacy  level : 0 - res: ' + JSON.stringify(s));
                                c.next = 11;
                                break;

                              case 7:
                                c.prev = 7;
                                c.t0 = c.catch(0);
                                if (te <= 4)
                                  setTimeout(function () {
                                    return regeneratorRuntime.default.async(
                                      function (n) {
                                        for (;;)
                                          switch ((n.prev = n.next)) {
                                            case 0:
                                              te++;
                                              console.log('retry - setLogLevel before privacy -' + te);
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

                  case 7:
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
        key: 'fetchDeviceLocation',
        value: function () {
          var t,
            n,
            s,
            c,
            l,
            u,
            f = this;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    t = module381.RSM.countryCode;
                    module381.RSM.hasAgreedPrivacyPolicy = true;
                    v.prev = 2;
                    module418.Log.log(module418.LogTypes.Home, 'fetchDeviceLocation  begin');
                    v.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.getInitStatus());

                  case 6:
                    l = v.sent;
                    u = module411.deviceLocation || l.result[0].local_info.location.replace('prc', 'cn');
                    module381.RSM.deviceLocation = u;
                    module390.default.deviceLocation = u;
                    module381.RSM.robotFeatures = l.result[0].feature_info;
                    module390.default.robotFeatures = l.result[0].feature_info;
                    module381.RSM.FCCState = 1 & l.result[0].local_info.featureset;
                    module381.RSM.robotNewFeatures = l.result[0].new_feature_info;
                    module390.default.robotNewFeatures = l.result[0].new_feature_info;
                    module390.default.newFeatureInfoStr = l.result[0].new_feature_info_str;
                    module418.Log.log(module418.LogTypes.Home, 'fetchDeviceLocation - ' + JSON.stringify(l) + ' -location - ' + u, module418.InfoColors.Success);
                    this.getSerialNumber();
                    this.autoSyncTimeZone();
                    console.log('' + Number.MAX_SAFE_INTEGER);
                    console.log('newFeature: ' + module390.default.robotNewFeatures);
                    console.log('isSupport: ' + module390.default.isSupportSmartScene());
                    if ('SmartCommandList' != (null == (n = globals) ? undefined : null == (s = n.initialData) ? undefined : null == (c = s.initialPage) ? undefined : c.name))
                      module1347.MapListDataProvider.syncSmartSceneIfNeeded();
                    v.next = 29;
                    break;

                  case 25:
                    v.prev = 25;
                    v.t0 = v.catch(2);
                    module418.Log.log(module418.LogTypes.Home, 'fetchDeviceLocation  error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0), module418.InfoColors.Fail);
                    if (!this.destroyed)
                      setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  n.next = 2;
                                  return regeneratorRuntime.default.awrap(f.fetchDeviceLocation(t));

                                case 2:
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

                  case 29:
                  case 'end':
                    return v.stop();
                }
            },
            null,
            this,
            [[2, 25]],
            Promise
          );
        },
      },
      {
        key: 'dispatchWithCountryCodeAndDeviceLocation',
        value: function () {
          var t = module381.RSM.countryCode,
            n = module381.RSM.deviceLocation,
            o = module424.DMM.isV2 || module424.DMM.isV4 || module424.DMM.isV5,
            s = module424.DMM.isTanosSL || module424.DMM.isTanosSC || module424.DMM.isTanosSE || module424.DMM.isTopazSPower,
            c = 'roborock.vacuum.a19v2' == module393.deviceModel || (o && s);

          if ('cn' == t && 'cn' != n && !c) {
            this.updateLogConfigAndValidConnectFlag(true, true);
            return void this.alert.alert(
              '',
              Z.rubys_main_device_location_ziyou_alert,
              [
                {
                  text: Z.localization_strings_Setting_RemoteControlPage_51,
                  onPress: function () {
                    module393.closeCurrentPage();
                    module393.closeCurrentPage();
                    module393.closeCurrentPage();
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
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ValidConnect, t ? '' : module420.StorageKeys.ValidConnect));

                  case 2:
                    this.setFDSEndpoint(t ? 'de' : '');
                    this.setLogLevel(t ? 6 : 9, t ? 3 : null);

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
        key: 'startGetStatusOrMap',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (
                      (this.getMonitorPrivacyVersionAgreedVersionOnServer(),
                      this.getPhotoPrivacyVersionAgreedVersionOnServer(),
                      (module424.DMM.isTanosV || module424.DMM.isTanosSV || module424.DMM.isTopazSV || module424.DMM.isPearlPlus) &&
                        (module393.enableAVCall(!module424.DMM.isTanosV), module393.setMaxFramerate(module424.DMM.isTanosV ? 15 : 12)),
                      (s.t0 = !t),
                      s.t0)
                    ) {
                      s.next = 8;
                      break;
                    }

                    s.next = 7;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ValidConnect));

                  case 7:
                    s.t0 = s.sent;

                  case 8:
                    n = s.t0;
                    console.log('isValidConnect - ' + n);

                    if (n) {
                      module381.RSM.start();
                      module415.MM.start();
                    } else module381.RSM.start();

                  case 11:
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getDeviceExtraInfoForKey('RRMonitorPrivacyVersion'));

                  case 3:
                    t = n.sent;
                    console.log('getMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                    module394.MC.MonitorPrivacyVersionAgreedOnServer = t.RRMonitorPrivacyVersion;
                    n.next = 10;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);

                  case 10:
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
                    return regeneratorRuntime.default.awrap(module393.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = n.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module394.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
                    n.next = 10;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);

                  case 10:
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
        key: 'autoSyncTimeZone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (((n.prev = 0), module381.RSM.timeZone)) {
                      n.next = 4;
                      break;
                    }

                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getPhoneTimezone());

                  case 4:
                    if (0 != this.mcc) {
                      n.next = 7;
                      break;
                    }

                    n.next = 7;
                    return regeneratorRuntime.default.awrap(this.getPhoneMcc());

                  case 7:
                    n.next = 9;
                    return regeneratorRuntime.default.awrap(module416.default.setAppTimezone([module381.RSM.timeZone, this.mcc || 0]));

                  case 9:
                    t = n.sent;
                    console.log('setAppTimezone - ' + JSON.stringify(t) + ' - mcc - ' + this.mcc + ' - timezone - ' + module381.RSM.timeZone);
                    this.dispatchWithCountryCodeAndDeviceLocation();
                    n.next = 18;
                    break;

                  case 14:
                    n.prev = 14;
                    n.t0 = n.catch(0);
                    console.log('setAppTimezone  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));
                    this.dispatchWithCountryCodeAndDeviceLocation();

                  case 18:
                  case 'end':
                    return n.stop();
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
          var n, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (((c.prev = 0), !module381.RSM.isSupportFDSEndPoint())) {
                      c.next = 9;
                      break;
                    }

                    n = (n = (n = module1343.areaServerMap[t || module381.RSM.serverCode].host).replace('cdn.', '')).replace('mi-img', 'xiaomi');
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(module416.default.setFDSEndpoint(n));

                  case 7:
                    s = c.sent;
                    module418.Log.log(module418.LogTypes.Home, 'setFDSEndpoint - ' + JSON.stringify(s), module418.InfoColors.Success);

                  case 9:
                    c.next = 14;
                    break;

                  case 11:
                    c.prev = 11;
                    c.t0 = c.catch(0);
                    module418.Log.log(module418.LogTypes.Home, 'setFDSEndpoint  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module418.InfoColors.Fail);

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
          return 'cn' == t ? module1343.privacyName.PN_CN : 'de' == t ? module1343.privacyName.PN_EU : module1343.privacyName.PN_GENERAL;
        },
      },
      {
        key: 'getPhoneTimezone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

                  case 3:
                    t = n.sent;
                    module381.RSM.timeZone = t;
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('getPhoneTimezone  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

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
        key: 'getPhoneMcc',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((t.prev = 0), !(module393.apiLevel >= (module393.isMiApp ? 10022 : 10002)))) {
                      t.next = 10;
                      break;
                    }

                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module393.getOperatorsCountryCode());

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
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                  case 2:
                    t = s.sent;
                    if ('' == (n = t.result[0].serial_number) || n.length < 1) n = ' ';
                    module394.MC.serialNumber = n;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                  case 7:
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
          module381.RSM.stop();
          module415.MM.stop();
          if (this.invalidConnectWarningView)
            this.invalidConnectWarningView.setState({
              shouldShow: true,
            });
        },
      },
      {
        key: 'setLogLevel',
        value: function (t, n) {
          var module6,
            module7,
            l,
            u = this;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    module6 = module381.RSM.serverCode;
                    module7 = this.serverCodeToPrivacyName(module6);
                    f.prev = 2;
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.setLogLevel(t, n || module7));

                  case 5:
                    l = f.sent;
                    te = 0;
                    console.log('setLogLevel  level : ' + t + ' - res: ' + JSON.stringify(l));
                    f.next = 14;
                    break;

                  case 10:
                    f.prev = 10;
                    f.t0 = f.catch(2);
                    if (te <= 4)
                      setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  n.next = 2;
                                  return regeneratorRuntime.default.awrap(u.setLogLevel(t));

                                case 2:
                                  te++;
                                  console.log('retry - setLogLevel -' + te);

                                case 4:
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
                    console.log('setLogLevel  error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0));

                  case 14:
                  case 'end':
                    return f.stop();
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
          var t, n, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((t = module381.RSM.state),
                      (n = module381.RSM.battery),
                      !((t == module381.RobotState.CHARGING && n >= 20) || t == module381.RobotState.FULL_CHARGE) || module391.default.isShareUser() || !module393.isMiApp)
                    ) {
                      c.next = 13;
                      break;
                    }

                    c.prev = 3;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module393.checkFirmwareUpdateAndAlert());

                  case 6:
                    s = c.sent;
                    module418.Log.log(module418.LogTypes.Home, 'checkFirmwareUpdateAndAlert success ' + JSON.stringify(s), module418.InfoColors.Success);
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(3);
                    module418.Log.log(module418.LogTypes.Home, 'checkFirmwareUpdateAndAlert error ' + JSON.stringify(c.t0), module418.InfoColors.Fail);

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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.HasDarkMode));

                  case 2:
                    t = n.sent;
                    globals.app.changeTheme('true' == t ? module520.Themes.dark : this.state.theme);

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
            module1199.AppConfigContext.Provider,
            {
              value: {
                theme: this.state.theme,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  flex: 1,
                },
              },
              React.default.createElement($, {
                onNavigationStateChange: function (n, o) {
                  var s = t.getActiveRouteName(o),
                    c = t.getActiveRouteName(n);

                  if (((globals.currentPageName = t.getActiveRouteName(o)), c !== s)) {
                    var l = new Date().getTime(),
                      u = (l - globals.lastNavigationChangeTime) ** 0;
                    globals.lastNavigationChangeTime = l;
                    module387.LogEventRecordView(c, s, u, {});
                    console.log('From: ' + c + ' to ' + s + ', DurationMiliSecs: ' + u);
                  }
                },
              }),
              React.default.createElement(module2038.default, {
                ref: function (n) {
                  t.networkErrorView = n;
                },
              }),
              React.default.createElement(module2237.default, {
                ref: function (n) {
                  t.invalidConnectWarningView = n;
                },
              }),
              React.default.createElement(module385.AlertView, {
                ref: function (n) {
                  t.alert = n;
                  globals.Alert = n;
                },
                isModal: 'ios' != module13.Platform.OS,
              }),
              React.default.createElement(module385.Toast, {
                ref: function (t) {
                  globals.Toast = t;

                  globals.showToast = function (t) {
                    if (globals.Toast && globals.Toast.contentView) globals.Toast.contentView.toast(t);
                  };
                },
              }),
              module393.isTestModeSupport() &&
                React.default.createElement(module2238.default, {
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
          module510.changeLang(t);
        },
      },
    ]);
    return se;
  })(React.default.Component);

exports.default = ie;
console.disableYellowBox = true;
module13.AppRegistry.registerComponent('App', function () {
  return ie;
});
