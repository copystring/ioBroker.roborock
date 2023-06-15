var n = require(d[1]);

n(require(d[22]));
n(require(d[41]));

var o = n(require(d[2])),
  s = n(require(d[3])),
  u = n(require(d[4])),
  l = n(require(d[5])),
  c = n(require(d[6])),
  p = n(require(d[7])),
  h = n(require(d[8])),
  f = n(require(d[9])),
  M = n(require(d[10])),
  S = n(require(d[11])),
  v = n(require(d[12])),
  _ = n(require(d[13])),
  b = n(require(d[14])),
  w = n(require(d[15])),
  y = require(d[16]),
  P = require(d[17]),
  k = n(require(d[18])),
  R = require(d[19]),
  C = n(require(d[20])),
  x = n(require(d[21])),
  T = require(d[23]),
  D = require(d[24]),
  I = n(require(d[25])),
  B = require(d[26]),
  V = n(require(d[27])),
  E = require(d[28]),
  A = require(d[29]),
  G = require(d[30]),
  F = require(d[31]),
  N = n(require(d[32])),
  O = require(d[33]),
  L = require(d[34]),
  K = require(d[35]),
  U = require(d[36]),
  W = require(d[37]),
  z = require(d[38]),
  H = require(d[39]),
  j = n(require(d[40])),
  Z = n(require(d[42])),
  q = require(d[43]),
  J = require(d[44]),
  Q = n(require(d[45])),
  X = n(require(d[46])),
  Y = n(require(d[47])),
  $ = n(require(d[48])),
  ee = n(require(d[49])),
  te = require(d[50]),
  ae = n(require(d[51])),
  ne = require(d[52]),
  ie = require(d[53]),
  oe = n(require(d[54])),
  re = n(require(d[55]));

function se(t, n) {
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

function ue(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    n % 2
      ? se(Object(s), !0).forEach(function (n) {
          (0, o.default)(t, n, s[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s))
      : se(Object(s)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
        });
  }

  return t;
}

function le() {
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

var ce = require(d[56]).strings,
  de = require(d[33]),
  pe = de.StyleSheet,
  he = de.Text,
  ge = de.View,
  fe = de.DeviceEventEmitter,
  me = de.Dimensions,
  Me = require(d[57]),
  Se = require(d[58]),
  ve = require(d[59]),
  _e = require(d[60]),
  be = _e.Errors,
  we = _e.getToast,
  ye = _e.Reminder,
  Pe = require(d[61]),
  ke = require(d[62]),
  Re = 1,
  Ce = !1,
  xe = 0,
  Te = !0,
  De = {
    NORMAL: '2d',
    AR: 'ar',
    THREE: '3d',
  };

exports.ShowMapType = De;

var Ie = (function (t) {
  (0, p.default)(se, t);

  var n = se,
    O = le(),
    W = function () {
      var t,
        o = (0, f.default)(n);

      if (O) {
        var s = (0, f.default)(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return (0, h.default)(this, t);
    };

  function se(t, n) {
    var c;
    (0, l.default)(this, se);

    (c = W.call(this, t, n)).checkOnlyShowGeneralObstacle = function () {
      var t, n;
      return u.default.async(
        function (o) {
          for (;;)
            switch ((o.prev = o.next)) {
              case 0:
                o.next = 2;
                return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ShowSpecificObstacle));

              case 2:
                t = o.sent;
                n = null;
                n = !!I.default.isShowGeneralObstacle() && (!!z.DMM.isV1 || !('on' == t));
                c.setState({
                  onlyShowGeneralObstacle: n,
                });
                T.MC.onlyShowGeneralObstacle = n;

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
    };

    c.checkShowFurnitureModel = function () {
      var t;
      return u.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                n.next = 2;
                return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ShowFurnitureModel));

              case 2:
                t = n.sent;
                c.setState({
                  showFurnitureModel: !('on' != t),
                });
                T.MC.showAllFurnitureModel = !('on' != t);

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

    c.checkShowRubberBrushCarpet = function () {
      return u.default.async(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                c.setState({
                  showBrushCarpet: T.MC.isShowCarpet,
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

    c.shouldSelectType = function (t) {
      return -1 != y.RSM.currentMapId || t != De.AR || (globals.showToast(ce.switch_ar_map_when_map_unsaved_tip), !1);
    };

    c.mapTypeDidChange = function (t) {
      var n, o;
      return u.default.async(
        function (s) {
          for (;;)
            switch ((s.prev = s.next)) {
              case 0:
                if (((0, D.LogEventCommon)('tap_map_switcher_' + t), t != De.AR)) {
                  s.next = 14;
                  break;
                }

                s.next = 4;
                return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ARMapPathPrefixKey + '_' + y.RSM.currentMapId));

              case 4:
                if ((n = s.sent)) {
                  s.next = 10;
                  break;
                }

                c.navigateTo('MapARScanPage', {
                  title: ' ',
                  onScanFinish: function () {
                    return u.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              n.next = 2;
                              return u.default.awrap(c.changeMapType(t));

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
                return s.abrupt('return');

              case 10:
                if (c.lastMapType != De.AR) {
                  s.next = 14;
                  break;
                }

                c.props.navigation.navigate('MapARScanResultPage', {
                  title: ' ',
                  mapID: y.RSM.currentMapId,
                  parsedMapData: P.MM.parsedMapData,
                  matchingParams: JSON.parse(n).transform,
                  meshFileName: JSON.parse(n).meshFileName,
                  refreshFunc: function () {
                    return u.default.async(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              t.next = 2;
                              return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ARMapPathPrefixKey + '_' + y.RSM.currentMapId));

                            case 2:
                              t.sent ||
                                fe.emit(R.NotificationKeys.DidReceiveSpecialEvent, {
                                  data: R.EventKeys.CurrentARMapDidDelete,
                                });

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
                  },
                });
                null == (o = c.mapTypeSwitcher) || o.hide();
                return s.abrupt('return');

              case 14:
                s.next = 16;
                return u.default.awrap(c.changeMapType(t));

              case 16:
                c.lastMapType = t;

              case 18:
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

    c.onRotateMap = function (t) {
      var n;
      y.RSM.isRunning
        ? (0, q.showFinishCurrentTastAlertIfNeeded)(c.props.alertHandler).catch(function (t) {
            null == c.props.toastHandler || c.props.toastHandler(ce.robot_communication_exception);
          })
        : null == (n = c.mapView) ||
          n.rotateMap(t, function (t) {
            var n;
            null == (n = c.loadingView) || n.showWithText(ce.rubys_main_diag_update_map);
            c.setRotateMapAngle(t);
            setTimeout(function () {
              var t;
              null == (t = c.loadingView) || t.hide();
            }, 500);
          });
    };

    c.onChangeMapElementShow = function (t) {
      return u.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                c.setState({
                  mapElementShowFlag: t,
                });
                n.next = 3;
                return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapElementShowFlag, t.toString()));

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

    c.onMapTypeClose = function () {
      var t;
      null == (t = c.mapTypeSwitcher) || t.hide();
    };

    c._onPressMapDebugInfoIndicator = function () {
      var t;
      return u.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                t = !c.state.mapDebugInfoVisible;
                c.setState({
                  mapDebugInfoVisible: t,
                });
                n.next = 4;
                return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapDebugInfoVisible, t ? 'visible' : ''));

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

    c._onPressMapEditButton = function () {
      var t, n;
      null == (t = c.customModeView) || t.hide();
      null == (n = c.modalMapEditMenu) || n.show();
    };

    c.onPressCustomModeButton = function () {
      var t, n;
      null == (t = c.modalMapEditMenu) || t.hide();
      null == (n = c.customModeView) || n.show();
    };

    c._onPressMapTypeButton = function () {
      var t;
      null == (t = c.mapTypeSwitcher) || t.show();
    };

    c._handleZoneAddButton = function () {
      console.log('_handleZoneAddButton');
      y.RSM.mapStatus != y.MapStatus.None
        ? (c.mapView && c.mapView.enterZoneEditMode(),
          c.mapView && !c.mapView.addRectangle() && globals.showToast(ce.rubys_main_zone_max_tips),
          c.mapView3D && c.mapView3D.enterZoneEditMode(),
          c.mapView3D && c.mapView3D.addRectangle())
        : globals.showToast(ce.tap_zone_clean_button_without_map_tip);
    };

    c._onPressZoneEditButton = function () {
      c.navigateTo('MapEditZoneInfoPage', {
        title: ce.map_edit_zone,
      });
    };

    c.onPressSuppliesUpgradeTip = function () {
      var t = c.suppliesParams.suppliesItem,
        n = c.suppliesParams.suppliesValue,
        o = b.default.percentCalculate(n, t.total);
      t.isUnitsTime || (o = Math.ceil(100 * (1 - n / t.total)));
      var s = o <= 20 && o > 5,
        u = o > 20 ? ce.dust_collection_life10 : s ? ce.dust_collection_life11 : ce.dust_collection_life12,
        l = {
          suppliesKey: t.suppliesKey,
          spent: n,
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
          stateText: ce.dust_collection_life13.templateStringWithParams({
            state: u,
          }),
        };
      c.props.navigation.navigate('SupplyDetailPage', l);
    };

    c.onPressSoundPkgGuide = function () {
      c.navigateTo('SoundPackagePage', {
        title: ce.soundpackage_volume_adjust_title,
      });
      c.onCloseSoundPkgGuide();
    };

    c.onCloseSoundPkgGuide = function () {
      var t;
      return u.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                c.updateSoundPageGuide(!1);
                n.next = 3;
                return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.SoundPackageUpgrade));

              case 3:
                if (((n.t0 = n.sent), n.t0)) {
                  n.next = 6;
                  break;
                }

                n.t0 = 0;

              case 6:
                t = n.t0;
                t++;
                n.next = 10;
                return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.SoundPackageUpgrade, '' + t));

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
    };

    c.onOpenErrorDetailPage = function (t) {
      c.navigateTo('ErrorDetailPageNew', {
        title: ce.localization_strings_Main_Error_ErrorDetailPage_0,
        code: t,
      });
    };

    c.closeReminder = function () {
      y.RSM.closeReminder();
      c.updateRobotStatusGuide();
      c.forceUpdate();
    };

    c.closeError = function () {
      return u.default.async(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if ((y.RSM.closeError(), c.updateRobotStatusGuide(), c.forceUpdate(), !(y.RSM.dockErrorStatus > 0))) {
                  t.next = 6;
                  break;
                }

                t.next = 6;
                return u.default.awrap(w.default.resolveError(y.RSM.dockErrorStatus));

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
    };

    c.onPressReminder = function (t) {
      var n = ('string' == typeof (t = 'bin_full' == t ? 'Error644' : t) && parseInt(t.slice(5))) || -1;
      be()[n] &&
        c.props.navigation &&
        c.navigateTo('ErrorDetailPageNew', {
          title: ce.localization_strings_Main_Error_ErrorDetailPage_0,
          code: n,
        });
    };

    c._onPressFurnitureBubble = function (t) {
      y.RSM.isHomeButtonsEnabled() &&
        (y.RSM.isShowStopTaskAlert()
          ? globals.Alert.alert('', ce.home_dialog_begin_new_clean, [
              {
                text: ce.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: ce.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return u.default.async(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            n.prev = 0;
                            n.next = 3;
                            return u.default.awrap(w.default.stop());

                          case 3:
                            if (!n.sent) {
                              n.next = 8;
                              break;
                            }

                            y.RSM.cleanResumeFlag = y.CleanResumeFlag.None;
                            y.RSM.backDockResumeFlag = y.BackDockResumeFlag.None;
                            c.switchFurnitureZoneClean(t);
                            y.RSM.preMockMotionStatus(y.RobotState.WAITING);

                          case 8:
                            n.next = 13;
                            break;

                          case 10:
                            n.prev = 10;
                            n.t0 = n.catch(0);
                            console.log('Furniture bubble press error : ' + JSON.stringify(n.t0));

                          case 13:
                          case 'end':
                            return n.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 10]],
                    Promise
                  );
                },
              },
            ])
          : c.switchFurnitureZoneClean(t));
    };

    c._onPressSmartZoneBubble = function (t, n) {
      var o = B.SmartBubbleConfig[n].pageType,
        s = B.SmartBubbleConfig[n].pageTitle,
        u = !t || !t.custom;
      t &&
        o &&
        c.navigateTo('MapAICheckPage', {
          title: s,
          pageType: o,
          initParams: {
            zoneData: t,
          },
          showBottomView: u,
        });
    };

    c.onCloseAIZoneGuide = function (t) {
      var n, l, p, h, f, M, S, v, _, b, w, y;

      return u.default.async(
        function (k) {
          for (;;)
            switch ((k.prev = k.next)) {
              case 0:
                c.showAIReminderView(B.SmartBubbleType.BT_NONE);
                b = '';
                t == B.SmartBubbleType.BT_CLIFF && (null == (n = P.MM.mapData) ? void 0 : null == (l = n.clffbz) ? void 0 : null == (p = l.fbzs) ? void 0 : p.length) > 0
                  ? (b = P.MM.mapData.clffbz.fbzs.toString())
                  : t == B.SmartBubbleType.BT_STUCK && (null == (h = P.MM.mapData) ? void 0 : null == (f = h.stuckpts) ? void 0 : null == (M = f.data) ? void 0 : M.length) > 0
                  ? (b = P.MM.mapData.stuckpts.data.toString())
                  : t == B.SmartBubbleType.BT_DOORSILL &&
                    (null == (S = P.MM.mapData) ? void 0 : null == (v = S.smartds) ? void 0 : null == (_ = v.fbzs) ? void 0 : _.length) > 0 &&
                    (b = P.MM.mapData.smartds.fbzs.toString());
                k.next = 5;
                return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AIZonesGuideNew));

              case 5:
                w = k.sent;
                y = w ? JSON.parse(w) : {};
                (0, s.default)(y, (0, o.default)({}, t, b));
                k.next = 10;
                return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.AIZonesGuideNew, JSON.stringify(y)));

              case 10:
              case 'end':
                return k.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    };

    c.closeFurnitureGuide = function () {
      c.updateFurnitureGuideKey();
    };

    c.onPressFurnitureGuide = function () {
      c.updateFurnitureGuideKey(function () {
        c.navigateTo('MapEditFurniturePage', {
          title: ce.map_edit_furniture_title,
          initAction: B.EditAction.Furniture,
        });
      });
    };

    c.redDotStatusArray = [];
    c.mcc = 0;
    c.hasShownPetModeAlert = !1;
    c.monitorPrivacyVersion = -1;
    c.tabIndex = 0;
    c.showBubbleGuide = !1;
    c.settingIconConfig = {
      enabled: !1,
      hasBadge: !1,
    };
    c.shareIconConfig = {
      enabled: !1,
      isHidden: !0,
    };
    c.aiRobotData = {
      error: 0,
      reminder: '',
    };
    c.suppliesParams = {
      suppliesKey: '',
      suppliesItem: {},
      suppliesValue: 0,
    };
    c.state = {
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
      areaUnit: b.default.getAreaUnit(),
      cleanArea: b.default.getAreaUnitValue(y.RSM.cleanArea),
      battery: y.RSM.battery,
      cleanTime: y.RSM.cleanTime,
      avoidCount: y.RSM.avoidCount,
      noMapTip: '',
      isDarkMode: !1,
      robotState: y.RSM.state,
      isWarmUp: y.RSM.isWarmUp,
      mapType: De.NORMAL,
      parsedMapData: P.MM.parsedMapData,
      originBase64MapData: P.MM.originBase64MapData,
      mapElementShowFlag: 255,
      AIReminderText: ce.map_cliff_zone_guide_text,
      mapDiffInfo: '',
      shouldHideMap: !1,
    };
    return c;
  }

  (0, c.default)(se, [
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
        Me.isMiApp || (0, D.PluginDidExit)();
        y.RSM.reset();
        y.RSM.stop();
        P.MM.stop();
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
        return M.default.createElement(j.default, {
          enabled: this.settingIconConfig.enabled,
          hasBadge: this.settingIconConfig.hasBadge,
          onPress: function () {
            t.privacyDialogVisible ||
              (P.MM.stop(),
              (P.MM.isStopedBySettingPage = !0),
              (t.shouldUpdateNavbar = !1),
              t.navigateTo('Setting', {
                title: ce.localization_strings_Setting_index_21,
                enabledTitleBarUpdate: function () {
                  t.shouldUpdateNavbar = !0;
                  t.updateUI();
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
        return M.default.createElement(A.PureImageButton, {
          onPress: function () {
            t.onPressShareButton();
          },
          key: 'nav_share',
          enabled: this.shareIconConfig.enabled,
          style: n,
          image: require(d[63]),
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
          title: Me.deviceName || 'unknown',
          navBarBackgroundColor: 'transparent',
          headerTransparent: !0,
          rightItems: this.navigationItems,
          subTitle: ce.localization_strings_Common_Constants_0,
          hiddenBottomLine: !0,
        });
        var n, o;
        u.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapDebugInfoVisible));

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
        u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.PreferedMapType));

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
        L.Log.deleteExpiredLogs();
        Me.fixDeviceScreenHeight();
      },
    },
    {
      key: 'checkMapElementShowFlag',
      value: function () {
        var t;
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapElementShowFlag));

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
        return u.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AutoIdentifyRoomTag));

                case 2:
                  if (t.sent) {
                    t.next = 6;
                    break;
                  }

                  t.next = 6;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.AutoIdentifyRoomTag, 'true'));

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
        this.robotStatusListener = fe.addListener(R.NotificationKeys.RobotStatusDidUpdate, function (o) {
          t.checkShouldShowShareButton();
          n.hasGotStatus = !0;
          n.updateUI();
          y.RSM.isCurrentMapChanged && t.currentMapDidChange(!0);

          t._checkShouldShowPhotoReminder();

          t.checkShouldShowProhibitedBehaviorsGuide(function () {
            return u.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.next = 2;
                      return u.default.awrap(t.checkShouldShowMapSaveGuide());

                    case 2:
                      n.next = 4;
                      return u.default.awrap(t.checkShouldShowOfflineMapGuide());

                    case 4:
                      n.next = 6;
                      return u.default.awrap(t.checkShouldShowAvoidCollisionGuide());

                    case 6:
                      n.next = 8;
                      return u.default.awrap(t.checkShouldShowPetModeAlert());

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
          });
          t.customModeView && t.customModeView.updateSettingTip && t.customModeView.updateSettingTip();
        });
        this.robotEventListener = fe.addListener(R.NotificationKeys.EventToastChange, function (n) {
          t.showEventToast(n);
        });
        this.focusListener = this.props.navigation.addListener('didFocus', function () {
          t.updateNavBarSwitcher(!0);
        });
        this.mapListener = fe.addListener(R.NotificationKeys.MapDidUpdate, function (o) {
          var s;
          P.MM.zoneChanged && ((P.MM.zoneChanged = !1), null == (s = t.mapView) || s.getRoomNameListInMap());
          n.updateMap();
          P.MM.RefrashMapData && ((P.MM.RefrashMapData = !1), t.updateRoomTag());
        });
        this.mapReset = fe.addListener(R.NotificationKeys.MapManualReset, function () {
          t.mapView && t.mapView.resetManual(!1);
        });
        this.registerSpecialEvent();
        this.registerRedDotListener();
        Me.isMiApp
          ? ((this.deviceNameChangedListener = Me.DeviceEvent.deviceNameChanged.addListener(function (n) {
              t.props.navigation.setParams({
                title: Me.Device.name,
              });
              Me.deviceName = Me.Device.name;
            })),
            (this.mapDiffListener = fe.addListener(R.NotificationKeys.MapDynamicDiffInfoChange, function (n) {
              t.setState({
                mapDiffInfo: P.MM.diffInfo,
              });
            })))
          : (this.deviceNameChangedListener = fe.addListener(Me.deviceNameChangedEvent, function (n) {
              Me.deviceName = n.newName;
              t.props.navigation.setParams({
                title: n.newName,
              });
              console.log('deviceNameChangedListener - ' + JSON.stringify(n));
            }));
        this.areaUnitListener = fe.addListener(R.NotificationKeys.AreaUnitChange, function (n) {
          t.setState({
            areaUnit: b.default.getAreaUnit(),
          });
        });
        this.safeAreaListener = fe.addListener('SafeAreaDidChange', function () {
          t.updateUI();
        });
        this.themeListener = fe.addListener(R.NotificationKeys.ThemeDidChange, function () {
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
        this.redPointListener = fe.addListener(R.NotificationKeys.RedDotDidChange, function (o) {
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
            ue(
              ue({}, t.settingIconConfig),
              {},
              {
                hasBadge: u,
              }
            ),
            t.shareIconConfig
          );
          'supplies' == o.name && ((t.suppliesParams = o), t.updateSuppliesGuide());
          'update_sound_package' == o.name && t.updateSoundPageGuide(o.value);
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

        if (!b.default.isShareUser()) {
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

            Me.isMiApp
              ? Me.getFirmwareUpgradingInfo(Me.deviceId, Me.isMiApp ? Me.Device.type : '')
                  .then(function (n) {
                    (null == n ? void 0 : n.isLatest) && t();
                  })
                  .catch(function (t) {
                    console.log(t);
                  })
              : Me.getFirmwareVersion()
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
          s,
          l = this;
        return u.default.async(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  if (!(!Me.isMiApp && y.RSM.isChargingOnDock() && y.RSM.battery >= 20) || b.default.isShareUser()) {
                    c.next = 18;
                    break;
                  }

                  c.next = 3;
                  return u.default.awrap(Me.getFirmwareVersion());

                case 3:
                  t = c.sent;
                  c.next = 6;
                  return u.default.awrap(Me.getValue('firmwareLastVersion1'));

                case 6:
                  n = c.sent;
                  c.next = 9;
                  return u.default.awrap(Me.isAutoUpdateOn());

                case 9:
                  if (((o = c.sent), (s = t.lastVersion), !((1 == Me.iotType || s != n) && Te && !o))) {
                    c.next = 18;
                    break;
                  }

                  Te = !1;
                  c.next = 16;
                  return u.default.awrap(Me.setValue('firmwareLastVersion1', s));

                case 16:
                  this.addDialog([
                    {
                      bgImage: this.context.theme.guideImages.newFirmware,
                      topTitle: ce.new_firmware_detected,
                      context: ce.new_firmware_detected1,
                      buttonInfo: [ce.go_update],
                      buttonFuncId: ['new_firmware_view'],
                      onPressSingleButton: function () {
                        l.openDeviceUpgradePage();
                      },
                    },
                  ]);
                  this.newFirmwareDetected = !0;

                case 18:
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
      key: 'registerSpecialEvent',
      value: function () {
        var t = this;
        this.specialEventListener = fe.addListener(R.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          var o = n.data;

          if (
            ('relocate_fail' != o || y.RSM.isCleaning() || t.mapView.resetSelectBlocks(),
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
          o == R.EventKeys.ConsumableReset && ((t.suppliesParams.suppliesKey = ''), t.updateSuppliesGuide());
          o == R.EventKeys.FoundSavedMap && t.showBuildMapFinishGuideIfNeeded();
        });
      },
    },
    {
      key: 'unregisterListeners',
      value: function () {
        var t;
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
        null == (t = this.mapDiffListener) || t.remove();
      },
    },
    {
      key: 'checkShouldShowShareButton',
      value: function () {
        this.hasGotStatus ||
          (this.updateShareButton(),
          this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            ue(
              ue({}, this.shareIconConfig),
              {},
              {
                isHidden: !Ce,
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
        var t = y.RSM.isHomeButtonsEnabled(),
          n = y.RSM.isLocating ? ce.map_locating : y.RSM.stateName;
        0 != y.RSM.washingTaskStatus &&
          (6 == y.RSM.washingMode && (n = ce.washing_mode_updown_water_selfcleaning),
          7 == y.RSM.washingMode && (n = ce.washing_mode_updown_water_drain),
          9 == y.RSM.washingMode && (n = ce.left_water_is_draining));
        this.updateNaviItemsIfNeeded(
          ue(
            ue({}, this.settingIconConfig),
            {},
            {
              enabled: y.RSM.isHomeSettingButtonEnabled(),
            }
          ),
          this.shareIconConfig
        );
        this.updateNavigationParams({
          subTitle: n,
          navBarBackgroundColor: 'transparent',
        });
        this.sidebarMenu && this.sidebarMenu.updateUI();
        I.default.isFwFilterObstacleSupported() && k.default.mapObjectPhotoEnabled
          ? this.setState({
              mapObstaclesPopBoxType: 'photo',
            })
          : this.setState({
              mapObstaclesPopBoxType: 'ai',
            });
        t ||
          (this.updateNaviItemsIfNeeded(
            this.settingIconConfig,
            ue(
              ue({}, this.shareIconConfig),
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
          cleanArea: b.default.getAreaUnitValue(y.RSM.cleanArea),
          battery: y.RSM.battery,
          cleanTime: y.RSM.cleanTime,
          avoidCount: y.RSM.avoidCount,
          error: y.RSM.errorCode,
          currentReminder: y.RSM.currentReminder,
          isLocating: y.RSM.isLocating,
          robotState: y.RSM.state,
          infoWrapperData: this.infoWrapperData,
          isWarmUp: y.RSM.isWarmUp,
          washReady: y.RSM.isWashReady,
          inQuickBuildMap: y.RSM.state == y.RobotState.QUICK_BUILDING_MAP,
        });
        this.updateRobotStatusGuide();
        y.RSM.state != y.RobotState.EGG_ATTACK && P.MM.quitEasterEggModel();
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
          n = y.RSM.mapStatus == y.MapStatus.None || (y.RSM.mapStatus == y.MapStatus.Has_WithoutSegments && this.tabIndex == U.TabSegment);

        if (this.state.shouldShowNoMapTipView != n) {
          var o = null;
          y.RSM.isCleaning() || (o = y.RSM.mapStatus == y.MapStatus.Has_WithoutSegments ? ce.no_seg_map_tip : ce.no_map_tip);
          this.setState(
            {
              shouldShowNoMapTipView: n,
              noMapTip: o,
            },
            function () {
              n ||
                (t.mapView &&
                  t.mapView.setState(
                    ue(
                      ue({}, P.MM.mapData),
                      {},
                      {
                        robotStatus: y.RSM.state,
                      }
                    )
                  ));
            }
          );
        } else {
          var s;
          null == (s = this.mapView) ||
            s.setState({
              robotStatus: y.RSM.state,
            });
        }
      },
    },
    {
      key: 'updateMap',
      value: function () {
        var t;
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  this.state.hasGotMap ||
                    (this.setState({
                      hasGotMap: !0,
                    }),
                    (y.RSM.hasGotMapFirstTime = !0),
                    this.didGetMapFirstTime());
                  t = P.MM.mapRotateAngle[y.RSM.currentMapId];
                  this.mapView &&
                    this.mapView.setState(
                      ue(
                        ue({}, P.MM.mapData),
                        {},
                        {
                          robotStatus: y.RSM.state,
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
                    ue(
                      ue({}, this.shareIconConfig),
                      {},
                      {
                        enabled: !0,
                      }
                    )
                  );
                  n.next = 7;
                  return u.default.awrap(this.checkAIReminderStatus());

                case 7:
                  y.RSM.isRunning || this.showBubbleGuide || (this._onShowGuideBubble(), (this.showBubbleGuide = !0));
                  this.checkARMapStatus();
                  Re += 1;
                  this.setState({
                    parsedMapData: ue(
                      ue({}, P.MM.parsedMapData),
                      {},
                      {
                        mapCounter: Re,
                      }
                    ),
                    originBase64MapData: P.MM.originBase64MapData,
                  });
                  this.checkFurnitureGuideStatus();

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
      key: 'updateRobotStatusGuide',
      value: function () {
        this.aiRobotData.error = y.RSM.errorCode;
        this.aiRobotData.reminder = y.RSM.currentReminder;
        var t = this.aiRobotData.error,
          n = be()[t];
        t > 0 && n
          ? this.aiRobotGuide.addMsg({
              type: A.aiRobotType.Error,
              data: t,
              funcId: 'error_' + t,
              accessibilityLabelKey: 'error_key_' + t,
              title: n ? n[1] : 'error',
              detail: n ? n[2] : 'error',
              closeable: 24 == t || 25 == t || y.RSM.dockErrorStatus > 0,
              pressAction: this.onOpenErrorDetailPage,
              closeAction: this.closeError,
            })
          : this.aiRobotGuide.removeMsg(A.aiRobotType.Error);
        var o = this.aiRobotData.reminder;
        ye()[o]
          ? this.aiRobotGuide.addMsg({
              type: A.aiRobotType.Reminder,
              data: o,
              funcId: 'reminder_' + o,
              accessibilityLabelKey: 'reminder_key_' + o,
              title: ye()[o][0],
              detail: ye()[o][1],
              closeable: !0,
              pressAction: this.onPressReminder,
              closeAction: this.closeReminder,
            })
          : this.aiRobotGuide.removeMsg(A.aiRobotType.Reminder);
      },
    },
    {
      key: 'updateSuppliesGuide',
      value: function () {
        var t = this.suppliesParams.suppliesKey,
          n = ve.SuppliesUpgradeTip()[t];
        void 0 != n
          ? this.aiRobotGuide.addMsg({
              type: A.aiRobotType.Supplies,
              data: t,
              funcId: 'supplies_' + t,
              accessibilityLabelKey: 'supplies_key_' + t,
              title: n,
              closeable: !1,
              pressAction: this.onPressSuppliesUpgradeTip,
            })
          : this.aiRobotGuide.removeMsg(A.aiRobotType.Supplies);
      },
    },
    {
      key: 'updateSoundPageGuide',
      value: function (t) {
        var n;
        return u.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.SoundPackageUpgrade));

                case 2:
                  if (((o.t0 = o.sent), o.t0)) {
                    o.next = 5;
                    break;
                  }

                  o.t0 = 0;

                case 5:
                  n = o.t0;
                  this.hasGotStatus && t && !n
                    ? this.aiRobotGuide.addMsg({
                        type: A.aiRobotType.Soundpkg,
                        data: t,
                        title: ce.home_page_sound_pacakge_upgrade_tip,
                        closeable: !0,
                        pressAction: this.onPressSoundPkgGuide,
                        closeAction: this.onCloseSoundPkgGuide,
                      })
                    : this.aiRobotGuide.removeMsg(A.aiRobotType.Soundpkg);

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
      key: 'updateRoomTag',
      value: function () {
        var t,
          n,
          o = this;
        return u.default.async(
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

                        if (!(c < B.FurnitureType.FT_TVCABINET || c > B.FurnitureType.FT_DINNERTABLE)) {
                          var p = l[0] / 50,
                            h = l[4] / 50,
                            f = l[1] / 50,
                            M = l[5] / 50;

                          if (p < h) {
                            var S = [h, p];
                            p = S[0];
                            h = S[1];
                          }

                          if (M < f) {
                            var v = [f, M];
                            M = v[0];
                            f = v[1];
                          }

                          s.push([h, p, f, M, c]);
                        }
                      }

                      return s;
                    })()),
                    !((n = P.MM.smartInferZoneTag(t)) && Object.keys(n).length > 0))
                  ) {
                    s.next = 6;
                    break;
                  }

                  s.next = 6;
                  return u.default.awrap(P.MM.updateTagInfoForMap(n));

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
          P.MM.updateRoomNameMapping();
        }, 1e3);
        t && this.changeMapType(De.NORMAL);
      },
    },
    {
      key: 'changeMapType',
      value: function (t) {
        var n = this;
        return u.default.async(
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
                            ue(
                              ue({}, P.MM.mapData),
                              {},
                              {
                                robotStatus: y.RSM.state,
                              }
                            )
                          ),
                        null == n || null == n.currentMapDidChange || n.currentMapDidChange());
                    }
                  );
                  o.next = 3;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.PreferedMapType, t));

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
        return u.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  l.prev = 0;
                  l.next = 3;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapRotateAngle));

                case 3:
                  n = l.sent;
                  (o = n ? JSON.parse(n) : (0, s.default)({}))[y.RSM.currentMapId] = t;
                  n = JSON.stringify(o);
                  P.MM.mapRotateAngle = o;
                  l.next = 10;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapRotateAngle, n));

                case 10:
                  fe.emit(R.NotificationKeys.DidReceiveSpecialEvent, {
                    data: R.EventKeys.MapDidRotate,
                    sender: this,
                  });
                  l.next = 15;
                  break;

                case 13:
                  l.prev = 13;
                  l.t0 = l.catch(0);

                case 15:
                case 'end':
                  return l.stop();
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
        (we()[n] || !1) && this.eventToast && this.eventToast.show(n);
      },
    },
    {
      key: 'getErrorView',
      value: function () {
        var t = this;
        return (
          globals.isTestErrorMode &&
          M.default.createElement(v.default, {
            ref: function (n) {
              return (t.errorView = n);
            },
            onPress: function (n) {
              return t.onOpenErrorDetailPage(n);
            },
            type: 'error',
            closeable: !1,
          })
        );
      },
    },
    {
      key: 'getIncrementalMapDebugView',
      value: function () {
        return I.default.isMapBeautifyDebugUser() && I.default.isSupportIncrementalMap()
          ? M.default.createElement(
              he,
              {
                style: Be.mapDiffText,
              },
              this.state.mapDiffInfo
            )
          : null;
      },
    },
    {
      key: 'getModeSetView',
      value: function () {
        var t = this;
        return M.default.createElement(E.ModeSettingPanel, {
          ref: function (n) {
            t.customModeView = n;
          },
          parent: this,
          isInHomePage: !0,
          tabModeDidChange: function () {
            fe.emit(R.NotificationKeys.BottomControlMenuNeedRefresh);
          },
          onPressCustomModePage: this._onPressCustomModePage.bind(this),
          showCleanRouteGuideByMode: this._showMopModePromptDialog.bind(this),
          onPressMore: function () {
            return t.navigateTo('MopModeListPage', {
              title: ce.custom_mode_panel_more_mode_title,
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
          ce.rubys_cleanmode_mop_alert_descript,
          '',
          [
            {
              text: ce.localization_strings_Setting_RemoteControlPage_51,
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
          o = M.default.createElement(_.default, {
            shouldShowLine: !0,
            data: [
              {
                title: ce.localization_strings_CommonModules_NumberView_0,
                unit: this.state.areaUnit,
                value: this.state.cleanArea,
              },
              {
                title: ce.localization_strings_CommonModules_NumberView_1,
                unit: '%',
                value: this.state.battery,
              },
              {
                title: ce.localization_strings_CommonModules_NumberView_2,
                unit: 'min',
                value: t.state.cleanTime,
              },
            ],
          }),
          s = M.default.createElement(
            ge,
            {
              style: Be.topTipView,
            },
            M.default.createElement(
              he,
              {
                style: {
                  color: n.navTitleColor,
                },
              },
              this.state.topTip
            )
          );
        return M.default.createElement(
          ge,
          {
            style: {
              position: 'absolute',
              top: 74 + Se.AppBarMarginTop,
              left: 0,
              width: me.get('window').width,
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
          o = this;
        if (this.state.shouldHideMap) return null;
        var l = {
            height: me.get('window').height,
            width: me.get('window').width,
          },
          c = M.default.createElement(B.MapView, {
            style: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'stretch',
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
            left: 40,
            right: 40,
            initSize: l,
            showMapObjectDebugInfo: this.state.mapDebugInfoVisible && !z.DMM.isV1,
            showOnlyGeneralObstacles: this.state.onlyShowGeneralObstacle,
            top: H.MapViewInnerTop,
            bottom: H.MapViewInnerBottom,
            mapElementShowFlag: this.state.mapElementShowFlag,
            obstaclePopBoxType: this.state.mapObstaclesPopBoxType,
            showFurnitureIcon: !this.state.showFurnitureModel,
            showBrushCarpet: this.state.showBrushCarpet,
            shouldShowMapObjectBubbleChecker: function (t) {
              var n, s, l;
              return u.default.async(
                function (c) {
                  for (;;)
                    switch ((c.prev = c.next)) {
                      case 0:
                        n = 'photo' == o.state.mapObstaclesPopBoxType && k.default.mapObjectPhotoPrivacyPolicyAgreed && k.default.mapObjectPhotoEnabled;
                        c.next = 3;
                        return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.PhotoPrivacyVersion));

                      case 3:
                        if (
                          ((s = !!c.sent),
                          (l = parseInt(T.MC.photoPrivacyVersionAgreedOnServer) == ke.RRPhotoPrivacyVersion),
                          !n || 0 != s || -1 != T.MC.photoPrivacyVersionAgreedOnServer)
                        ) {
                          c.next = 12;
                          break;
                        }

                        c.next = 8;
                        return u.default.awrap(o.getPhotoPrivacyVersionAgreedVersionOnServer());

                      case 8:
                        (l = parseInt(T.MC.photoPrivacyVersionAgreedOnServer) == ke.RRPhotoPrivacyVersion)
                          ? ((0, D.LogEventCommon)('tap_map_object'), t && t())
                          : o.photoPrivacyDialog && o.photoPrivacyDialog.show();
                        c.next = 13;
                        break;

                      case 12:
                        n && 0 == s && !l ? o.photoPrivacyDialog && o.photoPrivacyDialog.show() : ((0, D.LogEventCommon)('tap_map_object'), t && t());

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
            onPressDockBubble: this._onPressDockBubble.bind(this),
            onPressChargerErrorBubble: this._onPressChargerErrorBubble.bind(this),
            onPressFurnitureBubble: this._onPressFurnitureBubble,
            onPressSmartZoneBubble: this._onPressSmartZoneBubble,
            ref: function (t) {
              return (o.mapView = t);
            },
            showAllBlocksBubble: !0,
            showAllComponetBubble: !0,
            showDockBubbles: !0,
          }),
          p = {};
        this.state.arMapMatchParam && ((p.matchingParams = this.state.arMapMatchParam.transform), (p.meshFileName = this.state.arMapMatchParam.meshFileName));
        var h = M.default.createElement(
            Y.default,
            (0, s.default)(
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                },
                ref: function (t) {
                  return (o.mapViewMatrix = t);
                },
                backgroundColor: 'transparent',
                parsedMapData: this.state.parsedMapData,
                originBase64MapData: this.state.originBase64MapData,
                isDarkMode: globals.app.state.theme == te.Themes.dark,
              },
              p
            )
          ),
          f = {},
          S = B.MapUtilManager.adjustChargerAngle(null == P.MM ? void 0 : null == (t = P.MM.parsedMapData) ? void 0 : null == (n = t.charger) ? void 0 : n.angle);
        P.MM.parsedMapData &&
          P.MM.parsedMapData.charger &&
          (f.adjustCharger = {
            x: P.MM.parsedMapData.charger.x,
            y: P.MM.parsedMapData.charger.y,
            angle: S,
          });
        var v = {};

        if (y.RSM.isOnDock() && P.MM.parsedMapData && P.MM.parsedMapData.robot && P.MM.parsedMapData.charger) {
          var _ = 0;
          y.RSM.isWashing() && (_ = 180);
          var b = S + z.DMM.robotInMap.chargerAngle + _,
            w = {
              x: 2 * Math.cos(B.MapUtilManager.degreeToRad(S)),
              y: 2 * Math.sin(B.MapUtilManager.degreeToRad(S)),
            };
          v.adjustRobot = {
            x: P.MM.parsedMapData.charger.x + w.x,
            y: P.MM.parsedMapData.charger.y + w.y,
            angle: b,
          };
        }

        var C = P.MM.mapRotateAngle[y.RSM.currentMapId] || 0,
          E = M.default.createElement($.default, {
            style: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'stretch',
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
            ref: function (t) {
              return (o.mapView3D = t);
            },
            data: ue(
              ue(
                ue(
                  {
                    parsedMapData: P.MM.parsedMapData,
                    originBase64MapData: P.MM.originBase64MapData,
                    dockType: y.RSM.originDockType || 0,
                  },
                  f
                ),
                v
              ),
              {},
              {
                mapRotateAngle: C,
              }
            ),
            isDarkMode: globals.app.state.theme == te.Themes.dark,
            selectedBlocksDidChange: this.handleSelectedBlocksDidChange.bind(this),
            selectedRectDidChange: this.handleSelectedRectDidChange.bind(this),
          }),
          A = M.default.createElement(
            ge,
            {
              style: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            M.default.createElement(x.default, {
              shouldShowTip: !this.state.inQuickBuildMap,
              isLocating: this.state.isLocating,
              isWarmUp: y.RSM.isWarmUp,
              style: Be.loadingView,
            })
          ),
          G = (y.RSM.multiFloorEnabled && 4 == P.MM.maps.length) || (!y.RSM.multiFloorEnabled && 1 == P.MM.maps.length),
          F = I.default.isSupportQuickMapBuilder() && y.RSM.mapSaveEnabled && !G && this.state.noMapTip,
          N = M.default.createElement(V.default, {
            tip: this.state.noMapTip,
            mainPage: !0,
            shouldShowGuideButton: y.RSM.mapStatus == y.MapStatus.Has_WithoutSegments && this.state.noMapTip,
            shouldShowQuickCreateMap: F,
            onPressQuickCreateMap: function () {
              var t;
              return null == (t = o.quickCreateMapGuide) ? void 0 : t.show();
            },
            disabled: y.RSM.state == y.RobotState.UPDATING || y.RSM.state == y.RobotState.UNKNOWN,
          });
        if (this.state.inQuickBuildMap && y.RSM.mapStatus == y.MapStatus.None) return A;

        if (this.state.hasGotMap && !this.state.isLocating) {
          if (this.state.shouldShowNoMapTipView) return N;
          var O = c;
          this.state.mapType == De.AR && this.state.arMapMatchParam ? (O = h) : this.state.mapType == De.THREE && (O = E);
          return O;
        }

        return A;
      },
    },
    {
      key: 'getMapEditPopMenu',
      value: function () {
        var t = this;
        return M.default.createElement(G.default, {
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
        return M.default.createElement(N.default, {
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
        return M.default.createElement(
          ge,
          {
            pointerEvents: 'box-none',
            style: Be.msgViewsWrap,
          },
          M.default.createElement(S.default, {
            ref: function (n) {
              return (t.eventToast = n);
            },
          }),
          this.getErrorView()
        );
      },
    },
    {
      key: 'getVideoEntryButton',
      value: function () {
        var t = this.context.theme.homeSidebar,
          n =
            y.RSM.hasGotMapFirstTime &&
            y.RSM.state != y.RobotState.UNKNOWN &&
            I.default.isVideoMonitorSupported() &&
            !b.default.isShareUser() &&
            !Me.isMiApp &&
            I.default.isVideoMonitorModelSupported(),
          o =
            y.RSM.state != y.RobotState.UPDATING &&
            y.RSM.state != y.RobotState.UNKNOWN &&
            y.RSM.state != y.RobotState.LOCKED &&
            y.RSM.state != y.RobotState.WASHING_DUSTER &&
            y.RSM.state != y.RobotState.COLLECTING_DUST;
        return n
          ? M.default.createElement(A.PureImageButton, {
              image: t.videoIcon,
              imageWidth: 60,
              imageHeight: 60,
              enabled: o,
              style: Be.videoButton,
              funcId: 'video_entrance',
              onPress: this.onPressVideoButton.bind(this),
            })
          : null;
      },
    },
    {
      key: 'getMapEditSiderMenu',
      value: function () {
        if (!y.RSM.hasGotMapFirstTime) return null;
        if (!y.RSM.mapSaveEnabled) return null;
        var t = this.context.theme.mapEditMenu,
          n = y.RSM.isHomeButtonsEnabled();
        return M.default.createElement(
          ge,
          {
            style: [
              Be.mapEditMenu,
              {
                backgroundColor: this.context.theme.componentBackgroundColor,
                justifyContent: 'space-evenly',
                borderRadius: 8,
              },
            ],
          },
          I.default.isSupportMainSlideForMapShow() &&
            M.default.createElement(
              ge,
              {
                style: {},
              },
              M.default.createElement(
                A.PureImageButton,
                (0, s.default)(
                  {
                    image: t.typeIcon,
                    imageWidth: 28,
                    imageHeight: 28,
                    enabled: n,
                    funcId: 'home_map_type',
                  },
                  b.default.getAccessibilityLabel('home_map_type', ce.map_element_switcher_title),
                  {
                    onPress: this._onPressMapTypeButton,
                  }
                )
              ),
              M.default.createElement(ge, {
                style: {
                  backgroundColor: this.context.theme.navBorderColor,
                  height: 1,
                  width: 30,
                  marginTop: 5,
                  alignSelf: 'center',
                },
              })
            ),
          M.default.createElement(
            A.PureImageButton,
            (0, s.default)(
              {
                image: this.context.theme.floorMapItem.editImg,
                imageWidth: 28,
                imageHeight: 28,
                enabled: n,
                funcId: 'home_more',
              },
              b.default.getAccessibilityLabel('home_more', ce.smart_scene_more),
              {
                onPress: this._onPressMapEditButton,
              }
            )
          )
        );
      },
    },
    {
      key: 'getDebugButton',
      value: function () {
        if (y.RSM.state == y.RobotState.UNKNOWN) return null;
        var t = this.context.theme.homeSidebar,
          n = M.default.createElement(A.PureImageButton, {
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
            style: Be.debugButton,
            onPress: this.onPressDebugButton.bind(this),
          });
        return (z.DMM.isV2 || z.DMM.isV4 || z.DMM.isV5 || I.default.isDebuggableV1User()) && !I.default.is2022CESIpad() ? n : null;
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
          n = z.DMM.isTopazSV || z.DMM.isPearlPlus ? ce.camera_monitor_voice_privacy_title : ce.camera_monitor_privacy_title;
        return M.default.createElement(F.MonitorPrivacyDialogWithNavbar, {
          ref: function (n) {
            return (t.monitorPrivacyDialog = n);
          },
          confirmTextColor: '#007AFF',
          confirmTitle: ce.button_title_agree,
          title: n,
          privacyTitle: z.DMM.isTopazSV || z.DMM.isPearlPlus ? ce.monitor_voice_privacy_dialog_title : ce.monitor_privacy_dialog_title,
          onConfirm: function () {
            (0, D.LogEventCommon)('monitor_privacy_dialog_confirm');
            k.default.updateMonitorPrivacy(!0, function (n) {
              return u.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        if ((!n && globals.showToast(ce.robot_communication_exception), !n)) {
                          o.next = 6;
                          break;
                        }

                        t.saveMonitorPrivacyVersionAgreedVersionOnServer();
                        o.next = 5;
                        return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MonitorPrivacyVersion, R.StorageKeys.MonitorPrivacyVersion));

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
              refrence: C.default.MonitorPrivacy(),
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
        return M.default.createElement(K.PhotoFeaturePrivacyDialog, {
          ref: function (n) {
            return (t.photoPrivacyDialog = n);
          },
          confirmTextColor: '#007AFF',
          confirmTitle: ce.button_title_agree,
          cancelTitle: ce.alert_button_disagree,
          onConfirm: function () {
            return k.default.updatePhotoPrivacy(!0, function (n) {
              !n && globals.showToast(ce.robot_communication_exception);
              n && (0, R.SetStorageKey)(R.StorageKeys.PhotoPrivacyVersion, R.StorageKeys.PhotoPrivacyVersion);
              t.savePhotoPrivacyVersionAgreedVersionOnServer();
              Me.postPrivacyAgreementStatusWithVersion(y.RSM.serverCode, 4, ke.RRPhotoPrivacyVersion || 1)
                .then(function (t) {})
                .catch(function (t) {});
            });
          },
          onCancel: function () {
            t.overlesslyLoadingView && t.overlesslyLoadingView.showWithText();
            y.RSM.hardLockCameraStatus();
            Me.postPrivacyAgreementStatusWithVersion(y.RSM.serverCode, 5, ke.RRPhotoPrivacyVersion || 1)
              .then(function (t) {})
              .catch(function (t) {});
            k.default.updatePhotoPrivacy(!1, function (n) {
              !n && globals.showToast(ce.robot_communication_exception);
              t.overlesslyLoadingView && t.overlesslyLoadingView.hide();
              y.RSM.unHardLockCameraStatus();
            });
          },
          onPressLink: function () {
            return t.navigateTo('WebViewPage', {
              title: ce.map_object_privacy_title,
              refrence: C.default.PhotoPrivacy(),
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
          ? M.default.createElement(ge, {
              style: Be.maskShare,
            })
          : null;
      },
    },
    {
      key: 'getBackDockSheetView',
      value: function () {
        var t = this,
          n = (y.RSM.isWashDock() || y.RSM.isCollectWashDock() || y.RSM.isCollectWashDryDock()) && y.RSM.isWaterBoxCarriageIn && y.RSM.isWaterBoxIn,
          o = n && I.default.isWashThenChargeCmdSupported(),
          s = !y.RSM.isBackDockWashingDusterMode() && y.RSM.backDockResumeFlag == y.BackDockResumeFlag.Has,
          u = y.RSM.isBackDockWashingDusterMode() && y.RSM.backDockResumeFlag == y.BackDockResumeFlag.Has,
          l = y.RSM.backDockResumeFlag == y.BackDockResumeFlag.Has,
          c = [
            {
              title: s ? ce.main_page_charge_4 : ce.terminate_current_task_back_dock,
              action: 'charge',
            },
          ];
        !I.default.isBackChargeAutoWashSupported() &&
          o &&
          !l &&
          c.push({
            title: ce.terminate_current_task_wash_then_back_dock,
            action: 'washThenCharge',
          });
        n &&
          c.push({
            title: u ? ce.robot_cmd_resume_back_washing : y.RSM.cleanResumeFlag == y.CleanResumeFlag.None ? ce.robot_cmd_start_washing_duster : ce.terminate_current_task_then_wash,
            action: 'wash',
          });
        this.actionSheetActions = c;
        return M.default.createElement(A.ActionSheetView, {
          ref: function (n) {
            return (t.actionSheet = n);
          },
          title: l ? null : ce.terminate_current_task_back_dock_tip,
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
          o = me.get('window'),
          s = o.width,
          u = o.height,
          l = Me.isWindowDisplay ? ne.titleBarContentHeight + 14 : ne.titleBarContentHeight + Se.StatusBarHeight + Se.AppBarMarginTop + (b.default.isIphone14Series() ? 15 : 0),
          c = b.default.iOSAndroidReturn(l, ne.titleBarHeight),
          p = I.default.isFirmwareProgressSupported() && y.RSM.state == y.RobotState.UPDATING;
        return M.default.createElement(
          M.default.Fragment,
          null,
          M.default.createElement(ge, {
            style: {
              position: 'absolute',
              width: s,
              backgroundColor: n.pageBackgroundColor,
              height: u,
              top: 0,
              left: 0,
            },
          }),
          M.default.createElement(
            ge,
            {
              style: [
                {
                  backgroundColor: n.pageBackgroundColor,
                  height: T.default.sharedCache().ScreenHeight,
                  top: -c,
                },
              ],
            },
            M.default.createElement(
              ge,
              {
                style: [Be.container],
              },
              !p && this.getMapView(),
              this.getTopView(),
              p &&
                M.default.createElement(oe.default, {
                  style: {
                    marginTop: H.MapViewInnerTop,
                  },
                }),
              y.RSM.state != y.RobotState.UNKNOWN &&
                M.default.createElement(U.default, {
                  parent: this,
                  tabDidChange: this.tabDidChange.bind(this),
                  childrenAboveTab: this.getSidebar.bind(this),
                  childrenBelowTab: this.getAllMsgViews.bind(this),
                  cleanSegments: this.state.cleanSegments,
                  switchSegmentTabDidFail: this.showEnableMapSaveDialog.bind(this),
                  infoWrapperData: this.state.infoWrapperData,
                  askBeforeBackDock: this.askBeforeBackDock.bind(this),
                  handleNoMapFirstClean: function () {
                    var n;
                    return null == t ? void 0 : null == (n = t.multimapHintModal) ? void 0 : n.show();
                  },
                  updateParent: function (n) {
                    t.setState(ue({}, n));
                  },
                }),
              M.default.createElement(A.AlertView, {
                ref: function (n) {
                  return (t.alert = n);
                },
                isModal: !0,
                noAnimated: !0,
              }),
              this.showShareMaskView(),
              M.default.createElement(A.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'loading_view_loading',
                closeAccessibilityLabelKey: 'loading_view_loading_close',
                ref: function (n) {
                  t.loadingView = n;
                },
                showButton: !0,
              }),
              M.default.createElement(A.CancelableLoadingView, {
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
              M.default.createElement(A.AIRobotView, {
                ref: function (n) {
                  t.aiRobotGuide = n;
                },
              }),
              this.getIncrementalMapDebugView(),
              M.default.createElement(ae.default, {
                isModal: (Me.isMiApp, !0),
                ref: function (n) {
                  t.dialogView = n;
                },
              }),
              M.default.createElement(Q.default, {
                isModal: (Me.isMiApp, !0),
                ref: function (n) {
                  t.guideView = n;
                },
                onDismiss: function () {
                  var n, o, s;
                  (null == (n = t.forceUpdateView) ? void 0 : null == (o = n.state) ? void 0 : o.modalVisible) || null == (s = t.dialogView) || null == s.show || s.show();
                },
              }),
              M.default.createElement(X.default, {
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
              M.default.createElement(X.default, {
                ref: function (n) {
                  t.quickCreateMapGuide = n;
                },
                isModal: !0,
                parent: this,
                bgImage: n.guideImages.mapSave,
                topTitle: ce.multi_map_start_build_title,
                context: ce.multi_map_start_build_text_1 + '\n' + ce.multi_map_start_build_text_2 + '\n' + ce.multi_map_start_build_text_3 + '\n' + ce.multi_map_start_build_text_4,
                buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
                buttonFuncId: ['quick_create_map_home_confirm'],
                onPressSingleButton: function () {
                  t.onPressQuickCreateMap(function () {
                    var n;
                    null == (n = t.quickCreateMapGuide) || n.dismissModalView();
                  });
                },
                hasCloseButton: !0,
              }),
              M.default.createElement(ie.default, {
                ref: function (n) {
                  return (t.chooseMapAlert = n);
                },
                onPressLeft: function () {
                  var n;
                  null == (n = t.chooseMapAlert) || null == n.hide || n.hide();
                  w.default
                    .updateUnsaveMap(y.UnsaveMapHandle.Ignore)
                    .then(function () {
                      globals.showToast(ce.map_reset_page_operate_success);
                    })
                    .catch(function (t) {
                      globals.showToast(ce.map_object_ignore_failed);
                    });
                },
                onRotateMap: function (n) {
                  t.setRotateMapAngle(n);
                },
                onPressRight: function () {
                  var n;
                  null == (n = t.chooseMapAlert) || null == n.hide || n.hide();
                  w.default
                    .updateUnsaveMap(y.UnsaveMapHandle.Load)
                    .then(function () {
                      globals.showToast(ce.map_reset_page_operate_success);
                    })
                    .catch(function (t) {
                      globals.showToast(ce.map_object_ignore_failed);
                    });
                },
              }),
              M.default.createElement(ee.default, {
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
              M.default.createElement(X.default, {
                ref: function (n) {
                  t.forceUpdateView = n;
                },
                isModal: !Me.isMiApp && !0,
                parent: this,
                bgImage: this.context.theme.guideImages.newFirmware,
                topTitle: ce.new_firmware_detected,
                context: ce.new_firmware_detected1,
                buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
                buttonFuncId: ['force_update_firmware_view'],
                onPressSingleButton: function () {
                  t.openDeviceUpgradePage();
                },
              }),
              M.default.createElement(ie.LoadBackupMapView, {
                ref: function (n) {
                  return (t.loadBakMapView = n);
                },
                mapID: y.RSM.currentMapId,
                onPressLeft: function () {
                  var n;
                  return null == (n = t.loadBakMapView) ? void 0 : n.hide();
                },
                onPressRight: function () {
                  return t.loadBackupMapView();
                },
              }),
              this.hasGotStatus &&
                M.default.createElement(re.default, {
                  ref: function (n) {
                    return (t.multimapHintModal = n);
                  },
                  isModal: !0,
                  navigator: this.props.navigator,
                  onPressCreateMap: function () {},
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
          Me.openDeviceUpgradePage();
        }, 500);
      },
    },
    {
      key: 'tabDidChange',
      value: function (t) {
        var n, o, s;
        return u.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  if (t != this.tabIndex) {
                    l.next = 2;
                    break;
                  }

                  return l.abrupt('return');

                case 2:
                  if (((this.tabIndex = t), (n = t == U.TabGlobal), (o = t == U.TabZone), (s = t == U.TabSegment), t == U.TabNeutral, !o || this.state.mapType == De.NORMAL)) {
                    l.next = 12;
                    break;
                  }

                  l.next = 10;
                  return u.default.awrap(this.changeMapType(De.NORMAL));

                case 10:
                  l.next = 16;
                  break;

                case 12:
                  if (!s || this.state.mapType == De.NORMAL) {
                    l.next = 16;
                    break;
                  }

                  if (!(Me.apiLevel < 10015)) {
                    l.next = 16;
                    break;
                  }

                  l.next = 16;
                  return u.default.awrap(this.changeMapType(De.NORMAL));

                case 16:
                  if (!n || this.state.mapType == this.lastMapType) {
                    l.next = 21;
                    break;
                  }

                  l.next = 19;
                  return u.default.awrap(this.changeMapType(this.lastMapType));

                case 19:
                  l.next = 25;
                  break;

                case 21:
                  if (!s || this.state.mapType == this.lastMapType) {
                    l.next = 25;
                    break;
                  }

                  if (!(Me.apiLevel >= 10015)) {
                    l.next = 25;
                    break;
                  }

                  l.next = 25;
                  return u.default.awrap(this.changeMapType(this.lastMapType));

                case 25:
                  this.checkMapStatus();

                case 26:
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
      key: 'postPrivacyAgreement',
      value: function () {
        var t;
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return u.default.awrap(Me.postPrivacyAgreementStatus(y.RSM.serverCode, 2));

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
          l,
          c,
          p,
          h = this;
        return u.default.async(
          function (f) {
            for (;;)
              switch ((f.prev = f.next)) {
                case 0:
                  if (!((z.DMM.isTanosV && Me.apiLevel < 10005) || ((z.DMM.isTopazSV || z.DMM.isPearlPlus || z.DMM.isTanosSV) && Me.apiLevel < 10010))) {
                    f.next = 3;
                    break;
                  }

                  this.alert &&
                    this.alert.customAlert('', ce.map_object_app_version_tip, null, null, {
                      shouldShowCancel: !1,
                    });
                  return f.abrupt('return');

                case 3:
                  if (k.default.realTimeMonitorEnabled) {
                    f.next = 6;
                    break;
                  }

                  this.alert &&
                    this.alert.customAlert(
                      '',
                      ce.open_real_monitor_firstly_tip,
                      function () {
                        (0, D.LogEventCommon)('open_real_time_video_alert_confirm');
                        h.navigateTo('CameraSettingDetail');
                      },
                      function () {
                        (0, D.LogEventCommon)('open_real_time_video_alert_cancel');
                      },
                      {
                        confirmTitle: ce.goto_setting_on,
                        confirmColor: '#007AFF',
                      }
                    );
                  return f.abrupt('return');

                case 6:
                  -1 == parseInt(T.MC.MonitorPrivacyVersionAgreedOnServer) && this.getMonitorPrivacyVersionAgreedVersionOnServer();
                  t = parseInt(T.MC.MonitorPrivacyVersionAgreedOnServer) == ke.RRMonitorPrivacyVersion;
                  f.next = 10;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MonitorPrivacyVersion));

                case 10:
                  if (((n = f.sent), (o = !!n || t), (k.default.monitorPrivacyPolicyAgreed && o) || !k.default.hasGot)) {
                    f.next = 15;
                    break;
                  }

                  this.monitorPrivacyDialog && this.monitorPrivacyDialog.show();
                  return f.abrupt('return');

                case 15:
                  f.next = 18;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.HasSetInitialGesturePassword));

                case 18:
                  s = !!f.sent;
                  l = this;

                  c = function () {
                    h.navigateTo('MonitorPage', {
                      enabledTitleBarUpdate: function () {
                        l.shouldUpdateNavbar = !0;
                      },
                      monitorPageUnmount: function () {
                        l.forceUpdate();
                      },
                      willPortraitScreen: function () {
                        l.setState(
                          {
                            shouldHideMap: !1,
                          },
                          function () {
                            l.updateMap();
                          }
                        );
                      },
                      willFullScreen: function (t) {
                        l.setState(
                          {
                            shouldHideMap: !0,
                          },
                          t
                        );
                      },
                    });
                  };

                  p = function (t) {
                    h.navigateTo('GesturePasswordPage', {
                      mode: t,
                      didSetPassword:
                        0 == t &&
                        function () {
                          c();
                        },
                      navigateToMonitorPage: c,
                      enabledTitleBarUpdate: function () {
                        h.shouldUpdateNavbar = !0;
                      },
                      shouldShowSkip: 0 == t,
                      skip:
                        0 == t &&
                        function () {
                          return u.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    c();
                                    t.next = 3;
                                    return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.HasSetInitialGesturePassword, R.StorageKeys.HasSetInitialGesturePassword));

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
                        h.forceUpdate();
                      },
                    });
                  };

                  this.shouldUpdateNavbar = !1;

                  (function () {
                    y.RSM.secPasswordEnabled ? p(1) : s ? c() : p(0);
                  })();

                case 25:
                case 'end':
                  return f.stop();
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
          (n.shareView.capture(P.MM.mapData, function (o, s) {
            console.log('share path -' + s + ' - name - ' + o);
            n.setState({
              screenShotPath: s,
            });
            Me.openShareListBar(
              '\u5206\u4eab',
              '\u5206\u4eab',
              {
                uri: s,
              },
              ''
            );
            t.updateNaviItemsIfNeeded(
              t.settingIconConfig,
              ue(
                ue({}, t.shareIconConfig),
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
            ue(
              ue({}, this.shareIconConfig),
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
              ce.open_map_save_mode_tip,
              '',
              function () {
                I.default.isMultiFloorSupported();
                var n = 'MultiFloorPage';
                t.navigateTo(n, null);
              },
              null,
              {
                confirmTitle: ce.goto_setting_on,
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
        return u.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  if (y.RSM.state != y.RobotState.UPDATING && I.default.isAvoidCollisionSupported() && !this.hasCheckedCollisionAlert) {
                    o.next = 2;
                    break;
                  }

                  return o.abrupt('return');

                case 2:
                  o.next = 4;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AvoidCollisionGuide));

                case 4:
                  t = !!o.sent;
                  this.hasCheckedCollisionAlert = !0;
                  k.default.cameraEnabled &&
                    !t &&
                    setTimeout(function () {
                      return u.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                n.addGuide([
                                  {
                                    bgImage: n.context.theme.guideImages.avoidCollision,
                                    topTitle: ce.avoid_collision_mode,
                                    context: ce.structure_light_tip_3,
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
                                      w.default
                                        .setCollisionAvoidStatus(n.guideView.isSwitchOn ? 1 : 0)
                                        .then(function (t) {
                                          n.guideView.nextOrHide();
                                        })
                                        .catch(function (t) {
                                          globals.showToast(ce.robot_communication_exception);
                                          n.guideView.nextOrHide();
                                        })
                                        .finally(function () {
                                          n.guideView.endLoading();
                                        });
                                    },
                                  },
                                ]);
                                t.next = 3;
                                return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.AvoidCollisionGuide, 'true'));

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

        if (y.RSM.state != y.RobotState.UPDATING && !k.default.hasShownPetModeAlert && I.default.isPetModeSettingSupported() && !this.hasCheckedPetAlert && !y.RSM.isRunning) {
          this.hasCheckedPetAlert = !0;
          if (k.default.cameraEnabled)
            setTimeout(function () {
              L.Log.log(L.LogTypes.Home, 'begin update pet status,' + JSON.stringify(k.default), L.InfoColors.Normal, !0);
              t.addGuide([
                {
                  bgImage: t.context.theme.guideImages.pet,
                  topTitle: ce.pet_guide_title,
                  context: ce.if_has_pet_tip_detail,
                  buttonFuncId: ['pet_guide_ok'],
                  checkBoxInfo: {
                    selected: !1,
                    onSelect: function (n) {
                      t.guideView.selectCheckBox(n);
                    },
                  },
                  onPressSingleButton: function () {
                    k.default.updatePetModeEnabled(t.guideView.isCheckBoxOn);
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
        return u.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.next = 2;
                  return u.default.awrap(P.MM.getCustomCleanMode());

                case 2:
                  if ((this.mapView && this.mapView.setAllCleanMopMode(P.MM.customCleanModes), this.handleCleanWaterModeDidChange(), !I.default.isMultiFloorSupported())) {
                    t.next = 7;
                    break;
                  }

                  t.next = 7;
                  return u.default.awrap(P.MM.getMultiMaps());

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap(P.MM.getCleanSequence());

                case 2:
                  null == (t = this.mapView) || t.setCleanSequence(P.MM.cleanSequence.concat());

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
      key: 'customModeDidChange',
      value: function (t, n, o) {
        return u.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if (((s.prev = 0), !y.RSM.isSupportFeature(118))) {
                    s.next = 6;
                    break;
                  }

                  s.next = 4;
                  return u.default.awrap(w.default.setCleanMotorMode(t, n));

                case 4:
                  s.next = 12;
                  break;

                case 6:
                  s.next = 8;
                  return u.default.awrap(w.default.setCustomMode(t));

                case 8:
                  s.next = 11;
                  return u.default.awrap(w.default.setWaterBoxMode(n));

                case 11:
                  s.sent;

                case 12:
                  y.RSM.fanPower = t;
                  y.RSM.waterBoxMode = n;
                  this.sidebarMenu && this.sidebarMenu.updateModeIcon(t, n, y.RSM.mopMode);
                  o && this.customModeView && this.customModeView.hide();
                  console.log('set mode rpc success,  cleanMode- ' + t + ' waterMode - ' + n);
                  fe.emit(R.NotificationKeys.DidReceiveSpecialEvent, {
                    data: R.EventKeys.CleanWaterModeDidChange,
                  });
                  s.next = 24;
                  break;

                case 20:
                  s.prev = 20;
                  s.t0 = s.catch(0);
                  this.customModeView && this.customModeView.showToast(ce.robot_communication_exception);
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
        return u.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  this.mapView && this.mapView.resetSelectBlocks();
                  this.checkMapStatus();
                  t.next = 4;
                  return u.default.awrap(P.MM.getMap(!0));

                case 4:
                  t.next = 6;
                  return u.default.awrap(P.MM.updateRoomNameMapping());

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
        var t = this.tabIndex == U.TabSegment,
          n = this.tabIndex == U.TabGlobal,
          o = (y.RSM.isCustomCleanMode() || y.RSM.isCustomWaterMode() || y.RSM.isCustomMopMode()) && (n || t),
          s = y.RSM.isSegmentCleanTaskShouldResume() || y.RSM.state == y.RobotState.SEGMENT_CLEAN;

        if (o) {
          var u = null;
          u = t
            ? s
              ? B.MapModelInCleanMode.Segment_Clean_Read_Only_With_Clean_Type
              : B.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type
            : B.MapModelInCleanMode.Global_Clean_With_Clean_Type;
          this.mapView && this.mapView.changeMapViewMode(u);
          o && this.mapView && this.mapView.setAllCleanMopMode(P.MM.customCleanModes);
        } else {
          n && this.mapView && this.mapView.changeMapViewMode(B.MapModelInCleanMode.Global_Clean);
          t && this.mapView && this.mapView.changeMapViewMode(s ? B.MapModelInCleanMode.Segment_Clean_Read_Only : B.MapModelInCleanMode.Segment_Clean_Edit);
        }
      },
    },
    {
      key: '_onPressVirtualWallAndForbiddenZoneButton',
      value: function () {
        this.navigateTo('MapEditForbiddenZonePage', {
          title: ce.map_edit_virtual_wall_and_forbidden_zone,
        });
      },
    },
    {
      key: '_onPressResetMapButton',
      value: function () {
        var t = this;

        if (I.default.isMultiFloorSupported() || y.RSM.mapSaveEnabled) {
          I.default.isMultiFloorSupported();
          var n = 'MultiFloorPage';
          this.navigateTo(n, {
            title: ce.map_edit_title,
          });
        } else
          setTimeout(function () {
            t.alert &&
              t.alert.customAlert(
                ce.open_map_save_mode_tip,
                '',
                function () {
                  return t.navigateTo('MultiFloorPage');
                },
                null,
                {
                  confirmTitle: ce.goto_setting_on,
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
              ce.main_page_top_tip_has_selected.templateStringWithParams({
                zones: t.length,
              })
            : ce.home_menu_select_zone_tip;
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
              ce.mainpage_top_tip_has_drawed.templateStringWithParams({
                zones: t,
              })
            : ce.home_menu_draw_zone_tip;
        this.setState({
          topTip: n,
        });
      },
    },
    {
      key: 'didTapMapWhenNoBlocks',
      value: function () {
        var t = {
            text: ce.localization_strings_Main_MainPage_11,
            onPress: function () {},
          },
          n = {
            text: ce.go_to_settings,
            onPress: this._onPressZoneEditButton,
          };
        globals.Alert.alert(ce.mainpage_unknown_segment_click_tips, '', [t, n]);
      },
    },
    {
      key: '_onPressMapObjectBubble',
      value: function (t, n) {
        var o = this,
          s = k.default.mapObjectPhotoEnabled;
        (0, D.LogEventCommon)('tap_map_object_bubble', {
          photoEnabled: s,
        });
        this.navigateTo('MapObjectPhotoPage', {
          title: ce.obstacle_pop_type_ai,
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
          title: ce.map_edit_bottom_menu_mode,
        });
      },
    },
    {
      key: '_onPressDockBubble',
      value: function () {
        y.RSM.isCollectDock()
          ? this.props.navigation.navigate('DustCollectionModeSetting', {
              title: ce.dust_collection_setting_title,
              parent: this,
            })
          : y.RSM.isO2Dock()
          ? this.props.navigation.navigate('WashTowelSettingNew', {
              parent: this,
              dustCollectionVisible: y.RSM.isCollectDustDock,
            })
          : (y.RSM.isCollectWashDryDock() || y.RSM.isCollectWashDock()) &&
            this.props.navigation.navigate('DockSettingPage', {
              title: ce.robot_setting_self_cleaning_title,
            });
      },
    },
    {
      key: '_onPressChargerErrorBubble',
      value: function () {
        y.RSM.errorCode > 0 && this.onOpenErrorDetailPage(y.RSM.errorCode);
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
          null == (n = s.mapView) || n.changeMapViewMode(B.MapModelInCleanMode.Zone_Clean_Edit);
          null == (o = s.mapView) || o.addRectangle(t);
          fe.emit(R.NotificationKeys.BottomControlDoAction, {
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
          title: ce.map_edit_bottom_menu_order,
        });
      },
    },
    {
      key: '_onPressGroundEditButton',
      value: function () {
        I.default.groundOnlySupportFloor()
          ? this.navigateTo('MapEditFloorMaterialPage', {
              title: ce.map_edit_floor_wood_tile,
            })
          : I.default.groundOnlySupportCarpet()
          ? this.navigateTo('MapEditCarpetPage', {
              action: (0, B.getCarpetPageAction)(),
              title: ce.map_edit_carpet_ignore_title,
            })
          : I.default.groundOnlySupportDoorSill()
          ? this.navigateTo('MapEditDoorSillPage', {
              title: ce.map_edit_door_sill_title,
            })
          : this.navigateTo('MapEditGroundPage', {
              title: ce.map_edit_ground_material_title,
            });
      },
    },
    {
      key: '_onPressRotateMapButton',
      value: function () {
        this.navigateTo('MapEditRotatePage', {
          title: ce.map_edit_rotate_map_title,
        });
      },
    },
    {
      key: '_onPressFurnitureEditButton',
      value: function () {
        this.navigateTo('MapEditFurniturePage', {
          title: ce.map_edit_furniture_title,
        });
      },
    },
    {
      key: 'onPressBackup',
      value: function () {
        var t, n;
        null == (t = (n = this.modalMapEditMenu).hide) || t.call(n);
        y.RSM.isRunning
          ? (0, q.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
              globals.showToast(ce.robot_communication_exception);
            })
          : this.backup();
      },
    },
    {
      key: 'backup',
      value: function () {
        var t = new J.MultiMapDataProvider();
        if (y.RSM.isRunning)
          (0, q.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
            globals.showToast(ce.robot_communication_exception);
          });
        else {
          var n = {
            text: ce.localization_strings_Setting_RemoteControlPage_51,
          };
          null == t ||
            null == t.backupMap ||
            t
              .backupMap(y.RSM.currentMapId)
              .then(function () {
                globals.Alert.alert(ce.backup_success_hint, '', [n]);
                P.MM.getMultiMaps();
              })
              .catch(function () {
                globals.showToast(ce.robot_communication_exception);
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

        var o = function () {
          var t = new J.MultiMapDataProvider();
          n.loadBakMapView.hide();
          null == t ||
            null == t.recoverMultiMap ||
            t
              .recoverMultiMap(y.RSM.currentMapId)
              .then(function (t) {
                J.MapListDataProvider.syncSmartSceneIfNeeded();
                console.log('RecoverMultiMap: Success');
              })
              .catch(function (t) {
                globals.showToast(ce.robot_communication_exception);
              });
        };

        Me.isMiApp
          ? o()
          : globals.Alert.alert('', ce.recover_map_hint, [
              {
                text: ce.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: ce.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  o();
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
        y.RSM.isRunning
          ? (0, q.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
              globals.showToast(ce.robot_communication_exception);
            })
          : null == (o = this.loadBakMapView) || o.show();
      },
    },
    {
      key: 'onPressQuickCreateMap',
      value: function (t) {
        var n = this;

        if (y.RSM.isRunning) {
          (0, q.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
            globals.showToast(ce.robot_communication_exception);
          });
          return void (null == t || t());
        }

        if (y.RSM.battery < 20) {
          globals.showToast(ce.localization_strings_Main_Constants_33);
          return void (null == t || t());
        }

        var o,
          s = new J.MultiMapDataProvider();
        I.default.isCarpetSupported() && !z.DMM.isGarnet
          ? (null == (o = this.quickCreateMapGuide) || o.startLoading(),
            w.default
              .getCarpetCleanMode()
              .then(function (t) {
                if (t.result[0].carpet_clean_mode == ve.CarPetCleanModeSettingMap.CarpetAvoidMode) {
                  var o = {
                      text: ce.localization_strings_Main_MainPage_11,
                    },
                    u = {
                      text: ce.go_to_settings,
                      onPress: function () {
                        return n.props.navigation.navigate('CarpetCleanModeSetting');
                      },
                    };
                  globals.Alert.alert(ce.quick_create_map_alert_title, '', [o, u]);
                } else s.quickCreateMap();
              })
              .catch(function (t) {
                globals.showToast(ce.map_object_ignore_failed);
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
      key: 'showBuildMapFinishGuideIfNeeded',
      value: function () {
        var t = this;
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if (!this.hasShownMapFinishGuide) {
                    n.next = 2;
                    break;
                  }

                  return n.abrupt('return');

                case 2:
                  n.next = 4;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.BuildMapFinishGuide));

                case 4:
                  if (n.sent) {
                    n.next = 11;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.buildMapFinish,
                      topTitle: ce.build_map_finish_guide_title,
                      context: ce.build_map_finish_guide_content + '\n',
                      buttonFuncId: ['build_map_guide_ok'],
                      autoNextPage: !1,
                      onPressSingleButton: function () {
                        t.guideView.replaceDataAtIndex(
                          {
                            bgImage: t.context.theme.guideImages.buildMapMapEdit,
                            topTitle: ce.build_map_map_edit_guide_title,
                            context: ce.build_map_map_edit_guide_content,
                            buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
                            buttonFuncId: ['multi_map_guide_ok'],
                            onPressSingleButton: function () {},
                          },
                          t.guideView.currentPage
                        );
                        t.guideView.show();
                      },
                    },
                  ]);
                  this.hasShownMapFinishGuide = !0;
                  n.next = 10;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.BuildMapFinishGuide, 'true'));

                case 10:
                  return n.abrupt('return');

                case 11:
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
      key: 'showDockGuideIfNeeded',
      value: function () {
        var t, n, o;
        return u.default.async(
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
                  if (y.RSM.isCollectDock()) {
                    s.next = 5;
                    break;
                  }

                  return s.abrupt('return');

                case 5:
                  s.next = 7;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.DockGuide));

                case 7:
                  if (!s.sent) {
                    s.next = 10;
                    break;
                  }

                  return s.abrupt('return');

                case 10:
                  if ((t = T.MC.serialNumber)) {
                    s.next = 13;
                    break;
                  }

                  return s.abrupt('return');

                case 13:
                  n = Z.default.sharedManager().dockSetSNPrefixes;

                  o = function (t) {
                    return u.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              if (((n.t0 = t), !n.t0)) {
                                n.next = 4;
                                break;
                              }

                              n.next = 4;
                              return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.DockGuide, R.StorageKeys.DockGuide));

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
                            topTitle: ce.dock_guide_title,
                            context: ce.dock_guide_content_1,
                            buttonFuncId: ['dock_detect_guide_1_ok'],
                          },
                        ],
                        o
                      )
                    : this.addDialog(
                        [
                          {
                            bgImage: this.context.theme.guideImages.dockGuide0,
                            topTitle: ce.dock_guide_title,
                            context: ce.dock_guide_content_0,
                            buttonInfo: [ce.next_step],
                            buttonFuncId: ['dock_detect_guide_0_ok'],
                          },
                          {
                            bgImage: this.context.theme.guideImages.dockGuide1,
                            topTitle: ce.dock_guide_title,
                            context: ce.dock_guide_content_1,
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
      key: '_onShowGuideBubble',
      value: function () {
        var t,
          n,
          o,
          s = this;
        return u.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  t = R.StorageKeys.FindCarpetbyGuide;
                  l.next = 3;
                  return u.default.awrap((0, R.GetStorageKey)(t));

                case 3:
                  if (((n = l.sent), !P.MM.hasCarpetMap)) {
                    l.next = 11;
                    break;
                  }

                  if (!!n) {
                    l.next = 11;
                    break;
                  }

                  l.next = 9;
                  return u.default.awrap((0, R.SetStorageKey)(t, t));

                case 9:
                  Pe.setTimeout(function () {
                    var t;
                    null == (t = s.mapView) || t.findCarpetAndShowGuide();
                  }, 50);
                  return l.abrupt('return');

                case 11:
                  if (!y.RSM.isCollectDustDock) {
                    l.next = 23;
                    break;
                  }

                  if (!(!P.MM.hasCarpetMap || (P.MM.hasCarpetMap && n))) {
                    l.next = 23;
                    break;
                  }

                  o = R.StorageKeys.DustCollectionSequencebyGuide;
                  l.next = 16;
                  return u.default.awrap((0, R.GetStorageKey)(o));

                case 16:
                  if (((n = l.sent), !!n)) {
                    l.next = 22;
                    break;
                  }

                  l.next = 21;
                  return u.default.awrap((0, R.SetStorageKey)(o, o));

                case 21:
                  Pe.setTimeout(function () {
                    var t;
                    null == (t = s.mapView) || t.showChargerBubble();
                  }, 50);

                case 22:
                  Z.default
                    .sharedManager()
                    .getConfig()
                    .finally(function () {
                      s.showDockGuideIfNeeded();
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
      value: function (t) {
        var n = this;
        this.setState(
          {
            mopModeGuideMode: t,
          },
          function () {
            Pe.setTimeout(function () {
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
          title: ce.setting_robot_setting,
        });
      },
    },
    {
      key: 'checkShouldShowOfflineMapGuide',
      value: function () {
        var t = this;
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if (!this.hasCheckedOfflineMapGuide && I.default.isOfflineMapSupported()) {
                    n.next = 2;
                    break;
                  }

                  return n.abrupt('return');

                case 2:
                  this.hasCheckedOfflineMapGuide = !0;
                  n.next = 5;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.OfflineMapGuide));

                case 5:
                  if (!!n.sent) {
                    n.next = 10;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.createMap,
                      topTitle: ce.offline_map_guide_title,
                      context: ce.offline_map_guide_desc1 + '\n\n' + ce.offline_map_guide_desc2,
                      buttonFuncId: ['offline_map_guide_ok'],
                      switchInfo: {
                        on: y.RSM.offlineMapEnabled,
                        switchValueChanged: function (n) {
                          t.guideView.toggleSwitch(n);
                        },
                      },
                      autoNextPage: !1,
                      onPressSingleButton: function () {
                        t.guideView.isSwitchOn
                          ? (t.guideView.startLoading(),
                            w.default
                              .setOfflineMapStatus(!0)
                              .then(function (t) {})
                              .catch(function (t) {})
                              .finally(function () {
                                t.guideView.endLoading();
                                t.guideView.nextOrHide();
                              }))
                          : t.guideView.nextOrHide();
                      },
                    },
                  ]);
                  n.next = 10;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.OfflineMapGuide, 'true'));

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
      key: 'checkShouldShowMapSaveGuide',
      value: function () {
        var t,
          n = this;
        return u.default.async(
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
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.MapSaveGuide));

                case 5:
                  if (((t = !!o.sent), y.RSM.mapSaveEnabled || t)) {
                    o.next = 10;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.createMap,
                      topTitle: ce.map_edit_map_lab_save_map,
                      context: ce.map_edit_map_lab_save_map_des + '\n',
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
                          var t = new J.MapListDataProvider();
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
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.MapSaveGuide, 'true'));

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  I.default.isMultiFloorSupported()
                    ? (this.guideView.replaceDataAtIndex(
                        {
                          bgImage: this.context.theme.guideImages.multiFloor,
                          topTitle: ce.single_floor_save_new_map_home_multifloor,
                          context: ce.multi_floor_guide_content,
                          buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
                          buttonFuncId: ['multi_map_guide_ok'],
                          checkBoxInfo: {
                            selected: !1,
                            onSelect: function (n) {
                              t.guideView.selectCheckBox(n);
                            },
                          },
                          onPressSingleButton: function () {
                            t.guideView.isCheckBoxOn && new J.MultiMapDataProvider().toggleMultiMapFeature(!0);
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
        return u.default.async(
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
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ProhibitedBehaviorsGuide));

                case 6:
                  if (!!n.sent) {
                    n.next = 11;
                    break;
                  }

                  this.addGuide([
                    {
                      bgImage: this.context.theme.guideImages.prohibitedBahaviors,
                      topTitle: ce.robot_prohibited_behaviors_guide_title,
                      context: ce.robot_prohibited_behaviors_guide_desc,
                      buttonFuncId: ['prohibited_guide_ok'],
                    },
                  ]);
                  n.next = 11;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.ProhibitedBehaviorsGuide, 'true'));

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.HasShownMapObjectPhotoReminder));

                case 2:
                  if (
                    ((t = !!n.sent),
                    !(
                      (z.DMM.isTanosV || z.DMM.isTopazSV || z.DMM.isPearlPlus) &&
                      I.default.isFwFilterObstacleSupported() &&
                      !k.default.mapObjectPhotoEnabled &&
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
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.HasShownMapObjectPhotoReminder, 'true'));

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AreaUnitIndex));

                case 2:
                  t = n.sent;
                  T.default.sharedCache().areaUnitIndex = t || 0;
                  this.setState({
                    areaUnit: b.default.getAreaUnit(),
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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return u.default.awrap(Me.saveDeviceExtraValue('RRMonitorPrivacyVersion', ke.RRMonitorPrivacyVersion.toString()));

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return u.default.awrap(Me.getDeviceExtraInfoForKey('RRMonitorPrivacyVersion'));

                case 3:
                  t = n.sent;
                  console.log('getMonitorPrivacyVersionAgreedVersionOnServer - ' + t);
                  T.MC.MonitorPrivacyVersionAgreedOnServer = t.RRMonitorPrivacyVersion;
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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return u.default.awrap(Me.saveDeviceExtraValue('RRPhotoPrivacyVersion', ke.RRPhotoPrivacyVersion.toString()));

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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.prev = 0;
                  n.next = 3;
                  return u.default.awrap(Me.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                case 3:
                  t = n.sent;
                  console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                  T.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
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
        return u.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.ARMapPathPrefixKey + '_' + y.RSM.currentMapId));

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
        var t, n, o;
        return u.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  s.prev = 0;
                  s.next = 3;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + y.RSM.currentMapId));

                case 3:
                  if (!((t = s.sent) && t.length > 0)) {
                    s.next = 14;
                    break;
                  }

                  if (((n = parseInt(t)), !(Math.floor(new Date().getTime() / 1e3 / 60) - n > 10080))) {
                    s.next = 12;
                    break;
                  }

                  s.next = 10;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + y.RSM.currentMapId, ''));

                case 10:
                  s.next = 14;
                  break;

                case 12:
                  this.updataFurnitureReminder(0);
                  return s.abrupt('return');

                case 14:
                  if (!y.RSM.isRunning) {
                    s.next = 17;
                    break;
                  }

                  this.updataFurnitureReminder(0);
                  return s.abrupt('return');

                case 17:
                  o = P.MM.getNoEditFurnitureCount();
                  this.updataFurnitureReminder(o >= 3 ? o : 0);
                  s.next = 23;
                  break;

                case 21:
                  s.prev = 21;
                  s.t0 = s.catch(0);

                case 23:
                case 'end':
                  return s.stop();
              }
          },
          null,
          this,
          [[0, 21]],
          Promise
        );
      },
    },
    {
      key: 'updataFurnitureReminder',
      value: function (t) {
        t >= 3
          ? this.aiRobotGuide.addMsg({
              type: A.aiRobotType.Furniture,
              data: t,
              funcId: 'furniture_guide',
              accessibilityLabelKey: 'furniture_key_guide',
              title: ce.map_furniture_guide_title,
              detail: ce.map_furniture_guide_detail.templateStringWithParams({
                count: t,
              }),
              closeable: !0,
              pressAction: this.onPressFurnitureGuide,
              closeAction: this.closeFurnitureGuide,
            })
          : this.aiRobotGuide.removeMsg(A.aiRobotType.Furniture);
      },
    },
    {
      key: 'checkAIReminderStatus',
      value: function () {
        var t, n, o, s, l, c, p, h, f;
        return u.default.async(
          function (M) {
            for (;;)
              switch ((M.prev = M.next)) {
                case 0:
                  if (!y.RSM.isRunning) {
                    M.next = 3;
                    break;
                  }

                  this.showAIReminderView(B.SmartBubbleType.BT_NONE);
                  return M.abrupt('return');

                case 3:
                  if (!this.showBubbleGuide) {
                    M.next = 5;
                    break;
                  }

                  return M.abrupt('return');

                case 5:
                  if (!(I.default.isSupportCliffZone() && (null == (t = P.MM.mapData) ? void 0 : null == (n = t.clffbz) ? void 0 : null == (o = n.fbzs) ? void 0 : o.length) > 0)) {
                    M.next = 10;
                    break;
                  }

                  M.next = 8;
                  return u.default.awrap(this.dealShowAIGuide(B.SmartBubbleType.BT_CLIFF, P.MM.mapData.clffbz.fbzs));

                case 8:
                  if (!M.sent) {
                    M.next = 10;
                    break;
                  }

                  return M.abrupt('return');

                case 10:
                  if (
                    !(I.default.isSupportStuckZone() && (null == (s = P.MM.mapData) ? void 0 : null == (l = s.stuckpts) ? void 0 : null == (c = l.data) ? void 0 : c.length) > 0)
                  ) {
                    M.next = 15;
                    break;
                  }

                  M.next = 13;
                  return u.default.awrap(this.dealShowAIGuide(B.SmartBubbleType.BT_STUCK, P.MM.mapData.stuckpts.data));

                case 13:
                  if (!M.sent) {
                    M.next = 15;
                    break;
                  }

                  return M.abrupt('return');

                case 15:
                  if (
                    !(
                      I.default.isSupportSmartDoorSill() &&
                      (0, B.canEditDoorSill)() &&
                      (null == (p = P.MM.mapData) ? void 0 : null == (h = p.smartds) ? void 0 : null == (f = h.fbzs) ? void 0 : f.length) > 0
                    )
                  ) {
                    M.next = 20;
                    break;
                  }

                  M.next = 18;
                  return u.default.awrap(this.dealShowAIGuide(B.SmartBubbleType.BT_DOORSILL, P.MM.mapData.smartds.fbzs));

                case 18:
                  if (!M.sent) {
                    M.next = 20;
                    break;
                  }

                  return M.abrupt('return');

                case 20:
                case 'end':
                  return M.stop();
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
      key: 'dealShowAIGuide',
      value: function (t, n) {
        var o,
          s,
          l,
          c = this;
        return u.default.async(
          function (p) {
            for (;;)
              switch ((p.prev = p.next)) {
                case 0:
                  p.next = 2;
                  return u.default.awrap((0, R.GetStorageKey)(R.StorageKeys.AIZonesGuideNew));

                case 2:
                  if (
                    ((o = p.sent),
                    (s = !1),
                    o ? ((l = JSON.parse(o)), (s = !l[t] || l[t] != n.toString())) : (s = !0),
                    !(t == B.SmartBubbleType.BT_DOORSILL || t == B.SmartBubbleType.BT_STUCK || s))
                  ) {
                    p.next = 10;
                    break;
                  }

                  s && this.showAIReminderView(t);
                  setTimeout(function () {
                    var n;
                    return null == (n = c.mapView) ? void 0 : n.findSmartBubbleShowGuide(t);
                  }, 500);
                  return p.abrupt('return', !0);

                case 10:
                  return p.abrupt('return', !1);

                case 11:
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
      key: 'showAIReminderView',
      value: function (t) {
        var n = B.SmartBubbleConfig[t].guideTxt;
        t != B.SmartBubbleType.BT_NONE && n
          ? (this.aiRobotGuide.addMsg({
              type: A.aiRobotType.SmartFbzs,
              data: t,
              funcId: 'smartfbz_guide',
              accessibilityLabelKey: 'smartfbz_key_guide',
              title: n,
              closeable: !0,
              closeAction: this.onCloseAIZoneGuide,
            }),
            (this.showBubbleGuide = !0))
          : this.aiRobotGuide.removeMsg(A.aiRobotType.SmartFbzs);
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
                ue(
                  ue({}, P.MM.mapData),
                  {},
                  {
                    robotStatus: y.RSM.state,
                  }
                )
              );
          }
        );
      },
    },
    {
      key: 'updateShareButton',
      value: function () {
        Ce = I.default.isSharedAllowed() && 'cn' == y.RSM.serverCode;
        xe = Ce ? 1 : 0;
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
        return u.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  o.prev = 0;
                  n = Math.floor(new Date().getTime() / 1e3 / 60);
                  o.next = 4;
                  return u.default.awrap((0, R.SetStorageKey)(R.StorageKeys.CloseFurnitureGuide + '_' + y.RSM.currentMapId, n + ''));

                case 4:
                  o.next = 8;
                  break;

                case 6:
                  o.prev = 6;
                  o.t0 = o.catch(0);

                case 8:
                  o.prev = 8;
                  this.updataFurnitureReminder(0);
                  t && t();
                  return o.finish(8);

                case 12:
                case 'end':
                  return o.stop();
              }
          },
          null,
          this,
          [[0, 6, 8, 12]],
          Promise
        );
      },
    },
    {
      key: 'navigationItems',
      get: function () {
        var t = this.navSettingButton(),
          n = this.shareButton(),
          o = [];
        !this.shareIconConfig.isHidden && o.push(n);
        !I.default.is2022CESIpad() && o.push(t);
        return o;
      },
    },
    {
      key: 'infoWrapperData',
      get: function () {
        var t,
          n,
          o = this,
          s = null == (t = y.RSM.specialInfo) ? void 0 : t.text;

        switch (null == (n = y.RSM.specialInfo) ? void 0 : n.actionStyle) {
          case y.SpecialInfoType.DryRemainTime:
            return {
              info: s,
              icon: require(d[64]),
              actionIcon: null,
              action: null,
            };

          case y.SpecialInfoType.WaitCharge:
            return {
              info: s,
              icon: require(d[65]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                o.navigateTo('RobotSettingPage', {});
              },
            };

          case y.SpecialInfoType.PureClean:
            return {
              info: s,
              icon: require(d[66]),
              actionIcon: null,
              action: null,
            };

          case y.SpecialInfoType.PureMop:
            return {
              info: s,
              icon: require(d[67]),
              actionIcon: null,
              action: null,
            };

          case y.SpecialInfoType.CleanMopWithCleanRouteFast:
            return {
              info: s,
              icon: require(d[66]),
              actionIcon: null,
              action: null,
            };

          case y.SpecialInfoType.Timer:
            return b.default.isShareUser()
              ? null
              : {
                  info: s,
                  icon: require(d[65]),
                  actionIcon: this.context.theme.mapEditMenu.arrowImg,
                  action: function () {
                    y.RSM.state != y.RobotState.UPDATING &&
                      o.navigateTo('TimerPage', {
                        title: ce.localization_strings_Setting_index_3,
                      });
                  },
                };

          case y.SpecialInfoType.UnsaveMapReason:
            return {
              info: s,
              icon: require(d[68]),
              actionIcon: this.context.theme.mapEditMenu.arrowImg,
              action: function () {
                var t;
                null == (t = o.chooseMapAlert) || null == t.show || t.show();
              },
            };

          case y.SpecialInfoType.HasNewMap:
            return {
              info: s,
              icon: require(d[68]),
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
              topTitle: ce.tanos_s_mop_mode_title,
              context: ce.tanos_s_mop_mode_info1,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };

          case 303:
            return {
              bgImage: this.context.theme.guideImages.slowMop,
              topTitle: ce.tanos_s_mop_mode_title,
              context: ce.tanos_s_mop_mode_info2,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };

          case 304:
            return {
              bgImage: this.context.theme.guideImages.cleanRouteFastMode,
              topTitle: ce.clean_route_fast_mode_guide_title,
              context: ce.clean_route_fast_mode_guide_desc,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };

          case 305:
            return {
              bgImage: this.context.theme.guideImages.slowMopPearl,
              topTitle: ce.pearl_slow_mop_guide_title,
              context: ce.pearl_slow_mop_guide_detail,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };

          case 10304:
            return {
              bgImage: this.context.theme.guideImages.cleanRouteFastMode,
              topTitle: ce.unlock_clean_route_fast_mode_guide_title,
              context: ce.unlock_clean_route_fast_mode_guide_desc,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };

          default:
            return {
              bgImage: this.context.theme.guideImages.findCarpet,
              topTitle: ce.tanos_s_mop_mode_title,
              context: ce.tanos_s_mop_mode_info1,
              buttonInfo: [ce.localization_strings_Setting_RemoteControlPage_51],
            };
        }
      },
    },
  ]);
  return se;
})(M.default.Component);

exports.default = Ie;
Ie.contextType = W.AppConfigContext;
var Be = pe.create({
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
    width: 100,
    height: 100,
  },
  msgViewsWrap: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  debugButton: {
    position: 'absolute',
    top: 216 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    left: 10,
  },
  videoButton: {
    position: 'absolute',
    top: 245 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
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
    height: 92,
  },
  mapDiffText: {
    position: 'absolute',
    top: 160 + (O.StatusBar.currentHeight || 0) + Se.AppBarMarginTop,
    left: 30,
    height: 30,
    width: 300,
    fontSize: 15,
    color: 'gray',
    backgroundColor: 'transparent',
  },
});
