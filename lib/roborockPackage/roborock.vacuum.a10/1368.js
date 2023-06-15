require('./925');

require('./1796');

require('./1810');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1369 = require('./1369'),
  module1370 = require('./1370'),
  module1373 = require('./1373'),
  module387 = require('./387'),
  module407 = require('./407'),
  module377 = require('./377'),
  module1229 = require('./1229'),
  module1361 = require('./1361'),
  module411 = require('./411'),
  module1376 = require('./1376'),
  module1795 = require('./1795'),
  module390 = Y(require('./390')),
  module383 = require('./383'),
  module1797 = require('./1797'),
  module386 = require('./386'),
  module1231 = require('./1231'),
  module1343 = require('./1343'),
  module378 = require('./378'),
  module381 = require('./381'),
  module1798 = Y(require('./1798')),
  module1801 = require('./1801'),
  module1802 = require('./1802'),
  module12 = require('./12'),
  module409 = require('./409'),
  module1805 = require('./1805'),
  module1806 = require('./1806'),
  module1345 = Y(require('./1345')),
  module506 = require('./506'),
  module415 = require('./415'),
  module1063 = require('./1063'),
  module1807 = require('./1807'),
  module1061 = require('./1061'),
  module1808 = require('./1808'),
  module1352 = require('./1352'),
  module1259 = require('./1259');

function X(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (X = function (t) {
    return t ? o : n;
  })(t);
}

function Y(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = X(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in t)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
      var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
      if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
      else s[l] = t[l];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function $(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function ee(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      $(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      $(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function te() {
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

var module491 = require('./491').strings,
  module12 = require('./12'),
  ie = module12.StyleSheet,
  oe = module12.Text,
  re = module12.View,
  se = module12.DeviceEventEmitter,
  ue = module12.Dimensions,
  module389 = require('./389'),
  module934 = require('./934'),
  module385 = require('./385'),
  module1360 = require('./1360'),
  pe = module1360.Errors,
  ge = module1360.getToast,
  fe = module1360.Reminder,
  module1247 = require('./1247'),
  module403 = require('./403'),
  Me = false,
  Se = 0,
  we = true,
  module1813 = (function (t) {
    module7.default(Y, t);

    var module49 = Y,
      module506 = te(),
      X = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function Y(t, o) {
      var u;
      module4.default(this, Y);

      (u = X.call(this, t, o)).checkOnlyShowGeneralObstacle = function () {
        var t, o;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  s.next = 2;
                  return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.ShowSpecificObstacle));

                case 2:
                  t = s.sent;
                  o = null;
                  o = !!module386.default.isStructuredLightSupported() && (!!module415.DMM.isV1 || !('on' == t));
                  u.setState({
                    onlyShowGeneralObstacle: o,
                  });
                  module390.MC.onlyShowGeneralObstacle = o;

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
      };

      u.redDotStatusArray = [];
      u.mcc = 0;
      u.hasShownPetModeAlert = false;
      u.monitorPrivacyVersion = -1;
      u.tabIndex = 0;
      u.showBubbleGuide = false;
      u.settingIconConfig = {
        enabled: false,
        hasBadge: false,
      };
      u.shareIconConfig = {
        enabled: false,
        isHidden: true,
      };
      u.state = {
        error: 0,
        currentReminder: '',
        topTip: '',
        cleanSegments: [],
        isLocating: false,
        hasGotMap: false,
        shouldShowNoMapTipView: false,
        mapDebugInfoVisible: false,
        mapObstaclesTypeEnabled: false,
        mapObstaclesPopBoxType: 'ai',
        areaUnit: module387.default.getAreaUnit(),
        suppliesUpgradeTipKey: '',
        cleanArea: module387.default.getAreaUnitValue(module377.RSM.cleanArea),
        battery: module377.RSM.battery,
        cleanTime: module377.RSM.cleanTime,
        avoidCount: module377.RSM.avoidCount,
        windowHeight: ue.get('window').height,
        noMapTip: '',
        isDarkMode: false,
        robotState: module377.RSM.state,
        isWarmUp: module377.RSM.isWarmUp,
      };
      return u;
    }

    module5.default(Y, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          we = true;
          this.hasGotStatus = false;
          this.registerListeners();
          this.loadAreaUnit();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (!module389.isMiApp) module383.PluginDidExit();
          module377.RSM.reset();
          module377.RSM.stop();
          module1229.MM.stop();
          this.unregisterListeners();
        },
      },
      {
        key: 'shallowCompare',
        value: function (t, n) {
          for (var o in n) if (n[o] != t[o]) return true;

          return false;
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return this.shallowCompare(this.state, n);
        },
      },
      {
        key: 'navigationItems',
        get: function () {
          var t = this.navSettingButton(),
            n = this.shareButton();
          return this.shareIconConfig.isHidden ? [t] : [n, t];
        },
      },
      {
        key: 'navSettingButton',
        value: function () {
          var t = this;
          return React.default.createElement(module1807.default, {
            enabled: this.settingIconConfig.enabled,
            hasBadge: this.settingIconConfig.hasBadge,
            onPress: function () {
              if (!module1061.default.shared().isDisableBackAndMore) {
                module1229.MM.stop();
                module1229.MM.isStopedBySettingPage = true;
                t.shouldUpdateNavbar = false;
                t.navigateTo('Setting', {
                  title: module491.localization_strings_Setting_index_21,
                  enabledTitleBarUpdate: function () {
                    t.shouldUpdateNavbar = true;
                  },
                });
                module383.LogEventStat(module383.LogEventMap.TapSettingButton);
                if (t.mapView) t.mapView.hideMapObjectBubble();
              }
            },
          });
        },
      },
      {
        key: 'shareButton',
        value: function () {
          var t = this,
            n = {
              width: 32,
              height: 32,
              overflow: 'hidden',
              resizeMode: 'contain',
              marginRight: 8,
              marginLeft: 8,
            };
          return React.default.createElement(module381.PureImageButton, {
            onPress: function () {
              t.onPressShareButton();
            },
            key: 'nav_share',
            enabled: this.shareIconConfig.enabled,
            style: n,
            image: require('./1811'),
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.context.theme;
          this.shouldUpdateNavbar = true;
          this.timestamp = new Date().getTime();
          this.props.navigation.setParams({
            title: module389.deviceName || 'unknown',
            navBarBackgroundColor: 'transparent',
            headerTransparent: true,
            rightItems: this.navigationItems,
            subTitle: module491.localization_strings_Common_Constants_0,
            hiddenBottomLine: true,
          });
          var o;
          regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MapDebugInfoVisible));

                  case 2:
                    o = !!s.sent;
                    t.setState({
                      mapDebugInfoVisible: o,
                    });

                  case 4:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
          this.checkOnlyShowGeneralObstacle();
          module409.Log.deleteExpiredLogs();
        },
      },
      {
        key: 'registerListeners',
        value: function () {
          var t = this,
            n = this;
          this.robotStatusListener = se.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (o) {
            t.checkShouldShowShareButton();
            n.hasGotStatus = true;
            n.updateUI();
            if (module377.RSM.isCurrentMapChanged) t.currentMapDidChange();

            t._checkShouldShowPhotoReminder();

            if (t.customModeView && t.customModeView.updateSettingTip) t.customModeView.updateSettingTip();
          });
          this.robotEventListener = se.addListener(module411.NotificationKeys.EventToastChange, function (n) {
            t.showEventToast(n);
          });
          this.focusListener = this.props.navigation.addListener('didFocus', function () {
            t.updateNavBarSwitcher(true);
          });
          this.mapListener = se.addListener(module411.NotificationKeys.MapDidUpdate, function (t) {
            n.updateMap();
          });
          this.mapReset = se.addListener(module411.NotificationKeys.MapManualReset, function () {
            if (t.mapView) t.mapView.resetManual(false);
          });
          this.registerSpecialEvent();
          this.registerRedDotListener();
          if (module389.isMiApp)
            this.deviceNameChangedListener = module389.DeviceEvent.deviceNameChanged.addListener(function (n) {
              t.props.navigation.setParams({
                title: module389.Device.name,
              });
              module389.deviceName = module389.Device.name;
            });
          else
            this.deviceNameChangedListener = se.addListener(module389.deviceNameChangedEvent, function (n) {
              module389.deviceName = n.newName;
              t.props.navigation.setParams({
                title: n.newName,
              });
              console.log('deviceNameChangedListener - ' + JSON.stringify(n));
            });
          this.areaUnitListener = se.addListener(module411.NotificationKeys.AreaUnitChange, function (n) {
            t.setState({
              areaUnit: module387.default.getAreaUnit(),
            });
          });
          this.dimListener = se.addListener('ScreenHeightUpdate', function () {
            t.setState({
              windowHeight: module390.default.sharedCache().ScreenHeight,
            });
          });
          this.safeAreaListener = se.addListener('SafeAreaDidChange', function () {
            t.updateUI();
          });
          this.themeListener = se.addListener(module411.NotificationKeys.ThemeDidChange, function () {
            var n = t.context.theme;
            console.log('theme did change', n.pageBackgroundColor);
            t.props.navigation.setParams({
              navBarBackgroundColor: n.pageBackgroundColor,
            });
          });
        },
      },
      {
        key: 'registerRedDotListener',
        value: function () {
          var t = this,
            n = this;
          this.redPointListener = se.addListener(module411.NotificationKeys.RedDotDidChange, function (o) {
            var s = n.redDotStatusArray.find(function (t) {
              return t.name == o.name;
            });
            if (s) s.value = o.value;
            else
              n.redDotStatusArray.push({
                name: o.name,
                value: o.value,
              });
            var u = false;
            n.redDotStatusArray.forEach(function (t) {
              u = u || t.value;
            });
            t.updateNaviItemsIfNeeded(
              ee(
                ee({}, t.settingIconConfig),
                {},
                {
                  hasBadge: u,
                }
              ),
              t.shareIconConfig
            );
            if ('supplies' == o.name)
              t.setState({
                suppliesUpgradeTipKey: o.suppliesKey,
              });
            if ('update_sound_package' == o.name)
              t.setState({
                soundPackageShouldShowRedDot: o.value,
              });
            if ('firmware_update' == o.name && o.value) t.detectedNewFirmware();
          });
        },
      },
      {
        key: 'detectedNewFirmware',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!(!module389.isMiApp && module377.RSM.isChargingOnDock() && module377.RSM.battery >= 20)) {
                      u.next = 14;
                      break;
                    }

                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 3:
                    t = u.sent;
                    u.next = 6;
                    return regeneratorRuntime.default.awrap(module389.getValue('firmwareLastVersion1'));

                  case 6:
                    if (((o = u.sent), (s = t.lastVersion), !((1 == module389.iotType || s != o) && we))) {
                      u.next = 14;
                      break;
                    }

                    we = false;
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module389.setValue('firmwareLastVersion1', s));

                  case 13:
                    if (this.newFirmwareView) this.newFirmwareView.show();

                  case 14:
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
        key: 'registerSpecialEvent',
        value: function () {
          var t = this;
          this.specialEventListener = se.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            var o = n.data;

            if (
              ('relocate_fail' != o || module377.RSM.isCleaning() || t.mapView.resetSelectBlocks(),
              ('segment_clean_succ' != o && 'segment_clean_part_done' != o && 'zoned_clean_succ' != o && 'zoned_clean_partial_done' != o && 'zoned_clean_failed' != o) ||
                (t.mapView.resetSelectBlocks(), t.mapView.clearRectangles()),
              o == module411.EventKeys.MapSegmentsDidChange && (t.handleMapSegmentDidChangeEvent(), n.modes))
            ) {
              var s = n.modes,
                u = s.cleanMode,
                l = s.waterMode,
                c = s.mopMode;
              t.updateSidebarMenu(u, l, c);
            }

            if (o == module411.EventKeys.CleanWaterModeDidChange && (t.handleCleanWaterModeDidChange(), n.modes)) {
              var h = n.modes,
                p = h.cleanMode,
                f = h.waterMode,
                v = h.mopMode;
              t.updateSidebarMenu(p, f, v);
            }

            if (o == module411.EventKeys.SegmentCustomModeDidChange) t.updateCustomCleanModeForMap();
            if (o == module411.EventKeys.CleanSequenceDidChange) t.updateCleanSequenceForMap();
          });
        },
      },
      {
        key: 'unregisterListeners',
        value: function () {
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.specialEventListener) this.specialEventListener.remove();
          if (this.mapListener) this.mapListener.remove();
          if (this.redPointListener) this.redPointListener.remove();
          if (this.mapResetListener) this.mapResetListener.remove();
          if (this.deviceNameChangedListener) this.deviceNameChangedListener.remove();
          if (this.robotEventListener) this.robotEventListener.remove();
          if (this.areaUnitListener) this.areaUnitListener.remove();
          if (this.dimListener) this.dimListener.remove();
          if (this.themeListener) this.themeListener.remove();
          if (this.focusListener) this.focusListener.remove();
          if (this.mapReset) this.mapReset.remove();
        },
      },
      {
        key: 'checkShouldShowShareButton',
        value: function () {
          if (!this.hasGotStatus) {
            this.updateShareButton();
            this.updateNaviItemsIfNeeded(
              this.settingIconConfig,
              ee(
                ee({}, this.shareIconConfig),
                {},
                {
                  isHidden: !Me,
                }
              )
            );
          }
        },
      },
      {
        key: 'updateNaviItemsIfNeeded',
        value: function (t, n) {
          var o = this.shallowCompare(t, this.settingIconConfig),
            s = this.shallowCompare(n, this.shareIconConfig);
          this.settingIconConfig = t;
          this.shareIconConfig = n;
          if (o || s)
            this.props.navigation.setParams({
              rightItems: this.navigationItems,
            });
        },
      },
      {
        key: 'updateUI',
        value: function () {
          var t = module377.RSM.isHomeButtonsEnabled(),
            n = module377.RSM.isLocating ? module491.map_locating : module377.RSM.stateName;
          this.updateNaviItemsIfNeeded(
            ee(
              ee({}, this.settingIconConfig),
              {},
              {
                enabled: module377.RSM.isHomeSettingButtonEnabled(),
              }
            ),
            this.shareIconConfig
          );
          this.updateNavigationParams({
            subTitle: n,
            navBarBackgroundColor: 'transparent',
          });
          if (this.sidebarMenu) this.sidebarMenu.updateUI();
          if (module386.default.isFwFilterObstacleSupported() && module1361.default.mapObjectPhotoEnabled)
            this.setState({
              mapObstaclesPopBoxType: 'photo',
            });
          else
            this.setState({
              mapObstaclesPopBoxType: 'ai',
            });

          if (!t) {
            this.updateNaviItemsIfNeeded(
              this.settingIconConfig,
              ee(
                ee({}, this.shareIconConfig),
                {},
                {
                  enabled: false,
                }
              )
            );
            if (this.sidebarMenu)
              this.sidebarMenu.setState({
                mapEditButtonEnabled: false,
                modeSetButtonEnabled: false,
              });
          }

          this.checkMapStatus();
          this.setState({
            cleanArea: module387.default.getAreaUnitValue(module377.RSM.cleanArea),
            battery: module377.RSM.battery,
            cleanTime: module377.RSM.cleanTime,
            avoidCount: module377.RSM.avoidCount,
            error: module377.RSM.errorCode,
            currentReminder: module377.RSM.currentReminder,
            isLocating: module377.RSM.isLocating,
            robotState: module377.RSM.state,
            infoWrapperData: this.infoWrapperData,
            isWarmUp: module377.RSM.isWarmUp,
            washReady: module377.RSM.isWashReady,
          });
        },
      },
      {
        key: 'updateNavigationParams',
        value: function (t) {
          var n = this.shallowCompare(this.props.navigation.state.params, t);
          if (this.shouldUpdateNavbar && n) this.props.navigation.setParams(t);
        },
      },
      {
        key: 'checkMapStatus',
        value: function () {
          var t = this,
            n =
              module377.RSM.mapStatus == module377.MapStatus.None || (module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments && this.tabIndex == module1345.TabSegment);

          if (this.state.shouldShowNoMapTipView != n) {
            var o = null;
            if (!module377.RSM.isCleaning()) o = module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments ? module491.no_seg_map_tip : module491.no_map_tip;
            this.setState(
              {
                shouldShowNoMapTipView: n,
                noMapTip: o,
              },
              function () {
                if (!n)
                  t.mapView &&
                    t.mapView.setState(
                      ee(
                        ee({}, module1229.MM.mapData),
                        {},
                        {
                          robotStatus: module377.RSM.state,
                        }
                      )
                    );
              }
            );
          }
        },
      },
      {
        key: 'updateMap',
        value: function () {
          if (!this.state.hasGotMap) {
            this.setState({
              hasGotMap: true,
            });
            module377.RSM.hasGotMapFirstTime = true;
            this.didGetMapFirstTime();
          }

          var t = module1229.MM.mapRotateAngle[module377.RSM.currentMapId];
          if (this.mapView)
            this.mapView.setState(
              ee(
                ee({}, module1229.MM.mapData),
                {},
                {
                  robotStatus: module377.RSM.state,
                  mapDeg: t || 0,
                }
              )
            );
          if (this.sidebarMenu)
            this.sidebarMenu.setState({
              mapEditButtonEnabled: true,
              modeSetButtonEnabled: true,
            });
          this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            ee(
              ee({}, this.shareIconConfig),
              {},
              {
                enabled: true,
              }
            )
          );

          if (!(module377.RSM.isRunning || this.showBubbleGuide)) {
            this._onShowGuideBubble();

            this.showBubbleGuide = true;
          }
        },
      },
      {
        key: 'didGetMapFirstTime',
        value: function () {
          this.updateCustomCleanModeForMap();
          this.updateCleanSequenceForMap();
          module383.LogEventStat(module383.LogEventMap.MapOnReady);
          if (module386.default.isAnalysisSupported()) module383.PluginDidReadyForStatisticsTask();
          this.checkShouldShowPetModeAlert(module415.DMM.isTanosV ? this.didFinishCheck.bind(this) : null);
        },
      },
      {
        key: 'currentMapDidChange',
        value: function () {
          var t = this;
          console.log('currentMapDidChange update cleanMode,cleanSequence,mapName');
          this.updateCustomCleanModeForMap();
          setTimeout(function () {
            t.updateCleanSequenceForMap();
          }, 500);
          setTimeout(function () {
            module1229.MM.updateRoomNameMapping();
          }, 1e3);
        },
      },
      {
        key: 'showEventToast',
        value: function (t) {
          var n = t.data;
          if ((ge()[n] || false) && this.eventToast) this.eventToast.show(n);
        },
      },
      {
        key: 'getErrorView',
        value: function () {
          var t = this,
            n = this.state.error,
            o = pe()[n];
          return (
            ((n > 0 && !!o) || globals.isTestErrorMode) &&
            React.default.createElement(module1370.default, {
              funcId: 'error_' + n,
              accessibilityLabelKey: 'error_key_' + n,
              ref: function (n) {
                return (t.errorView = n);
              },
              title: o ? o[1] : null,
              desc: o ? o[2] : null,
              onPress: function (o) {
                return t.onOpenErrorDetailPage(pe()[n || o][1], n || o);
              },
              type: 'error',
              closeable: 24 == this.state.error || 25 == this.state.error || module377.RSM.dockErrorStatus > 0,
              onPressCloseButton: this.closeError.bind(this),
            })
          );
        },
      },
      {
        key: 'getReminderView',
        value: function () {
          var t = this.state.currentReminder;
          return (
            fe()[t] &&
            React.default.createElement(module1370.default, {
              funcId: 'reminder_' + t,
              accessibilityLabelKey: 'reminder_key_' + t,
              title: fe()[t][0],
              desc: fe()[t][1],
              shouldShowButton: true,
              onPressCloseButton: this.closeReminder.bind(this),
              onPress: this.onPressReminder.bind(this),
              type: 'reminder',
            })
          );
        },
      },
      {
        key: 'getNotificationView1',
        value: function () {
          var t = this;
          return this.state.hasGotMap
            ? React.default.createElement(module1797.default, {
                notificationKey: module411.StorageKeys.ActivityCN0919Notice,
                content: '\u77f3\u5934\u4e09\u5468\u5e74\uff0c\u8001\u7528\u6237\u514d\u8d39\u9886\u8017\u6750\uff01',
                showCount: 2,
                isModalAllowed: module386.default.isActivityCN0919Supported(),
                beginTime: '2020-09-15 00:00',
                endTime: '2020-09-19 24:00',
                allowedServers: ['cn'],
                allowedLanguages: ['cn'],
                onPress: function () {
                  t.openGuidePage();
                },
              })
            : null;
        },
      },
      {
        key: 'getNotificationView2',
        value: function () {
          var t = this;
          return this.hasGotStatus && this.state.soundPackageShouldShowRedDot
            ? React.default.createElement(module1797.default, {
                notificationKey: module411.StorageKeys.SoundPackageUpgrade,
                content: module491.home_page_sound_pacakge_upgrade_tip,
                showCount: 1,
                onPress: function () {
                  t.navigateTo('SoundPackagePage', {
                    title: module491.soundpackage_volume_adjust_title,
                  });
                },
              })
            : null;
        },
      },
      {
        key: 'getNotificationView3',
        value: function () {
          var t = this,
            n = module385.SuppliesUpgradeTip()[this.state.suppliesUpgradeTipKey];
          return undefined != n
            ? React.default.createElement(module1797.default, {
                content: n,
                isArrowStyle: true,
                onPress: function () {
                  t.navigateTo('SuppliesPage', {
                    title: module491.localization_strings_Setting_index_9,
                  });
                },
              })
            : null;
        },
      },
      {
        key: 'getModeSetView',
        value: function () {
          var t = this;
          return React.default.createElement(module378.ModeSettingPanel, {
            ref: function (n) {
              t.customModeView = n;
            },
            parent: this,
            isInHomePage: true,
            tabModeDidChange: function () {
              se.emit(module411.NotificationKeys.BottomControlMenuNeedRefresh);
            },
            onPressSettingButton: this.gotoMapEditPageWithCustomMode.bind(this),
            onPressCustomModeButton: this._onPressCustomModeButton.bind(this),
            onShowCleanModeDialog: this._onShowCleanModeDialog.bind(this),
            onPressQuestion: this._showMopModePromptDialog.bind(this),
            onPressMore: function () {
              return t.navigateTo('MopModeListPage', {
                title: module491.custom_mode_panel_more_mode_title,
              });
            },
          });
        },
      },
      {
        key: 'onPressMopModeItem',
        value: function () {
          this.alert.alert(
            module491.rubys_cleanmode_mop_alert_descript,
            '',
            [
              {
                text: module491.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {},
              },
            ],
            {
              cancelable: false,
            }
          );
        },
      },
      {
        key: 'getTopView',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1373.default, {
              shouldShowLine: true,
              data: [
                {
                  title: module491.localization_strings_CommonModules_NumberView_0,
                  unit: this.state.areaUnit,
                  value: this.state.cleanArea,
                },
                {
                  title: module491.localization_strings_CommonModules_NumberView_1,
                  unit: '%',
                  value: this.state.battery,
                },
                {
                  title: module491.localization_strings_CommonModules_NumberView_2,
                  unit: 'min',
                  value: t.state.cleanTime,
                },
              ],
            }),
            s = React.default.createElement(
              re,
              {
                style: _e.topTipView,
              },
              React.default.createElement(
                oe,
                {
                  style: {
                    color: n.navTitleColor,
                  },
                },
                this.state.topTip
              )
            );
          return React.default.createElement(
            re,
            {
              style: {
                position: 'absolute',
                top: 74 + module934.AppBarMarginTop,
                left: 0,
                width: ue.get('window').width,
              },
            },
            this.state.topTip.length > 0 ? s : o
          );
        },
      },
      {
        key: 'getMapView',
        value: function () {
          this.context.theme.statusLottie;
          var t = this,
            o = React.default.createElement(module1231.MapView, {
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: this.context.theme.pageBackgroundColor,
              },
              left: 10,
              right: 10,
              showMapObjectDebugInfo: this.state.mapDebugInfoVisible && !module415.DMM.isV1,
              showOnlyGeneralObstacles: this.state.onlyShowGeneralObstacle,
              top: module1063.MapViewInnerTop,
              bottom: module1063.MapViewInnerBottom,
              obstaclePopBoxType: this.state.mapObstaclesPopBoxType,
              shouldShowMapObjectBubbleChecker: function (o) {
                var s, u, l;
                return regeneratorRuntime.default.async(
                  function (c) {
                    for (;;)
                      switch ((c.prev = c.next)) {
                        case 0:
                          s = 'photo' == t.state.mapObstaclesPopBoxType && module1361.default.mapObjectPhotoPrivacyPolicyAgreed && module1361.default.mapObjectPhotoEnabled;
                          c.next = 3;
                          return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.PhotoPrivacyVersion));

                        case 3:
                          if (
                            ((u = !!c.sent),
                            (l = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion),
                            !s || 0 != u || -1 != module390.MC.photoPrivacyVersionAgreedOnServer)
                          ) {
                            c.next = 12;
                            break;
                          }

                          c.next = 8;
                          return regeneratorRuntime.default.awrap(t.getPhotoPrivacyVersionAgreedVersionOnServer());

                        case 8:
                          if ((l = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion)) {
                            module383.LogEventCommon('tap_map_object');
                            if (o) o();
                          } else if (t.photoPrivacyDialog) t.photoPrivacyDialog.show();

                          c.next = 13;
                          break;

                        case 12:
                          if (s && 0 == u && !l) {
                            if (t.photoPrivacyDialog) t.photoPrivacyDialog.show();
                          } else {
                            module383.LogEventCommon('tap_map_object');
                            if (o) o();
                          }

                        case 13:
                        case 'end':
                          return c.stop();
                      }
                  },
                  null,
                  null,
                  null,
                  Promise
                );
              },
              onPressMapObjectBubble: this._onPressMapObjectBubble.bind(this),
              onPressMapObjectPhotoReminderBubble: this._onPressMapObjectPhotoReminderBubble.bind(this),
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange.bind(this),
              selectedRectDidChange: this.handleSelectedRectDidChange.bind(this),
              didTapWhenNoBlock: this.didTapMapWhenNoBlocks.bind(this),
              onPressCarpetBubble: this._onPressCarpetBubble.bind(this),
              onPressDockBubble: this._onPressDockBubble.bind(this),
              onPressChargerErrorBubble: this._onPressChargerErrorBubble.bind(this),
              ref: function (n) {
                return (t.mapView = n);
              },
              showAllBubbleInfo: true,
              showCarpetBubbles: true,
              showDockBubbles: true,
            }),
            s = React.default.createElement(
              re,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module1795.default, {
                shouldShowTip: true,
                isLocating: this.state.isLocating,
                isWarmUp: module377.RSM.isWarmUp,
                style: _e.loadingView,
              })
            ),
            u = React.default.createElement(module1343.default, {
              tip: this.state.noMapTip,
              shouldShowGuideButton: module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments && this.state.noMapTip,
            });
          return this.state.hasGotMap && !this.state.isLocating ? (this.state.shouldShowNoMapTipView ? u : o) : s;
        },
      },
      {
        key: 'getMapEditMenu',
        value: function () {
          var t = this;
          return React.default.createElement(module1798.default, {
            ref: function (n) {
              t.modalMapEditMenu = n;
            },
            mode: module1798.ModalMapEditMenuMode.Home,
            onClose: function () {
              t.modalMapEditMenu.hide();
            },
            parent: this,
            paddingBottom: 0,
            contentBackgroundColor: 'transparent',
            onPressEditZoneButton: this._onPressZoneEditButton.bind(this),
            onPressVirtualWallButton: this._onPressVirtualWallAndForbiddenZoneButton.bind(this),
            onPressResetMapButton: this._onPressResetMapButton.bind(this),
            onPressCustomModeButton: this._onPressCustomModeButton.bind(this),
            onPressCustomOrderButton: this._onPressCustomOrderButton.bind(this),
            onPressCarpetEditButton: this._onPressCarpetEditButton.bind(this),
            onPressRotateMapButton: this._onPressRotateMapButton.bind(this),
            onPressFurnitureEditButton: this._onPressFurnitureEditButton.bind(this),
            mapSaveSetting: this.mapSaveSetting.bind(this),
            toastHandler: function (n) {
              t.modalMapEditMenu.showToast(n);
            },
            alertHandler: function (n, o, s) {
              t.modalMapEditMenu.alert(n, o, s);
            },
          });
        },
      },
      {
        key: 'getSidebar',
        value: function () {
          var t = this;
          return React.default.createElement(module1802.default, {
            ref: function (n) {
              return (t.sidebarMenu = n);
            },
            onPressMapEditButton: this._onPressMapEditButton.bind(this),
            onPressAddZoneButton: this._handleZoneAddButton.bind(this),
            segmentCleanOrderDidChange: this.segmentCleanOrderDidChange.bind(this),
            onPressCustomModeButton: this.onPressCustomModeButton.bind(this),
          });
        },
      },
      {
        key: 'getAllMsgViews',
        value: function () {
          var t = this;
          return React.default.createElement(
            re,
            {
              pointerEvents: 'box-none',
              style: _e.msgViewsWrap,
            },
            React.default.createElement(module1369.default, {
              ref: function (n) {
                return (t.eventToast = n);
              },
            }),
            this.getErrorView(),
            this.getReminderView(),
            this.getNotificationView1(),
            this.getNotificationView2(),
            this.getNotificationView3()
          );
        },
      },
      {
        key: 'getVideoEntryButton',
        value: function () {
          var t = this.context.theme.homeSidebar,
            n =
              module386.default.isVideoMonitorSupported() &&
              !module387.default.isShareUser() &&
              !module389.isMiApp &&
              (module415.DMM.isTanosV || module415.DMM.isTopazSV || module415.DMM.isTanosSV),
            o =
              module377.RSM.state != module377.RobotState.UPDATING &&
              module377.RSM.state != module377.RobotState.UNKNOWN &&
              module377.RSM.state != module377.RobotState.LOCKED &&
              module377.RSM.state != module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
              module377.RSM.state != module377.RobotState.WASHING_DUSTER &&
              module377.RSM.state != module377.RobotState.COLLECTING_DUST;
          return n
            ? React.default.createElement(module381.PureImageButton, {
                image: t.videoIcon,
                imageWidth: 60,
                imageHeight: 60,
                enabled: o,
                style: _e.videoButton,
                funcId: 'video_entrance',
                onPress: this.onPressVideoButton.bind(this),
              })
            : null;
        },
      },
      {
        key: 'getDebugButton',
        value: function () {
          if (module377.RSM.state == module377.RobotState.UNKNOWN) return null;
          var t = this.context.theme.homeSidebar,
            n = React.default.createElement(module381.PureImageButton, {
              funcId: 'debug_entry_button',
              image: t.debugIcon,
              imageWidth: 60,
              imageHeight: 60,
              hitSlop: {
                top: 20,
                left: 30,
                bottom: 20,
                right: 15,
              },
              style: _e.debugButton,
              onPress: this.onPressDebugButton.bind(this),
            });
          return module415.DMM.isV2 || module415.DMM.isV4 || module415.DMM.isV5 || module386.default.isDebuggableV1User() ? n : null;
        },
      },
      {
        key: 'onPressDebugButton',
        value: function () {
          var t = this;
          this.navigateTo('DebugPage', {
            onPressMapDebug: function () {
              t._onPressMapDebugInfoIndicator();
            },
            onPressObstacleIconDebug: function () {
              t.checkOnlyShowGeneralObstacle();
            },
            mapDebugInfoIndicatorActive: this.state.mapDebugInfoVisible,
          });
        },
      },
      {
        key: 'askBeforeBackDock',
        value: function (t) {
          var n;
          if (!(null == (n = this.actionSheet))) n.show();
          this.handleBackDockSheetSelectResult = t;
        },
      },
      {
        key: 'handleBackDockSheetAction',
        value: function (t) {
          var n;
          this.handleBackDockSheetSelectResult(1 == t);
          if (!(null == (n = this.actionSheet))) n.hide();
        },
      },
      {
        key: 'get3DMapTestButton',
        value: function () {
          if (module377.RSM.state == module377.RobotState.UNKNOWN) return null;
          var t = this.context.theme.homeSidebar,
            n = React.default.createElement(module381.PureImageButton, {
              funcId: '3dmap_entry_button',
              image: t.debug3DIcon,
              imageWidth: 60,
              imageHeight: 60,
              hitSlop: {
                top: 10,
                left: 30,
                bottom: 20,
                right: 15,
              },
              style: _e.debug3DMapButton,
              onPress: function () {
                module389.open3DMapTestPage({
                  parsedMapData: module1229.MM.parsedMapData,
                  originBase64MapData: module1229.MM.originBase64MapData,
                });
              },
            });
          return (module415.DMM.isV2 || module415.DMM.isV4 || module415.DMM.isV5) && module389.isSupport3DMap() ? n : null;
        },
      },
      {
        key: 'getMonitorPrivacyDialog',
        value: function () {
          var t = this;
          return React.default.createElement(module1801.MonitorPrivacyDialogWithNavbar, {
            ref: function (n) {
              return (t.monitorPrivacyDialog = n);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module491.button_title_agree,
            onConfirm: function () {
              module383.LogEventCommon('monitor_privacy_dialog_confirm');
              module1361.default.updateMonitorPrivacy(true, function (o) {
                return regeneratorRuntime.default.async(
                  function (s) {
                    for (;;)
                      switch ((s.prev = s.next)) {
                        case 0:
                          if ((!o && globals.showToast(module491.robot_communication_exception), !o)) {
                            s.next = 6;
                            break;
                          }

                          t.saveMonitorPrivacyVersionAgreedVersionOnServer();
                          s.next = 5;
                          return regeneratorRuntime.default.awrap(
                            module411.SetStorageKey(module411.StorageKeys.MonitorPrivacyVersion, module411.StorageKeys.MonitorPrivacyVersion)
                          );

                        case 5:
                          t.onPressVideoButton();

                        case 6:
                          t.postPrivacyAgreement();

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
              });
            },
            onCancel: function () {
              module383.LogEventCommon('monitor_privacy_dialog_cancel');
            },
            onPressLink: function () {
              return t.navigateTo('WebViewPage', {
                title: module491.camera_monitor_privacy_title,
                refrence: module1376.default.MonitorPrivacy(),
              });
            },
          });
        },
      },
      {
        key: 'getPhotoPrivacyDialog',
        value: function () {
          var t = this;
          return React.default.createElement(module1805.PhotoFeaturePrivacyDialog, {
            ref: function (n) {
              return (t.photoPrivacyDialog = n);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module491.button_title_agree,
            cancelTitle: module491.alert_button_disagree,
            onConfirm: function () {
              return module1361.default.updatePhotoPrivacy(true, function (n) {
                if (!n) globals.showToast(module491.robot_communication_exception);
                if (n) module411.SetStorageKey(module411.StorageKeys.PhotoPrivacyVersion, module411.StorageKeys.PhotoPrivacyVersion);
                t.savePhotoPrivacyVersionAgreedVersionOnServer();
                module389
                  .postPrivacyAgreementStatusWithVersion(module377.RSM.serverCode, 4, module403.RRPhotoPrivacyVersion || 1)
                  .then(function (t) {})
                  .catch(function (t) {});
              });
            },
            onCancel: function () {
              if (t.overlesslyLoadingView) t.overlesslyLoadingView.showWithText();
              module377.RSM.hardLockCameraStatus();
              module389
                .postPrivacyAgreementStatusWithVersion(module377.RSM.serverCode, 5, module403.RRPhotoPrivacyVersion || 1)
                .then(function (t) {})
                .catch(function (t) {});
              module1361.default.updatePhotoPrivacy(false, function (n) {
                if (!n) globals.showToast(module491.robot_communication_exception);
                if (t.overlesslyLoadingView) t.overlesslyLoadingView.hide();
                module377.RSM.unHardLockCameraStatus();
              });
            },
            onPressLink: function () {
              return t.navigateTo('WebViewPage', {
                title: module491.map_object_privacy_title,
                refrence: module1376.default.PhotoPrivacy(),
              });
            },
          });
        },
      },
      {
        key: 'showShareMaskView',
        value: function () {
          return Se > 0
            ? React.default.createElement(re, {
                style: _e.maskShare,
              })
            : null;
        },
      },
      {
        key: 'getBackDockSheetView',
        value: function () {
          var t = this;
          return React.default.createElement(module381.ActionSheetView, {
            ref: function (n) {
              return (t.actionSheet = n);
            },
            title: module491.terminate_current_task_back_dock_tip,
            actions: [module491.terminate_current_task_back_dock, module491.terminate_current_task_wash_then_back_dock],
            didSelectRow: this.handleBackDockSheetAction.bind(this),
            onPressCancel: function () {
              return t.actionSheet.hide();
            },
          });
        },
      },
      {
        key: 'infoWrapperData',
        get: function () {
          var t,
            n,
            o = this,
            s = null == (t = module377.RSM.specialInfo) ? undefined : t.text;

          switch (null == (n = module377.RSM.specialInfo) ? undefined : n.actionStyle) {
            case module377.SpecialInfoType.ExquisiteClean:
              return {
                info: s,
                icon: require('./1812'),
                actionIcon: null,
                action: null,
              };

            case module377.SpecialInfoType.AirdryFinishTime:
              return {
                info: s,
                icon: require('./1812'),
                actionIcon: this.context.theme.mapEditMenu.arrowImg,
                action: function () {
                  o.navigateTo('SettingAirDryPage', {
                    title: module491.robot_setting_air_dry_title,
                  });
                },
              };

            case module377.SpecialInfoType.Timer:
              return module387.default.isShareUser()
                ? null
                : {
                    info: s,
                    icon: require('./1813'),
                    actionIcon: this.context.theme.mapEditMenu.arrowImg,
                    action: function () {
                      o.navigateTo('TimerPage', {
                        title: module491.localization_strings_Setting_index_3,
                      });
                    },
                  };

            default:
              return null;
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          console.log('MainPage render', this.timestamp);
          var n = this.context.theme,
            o =
              module387.default.iOSAndroidReturn(44 + module934.StatusBarHeight + module934.AppBarMarginTop, (module12.StatusBar.currentHeight || 0) + 44) +
              (module389.isWindowDisplay ? 8 : 0);
          return React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(re, {
              style: {
                position: 'absolute',
                width: ue.get('window').width,
                backgroundColor: n.pageBackgroundColor,
                height: ue.get('window').height,
                top: 0,
                left: 0,
              },
            }),
            React.default.createElement(
              re,
              {
                style: [
                  {
                    backgroundColor: n.pageBackgroundColor,
                    height: this.state.windowHeight,
                    top: -o,
                  },
                ],
              },
              React.default.createElement(
                re,
                {
                  style: [_e.container],
                },
                this.getMapView(),
                this.getTopView(),
                module377.RSM.state != module377.RobotState.UNKNOWN &&
                  React.default.createElement(module1345.default, {
                    parent: this,
                    tabDidChange: this.tabDidChange.bind(this),
                    childrenAboveTab: this.getSidebar.bind(this),
                    childrenBelowTab: this.getAllMsgViews.bind(this),
                    cleanSegments: this.state.cleanSegments,
                    switchSegmentTabDidFail: this.showEnableMapSaveDialog.bind(this),
                    infoWrapperData: this.state.infoWrapperData,
                    askBeforeBackDock: this.askBeforeBackDock.bind(this),
                    updateParent: function (n) {
                      t.setState(ee({}, n));
                    },
                  }),
                React.default.createElement(module381.AlertView, {
                  ref: function (n) {
                    return (t.alert = n);
                  },
                  isModal: true,
                  noAnimated: true,
                }),
                this.showShareMaskView(),
                React.default.createElement(module381.CancelableLoadingView, {
                  loadingAccessibilityLabelKey: 'loading_view_loading',
                  closeAccessibilityLabelKey: 'loading_view_loading_close',
                  ref: function (n) {
                    t.loadingView = n;
                  },
                  showButton: true,
                }),
                React.default.createElement(module381.CancelableLoadingView, {
                  loadingAccessibilityLabelKey: 'over_loading_view_loading',
                  closeAccessibilityLabelKey: 'over_loading_view_loading_close',
                  ref: function (n) {
                    t.overlesslyLoadingView = n;
                  },
                  showButton: true,
                }),
                this.getBackDockSheetView(),
                this.getModeSetView(),
                this.getMapEditMenu(),
                this.getVideoEntryButton(),
                this.getMonitorPrivacyDialog(),
                this.getPhotoPrivacyDialog(),
                this.getDebugButton(),
                this.get3DMapTestButton(),
                React.default.createElement(module1806.default, {
                  ref: function (n) {
                    t.newSwitchGuideView = n;
                  },
                  parent: this,
                  bgImage: n.guideImages.findCarpet,
                  topTitle: module491.tanos_s_mop_mode_title,
                  context: module491.tanos_s_mop_mode_info1,
                  buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
                  buttonFuncId: ['mop_mode_guide_ok'],
                }),
                React.default.createElement(module1806.default, {
                  ref: function (n) {
                    t.dockDetectedGuideView0 = n;
                  },
                  groups: [
                    {
                      bgImage: n.guideImages.dockGuide0,
                      topTitle: module491.dock_guide_title,
                      context: module491.dock_guide_content_0,
                      buttonInfo: [module491.next_step],
                      buttonFuncId: ['dock_detect_guide_0_ok'],
                      onPressSingleButton: function () {
                        t.dockDetectedGuideView0.next();
                      },
                    },
                    {
                      bgImage: n.guideImages.dockGuide1,
                      topTitle: module491.dock_guide_title,
                      context: module491.dock_guide_content_1,
                      buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
                      buttonFuncId: ['dock_detect_guide_1_ok'],
                      onPressSingleButton: function () {
                        t.dockDetectedGuideView0.dismissModalView();
                      },
                    },
                  ],
                }),
                React.default.createElement(module1806.default, {
                  ref: function (n) {
                    t.newFirmwareView = n;
                  },
                  parent: this,
                  isModal: true,
                  bgImage: n.guideImages.newFirmware,
                  topTitle: module491.new_firmware_detected,
                  context: module491.new_firmware_detected1,
                  buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
                  buttonFuncId: ['new_firmware_view'],
                  onPressSingleButton: function () {
                    t.openDeviceUpgradePage();
                  },
                })
              )
            )
          );
        },
      },
      {
        key: 'openDeviceUpgradePage',
        value: function () {
          this.newFirmwareView.dismissModalView();
          setTimeout(function () {
            module389.openDeviceUpgradePage();
          }, 500);
        },
      },
      {
        key: 'tabDidChange',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((this.tabIndex = t), this.checkMapStatus(), !module415.DMM.isGarnet || 4 != module377.RSM.mopModeId || t != module1345.TabGlobal)) {
                      u.next = 6;
                      break;
                    }

                    u.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setCustomMopById(null == (o = module1352.ModeDataInstance.modePannelCustomMops[0]) ? undefined : o.id)
                    );

                  case 5:
                    if (!(null == (s = this.customModeView))) s.modeTabDidChange(0);

                  case 6:
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
                    return regeneratorRuntime.default.awrap(module389.postPrivacyAgreementStatus(module377.RSM.serverCode, 2));

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
        key: '_onPressMapDebugInfoIndicator',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = !this.state.mapDebugInfoVisible;
                    this.setState({
                      mapDebugInfoVisible: t,
                    });
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MapDebugInfoVisible, t ? 'visible' : ''));

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
        key: 'onPressVideoButton',
        value: function () {
          var t,
            o,
            s,
            u,
            l,
            c = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (!((module415.DMM.isTanosV && module389.apiLevel < 10005) || ((module415.DMM.isTopazSV || module415.DMM.isTanosSV) && module389.apiLevel < 10010))) {
                      h.next = 3;
                      break;
                    }

                    if (this.alert)
                      this.alert.customAlert('', module491.map_object_app_version_tip, null, null, {
                        shouldShowCancel: false,
                      });
                    return h.abrupt('return');

                  case 3:
                    if (module1361.default.realTimeMonitorEnabled) {
                      h.next = 6;
                      break;
                    }

                    if (this.alert)
                      this.alert.customAlert(
                        '',
                        module491.open_real_monitor_firstly_tip,
                        function () {
                          module383.LogEventCommon('open_real_time_video_alert_confirm');
                          c.navigateTo('CameraSettingDetail', {
                            mode: 2,
                          });
                        },
                        function () {
                          module383.LogEventCommon('open_real_time_video_alert_cancel');
                        },
                        {
                          confirmTitle: module491.goto_setting_on,
                          confirmColor: '#007AFF',
                        }
                      );
                    return h.abrupt('return');

                  case 6:
                    if (-1 == parseInt(module390.MC.MonitorPrivacyVersionAgreedOnServer)) this.getMonitorPrivacyVersionAgreedVersionOnServer();
                    t = parseInt(module390.MC.MonitorPrivacyVersionAgreedOnServer) == module403.RRMonitorPrivacyVersion;
                    h.next = 10;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MonitorPrivacyVersion));

                  case 10:
                    if (((o = h.sent), (s = !!o || t), (module1361.default.monitorPrivacyPolicyAgreed && s) || !module1361.default.hasGot)) {
                      h.next = 15;
                      break;
                    }

                    if (this.monitorPrivacyDialog) this.monitorPrivacyDialog.show();
                    return h.abrupt('return');

                  case 15:
                    h.next = 18;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasSetInitialGesturePassword));

                  case 18:
                    u = !!h.sent;

                    l = function (t) {
                      var o = c;
                      c.navigateTo('GesturePasswordPage', {
                        mode: t,
                        didSetPassword:
                          0 == t &&
                          function () {
                            c.navigateTo('MonitorPage', {
                              monitorPageUnmount: function () {
                                o.forceUpdate();
                              },
                            });
                          },
                        enabledTitleBarUpdate: function () {
                          c.shouldUpdateNavbar = true;
                        },
                        shouldShowSkip: 0 == t,
                        skip:
                          0 == t &&
                          function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      c.navigateTo('MonitorPage', {
                                        monitorPageUnmount: function () {
                                          o.forceUpdate();
                                        },
                                      });
                                      t.next = 3;
                                      return regeneratorRuntime.default.awrap(
                                        module411.SetStorageKey(module411.StorageKeys.HasSetInitialGesturePassword, module411.StorageKeys.HasSetInitialGesturePassword)
                                      );

                                    case 3:
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
                        monitorPageUnmount: function () {
                          c.forceUpdate();
                        },
                      });
                    };

                    this.shouldUpdateNavbar = false;

                    (function () {
                      if (module377.RSM.secPasswordEnabled) l(1);
                      else if (u)
                        c.navigateTo('MonitorPage', {
                          enabledTitleBarUpdate: function () {
                            c.shouldUpdateNavbar = true;
                          },
                          monitorPageUnmount: function () {
                            c.forceUpdate();
                          },
                        });
                      else l(0);
                    })();

                  case 23:
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
        key: 'onPressShareButton',
        value: function () {
          var t = this,
            n = this;

          if (n.shareView) {
            n.shareView.capture(module1229.MM.mapData, function (o, s) {
              console.log('share path -' + s + ' - name - ' + o);
              n.setState({
                screenShotPath: s,
              });
              module389.openShareListBar(
                '\u5206\u4eab',
                '\u5206\u4eab',
                {
                  uri: s,
                },
                ''
              );
              t.updateNaviItemsIfNeeded(
                t.settingIconConfig,
                ee(
                  ee({}, t.shareIconConfig),
                  {},
                  {
                    enabled: true,
                  }
                )
              );
            });
            this.shareIconConfig.enabled = false;
            this.updateNaviItemsIfNeeded(
              this.settingIconConfig,
              ee(
                ee({}, this.shareIconConfig),
                {},
                {
                  enabled: false,
                }
              )
            );
          }
        },
      },
      {
        key: 'showEnableMapSaveDialog',
        value: function () {
          var t = this;
          setTimeout(function () {
            if (t.alert)
              t.alert.customAlert(
                module491.open_map_save_mode_tip,
                '',
                function () {
                  module386.default.isMultiFloorSupported();
                  var n = 'MultiFloorPage';
                  t.navigateTo(n, null);
                },
                null,
                {
                  confirmTitle: module491.goto_setting_on,
                }
              );
          }, 100);
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
        key: 'didFinishCheck',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (
                      (module409.Log.log(
                        module409.LogTypes.Debug,
                        'getRemoteViewingAlertAgreedTimesOnServerMain - ' + parseInt(module390.MC.RemoteViewingAlertAgreedTimesOnServer),
                        module409.InfoColors.Normal
                      ),
                      -1 != module390.MC.RemoteViewingAlertAgreedTimesOnServer)
                    ) {
                      t.next = 4;
                      break;
                    }

                    t.next = 4;
                    return regeneratorRuntime.default.awrap(this.getRemoteViewingAlertAgreedTimesOnServer());

                  case 4:
                    if (
                      !module389.isMiApp &&
                      !module387.default.isShareUser() &&
                      module415.DMM.isTanosV_CE &&
                      !module386.default.isVideoMonitorSupported() &&
                      parseInt(module390.MC.RemoteViewingAlertAgreedTimesOnServer) < 2 &&
                      -1 != module390.MC.RemoteViewingAlertAgreedTimesOnServer
                    )
                      this.remoteViewingAlert();

                  case 6:
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
        key: 'checkShouldShowPetModeAlert',
        value: function (t) {
          var n = this;

          if (module377.RSM.state != module377.RobotState.UPDATING && !module1361.default.hasShownPetModeAlert && module386.default.isSupportPetModeAlert()) {
            var o = function () {
              setTimeout(function () {
                module409.Log.log(module409.LogTypes.Home, 'begin update pet status,' + JSON.stringify(module1361.default), module409.InfoColors.Normal, true);
                if (n.alert)
                  n.alert.customAlert(
                    module491.if_has_pet_tip_title,
                    module491.if_has_pet_tip_detail,
                    function () {
                      module1361.default.updatePetModeEnabled(true);
                      if (t) t();
                    },
                    function () {
                      module1361.default.updatePetModeEnabled(false);
                      if (t) t();
                    },
                    {
                      cancelTitle: module491.has_or_no_no,
                      confirmTitle: module491.has_or_no_has,
                    }
                  );
              }, 150);
            };

            if (module1361.default.cameraEnabled) o();
            else {
              if (module415.DMM.isTanosSPlus) return;
              if (this.alert)
                this.alert.customAlert(
                  module491.wether_open_rrai_title,
                  module491.wether_open_rrai_desc,
                  function () {
                    module409.Log.log(module409.LogTypes.Home, 'begin update RRAI status,' + JSON.stringify(module1361.default), module409.InfoColors.Normal, true);
                    module1361.default.updateRRAI(true, function (t) {
                      module409.Log.log(module409.LogTypes.Home, 'success update RRAI status,' + JSON.stringify(module1361.default), module409.InfoColors.Success, true);
                      if (t) o();
                    });
                  },
                  function () {
                    module1361.default.updatePetModeEnabled(false);
                    if (t) t();
                  },
                  {
                    cancelTitle: module491.localization_strings_Main_MainPage_11,
                    confirmTitle: module491.yes_or_no_shi,
                  }
                );
            }
          } else t && t();
        },
      },
      {
        key: 'updateCustomCleanModeForMap',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module1229.MM.getCustomCleanMode());

                  case 2:
                    if (
                      (this.mapView && this.mapView.setAllCleanMopMode(module1229.MM.customCleanModes),
                      this.handleCleanWaterModeDidChange(),
                      !module386.default.isMultiFloorSupported())
                    ) {
                      t.next = 7;
                      break;
                    }

                    t.next = 7;
                    return regeneratorRuntime.default.awrap(module1229.MM.getMultiMaps());

                  case 7:
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
        key: 'updateCleanSequenceForMap',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module1229.MM.getCleanSequence());

                  case 2:
                    if (this.mapView) this.mapView.setCleanSequence(module1229.MM.cleanSequence.concat(), false);

                  case 3:
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
        key: '_onPressMapEditButton',
        value: function () {
          var t;
          if (!(null == (t = this.customModeView))) t.hide();
          if (this.modalMapEditMenu) this.modalMapEditMenu.show();
        },
      },
      {
        key: 'onPressCustomModeButton',
        value: function () {
          var t, n;
          if (!(null == (t = this.modalMapEditMenu))) t.hide();
          if (!(null == (n = this.customModeView))) n.show();
        },
      },
      {
        key: 'customModeDidChange',
        value: function (t, o, s) {
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((u.prev = 0), !module377.RSM.isSupportFeature(118))) {
                      u.next = 6;
                      break;
                    }

                    u.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMotorMode(t, o));

                  case 4:
                    u.next = 12;
                    break;

                  case 6:
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(t));

                  case 8:
                    u.next = 11;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(o));

                  case 11:
                    u.sent;

                  case 12:
                    module377.RSM.fanPower = t;
                    module377.RSM.waterBoxMode = o;
                    if (this.sidebarMenu) this.sidebarMenu.updateModeIcon(t, o, module377.RSM.mopMode);
                    if (s && this.customModeView) this.customModeView.hide();
                    console.log('set mode rpc success,  cleanMode- ' + t + ' waterMode - ' + o);
                    se.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanWaterModeDidChange,
                    });
                    u.next = 24;
                    break;

                  case 20:
                    u.prev = 20;
                    u.t0 = u.catch(0);
                    if (this.customModeView) this.customModeView.showToast(module491.robot_communication_exception);
                    console.log('customModeDidChange  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 24:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 20]],
            Promise
          );
        },
      },
      {
        key: 'updateSidebarMenu',
        value: function (t, n, o) {
          if (this.sidebarMenu) this.sidebarMenu.updateModeIcon(t, n, o);
        },
      },
      {
        key: 'gotoMapEditPageWithCustomMode',
        value: function () {
          this.customModeView.hide();
          if (module377.RSM.isRunning)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else
            this.navigateTo('MapEditZoneModePage', {
              parent: this,
              action: 'custom',
              title: module491.map_edit_bottom_menu_mode,
            });
        },
      },
      {
        key: 'handleMapSegmentDidChangeEvent',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.mapView) this.mapView.resetSelectBlocks();
                    this.checkMapStatus();
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module1229.MM.getMap(true));

                  case 4:
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module1229.MM.updateRoomNameMapping());

                  case 6:
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
        key: 'handleCleanWaterModeDidChange',
        value: function () {
          var t = this.tabIndex == module1345.TabSegment,
            n = this.tabIndex == module1345.TabGlobal,
            o = (module377.RSM.isCustomCleanMode() || module377.RSM.isCustomWaterMode() || module377.RSM.isCustomMopMode()) && (n || t),
            s = module377.RSM.isSegmentCleanTaskShouldResume() || module377.RSM.state == module377.RobotState.SEGMENT_CLEAN;

          if (o) {
            var u = null;
            u = t
              ? s
                ? module1231.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
                : module1231.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
              : module1231.MapModelInCleanMode.Global_Clean_With_Clean_Type;
            if (this.mapView) this.mapView.changeMapViewMode(u);
            if (o && this.mapView) this.mapView.setAllCleanMopMode(module1229.MM.customCleanModes);
          } else {
            if (n && this.mapView) this.mapView.changeMapViewMode(module1231.MapModelInCleanMode.Global_Clean);
            if (t && this.mapView) this.mapView.changeMapViewMode(s ? module1231.MapModelInCleanMode.Segment_Clean_Read_Only : module1231.MapModelInCleanMode.Segment_Clean_Edit);
          }
        },
      },
      {
        key: 'onOpenErrorDetailPage',
        value: function (t, n) {
          this.navigateTo('ErrorDetailPageNew', {
            title: module491.localization_strings_Main_Error_ErrorDetailPage_0,
            code: n,
          });
        },
      },
      {
        key: '_handleZoneAddButton',
        value: function () {
          console.log('_handleZoneAddButton');

          if (module377.RSM.mapStatus != module377.MapStatus.None) {
            if (this.mapView) this.mapView.enterZoneEditMode();
            if (this.mapView && !this.mapView.addRectangle()) globals.showToast(module491.rubys_main_zone_max_tips);
          } else globals.showToast(module491.tap_zone_clean_button_without_map_tip);
        },
      },
      {
        key: '_onPressZoneEditButton',
        value: function () {
          this.navigateTo('MapEditZoneInfoPage', {
            title: module491.map_edit_zone,
          });
        },
      },
      {
        key: '_onPressVirtualWallAndForbiddenZoneButton',
        value: function () {
          this.navigateTo('MapEditForbiddenZonePage', {
            title: module491.map_edit_virtual_wall_and_forbidden_zone,
          });
        },
      },
      {
        key: '_onPressResetMapButton',
        value: function () {
          var t = this;

          if (module386.default.isMultiFloorSupported() || module377.RSM.mapSaveEnabled) {
            module386.default.isMultiFloorSupported();
            var n = 'MultiFloorPage';
            this.navigateTo(n, {
              title: module491.map_edit_title,
            });
          } else
            setTimeout(function () {
              if (t.alert)
                t.alert.customAlert(
                  module491.open_map_save_mode_tip,
                  '',
                  function () {
                    return t.navigateTo('MultiFloorPage');
                  },
                  null,
                  {
                    confirmTitle: module491.goto_setting_on,
                  }
                );
            }, 100);
        },
      },
      {
        key: 'handleSelectedBlocksDidChange',
        value: function (t) {
          var n =
            t.length > 0
              ? '' +
                module491.main_page_top_tip_has_selected.templateStringWithParams({
                  zones: t.length,
                })
              : module491.home_menu_select_zone_tip;
          this.setState({
            topTip: n,
            cleanSegments: t,
          });
        },
      },
      {
        key: 'handleSelectedRectDidChange',
        value: function (t) {
          var n =
            t > 0
              ? '' +
                module491.mainpage_top_tip_has_drawed.templateStringWithParams({
                  zones: t,
                })
              : module491.home_menu_draw_zone_tip;
          this.setState({
            topTip: n,
          });
        },
      },
      {
        key: 'didTapMapWhenNoBlocks',
        value: function () {},
      },
      {
        key: 'closeReminder',
        value: function () {
          module377.RSM.closeReminder();
          this.state.currentReminder = null;
          this.forceUpdate();
        },
      },
      {
        key: 'closeError',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if ((module377.RSM.closeError(), (this.state.error = 0), this.forceUpdate(), !(module377.RSM.dockErrorStatus > 0))) {
                      t.next = 6;
                      break;
                    }

                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.resolveError(module377.RSM.dockErrorStatus));

                  case 6:
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
        key: 'onPressReminder',
        value: function () {
          var t = this.state.currentReminder,
            n = ('string' == typeof (t = 'bin_full' == t ? 'Error644' : t) && parseInt(t.slice(5))) || -1;
          if (pe()[n] && this.props.navigation)
            this.navigateTo('ErrorDetailPageNew', {
              title: module491.localization_strings_Main_Error_ErrorDetailPage_0,
              code: n,
            });
        },
      },
      {
        key: 'segmentCleanOrderDidChange',
        value: function (t) {
          var n = null;
          n = module377.RSM.hasCustomMode()
            ? 1 == t
              ? module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type
              : module1231.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
            : 1 == t
            ? module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit
            : module1231.MapModelInCleanMode.Segment_Clean_Edit;
          if (this.mapView) this.mapView.changeMapViewMode(n);
        },
      },
      {
        key: '_onPressMapObjectBubble',
        value: function (t, n) {
          var o = this,
            s = module1361.default.mapObjectPhotoEnabled;
          module383.LogEventCommon('tap_map_object_bubble', {
            photoEnabled: s,
          });
          this.navigateTo('MapObjectPhotoPage', {
            title: module491.obstacle_pop_type_ai,
            enabledTitleBarUpdate: function () {
              o.shouldUpdateNavbar = true;
            },
            currentObj: t,
            ignoredObjArray: n,
            shouldShowPossibility: !this.state.onlyShowGeneralObstacle,
          });
        },
      },
      {
        key: '_onPressMapObjectPhotoReminderBubble',
        value: function (t, n) {
          this.navigateTo('CameraSettingDetail', {
            mode: 3,
          });
        },
      },
      {
        key: '_onPressCustomModeButton',
        value: function () {
          if (this.newSwitchGuideView) this.newSwitchGuideView.dismissModalView();
          if (this.customModeView) this.customModeView.hide();
          this.navigateTo('MapEditZoneModePage', {
            parent: this,
            action: 'custom',
            title: module491.map_edit_bottom_menu_mode,
          });
        },
      },
      {
        key: '_onPressCarpetBubble',
        value: function (t) {
          var n = !t || !t.custom;
          this.navigateTo('MapCarpetInfoPage', {
            parent: this,
            title: module491.carpet_bubble_name,
            carpetRect: t,
            showBottomView: n,
          });
        },
      },
      {
        key: '_onPressDockBubble',
        value: function () {
          if (module377.RSM.isO1Dock())
            this.props.navigation.navigate('DustCollectionModeSetting', {
              parent: this,
            });
          else if (module377.RSM.isO2Dock())
            this.props.navigation.navigate('WashTowelSettingNew', {
              parent: this,
              dustCollectionVisible: module377.RSM.isCollectDustDock,
            });
        },
      },
      {
        key: '_onPressChargerErrorBubble',
        value: function () {
          if (module377.RSM.errorCode > 0) this.onOpenErrorDetailPage('', module377.RSM.errorCode);
        },
      },
      {
        key: '_onPressCustomOrderButton',
        value: function () {
          this.navigateTo('MapEditZoneOrderPage', {
            action: 'order',
            title: module491.map_edit_bottom_menu_order,
          });
        },
      },
      {
        key: '_onPressCarpetEditButton',
        value: function () {
          this.navigateTo('MapCarpetIgnorePage', {
            action: module386.default.isMapCarpetAddSupport() ? module377.CarpetEditMode.CarpetIgnore | module377.CarpetEditMode.CarpetAdd : module377.CarpetEditMode.CarpetIgnore,
            title: module491.map_edit_carpet_ignore_title,
          });
        },
      },
      {
        key: '_onPressRotateMapButton',
        value: function () {
          this.navigateTo('MapEditRotateView', {
            title: module491.map_edit_rotate_map_title,
          });
        },
      },
      {
        key: '_onPressFurnitureEditButton',
        value: function () {
          this.navigateTo('MapEditFurnitureView', {
            title: module491.map_edit_furniture_title,
          });
        },
      },
      {
        key: 'showDockGuideIfNeeded',
        value: function () {
          var t, o, module4, u;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (module377.RSM.isO1Dock()) {
                      l.next = 2;
                      break;
                    }

                    return l.abrupt('return');

                  case 2:
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DockGuide));

                  case 4:
                    if (!l.sent) {
                      l.next = 7;
                      break;
                    }

                    return l.abrupt('return');

                  case 7:
                    if ((o = module390.MC.serialNumber)) {
                      l.next = 10;
                      break;
                    }

                    return l.abrupt('return');

                  case 10:
                    module4 = module1808.default.sharedManager().dockSetSNPrefixes;
                    if (
                      (function () {
                        var t = false;
                        module4.forEach(function (n) {
                          if (o.startsWith(n)) t = true;
                        });
                        return t;
                      })()
                    )
                      null == (u = this.dockDetectedGuideView0) || u.next();
                    if (!(null == (t = this.dockDetectedGuideView0))) t.show();
                    l.next = 16;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.DockGuide, module411.StorageKeys.DockGuide));

                  case 16:
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
        key: '_onShowCleanModeDialog',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module411.StorageKeys.ExquisiteCleanbyGuide;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((o = u.sent), !!o)) {
                      u.next = 9;
                      break;
                    }

                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

                  case 8:
                    module1247.setTimeout(function () {
                      if (s.newSwitchGuideView) s.newSwitchGuideView.show();
                    }, 50);

                  case 9:
                  case 'end':
                    return u.stop();
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
        key: '_onShowGuideBubble',
        value: function () {
          var t,
            o,
            module4,
            u = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = module411.StorageKeys.FindCarpetbyGuide;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((o = l.sent), !module1229.MM.hasCarpetMap)) {
                      l.next = 11;
                      break;
                    }

                    if (!!o) {
                      l.next = 11;
                      break;
                    }

                    l.next = 9;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

                  case 9:
                    module1247.setTimeout(function () {
                      if (u.mapView) u.mapView.findCarpetAndShowGuide();
                    }, 50);
                    return l.abrupt('return');

                  case 11:
                    if (!module377.RSM.isCollectDustDock) {
                      l.next = 23;
                      break;
                    }

                    if (!(!module1229.MM.hasCarpetMap || (module1229.MM.hasCarpetMap && o))) {
                      l.next = 23;
                      break;
                    }

                    module4 = module411.StorageKeys.DustCollectionSequencebyGuide;
                    l.next = 16;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module4));

                  case 16:
                    if (((o = l.sent), !!o)) {
                      l.next = 22;
                      break;
                    }

                    l.next = 21;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module4, module4));

                  case 21:
                    module1247.setTimeout(function () {
                      if (u.mapView) u.mapView.showChargerBubble();
                    }, 50);

                  case 22:
                    module1808.default
                      .sharedManager()
                      .getConfig()
                      .finally(function () {
                        u.showDockGuideIfNeeded();
                      });

                  case 23:
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
      },
      {
        key: '_showMopModePromptDialog',
        value: function () {
          var t = this;
          module1247.setTimeout(function () {
            if (t.newSwitchGuideView) t.newSwitchGuideView.show();
          }, 50);
        },
      },
      {
        key: 'mapSaveSetting',
        value: function () {
          module386.default.isMultiFloorSupported();
          var t = 'MultiFloorPage';
          this.navigateTo(t, {
            title: module491.setting_robot_setting,
          });
        },
      },
      {
        key: '_checkShouldShowPhotoReminder',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasShownMapObjectPhotoReminder));

                  case 2:
                    if (
                      ((t = !!o.sent),
                      !(
                        module415.DMM.isTanosV &&
                        module386.default.isFwFilterObstacleSupported() &&
                        !module1361.default.mapObjectPhotoEnabled &&
                        !t &&
                        this.mapView &&
                        this.mapView.mapObjectNumber() > 0
                      ))
                    ) {
                      o.next = 7;
                      break;
                    }

                    if (this && this.mapView) this.mapView.showMapObjectPhotoReminder();
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.HasShownMapObjectPhotoReminder, 'true'));

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
        key: 'loadAreaUnit',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.AreaUnitIndex));

                  case 2:
                    t = o.sent;
                    module390.default.sharedCache().areaUnitIndex = t || 0;
                    this.setState({
                      areaUnit: module387.default.getAreaUnit(),
                    });

                  case 5:
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
        key: 'remoteViewingAlert',
        value: function () {
          if (this.alert)
            this.alert.customAlert(
              module491.new_remote_viewing_feature_title1,
              module491.new_remote_viewing_feature_title2 +
                '\n' +
                module491.new_remote_viewing_feature_title3 +
                '\n' +
                module491.new_remote_viewing_feature_title4 +
                '\n' +
                module491.new_remote_viewing_feature_title5,
              null,
              null,
              {
                contentAlignment: 'left',
                shouldShowCancel: false,
                confirmTitle: module491.localization_strings_Setting_RemoteControlPage_51,
                confirmColor: '#007AFF',
              }
            );
          this.saveRemoteViewingAlertAgreedTimesOnServer();
        },
      },
      {
        key: 'saveRemoteViewingAlertAgreedTimesOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    module390.MC.RemoteViewingAlertAgreedTimesOnServer = parseInt(module390.MC.RemoteViewingAlertAgreedTimesOnServer) + 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(
                      module389.saveDeviceExtraValue('RRVAlertPopTimes', parseInt(module390.MC.RemoteViewingAlertAgreedTimesOnServer).toString())
                    );

                  case 4:
                    t = o.sent;
                    console.log('saveRemoteViewingAlertAgreedTimesOnServer - ' + t);
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('saveRemoteViewingAlertAgreedTimesOnServer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'saveMonitorPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.saveDeviceExtraValue('RRMonitorPrivacyVersion', module403.RRMonitorPrivacyVersion.toString()));

                  case 3:
                    t = o.sent;
                    console.log('saveMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('saveMonitorPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'savePhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module389.saveDeviceExtraValue('RRPhotoPrivacyVersion', module403.RRPhotoPrivacyVersion.toString()));

                  case 3:
                    t = o.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    o.next = 9;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);

                  case 9:
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
        key: 'openGuidePage',
        value: function () {
          this.navigateTo('GuideDetailPage', {
            contentProps: {
              shareTitle: '\u77f3\u5934\u4e09\u5468\u5e74\u8001\u7528\u6237\u798f\u5229\uff0c\u4e07\u4efd\u8017\u6750\u514d\u8d39\u9886',
              shareSubTitle: '\u70b9\u51fb\u6709\u597d\u793c',
              guideUrl: 'https://mall.roborock.com/robo_anniversary.html',
              shouldShowShare: true,
              foreCloseVideo: true,
            },
            title: '\u77f3\u5934\u4e09\u5468\u5e74\uff0c\u8001\u7528\u6237\u514d\u8d39\u9886\u8017\u6750\uff01',
          });
        },
      },
      {
        key: 'updateShareButton',
        value: function () {
          Me = module386.default.isSharedAllowed() && 'cn' == module377.RSM.serverCode;
          Se = Me ? 1 : 0;
        },
      },
      {
        key: 'updateNavBarSwitcher',
        value: function (t) {
          this.shouldUpdateNavbar = t;
          this.props.navigation.setParams({
            navBarBackgroundColor: t ? 'transparent' : this.context.theme.pageBackgroundColor,
          });
        },
      },
      {
        key: 'navigateTo',
        value: function (t, n) {
          this.updateNavBarSwitcher(false);
          this.props.navigation.navigate(t, n);
        },
      },
    ]);
    return Y;
  })(React.default.Component);

exports.default = module1813;
module1813.contextType = module506.AppConfigContext;

var _e = ie.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ue.get('window').width,
    height: ue.get('window').height,
    backgroundColor: 'transparent',
  },
  topTipView: {
    alignSelf: 'center',
    marginTop: module934.NavigationBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  loadingView: {
    width: 150,
    height: 150,
  },
  msgViewsWrap: {
    width: ue.get('window').width,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  debugButton: {
    position: 'absolute',
    top: 220 + (module12.StatusBar.currentHeight || 0),
    left: 15,
  },
  debug3DMapButton: {
    position: 'absolute',
    top: 280 + (module12.StatusBar.currentHeight || 0),
    left: 15,
  },
  videoButton: {
    position: 'absolute',
    top: 156 + (module12.StatusBar.currentHeight || 0) + module934.AppBarMarginTop,
    right: 10,
    width: 60,
    height: 60,
  },
  maskShare: {
    position: 'absolute',
    backgroundColor: 'white',
    width: ue.get('window').width,
    height: Se,
    bottom: 0,
  },
});
