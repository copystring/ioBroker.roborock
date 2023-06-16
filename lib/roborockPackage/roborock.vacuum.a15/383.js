require('./1540');

require('./423');

require('./1553');

require('./1543');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module384 = require('./384'),
  module385 = require('./385'),
  module1541 = require('./1541'),
  module381 = require('./381'),
  module414 = require('./414'),
  module391 = require('./391'),
  module419 = require('./419'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module1055 = require('./1055'),
  module415 = require('./415'),
  module1544 = require('./1544'),
  module1537 = require('./1537'),
  module1419 = require('./1419'),
  module387 = require('./387'),
  module1554 = require('./1554'),
  module1555 = require('./1555'),
  module394 = require('./394'),
  module1122 = require('./1122');

function O(t, o) {
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

function j(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      O(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function L() {
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

var module505 = require('./505').strings,
  z = (function (t) {
    module7.default(O, t);

    var o = O,
      module50 = L(),
      k = function () {
        var t,
          n = module11.default(o);

        if (module50) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);
      (o = k.call(this, t)).state = {
        shouldShow: false,
        waterSettingTip: o.waterModeSettingTip(),
        isCustomMode: false,
        shouldShowRedTip: false,
        cleanModeSwitcherEnabled: true,
        waterModeSwitcherEnabled: true,
        mopMethodSwitcherEnabled: true,
        switchViewLeftWidth: 0,
        waterBoxDistance: module381.RSM.waterBoxDistance || 205,
        visualWaterBoxDistance: 265 - (module381.RSM.waterBoxDistance || 205),
        shouldShowCleanModeView: true,
        shouldShowWaterModeView: true,
        shouldShowMopMethodView: true,
      };
      o.animatedMarginBottom = new module12.Animated.Value(-200);
      o.isRequesting = false;
      o.preIsWaterBoxIn = module381.RSM.isWaterBoxIn;
      o.preIsWaterBoxCarriageIn = module381.RSM.isWaterBoxCarriageIn;
      o.preWaterShortageStatus = module381.RSM.waterShortageStatus;
      return o;
    }

    module5.default(O, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1419.default.shared().enableBackAndMore();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: '_onLayout',
        value: function (t) {
          var o = t.nativeEvent.layout.width;
          this.setState({
            switchViewLeftWidth: o,
          });
        },
      },
      {
        key: 'getCustomModeView',
        value: function () {
          var t = this,
            o = this.context.theme.ModeSettingPanel,
            n = module414.MM.customCleanModes.length > 0,
            l = this.props,
            u = l.isInHomePage,
            h = l.isTimerPage,
            p = l.parent,
            c = l.isSmartScene,
            M = (u && (null == p ? undefined : p.tabIndex) == module1544.TabZone) || this.props.isTabZone,
            f = null;
          if (h || (c && !M)) f = module505.custom_mode_panel_has_custom_data_tip;
          else if (M) f = module505.custom_mode_panel_zoneclean_notwork_tip;
          else {
            f = module505.custom_mode_panel_has_custom_data_tip;
            if (!module381.RSM.mapSaveEnabled) f = module505.open_map_save_mode_tip;
          }
          var b = React.default.createElement(module12.ImageBackground, {
              source: module390.default.isSupportWaterMode() ? this.context.theme.guideImages.mode : this.context.theme.guideImages.modeWithoutWater,
              style: [
                F.noCustomShowView,
                {
                  marginTop: 0,
                  width: 270,
                  height: 261,
                },
              ],
            }),
            y = React.default.createElement(module1055.MapView, {
              top: 30,
              right: 0,
              left: 0,
              bottom: 80,
              ref: function (o) {
                return (t.mapView = o);
              },
              pointerEvents: 'none',
              hideAccessory: true,
              blockBubbleShowInfo: module1055.BlockBubbleShowInfo.CLEANMODE,
              onPanResponderGrant: this.props.onPanResponderGrant,
              onPanResponderRelease: this.props.onPanResponderRelease,
              selectedBlocksDidChange: this.props.selectedBlocksDidChange,
              style: {
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignSelf: 'stretch',
                paddingHorizontal: 30,
              },
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                F.customModeView,
                {
                  backgroundColor: o.modeSetCardBackgroundColor,
                },
              ],
            },
            !(h || c) &&
              !M &&
              module381.RSM.mapSaveEnabled &&
              React.default.createElement(
                module385.GradientView,
                {
                  colors: o.gradientBackground,
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: j(
                    j({}, F.customModeEditIcon),
                    {},
                    {
                      backgroundColor: '#3777F7',
                    }
                  ),
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'custom_mode_panel_top_btn',
                  title: module505.multi_floor_edit,
                  textColor: 'white',
                  fontSize: 12,
                  enabled: true,
                  onPress: this.gotoCustomModePage.bind(this),
                  style: {
                    paddingHorizontal: 25,
                    minWidth: 150,
                    backgroundColor: 'transparent',
                  },
                })
              ),
            !n || M || h || c ? b : y,
            React.default.createElement(
              module12.Text,
              module22.default({}, module391.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  F.bottomTip,
                  {
                    color: o.enableSubTitleColor,
                  },
                ],
              }),
              f
            )
          );
        },
      },
      {
        key: 'getCurrentTab',
        value: function () {
          var t = this.state.isCustomMode ? 1 : 0;
          if (module390.default.isPureCleanMopSupported())
            this.waterMode == module1541.WaterModeZero ? (t = 2) : this.cleanMode == module1541.CleanModeZero ? (t = 1) : this.state.isCustomMode && (t = 3);
          return t;
        },
      },
      {
        key: 'getCleanModeSettingView',
        value: function () {
          var t = this,
            o = this.context.theme.ModeSettingPanel,
            n = this.props.isInHomePage,
            s = this.state,
            l = s.shouldShowCleanModeView,
            u = s.isCustomMode,
            h = s.cleanModeSwitcherEnabled;
          if (!l) return null;
          var p = n && module390.default.isSoftCleanModeSupportedInMain() ? 0 : 1,
            c = module1541.CleanModes().slice(p, module1541.CleanModes().length);
          if (module390.default.isMaxPlusModeSupported()) c.pop();

          var M = !u && h,
            _ = M && n && module390.default.isSoftCleanModeSupportedInMain() && this.cleanMode == module1541.CleanModeZero,
            x = module390.default.isMaxPlusModeSupported() && 2 == this.getCurrentTab();

          return React.default.createElement(
            module12.View,
            {
              style: {
                marginHorizontal: 20,
                marginBottom: this.isSupportedWaterMode ? 15 : 0,
                borderRadius: 8,
                overflow: 'hidden',
              },
            },
            React.default.createElement(module384.default, {
              funcId: 'clean_mode_set_view_',
              ref: function (o) {
                return (t.cleanModeSetView = o);
              },
              style: {
                marginTop: 5,
              },
              title: module505.localization_strings_Setting_CleanModePage_5,
              items: c,
              enabled: M,
              addonTip: _ ? module505.effect_only_once_tip : null,
              isInHomePage: n,
              onPressButton: this.onPressCleanMode.bind(this),
            }),
            x &&
              React.default.createElement(
                module12.View,
                {
                  style: {
                    marginTop: -6,
                  },
                },
                React.default.createElement(module12.View, {
                  style: {
                    height: 0.6,
                    marginHorizontal: 20,
                    backgroundColor: o.splitLineColor,
                  },
                }),
                React.default.createElement(module385.SettingListItemView, {
                  title: module505.clean_mode_max_plus,
                  bottomDetail: module505.mode_setting_panel_max_plus_desc,
                  style: {
                    backgroundColor: o.modeSetCardBackgroundColor,
                  },
                  shouldShowBottomLine: false,
                  shouldShowSwitch: true,
                  switchOn: 108 == this.cleanMode,
                  bottomDetailWidth: module12.Dimensions.get('window').width - 80,
                  switchValueChanged: this.onMaxModeChanged.bind(this),
                })
              )
          );
        },
      },
      {
        key: 'getCustomWaterModeSlider',
        value: function () {
          var t = this,
            o = this.props.isInHomePage;
          return module390.default.isCustomWaterBoxDistanceSupported() && 207 == module381.RSM.waterBoxMode && o
            ? React.default.createElement(module1555.SliderAdjuster, {
                title: null,
                style: {
                  backgroundColor: 'transparent',
                },
                sliderWidth: module12.Dimensions.get('window').width - 80,
                minValue: 60,
                maxValue: 205,
                step: 5,
                value: this.state.visualWaterBoxDistance,
                circleValue: (t.state.visualWaterBoxDistance - 60) / 5 + 1,
                shouldShowSideValue: false,
                shouldShowValue: true,
                showValue: null,
                desc: null,
                onSlidingMove: function (o) {
                  t.setState({
                    visualWaterBoxDistance: o,
                    waterBoxDistance: 265 - o,
                  });
                },
                onSlidingComplete: function (t) {
                  var o;
                  return regeneratorRuntime.default.async(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            s.prev = 0;
                            s.next = 3;
                            return regeneratorRuntime.default.awrap(module415.default.setWaterBoxDistance(265 - t));

                          case 3:
                            o = s.sent;
                            module381.RSM.waterBoxDistance = 265 - t;
                            console.log('set custom water', o);
                            s.next = 11;
                            break;

                          case 8:
                            s.prev = 8;
                            s.t0 = s.catch(0);
                            console.log('set custom water error', 265 - t, s.t0);

                          case 11:
                          case 'end':
                            return s.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 8]],
                    Promise
                  );
                },
              })
            : null;
        },
      },
      {
        key: 'getCleanRouteView',
        value: function () {
          var t = this,
            o = this.context.theme.ModeSettingPanel,
            n = this.props,
            s = n.isInHomePage,
            l = n.isInMapEditPage,
            u = this.state,
            h = u.isCustomMode,
            p = u.mopMethodSwitcherEnabled,
            c = u.shouldShowMopMethodView,
            M = (!h && p) || l,
            C = this.getCurrentTab(),
            x = module390.default.isPureCleanMopSupported() && 0 == C,
            v = module390.default.isPureCleanMopSupported() && 1 == C,
            y = module390.default.isPureCleanMopSupported() && 2 == C,
            k = module1541.MopMethods();
          if (module390.default.isCleanRouteFastModeSupported() && -1 == module381.RSM.currentMapId) k.shift();
          if (x) k = [module1541.CleanRouteFast(), module1541.CleanRouteDaily()];
          else if (v) k = module1541.MopMethods();
          else if (y) k = [module1541.CleanRouteFast(), module1541.CleanRouteDaily()];
          return module390.default.isShakeMopSetSupported() && c
            ? React.default.createElement(
                module12.View,
                null,
                !y &&
                  React.default.createElement(module12.View, {
                    style: {
                      marginTop: 10,
                      height: 0.6,
                      marginHorizontal: 20,
                      backgroundColor: o.splitLineColor,
                    },
                  }),
                React.default.createElement(module384.default, {
                  ref: function (o) {
                    t.mopModeSetView = o;
                  },
                  title: module390.default.isCleanRouteFastModeSupported() ? module505.clean_route_setting_title : module505.tanos_s_mop_mode,
                  items: k,
                  enabled: M,
                  addonTip: null,
                  isRedAddonTip: true,
                  isInHomePage: s,
                  shouldShowQuestionIcon: s && (301 == this.mopMode || 303 == this.mopMode || 304 == this.mopMode),
                  onPressButton: this.onPressMopMode.bind(this),
                  onPressQuestion: function () {
                    return t.props.showCleanRouteGuideByMode(t.mopMode);
                  },
                })
              )
            : null;
        },
      },
      {
        key: 'getWaterModeSettingView',
        value: function () {
          var t,
            o = this,
            n = this.context.theme.ModeSettingPanel,
            s = this.props,
            l = s.isInHomePage,
            u = s.isInMapEditPage,
            h = this.state,
            p = h.shouldShowMopMethodView,
            c = h.shouldShowWaterModeView,
            M = h.isCustomMode,
            C = h.waterModeSwitcherEnabled;
          h.mopMethodSwitcherEnabled;
          if (!(this.isSupportedWaterMode && c) && !p) return null;
          var x = module1541.MopWaterOrStrengths();
          if (module390.default.isPureCleanMopSupported()) x.shift();
          var v =
              207 == (null == this ? undefined : null == (t = this.waterModeSetView) ? undefined : t.value)
                ? this.getCustomWaterModeText(this.state.waterBoxDistance || module381.RSM.waterBoxDistance)
                : null,
            y = (!M && C) || u;
          return React.default.createElement(
            module12.View,
            {
              style: {
                backgroundColor: n.modeSetCardBackgroundColor,
                marginHorizontal: 20,
                paddingBottom: 10,
                borderRadius: 12,
              },
            },
            c &&
              React.default.createElement(module384.default, {
                funcId: 'water_mode_set_view_',
                ref: function (t) {
                  return (o.waterModeSetView = t);
                },
                style: {
                  marginBottom: -10,
                },
                tip: this.state.waterSettingTip,
                submode: v,
                title: module390.default.isShakeMopStrengthSupported() ? module505.custom_water_tanos_mode_title : module505.custom_water_mode_title,
                items: x,
                enabled: y,
                isInHomePage: l,
                addonTip: module390.default.isPureCleanMopSupported()
                  ? null
                  : C && module381.RSM.isWaterBoxIn && l
                  ? module505.effect_only_once_tip
                  : u && !module390.default.isShakeMopSetSupported()
                  ? module505.zero_water_will_be_first_short
                  : null,
                onPressButton: this.onPressWateMode.bind(this),
              }),
            this.getCustomWaterModeSlider(),
            this.getCleanRouteView()
          );
        },
      },
      {
        key: 'render',
        value: function () {
          this.animatedMarginBottom.interpolate({
            inputRange: [-200, 0],
            outputRange: [0, 1],
          });
          var t = this,
            o = this.context.theme.ModeSettingPanel,
            n = this.props,
            s = n.isInMapEditPage,
            l = React.default.createElement(module12.View, null, this.getCleanModeSettingView(), this.getWaterModeSettingView());
          return React.default.createElement(
            module385.AModal,
            {
              isModal: !this.props.isInHomePage,
              visible: this.state.shouldShow,
              style: {
                zIndex: 9e3,
                justifyContent: 'flex-end',
              },
              onPress: function () {
                t.hide();
              },
            },
            React.default.createElement(
              module1537.default,
              {
                onClose: function () {
                  return t.hide();
                },
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    F.wrap,
                    {
                      bottom: this.animatedMarginBottom,
                      backgroundColor: o.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module1537.SwipeDownIndicator, {
                  style: {
                    marginBottom: 10,
                  },
                }),
                (!s || module390.default.isPureCleanMopSupported()) &&
                  React.default.createElement(module1554.default, {
                    tabs: this.tabs,
                    current: this.getCurrentTab(),
                    tabWillChange: this.modeTabWillChange.bind(this),
                    onPressTab: this.modeTabDidChange.bind(this),
                  }),
                s ? l : this.state.isCustomMode ? this.getCustomModeView() : l,
                module391.default.isIphoneX() &&
                  React.default.createElement(module12.View, {
                    style: [
                      F.whilteSplitView,
                      {
                        backgroundColor: o.backgroundColor,
                      },
                    ],
                  })
              )
            )
          );
        },
      },
      {
        key: 'modeTabWillChange',
        value: function (t) {
          module390.default.isPureCleanMopSupported();
          return true;
        },
      },
      {
        key: 'modeTabDidChange',
        value: function (t) {
          var o, module22;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    o = this.props;
                    module22 = o.tabModeDidChange;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(this.handleModeTabDidChange(t));

                  case 3:
                    if (module22) module22();

                  case 4:
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
        key: 'hide',
        value: function () {
          var t = this;
          module1419.default.shared().enableBackAndMore();

          if (0 != this.state.shouldShow) {
            this.modeDidChange();
            this.removeBackListeners();
            module12.Animated.timing(this.animatedMarginBottom, {
              toValue: -200,
              duration: 50,
            }).start(function () {
              t.setState(
                {
                  shouldShow: false,
                  shouldShowRedTip: false,
                },
                function () {}
              );
            });
          }
        },
      },
      {
        key: 'show',
        value: function (t, o, s) {
          var l,
            u,
            h,
            p,
            c,
            M,
            S,
            f,
            C,
            x,
            v,
            k,
            P,
            E = this;
          return regeneratorRuntime.default.async(
            function (W) {
              for (;;)
                switch ((W.prev = W.next)) {
                  case 0:
                    if (
                      (module1419.default.shared().disableBackAndMore(),
                      module390.default.isCustomWaterBoxDistanceSupported() &&
                        ((this.state.waterBoxDistance = module381.RSM.waterBoxDistance || 205), (this.state.visualWaterBoxDistance = 265 - this.state.waterBoxDistance)),
                      (l = this.props),
                      (u = l.isTimerPage),
                      (h = l.isInMapEditPage),
                      (p = l.isInHomePage),
                      (c = l.isSmartScene),
                      (M = t || module381.RSM.fanPower),
                      module390.default.isSoftCleanModeSupportedInMain() || 105 != M || module390.default.isPureCleanMopSupported())
                    ) {
                      W.next = 10;
                      break;
                    }

                    if (((M = 102), (W.t0 = p), !W.t0)) {
                      W.next = 10;
                      break;
                    }

                    W.next = 10;
                    return regeneratorRuntime.default.awrap(module415.default.setCustomMode(M));

                  case 10:
                    if (
                      ((S = o || module381.RSM.waterBoxMode),
                      (f = s || module381.RSM.mopMode),
                      (this.cleanMode = M),
                      (this.waterMode = S),
                      (this.mopMode = f),
                      (C = module1541.isModeCustomized(M, S, f) && !h),
                      (x = module390.default.isPureCleanMopSupported() && M == module1541.CleanModeZero),
                      (v = module390.default.isPureCleanMopSupported() && S == module1541.WaterModeZero),
                      module390.default.isPureCleanMopSupported()
                        ? ((k = S != module1541.WaterModeZero && M != module1541.CleanModeZero),
                          (P = 0),
                          x ? (P = 1) : v ? (P = 2) : C && (P = 3),
                          (this.state.shouldShowCleanModeView = k || v),
                          (this.state.shouldShowWaterModeView = k || x),
                          (this.state.shouldShowMopMethodView = x || module390.default.isCleanRouteFastModeSupported()),
                          (module394.MC.customTabIndex = P))
                        : (module394.MC.customTabIndex = C ? 1 : 0),
                      !C || module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments || !p)
                    ) {
                      W.next = 30;
                      break;
                    }

                    if (M == module1541.CustomCleanMode) M = module1541.CleanModes()[2].strength;
                    if (S == module1541.CustomWaterMode) S = module1541.MopWaterOrStrengths()[2].strength;
                    if (f == module1541.CustomMopMode) f = module1541.MopMethods()[0].strength;
                    if (this.props.didSetMode) this.props.didSetMode(M, S, f, false);
                    W.next = 26;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.CleanMode, M + ''));

                  case 26:
                    W.next = 28;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.WaterMode, S + ''));

                  case 28:
                    W.next = 30;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MopMode, f + ''));

                  case 30:
                    this.setState(
                      {
                        shouldShow: true,
                        isCustomMode: C,
                        mopMethodSwitcherEnabled: this.isMopModeEnabled(S),
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(f),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(M, S, f),
                      },
                      function () {
                        if (E.cleanModeSetView) E.cleanModeSetView.setMode(M, module1541.CustomCleanMode);
                        if (E.waterModeSetView) E.waterModeSetView.setMode(S, module1541.CustomWaterMode);
                        if (E.mopModeSetView) E.mopModeSetView.setMode(f, u || h || c ? 0 : 301);
                        E.updateMapWithCustomMode();
                        module12.Animated.timing(E.animatedMarginBottom, {
                          toValue: 0,
                          duration: 250,
                        }).start();
                        E.forceUpdate();
                      }
                    );
                    this.addBackListener();

                  case 32:
                  case 'end':
                    return W.stop();
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
        key: 'updateMapWithCustomMode',
        value: function () {
          if (this.mapView) this.mapView.setState(j({}, module414.MM.mapData));
          if (this.mapView) this.mapView.setAllCleanMopMode(module414.MM.customCleanModes);
        },
      },
      {
        key: 'setCleanWaterMode',
        value: function (t, o, n) {
          if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1541.CustomCleanMode);
          if (this.waterModeSetView) this.waterModeSetView.setMode(o, module1541.CustomWaterMode);
          if (this.mopModeSetView) this.mopModeSetView.setMode(n, 301);
        },
      },
      {
        key: 'modeDidChange',
        value: function () {
          var t, o, s, l, u, h, p;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    u = this.cleanMode || (null == this ? undefined : null == (t = this.cleanModeSetView) ? undefined : t.value);
                    h = (null == this ? undefined : null == (o = this.waterModeSetView) ? undefined : o.value) || this.waterMode;
                    p = (null == this ? undefined : null == (s = this.mopModeSetView) ? undefined : s.value) || this.mopMode;
                    console.log('CustomCleanWaterModeView  cleanMode - ' + u + ' , waterMode - ' + h + ' , mopMode - ' + p);
                    if (!(null == (l = this.props) || null == l.didSetMode)) l.didSetMode(u, h, p);

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
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'updateSettingTip',
        value: function () {
          if (!this.isRequesting) {
            this.setState({
              waterSettingTip: this.waterModeSettingTip(),
            });
            this.mopModeEnableByWaterState();
          }
        },
      },
      {
        key: 'getCustomWaterModeText',
        value: function (t) {
          var o;
          if (t >= 60 && t <= 70) o = module505.mode_setting_panel_custom_water_box_1;
          else if (75 == t) o = module505.mode_setting_panel_custom_water_box_2;
          else if (t >= 80 && t <= 125) o = module505.mode_setting_panel_custom_water_box_3;
          else if (130 == t) o = module505.mode_setting_panel_custom_water_box_4;
          else if (t >= 135 && t <= 170) o = module505.mode_setting_panel_custom_water_box_5;
          else if (175 == t) o = module505.mode_setting_panel_custom_water_box_6;
          else if (t >= 180 && t <= 205) o = module505.mode_setting_panel_custom_water_box_7;
          return o;
        },
      },
      {
        key: 'waterModeSettingTip',
        value: function () {
          if (module390.default.isShakeMopStrengthSupported())
            return !module381.RSM.isWaterBoxIn && this.props.isInHomePage
              ? module505.water_box_not_installed_tip_tanos
              : !module381.RSM.isWaterBoxCarriageIn && this.props.isInHomePage
              ? module505.water_box_not_installed_tip
              : module381.RSM.waterShortageStatus && this.props.isInHomePage
              ? module505.tanos_s_water_shortage
              : null;
          else return module390.default.isElectronicWaterBoxSupported() && !module381.RSM.isWaterBoxIn && this.props.isInHomePage ? module505.water_box_not_installed_tip : null;
        },
      },
      {
        key: 'onPressCleanMode',
        value: function (t, o) {
          var module22, l, u, h, p, c;
          return regeneratorRuntime.default.async(
            function (M) {
              for (;;)
                switch ((M.prev = M.next)) {
                  case 0:
                    if (((this.cleanMode = o), this.modeDidChange(), this.props.isInHomePage)) {
                      M.next = 4;
                      break;
                    }

                    return M.abrupt('return');

                  case 4:
                    if (105 == o && this.props.parent) this.props.parent.onPressMopModeItem();
                    module22 = this.waterModeSetView ? this.waterModeSetView.value : undefined;
                    M.prev = 6;
                    M.next = 9;
                    return regeneratorRuntime.default.awrap(module415.default.setCustomMode(o));

                  case 9:
                    if (
                      (M.sent,
                      (module381.RSM.fanPower = o),
                      (null == (l = this.props.parent) ? undefined : l.sidebarMenu) &&
                        (null == (u = this.props.parent) || null == (h = u.sidebarMenu) || h.updateModeIcon(o, module22, module381.RSM.mopMode)),
                      null == (p = (c = this.props).onModeChange) || p.call(c, o, module22, module381.RSM.mopMode),
                      console.log('set mode rpc success,  cleanMode- ' + o),
                      module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module419.EventKeys.CleanWaterModeDidChange,
                      }),
                      (M.t0 = 108 != o),
                      !M.t0)
                    ) {
                      M.next = 19;
                      break;
                    }

                    M.next = 19;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.CleanMode, o + ''));

                  case 19:
                    M.next = 27;
                    break;

                  case 21:
                    M.prev = 21;
                    M.t1 = M.catch(6);
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t1 ? JSON.stringify(M.t1) : M.t1));
                    this.showToast(module505.robot_communication_exception);
                    this.cleanMode = t;
                    if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1541.CustomCleanMode);

                  case 27:
                  case 'end':
                    return M.stop();
                }
            },
            null,
            this,
            [[6, 21]],
            Promise
          );
        },
      },
      {
        key: 'onMaxModeChanged',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(this.onPressCleanMode(this.cleanMode, t ? 108 : 102));

                  case 2:
                    this.setState({
                      cleanModeSwitcherEnabled: !t,
                    });
                    if (!(null == (o = this.cleanModeSetView))) o.setMode(this.cleanMode, t ? 108 : 102);

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
        key: 'onPressWateMode',
        value: function (t, o) {
          var s, l, u, h, p, c;
          return regeneratorRuntime.default.async(
            function (M) {
              for (;;)
                switch ((M.prev = M.next)) {
                  case 0:
                    if (
                      ((s = this.mopModeSetView && this.mopModeSetView.value),
                      module390.default.isShakeMopSetSupported() &&
                        (this.setState({
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(o),
                        }),
                        200 == o &&
                          301 == s &&
                          (this.setState({
                            cleanModeSwitcherEnabled: true,
                          }),
                          this.mopModeSetView && this.mopModeSetView.setMode(300, 301))),
                      this.modeDidChange(),
                      this.forceUpdate(),
                      this.props.isInHomePage)
                    ) {
                      M.next = 6;
                      break;
                    }

                    return M.abrupt('return');

                  case 6:
                    if (
                      ((l = this.cleanModeSetView ? this.cleanModeSetView.value : module381.RSM.fanPower),
                      (M.prev = 7),
                      (this.isRequesting = true),
                      !module390.default.isShakeMopSetSupported())
                    ) {
                      M.next = 22;
                      break;
                    }

                    if (200 != o || 301 != s) {
                      M.next = 18;
                      break;
                    }

                    M.next = 13;
                    return regeneratorRuntime.default.awrap(module415.default.setCleanMopMode(module381.RSM.fanPower, o, 300));

                  case 13:
                    module381.RSM.mopMode = 300;
                    M.next = 16;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MopMode, '300'));

                  case 16:
                    M.next = 20;
                    break;

                  case 18:
                    M.next = 20;
                    return regeneratorRuntime.default.awrap(module415.default.setWaterBoxMode(o));

                  case 20:
                    M.next = 24;
                    break;

                  case 22:
                    M.next = 24;
                    return regeneratorRuntime.default.awrap(module415.default.setWaterBoxMode(o));

                  case 24:
                    this.isRequesting = false;
                    module381.RSM.waterBoxMode = o;
                    this.forceUpdate();
                    if (null == (u = this.props.parent) ? undefined : u.sidebarMenu) null == (h = this.props.parent) || h.sidebarMenu.updateModeIcon(l, o, module381.RSM.mopMode);
                    if (!(null == (p = (c = this.props).onModeChange))) p.call(c, l, o, module381.RSM.mopMode);
                    console.log('set mode rpc success,  waterBoxMode- ' + o);
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module419.EventKeys.CleanWaterModeDidChange,
                    });
                    M.next = 33;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.WaterMode, o + ''));

                  case 33:
                    M.next = 41;
                    break;

                  case 35:
                    M.prev = 35;
                    M.t0 = M.catch(7);
                    this.isRequesting = false;
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t0 ? JSON.stringify(M.t0) : M.t0));
                    this.showToast(module505.robot_communication_exception);
                    if (this.waterModeSetView) this.waterModeSetView.setMode(t, module1541.CustomWaterMode);

                  case 41:
                  case 'end':
                    return M.stop();
                }
            },
            null,
            this,
            [[7, 35]],
            Promise
          );
        },
      },
      {
        key: 'onPressMopMode',
        value: function (t, o) {
          var s, l, module4, h;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (
                      (this.modeDidChange(),
                      (s = this.cleanModeSetView && this.cleanModeSetView.value),
                      (l = this.waterModeSetView && this.waterModeSetView.value),
                      (this.mopMode = o),
                      this.setState({
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(o),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(s, l, o),
                      }),
                      this.props.isInHomePage)
                    ) {
                      p.next = 7;
                      break;
                    }

                    return p.abrupt('return');

                  case 7:
                    p.prev = 7;
                    this.isRequesting = true;
                    p.next = 11;
                    return regeneratorRuntime.default.awrap(module415.default.setMopMode(o));

                  case 11:
                    if ((p.sent, (this.isRequesting = false), (module381.RSM.mopMode = o), 301 != o && 303 != o && 304 != o)) {
                      p.next = 23;
                      break;
                    }

                    module4 = module419.StorageKeys.ExquisiteCleanbyGuide + '_' + o;
                    p.next = 18;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module4));

                  case 18:
                    if (!!p.sent) {
                      p.next = 23;
                      break;
                    }

                    if (!(null == (h = this.props))) h.showCleanRouteGuideByMode(o);
                    p.next = 23;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module4, module4));

                  case 23:
                    if (this.mopModeSetView) this.mopModeSetView.setMode(o);
                    p.next = 26;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MopMode, o + ''));

                  case 26:
                    p.next = 34;
                    break;

                  case 28:
                    p.prev = 28;
                    p.t0 = p.catch(7);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0));
                    this.showToast(module505.robot_communication_exception);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(t);

                  case 34:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[7, 28]],
            Promise
          );
        },
      },
      {
        key: 'handleModeTabDidChange',
        value: function (t) {
          var o,
            s,
            l,
            u,
            h,
            p,
            c,
            M,
            S,
            f,
            C,
            x,
            v,
            k,
            P,
            E,
            W,
            I,
            D,
            T,
            H,
            K = this;
          return regeneratorRuntime.default.async(
            function (O) {
              for (;;)
                switch ((O.prev = O.next)) {
                  case 0:
                    if (
                      ((o = this.props),
                      (s = o.isInHomePage),
                      (l = o.parent),
                      (u = o.onModeChange),
                      (h = 0 == t),
                      (p = module390.default.isPureCleanMopSupported() ? 3 == t : 1 == t),
                      (c = module390.default.isPureCleanMopSupported() && 1 == t),
                      (M = module390.default.isPureCleanMopSupported() && 2 == t),
                      !p)
                    ) {
                      O.next = 9;
                      break;
                    }

                    O.t0 = module1541.CustomCleanMode;
                    O.next = 17;
                    break;

                  case 9:
                    O.t1 = parseInt;
                    O.next = 12;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.CleanMode));

                  case 12:
                    if (((O.t2 = O.sent), O.t2)) {
                      O.next = 15;
                      break;
                    }

                    O.t2 = 101;

                  case 15:
                    O.t3 = O.t2;
                    O.t0 = O.t1(O.t3);

                  case 17:
                    if (((S = O.t0), !p)) {
                      O.next = 22;
                      break;
                    }

                    O.t4 = module1541.CustomWaterMode;
                    O.next = 30;
                    break;

                  case 22:
                    O.t5 = parseInt;
                    O.next = 25;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.WaterMode));

                  case 25:
                    if (((O.t6 = O.sent), O.t6)) {
                      O.next = 28;
                      break;
                    }

                    O.t6 = 201;

                  case 28:
                    O.t7 = O.t6;
                    O.t4 = O.t5(O.t7);

                  case 30:
                    if (((f = O.t4), !p)) {
                      O.next = 35;
                      break;
                    }

                    O.t8 = module1541.CustomMopMode;
                    O.next = 43;
                    break;

                  case 35:
                    O.t9 = parseInt;
                    O.next = 38;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MopMode));

                  case 38:
                    if (((O.t10 = O.sent), O.t10)) {
                      O.next = 41;
                      break;
                    }

                    O.t10 = 300;

                  case 41:
                    O.t11 = O.t10;
                    O.t8 = O.t9(O.t11);

                  case 43:
                    if (
                      ((C = O.t8),
                      s && (C = module381.RSM.mopMode),
                      (x = function () {
                        if (!(module390.default.isCleanRouteFastModeSupported() && C != module1541.CleanRouteSubtlyMode && C != module1541.CleanRouteDeepSlowMode)) C = 300;
                      }),
                      module390.default.isPureCleanMopSupported() &&
                        (M
                          ? ((f = module1541.WaterModeZero),
                            x(),
                            (this.state.shouldShowCleanModeView = true),
                            (this.state.shouldShowWaterModeView = false),
                            (this.state.shouldShowMopMethodView = false))
                          : c
                          ? ((S = module1541.CleanModeZero),
                            (this.state.shouldShowCleanModeView = false),
                            (this.state.shouldShowWaterModeView = true),
                            (this.state.shouldShowMopMethodView = true))
                          : h &&
                            (x(),
                            108 == S && ((S = 102), this.cleanModeSetView && (this.cleanModeSetView.state.current = 1)),
                            (this.state.shouldShowCleanModeView = true),
                            (this.state.shouldShowWaterModeView = true),
                            (this.state.shouldShowMopMethodView = false)),
                        module390.default.isCleanRouteFastModeSupported() && (this.state.shouldShowMopMethodView = true)),
                      (O.prev = 47),
                      (this.cleanMode = S),
                      (this.waterMode = f),
                      (this.mopMode = C),
                      this.setState(
                        {
                          isCustomMode: p,
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(f),
                          cleanModeSwitcherEnabled: this.isCleanModeEnabled(C),
                          waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(S, f, C),
                        },
                        function () {
                          if (p) K.updateMapWithCustomMode();
                          if (h && module390.default.isPureCleanMopSupported() && 104 == S)
                            null == K ||
                              K.cleanModeSetView.setState({
                                current: 3,
                              });
                        }
                      ),
                      null == (v = this.cleanModeSetView) || v.setMode(S),
                      null == (k = this.waterModeSetView) || k.setMode(f),
                      null == (P = this.mopModeSetView) || P.setMode(C, 301),
                      this.modeDidChange(),
                      s)
                    ) {
                      O.next = 58;
                      break;
                    }

                    return O.abrupt('return');

                  case 58:
                    if (!module390.default.isShakeMopSetSupported()) {
                      O.next = 63;
                      break;
                    }

                    O.next = 61;
                    return regeneratorRuntime.default.awrap(module415.default.setCleanMopMode(S, f, C, false));

                  case 61:
                    O.next = 72;
                    break;

                  case 63:
                    if (!module381.RSM.isSupportFeature(118)) {
                      O.next = 68;
                      break;
                    }

                    O.next = 66;
                    return regeneratorRuntime.default.awrap(module415.default.setCleanMotorMode(S, f));

                  case 66:
                    O.next = 72;
                    break;

                  case 68:
                    O.next = 70;
                    return regeneratorRuntime.default.awrap(module415.default.setCustomMode(S));

                  case 70:
                    O.next = 72;
                    return regeneratorRuntime.default.awrap(module415.default.setWaterBoxMode(f));

                  case 72:
                    this.isRequesting = false;
                    module381.RSM.fanPower = S;
                    module381.RSM.waterBoxMode = f;
                    module381.RSM.mopMode = C;
                    module381.RSM.mopModeId = this.mopModeId;
                    if (s) null == l || null == (E = l.sidebarMenu) || E.updateModeIcon(S, f, C);
                    if (u) u(S, f, C);
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module419.EventKeys.CleanWaterModeDidChange,
                    });
                    W = C
                      ? {
                          mopMode: C,
                        }
                      : {};
                    module387.LogEventStatus(
                      'custom_mode_value',
                      j(
                        {
                          cleanMode: S,
                          waterMode: f,
                        },
                        W
                      )
                    );
                    this.forceUpdate();
                    O.next = 94;
                    break;

                  case 85:
                    O.prev = 85;
                    O.t12 = O.catch(47);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof O.t12 ? JSON.stringify(O.t12) : O.t12));
                    this.showToast(module505.robot_communication_exception);
                    if (!(null == (I = this.cleanModeSetView))) I.setMode(module381.RSM.fanPower);
                    if (!(null == (D = this.waterModeSetView))) D.setMode(module381.RSM.waterBoxMode);
                    if (!(null == (T = this.mopModeSetView))) T.setMode(module381.RSM.mopMode, 301);
                    this.setState({
                      isCustomMode: !p,
                    });

                  case 94:
                    H = C
                      ? {
                          mopMode: C,
                        }
                      : {};
                    module387.LogEventStatus(
                      'custom_mode_switch',
                      j(
                        {
                          on: p,
                          cleanMode: S,
                          waterMode: f,
                        },
                        H
                      )
                    );

                  case 96:
                  case 'end':
                    return O.stop();
                }
            },
            null,
            this,
            [[47, 85]],
            Promise
          );
        },
      },
      {
        key: 'gotoCustomModePage',
        value: function () {
          var t,
            o,
            n = this;
          console.log('gotoCustomModePage');

          if (module390.default.isSupportCustomModeInCleaning() || !module381.RSM.isRunning) {
            if (!(null == (t = (o = this.props).onPressCustomModePage))) t.call(o);
            this.hide();
          } else
            module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              n.showToast(module505.robot_communication_exception);
            });
        },
      },
      {
        key: 'removeBackListeners',
        value: function () {
          if (this.backListener) this.backListener.remove();
        },
      },
      {
        key: 'addBackListener',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener('hardwareBackPress', function () {
            t.hide();
            return true;
          });
        },
      },
      {
        key: 'isMopModeEnabled',
        value: function (t) {
          return (
            !(!module390.default.isCleanRouteFastModeSupported() || 2 != this.getCurrentTab()) ||
            (204 != t &&
              ((!this.props.isInHomePage && 200 != t) || !(!module381.RSM.isWaterBoxIn || !module381.RSM.isWaterBoxCarriageIn || module381.RSM.waterShortageStatus || 200 == t)))
          );
        },
      },
      {
        key: 'mopModeEnableByWaterState',
        value: function () {
          if (module390.default.isShakeMopStrengthSupported() && this.props.isInHomePage) {
            var t = this.mopModeSetView && this.mopModeSetView.value;

            if (this.preIsWaterBoxIn != module381.RSM.isWaterBoxIn) {
              this.preIsWaterBoxIn = module381.RSM.isWaterBoxIn;
              this.setState({
                mopMethodSwitcherEnabled: module381.RSM.isWaterBoxIn,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module381.RSM.mopMode),
              });
            }

            if (this.preIsWaterBoxCarriageIn != module381.RSM.isWaterBoxCarriageIn) {
              this.preIsWaterBoxCarriageIn = module381.RSM.isWaterBoxCarriageIn;
              this.setState({
                mopMethodSwitcherEnabled: module381.RSM.isWaterBoxCarriageIn,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module381.RSM.mopMode),
              });
            }

            if (this.preWaterShortageStatus != module381.RSM.waterShortageStatus) {
              this.preWaterShortageStatus = module381.RSM.waterShortageStatus;
              this.setState({
                mopMethodSwitcherEnabled: !module381.RSM.waterShortageStatus,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module381.RSM.mopMode),
              });
            }
          }
        },
      },
      {
        key: 'isCleanModeEnabled',
        value: function (t) {
          return 108 != this.cleanMode;
        },
      },
      {
        key: 'waterModeSwitcherEnabled',
        value: function (t, o, n) {
          return !(module1541.isModeCustomized(t, o, n) && !this.props.isSmartScene);
        },
      },
      {
        key: 'shouldShowCustomTab',
        get: function () {
          var t = this.props.shouldShowCustomSwitch;
          return module390.default.isCustomModeSupported() && t;
        },
      },
      {
        key: 'tabs',
        get: function () {
          var t = [module505.robot_status_clean_mop_mode, module505.robot_clean_status_only_mop, module505.robot_clean_status_only_clean],
            o = [module505.custom_mode_panel_tab_general],
            n = module390.default.isPureCleanMopSupported() ? t : o,
            s = module505.localization_strings_Common_custom_mode,
            l = module505.map_edit_bottom_menu_mode,
            u = module390.default.isPureCleanMopSupported() ? s : l;
          if (this.shouldShowCustomTab) n.push(u);
          return n;
        },
      },
      {
        key: 'isSupportedWaterMode',
        get: function () {
          return module390.default.isElectronicWaterBoxSupported() || module390.default.isShakeMopStrengthSupported();
        },
      },
    ]);
    return O;
  })(React.default.Component);

exports.default = z;
z.contextType = module1121.AppConfigContext;
z.defaultProps = {
  shouldShowCustomSwitch: true,
  isInHomePage: false,
  isInMapEditPage: false,
  isTimerPage: false,
  isSmartScene: false,
};
var F = module12.StyleSheet.create({
  wrap: {
    paddingTop: 15,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'stretch',
  },
  whilteSplitView: {
    height: 10,
    backgroundColor: 'white',
  },
  customModeView: {
    height: 400,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  customModeEditIcon: {
    position: 'absolute',
    zIndex: 99,
    bottom: 10,
    minHeight: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTip: {
    position: 'absolute',
    bottom: 70,
    textAlign: 'center',
    alignSelf: 'center',
  },
  noCustomShowView: {
    width: 270,
    height: 188,
  },
});
