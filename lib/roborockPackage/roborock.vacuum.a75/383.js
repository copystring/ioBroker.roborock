require('./1623');

require('./1634');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module50 = require('./50'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module384 = require('./384'),
  module385 = require('./385'),
  module1624 = require('./1624'),
  module381 = require('./381'),
  module415 = require('./415'),
  module391 = require('./391'),
  module420 = require('./420'),
  module390 = require('./390'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module1124 = require('./1124'),
  module416 = require('./416'),
  module1626 = require('./1626'),
  module1616 = require('./1616'),
  module1500 = require('./1500'),
  module387 = require('./387'),
  module1635 = require('./1635'),
  module1636 = require('./1636'),
  module394 = require('./394'),
  module1200 = require('./1200');

function L(t, o) {
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
      L(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      L(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function A() {
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

var module510 = require('./510').strings,
  z = (function (t) {
    module9.default(L, t);

    var o = L,
      module50 = A(),
      k = function () {
        var t,
          n = module12.default(o);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function L(t) {
      var o;
      module6.default(this, L);
      (o = k.call(this, t)).state = {
        shouldShow: false,
        waterSettingTip: o.waterModeSettingTip(),
        isCustomMode: false,
        shouldShowRedTip: false,
        cleanModeSwitcherEnabled: true,
        waterModeSwitcherEnabled: true,
        mopMethodSwitcherEnabled: true,
        switchViewLeftWidth: 0,
        waterBoxDistance: module381.RSM.waterBoxDistance || o.sliderWaterDefault,
        visualWaterBoxDistance: o.sliderWaterTotal - (module381.RSM.waterBoxDistance || o.sliderWaterDefault),
        shouldShowCleanModeView: true,
        shouldShowWaterModeView: false,
        shouldShowMopMethodView: false,
        cornerCleanOn: module381.RSM.cornerCleanOn,
      };
      o.animatedMarginBottom = new module13.Animated.Value(-200);
      o.isRequesting = false;
      o.preIsWaterBoxIn = module381.RSM.isWaterBoxIn;
      o.preIsWaterBoxCarriageIn = module381.RSM.isWaterBoxCarriageIn;
      o.preWaterShortageStatus = module381.RSM.waterShortageStatus;
      return o;
    }

    module7.default(L, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1500.default.shared().enableBackAndMore();
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
            n = module415.MM.customCleanModes.length > 0,
            l = this.props,
            u = l.isInHomePage,
            h = l.isTimerPage,
            c = l.parent,
            p = l.isSmartScene,
            M = (u && (null == c ? undefined : c.tabIndex) == module1626.TabZone) || this.props.isTabZone,
            f = null;
          if (h || (p && !M)) f = module510.custom_mode_panel_has_custom_data_tip;
          else if (M) f = module510.custom_mode_panel_zoneclean_notwork_tip;
          else {
            f = module510.custom_mode_panel_has_custom_data_tip;
            if (!module381.RSM.mapSaveEnabled) f = module510.open_map_save_mode_tip;
          }
          var b = React.default.createElement(module13.ImageBackground, {
              source: module390.default.isSupportWaterMode() ? this.context.theme.guideImages.mode : this.context.theme.guideImages.modeWithoutWater,
              style: [
                Z.noCustomShowView,
                {
                  marginTop: 0,
                  width: 270,
                  height: 261,
                },
              ],
            }),
            y = React.default.createElement(module1124.MapView, {
              top: 30,
              right: 0,
              left: 0,
              bottom: 80,
              ref: function (o) {
                return (t.mapView = o);
              },
              pointerEvents: 'none',
              hideAccessory: true,
              blockBubbleShowInfo: module1124.BlockBubbleShowInfo.CLEANMODE,
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
            module13.View,
            {
              style: [
                Z.customModeView,
                {
                  backgroundColor: o.modeSetCardBackgroundColor,
                },
              ],
            },
            !(h || p) &&
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
                    j({}, Z.customModeEditIcon),
                    {},
                    {
                      backgroundColor: '#3777F7',
                    }
                  ),
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'custom_mode_panel_top_btn',
                  title: module510.multi_floor_edit,
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
            !n || M || h || p ? b : y,
            React.default.createElement(
              module13.Text,
              module22.default({}, module391.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  Z.bottomTip,
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
            this.waterMode == module1624.WaterModeZero ? (t = 2) : this.cleanMode == module1624.CleanModeZero ? (t = 1) : this.state.isCustomMode && (t = 3);
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
          var c = n && module390.default.isSoftCleanModeSupportedInMain() ? 0 : 1,
            p = module1624.CleanModes().slice(c, module1624.CleanModes().length);
          if (module390.default.isMaxPlusModeSupported() || module390.default.isNonePureCleanMopWithMaxPlus()) p.pop();

          var M = !u && h,
            _ = M && n && module390.default.isSoftCleanModeSupportedInMain() && this.cleanMode == module1624.CleanModeZero,
            x = (module390.default.isMaxPlusModeSupported() && 2 == this.getCurrentTab()) || (module390.default.isNonePureCleanMopWithMaxPlus() && 0 == this.getCurrentTab());

          return React.default.createElement(
            module13.View,
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
              title: module510.localization_strings_Setting_CleanModePage_5,
              items: p,
              enabled: M,
              addonTip: _ ? module510.effect_only_once_tip : null,
              isInHomePage: n,
              onPressButton: this.onPressCleanMode.bind(this),
            }),
            x &&
              React.default.createElement(
                module13.View,
                {
                  style: {
                    marginTop: -6,
                  },
                },
                React.default.createElement(module13.View, {
                  style: {
                    height: 0.6,
                    marginHorizontal: 20,
                    backgroundColor: o.splitLineColor,
                  },
                }),
                React.default.createElement(module385.SettingListItemView, {
                  title: module510.clean_mode_max_plus,
                  bottomDetail: module510.mode_setting_panel_max_plus_desc,
                  style: {
                    backgroundColor: o.modeSetCardBackgroundColor,
                  },
                  shouldShowBottomLine: false,
                  shouldShowSwitch: true,
                  switchOn: 108 == this.cleanMode,
                  bottomDetailWidth: module13.Dimensions.get('window').width - 80,
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
            ? React.default.createElement(module1636.SliderAdjuster, {
                title: null,
                style: {
                  backgroundColor: 'transparent',
                },
                sliderWidth: module13.Dimensions.get('window').width - 80,
                minValue: this.sliderWaterMin,
                maxValue: this.sliderWaterMax,
                step: 5,
                value: this.state.visualWaterBoxDistance,
                circleValue: (t.state.visualWaterBoxDistance - t.sliderWaterMin) / 5 + 1,
                shouldShowSideValue: false,
                shouldShowValue: true,
                showValue: null,
                desc: null,
                onSlidingMove: function (o) {
                  t.setState({
                    visualWaterBoxDistance: o,
                    waterBoxDistance: t.sliderWaterTotal - o,
                  });
                },
                onSlidingComplete: function (o) {
                  var s;
                  return regeneratorRuntime.default.async(
                    function (l) {
                      for (;;)
                        switch ((l.prev = l.next)) {
                          case 0:
                            l.prev = 0;
                            l.next = 3;
                            return regeneratorRuntime.default.awrap(module416.default.setWaterBoxDistance(t.sliderWaterTotal - o));

                          case 3:
                            s = l.sent;
                            module381.RSM.waterBoxDistance = t.sliderWaterTotal - o;
                            console.log('set custom water', s);
                            l.next = 11;
                            break;

                          case 8:
                            l.prev = 8;
                            l.t0 = l.catch(0);
                            console.log('set custom water error', t.sliderWaterTotal - o, l.t0);

                          case 11:
                          case 'end':
                            return l.stop();
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
            l = this.state,
            u = l.shouldShowMopMethodView,
            h = module1624.MopMethods();

          if (
            (this.isCleanMopTab
              ? (h = [module1624.CleanRouteFast(), module1624.CleanRouteDaily()])
              : this.isPureMopTab
              ? (h = module1624.MopMethods())
              : this.isPureCleanTab && (h = [module1624.CleanRouteFast(), module1624.CleanRouteDaily()]),
            !s)
          ) {
            var c = h.findIndex(function (t) {
              return t.strength == module1624.CleanRouteFastMode;
            });
            if (-1 != c) h.splice(c, 1);
            console.log('cleanRouteItems', c, h);
          }

          return module390.default.isShakeMopSetSupported() && u
            ? React.default.createElement(
                module13.View,
                null,
                !this.isPureCleanTab &&
                  React.default.createElement(module13.View, {
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
                  title: module390.default.isCleanRouteFastModeSupported() ? module510.clean_route_setting_title : module510.tanos_s_mop_mode,
                  items: h,
                  enabled: true,
                  addonTip: null,
                  isRedAddonTip: true,
                  isInHomePage: s,
                  shouldShowQuestionIcon: s && (301 == this.mopMode || 303 == this.mopMode || this.mopMode == module1624.CleanRouteDeepSlowPearlMode || 304 == this.mopMode),
                  willOnPressButton: function (o) {
                    console.log('willOnPressButton', o, module381.RSM.mapSaveEnabled, module381.RSM.currentMapId);
                    return (
                      !s ||
                      (o != module1624.CleanRouteFastMode || (module381.RSM.mapSaveEnabled && -1 != module381.RSM.currentMapId)
                        ? o != module1624.CleanRouteFastMode || !t.state.cornerCleanOn || (globals.showToast(module510.switchfastroute_withcornerclean_toast), false)
                        : (null == t || null == (n = t.props) || n.showCleanRouteGuideByMode(module1624.CleanRouteFastMode + 1e4), false))
                    );
                    var n;
                  },
                  onPressButton: this.onPressMopMode.bind(this),
                  onPressQuestion: function () {
                    var o;
                    return null == t ? undefined : null == (o = t.props) ? undefined : o.showCleanRouteGuideByMode(t.mopMode);
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
            c = h.shouldShowMopMethodView,
            p = h.shouldShowWaterModeView,
            M = h.isCustomMode,
            C = h.waterModeSwitcherEnabled;
          h.mopMethodSwitcherEnabled;
          if (!(this.isSupportedWaterMode && p) && !c) return null;
          var x = module1624.MopWaterOrStrengths();
          if (module390.default.isPureCleanMopSupported()) x.shift();
          var v =
              207 == (null == this ? undefined : null == (t = this.waterModeSetView) ? undefined : t.value)
                ? this.getCustomWaterModeText(this.state.waterBoxDistance || module381.RSM.waterBoxDistance)
                : null,
            y = (!M && C) || u;
          return React.default.createElement(
            module13.View,
            {
              style: {
                backgroundColor: n.modeSetCardBackgroundColor,
                marginHorizontal: 20,
                paddingBottom: 10,
                borderRadius: 12,
              },
            },
            p &&
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
                title:
                  !module390.default.isCleanRouteSettingSupported() || module424.DMM.isPearl || module424.DMM.isUltronLite || module424.DMM.isUltronE
                    ? module510.custom_water_mode_title
                    : module510.custom_water_tanos_mode_title,
                items: x,
                enabled: y,
                isInHomePage: l,
                addonTip: module390.default.isPureCleanMopSupported()
                  ? null
                  : C && module381.RSM.isWaterBoxIn && l && module381.RSM.waterBoxMode == module1624.WaterModeZero
                  ? module510.effect_only_once_tip
                  : u && !module390.default.isShakeMopSetSupported() && module381.RSM.waterBoxMode == module1624.WaterModeZero
                  ? module510.zero_water_will_be_first_short
                  : null,
                onPressButton: this.onPressWateMode.bind(this),
              }),
            this.getCustomWaterModeSlider(),
            this.getCleanRouteView(),
            this.getCornerCleanView()
          );
        },
      },
      {
        key: 'getCornerCleanView',
        value: function () {
          var t = this.props.isInHomePage,
            o = this.context.theme.ModeSettingPanel;
          return (
            module390.default.isCornerCleanModeSupported() &&
            (this.isCleanMopTab || this.isPureMopTab) &&
            t &&
            React.default.createElement(module385.SettingListItemView, {
              title: module510.corner_clean_switch_title,
              bottomDetail: module510.corner_clean_switch_desc,
              style: j(
                j({}, Z.cornerCleanView),
                {},
                {
                  backgroundColor: o.modeSetCardBackgroundColor,
                }
              ),
              shouldShowBottomLine: false,
              shouldShowSwitch: true,
              bottomDetailTop: 5,
              innterVPadding: 5,
              switchOn: this.state.cornerCleanOn,
              bottomDetailWidth: module13.Dimensions.get('window').width - 80,
              switchValueChanged: this.onCornerCleanSwitchChanged.bind(this),
            })
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
            l = React.default.createElement(module13.View, null, this.getCleanModeSettingView(), this.getWaterModeSettingView());
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
              module1616.default,
              {
                onClose: function () {
                  return t.hide();
                },
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: [
                    Z.wrap,
                    {
                      bottom: this.animatedMarginBottom,
                      backgroundColor: o.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module1616.SwipeDownIndicator, {
                  style: {
                    marginBottom: 10,
                  },
                }),
                (!s || module390.default.isPureCleanMopSupported()) &&
                  React.default.createElement(module1635.default, {
                    tabs: this.tabs,
                    current: this.getCurrentTab(),
                    tabWillChange: this.modeTabWillChange.bind(this),
                    onPressTab: this.modeTabDidChange.bind(this),
                  }),
                s ? l : this.state.isCustomMode ? this.getCustomModeView() : l,
                module391.default.isIphoneX() &&
                  React.default.createElement(module13.View, {
                    style: [
                      Z.whilteSplitView,
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
          module1500.default.shared().enableBackAndMore();

          if (0 != this.state.shouldShow) {
            this.modeDidChange();
            this.removeBackListeners();
            module13.Animated.timing(this.animatedMarginBottom, {
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
            c,
            p,
            M,
            S,
            f,
            C,
            x,
            v,
            P,
            k,
            V = this;
          return regeneratorRuntime.default.async(
            function (E) {
              for (;;)
                switch ((E.prev = E.next)) {
                  case 0:
                    if (
                      (module1500.default.shared().disableBackAndMore(),
                      module390.default.isCustomWaterBoxDistanceSupported() &&
                        ((this.state.waterBoxDistance = module381.RSM.waterBoxDistance || this.sliderWaterDefault),
                        (this.state.visualWaterBoxDistance = this.sliderWaterTotal - this.state.waterBoxDistance)),
                      (l = this.props),
                      (u = l.isTimerPage),
                      (h = l.isInMapEditPage),
                      (c = l.isInHomePage),
                      (p = l.isSmartScene),
                      (M = t || module381.RSM.fanPower),
                      module390.default.isSoftCleanModeSupportedInMain() || 105 != M || module390.default.isPureCleanMopSupported())
                    ) {
                      E.next = 10;
                      break;
                    }

                    if (((M = 102), (E.t0 = c), !E.t0)) {
                      E.next = 10;
                      break;
                    }

                    E.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomMode(M));

                  case 10:
                    if (
                      ((S = o || module381.RSM.waterBoxMode),
                      (f = s || module381.RSM.mopMode),
                      module390.default.isCornerCleanModeSupported() &&
                        ((this.state.cornerCleanOn = module381.RSM.cornerCleanOn),
                        f == module1624.CleanRouteDeepSlowPearlMode && (this.mopMode = module1624.CleanRouteDeepSlowMode)),
                      (this.cleanMode = M),
                      (this.waterMode = S),
                      (this.mopMode = f),
                      (C = module1624.isModeCustomized(M, S, f) && !h),
                      (x = module390.default.isPureCleanMopSupported() && M == module1624.CleanModeZero),
                      (v = module390.default.isPureCleanMopSupported() && S == module1624.WaterModeZero),
                      module390.default.isPureCleanMopSupported()
                        ? ((P = S != module1624.WaterModeZero && M != module1624.CleanModeZero),
                          (k = 0),
                          x ? (k = 1) : v ? (k = 2) : C && (k = 3),
                          (this.state.shouldShowCleanModeView = P || v),
                          (this.state.shouldShowWaterModeView = P || x),
                          (this.state.shouldShowMopMethodView = x || (module390.default.isCleanRouteFastModeSupported() && c)),
                          (module394.MC.customTabIndex = k))
                        : ((this.state.shouldShowWaterModeView = module390.default.isElectronicWaterBoxSupported()),
                          (this.state.shouldShowMopMethodView = module390.default.isCleanRouteSettingSupported() && c),
                          (module394.MC.customTabIndex = C ? 1 : 0)),
                      !C || module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments || !c)
                    ) {
                      E.next = 31;
                      break;
                    }

                    if (M == module1624.CustomCleanMode) M = module1624.CleanModes()[2].strength;
                    if (S == module1624.CustomWaterMode) S = module1624.MopWaterOrStrengths()[2].strength;
                    if (f == module1624.CustomMopMode) f = module1624.MopMethods()[0].strength;
                    if (this.props.didSetMode) this.props.didSetMode(M, S, f, false);
                    E.next = 27;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.CleanMode, M + ''));

                  case 27:
                    E.next = 29;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.WaterMode, S + ''));

                  case 29:
                    E.next = 31;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.MopMode, f + ''));

                  case 31:
                    this.setState(
                      {
                        shouldShow: true,
                        isCustomMode: C,
                        mopMethodSwitcherEnabled: this.isMopModeEnabled(S),
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(f),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(M, S, f),
                      },
                      function () {
                        if (V.cleanModeSetView) V.cleanModeSetView.setMode(M, module1624.CustomCleanMode);
                        if (V.waterModeSetView) V.waterModeSetView.setMode(S, module1624.CustomWaterMode);
                        if (V.mopModeSetView) V.mopModeSetView.setMode(f, u || h || p ? 0 : 301);
                        V.updateMapWithCustomMode();
                        module13.Animated.timing(V.animatedMarginBottom, {
                          toValue: 0,
                          duration: 250,
                        }).start();
                        V.forceUpdate();
                      }
                    );
                    this.addBackListener();

                  case 33:
                  case 'end':
                    return E.stop();
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
          if (this.mapView) this.mapView.setState(j({}, module415.MM.mapData));
          if (this.mapView) this.mapView.setAllCleanMopMode(module415.MM.customCleanModes);
        },
      },
      {
        key: 'modeDidChange',
        value: function () {
          var t, o, s, l, u, h, c;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    u = this.cleanMode || (null == this ? undefined : null == (t = this.cleanModeSetView) ? undefined : t.value);
                    h = (null == this ? undefined : null == (o = this.waterModeSetView) ? undefined : o.value) || this.waterMode;
                    c = (null == this ? undefined : null == (s = this.mopModeSetView) ? undefined : s.value) || this.mopMode;
                    if (
                      !(
                        h != module1624.WaterModeZero ||
                        (c != module1624.CleanRouteSubtlyMode && c != module1624.CleanRouteDeepSlowMode && c != module1624.CleanRouteDeepSlowPearlMode)
                      )
                    )
                      c = module1624.CleanRouteDailyMode;
                    console.log('CustomCleanWaterModeView  cleanMode - ' + u + ' , waterMode - ' + h + ' , mopMode - ' + c);
                    if (!(null == (l = this.props) || null == l.didSetMode)) l.didSetMode(u, h, c);

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
          var o,
            n = t - (module424.DMM.isPearl ? 25 : 0);
          if (n >= 60 && n <= 70) o = module510.mode_setting_panel_custom_water_box_1;
          else if (75 == n) o = module510.mode_setting_panel_custom_water_box_2;
          else if (n >= 80 && n <= 125) o = module510.mode_setting_panel_custom_water_box_3;
          else if (130 == n) o = module510.mode_setting_panel_custom_water_box_4;
          else if (n >= 135 && n <= 170) o = module510.mode_setting_panel_custom_water_box_5;
          else if (175 == n) o = module510.mode_setting_panel_custom_water_box_6;
          else if (n >= 180 && n <= 205) o = module510.mode_setting_panel_custom_water_box_7;
          return o;
        },
      },
      {
        key: 'waterModeSettingTip',
        value: function () {
          if (this.props.isInHomePage) {
            if (!module381.RSM.isWaterBoxIn)
              return module390.default.isElectronicWaterBoxSupported() ? module510.water_box_not_installed_tip : module510.water_box_not_installed_tip_tanos;
            if (!module381.RSM.isWaterBoxCarriageIn) return module510.water_box_not_installed_tip;
            if (module381.RSM.waterShortageStatus) return module510.tanos_s_water_shortage;
          }

          return null;
        },
      },
      {
        key: 'onPressCleanMode',
        value: function (t, o) {
          var module22, l, u, h, c, p;
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
                    return regeneratorRuntime.default.awrap(module416.default.setCustomMode(o));

                  case 9:
                    if (
                      (M.sent,
                      (module381.RSM.fanPower = o),
                      (null == (l = this.props.parent) ? undefined : l.sidebarMenu) &&
                        (null == (u = this.props.parent) || null == (h = u.sidebarMenu) || h.updateModeIcon(o, module22, module381.RSM.mopMode)),
                      null == (c = (p = this.props).onModeChange) || c.call(p, o, module22, module381.RSM.mopMode),
                      console.log('set mode rpc success,  cleanMode- ' + o),
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.CleanWaterModeDidChange,
                      }),
                      (M.t0 = 108 != o),
                      !M.t0)
                    ) {
                      M.next = 19;
                      break;
                    }

                    M.next = 19;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.CleanMode, o + ''));

                  case 19:
                    M.next = 27;
                    break;

                  case 21:
                    M.prev = 21;
                    M.t1 = M.catch(6);
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t1 ? JSON.stringify(M.t1) : M.t1));
                    this.showToast(module510.robot_communication_exception);
                    this.cleanMode = t;
                    if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1624.CustomCleanMode);

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
        key: 'onCornerCleanSwitchChanged',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this.mopMode != module1624.CleanRouteFastMode || !t) {
                      s.next = 3;
                      break;
                    }

                    globals.showToast(module510.cannot_cornerclean_withfastclean_toast);
                    return s.abrupt('return');

                  case 3:
                    s.prev = 3;
                    this.setState({
                      cornerCleanOn: t,
                    });
                    s.next = 7;
                    return regeneratorRuntime.default.awrap(module416.default.setCornerCleanMode(t));

                  case 7:
                    o = s.sent;
                    console.log('onCornerCleanSwitchChanged', o);
                    s.next = 15;
                    break;

                  case 11:
                    s.prev = 11;
                    s.t0 = s.catch(3);
                    this.setState({
                      cornerCleanOn: !t,
                    });
                    console.log('onCornerCleanSwitchChanged error', s.t0);

                  case 15:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[3, 11]],
            Promise
          );
        },
      },
      {
        key: 'onPressWateMode',
        value: function (t, o) {
          var s, l, u, h, c, p;
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
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMopMode(module381.RSM.fanPower, o, 300));

                  case 13:
                    module381.RSM.mopMode = 300;
                    M.next = 16;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.MopMode, '300'));

                  case 16:
                    M.next = 20;
                    break;

                  case 18:
                    M.next = 20;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxMode(o));

                  case 20:
                    M.next = 24;
                    break;

                  case 22:
                    M.next = 24;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxMode(o));

                  case 24:
                    if (207 != o || 0 != module381.RSM.waterBoxDistance) {
                      M.next = 27;
                      break;
                    }

                    M.next = 27;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxDistance(this.sliderWaterDefault));

                  case 27:
                    this.isRequesting = false;
                    module381.RSM.waterBoxMode = o;
                    this.forceUpdate();
                    if (null == (u = this.props.parent) ? undefined : u.sidebarMenu) null == (h = this.props.parent) || h.sidebarMenu.updateModeIcon(l, o, module381.RSM.mopMode);
                    if (!(null == (c = (p = this.props).onModeChange))) c.call(p, l, o, module381.RSM.mopMode);
                    console.log('set mode rpc success,  waterBoxMode- ' + o);
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.CleanWaterModeDidChange,
                    });
                    M.next = 36;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.WaterMode, o + ''));

                  case 36:
                    M.next = 44;
                    break;

                  case 38:
                    M.prev = 38;
                    M.t0 = M.catch(7);
                    this.isRequesting = false;
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t0 ? JSON.stringify(M.t0) : M.t0));
                    this.showToast(module510.robot_communication_exception);
                    if (this.waterModeSetView) this.waterModeSetView.setMode(t, module1624.CustomWaterMode);

                  case 44:
                  case 'end':
                    return M.stop();
                }
            },
            null,
            this,
            [[7, 38]],
            Promise
          );
        },
      },
      {
        key: 'onPressMopMode',
        value: function (t, o) {
          var s, l, u, h;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
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
                      c.next = 7;
                      break;
                    }

                    return c.abrupt('return');

                  case 7:
                    c.prev = 7;
                    this.isRequesting = true;
                    c.next = 11;
                    return regeneratorRuntime.default.awrap(module416.default.setMopMode(o));

                  case 11:
                    if ((c.sent, (this.isRequesting = false), (module381.RSM.mopMode = o), 301 != o && 303 != o && 304 != o)) {
                      c.next = 26;
                      break;
                    }

                    if (((u = module420.StorageKeys.ExquisiteCleanbyGuide + '_' + o), (c.t0 = o == module1624.CleanRouteFastMode), c.t0)) {
                      c.next = 21;
                      break;
                    }

                    c.next = 20;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(u));

                  case 20:
                    c.t0 = !c.sent;

                  case 21:
                    if (!c.t0) {
                      c.next = 26;
                      break;
                    }

                    if (!(null == (h = this.props))) h.showCleanRouteGuideByMode(o);
                    c.next = 26;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(u, u));

                  case 26:
                    if (this.mopModeSetView) this.mopModeSetView.setMode(o);
                    c.next = 29;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.MopMode, o + ''));

                  case 29:
                    c.next = 37;
                    break;

                  case 31:
                    c.prev = 31;
                    c.t1 = c.catch(7);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof c.t1 ? JSON.stringify(c.t1) : c.t1));
                    this.showToast(module510.robot_communication_exception);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(t);

                  case 37:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[7, 31]],
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
            c,
            p,
            M,
            S,
            f,
            C,
            x,
            v,
            P,
            k,
            V,
            E,
            B,
            I,
            T,
            O = this;
          return regeneratorRuntime.default.async(
            function (H) {
              for (;;)
                switch ((H.prev = H.next)) {
                  case 0:
                    if (
                      ((o = this.props),
                      (s = o.isInHomePage),
                      (l = o.parent),
                      (u = o.onModeChange),
                      (h = 0 == t),
                      (c = module390.default.isPureCleanMopSupported() ? 3 == t : 1 == t),
                      (p = module390.default.isPureCleanMopSupported() && 1 == t),
                      (M = module390.default.isPureCleanMopSupported() && 2 == t),
                      !c)
                    ) {
                      H.next = 9;
                      break;
                    }

                    H.t0 = module1624.CustomCleanMode;
                    H.next = 17;
                    break;

                  case 9:
                    H.t1 = parseInt;
                    H.next = 12;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.CleanMode));

                  case 12:
                    if (((H.t2 = H.sent), H.t2)) {
                      H.next = 15;
                      break;
                    }

                    H.t2 = 101;

                  case 15:
                    H.t3 = H.t2;
                    H.t0 = H.t1(H.t3);

                  case 17:
                    if (((S = H.t0), !c)) {
                      H.next = 22;
                      break;
                    }

                    H.t4 = module1624.CustomWaterMode;
                    H.next = 30;
                    break;

                  case 22:
                    H.t5 = parseInt;
                    H.next = 25;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.WaterMode));

                  case 25:
                    if (((H.t6 = H.sent), H.t6)) {
                      H.next = 28;
                      break;
                    }

                    H.t6 = 201;

                  case 28:
                    H.t7 = H.t6;
                    H.t4 = H.t5(H.t7);

                  case 30:
                    if (((f = H.t4), !c)) {
                      H.next = 35;
                      break;
                    }

                    H.t8 = module1624.CustomMopMode;
                    H.next = 43;
                    break;

                  case 35:
                    H.t9 = parseInt;
                    H.next = 38;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.MopMode));

                  case 38:
                    if (((H.t10 = H.sent), H.t10)) {
                      H.next = 41;
                      break;
                    }

                    H.t10 = 300;

                  case 41:
                    H.t11 = H.t10;
                    H.t8 = H.t9(H.t11);

                  case 43:
                    if (
                      ((C = H.t8),
                      s && !c && (C = module381.RSM.mopMode),
                      !c &&
                        (function () {
                          if (module390.default.isCleanRouteFastModeSupported()) {
                            if (!(p || (C != module1624.CleanRouteSubtlyMode && C != module1624.CleanRouteDeepSlowMode && C != module1624.CleanRouteDeepSlowPearlMode))) C = 300;
                            if (!(s || C != module1624.CleanRouteFastMode)) C = module1624.CleanRouteDailyMode;
                          } else if (!p) C = 300;

                          if (C == module1624.CustomMopMode) C = 300;
                        })(),
                      module390.default.isPureCleanMopSupported()
                        ? (M
                            ? ((f = module1624.WaterModeZero),
                              (this.state.shouldShowCleanModeView = true),
                              (this.state.shouldShowWaterModeView = false),
                              (this.state.shouldShowMopMethodView = false))
                            : p
                            ? ((S = module1624.CleanModeZero),
                              (this.state.shouldShowCleanModeView = false),
                              (this.state.shouldShowWaterModeView = true),
                              (this.state.shouldShowMopMethodView = true))
                            : h &&
                              (108 == S && ((S = 102), this.cleanModeSetView && (this.cleanModeSetView.state.current = 1)),
                              (this.state.shouldShowCleanModeView = true),
                              (this.state.shouldShowWaterModeView = true),
                              (this.state.shouldShowMopMethodView = false)),
                          module390.default.isCleanRouteFastModeSupported() && s && (this.state.shouldShowMopMethodView = true))
                        : ((this.state.shouldShowWaterModeView = module390.default.isElectronicWaterBoxSupported()),
                          (this.state.shouldShowMopMethodView = module390.default.isCleanRouteSettingSupported() && s)),
                      (H.prev = 48),
                      (this.cleanMode = S),
                      (this.waterMode = f),
                      (this.mopMode = C),
                      this.setState(
                        {
                          isCustomMode: c,
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(f),
                          cleanModeSwitcherEnabled: this.isCleanModeEnabled(C),
                          waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(S, f, C),
                        },
                        function () {
                          if (c) O.updateMapWithCustomMode();
                          if (h && module390.default.isPureCleanMopSupported() && 104 == S)
                            null == O ||
                              O.cleanModeSetView.setState({
                                current: 3,
                              });
                        }
                      ),
                      null == (x = this.cleanModeSetView) || x.setMode(S),
                      null == (v = this.waterModeSetView) || v.setMode(f),
                      null == (P = this.mopModeSetView) || P.setMode(C, 301),
                      this.modeDidChange(),
                      s)
                    ) {
                      H.next = 59;
                      break;
                    }

                    return H.abrupt('return');

                  case 59:
                    if (!module390.default.isShakeMopSetSupported()) {
                      H.next = 64;
                      break;
                    }

                    H.next = 62;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMopMode(S, f, C, false));

                  case 62:
                    H.next = 73;
                    break;

                  case 64:
                    if (!module381.RSM.isSupportFeature(118)) {
                      H.next = 69;
                      break;
                    }

                    H.next = 67;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMotorMode(S, f));

                  case 67:
                    H.next = 73;
                    break;

                  case 69:
                    H.next = 71;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomMode(S));

                  case 71:
                    H.next = 73;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxMode(f));

                  case 73:
                    this.isRequesting = false;
                    module381.RSM.fanPower = S;
                    module381.RSM.waterBoxMode = f;
                    module381.RSM.mopMode = C;
                    module381.RSM.mopModeId = this.mopModeId;
                    if (s) null == l || null == (k = l.sidebarMenu) || k.updateModeIcon(S, f, C);
                    if (u) u(S, f, C);
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.CleanWaterModeDidChange,
                    });
                    V = C
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
                        V
                      )
                    );
                    this.forceUpdate();
                    H.next = 95;
                    break;

                  case 86:
                    H.prev = 86;
                    H.t12 = H.catch(48);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof H.t12 ? JSON.stringify(H.t12) : H.t12));
                    this.showToast(module510.robot_communication_exception);
                    if (!(null == (E = this.cleanModeSetView))) E.setMode(module381.RSM.fanPower);
                    if (!(null == (B = this.waterModeSetView))) B.setMode(module381.RSM.waterBoxMode);
                    if (!(null == (I = this.mopModeSetView))) I.setMode(module381.RSM.mopMode, 301);
                    this.setState({
                      isCustomMode: !c,
                    });

                  case 95:
                    T = C
                      ? {
                          mopMode: C,
                        }
                      : {};
                    module387.LogEventStatus(
                      'custom_mode_switch',
                      j(
                        {
                          on: c,
                          cleanMode: S,
                          waterMode: f,
                        },
                        T
                      )
                    );

                  case 97:
                  case 'end':
                    return H.stop();
                }
            },
            null,
            this,
            [[48, 86]],
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
            module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              n.showToast(module510.robot_communication_exception);
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
          this.backListener = module13.BackHandler.addEventListener('hardwareBackPress', function () {
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
          if (module390.default.isCleanRouteSettingSupported() && this.props.isInHomePage) {
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
          return !(module1624.isModeCustomized(t, o, n) && !this.props.isSmartScene);
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
          var t = [module510.robot_status_clean_mop_mode, module510.robot_clean_status_only_mop, module510.robot_clean_status_only_clean],
            o = [module510.custom_mode_panel_tab_general],
            n = module390.default.isPureCleanMopSupported() ? t : o,
            s = module510.localization_strings_Common_custom_mode,
            l = module510.map_edit_bottom_menu_mode,
            u = module390.default.isPureCleanMopSupported() ? s : l;
          if (this.shouldShowCustomTab) n.push(u);
          return n;
        },
      },
      {
        key: 'isSupportedWaterMode',
        get: function () {
          return module390.default.isElectronicWaterBoxSupported() || module390.default.isCleanRouteSettingSupported();
        },
      },
      {
        key: 'isCleanMopTab',
        get: function () {
          var t = this.getCurrentTab();
          return module390.default.isPureCleanMopSupported() && 0 == t;
        },
      },
      {
        key: 'isPureMopTab',
        get: function () {
          var t = this.getCurrentTab();
          return module390.default.isPureCleanMopSupported() && 1 == t;
        },
      },
      {
        key: 'isPureCleanTab',
        get: function () {
          var t = this.getCurrentTab();
          return module390.default.isPureCleanMopSupported() && 2 == t;
        },
      },
      {
        key: 'sliderWaterMin',
        get: function () {
          return module424.DMM.isPearl ? 85 : 60;
        },
      },
      {
        key: 'sliderWaterMax',
        get: function () {
          return module424.DMM.isPearl ? 230 : 205;
        },
      },
      {
        key: 'sliderWaterTotal',
        get: function () {
          return this.sliderWaterMin + this.sliderWaterMax;
        },
      },
      {
        key: 'sliderWaterDefault',
        get: function () {
          return (this.sliderWaterTotal + 5) / 2;
        },
      },
    ]);
    return L;
  })(React.default.Component);

exports.default = z;
z.contextType = module1199.AppConfigContext;
z.defaultProps = {
  shouldShowCustomSwitch: true,
  isInHomePage: false,
  isInMapEditPage: false,
  isTimerPage: false,
  isSmartScene: false,
};
var Z = module13.StyleSheet.create({
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
  cornerCleanView: {
    paddingVertical: 0,
  },
});
