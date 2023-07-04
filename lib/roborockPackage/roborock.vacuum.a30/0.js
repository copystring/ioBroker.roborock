var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module381 = require('./381'),
  module414 = require('./414'),
  module394 = require('./394'),
  module419 = require('./419'),
  module1121 = require('./1121'),
  module515 = require('./515'),
  module1564 = require('./1564'),
  module1139 = require('./1139'),
  module1317 = require('./1317'),
  module2127 = require('./2127'),
  module1935 = require('./1935'),
  module1880 = require('./1880'),
  module387 = require('./387'),
  module1950 = require('./1950'),
  module2128 = require('./2128'),
  module390 = require('./390'),
  module417 = require('./417'),
  module391 = require('./391'),
  module1974 = require('./1974'),
  module423 = require('./423'),
  module1543 = require('./1543'),
  module1573 = require('./1573'),
  module385 = require('./385'),
  module415 = require('./415'),
  module1269 = require('./1269');

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

if ('android' === module12.Platform.OS) module12.I18nManager.isRTL = false;
module12.I18nManager.allowRTL(false);
module12.I18nManager.forceRTL(false);

var module393 = require('./393'),
  module1265 = require('./1265'),
  module411 = require('./411').JsExecutor,
  module505 = require('./505'),
  G = module505.strings,
  Z = module12.NativeModules.Orientation;

module414.MM.createJsExecutor();
module393.fixDeviceScreenHeight();
module393.adjustDefaultFont();
module393.adjustDefaultTextAlign();
module12.AppState.addEventListener('change', function (t) {
  console.log('_handleAppStateChange - ' + t + ' - agreed - ' + module381.RSM.hasAgreedPrivacyPolicy);
  var n = 'inactive' == t || 'background' == t,
    o = 'active' == t;
  if (n) module417.Log.exit(true);
  if (o) module417.Log.enter(true);

  if (module381.RSM.hasAgreedPrivacyPolicy) {
    if (n) {
      module381.RSM.stop();
      module381.RSM.isEnterBackgroundWhenCleaning = module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None;
      module414.MM.stop();
    }

    if (o) {
      module417.Log.log(module417.LogTypes.KeyEvent, 'timers start by AppStateChange - ' + t);
      module381.RSM.start();
      module414.MM.lastMapRequestHasHandled = true;
      module414.MM.start();
    }
  }
});
module411
  .createJsExecutor(require('./2129'))
  .then(function (t) {
    module394.MC.rsaExecutor = t;
    module394.MC.getRsaKey();
  })
  .catch(function (t) {
    console.warn('initially create RSA executor failed');
  });

var q = function () {
  if (module393.isTestModeSupport() && globals.TestModeMenu) globals.TestModeMenu.show();
};

globals.PressTitleAction = q;

globals.dlog = function (...args) {
  (t = console).log.apply(t, ['@dlog', new Date().toLocaleTimeString()].concat(args));
};

globals.console.log = function () {};

globals.console.info = function () {};

var X = null;

function Y() {
  var t, n, o;
  module417.Log.exit();
  module381.RSM.stop();
  module414.MM.stop();
  module381.RSM.reset();
  module394.MC.reset();
  module12.BackHandler.removeEventListener(module12.BackHandler.DEVICE_BACK_EVENT);
  if ('SmartCommandList' == (null == (t = globals) ? undefined : null == (n = t.initialData) ? undefined : null == (o = n.initialPage) ? undefined : o.name))
    null == module393 || null == module393.notifyNativeUpdateSceneDataSource || module393.notifyNativeUpdateSceneDataSource();
  module393.closeCurrentPage();
}

var Q = 0,
  $ = module423.DMM.agreeProtocolLevel,
  ee = 'agreed',
  te = 'failed',
  ne = 'pop_dialog_success',
  ae = (function (t) {
    module7.default(oe, t);

    var module411 = oe,
      ae = B(),
      re = function () {
        var t,
          n = module11.default(module411);

        if (ae) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function oe(t) {
      var n;
      module4.default(this, oe);
      (n = re.call(this, t)).state = {
        theme: module393.isDarkMode() ? module515.Themes.dark : module515.Themes.light,
      };
      globals.app = module6.default(n);
      var s = n.props,
        l = null == s ? undefined : s.initialPage;
      globals.lastNavigationChangeTime = new Date();
      globals.initialData = s;
      X = n.getRootStack(null == l ? undefined : l.name);

      n.themeListener = function (t) {
        var o = t.colorScheme;
        if (o) n.changeTheme(o == module393.Theme.dark ? module515.Themes.dark : module515.Themes.light);
      };

      return n;
    }

    module5.default(oe, [
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
          module1974.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
          if (!(null == (t = globals) ? undefined : null == (n = t.initialData) ? undefined : null == (o = n.initialPage) ? undefined : o.offLine)) this.init();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          this.destroyed = true;
          module1974.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
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
            o,
            s,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    module417.Log.enter();
                    module393.syncTheme(function (t) {
                      return l.changeTheme('dark' == t ? module515.Themes.dark : module515.Themes.light);
                    });
                    this.registerStatusListener();
                    this.registerSpecialEvent();
                    this.registerThemeChangeListener();

                    if (module393.isMiApp) {
                      if (!(null == (t = module393.PackageEvent) || null == (o = t.packageDidResume) || null == o.addListener))
                        o.addListener(function () {
                          l.registerThemeChangeListener();
                          l.changeTheme(module393.isDarkMode() ? module515.Themes.dark : module515.Themes.light);
                        });
                      if (!(null == (s = module393.PackageEvent) || null == (c = s.packageWillPause) || null == c.addListener))
                        c.addListener(function () {
                          l.removeThemeChangeListener();
                        });
                    }

                    console.log('DarkMode:' + module393.isDarkMode());

                  case 7:
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
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (module381.RSM.shouldStopFetchMap()) module414.MM.stop();
            else module414.MM.start();

            if (module381.RSM.isValidConnect && !t.hasHandledValidConnectEvent) {
              module414.MM.start();
              t.startPreloadTasks();
              t.setFDSEndpoint();
              t.setLogLevel($);
              t.hasHandledValidConnectEvent = true;
            }
          });
          this.dimListener = module12.DeviceEventEmitter.addListener('ScreenHeightUpdate', function () {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'getRootStack',
        value: function (t) {
          return module1139.createStackNavigator(module1564.routes, {
            initialRouteName: t || 'MainPage',
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
                    : React.default.createElement(module1317.default, {
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
                          if (f.state.routeName == (t || 'MainPage')) {
                            if (f.state.params && !f.state.params.onPressLeft) Y();
                          } else if (f.state.params && f.state.params.onPressLeft) f.state.params.onPressLeft();
                          else f.pop();
                        },
                        onPressTitle:
                          f.state.params && f.state.params.onPressTitle
                            ? function () {
                                q();
                                f.state.params.onPressTitle();
                              }
                            : q,
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
                screenInterpolator: module1564.interpolator,
              };
            },
          });
        },
      },
      {
        key: 'registerSpecialEvent',
        value: function () {
          var t = this;
          this.specialEventListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module419.EventKeys.Error10002) t.handle10002Error();
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
          module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.exit();
          });
        },
      },
      {
        key: 'exit',
        value: function () {
          Y();
        },
      },
      {
        key: 'handleScreen',
        value: function () {
          if ('android' == module12.Platform.OS) module12.StatusBar.setTranslucent(true);
          if ('ios' == module12.Platform.OS) module12.StatusBar.setBarStyle('dark-content');
          if (Z) Z.lockToPortrait();
        },
      },
      {
        key: 'handleDyy',
        value: function () {
          if (module393.isTestModeSupport())
            this.volumeKeyListener = module12.DeviceEventEmitter.addListener('volume_key', function (t) {
              console.log('volume_key', t);
              if ('volume_up' == t) module505.changePrevLang();
              if ('volume_down' == t) module505.changeNextLang();
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
              module12.DeviceEventEmitter.emit(module419.NotificationKeys.ThemeDidChange);
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
                    return regeneratorRuntime.default.awrap(module1974.default.getConnectionInfo());

                  case 4:
                    o = s.sent;
                    module417.Log.log(module417.LogTypes.KeyEvent, 'network changed,now is ' + o.type);

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
                    module381.RSM.countryCode = o;
                    s = (s = t.serverCode || module1265.areaServerMap[o].code).replace('eu', 'de');
                    module381.RSM.serverCode = s;
                    module417.Log.log(module417.LogTypes.Home, 'fetchCountryInfo - ' + JSON.stringify(t), module417.InfoColors.Success);
                    if (module393.isMiApp) this.addMiPrivacyEventListener();
                    else this.checkShouldShowAgreementDialog();
                    c.next = 18;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(0);
                    this.fetchCountryInfo();
                    module417.Log.log(module417.LogTypes.Home, 'fetchCountryInfo  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module417.InfoColors.Fail);

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
                      case ee:
                        o.fetchDeviceLocation();
                        break;

                      case ne:
                        break;

                      case te:
                        o.alert.alert(
                          '',
                          G.privacy_access_failure,
                          [
                            {
                              text: G.localization_strings_Setting_RemoteControlPage_51,
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = '';
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module393.getValue(module419.StorageKeys.DeviceActiveTime));

                  case 4:
                    t = o.sent;
                    console.log('deviceActiveTime GET - ' + t);
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(1);
                    console.log('storedServer GET error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
                    if (t != module393.activeTime) this.openPrivacyLicense();
                    else this.fetchDeviceLocation();

                  case 12:
                  case 'end':
                    return o.stop();
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
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = this;
                    setTimeout(function () {
                      module1880.default.checkSuppliesRedPoint();
                      module1880.default.checkFirmwareRedPoint();
                      module1880.default.checkTimeZoneRedPoint();
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
                                return regeneratorRuntime.default.awrap(module1935.default.getInUseSoundPackage());

                              case 2:
                                s.next = 4;
                                return regeneratorRuntime.default.awrap(module1935.default.getListDataFromServer());

                              case 4:
                                t = module1935.default.checkSoundPackageNeedUpgrade();
                                o = t > 0;
                                module381.RSM.soundPackageShouldShowRedDot = o;
                                module12.DeviceEventEmitter.emit(module419.NotificationKeys.RedDotDidChange, {
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
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module381.RSM.serverCode;
                    o = this.serverCodeToPrivacyName(t);

                    s = function (t) {
                      var o;
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
                                return regeneratorRuntime.default.awrap(module393.setValue(module419.StorageKeys.DeviceActiveTime, module393.activeTime + ''));

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
                                o = s.sent;
                                console.log('postPrivacyAgreementStatus - ' + o);
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
                        G.localization_strings_Main_Views_AgreementPage_0,
                        module1573.default.UserAgreement(),
                        G.rubys_main_alert_title_privacy,
                        module1573.default.UserPrivacyProtocol(),
                        s
                      );
                    };

                    if (!module393.isMiApp)
                      module393.isSupportNewAgreementAndPolicy()
                        ? (function () {
                            var t, o, l, u, f;
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
                                      o = G.localization_strings_Main_Views_AgreementPage_0;
                                      l = G.rubys_main_alert_title_privacy;
                                      u = t.userAgreement.langUrl;
                                      f = t.privacyProtocol.langUrl;
                                      module393.openPrivacyLicenseNew(o, u, l, f, s);
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
                                return regeneratorRuntime.default.awrap(module415.default.setLogLevel(0, o));

                              case 3:
                                s = c.sent;
                                console.log('setLogLevel before privacy  level : 0 - res: ' + JSON.stringify(s));
                                c.next = 11;
                                break;

                              case 7:
                                c.prev = 7;
                                c.t0 = c.catch(0);
                                if (Q <= 4)
                                  setTimeout(function () {
                                    return regeneratorRuntime.default.async(
                                      function (n) {
                                        for (;;)
                                          switch ((n.prev = n.next)) {
                                            case 0:
                                              Q++;
                                              console.log('retry - setLogLevel before privacy -' + Q);
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
            module4,
            module5,
            c = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = module381.RSM.countryCode;
                    module381.RSM.hasAgreedPrivacyPolicy = true;
                    l.prev = 2;
                    module417.Log.log(module417.LogTypes.Home, 'fetchDeviceLocation  begin');
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module415.default.getInitStatus());

                  case 6:
                    module4 = l.sent;
                    module5 = module4.result[0].local_info.location.replace('prc', 'cn');
                    module381.RSM.deviceLocation = module5;
                    module390.default.deviceLocation = module5;
                    module381.RSM.robotFeatures = module4.result[0].feature_info;
                    module390.default.robotFeatures = module4.result[0].feature_info;
                    module381.RSM.FCCState = 1 & module4.result[0].local_info.featureset;
                    module381.RSM.robotNewFeatures = module4.result[0].new_feature_info;
                    module390.default.robotNewFeatures = module4.result[0].new_feature_info;
                    module390.default.newFeatureInfoStr = module4.result[0].new_feature_info_str;
                    module417.Log.log(module417.LogTypes.Home, 'fetchDeviceLocation - ' + JSON.stringify(module4) + ' -location - ' + module5, module417.InfoColors.Success);
                    this.getSerialNumber();
                    this.autoSyncTimeZone();
                    console.log('' + Number.MAX_SAFE_INTEGER);
                    console.log('newFeature: ' + module390.default.robotNewFeatures);
                    console.log('isSupport: ' + module390.default.isSupportSmartScene());
                    module1269.MapListDataProvider.syncSmartSceneIfNeeded();
                    l.next = 25;
                    return regeneratorRuntime.default.awrap(module1543.ModeDataInstance.getCustomMopList());

                  case 25:
                    l.next = 31;
                    break;

                  case 27:
                    l.prev = 27;
                    l.t0 = l.catch(2);
                    module417.Log.log(module417.LogTypes.Home, 'fetchDeviceLocation  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0), module417.InfoColors.Fail);
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

                  case 31:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[2, 27]],
            Promise
          );
        },
      },
      {
        key: 'dispatchWithCountryCodeAndDeviceLocation',
        value: function () {
          var t = module381.RSM.countryCode,
            n = module381.RSM.deviceLocation,
            o = module423.DMM.isV2 || module423.DMM.isV4 || module423.DMM.isV5,
            s = module423.DMM.isTanosSL || module423.DMM.isTanosSC || module423.DMM.isTanosSE || module423.DMM.isTopazSPower,
            c = 'roborock.vacuum.a19v2' == module393.deviceModel || (o && s);

          if ('cn' == t && 'cn' != n && !c) {
            this.updateLogConfigAndValidConnectFlag(true, true);
            return void this.alert.alert(
              '',
              G.rubys_main_device_location_ziyou_alert,
              [
                {
                  text: G.localization_strings_Setting_RemoteControlPage_51,
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
        value: function (t, o) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.ValidConnect, t ? '' : module419.StorageKeys.ValidConnect));

                  case 2:
                    this.setFDSEndpoint(t ? 'de' : '');
                    this.setLogLevel(t ? 6 : 9, t ? 3 : null);

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
                      (module423.DMM.isTanosV || module423.DMM.isTanosSV || module423.DMM.isTopazSV) &&
                        (module393.enableAVCall(!module423.DMM.isTanosV), module393.setMaxFramerate(module423.DMM.isTanosV ? 15 : 12)),
                      (s.t0 = !t),
                      s.t0)
                    ) {
                      s.next = 8;
                      break;
                    }

                    s.next = 7;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ValidConnect));

                  case 7:
                    s.t0 = s.sent;

                  case 8:
                    o = s.t0;
                    console.log('isValidConnect - ' + o);

                    if (o) {
                      module381.RSM.start();
                      module414.MM.start();
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getDeviceExtraInfoForKey('RRMonitorPrivacyVersion'));

                  case 3:
                    t = o.sent;
                    console.log('getMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                    module394.MC.MonitorPrivacyVersionAgreedOnServer = t.RRMonitorPrivacyVersion;
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
                    return regeneratorRuntime.default.awrap(module393.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = o.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module394.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
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
        key: 'autoSyncTimeZone',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (((o.prev = 0), module381.RSM.timeZone)) {
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
                    return regeneratorRuntime.default.awrap(module415.default.setAppTimezone([module381.RSM.timeZone, this.mcc || 0]));

                  case 9:
                    t = o.sent;
                    console.log('setAppTimezone - ' + JSON.stringify(t) + ' - mcc - ' + this.mcc + ' - timezone - ' + module381.RSM.timeZone);
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
                    if (((c.prev = 0), !module381.RSM.isSupportFDSEndPoint())) {
                      c.next = 9;
                      break;
                    }

                    module4 = (module4 = (module4 = module1265.areaServerMap[t || module381.RSM.serverCode].host).replace('cdn.', '')).replace('mi-img', 'xiaomi');
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(module415.default.setFDSEndpoint(module4));

                  case 7:
                    s = c.sent;
                    module417.Log.log(module417.LogTypes.Home, 'setFDSEndpoint - ' + JSON.stringify(s), module417.InfoColors.Success);

                  case 9:
                    c.next = 14;
                    break;

                  case 11:
                    c.prev = 11;
                    c.t0 = c.catch(0);
                    module417.Log.log(module417.LogTypes.Home, 'setFDSEndpoint  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0), module417.InfoColors.Fail);

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
          return 'cn' == t ? module1265.privacyName.PN_CN : 'de' == t ? module1265.privacyName.PN_EU : module1265.privacyName.PN_GENERAL;
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
                    return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

                  case 3:
                    t = o.sent;
                    module381.RSM.timeZone = t;
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
                    if ('' == (o = t.result[0].serial_number) || o.length < 1) o = ' ';
                    module394.MC.serialNumber = o;
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
          module414.MM.stop();
          if (this.invalidConnectWarningView)
            this.invalidConnectWarningView.setState({
              shouldShow: true,
            });
        },
      },
      {
        key: 'setLogLevel',
        value: function (t, o) {
          var module5,
            module6,
            l,
            u = this;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    module5 = module381.RSM.serverCode;
                    module6 = this.serverCodeToPrivacyName(module5);
                    f.prev = 2;
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module415.default.setLogLevel(t, o || module6));

                  case 5:
                    l = f.sent;
                    Q = 0;
                    console.log('setLogLevel  level : ' + t + ' - res: ' + JSON.stringify(l));
                    f.next = 14;
                    break;

                  case 10:
                    f.prev = 10;
                    f.t0 = f.catch(2);
                    if (Q <= 4)
                      setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  o.next = 2;
                                  return regeneratorRuntime.default.awrap(u.setLogLevel(t));

                                case 2:
                                  Q++;
                                  console.log('retry - setLogLevel -' + Q);

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
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((t = module381.RSM.state),
                      (o = module381.RSM.battery),
                      !((t == module381.RobotState.CHARGING && o >= 20) || t == module381.RobotState.FULL_CHARGE) || module391.default.isShareUser() || !module393.isMiApp)
                    ) {
                      c.next = 13;
                      break;
                    }

                    c.prev = 3;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module393.checkFirmwareUpdateAndAlert());

                  case 6:
                    s = c.sent;
                    module417.Log.log(module417.LogTypes.Home, 'checkFirmwareUpdateAndAlert success ' + JSON.stringify(s), module417.InfoColors.Success);
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(3);
                    module417.Log.log(module417.LogTypes.Home, 'checkFirmwareUpdateAndAlert error ' + JSON.stringify(c.t0), module417.InfoColors.Fail);

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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.HasDarkMode));

                  case 2:
                    t = o.sent;
                    globals.app.changeTheme('true' == t ? module515.Themes.dark : this.state.theme);

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
            module1121.AppConfigContext.Provider,
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
              React.default.createElement(X, {
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
              React.default.createElement(module1950.default, {
                ref: function (n) {
                  t.networkErrorView = n;
                },
              }),
              React.default.createElement(module2127.default, {
                ref: function (n) {
                  t.invalidConnectWarningView = n;
                },
              }),
              React.default.createElement(module385.AlertView, {
                ref: function (n) {
                  t.alert = n;
                  globals.Alert = n;
                },
                isModal: 'ios' != module12.Platform.OS,
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
                React.default.createElement(module2128.default, {
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
          module505.changeLang(t);
        },
      },
    ]);
    return oe;
  })(React.default.Component);

exports.default = ae;
console.disableYellowBox = true;
module12.AppRegistry.registerComponent('App', function () {
  return ae;
});
