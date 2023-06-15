var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  f = require('./12'),
  module1798 = require('./1798'),
  module1343 = require('./1343'),
  module506 = require('./506'),
  module411 = require('./411'),
  module1229 = require('./1229'),
  module390 = require('./390'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module1342 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = V(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('./1342')),
  module381 = require('./381'),
  module1806 = require('./1806'),
  module407 = require('./407'),
  module387 = require('./387'),
  module1345 = require('./1345'),
  module1802 = require('./1802'),
  module386 = require('./386'),
  module415 = require('./415'),
  module379 = require('./379');

function V(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (V = function (t) {
    return t ? o : n;
  })(t);
}

function N(t, n) {
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

function x(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      N(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      N(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function Z() {
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
  module491 = require('./491').strings,
  G = {
    GlobalClean: 'GlobalClean',
    Segment: 'Segment',
    Zone: 'Zone',
  };

exports.SmartSceneMode = G;

var J = (function (t) {
  module7.default(N, t);

  var module49 = N,
    module506 = Z(),
    V = function () {
      var t,
        o = module11.default(module49);

      if (module506) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function N(t) {
    var n;
    module4.default(this, N);
    (n = V.call(this, t)).selectedBlockCount = 0;
    n.selectedRectCount = 0;
    n.zidList = [];
    n.state = {
      mode: G.Zone,
      shouldShowMap: true,
      noMap: {
        tip: '',
        showGuide: false,
      },
      cleanCount: 1,
      map: {
        selectedBlockCount: 0,
        selectedRectCount: 0,
      },
      bottomMenu: {
        isHidden: false,
        tip: '',
      },
      confirmButton: {
        isEnabled: false,
      },
      cleanMopMode: 0,
      cleanMode: 101,
      waterMode: 201,
      mopMode: module415.DMM.isGarnet ? 1 : 300,
      initializedInfo: false,
    };
    return n;
  }

  module5.default(N, [
    {
      key: 'componentDidMount',
      value: function () {
        this.configNavigationBar();
        this.initMapView();
        this.initParams();
        this.registListeners();
        module1229.MM.getMultiMaps();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.removeListeners();
      },
    },
    {
      key: 'render',
      value: function () {
        React.default.createElement(
          f.View,
          {
            style: [
              j.cleanMopWrap,
              {
                bottom: this.modeSwitchBottom,
              },
            ],
            pointerEvents: 'box-none',
          },
          React.default.createElement(
            module381.TopImageButton,
            module21.default({}, p, {
              imageWidth: 60,
              imageHeight: 60,
              fontSize: 11,
              textTop: -5,
              textColor: this.theme.homeSidebar.textColor,
              style: j.button,
              maxTextWidth: 80,
              enabled: module386.default.isSupportSmartScene(),
            })
          )
        );

        var t = this,
          n = React.default.createElement(
            f.Text,
            {
              style: {
                position: 'absolute',
                alignSelf: 'center',
                top: 80,
                fontSize: 10,
                color: this.theme.subTextColor,
              },
            },
            module491.localization_strings_Setting_RemoteControlPage_54
          ),
          s = React.default.createElement(module1343.default, {
            tip: this.state.noMap.tip,
            shouldShowGuideButton: this.state.noMap.showGuide,
          }),
          l = React.default.createElement(module1231.MapView, {
            left: 20,
            right: 20,
            style: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'stretch',
              backgroundColor: 'transparent',
            },
            ref: function (n) {
              return (t.mapView = n);
            },
            showAllBubbleInfo: true,
            selectedBlocksDidChange: function (n) {
              t.selectedBlocksDidChange(n);
            },
            selectedRectDidChange: function (n) {
              t.selectedRectDidChange(n);
            },
          }),
          u = React.default.createElement(
            f.View,
            {
              style: [
                j.confirmMenu,
                {
                  backgroundColor: this.theme.mapEdit.menuBackgroundColor,
                },
              ],
            },
            React.default.createElement(module381.PureImageButton, {
              funcId: '',
              imageWidth: 24,
              imageHeight: 24,
            }),
            React.default.createElement(
              f.Text,
              {
                style: {
                  fontSize: 14,
                  color: this.theme.mapEdit.itemTextColor,
                  paddingVertical: 40,
                },
              },
              this.state.bottomMenu.tip
            ),
            React.default.createElement(module381.PureImageButton, {
              funcId: 'smart_scene_confirm',
              style: j.confirmButton,
              image: this.theme.mapEdit.confirmMenuConfirmImg,
              imageWidth: 24,
              imageHeight: 24,
              enabled: this.state.confirmButton.isEnabled,
              onPress: function () {
                t.onPressMenuConfirm();
              },
            })
          ),
          c = React.default.createElement(
            f.View,
            {
              style: j.wrap,
              pointerEvents: 'box-none',
            },
            React.default.createElement(module1802.default, {
              ref: function (n) {
                return (t.sidebarMenu = n);
              },
              onPressMapEditButton: function () {
                t.onPressMapEditIcon();
              },
              onPressAddZoneButton: function () {
                t.onPressAddZone();
              },
              onPressCustomModeButton: function () {
                t.onPressCustomMode();
              },
              onCleanCountChanged: function (n) {
                t.onCleanCountChanged(n);
              },
              bottom: this.state.mode == G.GlobalClean ? 40 : 20,
              cleanCountButtonEnabled: module386.default.isSupportSmartScene(),
              addZoneButtonEnabled: module386.default.isSupportSmartScene(),
              isHiddenAddZone: this.state.mode == G.GlobalClean,
              isHiddenCleanCount: this.state.mode == G.GlobalClean,
              isHiddenCustomMode: this.state.mode == G.GlobalClean,
              isHiddenRedDot: true,
            })
          ),
          p = {
            title: this.modeSwitchTip,
            enabled: !module377.RSM.isCleaning() && !module377.RSM.isCleanTaskShouldResume(),
            image: this.modeSwitchImages[this.state.cleanMopMode],
            funcId: 'home_clean_count',
            onPress: this.onPressCleanMopModeButton.bind(this),
          },
          _ = React.default.createElement(module1798.default, {
            ref: function (n) {
              t.modalMapEditMenu = n;
            },
            contentBackgroundColor: 'transparent',
            parent: this,
            paddingBottom: 0,
            isBottomViewHidden: true,
            isGotoMyMapHidden: true,
            onClose: function () {
              var n;
              if (!(null == (n = t.modalMapEditMenu))) n.hide();
            },
            onPressFloor: function (n) {
              t.onPressFloor(n);
            },
            toastHandler: function (n) {
              t.modalMapEditMenu.showToast(n);
            },
            alertHandler: function (n, o, s) {
              t.modalMapEditMenu.alert(n, o, s);
            },
          }),
          v = React.default.createElement(module379.default, {
            ref: function (n) {
              t.customModeView = n;
            },
            didSetMode: function (n, o, s) {
              t.onCustomModePanelChange(n, o, s);
            },
            isInHomePage: false,
            isSmartScene: true,
            shouldShowCustomSwitch: false,
            isTabZone: this.state.mode == G.Zone,
            onPressQuestion: function () {
              return t.onPressQuestionIcon();
            },
            onPressMore: function () {
              t.customModeView.hide();
              t.props.navigation.navigate('MopModeListPage', {
                title: module491.custom_mode_panel_more_mode_title,
              });
            },
            isInMapEditPage: true,
          }),
          k = React.default.createElement(module1806.default, {
            ref: function (n) {
              t.newSwitchGuideView = n;
            },
            parent: this,
            bgImage: this.theme.guideImages.findCarpet,
            topTitle: module491.tanos_s_mop_mode_title,
            context: module491.tanos_s_mop_mode_info1,
            buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
            buttonFuncId: ['mop_mode_guide_ok'],
          }),
          B = React.default.createElement(module381.CancelableLoadingView, {
            loadingAccessibilityLabelKey: 'loading_view_loading',
            closeAccessibilityLabelKey: 'loading_view_loading_close',
            ref: function (n) {
              t.loadingView = n;
            },
            showButton: true,
          });

        return this.state.initializedInfo
          ? React.default.createElement(
              f.View,
              {
                style: [
                  module1342.MapEditCommonStyles.root,
                  {
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                    backgroundColor: this.theme.mapEdit.backgroundColor,
                  },
                ],
              },
              this.state.shouldShowMap ? l : s,
              !module386.default.isSupportSmartScene() && n,
              module1229.MM.maps.length > 0 && c,
              !this.state.bottomMenu.isHidden && u,
              _,
              v,
              k,
              B
            )
          : React.default.createElement(
              f.View,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.theme.mapEdit.backgroundColor,
                },
              },
              React.default.createElement(module381.Spinner, null)
            );
      },
    },
    {
      key: 'onPressMenuConfirm',
      value: function () {
        for (
          var t,
            n,
            o,
            s,
            l,
            u,
            c,
            p,
            S = this,
            f = {},
            h = (null != (t = this.selectedCleanSegments) ? t : []).map(function (t) {
              return {
                sid: t,
              };
            }),
            M = [],
            _ =
              null !=
              (n =
                null == (o = this.mapView)
                  ? undefined
                  : null == (s = o.getZoneParams())
                  ? undefined
                  : s.map(function (t) {
                      return {
                        range: t,
                      };
                    }))
                ? n
                : [],
            v =
              this.isTidValid(this.tid) &&
              null !=
                (l = this.zidList.map(function (t) {
                  return {
                    zid: t,
                  };
                }))
                ? l
                : [],
            b = 0;
          b < _.length ** v.length;
          b++
        )
          M.push(x(x({}, _[b]), v[b]));

        switch (this.state.mode) {
          case G.GlobalClean:
            this.loadingView.showWithText('');
            f = {
              method: 'do_scenes_app_start',
            };
            if (!(null == module389.setSmartSceneParams))
              module389
                .setSmartSceneParams(null == (u = globals.initialData) ? undefined : null == (c = u.initialPage) ? undefined : null == (p = c.data) ? undefined : p.mode, f)
                .then(function (t) {
                  console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
                })
                .catch(function (t) {
                  console.log('SmartSceneDebug: -- setSmartSceneParams - Failed: ' + JSON.stringify(t));
                })
                .finally(function () {
                  S.loadingView.hide();
                });
            break;

          case G.Segment:
            this.loadingView.showWithText('');
            module407.default
              .setScenesSegment([
                {
                  tid: this.tid,
                  segs: h,
                },
              ])
              .then(function (t) {
                var n, o, s, l;
                console.log('SmartSceneDebug: -- setScenesSegment - Success: ' + JSON.stringify(t));
                var u = (null != (n = null == t ? undefined : t.result) ? n : []).map(function (t) {
                  t.fan_power = S.state.cleanMode || module377.RSM.fanPower;
                  t.water_box_mode = S.state.waterMode || module377.RSM.waterBoxMode;
                  t.mop_mode = S.state.mopMode || module377.RSM.mopMode;
                  t.mop_template_id = S.state.mopMode || module377.RSM.mopModeId;
                  t.repeat = S.state.cleanCount;
                  t.clean_order_mode = 0;
                  return t;
                });
                f = {
                  method: 'do_scenes_segments',
                  params: {
                    data: u,
                    source: 101,
                  },
                };
                console.log('SmartSceneDebug: -- WillSend do_scenes_segments : ' + JSON.stringify(f));
                return null == module389.setSmartSceneParams
                  ? undefined
                  : module389.setSmartSceneParams(
                      null == (o = globals.initialData) ? undefined : null == (s = o.initialPage) ? undefined : null == (l = s.data) ? undefined : l.mode,
                      f
                    );
              })
              .then(function (t) {
                console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
              })
              .catch(function (t) {
                console.log('SmartSceneDebug: -- setScenesSegment or setSmartSceneParams - Failed: ' + JSON.stringify(t));
              })
              .finally(function () {
                S.loadingView.hide();
              });
            break;

          case G.Zone:
            this.loadingView.showWithText('');
            console.log(
              'SmartSceneDebug: -- WillSetScenesZone - Zones: ' +
                JSON.stringify({
                  tid: this.tid,
                  zones: M,
                })
            );
            module407.default
              .setScenesZone([
                {
                  tid: this.tid,
                  zones: M,
                },
              ])
              .then(function (t) {
                var n, o, s, l;
                console.log('SmartSceneDebug: -- setScenesZone - Success: ' + JSON.stringify(t));
                var u = (null != (n = null == t ? undefined : t.result) ? n : []).map(function (t) {
                  var n;
                  t.fan_power = S.state.cleanMode || module377.RSM.fanPower;
                  t.water_box_mode = S.state.waterMode || module377.RSM.waterBoxMode;
                  t.mop_mode = S.state.mopMode || module377.RSM.mopMode;
                  t.mop_template_id = S.state.mopMode || module377.RSM.mopModeId;
                  t.repeat = S.state.cleanCount;
                  t.clean_order_mode = 0;
                  var o = null != (n = t.zones) ? n : [];
                  t.zones = o.map(function (t, n) {
                    t.repeat = S.state.cleanCount;
                    return t;
                  });
                  return t;
                });
                f = {
                  method: 'do_scenes_zones',
                  params: {
                    data: u,
                    source: 101,
                  },
                };
                console.log('SmartSceneDebug: -- WillSend do_scenes_zones : ' + JSON.stringify(f));
                return null == module389.setSmartSceneParams
                  ? undefined
                  : module389.setSmartSceneParams(
                      null == (o = globals.initialData) ? undefined : null == (s = o.initialPage) ? undefined : null == (l = s.data) ? undefined : l.mode,
                      f
                    );
              })
              .then(function (t) {
                console.log('SmartSceneDebug: -- setSmartSceneParams - Success: ' + JSON.stringify(t));
              })
              .catch(function (t) {
                var n, o;
                if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
                  globals.showToast(module491.smart_scene_firmware_zone_reach_max_count);
                else globals.showToast(JSON.stringify(t));
                console.log('SmartSceneDebug: -- setScenesZone or setSmartSceneParams - Failed: ' + JSON.stringify(t));
              })
              .finally(function () {
                S.loadingView.hide();
              });
        }
      },
    },
    {
      key: 'onPressAddZone',
      value: function () {
        var t;

        if (module377.RSM.mapStatus != module377.MapStatus.None) {
          if (!(null == (t = this.mapView))) t.enterZoneEditMode();
          if (this.mapView && !this.mapView.addRectangle()) globals.showToast(module491.rubys_main_zone_max_tips);
        } else globals.showToast(module491.tap_zone_clean_button_without_map_tip);
      },
    },
    {
      key: 'onCleanCountChanged',
      value: function (t) {
        this.setState({
          cleanCount: t,
        });
      },
    },
    {
      key: 'onPressCustomMode',
      value: function () {
        var t,
          n,
          o,
          s = module415.DMM.isGarnet ? (null == (t = this.state.mopMode) ? undefined : t.mop_template_id) : this.state.mopMode || 300;
        if (!(null == (n = this.customModeView))) n.show(this.state.cleanMode, this.state.waterMode, s);
        if (!(null == (o = this.customModeView))) o.show(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'onPressQuestionIcon',
      value: function () {
        var t;
        if (!(null == (t = this.newSwitchGuideView))) t.show();
      },
    },
    {
      key: 'onPressMapEditIcon',
      value: function () {
        var t;
        if (!(null == (t = this.modalMapEditMenu))) t.show();
      },
    },
    {
      key: 'onPressFloor',
      value: function (t) {
        var n = this;

        if (module377.RSM.isRunning) {
          var o;
          if (!(null == (o = this.modalMapEditMenu))) o.hide();
          var s = {
              text: module491.localization_strings_Main_MainPage_11,
            },
            l = {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                var o;
                if (!(null == (o = n.loadingView))) o.showWithText();
                module407.default
                  .stop()
                  .then(function () {
                    return module377.RSM.waitUntilStateIsNotLocked().then(function () {
                      t();
                    });
                  })
                  .finally(function () {
                    var t;
                    if (!(null == (t = n.loadingView))) t.hide();
                  });
              },
            };
          globals.Alert.alert('', module491.ask_if_stop_for_change_map, [s, l]);
        } else t();
      },
    },
    {
      key: 'onPressCleanMopModeButton',
      value: function () {
        var t = this.state.cleanMopMode + 1;
        if (t > 2) t = 0;
        this.setState({
          cleanMopMode: t,
        });
      },
    },
    {
      key: 'onCustomModePanelChange',
      value: function (t, n, o) {
        var s;
        this.setState({
          cleanMode: t,
          waterMode: n,
          mopMode: module415.DMM.isGarnet ? o.id : o,
        });
        if (!(null == (s = this.sidebarMenu))) s.updateModeIcon(t, n, o);
      },
    },
    {
      key: 'selectedBlocksDidChange',
      value: function (t) {
        var n;
        this.selectedBlockCount = null != (n = null == t ? undefined : t.length) ? n : 0;
        this.selectedCleanSegments = t;
        this.setState({
          bottomMenu: x(
            x({}, this.state.bottomMenu),
            {},
            {
              tip: this.bottomMenuTip,
            }
          ),
          confirmButton: {
            isEnabled: this.isConfirmButtonEnabled,
          },
        });
      },
    },
    {
      key: 'selectedRectDidChange',
      value: function (t) {
        this.selectedRectCount = t;
        this.setState({
          bottomMenu: x(
            x({}, this.state.bottomMenu),
            {},
            {
              tip: this.bottomMenuTip,
            }
          ),
          confirmButton: {
            isEnabled: this.isConfirmButtonEnabled,
          },
        });
      },
    },
    {
      key: 'configNavigationBar',
      value: function () {
        this.props.navigation.setParams({
          navBarBackgroundColor: this.context.theme.navBackgroundColor,
          title: this.pageTitle,
          hiddenBottomLine: true,
        });
      },
    },
    {
      key: 'initMapView',
      value: function () {
        var t, n, o, s;
        this.updateMap();
        if (!(null == (t = this.mapView))) t.setAllCleanMopMode(module1229.MM.customCleanModes);
        if (!(null == (n = this.mapView))) n.setCleanSequence(module1229.MM.cleanSequence.concat(), false);
        if (!(null == (o = this.sidebarMenu)))
          o.setState({
            mapEditButtonEnabled: module386.default.isSupportSmartScene(),
            modeSetButtonEnabled: module386.default.isSupportSmartScene(),
          });
        if (!(null == (s = this.sidebarMenu))) s.updateModeIcon(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'initParams',
      value: function () {
        var t,
          n,
          o,
          s,
          l = this,
          u = (null == (t = globals.initialData) ? undefined : null == (n = t.initialPage) ? undefined : null == (o = n.data) ? undefined : o.mode) || 'SelectZone',
          c = null != (s = this.state.mode) ? s : G.Segment;

        switch (u) {
          case 'GlobalClean':
            c = G.GlobalClean;
            break;

          case 'SelectZone':
            c = G.Segment;
            break;

          case 'DrawZone':
            c = G.Zone;
        }

        this.setState(
          {
            mode: c,
            confirmButton: {
              isEnabled: u == G.GlobalClean,
            },
          },
          function () {
            l.props.navigation.setParams({
              title: l.pageTitle,
            });
          }
        );
        this.updateMap();
      },
    },
    {
      key: 'syncInfo',
      value: function () {
        var t = this;

        if (module386.default.isSupportSmartScene()) {
          this.loadingView.showWithText('');
          module389
            .getSmartSceneInfo()
            .then(function (t) {
              var n = t;
              console.log('SmartSceneDebug: -- getSmartSceneInfo - Success: ' + JSON.stringify(t));
              console.log('SmartSceneDebug: -- WillReunionScenes - Paras: ' + JSON.stringify(n));
              return module407.default.reunionScenes(n);
            })
            .then(function (n) {
              var o,
                s,
                l,
                u,
                c,
                p,
                S,
                f = null == (o = globals.initialData) ? undefined : null == (s = o.initialPage) ? undefined : null == (l = s.data) ? undefined : l.parameters;
              console.log('SmartSceneDebug: -- reunionScenes - Success: ' + JSON.stringify(n));
              console.log('SmartSceneDebug: -- initialPageData - Paras: ' + JSON.stringify(f));
              var h = null != (u = null == (c = null != (S = JSON.parse(f)) ? S : {}) ? undefined : null == (p = c.params) ? undefined : p.data) ? u : [],
                M = h.length > 0 ? h[0] : {};
              return t.initSceneParas(M);
            })
            .catch(function (t) {
              console.log('SmartSceneDebug: -- syncInfo - Failed: ' + JSON.stringify(t));
            })
            .finally(function () {
              t.loadingView.hide();
            });
        }
      },
    },
    {
      key: 'registListeners',
      value: function () {
        var t = this;
        this.mapListener = f.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function () {
          t.updateMap();
        });
        this.robotListener = f.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function () {
          t.updateMap();

          if (!t.state.initializedInfo) {
            console.log('SmartSceneDebug: -- RobotStatusDidUpdate Will sync');
            t.setState(
              {
                initializedInfo: true,
              },
              function () {
                t.syncInfo();
              }
            );
          }
        });
        this.specialEventListener = f.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module411.EventKeys.CurrentMapDidChange) t.resetSceneParams();
        });
        this.firmwareUpdateListener = f.DeviceEventEmitter.addListener(module411.NotificationKeys.RedDotDidChange, function (t) {
          if ('firmware_update' == t.name) {
            var n = t.value;
            if (!module386.default.isSupportSmartScene())
              if (n) {
                var o = {
                    text: module491.localization_strings_Main_MainPage_11,
                    onPress: function () {
                      var t;
                      if (!(null == (t = globals.app) || null == t.exit)) t.exit();
                    },
                  },
                  s = {
                    text: module491.smart_scene_firmware_update_alert_confirm,
                    onPress: function () {
                      module389.openDeviceUpgradePage();
                    },
                  };
                globals.Alert.alert(module491.localization_strings_Setting_RemoteControlPage_54, '', [o, s]);
              } else {
                var l = {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    var t;
                    if (!(null == (t = globals.app) || null == t.exit)) t.exit();
                  },
                };
                globals.Alert.alert(module491.smart_scene_firmware_will_support_alert_title, '', [l]);
              }
          }
        });
      },
    },
    {
      key: 'removeListeners',
      value: function () {
        var t, n, o, s;
        if (!(null == (t = this.mapListener))) t.remove();
        if (!(null == (n = this.robotListener))) n.remove();
        if (!(null == (o = this.specialEventListener))) o.remove();
        if (!(null == (s = this.firmwareUpdateListener))) s.remove();
      },
    },
    {
      key: 'updateMap',
      value: function () {
        var t, n, o, s;
        module377.RSM.hasGotMapFirstTime = true;
        var l = module1229.MM.mapRotateAngle[module377.RSM.currentMapId];
        if (!(null == (t = this.mapView)))
          t.setState(
            x(
              x({}, module1229.MM.mapData),
              {},
              {
                robotStatus: module377.RSM.state,
                mapDeg: l || 0,
              }
            )
          );
        this.setState({
          noMapTip: this.noMapTip,
          shouldShowMap: !this.shouldShowNoMap,
          noMap: {
            tip: this.noMapTip,
            showGuide: this.noMapShouldShowGuide,
          },
          bottomMenu: {
            isHidden: this.shouldShowNoMap && this.state.mode != G.GlobalClean,
            tip: this.bottomMenuTip,
          },
        });
        if (!(null == (n = this.sidebarMenu)))
          n.setState({
            tab: this.state.mode == G.Segment ? module1345.TabSegment : module1345.TabZone,
            mapEditButtonEnabled: module386.default.isSupportSmartScene(),
            modeSetButtonEnabled: module386.default.isSupportSmartScene(),
          });
        if (!(null == (o = this.mapView))) o.changeMapViewMode(this.mapMode);
        if (!(null == (s = this.sidebarMenu))) s.updateModeIcon(this.state.cleanMode, this.state.waterMode, this.state.mopMode);
      },
    },
    {
      key: 'initSceneParas',
      value: function (t) {
        var n = this;
        return new Promise(function (o, s) {
          var l, u, c, p;
          console.log('SmartSceneDebug: -- WillInitSceneParas : ' + JSON.stringify(t));

          var S = null == t ? undefined : t.tid,
            f = null != (l = null == t ? undefined : t.fan_power) ? l : module377.RSM.fanPower,
            h = null != (u = null == t ? undefined : t.water_box_mode) ? u : module377.RSM.waterBoxMode,
            M = null != (c = null == t ? undefined : t.mop_mode) ? c : module377.RSM.mopMode,
            _ = null != (p = null == t ? undefined : t.repeat) ? p : 1,
            v = null == t ? undefined : t.map_flag;

          if (n.isTidValid(S) && undefined !== v) {
            console.log('SmartSceneDebug: -- Tid is valid : ' + S);

            var w = function () {
              if (
                ((n.tid = S),
                console.log('SmartSceneDebug: -- WillInitSceneParas : cleanMode: ' + f + ', waterMode: ' + h + ', mopMode: ' + M + ', cleanCount: ' + _),
                n.setState({
                  cleanMode: f,
                  waterMode: h,
                  mopMode: M,
                  cleanCount: _,
                }),
                n.sidebarMenu.setState({
                  cleanCount: _,
                }),
                null != t && t.zones)
              ) {
                var o,
                  s,
                  l,
                  u = null == t ? undefined : t.zones;
                n.zidList = u.map(function (t) {
                  return t.zid;
                });
                console.log('SmartSceneDebug: -- ZoneList: ' + JSON.stringify(u));
                var c = null != (o = null == (s = module1229.MM.mapData) ? undefined : null == (l = s.smartZones) ? undefined : l.smartZones) ? o : [];
                console.log('SmartSceneDebug: -- MapZoneList: ' + JSON.stringify(c) + ', ZList: ' + JSON.stringify(n.zidList));
                c.filter(function (t) {
                  console.log('SmartSceneDebug: ' + n.zidList.hasElement(t.zid));
                  return n.zidList.hasElement(t.zid);
                })
                  .map(function (t) {
                    return t.range;
                  })
                  .forEach(function (t) {
                    var o;
                    console.log('SmartSceneDebug: -- WillDrawZone: ' + JSON.stringify(t));
                    var s = t[0],
                      l = t[1],
                      u = t[2],
                      c = t[3],
                      p = [s, c, u, c, u, l, s, l];
                    console.log('SmartSceneDebug: -- WillDrawZone: ' + p);
                    if (!(null == (o = n.mapView)))
                      o.setState(x({}, module1229.MM.mapData), function () {
                        n.mapView.addRectangle(n.mapView.decodeMachineFBZ(p, n.mapView.state.map).rectSize);
                      });
                  });
                n.zidList = u.map(function (t) {
                  return t.zid;
                });
              } else if (null != t && t.segs) {
                var p = null == t ? undefined : t.segs;
                console.log('SmartSceneDebug: -- SelectBlockList: ' + JSON.stringify(p));
                p.map(function (t) {
                  return t.sid;
                }).forEach(function (t) {
                  console.log('SmartSceneDebug: -- WillSelectBlock: ' + JSON.stringify(t));
                  n.mapView.changeBlockState(t);
                });
              }
            };

            console.log('SmartSceneDebug: -- WillCompareCurrentMap: ' + v + ', ' + module377.RSM.currentMapId);

            if (v !== module377.RSM.currentMapId) {
              console.log('SmartSceneDebug: -- WillLoadCurrentMap.');
              module407.default
                .loadMultiMap(v)
                .then(function () {
                  w();
                  o();
                })
                .catch(function (t) {
                  console.log('SmartSceneDebug: -- LoadCurrentMapFailed: ' + JSON.stringify(t));
                  s(t);
                });
            } else {
              w();
              o();
            }
          } else {
            console.log('SmartSceneDebug: -- Tid is not valid : ' + S);
            var y = n.isTidValid(S) ? 'MapFlag is undefined.' : 'Tid is not valid';
            s(y);
          }
        });
      },
    },
    {
      key: 'resetSceneParams',
      value: function () {
        var t;
        this.tid = null;
        this.zidList = [];
        if (!(null == (t = this.mapView))) t.clearRectangles();
      },
    },
    {
      key: 'isTidValid',
      value: function (t) {
        var n;
        module377.RSM.validTids.forEach(function (n) {
          console.log('SmartSceneDebug: ' + n);
          console.log('SmartSceneDebugTid: ' + t);
        });
        return (null != (n = module377.RSM.validTids) ? n : []).hasElement(t);
      },
    },
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
    {
      key: 'inCleaning',
      get: function () {
        return (
          module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None ||
          module377.RSM.backDockResumeFlag != module377.BackDockResumeFlag.None ||
          module377.RSM.state == module377.RobotState.SPOT_CLEAN
        );
      },
    },
    {
      key: 'noMapShouldShowGuide',
      get: function () {
        return module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments;
      },
    },
    {
      key: 'mapMode',
      get: function () {
        if (!module386.default.isSupportSmartScene()) return module1231.MapModelInCleanMode.Segment_Clean_Read_Only;

        switch (this.state.mode) {
          case G.GlobalClean:
            return module1231.MapModelInCleanMode.Global_Clean_With_Clean_Type;

          case G.Segment:
            var t = module377.RSM.isCustomCleanMode() || module377.RSM.isCustomWaterMode() || module377.RSM.isCustomMopMode(),
              n = module377.RSM.isSegmentCleanTaskShouldResume() || module377.RSM.state == module377.RobotState.SEGMENT_CLEAN;
            if (t)
              return n
                ? module1231.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                : module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type;
            else return n ? module1231.MapModelInCleanMode.Segment_Clean_Read_Only : module1231.MapModelInCleanMode.Segment_Clean_Edit;

          case G.Zone:
            return module1231.MapModelInCleanMode.Zone_Clean_Edit;

          default:
            throw new Error('Unrecognized mode.');
        }
      },
    },
    {
      key: 'noMapTip',
      get: function () {
        var t = '';

        switch (this.state.mode) {
          case G.GlobalClean:
            t = module491.no_seg_map_tip;

          case G.Segment:
            t = module491.smart_scene_global_no_map_tip;

          case G.Zone:
            t = module491.smart_scene_global_no_map_tip;
        }

        return t;
      },
    },
    {
      key: 'shouldShowNoMap',
      get: function () {
        switch (this.state.mode) {
          case G.GlobalClean:
            return module377.RSM.mapStatus == module377.MapStatus.None;

          case G.Segment:
            return module377.RSM.mapStatus == module377.MapStatus.None || -1 == module377.RSM.currentMapId;

          case G.Zone:
            return module377.RSM.mapStatus == module377.MapStatus.None || !module377.RSM.mapSaveEnabled || -1 == module377.RSM.currentMapId;

          default:
            return false;
        }
      },
    },
    {
      key: 'bottomMenuTip',
      get: function () {
        var t = '';

        switch (this.state.mode) {
          case G.GlobalClean:
            t = '';
            break;

          case G.Segment:
            if (module377.RSM.mapStatus == module377.MapStatus.Has_WithSegments)
              t =
                this.selectedBlockCount > 0
                  ? '' +
                    module491.main_page_top_tip_has_selected.templateStringWithParams({
                      zones: this.selectedBlockCount,
                    })
                  : module491.home_menu_select_zone_tip;
            break;

          case G.Zone:
            if (module377.RSM.mapStatus != module377.MapStatus.None)
              t =
                this.selectedRectCount > 0
                  ? '' +
                    module491.mainpage_top_tip_has_drawed.templateStringWithParams({
                      zones: this.selectedRectCount,
                    })
                  : module491.home_menu_draw_zone_tip;
        }

        return t;
      },
    },
    {
      key: 'isConfirmButtonEnabled',
      get: function () {
        switch (this.state.mode) {
          case G.GlobalClean:
            return true;

          case G.Segment:
            return this.selectedBlockCount > 0;

          case G.Zone:
            return this.selectedRectCount > 0;
        }
      },
    },
    {
      key: 'pageTitle',
      get: function () {
        switch (this.state.mode) {
          case G.GlobalClean:
            return module491.smart_scene_global_title;

          case G.Segment:
            return module491.smart_scene_segment_title;

          case G.Zone:
            return module491.smart_scene_zone_title;

          default:
            return module491.smart_scene_segment_title;
        }
      },
    },
    {
      key: 'modeSwitchImages',
      get: function () {
        return [this.theme.homeSidebar.cleanCount1Icon, this.theme.homeSidebar.cleanCount2Icon, this.theme.homeSidebar.cleanCount3Icon];
      },
    },
    {
      key: 'modeSwitchTip',
      get: function () {
        switch (this.state.cleanMopMode) {
          case 0:
            return '\u626b';

          case 1:
            return '\u62d6';

          case 2:
            return '\u626b\u62d6';

          default:
            return '\u626b';
        }
      },
    },
    {
      key: 'modeSwitchBottom',
      get: function () {
        switch (this.state.mode) {
          case G.Segment:
            return 200;

          case G.Zone:
            return 280;

          default:
            return 0;
        }
      },
    },
  ]);
  return N;
})(React.default.Component);

exports.default = J;
J.contextType = module506.AppConfigContext;
var j = f.StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    zIndex: 0,
    alignItems: 'center',
  },
  cleanMopWrap: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 200,
    left: 20,
    zIndex: 0,
  },
  topTipView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  confirmMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: module387.default.isIphoneX() ? 10 : 0,
    paddingHorizontal: 20,
  },
  confirmButton: {
    marginRight: 20,
  },
});
