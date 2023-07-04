var n = require(d[1]);

n(require(d[23]));
n(require(d[43]));

var o = n(require(d[2])),
  s = n(require(d[3])),
  u = n(require(d[4])),
  l = n(require(d[5])),
  c = n(require(d[6])),
  p = n(require(d[7])),
  h = n(require(d[8])),
  f = n(require(d[9])),
  M = n(require(d[10])),
  v = n(require(d[11])),
  S = n(require(d[12])),
  _ = n(require(d[13])),
  b = n(require(d[14])),
  w = n(require(d[15])),
  y = n(require(d[16])),
  P = require(d[17]),
  k = require(d[18]),
  C = n(require(d[19])),
  R = require(d[20]),
  T = n(require(d[21])),
  x = n(require(d[22])),
  V = require(d[24]),
  D = require(d[25]),
  B = n(require(d[26])),
  I = n(require(d[27])),
  E = require(d[28]),
  A = n(require(d[29])),
  F = require(d[30]),
  N = require(d[31]),
  G = require(d[32]),
  L = require(d[33]),
  K = n(require(d[34])),
  O = require(d[35]),
  U = require(d[36]),
  W = require(d[37]),
  H = require(d[38]),
  j = require(d[39]),
  z = require(d[40]),
  Z = require(d[41]),
  q = n(require(d[42])),
  Q = n(require(d[44])),
  J = require(d[45]),
  X = require(d[46]),
  Y = require(d[47]),
  $ = n(require(d[48])),
  ee = n(require(d[49])),
  te = n(require(d[50])),
  ae = n(require(d[51])),
  ne = n(require(d[52])),
  ie = require(d[53]),
  oe = n(require(d[54])),
  re = require(d[55]),
  se = require(d[56]);

function ue(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    n &&
      (s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      }));
    o.push.apply(o, s);
  }

  return o;
}

function le(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    n % 2
      ? ue(Object(o), !0).forEach(function (n) {
          (0, u.default)(t, n, o[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
      : ue(Object(o)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
        });
  }

  return t;
}

function ce() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ('function' == typeof Proxy) return !0;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return !0;
  } catch (t) {
    return !1;
  }
}

var de = require(d[57]).strings,
  pe = require(d[35]),
  he = pe.StyleSheet,
  ge = pe.Text,
  fe = pe.View,
  me = pe.DeviceEventEmitter,
  Me = pe.Dimensions,
  ve = require(d[58]),
  Se = require(d[59]),
  _e = require(d[60]),
  be = require(d[61]),
  we = be.Errors,
  ye = be.getToast,
  Pe = be.Reminder,
  ke = require(d[62]),
  Ce = require(d[63]),
  Re = 1,
  Te = !1,
  xe = 0,
  Ve = !0,
  De = {
    NORMAL: '2d',
    AR: 'ar',
    THREE: '3d',
  };

exports.ShowMapType = De;

var Be = (function (t) {
  (0, h.default)(j, t);

  var n = j,
    u = ce(),
    O = function () {
      var t,
        o = (0, M.default)(n);

      if (u) {
        var s = (0, M.default)(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return (0, f.default)(this, t);
    };

  function j(t, n) {
    var o;
    (0, c.default)(this, j);

    (o = O.call(this, t, n)).checkOnlyShowGeneralObstacle = function () {
      var t, n;
      return l.default.async(
        function (s) {
          for (;;)
            switch ((s.prev = s.next)) {
              case 0:
                s.next = 2;
                return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ShowSpecificObstacle));

              case 2:
                t = s.sent;
                n = null;
                n = !!I.default.isShowGeneralObstacle() && (!!z.DMM.isV1 || !('on' == t));
                o.setState({
                  onlyShowGeneralObstacle: n,
                });
                V.MC.onlyShowGeneralObstacle = n;

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

    o.checkShowFurnitureModel = function () {
      var t;
      return l.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                n.next = 2;
                return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ShowFurnitureModel));

              case 2:
                t = n.sent;
                o.setState({
                  showFurnitureModel: !('on' != t),
                });
                V.MC.showAllFurnitureModel = !('on' != t);

              case 5:
              case 'end':
                return n.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    };

    o.checkShowRubberBrushCarpet = function () {
      return l.default.async(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                o.setState({
                  showBrushCarpet: V.MC.isShowCarpet,
                });

              case 1:
              case 'end':
                return t.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    };

    o.shouldSelectType = function (t) {
      return -1 != P.RSM.currentMapId || t != De.AR || (globals.showToast(de.switch_ar_map_when_map_unsaved_tip), !1);
    };

    o.mapTypeDidChange = function (t) {
      return l.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                if (((0, D.LogEventCommon)('tap_map_switcher_' + t), t != De.AR)) {
                  n.next = 8;
                  break;
                }

                n.next = 4;
                return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ARMapPathPrefixKey + '_' + P.RSM.currentMapId));

              case 4:
                if (n.sent) {
                  n.next = 8;
                  break;
                }

                o.navigateTo('MapARScanPage', {
                  title: ' ',
                  onScanFinish: function () {
                    return l.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              n.next = 2;
                              return l.default.awrap(o.changeMapType(t));

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
                  },
                });
                return n.abrupt('return');

              case 8:
                n.next = 10;
                return l.default.awrap(o.changeMapType(t));

              case 10:
                o.lastMapType = t;

              case 12:
              case 'end':
                return n.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    };

    o.onRotateMap = function (t) {
      var n;
      P.RSM.isRunning
        ? (0, X.showFinishCurrentTastAlertIfNeeded)(o.props.alertHandler).catch(function (t) {
            null == o.props.toastHandler || o.props.toastHandler(de.robot_communication_exception);
          })
        : null == (n = o.mapView) ||
          n.rotateMap(t, function (t) {
            var n;
            null == (n = o.loadingView) || n.showWithText(de.rubys_main_diag_update_map);
            o.setRotateMapAngle(t);
            setTimeout(function () {
              var t;
              null == (t = o.loadingView) || t.hide();
            }, 500);
          });
    };

    o.onChangeMapElementShow = function (t) {
      return l.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                o.setState({
                  mapElementShowFlag: t,
                });
                n.next = 3;
                return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapElementShowFlag, t.toString()));

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
    };

    o.onMapTypeClose = function () {
      var t;
      null == (t = o.mapTypeSwitcher) || t.hide();
    };

    o._onPressMapDebugInfoIndicator = function () {
      var t;
      return l.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                t = !o.state.mapDebugInfoVisible;
                o.setState({
                  mapDebugInfoVisible: t,
                });
                n.next = 4;
                return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapDebugInfoVisible, t ? 'visible' : ''));

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
    };

    o._onPressMapEditButton = function () {
      var t, n;
      null == (t = o.customModeView) || t.hide();
      null == (n = o.modalMapEditMenu) || n.show();
    };

    o.onPressCustomModeButton = function () {
      var t, n;
      null == (t = o.modalMapEditMenu) || t.hide();
      null == (n = o.customModeView) || n.show();
    };

    o._handleZoneAddButton = function () {
      console.log('_handleZoneAddButton');
      P.RSM.mapStatus != P.MapStatus.None
        ? (o.mapView && o.mapView.enterZoneEditMode(), o.mapView && !o.mapView.addRectangle() && globals.showToast(de.rubys_main_zone_max_tips))
        : globals.showToast(de.tap_zone_clean_button_without_map_tip);
    };

    o._onPressZoneEditButton = function () {
      o.navigateTo('MapEditZoneInfoPage', {
        title: de.map_edit_zone,
      });
    };

    o._onPressFurnitureBubble = function (t) {
      P.RSM.isHomeButtonsEnabled() &&
        (P.RSM.isShowStopTaskAlert()
          ? globals.Alert.alert('', de.home_dialog_begin_new_clean, [
              {
                text: de.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: de.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return l.default.async(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            n.prev = 0;
                            n.next = 3;
                            return l.default.awrap(y.default.stop());

                          case 3:
                            if (!n.sent) {
                              n.next = 9;
                              break;
                            }

                            P.RSM.state = P.RobotState.WAITING;
                            P.RSM.cleanResumeFlag = P.CleanResumeFlag.None;
                            P.RSM.backDockResumeFlag = P.BackDockResumeFlag.None;
                            o.switchFurnitureZoneClean(t);
                            P.RSM.lockMotionStatus();

                          case 9:
                            n.next = 14;
                            break;

                          case 11:
                            n.prev = 11;
                            n.t0 = n.catch(0);
                            console.log('Furniture bubble press error : ' + JSON.stringify(n.t0));

                          case 14:
                          case 'end':
                            return n.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 11]],
                    Promise
                  );
                },
              },
            ])
          : o.switchFurnitureZoneClean(t));
    };

    o.closeFurnitureGuide = function () {
      o.updateFurnitureGuideKey();
    };

    o.onPressFurnitureGuide = function () {
      o.updateFurnitureGuideKey(function () {
        o.navigateTo('MapEditFurniturePage', {
          title: de.map_edit_furniture_title,
          initAction: E.EditAction.Furniture,
        });
      });
    };

    o.redDotStatusArray = [];
    o.mcc = 0;
    o.hasShownPetModeAlert = !1;
    o.monitorPrivacyVersion = -1;
    o.tabIndex = 0;
    o.showBubbleGuide = !1;
    o.suppliesItem = {};
    o.suppliesValue = 0;
    o.settingIconConfig = {
      enabled: !1,
      hasBadge: !1,
    };
    o.shareIconConfig = {
      enabled: !1,
      isHidden: !0,
    };
    o.state = {
      error: 0,
      currentReminder: '',
      topTip: '',
      cleanSegments: [],
      isLocating: !1,
      hasGotMap: !1,
      shouldShowNoMapTipView: !1,
      mapDebugInfoVisible: !1,
      mapObstaclesTypeEnabled: !1,
      mapObstaclesPopBoxType: 'ai',
      areaUnit: w.default.getAreaUnit(),
      suppliesUpgradeTipKey: '',
      cleanArea: w.default.getAreaUnitValue(P.RSM.cleanArea),
      battery: P.RSM.battery,
      cleanTime: P.RSM.cleanTime,
      avoidCount: P.RSM.avoidCount,
      noMapTip: '',
      isDarkMode: !1,
      robotState: P.RSM.state,
      isWarmUp: P.RSM.isWarmUp,
      mapType: De.NORMAL,
      parsedMapData: k.MM.parsedMapData,
      originBase64MapData: k.MM.originBase64MapData,
      unEditFurnitures: 0,
      mapElementShowFlag: 255,
    };
    return o;
  }

  (0, p.default)(j, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        this.hasGotStatus = !1;
        this.registerListeners();
        this.loadAreaUnit();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        ve.isMiApp || (0, D.PluginDidExit)();
        P.RSM.reset();
        P.RSM.stop();
        k.MM.stop();
        this.unregisterListeners();
      },
    },
    {
      key: 'shallowCompare',
      value: function (t, n) {
        for (var o in n) if (n[o] != t[o]) return !0;

        return !1;
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function (t, n) {
        return this.shallowCompare(this.state, n);
      },
    },
    {
      key: 'navSettingButton',
      value: function () {
        var t = this;
        return v.default.createElement(q.default, {
          enabled: this.settingIconConfig.enabled,
          hasBadge: this.settingIconConfig.hasBadge,
          onPress: function () {
            t.privacyDialogVisible ||
              (k.MM.stop(),
              (k.MM.isStopedBySettingPage = !0),
              (t.shouldUpdateNavbar = !1),
              t.navigateTo('Setting', {
                title: de.localization_strings_Setting_index_21,
                enabledTitleBarUpdate: function () {
                  t.shouldUpdateNavbar = !0;
                },
              }),
              (0, D.LogEventStat)(D.LogEventMap.TapSettingButton),
              t.mapView && t.mapView.hideMapObjectBubble());
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
        return v.default.createElement(N.PureImageButton, {
          onPress: function () {
            t.onPressShareButton();
          },
          key: 'nav_share',
          enabled: this.shareIconConfig.enabled,
          style: n,
          image: require(d[64]),
        });
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.context.theme;
        this.shouldUpdateNavbar = !0;
        this.timestamp = new Date().getTime();
        this.props.navigation.setParams({
          title: ve.deviceName || 'unknown',
          navBarBackgroundColor: 'transparent',
          headerTransparent: !0,
          rightItems: this.navigationItems,
          subTitle: de.localization_strings_Common_Constants_0,
          hiddenBottomLine: !0,
        });
        var n, o;
        l.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapDebugInfoVisible));

                case 2:
                  n = !!o.sent;
                  t.setState({
                    mapDebugInfoVisible: n,
                  });

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
        l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.PreferedMapType));

                case 2:
                  if (((n.t0 = n.sent), n.t0)) {
                    n.next = 5;
                    break;
                  }

                  n.t0 = De.NORMAL;

                case 5:
                  o = n.t0;
                  t.lastMapType = o;
                  t.setState({
                    mapType: o,
                  });

                case 8:
                case 'end':
                  return n.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
        this.checkOnlyShowGeneralObstacle();
        this.checkShowFurnitureModel();
        this.checkMapElementShowFlag();
        this.checkShowRubberBrushCarpet();
        this.checkAutoIdentifyRoomTag();
        U.Log.deleteExpiredLogs();
        ve.fixDeviceScreenHeight();
      },
    },
    {
      key: 'checkMapElementShowFlag',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapElementShowFlag));

                case 2:
                  (t = n.sent) && this.onChangeMapElementShow(parseInt(t));

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
      key: 'checkAutoIdentifyRoomTag',
      value: function () {
        return l.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AutoIdentifyRoomTag));

                case 2:
                  if (t.sent) {
                    t.next = 6;
                    break;
                  }

                  t.next = 6;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.AutoIdentifyRoomTag, 'true'));

                case 6:
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
    },
    {
      key: 'registerListeners',
      value: function () {
        var t = this,
          n = this;
        this.robotStatusListener = me.addListener(R.NotificationKeys.RobotStatusDidUpdate, function (o) {
          t.checkShouldShowShareButton();
          n.hasGotStatus = !0;
          n.updateUI();
          P.RSM.isCurrentMapChanged && t.currentMapDidChange(!0);

          t._checkShouldShowPhotoReminder();

          t.checkShouldShowProhibitedBehaviorsGuide(function () {
            t.checkShouldShowMapSaveGuide();
            t.checkShouldShowAvoidCollisionGuide();
            t.checkShouldShowPetModeAlert();
          });
          t.customModeView && t.customModeView.updateSettingTip && t.customModeView.updateSettingTip();
        });
        this.robotEventListener = me.addListener(R.NotificationKeys.EventToastChange, function (n) {
          t.showEventToast(n);
        });
        this.focusListener = this.props.navigation.addListener('didFocus', function () {
          t.updateNavBarSwitcher(!0);
        });
        this.mapListener = me.addListener(R.NotificationKeys.MapDidUpdate, function (o) {
          n.updateMap();
          k.MM.RefrashMapData && ((k.MM.RefrashMapData = !1), t.updateRoomTag());
        });
        this.mapReset = me.addListener(R.NotificationKeys.MapManualReset, function () {
          t.mapView && t.mapView.resetManual(!1);
        });
        this.registerSpecialEvent();
        this.registerRedDotListener();
        ve.isMiApp
          ? (this.deviceNameChangedListener = ve.DeviceEvent.deviceNameChanged.addListener(function (n) {
              t.props.navigation.setParams({
                title: ve.Device.name,
              });
              ve.deviceName = ve.Device.name;
            }))
          : (this.deviceNameChangedListener = me.addListener(ve.deviceNameChangedEvent, function (n) {
              ve.deviceName = n.newName;
              t.props.navigation.setParams({
                title: n.newName,
              });
              console.log('deviceNameChangedListener - ' + JSON.stringify(n));
            }));
        this.areaUnitListener = me.addListener(R.NotificationKeys.AreaUnitChange, function (n) {
          t.setState({
            areaUnit: w.default.getAreaUnit(),
          });
        });
        this.safeAreaListener = me.addListener('SafeAreaDidChange', function () {
          t.updateUI();
        });
        this.themeListener = me.addListener(R.NotificationKeys.ThemeDidChange, function () {
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
        this.redPointListener = me.addListener(R.NotificationKeys.RedDotDidChange, function (o) {
          var s = n.redDotStatusArray.find(function (t) {
            return t.name == o.name;
          });
          s
            ? (s.value = o.value)
            : n.redDotStatusArray.push({
                name: o.name,
                value: o.value,
              });
          var u = !1;
          n.redDotStatusArray.forEach(function (t) {
            u = u || t.value;
          });
          t.updateNaviItemsIfNeeded(
            le(
              le({}, t.settingIconConfig),
              {},
              {
                hasBadge: u,
              }
            ),
            t.shareIconConfig
          );
          'supplies' == o.name &&
            (t.setState({
              suppliesUpgradeTipKey: o.suppliesKey,
            }),
            (t.suppliesItem = o.suppliesItem),
            (t.suppliesValue = o.suppliesValue));
          'update_sound_package' == o.name &&
            t.setState({
              soundPackageShouldShowRedDot: o.value,
            });
          'firmware_update' == o.name && (o.isForce ? t.detectedForceUpdate() : o.value && t.detectedNewFirmware());
        });
      },
    },
    {
      key: 'detectedForceUpdate',
      value: function () {
        var t,
          n,
          o = this;

        if (!w.default.isShareUser()) {
          null == (t = this.guideView) || null == t.dismissModalView || t.dismissModalView(!1);
          null == (n = this.dialogView) || null == n.dismissModalView || n.dismissModalView(!1);
          setTimeout(function () {
            var t;
            null == (t = o.forceUpdateView) || t.show();
          }, 200);
          this.newFirmwareDetected = !0;
          var s = setInterval(function () {
            var t = function () {
              var t, n, u, l, c, p, h;
              (clearInterval(s),
              null == (t = o.forceUpdateView) || t.dismissModalView(),
              (null != (n = null == (u = o.guideView) ? void 0 : null == (l = u.state) ? void 0 : null == (c = l.groups) ? void 0 : c.length) ? n : 0) > 0)
                ? null == (p = o.guideView) || null == p.show || p.show()
                : null == (h = o.dialogView) || null == h.show || h.show();
            };

            ve.isMiApp
              ? ve
                  .getFirmwareUpgradingInfo(ve.deviceId, ve.isMiApp ? ve.Device.type : '')
                  .then(function (n) {
                    (null == n ? void 0 : n.isLatest) && t();
                  })
                  .catch(function (t) {
                    console.log(t);
                  })
              : ve
                  .getFirmwareVersion()
                  .then(function (n) {
                    n.currentVersion == n.lastVersion && t();
                  })
                  .catch(function (t) {
                    console.log(t);
                  });
          }, 2e3);
        }
      },
    },
    {
      key: 'detectedNewFirmware',
      value: function () {
        var t,
          n,
          o,
          s = this;
        return l.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  if (!(!ve.isMiApp && P.RSM.isChargingOnDock() && P.RSM.battery >= 20) || w.default.isShareUser()) {
                    u.next = 15;
                    break;
                  }

                  u.next = 3;
                  return l.default.awrap(ve.getFirmwareVersion());

                case 3:
                  t = u.sent;
                  u.next = 6;
                  return l.default.awrap(ve.getValue('firmwareLastVersion1'));

                case 6:
                  if (((n = u.sent), (o = t.lastVersion), !((1 == ve.iotType || o != n) && Ve))) {
                    u.next = 15;
                    break;
                  }

                  Ve = !1;
                  u.next = 13;
                  return l.default.awrap(ve.setValue('firmwareLastVersion1', o));

                case 13:
                  this.addDialog([
                    {
                      bgImage: this.context.theme.guideImages.newFirmware,
                      topTitle: de.new_firmware_detected,
                      context: de.new_firmware_detected1,
                      buttonInfo: [de.go_update],
                      buttonFuncId: ['new_firmware_view'],
                      onPressSingleButton: function () {
                        s.openDeviceUpgradePage();
                      },
                    },
                  ]);
                  this.newFirmwareDetected = !0;

                case 15:
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
        this.specialEventListener = me.addListener(R.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          var o = n.data;

          if (
            ('relocate_fail' != o || P.RSM.isCleaning() || t.mapView.resetSelectBlocks(),
            ('segment_clean_succ' != o && 'segment_clean_part_done' != o && 'zoned_clean_succ' != o && 'zoned_clean_partial_done' != o && 'zoned_clean_failed' != o) ||
              (t.mapView.resetSelectBlocks(), t.mapView.clearRectangles()),
            o == R.EventKeys.MapSegmentsDidChange && (t.handleMapSegmentDidChangeEvent(), n.modes))
          ) {
            var s = n.modes,
              u = s.cleanMode,
              l = s.waterMode,
              c = s.mopMode;
            t.updateSidebarMenu(u, l, c);
          }

          if (o == R.EventKeys.CleanWaterModeDidChange && (t.handleCleanWaterModeDidChange(), n.modes)) {
            var p = n.modes,
              h = p.cleanMode,
              f = p.waterMode,
              M = p.mopMode;
            t.updateSidebarMenu(h, f, M);
          }

          o == R.EventKeys.SegmentCustomModeDidChange && t.updateCustomCleanModeForMap();
          o == R.EventKeys.CleanSequenceDidChange && t.updateCleanSequenceForMap();
          o == R.EventKeys.CurrentARMapDidDelete && t.onDeleteCurrentARMap();
          o == R.EventKeys.ConsumableReset &&
            t.setState({
              suppliesUpgradeTipKey: '',
            });
        });
      },
    },
    {
      key: 'unregisterListeners',
      value: function () {
        this.robotStatusListener && this.robotStatusListener.remove();
        this.specialEventListener && this.specialEventListener.remove();
        this.mapListener && this.mapListener.remove();
        this.redPointListener && this.redPointListener.remove();
        this.mapResetListener && this.mapResetListener.remove();
        this.deviceNameChangedListener && this.deviceNameChangedListener.remove();
        this.robotEventListener && this.robotEventListener.remove();
        this.areaUnitListener && this.areaUnitListener.remove();
        this.themeListener && this.themeListener.remove();
        this.focusListener && this.focusListener.remove();
        this.mapReset && this.mapReset.remove();
      },
    },
    {
      key: 'checkShouldShowShareButton',
      value: function () {
        this.hasGotStatus ||
          (this.updateShareButton(),
          this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            le(
              le({}, this.shareIconConfig),
              {},
              {
                isHidden: !Te,
              }
            )
          ));
      },
    },
    {
      key: 'updateNaviItemsIfNeeded',
      value: function (t, n) {
        var o = this.shallowCompare(t, this.settingIconConfig),
          s = this.shallowCompare(n, this.shareIconConfig);
        this.settingIconConfig = t;
        this.shareIconConfig = n;
        (o || s) &&
          this.props.navigation.setParams({
            rightItems: this.navigationItems,
          });
      },
    },
    {
      key: 'updateUI',
      value: function () {
        var t = P.RSM.isHomeButtonsEnabled(),
          n = P.RSM.isLocating ? de.map_locating : P.RSM.stateName;
        this.updateNaviItemsIfNeeded(
          le(
            le({}, this.settingIconConfig),
            {},
            {
              enabled: P.RSM.isHomeSettingButtonEnabled(),
            }
          ),
          this.shareIconConfig
        );
        this.updateNavigationParams({
          subTitle: n,
          navBarBackgroundColor: 'transparent',
        });
        this.sidebarMenu && this.sidebarMenu.updateUI();
        I.default.isFwFilterObstacleSupported() && C.default.mapObjectPhotoEnabled
          ? this.setState({
              mapObstaclesPopBoxType: 'photo',
            })
          : this.setState({
              mapObstaclesPopBoxType: 'ai',
            });
        t ||
          (this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            le(
              le({}, this.shareIconConfig),
              {},
              {
                enabled: !1,
              }
            )
          ),
          this.sidebarMenu &&
            this.sidebarMenu.setState({
              mapEditButtonEnabled: !1,
              modeSetButtonEnabled: !1,
            }));
        this.checkMapStatus();
        this.setState({
          cleanArea: w.default.getAreaUnitValue(P.RSM.cleanArea),
          battery: P.RSM.battery,
          cleanTime: P.RSM.cleanTime,
          avoidCount: P.RSM.avoidCount,
          error: P.RSM.errorCode,
          currentReminder: P.RSM.currentReminder,
          isLocating: P.RSM.isLocating,
          robotState: P.RSM.state,
          infoWrapperData: this.infoWrapperData,
          isWarmUp: P.RSM.isWarmUp,
          washReady: P.RSM.isWashReady,
          inQuickBuildMap: P.RSM.state == P.RobotState.QUICK_BUILDING_MAP,
        });
        P.RSM.state != P.RobotState.EGG_ATTACK && k.MM.quitEasterEggModel();
      },
    },
    {
      key: 'updateNavigationParams',
      value: function (t) {
        var n = this.shallowCompare(this.props.navigation.state.params, t);
        this.shouldUpdateNavbar && n && this.props.navigation.setParams(t);
      },
    },
    {
      key: 'checkMapStatus',
      value: function () {
        var t = this,
          n = P.RSM.mapStatus == P.MapStatus.None || (P.RSM.mapStatus == P.MapStatus.Has_WithoutSegments && this.tabIndex == H.TabSegment);

        if (this.state.shouldShowNoMapTipView != n) {
          var o = null;
          P.RSM.isCleaning() || (o = P.RSM.mapStatus == P.MapStatus.Has_WithoutSegments ? de.no_seg_map_tip : de.no_map_tip);
          this.setState(
            {
              shouldShowNoMapTipView: n,
              noMapTip: o,
            },
            function () {
              n ||
                (t.mapView &&
                  t.mapView.setState(
                    le(
                      le({}, k.MM.mapData),
                      {},
                      {
                        robotStatus: P.RSM.state,
                      }
                    )
                  ));
            }
          );
        }
      },
    },
    {
      key: 'updateMap',
      value: function () {
        this.state.hasGotMap ||
          (this.setState({
            hasGotMap: !0,
          }),
          (P.RSM.hasGotMapFirstTime = !0),
          this.didGetMapFirstTime());
        var t = k.MM.mapRotateAngle[P.RSM.currentMapId];
        this.mapView &&
          this.mapView.setState(
            le(
              le({}, k.MM.mapData),
              {},
              {
                robotStatus: P.RSM.state,
                mapDeg: t || 0,
              }
            )
          );
        this.sidebarMenu &&
          this.sidebarMenu.setState({
            mapEditButtonEnabled: !0,
            modeSetButtonEnabled: !0,
          });
        this.updateNaviItemsIfNeeded(
          this.settingIconConfig,
          le(
            le({}, this.shareIconConfig),
            {},
            {
              enabled: !0,
            }
          )
        );
        P.RSM.isRunning || this.showBubbleGuide || (this._onShowGuideBubble(), (this.showBubbleGuide = !0));
        this.checkARMapStatus();
        Re += 1;
        this.setState({
          parsedMapData: le(
            le({}, k.MM.parsedMapData),
            {},
            {
              mapCounter: Re,
            }
          ),
          originBase64MapData: k.MM.originBase64MapData,
        });
        this.checkFurnitureGuideStatus();
      },
    },
    {
      key: 'updateRoomTag',
      value: function () {
        var t,
          n,
          o = this;
        return l.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if (
                    ((t = (function () {
                      var t,
                        n = null == (t = o.mapView) ? void 0 : t.getAllFurnitureParams();
                      if (!n || n.length <= 0) return [];

                      for (var s = [], u = 0; u < n.length; u++) {
                        var l = n[u],
                          c = l[8];

                        if (!(c < E.FurnitureType.FT_TVCABINET || c > E.FurnitureType.FT_DINNERTABLE)) {
                          var p = l[0] / 50,
                            h = l[4] / 50,
                            f = l[1] / 50,
                            M = l[5] / 50;

                          if (p < h) {
                            var v = [h, p];
                            p = v[0];
                            h = v[1];
                          }

                          if (M < f) {
                            var S = [f, M];
                            M = S[0];
                            f = S[1];
                          }

                          s.push([h, p, f, M, c]);
                        }
                      }

                      return s;
                    })()),
                    !((n = k.MM.smartInferZoneTag(t)) && Object.keys(n).length > 0))
                  ) {
                    s.next = 6;
                    break;
                  }

                  s.next = 6;
                  return l.default.awrap(k.MM.updateTagInfoForMap(n));

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
      key: 'didGetMapFirstTime',
      value: function () {
        this.updateCustomCleanModeForMap();
        this.updateCleanSequenceForMap();
        (0, D.LogEventStat)(D.LogEventMap.MapOnReady);
        I.default.isAnalysisSupported() && (0, D.PluginDidReadyForStatisticsTask)();
      },
    },
    {
      key: 'currentMapDidChange',
      value: function (t) {
        var n = this;
        console.log('currentMapDidChange update cleanMode,cleanSequence,mapName');
        this.updateCustomCleanModeForMap();
        setTimeout(function () {
          n.updateCleanSequenceForMap();
        }, 500);
        setTimeout(function () {
          k.MM.updateRoomNameMapping();
        }, 1e3);
        t && this.changeMapType(De.NORMAL);
      },
    },
    {
      key: 'changeMapType',
      value: function (t) {
        var n = this;
        return l.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  this.setState(
                    {
                      mapType: t,
                    },
                    function () {
                      var o;
                      t == De.NORMAL &&
                        (null == n ||
                          null == (o = n.mapView) ||
                          o.setState(
                            le(
                              le({}, k.MM.mapData),
                              {},
                              {
                                robotStatus: P.RSM.state,
                              }
                            )
                          ),
                        null == n || null == n.currentMapDidChange || n.currentMapDidChange());
                    }
                  );
                  o.next = 3;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.PreferedMapType, t));

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
      key: 'setRotateMapAngle',
      value: function (t) {
        var n, o;
        return l.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  u.prev = 0;
                  u.next = 3;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapRotateAngle));

                case 3:
                  n = u.sent;
                  (o = n ? JSON.parse(n) : (0, s.default)({}))[P.RSM.currentMapId] = t;
                  n = JSON.stringify(o);
                  k.MM.mapRotateAngle = o;
                  u.next = 10;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapRotateAngle, n));

                case 10:
                  me.emit(R.NotificationKeys.DidReceiveSpecialEvent, {
                    data: R.EventKeys.MapDidRotate,
                    sender: this,
                  });
                  u.next = 15;
                  break;

                case 13:
                  u.prev = 13;
                  u.t0 = u.catch(0);

                case 15:
                case 'end':
                  return u.stop();
              }
          },
          null,
          this,
          [[0, 13]],
          Promise
        );
      },
    },
    {
      key: 'showEventToast',
      value: function (t) {
        var n = t.data;
        (ye()[n] || !1) && this.eventToast && this.eventToast.show(n);
      },
    },
    {
      key: 'getErrorView',
      value: function () {
        var t = this,
          n = this.state.error,
          o = we()[n];
        return (
          ((n > 0 && !!o) || globals.isTestErrorMode) &&
          v.default.createElement(_.default, {
            funcId: 'error_' + n,
            accessibilityLabelKey: 'error_key_' + n,
            ref: function (n) {
              return (t.errorView = n);
            },
            title: o ? o[1] : null,
            desc: o ? o[2] : null,
            onPress: function (o) {
              return t.onOpenErrorDetailPage(we()[n || o][1], n || o);
            },
            type: 'error',
            closeable: 24 == this.state.error || 25 == this.state.error || P.RSM.dockErrorStatus > 0,
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
          Pe()[t] &&
          v.default.createElement(_.default, {
            funcId: 'reminder_' + t,
            accessibilityLabelKey: 'reminder_key_' + t,
            title: Pe()[t][0],
            desc: Pe()[t][1],
            shouldShowButton: !0,
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
          ? v.default.createElement(B.default, {
              notificationKey: R.StorageKeys.ActivityCN0919Notice,
              content: '\u77f3\u5934\u4e09\u5468\u5e74\uff0c\u8001\u7528\u6237\u514d\u8d39\u9886\u8017\u6750\uff01',
              showCount: 2,
              isModalAllowed: I.default.isActivityCN0919Supported(),
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
          ? v.default.createElement(B.default, {
              notificationKey: R.StorageKeys.SoundPackageUpgrade,
              content: de.home_page_sound_pacakge_upgrade_tip,
              showCount: 1,
              onPress: function () {
                t.navigateTo('SoundPackagePage', {
                  title: de.soundpackage_volume_adjust_title,
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
          n = _e.SuppliesUpgradeTip()[this.state.suppliesUpgradeTipKey];

        return void 0 != n
          ? v.default.createElement(B.default, {
              content: n,
              isArrowStyle: !0,
              onPress: function () {
                t.onPressSuppliesUpgradeTip();
              },
            })
          : null;
      },
    },
    {
      key: 'onPressSuppliesUpgradeTip',
      value: function () {
        var t = this.suppliesItem,
          n = this.suppliesValue,
          o = w.default.percentCalculate(n, t.total);
        t.isUnitsTime || (o = Math.ceil(100 * (1 - n / t.total)));
        var s = o <= 20 && o > 5,
          u = o > 20 ? de.dust_collection_life10 : s ? de.dust_collection_life11 : de.dust_collection_life12,
          l = {
            suppliesKey: t.suppliesKey,
            spent: this.suppliesValue,
            total: t.total,
            gid: t.gid,
            path: t.path,
            image: t.image,
            isNeedTime: t.isNeedTime,
            resetItemButtonText: t.resetItemButtonText,
            resetItemContent: t.resetItemContent,
            title: t.name,
            text: t.text,
            isNeedState: t.isNeedState,
            isUnitsTime: t.isUnitsTime,
            stateText: de.dust_collection_life13.templateStringWithParams({
              state: u,
            }),
          };
        this.props.navigation.navigate('SupplyDetailPage', l);
      },
    },
    {
      key: 'getFurnitureGuideView',
      value: function () {
        return (
          this.state.unEditFurnitures >= 3 &&
          v.default.createElement(_.default, {
            funcId: 'furniture_guide',
            accessibilityLabelKey: 'furniture_key_guide',
            title: de.map_furniture_guide_title,
            desc: de.map_furniture_guide_detail.templateStringWithParams({
              count: this.state.unEditFurnitures,
            }),
            shouldShowButton: !0,
            onPressCloseButton: this.closeFurnitureGuide,
            onPress: this.onPressFurnitureGuide,
            leftIcon: require(d[65]),
            closeable: !0,
            type: 'reminder',
          })
        );
      },
    },
    {
      key: 'getModeSetView',
      value: function () {
        var t = this;
        return v.default.createElement(F.ModeSettingPanel, {
          ref: function (n) {
            t.customModeView = n;
          },
          parent: this,
          isInHomePage: !0,
          tabModeDidChange: function () {
            me.emit(R.NotificationKeys.BottomControlMenuNeedRefresh);
          },
          onPressCustomModePage: this._onPressCustomModePage.bind(this),
          onShowCleanModeDialog: this._onShowCleanModeDialog.bind(this),
          onPressQuestion: this._showMopModePromptDialog.bind(this),
          onPressMore: function () {
            return t.navigateTo('MopModeListPage', {
              title: de.custom_mode_panel_more_mode_title,
              settingPanel: t.customModeView,
            });
          },
        });
      },
    },
    {
      key: 'onPressMopModeItem',
      value: function () {
        this.alert.alert(
          de.rubys_cleanmode_mop_alert_descript,
          '',
          [
            {
              text: de.localization_strings_Setting_RemoteControlPage_51,
              onPress: function () {},
            },
          ],
          {
            cancelable: !1,
          }
        );
      },
    },
    {
      key: 'getTopView',
      value: function () {
        var t = this,
          n = this.context.theme,
          o = v.default.createElement(b.default, {
            shouldShowLine: !0,
            data: [
              {
                title: de.localization_strings_CommonModules_NumberView_0,
                unit: this.state.areaUnit,
                value: this.state.cleanArea,
              },
              {
                title: de.localization_strings_CommonModules_NumberView_1,
                unit: '%',
                value: this.state.battery,
              },
              {
                title: de.localization_strings_CommonModules_NumberView_2,
                unit: 'min',
                value: t.state.cleanTime,
              },
            ],
          }),
          s = v.default.createElement(
            fe,
            {
              style: Ie.topTipView,
            },
            v.default.createElement(
              ge,
              {
                style: {
                  color: n.navTitleColor,
                },
              },
              this.state.topTip
            )
          );
        return v.default.createElement(
          fe,
          {
            style: {
              position: 'absolute',
              top: 74 + Se.AppBarMarginTop,
              left: 0,
              width: Me.get('window').width,
            },
          },
          this.state.topTip.length > 0 ? s : o
        );
      },
    },
    {
      key: 'getMapView',
      value: function () {
        var t,
          n,
          o = this,
          u = {
            height: Me.get('window').height,
            width: Me.get('window').width,
          },
          c = v.default.createElement(E.MapView, {
            style: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'stretch',
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
            left: 40,
            right: 40,
            initSize: u,
            showMapObjectDebugInfo: this.state.mapDebugInfoVisible && !z.DMM.isV1,
            showOnlyGeneralObstacles: this.state.onlyShowGeneralObstacle,
            top: Z.MapViewInnerTop,
            bottom: Z.MapViewInnerBottom,
            mapElementShowFlag: this.state.mapElementShowFlag,
            obstaclePopBoxType: this.state.mapObstaclesPopBoxType,
            showFurnitureIcon: !this.state.showFurnitureModel,
            showBrushCarpet: this.state.showBrushCarpet,
            shouldShowMapObjectBubbleChecker: function (t) {
              var n, s, u;
              return l.default.async(
                function (c) {
                  for (;;)
                    switch ((c.prev = c.next)) {
                      case 0:
                        n = 'photo' == o.state.mapObstaclesPopBoxType && C.default.mapObjectPhotoPrivacyPolicyAgreed && C.default.mapObjectPhotoEnabled;
                        c.next = 3;
                        return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.PhotoPrivacyVersion));

                      case 3:
                        if (
                          ((s = !!c.sent),
                          (u = parseInt(V.MC.photoPrivacyVersionAgreedOnServer) == Ce.RRPhotoPrivacyVersion),
                          !n || 0 != s || -1 != V.MC.photoPrivacyVersionAgreedOnServer)
                        ) {
                          c.next = 12;
                          break;
                        }

                        c.next = 8;
                        return l.default.awrap(o.getPhotoPrivacyVersionAgreedVersionOnServer());

                      case 8:
                        (u = parseInt(V.MC.photoPrivacyVersionAgreedOnServer) == Ce.RRPhotoPrivacyVersion)
                          ? ((0, D.LogEventCommon)('tap_map_object'), t && t())
                          : o.photoPrivacyDialog && o.photoPrivacyDialog.show();
                        c.next = 13;
                        break;

                      case 12:
                        n && 0 == s && !u ? o.photoPrivacyDialog && o.photoPrivacyDialog.show() : ((0, D.LogEventCommon)('tap_map_object'), t && t());

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
            onPressFurnitureBubble: this._onPressFurnitureBubble,
            ref: function (t) {
              return (o.mapView = t);
            },
            showAllBlocksBubble: !0,
            showAllComponetBubble: !0,
            showDockBubbles: !0,
          }),
          p = {};
        this.state.arMapMatchParam && ((p.matchingParams = this.state.arMapMatchParam.transform), (p.meshFileName = this.state.arMapMatchParam.meshFileName));
        var h = v.default.createElement(
            te.default,
            (0, s.default)(
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                },
                ref: function (t) {
                  return (o.arView = t);
                },
                backgroundColor: 'transparent',
                parsedMapData: this.state.parsedMapData,
                originBase64MapData: this.state.originBase64MapData,
                isDarkMode: globals.app.state.theme == ie.Themes.dark,
              },
              p
            )
          ),
          f = {},
          M = E.MapUtilManager.adjustChargerAngle(null == k.MM ? void 0 : null == (t = k.MM.parsedMapData) ? void 0 : null == (n = t.charger) ? void 0 : n.angle);
        k.MM.parsedMapData &&
          k.MM.parsedMapData.charger &&
          (f.adjustCharger = {
            x: k.MM.parsedMapData.charger.x,
            y: k.MM.parsedMapData.charger.y,
            angle: M,
          });
        var S = {};

        if (P.RSM.isOnDock() && k.MM.parsedMapData && k.MM.parsedMapData.robot && k.MM.parsedMapData.charger) {
          var _ = 0;
          P.RSM.isWashing() && (_ = 180);
          var b = M + z.DMM.robotInMap.chargerAngle + _,
            w = {
              x: 2 * Math.cos(E.MapUtilManager.degreeToRad(M)),
              y: 2 * Math.sin(E.MapUtilManager.degreeToRad(M)),
            };
          S.adjustRobot = {
            x: k.MM.parsedMapData.charger.x + w.x,
            y: k.MM.parsedMapData.charger.y + w.y,
            angle: b,
          };
        }

        var y = k.MM.mapRotateAngle[P.RSM.currentMapId] || 0,
          T = v.default.createElement(ae.default, {
            style: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'stretch',
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
            ref: function (t) {
              return (o.mapView3D = t);
            },
            data: le(
              le(
                le(
                  {
                    parsedMapData: k.MM.parsedMapData,
                    originBase64MapData: k.MM.originBase64MapData,
                    dockType: P.RSM.originDockType || 0,
                  },
                  f
                ),
                S
              ),
              {},
              {
                mapRotateAngle: y,
              }
            ),
            isDarkMode: globals.app.state.theme == ie.Themes.dark,
          }),
          B = v.default.createElement(
            fe,
            {
              style: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            v.default.createElement(x.default, {
              shouldShowTip: !this.state.inQuickBuildMap,
              isLocating: this.state.isLocating,
              isWarmUp: P.RSM.isWarmUp,
              style: Ie.loadingView,
            })
          ),
          F = (P.RSM.multiFloorEnabled && 4 == k.MM.maps.length) || (!P.RSM.multiFloorEnabled && 1 == k.MM.maps.length),
          N = I.default.isSupportQuickMapBuilder() && P.RSM.mapSaveEnabled && !F && this.state.noMapTip,
          G = v.default.createElement(A.default, {
            tip: this.state.noMapTip,
            shouldShowGuideButton: P.RSM.mapStatus == P.MapStatus.Has_WithoutSegments && this.state.noMapTip,
            shouldShowQuickCreateMap: N,
            onPressQuickCreateMap: function () {
              var t;
              return null == (t = o.quickCreateMapGuide) ? void 0 : t.show();
            },
            disabled: P.RSM.state == P.RobotState.UPDATING || P.RSM.state == P.RobotState.UNKNOWN,
          });
        if (this.state.inQuickBuildMap && P.RSM.mapStatus == P.MapStatus.None) return B;

        if (this.state.hasGotMap && !this.state.isLocating) {
          if (this.state.shouldShowNoMapTipView) return G;
          var L = c;
          this.state.mapType == De.AR && this.state.arMapMatchParam ? (L = h) : this.state.mapType == De.THREE && (L = T);
          return L;
        }

        return B;
      },
    },
    {
      key: 'getMapEditPopMenu',
      value: function () {
        var t = this;
        return v.default.createElement(G.default, {
          ref: function (n) {
            t.modalMapEditMenu = n;
          },
          mode: G.ModalMapEditMenuMode.Home,
          navigator: this.props.navigation,
          onClose: function () {
            t.modalMapEditMenu.hide();
          },
          parent: this,
          paddingBottom: 0,
          contentBackgroundColor: 'transparent',
          onPressEditZoneButton: this._onPressZoneEditButton,
          onPressVirtualWallButton: this._onPressVirtualWallAndForbiddenZoneButton.bind(this),
          onPressResetMapButton: this._onPressResetMapButton.bind(this),
          onPressCustomOrderButton: this._onPressCustomOrderButton.bind(this),
          onPressMapTypeButton: this._onPressMapTypeButton.bind(this),
          onPressGroundEditButton: this._onPressGroundEditButton.bind(this),
          onPressRotateMapButton: this._onPressRotateMapButton.bind(this),
          onPressFurnitureEditButton: this._onPressFurnitureEditButton.bind(this),
          onPressBackup: this.onPressBackup.bind(this),
          onPressRecoverFromBackup: this.onPressRecoverFromBackup.bind(this),
          onPressCreateMap: function () {
            var n;
            return null == (n = t.modalMapEditMenu) ? void 0 : null == n.hide ? void 0 : n.hide();
          },
          onDeleteMapSuccess: function () {
            var n;
            return null == (n = t.modalMapEditMenu) ? void 0 : null == n.hide ? void 0 : n.hide();
          },
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
        return v.default.createElement(K.default, {
          ref: function (n) {
            return (t.sidebarMenu = n);
          },
          onPressMapEditButton: this._onPressMapEditButton,
          onPressAddZoneButton: this._handleZoneAddButton,
          onPressCustomModeButton: this.onPressCustomModeButton,
          isHiddenMapEdit: !0,
        });
      },
    },
    {
      key: 'getAllMsgViews',
      value: function () {
        var t = this;
        return v.default.createElement(
          fe,
          {
            pointerEvents: 'box-none',
            style: Ie.msgViewsWrap,
          },
          v.default.createElement(S.default, {
            ref: function (n) {
              return (t.eventToast = n);
            },
          }),
          this.getErrorView(),
          this.getReminderView(),
          this.getNotificationView1(),
          this.getNotificationView2(),
          this.getNotificationView3(),
          this.getFurnitureGuideView()
        );
      },
    },
    {
      key: 'getVideoEntryButton',
      value: function () {
        var t = this.context.theme.homeSidebar,
          n =
            P.RSM.hasGotMapFirstTime &&
            P.RSM.state != P.RobotState.UNKNOWN &&
            I.default.isVideoMonitorSupported() &&
            !w.default.isShareUser() &&
            !ve.isMiApp &&
            (z.DMM.isTanosV || z.DMM.isTopazSV || z.DMM.isTanosSV),
          o =
            P.RSM.state != P.RobotState.UPDATING &&
            P.RSM.state != P.RobotState.UNKNOWN &&
            P.RSM.state != P.RobotState.LOCKED &&
            P.RSM.state != P.RobotState.WASHING_DUSTER &&
            P.RSM.state != P.RobotState.COLLECTING_DUST;
        return n
          ? v.default.createElement(N.PureImageButton, {
              image: t.videoIcon,
              imageWidth: 60,
              imageHeight: 60,
              enabled: o,
              style: Ie.videoButton,
              funcId: 'video_entrance',
              onPress: this.onPressVideoButton.bind(this),
            })
          : null;
      },
    },
    {
      key: 'getMapEditSiderMenu',
      value: function () {
        if (!P.RSM.hasGotMapFirstTime) return null;
        if (!P.RSM.mapSaveEnabled) return null;
        var t = this.context.theme.mapEditMenu,
          n = P.RSM.isHomeButtonsEnabled();
        return v.default.createElement(
          fe,
          {
            style: [
              Ie.mapEditMenu,
              {
                backgroundColor: this.context.theme.componentBackgroundColor,
                justifyContent: 'space-evenly',
                borderRadius: 8,
              },
            ],
          },
          I.default.isSupportMainSlideForMapShow() &&
            v.default.createElement(
              fe,
              {
                style: {},
              },
              v.default.createElement(
                N.PureImageButton,
                (0, s.default)(
                  {
                    image: t.typeIcon,
                    imageWidth: 28,
                    imageHeight: 28,
                    enabled: n,
                    funcId: 'home_map_type',
                  },
                  w.default.getAccessibilityLabel('home_map_type', de.map_element_switcher_title),
                  {
                    onPress: this.onPressMapTypeButton.bind(this),
                  }
                )
              ),
              v.default.createElement(fe, {
                style: {
                  backgroundColor: this.context.theme.navBorderColor,
                  height: 1,
                  width: 30,
                  marginTop: 5,
                  alignSelf: 'center',
                },
              })
            ),
          v.default.createElement(
            N.PureImageButton,
            (0, s.default)(
              {
                image: t.forbiddenIcon,
                imageWidth: 28,
                imageHeight: 28,
                enabled: n,
                funcId: 'home_forbidden',
              },
              w.default.getAccessibilityLabel('home_forbidden', de.map_edit_virtual_wall_and_forbidden_zone),
              {
                onPress: this._onPressVirtualWallAndForbiddenZoneButton.bind(this),
              }
            )
          ),
          !I.default.isSupportMainSlideForMapShow() &&
            v.default.createElement(
              fe,
              null,
              v.default.createElement(fe, {
                style: {
                  backgroundColor: this.context.theme.navBorderColor,
                  height: 1,
                  width: 30,
                  marginBottom: 5,
                  alignSelf: 'center',
                },
              }),
              v.default.createElement(
                N.PureImageButton,
                (0, s.default)(
                  {
                    image: t.editIcon,
                    imageWidth: 28,
                    imageHeight: 28,
                    enabled: n,
                    funcId: 'home_edit',
                  },
                  w.default.getAccessibilityLabel('home_edit', de.map_edit_home_menu_title),
                  {
                    onPress: this._onPressZoneEditButton,
                  }
                )
              )
            ),
          v.default.createElement(
            fe,
            null,
            v.default.createElement(fe, {
              style: {
                backgroundColor: this.context.theme.navBorderColor,
                height: 1,
                width: 30,
                marginBottom: 5,
                alignSelf: 'center',
              },
            }),
            v.default.createElement(
              N.PureImageButton,
              (0, s.default)(
                {
                  image: this.context.theme.floorMapItem.editImg,
                  imageWidth: 28,
                  imageHeight: 28,
                  enabled: n,
                  funcId: 'home_more',
                },
                w.default.getAccessibilityLabel('home_more', de.smart_scene_more),
                {
                  onPress: this._onPressMapEditButton,
                }
              )
            )
          )
        );
      },
    },
    {
      key: 'getDebugButton',
      value: function () {
        if (P.RSM.state == P.RobotState.UNKNOWN) return null;
        var t = this.context.theme.homeSidebar,
          n = v.default.createElement(N.PureImageButton, {
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
            style: Ie.debugButton,
            onPress: this.onPressDebugButton.bind(this),
          });
        return z.DMM.isV2 || z.DMM.isV4 || z.DMM.isV5 || I.default.isDebuggableV1User() ? n : null;
      },
    },
    {
      key: 'onPressDebugButton',
      value: function () {
        this.navigateTo('DebugPage', {
          onPressMapDebug: this._onPressMapDebugInfoIndicator,
          onPressObstacleIconDebug: this.checkOnlyShowGeneralObstacle,
          onPressShowFurnitureModel: this.checkShowFurnitureModel,
          onPressShowRubberBrushCarpet: this.checkShowRubberBrushCarpet,
          mapDebugInfoIndicatorActive: this.state.mapDebugInfoVisible,
        });
      },
    },
    {
      key: 'askBeforeBackDock',
      value: function (t) {
        var n;
        null == (n = this.actionSheet) || n.show();
        this.handleBackDockSheetSelectResult = t;
      },
    },
    {
      key: 'handleBackDockSheetAction',
      value: function (t) {
        var n;
        this.handleBackDockSheetSelectResult(this.actionSheetActions[t].action);
        null == (n = this.actionSheet) || n.hide();
      },
    },
    {
      key: 'getMonitorPrivacyDialog',
      value: function () {
        var t = this,
          n = z.DMM.isTopazSV ? de.camera_monitor_voice_privacy_title : de.camera_monitor_privacy_title;
        return v.default.createElement(L.MonitorPrivacyDialogWithNavbar, {
          ref: function (n) {
            return (t.monitorPrivacyDialog = n);
          },
          confirmTextColor: '#007AFF',
          confirmTitle: de.button_title_agree,
          title: n,
          privacyTitle: z.DMM.isTopazSV ? de.monitor_voice_privacy_dialog_title : de.monitor_privacy_dialog_title,
          onConfirm: function () {
            (0, D.LogEventCommon)('monitor_privacy_dialog_confirm');
            C.default.updateMonitorPrivacy(!0, function (n) {
              return l.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        if ((!n && globals.showToast(de.robot_communication_exception), !n)) {
                          o.next = 6;
                          break;
                        }

                        t.saveMonitorPrivacyVersionAgreedVersionOnServer();
                        o.next = 5;
                        return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MonitorPrivacyVersion, R.StorageKeys.MonitorPrivacyVersion));

                      case 5:
                        t.onPressVideoButton();

                      case 6:
                        t.postPrivacyAgreement();

                      case 7:
                      case 'end':
                        return o.stop();
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
            (0, D.LogEventCommon)('monitor_privacy_dialog_cancel');
          },
          onPressLink: function () {
            return t.navigateTo('WebViewPage', {
              title: n,
              refrence: T.default.MonitorPrivacy(),
              isNotMarginBottom: !0,
            });
          },
          onShowListener: function () {
            t.privacyDialogVisible = !0;
            t.props.navigation.setParams({
              onPressLeft: function () {},
            });
          },
          onHideListener: function () {
            t.privacyDialogVisible = !1;
            t.props.navigation.setParams({
              onPressLeft: null,
            });
          },
        });
      },
    },
    {
      key: 'getPhotoPrivacyDialog',
      value: function () {
        var t = this;
        return v.default.createElement(W.PhotoFeaturePrivacyDialog, {
          ref: function (n) {
            return (t.photoPrivacyDialog = n);
          },
          confirmTextColor: '#007AFF',
          confirmTitle: de.button_title_agree,
          cancelTitle: de.alert_button_disagree,
          onConfirm: function () {
            return C.default.updatePhotoPrivacy(!0, function (n) {
              !n && globals.showToast(de.robot_communication_exception);
              n && (0, R.SetStorageKey)(R.StorageKeys.PhotoPrivacyVersion, R.StorageKeys.PhotoPrivacyVersion);
              t.savePhotoPrivacyVersionAgreedVersionOnServer();
              ve.postPrivacyAgreementStatusWithVersion(P.RSM.serverCode, 4, Ce.RRPhotoPrivacyVersion || 1)
                .then(function (t) {})
                .catch(function (t) {});
            });
          },
          onCancel: function () {
            t.overlesslyLoadingView && t.overlesslyLoadingView.showWithText();
            P.RSM.hardLockCameraStatus();
            ve.postPrivacyAgreementStatusWithVersion(P.RSM.serverCode, 5, Ce.RRPhotoPrivacyVersion || 1)
              .then(function (t) {})
              .catch(function (t) {});
            C.default.updatePhotoPrivacy(!1, function (n) {
              !n && globals.showToast(de.robot_communication_exception);
              t.overlesslyLoadingView && t.overlesslyLoadingView.hide();
              P.RSM.unHardLockCameraStatus();
            });
          },
          onPressLink: function () {
            return t.navigateTo('WebViewPage', {
              title: de.map_object_privacy_title,
              refrence: T.default.PhotoPrivacy(),
              isNotMarginBottom: !0,
            });
          },
          onShowListener: function () {
            t.privacyDialogVisible = !0;
            t.props.navigation.setParams({
              onPressLeft: function () {},
            });
          },
          onHideListener: function () {
            t.privacyDialogVisible = !1;
            t.props.navigation.setParams({
              onPressLeft: null,
            });
          },
        });
      },
    },
    {
      key: 'showShareMaskView',
      value: function () {
        return xe > 0
          ? v.default.createElement(fe, {
              style: Ie.maskShare,
            })
          : null;
      },
    },
    {
      key: 'getBackDockSheetView',
      value: function () {
        var t = this,
          n = (P.RSM.isO2Dock() || P.RSM.isO3Dock()) && P.RSM.isWaterBoxCarriageIn && P.RSM.isWaterBoxIn,
          o = n && I.default.isWashThenChargeCmdSupported(),
          s = !P.RSM.isBackDockWashingDusterMode() && P.RSM.backDockResumeFlag == P.BackDockResumeFlag.Has,
          u = P.RSM.isBackDockWashingDusterMode() && P.RSM.backDockResumeFlag == P.BackDockResumeFlag.Has,
          l = P.RSM.backDockResumeFlag == P.BackDockResumeFlag.Has,
          c = [
            {
              title: s ? de.main_page_charge_4 : de.terminate_current_task_back_dock,
              action: 'charge',
            },
          ];
        o &&
          !l &&
          c.push({
            title: de.terminate_current_task_wash_then_back_dock,
            action: 'washThenCharge',
          });
        n &&
          c.push({
            title: u ? de.robot_cmd_resume_back_washing : P.RSM.cleanResumeFlag == P.CleanResumeFlag.None ? de.robot_cmd_start_washing_duster : de.terminate_current_task_then_wash,
            action: 'wash',
          });
        this.actionSheetActions = c;
        return v.default.createElement(N.ActionSheetView, {
          ref: function (n) {
            return (t.actionSheet = n);
          },
          title: l ? null : de.terminate_current_task_back_dock_tip,
          actions: c.map(function (t) {
            return t.title;
          }),
          didSelectRow: this.handleBackDockSheetAction.bind(this),
          onPressCancel: function () {
            return t.actionSheet.hide();
          },
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        console.log('MainPage render', this.timestamp);
        var n = this.context.theme,
          o = Me.get('window'),
          s = o.width,
          u = o.height,
          l = ve.isWindowDisplay ? re.titleBarContentHeight + 14 : re.titleBarContentHeight + Se.StatusBarHeight + Se.AppBarMarginTop,
          c = w.default.iOSAndroidReturn(l, re.titleBarHeight);
        return v.default.createElement(
          v.default.Fragment,
          null,
          v.default.createElement(fe, {
            style: {
              position: 'absolute',
              width: s,
              backgroundColor: n.pageBackgroundColor,
              height: u,
              top: 0,
              left: 0,
            },
          }),
          v.default.createElement(
            fe,
            {
              style: [
                {
                  backgroundColor: n.pageBackgroundColor,
                  height: V.default.sharedCache().ScreenHeight,
                  top: -c,
                },
              ],
            },
            v.default.createElement(
              fe,
              {
                style: [Ie.container],
              },
              this.getMapView(),
              this.getTopView(),
              P.RSM.state != P.RobotState.UNKNOWN &&
                v.default.createElement(H.default, {
                  parent: this,
                  tabDidChange: this.tabDidChange.bind(this),
                  childrenAboveTab: this.getSidebar.bind(this),
                  childrenBelowTab: this.getAllMsgViews.bind(this),
                  cleanSegments: this.state.cleanSegments,
                  switchSegmentTabDidFail: this.showEnableMapSaveDialog.bind(this),
                  infoWrapperData: this.state.infoWrapperData,
                  askBeforeBackDock: this.askBeforeBackDock.bind(this),
                  updateParent: function (n) {
                    t.setState(le({}, n));
                  },
                }),
              v.default.createElement(N.AlertView, {
                ref: function (n) {
                  return (t.alert = n);
                },
                isModal: !0,
                noAnimated: !0,
              }),
              this.showShareMaskView(),
              v.default.createElement(N.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'loading_view_loading',
                closeAccessibilityLabelKey: 'loading_view_loading_close',
                ref: function (n) {
                  t.loadingView = n;
                },
                showButton: !0,
              }),
              v.default.createElement(N.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'over_loading_view_loading',
                closeAccessibilityLabelKey: 'over_loading_view_loading_close',
                ref: function (n) {
                  t.overlesslyLoadingView = n;
                },
                showButton: !0,
              }),
              this.getBackDockSheetView(),
              this.getModeSetView(),
              this.getMapEditSiderMenu(),
              this.getVideoEntryButton(),
              this.getMapEditPopMenu(),
              this.getMonitorPrivacyDialog(),
              this.getPhotoPrivacyDialog(),
              this.getDebugButton(),
              v.default.createElement(oe.default, {
                isModal: (ve.isMiApp, !0),
                ref: function (n) {
                  t.dialogView = n;
                },
              }),
              v.default.createElement($.default, {
                isModal: (ve.isMiApp, !0),
                ref: function (n) {
                  t.guideView = n;
                },
                onDismiss: function () {
                  var n, o, s;
                  (null == (n = t.forceUpdateView) ? void 0 : null == (o = n.state) ? void 0 : o.modalVisible) || null == (s = t.dialogView) || null == s.show || s.show();
                },
              }),
              v.default.createElement(ee.default, {
                ref: function (n) {
                  t.mopModeGuide = n;
                },
                isModal: !0,
                parent: this,
                bgImage: this.mopModeGuideData.bgImage,
                topTitle: this.mopModeGuideData.topTitle,
                context: this.mopModeGuideData.context,
                buttonInfo: this.mopModeGuideData.buttonInfo,
                buttonFuncId: ['mop_mode_guide_ok'],
              }),
              v.default.createElement(ee.default, {
                ref: function (n) {
                  t.quickCreateMapGuide = n;
                },
                isModal: !0,
                parent: this,
                bgImage: n.guideImages.createMap,
                topTitle: de.multi_map_start_build_title,
                context: de.multi_map_start_build_text_1 + '\n' + de.multi_map_start_build_text_2 + '\n' + de.multi_map_start_build_text_3 + '\n' + de.multi_map_start_build_text_4,
                buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
                buttonFuncId: ['quick_create_map_home_confirm'],
                onPressSingleButton: function () {
                  t.onPressQuickCreateMap(function () {
                    var n;
                    null == (n = t.quickCreateMapGuide) || n.dismissModalView();
                  });
                },
                hasCloseButton: !0,
              }),
              v.default.createElement(se.default, {
                ref: function (n) {
                  return (t.chooseMapAlert = n);
                },
                onPressLeft: function () {
                  var n;
                  null == (n = t.chooseMapAlert) || null == n.hide || n.hide();
                  y.default
                    .updateUnsaveMap(P.UnsaveMapHandle.Ignore)
                    .then(function () {
                      globals.showToast(de.map_reset_page_operate_success);
                    })
                    .catch(function (t) {
                      globals.showToast(de.map_object_ignore_failed);
                    });
                },
                onRotateMap: function (n) {
                  t.setRotateMapAngle(n);
                },
                onPressRight: function () {
                  var n;
                  null == (n = t.chooseMapAlert) || null == n.hide || n.hide();
                  y.default
                    .updateUnsaveMap(P.UnsaveMapHandle.Load)
                    .then(function () {
                      globals.showToast(de.map_reset_page_operate_success);
                    })
                    .catch(function (t) {
                      globals.showToast(de.map_object_ignore_failed);
                    });
                },
              }),
              v.default.createElement(ne.default, {
                ref: function (n) {
                  return (t.mapTypeSwitcher = n);
                },
                paddingBottom: 0,
                onClose: this.onMapTypeClose,
                currentType: this.state.mapType,
                mapElementShowFlag: this.state.mapElementShowFlag,
                shouldSelectType: this.shouldSelectType,
                onSelectType: this.mapTypeDidChange,
                onRotateMap: this.onRotateMap,
                onChangeMapElementShow: this.onChangeMapElementShow,
              }),
              v.default.createElement(ee.default, {
                ref: function (n) {
                  t.forceUpdateView = n;
                },
                isModal: !ve.isMiApp && !0,
                parent: this,
                bgImage: this.context.theme.guideImages.newFirmware,
                topTitle: de.new_firmware_detected,
                context: de.new_firmware_detected1,
                buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
                buttonFuncId: ['force_update_firmware_view'],
                onPressSingleButton: function () {
                  t.openDeviceUpgradePage();
                },
              }),
              v.default.createElement(se.LoadBackupMapView, {
                ref: function (n) {
                  return (t.loadBakMapView = n);
                },
                mapID: P.RSM.currentMapId,
                onPressLeft: function () {
                  var n;
                  return null == (n = t.loadBakMapView) ? void 0 : n.hide();
                },
                onPressRight: function () {
                  return t.loadBackupMapView();
                },
              })
            )
          )
        );
      },
    },
    {
      key: 'addGuide',
      value: function (t) {
        var n = this;
        setTimeout(function () {
          var o, s;
          null == (o = n.guideView) || o.add(t);
          null == (s = n.guideView) || s.show();
        }, 50);
      },
    },
    {
      key: 'addDialog',
      value: function (t, n) {
        var o = this;
        this.newFirmwareDetected
          ? null == n || n(!1)
          : setTimeout(function () {
              var s, u, l;
              (null == (s = o.dialogView) || s.add(t), null == (u = o.guideView) ? void 0 : u.isVisible) || (null == (l = o.dialogView) || l.show(), null == n || n(!0));
            }, 50);
      },
    },
    {
      key: 'openDeviceUpgradePage',
      value: function () {
        setTimeout(function () {
          ve.openDeviceUpgradePage();
        }, 500);
      },
    },
    {
      key: 'tabDidChange',
      value: function (t) {
        var n, o, s, u;
        return l.default.async(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  if (t != this.tabIndex) {
                    c.next = 2;
                    break;
                  }

                  return c.abrupt('return');

                case 2:
                  if (((this.tabIndex = t), (n = t == H.TabGlobal), (o = t == H.TabNeutral), n || o || this.state.mapType == De.NORMAL)) {
                    c.next = 8;
                    break;
                  }

                  c.next = 8;
                  return l.default.awrap(this.changeMapType(De.NORMAL));

                case 8:
                  if (!n || this.state.mapType == this.lastMapType) {
                    c.next = 11;
                    break;
                  }

                  c.next = 11;
                  return l.default.awrap(this.changeMapType(this.lastMapType));

                case 11:
                  if ((this.checkMapStatus(), !z.DMM.isGarnet || 4 != P.RSM.mopModeId || !n)) {
                    c.next = 16;
                    break;
                  }

                  c.next = 15;
                  return l.default.awrap(y.default.setCustomMopById(null == (s = J.ModeDataInstance.modePannelCustomMops[0]) ? void 0 : s.id));

                case 15:
                  null == (u = this.customModeView) || u.modeTabDidChange(0);

                case 16:
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
      key: 'postPrivacyAgreement',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return l.default.awrap(ve.postPrivacyAgreementStatus(P.RSM.serverCode, 2));

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
      key: 'onPressVideoButton',
      value: function () {
        var t,
          n,
          o,
          s,
          u,
          c = this;
        return l.default.async(
          function (p) {
            for (;;)
              switch ((p.prev = p.next)) {
                case 0:
                  if (!((z.DMM.isTanosV && ve.apiLevel < 10005) || ((z.DMM.isTopazSV || z.DMM.isTanosSV) && ve.apiLevel < 10010))) {
                    p.next = 3;
                    break;
                  }

                  this.alert &&
                    this.alert.customAlert('', de.map_object_app_version_tip, null, null, {
                      shouldShowCancel: !1,
                    });
                  return p.abrupt('return');

                case 3:
                  if (C.default.realTimeMonitorEnabled) {
                    p.next = 6;
                    break;
                  }

                  this.alert &&
                    this.alert.customAlert(
                      '',
                      de.open_real_monitor_firstly_tip,
                      function () {
                        (0, D.LogEventCommon)('open_real_time_video_alert_confirm');
                        c.navigateTo('CameraSettingDetail');
                      },
                      function () {
                        (0, D.LogEventCommon)('open_real_time_video_alert_cancel');
                      },
                      {
                        confirmTitle: de.goto_setting_on,
                        confirmColor: '#007AFF',
                      }
                    );
                  return p.abrupt('return');

                case 6:
                  -1 == parseInt(V.MC.MonitorPrivacyVersionAgreedOnServer) && this.getMonitorPrivacyVersionAgreedVersionOnServer();
                  t = parseInt(V.MC.MonitorPrivacyVersionAgreedOnServer) == Ce.RRMonitorPrivacyVersion;
                  p.next = 10;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MonitorPrivacyVersion));

                case 10:
                  if (((n = p.sent), (o = !!n || t), (C.default.monitorPrivacyPolicyAgreed && o) || !C.default.hasGot)) {
                    p.next = 15;
                    break;
                  }

                  this.monitorPrivacyDialog && this.monitorPrivacyDialog.show();
                  return p.abrupt('return');

                case 15:
                  p.next = 18;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.HasSetInitialGesturePassword));

                case 18:
                  s = !!p.sent;

                  u = function (t) {
                    var n = c;
                    c.navigateTo('GesturePasswordPage', {
                      mode: t,
                      didSetPassword:
                        0 == t &&
                        function () {
                          c.navigateTo('MonitorPage', {
                            monitorPageUnmount: function () {
                              n.forceUpdate();
                            },
                          });
                        },
                      enabledTitleBarUpdate: function () {
                        c.shouldUpdateNavbar = !0;
                      },
                      shouldShowSkip: 0 == t,
                      skip:
                        0 == t &&
                        function () {
                          return l.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    c.navigateTo('MonitorPage', {
                                      monitorPageUnmount: function () {
                                        n.forceUpdate();
                                      },
                                    });
                                    t.next = 3;
                                    return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.HasSetInitialGesturePassword, R.StorageKeys.HasSetInitialGesturePassword));

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

                  this.shouldUpdateNavbar = !1;

                  (function () {
                    P.RSM.secPasswordEnabled
                      ? u(1)
                      : s
                      ? c.navigateTo('MonitorPage', {
                          enabledTitleBarUpdate: function () {
                            c.shouldUpdateNavbar = !0;
                          },
                          monitorPageUnmount: function () {
                            c.forceUpdate();
                          },
                        })
                      : u(0);
                  })();

                case 23:
                case 'end':
                  return p.stop();
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
        n.shareView &&
          (n.shareView.capture(k.MM.mapData, function (o, s) {
            console.log('share path -' + s + ' - name - ' + o);
            n.setState({
              screenShotPath: s,
            });
            ve.openShareListBar(
              '\u5206\u4eab',
              '\u5206\u4eab',
              {
                uri: s,
              },
              ''
            );
            t.updateNaviItemsIfNeeded(
              t.settingIconConfig,
              le(
                le({}, t.shareIconConfig),
                {},
                {
                  enabled: !0,
                }
              )
            );
          }),
          (this.shareIconConfig.enabled = !1),
          this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            le(
              le({}, this.shareIconConfig),
              {},
              {
                enabled: !1,
              }
            )
          ));
      },
    },
    {
      key: 'showEnableMapSaveDialog',
      value: function () {
        var t = this;
        setTimeout(function () {
          t.alert &&
            t.alert.customAlert(
              de.open_map_save_mode_tip,
              '',
              function () {
                I.default.isMultiFloorSupported();
                var n = 'MultiFloorPage';
                t.navigateTo(n, null);
              },
              null,
              {
                confirmTitle: de.goto_setting_on,
              }
            );
        }, 100);
      },
    },
    {
      key: 'checkShouldShowAvoidCollisionGuide',
      value: function () {
        var t,
          n = this;
        return l.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  if (P.RSM.state != P.RobotState.UPDATING && I.default.isAvoidCollisionSupported() && !this.hasCheckedCollisionAlert) {
                    o.next = 2;
                    break;
                  }

                  return o.abrupt('return');

                case 2:
                  o.next = 4;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AvoidCollisionGuide));

                case 4:
                  t = !!o.sent;
                  this.hasCheckedCollisionAlert = !0;
                  C.default.cameraEnabled &&
                    !t &&
                    setTimeout(function () {
                      return l.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                n.addGuide([
                                  {
                                    bgImage: n.context.theme.guideImages.avoidCollision,
                                    topTitle: de.avoid_collision_mode,
                                    context: de.structure_light_tip_3,
                                    buttonFuncId: ['collision_guide_ok'],
                                    switchInfo: {
                                      on: !0,
                                      switchValueChanged: function (t) {
                                        n.guideView.toggleSwitch(t);
                                      },
                                    },
                                    autoNextPage: !1,
                                    onPressSingleButton: function () {
                                      n.guideView.startLoading();
                                      y.default
                                        .setCollisionAvoidStatus(n.guideView.isSwitchOn ? 1 : 0)
                                        .then(function (t) {
                                          n.guideView.nextOrHide();
                                        })
                                        .catch(function (t) {
                                          globals.showToast(de.robot_communication_exception);
                                          n.guideView.nextOrHide();
                                        })
                                        .finally(function () {
                                          n.guideView.endLoading();
                                        });
                                    },
                                  },
                                ]);
                                t.next = 3;
                                return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.AvoidCollisionGuide, 'true'));

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
                    }, 100);

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
      key: 'checkShouldShowPetModeAlert',
      value: function () {
        var t = this;

        if (P.RSM.state != P.RobotState.UPDATING && !C.default.hasShownPetModeAlert && I.default.isSupportPetModeAlert() && !this.hasCheckedPetAlert && !P.RSM.isRunning) {
          this.hasCheckedPetAlert = !0;
          if (C.default.cameraEnabled)
            setTimeout(function () {
              U.Log.log(U.LogTypes.Home, 'begin update pet status,' + JSON.stringify(C.default), U.InfoColors.Normal, !0);
              t.addGuide([
                {
                  bgImage: t.context.theme.guideImages.pet,
                  topTitle: de.pet_guide_title,
                  context: de.if_has_pet_tip_detail,
                  buttonFuncId: ['pet_guide_ok'],
                  checkBoxInfo: {
                    selected: !1,
                    onSelect: function (n) {
                      t.guideView.selectCheckBox(n);
                    },
                  },
                  onPressSingleButton: function () {
                    C.default.updatePetModeEnabled(t.guideView.isCheckBoxOn);
                  },
                },
              ]);
            }, 150);
          else if (z.DMM.isTanosSPlus || z.DMM.isTanosSMax) return;
        }
      },
    },
    {
      key: 'updateCustomCleanModeForMap',
      value: function () {
        return l.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.next = 2;
                  return l.default.awrap(k.MM.getCustomCleanMode());

                case 2:
                  if ((this.mapView && this.mapView.setAllCleanMopMode(k.MM.customCleanModes), this.handleCleanWaterModeDidChange(), !I.default.isMultiFloorSupported())) {
                    t.next = 7;
                    break;
                  }

                  t.next = 7;
                  return l.default.awrap(k.MM.getMultiMaps());

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
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap(k.MM.getCleanSequence());

                case 2:
                  null == (t = this.mapView) || t.setCleanSequence(k.MM.cleanSequence.concat());

                case 3:
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
      key: 'onPressMapTypeButton',
      value: function () {
        var t;
        null == (t = this.mapTypeSwitcher) || t.show();
      },
    },
    {
      key: 'customModeDidChange',
      value: function (t, n, o) {
        return l.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if (((s.prev = 0), !P.RSM.isSupportFeature(118))) {
                    s.next = 6;
                    break;
                  }

                  s.next = 4;
                  return l.default.awrap(y.default.setCleanMotorMode(t, n));

                case 4:
                  s.next = 12;
                  break;

                case 6:
                  s.next = 8;
                  return l.default.awrap(y.default.setCustomMode(t));

                case 8:
                  s.next = 11;
                  return l.default.awrap(y.default.setWaterBoxMode(n));

                case 11:
                  s.sent;

                case 12:
                  P.RSM.fanPower = t;
                  P.RSM.waterBoxMode = n;
                  this.sidebarMenu && this.sidebarMenu.updateModeIcon(t, n, P.RSM.mopMode);
                  o && this.customModeView && this.customModeView.hide();
                  console.log('set mode rpc success,  cleanMode- ' + t + ' waterMode - ' + n);
                  me.emit(R.NotificationKeys.DidReceiveSpecialEvent, {
                    data: R.EventKeys.CleanWaterModeDidChange,
                  });
                  s.next = 24;
                  break;

                case 20:
                  s.prev = 20;
                  s.t0 = s.catch(0);
                  this.customModeView && this.customModeView.showToast(de.robot_communication_exception);
                  console.log('customModeDidChange  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                case 24:
                case 'end':
                  return s.stop();
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
        this.sidebarMenu && this.sidebarMenu.updateModeIcon(t, n, o);
      },
    },
    {
      key: 'handleMapSegmentDidChangeEvent',
      value: function () {
        return l.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  this.mapView && this.mapView.resetSelectBlocks();
                  this.checkMapStatus();
                  t.next = 4;
                  return l.default.awrap(k.MM.getMap(!0));

                case 4:
                  t.next = 6;
                  return l.default.awrap(k.MM.updateRoomNameMapping());

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
        var t = this.tabIndex == H.TabSegment,
          n = this.tabIndex == H.TabGlobal,
          o = (P.RSM.isCustomCleanMode() || P.RSM.isCustomWaterMode() || P.RSM.isCustomMopMode()) && (n || t),
          s = P.RSM.isSegmentCleanTaskShouldResume() || P.RSM.state == P.RobotState.SEGMENT_CLEAN;

        if (o) {
          var u = null;
          u = t
            ? s
              ? E.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
              : E.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
            : E.MapModelInCleanMode.Global_Clean_With_Clean_Type;
          this.mapView && this.mapView.changeMapViewMode(u);
          o && this.mapView && this.mapView.setAllCleanMopMode(k.MM.customCleanModes);
        } else {
          n && this.mapView && this.mapView.changeMapViewMode(E.MapModelInCleanMode.Global_Clean);
          t && this.mapView && this.mapView.changeMapViewMode(s ? E.MapModelInCleanMode.Segment_Clean_Read_Only : E.MapModelInCleanMode.Segment_Clean_Edit);
        }
      },
    },
    {
      key: 'onOpenErrorDetailPage',
      value: function (t, n) {
        this.navigateTo('ErrorDetailPageNew', {
          title: de.localization_strings_Main_Error_ErrorDetailPage_0,
          code: n,
        });
      },
    },
    {
      key: '_onPressVirtualWallAndForbiddenZoneButton',
      value: function () {
        this.navigateTo('MapEditForbiddenZonePage', {
          title: de.map_edit_virtual_wall_and_forbidden_zone,
        });
      },
    },
    {
      key: '_onPressResetMapButton',
      value: function () {
        var t = this;

        if (I.default.isMultiFloorSupported() || P.RSM.mapSaveEnabled) {
          I.default.isMultiFloorSupported();
          var n = 'MultiFloorPage';
          this.navigateTo(n, {
            title: de.map_edit_title,
          });
        } else
          setTimeout(function () {
            t.alert &&
              t.alert.customAlert(
                de.open_map_save_mode_tip,
                '',
                function () {
                  return t.navigateTo('MultiFloorPage');
                },
                null,
                {
                  confirmTitle: de.goto_setting_on,
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
              de.main_page_top_tip_has_selected.templateStringWithParams({
                zones: t.length,
              })
            : de.home_menu_select_zone_tip;
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
              de.mainpage_top_tip_has_drawed.templateStringWithParams({
                zones: t,
              })
            : de.home_menu_draw_zone_tip;
        this.setState({
          topTip: n,
        });
      },
    },
    {
      key: 'didTapMapWhenNoBlocks',
      value: function () {
        var t = {
            text: de.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          n = {
            text: de.go_to_settings,
            onPress: this._onPressZoneEditButton,
          };
        globals.Alert.alert(de.mainpage_unknown_segment_click_tips, '', [t, n]);
      },
    },
    {
      key: 'closeReminder',
      value: function () {
        P.RSM.closeReminder();
        this.state.currentReminder = null;
        this.forceUpdate();
      },
    },
    {
      key: 'closeError',
      value: function () {
        return l.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  if ((P.RSM.closeError(), (this.state.error = 0), this.forceUpdate(), !(P.RSM.dockErrorStatus > 0))) {
                    t.next = 6;
                    break;
                  }

                  t.next = 6;
                  return l.default.awrap(y.default.resolveError(P.RSM.dockErrorStatus));

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
        we()[n] &&
          this.props.navigation &&
          this.navigateTo('ErrorDetailPageNew', {
            title: de.localization_strings_Main_Error_ErrorDetailPage_0,
            code: n,
          });
      },
    },
    {
      key: '_onPressMapObjectBubble',
      value: function (t, n) {
        var o = this,
          s = C.default.mapObjectPhotoEnabled;
        (0, D.LogEventCommon)('tap_map_object_bubble', {
          photoEnabled: s,
        });
        this.navigateTo('MapObjectPhotoPage', {
          title: de.obstacle_pop_type_ai,
          enabledTitleBarUpdate: function () {
            o.shouldUpdateNavbar = !0;
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
        this.navigateTo('StructureLightSetting');
      },
    },
    {
      key: '_onPressCustomModePage',
      value: function () {
        var t;
        null == (t = this.customModeView) || t.hide();
        this.navigateTo('MapEditZoneModePage', {
          parent: this,
          action: 'custom',
          title: de.map_edit_bottom_menu_mode,
        });
      },
    },
    {
      key: '_onPressCarpetBubble',
      value: function (t) {
        var n = !t || !t.custom;
        this.navigateTo('MapCarpetInfoPage', {
          parent: this,
          title: de.carpet_bubble_name,
          carpetRect: t,
          showBottomView: n,
        });
      },
    },
    {
      key: '_onPressDockBubble',
      value: function () {
        P.RSM.isCollectDock()
          ? this.props.navigation.navigate('DustCollectionModeSetting', {
              title: de.dust_collection_setting_title,
              parent: this,
            })
          : P.RSM.isO2Dock() &&
            this.props.navigation.navigate('WashTowelSettingNew', {
              parent: this,
              dustCollectionVisible: P.RSM.isCollectDustDock,
            });
      },
    },
    {
      key: '_onPressChargerErrorBubble',
      value: function () {
        P.RSM.errorCode > 0 && this.onOpenErrorDetailPage('', P.RSM.errorCode);
      },
    },
    {
      key: 'switchFurnitureZoneClean',
      value: function (t) {
        var n,
          o,
          s = this;
        null == (n = this.mapView) || n.resetSelectBlocks();
        null == (o = this.mapView) || o.clearRectangles();
        setTimeout(function () {
          var n, o;
          null == (n = s.mapView) || n.changeMapViewMode(E.MapModelInCleanMode.Zone_Clean_Edit);
          null == (o = s.mapView) || o.addRectangle(t);
          me.emit(R.NotificationKeys.BottomControlDoAction, {
            cmd: 'changeTab',
            data: 2,
          });
        }, 500);
      },
    },
    {
      key: '_onPressCustomOrderButton',
      value: function () {
        this.navigateTo('MapEditZoneOrderPage', {
          action: 'order',
          title: de.map_edit_bottom_menu_order,
        });
      },
    },
    {
      key: '_onPressMapTypeButton',
      value: function () {
        var t, n;
        null == (t = this.modalMapEditMenu) || t.hide();
        null == (n = this.mapTypeSwitcher) || n.show();
      },
    },
    {
      key: '_onPressGroundEditButton',
      value: function () {
        I.default.isSupportFloorEdit() && I.default.isCarpetSupported()
          ? this.navigateTo('MapEditGroundPage', {
              title: de.map_edit_ground_material_title,
            })
          : I.default.isSupportFloorEdit()
          ? this.navigateTo('MapEditFloorMaterialPage', {
              title: de.map_edit_floor_wood_tile,
            })
          : I.default.isCarpetSupported() &&
            this.navigateTo('MapCarpetIgnorePage', {
              action: I.default.isMapCarpetAddSupport() ? P.CarpetEditMode.CarpetIgnore | P.CarpetEditMode.CarpetAdd : P.CarpetEditMode.CarpetIgnore,
              title: de.map_edit_carpet_ignore_title,
            });
      },
    },
    {
      key: '_onPressRotateMapButton',
      value: function () {
        this.navigateTo('MapEditRotatePage', {
          title: de.map_edit_rotate_map_title,
        });
      },
    },
    {
      key: '_onPressFurnitureEditButton',
      value: function () {
        this.navigateTo('MapEditFurniturePage', {
          title: de.map_edit_furniture_title,
        });
      },
    },
    {
      key: 'onPressBackup',
      value: function () {
        var t, n;
        null == (t = (n = this.modalMapEditMenu).hide) || t.call(n);
        P.RSM.isRunning
          ? (0, X.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
              globals.showToast(de.robot_communication_exception);
            })
          : this.backup();
      },
    },
    {
      key: 'backup',
      value: function () {
        var t = new Y.MultiMapDataProvider();
        if (P.RSM.isRunning)
          (0, X.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
            globals.showToast(de.robot_communication_exception);
          });
        else {
          var n = {
            text: de.localization_strings_Setting_RemoteControlPage_51,
          };
          null == t ||
            null == t.backupMap ||
            t
              .backupMap(P.RSM.currentMapId)
              .then(function () {
                globals.Alert.alert(de.backup_success_hint, '', [n]);
                k.MM.getMultiMaps();
              })
              .catch(function () {
                globals.showToast(de.robot_communication_exception);
              });
        }
      },
    },
    {
      key: 'loadBackupMapView',
      value: function () {
        var t,
          n = this;
        null == (t = this.loadBakMapView) || null == t.hide || t.hide();
        globals.Alert.alert('', de.recover_map_hint, [
          {
            text: de.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          {
            text: de.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              var t = new Y.MultiMapDataProvider();
              n.loadBakMapView.hide();
              null == t ||
                null == t.recoverMultiMap ||
                t
                  .recoverMultiMap(P.RSM.currentMapId)
                  .then(function (t) {
                    Y.MapListDataProvider.syncSmartSceneIfNeeded();
                    console.log('RecoverMultiMap: Success');
                  })
                  .catch(function (t) {
                    globals.showToast(de.robot_communication_exception);
                  });
            },
          },
        ]);
      },
    },
    {
      key: 'onPressRecoverFromBackup',
      value: function () {
        var t, n, o;
        null == (t = (n = this.modalMapEditMenu).hide) || t.call(n);
        P.RSM.isRunning
          ? (0, X.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
              globals.showToast(de.robot_communication_exception);
            })
          : null == (o = this.loadBakMapView) || o.show();
      },
    },
    {
      key: 'onPressQuickCreateMap',
      value: function (t) {
        var n = this;

        if (P.RSM.isRunning) {
          (0, X.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
            globals.showToast(de.robot_communication_exception);
          });
          return void (null == t || t());
        }

        var o,
          s = new Y.MultiMapDataProvider();
        I.default.isCarpetSupported() && !z.DMM.isGarnet
          ? (null == (o = this.quickCreateMapGuide) || o.startLoading(),
            y.default
              .getCarpetCleanMode()
              .then(function (t) {
                if (t.result[0].carpet_clean_mode == _e.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden) {
                  var o = {
                      text: de.localization_strings_Main_MainPage_11,
                    },
                    u = {
                      text: de.go_to_settings,
                      onPress: function () {
                        return n.props.navigation.navigate('CarpetCleanModeSetting');
                      },
                    };
                  globals.Alert.alert(de.quick_create_map_alert_title, '', [o, u]);
                } else s.quickCreateMap();
              })
              .catch(function (t) {
                globals.showToast(de.map_object_ignore_failed);
              })
              .finally(function () {
                var o;
                null == (o = n.quickCreateMapGuide) || o.endLoading();
                null == t || t();
              }))
          : (s.quickCreateMap(), null == t || t());
      },
    },
    {
      key: 'showDockGuideIfNeeded',
      value: function () {
        var t, n, o;
        return l.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if ([z.Products.TanosSPlus, z.Products.TanosS].hasElement(z.DMM.currentProduct)) {
                    s.next = 3;
                    break;
                  }

                  return s.abrupt('return');

                case 3:
                  if (P.RSM.isCollectDock()) {
                    s.next = 5;
                    break;
                  }

                  return s.abrupt('return');

                case 5:
                  s.next = 7;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.DockGuide));

                case 7:
                  if (!s.sent) {
                    s.next = 10;
                    break;
                  }

                  return s.abrupt('return');

                case 10:
                  if ((t = V.MC.serialNumber)) {
                    s.next = 13;
                    break;
                  }

                  return s.abrupt('return');

                case 13:
                  n = Q.default.sharedManager().dockSetSNPrefixes;

                  o = function (t) {
                    return l.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              if (((n.t0 = t), !n.t0)) {
                                n.next = 4;
                                break;
                              }

                              n.next = 4;
                              return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.DockGuide, R.StorageKeys.DockGuide));

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
                  };

                  (function () {
                    var o = !1;
                    n.forEach(function (n) {
                      t.startsWith(n) && (o = !0);
                    });
                    return o;
                  })()
                    ? this.addDialog(
                        [
                          {
                            bgImage: this.context.theme.guideImages.dockGuide1,
                            topTitle: de.dock_guide_title,
                            context: de.dock_guide_content_1,
                            buttonFuncId: ['dock_detect_guide_1_ok'],
                          },
                        ],
                        o
                      )
                    : this.addDialog(
                        [
                          {
                            bgImage: this.context.theme.guideImages.dockGuide0,
                            topTitle: de.dock_guide_title,
                            context: de.dock_guide_content_0,
                            buttonInfo: [de.next_step],
                            buttonFuncId: ['dock_detect_guide_0_ok'],
                          },
                          {
                            bgImage: this.context.theme.guideImages.dockGuide1,
                            topTitle: de.dock_guide_title,
                            context: de.dock_guide_content_1,
                            buttonFuncId: ['dock_detect_guide_1_ok'],
                          },
                        ],
                        o
                      );

                case 17:
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
      key: '_onShowCleanModeDialog',
      value: function (t) {
        var n,
          o,
          s = this;
        return l.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  n = R.StorageKeys.ExquisiteCleanbyGuide + '_' + t;
                  u.next = 3;
                  return l.default.awrap((0, R.GetStorageKey)(n));

                case 3:
                  o = u.sent;
                  !o &&
                    this.setState(
                      {
                        mopModeGuideMode: t,
                      },
                      function () {
                        ke.setTimeout(function () {
                          var t;
                          return l.default.async(
                            function (o) {
                              for (;;)
                                switch ((o.prev = o.next)) {
                                  case 0:
                                    null == (t = s.mopModeGuide) || null == t.show || t.show();
                                    o.next = 3;
                                    return l.default.awrap((0, R.SetStorageKey)(n, n));

                                  case 3:
                                  case 'end':
                                    return o.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        }, 50);
                      }
                    );

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
      key: '_onShowGuideBubble',
      value: function () {
        var t,
          n,
          o,
          s = this;
        return l.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  t = R.StorageKeys.FindCarpetbyGuide;
                  u.next = 3;
                  return l.default.awrap((0, R.GetStorageKey)(t));

                case 3:
                  if (((n = u.sent), !k.MM.hasCarpetMap)) {
                    u.next = 11;
                    break;
                  }

                  if (!!n) {
                    u.next = 11;
                    break;
                  }

                  u.next = 9;
                  return l.default.awrap((0, R.SetStorageKey)(t, t));

                case 9:
                  ke.setTimeout(function () {
                    s.mapView && s.mapView.findCarpetAndShowGuide();
                  }, 50);
                  return u.abrupt('return');

                case 11:
                  if (!P.RSM.isCollectDustDock) {
                    u.next = 23;
                    break;
                  }

                  if (!(!k.MM.hasCarpetMap || (k.MM.hasCarpetMap && n))) {
                    u.next = 23;
                    break;
                  }

                  o = R.StorageKeys.DustCollectionSequencebyGuide;
                  u.next = 16;
                  return l.default.awrap((0, R.GetStorageKey)(o));

                case 16:
                  if (((n = u.sent), !!n)) {
                    u.next = 22;
                    break;
                  }

                  u.next = 21;
                  return l.default.awrap((0, R.SetStorageKey)(o, o));

                case 21:
                  ke.setTimeout(function () {
                    s.mapView && s.mapView.showChargerBubble();
                  }, 50);

                case 22:
                  Q.default
                    .sharedManager()
                    .getConfig()
                    .finally(function () {
                      s.showDockGuideIfNeeded();
                    });

                case 23:
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
      key: '_showMopModePromptDialog',
      value: function (t) {
        var n = this;
        this.setState(
          {
            mopModeGuideMode: t,
          },
          function () {
            ke.setTimeout(function () {
              var t;
              null == (t = n.mopModeGuide) || null == t.show || t.show();
            }, 50);
          }
        );
      },
    },
    {
      key: 'mapSaveSetting',
      value: function () {
        I.default.isMultiFloorSupported();
        var t = 'MultiFloorPage';
        this.navigateTo(t, {
          title: de.setting_robot_setting,
        });
      },
    },
    {
      key: 'checkShouldShowMapSaveGuide',
      value: function () {
        var t,
          n = this;
        return l.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  if (!this.hasCheckedMapSaveGuide) {
                    o.next = 2;
                    break;
                  }

                  return o.abrupt('return');

                case 2:
                  this.hasCheckedMapSaveGuide = !0;
                  o.next = 5;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapSaveGuide));

                case 5:
                  if (((t = !!o.sent), P.RSM.mapSaveEnabled || t)) {
                    o.next = 10;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.mapSave,
                      topTitle: de.map_edit_map_lab_save_map,
                      context: de.map_edit_map_lab_save_map_des + '\n',
                      buttonFuncId: ['map_save_guide_ok'],
                      switchInfo: {
                        on: !1,
                        switchValueChanged: function (t) {
                          n.guideView.toggleSwitch(t);
                        },
                      },
                      autoNextPage: !1,
                      onPressSingleButton: function () {
                        if (n.guideView.isSwitchOn) {
                          var t = new Y.MapListDataProvider();
                          n.guideView.startLoading();
                          t.mapSaveSwitch(!0)
                            .then(function () {
                              n.checkShouldShowMultiFloorGuide();
                            })
                            .catch(function (t) {
                              n.guideView.nextOrHide();
                            })
                            .finally(function () {
                              n.guideView.endLoading();
                            });
                        } else n.guideView.nextOrHide();
                      },
                    },
                  ]);
                  o.next = 10;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapSaveGuide, 'true'));

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
      key: 'checkShouldShowMultiFloorGuide',
      value: function () {
        var t = this;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  I.default.isMultiFloorSupported()
                    ? (this.guideView.replaceDataAtIndex(
                        {
                          bgImage: this.context.theme.guideImages.multiFloor,
                          topTitle: de.single_floor_save_new_map_home_multifloor,
                          context: de.multi_floor_guide_content,
                          buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
                          buttonFuncId: ['multi_map_guide_ok'],
                          checkBoxInfo: {
                            selected: !1,
                            onSelect: function (n) {
                              t.guideView.selectCheckBox(n);
                            },
                          },
                          onPressSingleButton: function () {
                            t.guideView.isCheckBoxOn && new Y.MultiMapDataProvider().toggleMultiMapFeature(!0);
                          },
                        },
                        this.guideView.currentPage
                      ),
                      this.guideView.show())
                    : this.guideView.nextOrHide();

                case 1:
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
      key: 'checkShouldShowProhibitedBehaviorsGuide',
      value: function (t) {
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if (!this.hasCheckedProhibitedBehaviorsGuide) {
                    n.next = 3;
                    break;
                  }

                  null == t || t();
                  return n.abrupt('return');

                case 3:
                  this.hasCheckedProhibitedBehaviorsGuide = !0;
                  n.next = 6;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ProhibitedBehaviorsGuide));

                case 6:
                  if (!!n.sent) {
                    n.next = 11;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.prohibitedBahaviors,
                      topTitle: de.robot_prohibited_behaviors_guide_title,
                      context: de.robot_prohibited_behaviors_guide_desc,
                      buttonFuncId: ['prohibited_guide_ok'],
                    },
                  ]);
                  n.next = 11;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.ProhibitedBehaviorsGuide, 'true'));

                case 11:
                  null == t || t();

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
      key: '_checkShouldShowPhotoReminder',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.HasShownMapObjectPhotoReminder));

                case 2:
                  if (
                    ((t = !!n.sent),
                    !(
                      (z.DMM.isTanosV || z.DMM.isTopazSV) &&
                      I.default.isFwFilterObstacleSupported() &&
                      !C.default.mapObjectPhotoEnabled &&
                      !t &&
                      this.mapView &&
                      this.mapView.mapObjectNumber() > 0
                    ))
                  ) {
                    n.next = 7;
                    break;
                  }

                  this && this.mapView && this.mapView.showMapObjectPhotoReminder();
                  n.next = 7;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.HasShownMapObjectPhotoReminder, 'true'));

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
      key: 'loadAreaUnit',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AreaUnitIndex));

                case 2:
                  t = n.sent;
                  V.default.sharedCache().areaUnitIndex = t || 0;
                  this.setState({
                    areaUnit: w.default.getAreaUnit(),
                  });

                case 5:
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
      key: 'saveMonitorPrivacyVersionAgreedVersionOnServer',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return l.default.awrap(ve.saveDeviceExtraValue('RRMonitorPrivacyVersion', Ce.RRMonitorPrivacyVersion.toString()));

                case 3:
                  t = n.sent;
                  console.log('saveMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                  n.next = 10;
                  break;

                case 7:
                  n.prev = 7;
                  n.t0 = n.catch(0);
                  console.log('saveMonitorPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

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
      key: 'getMonitorPrivacyVersionAgreedVersionOnServer',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return l.default.awrap(ve.getDeviceExtraInfoForKey('RRMonitorPrivacyVersion'));

                case 3:
                  t = n.sent;
                  console.log('getMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                  V.MC.MonitorPrivacyVersionAgreedOnServer = t.RRMonitorPrivacyVersion;
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
      key: 'savePhotoPrivacyVersionAgreedVersionOnServer',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return l.default.awrap(ve.saveDeviceExtraValue('RRPhotoPrivacyVersion', Ce.RRPhotoPrivacyVersion.toString()));

                case 3:
                  t = n.sent;
                  console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                  n.next = 9;
                  break;

                case 7:
                  n.prev = 7;
                  n.t0 = n.catch(0);

                case 9:
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
      key: 'getPhotoPrivacyVersionAgreedVersionOnServer',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return l.default.awrap(ve.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                case 3:
                  t = n.sent;
                  console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                  V.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
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
      key: 'checkARMapStatus',
      value: function () {
        var t;
        return l.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ARMapPathPrefixKey + '_' + P.RSM.currentMapId));

                case 2:
                  (t = n.sent)
                    ? this.setState({
                        arMapMatchParam: JSON.parse(t),
                      })
                    : this.lastMapType == De.AR && this.changeMapType(De.NORMAL);

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
      key: 'checkFurnitureGuideStatus',
      value: function () {
        var t, n, s, u, c, p, h, f;
        return l.default.async(
          function (M) {
            for (;;)
              switch ((M.prev = M.next)) {
                case 0:
                  M.prev = 0;
                  M.next = 3;
                  return l.default.awrap((0, R.GetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + P.RSM.currentMapId));

                case 3:
                  if (!((s = M.sent) && s.length > 0)) {
                    M.next = 14;
                    break;
                  }

                  if (((u = parseInt(s)), !(Math.floor(new Date().getTime() / 1e3 / 60) - u > 10080))) {
                    M.next = 12;
                    break;
                  }

                  M.next = 10;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + P.RSM.currentMapId, ''));

                case 10:
                  M.next = 14;
                  break;

                case 12:
                  this.setState({
                    unEditFurnitures: 0,
                  });
                  return M.abrupt('return');

                case 14:
                  if (!P.RSM.isRunning) {
                    M.next = 17;
                    break;
                  }

                  this.setState({
                    unEditFurnitures: 0,
                  });
                  return M.abrupt('return');

                case 17:
                  c = k.MM.mapData.furnitures;
                  p = 0;
                  h = (null == c ? void 0 : null == (t = c.data) ? void 0 : t.length) > 0 ? c.data.concat() : [];
                  (null == (n = c.hide) ? void 0 : n.length) > 0 &&
                    (((null == (f = c.hide) ? void 0 : f.length) == c.num && 0 == h.length) || V.MC.showAllFurnitureModel) &&
                    h.push.apply(h, (0, o.default)(c.hide));
                  h.map(function (t) {
                    t.length >= 12 && 0 == t[11] && t[9] != E.FurnitureType.FT_TOILET && p++;
                  });
                  this.setState({
                    unEditFurnitures: p >= 3 ? p : 0,
                  });
                  M.next = 27;
                  break;

                case 25:
                  M.prev = 25;
                  M.t0 = M.catch(0);

                case 27:
                case 'end':
                  return M.stop();
              }
          },
          null,
          this,
          [[0, 25]],
          Promise
        );
      },
    },
    {
      key: 'onDeleteCurrentARMap',
      value: function () {
        var t = this;
        this.setState(
          {
            mapType: De.NORMAL,
          },
          function () {
            var n;
            null == t ||
              null == (n = t.mapView) ||
              n.setState(
                le(
                  le({}, k.MM.mapData),
                  {},
                  {
                    robotStatus: P.RSM.state,
                  }
                )
              );
          }
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
            shouldShowShare: !0,
            foreCloseVideo: !0,
          },
          title: '\u77f3\u5934\u4e09\u5468\u5e74\uff0c\u8001\u7528\u6237\u514d\u8d39\u9886\u8017\u6750\uff01',
        });
      },
    },
    {
      key: 'updateShareButton',
      value: function () {
        Te = I.default.isSharedAllowed() && 'cn' == P.RSM.serverCode;
        xe = Te ? 1 : 0;
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
        this.updateNavBarSwitcher(!1);
        this.props.navigation.navigate(t, n);
      },
    },
    {
      key: 'updateFurnitureGuideKey',
      value: function (t) {
        var n;
        return l.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.prev = 0;
                  n = Math.floor(new Date().getTime() / 1e3 / 60);
                  o.next = 4;
                  return l.default.awrap((0, R.SetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + P.RSM.currentMapId, n + ''));

                case 4:
                  o.next = 8;
                  break;

                case 6:
                  o.prev = 6;
                  o.t0 = o.catch(0);

                case 8:
                  o.prev = 8;
                  this.setState(
                    {
                      unEditFurnitures: 0,
                    },
                    function () {
                      t && t();
                    }
                  );
                  return o.finish(8);

                case 11:
                case 'end':
                  return o.stop();
              }
          },
          null,
          this,
          [[0, 6, 8, 11]],
          Promise
        );
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
      key: 'infoWrapperData',
      get: function () {
        var t,
          n,
          o = this,
          s = null == (t = P.RSM.specialInfo) ? void 0 : t.text;

        switch (null == (n = P.RSM.specialInfo) ? void 0 : n.actionStyle) {
          case P.SpecialInfoType.AirdryFinishTime:
            return {
              info: s,
              icon: require(d[66]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                o.navigateTo('SettingAirDryPage', {
                  title: de.robot_setting_air_dry_title,
                });
              },
            };

          case P.SpecialInfoType.WaitCharge:
            return {
              info: s,
              icon: require(d[67]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                o.navigateTo('RobotSettingPage', {});
              },
            };

          case P.SpecialInfoType.PureClean:
            return {
              info: s,
              icon: require(d[68]),
              actionIcon: null,
              action: null,
            };

          case P.SpecialInfoType.PureMop:
            return {
              info: s,
              icon: require(d[69]),
              actionIcon: null,
              action: null,
            };

          case P.SpecialInfoType.Timer:
            return w.default.isShareUser()
              ? null
              : {
                  info: s,
                  icon: require(d[67]),
                  actionIcon: this.context.theme.mapEditMenu.arrowImg,
                  action: function () {
                    o.navigateTo('TimerPage', {
                      title: de.localization_strings_Setting_index_3,
                    });
                  },
                };

          case P.SpecialInfoType.UnsaveMapReason:
            return {
              info: s,
              icon: require(d[70]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                var t;
                null == (t = o.chooseMapAlert) || null == t.show || t.show();
              },
            };

          case P.SpecialInfoType.HasNewMap:
            return {
              info: s,
              icon: require(d[70]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                o.navigateTo('MultiFloorPage', null);
              },
            };

          default:
            return null;
        }
      },
    },
    {
      key: 'mopModeGuideData',
      get: function () {
        switch (this.state.mopModeGuideMode) {
          case 301:
            return {
              bgImage: this.context.theme.guideImages.findCarpet,
              topTitle: de.tanos_s_mop_mode_title,
              context: de.tanos_s_mop_mode_info1,
              buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
            };

          case 303:
            return {
              bgImage: this.context.theme.guideImages.slowMop,
              topTitle: de.tanos_s_mop_mode_title,
              context: de.tanos_s_mop_mode_info2,
              buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
            };

          default:
            return {
              bgImage: this.context.theme.guideImages.findCarpet,
              topTitle: de.tanos_s_mop_mode_title,
              context: de.tanos_s_mop_mode_info1,
              buttonInfo: [de.localization_strings_Setting_RemoteControlPage_51],
            };
        }
      },
    },
  ]);
  return j;
})(v.default.Component);

exports.default = Be;
Be.contextType = j.AppConfigContext;
var Ie = he.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  topTipView: {
    alignSelf: 'center',
    marginTop: Se.NavigationBarHeight,
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
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  debugButton: {
    position: 'absolute',
    top: 216 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    left: 15,
  },
  debug3DMapButton: {
    position: 'absolute',
    top: 280 + (O.StatusBar.currentHeight || 0),
    left: 15,
  },
  ARMapButton: {
    position: 'absolute',
    top: 216 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    right: 10,
  },
  videoButton: {
    position: 'absolute',
    top: 275 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    right: 10,
    width: 60,
    height: 60,
  },
  mapTypeButton: {
    position: 'absolute',
    top: 166 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    right: 10,
    width: 60,
    height: 60,
  },
  maskShare: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    height: xe,
    bottom: 0,
  },
  mapEditMenu: {
    position: 'absolute',
    top: 150 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    right: 20,
    width: 40,
    height: 122,
  },
});
