var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module380 = require('./380'),
  module1227 = require('./1227'),
  module381 = require('./381'),
  module1228 = require('./1228'),
  module377 = require('./377'),
  module1229 = require('./1229'),
  module387 = require('./387'),
  module411 = require('./411'),
  module386 = require('./386'),
  module415 = require('./415'),
  module506 = require('./506'),
  module1231 = require('./1231'),
  module407 = require('./407'),
  module1345 = require('./1345'),
  module1353 = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = A(o);
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
  })(require('./1353')),
  module1284 = require('./1284'),
  module1061 = require('./1061'),
  module383 = require('./383'),
  module1354 = require('./1354'),
  module1352 = require('./1352'),
  module1355 = require('./1355'),
  module1356 = require('./1356'),
  module390 = require('./390'),
  module1259 = require('./1259');

function A(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (A = function (t) {
    return t ? n : o;
  })(t);
}

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

function N(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      L(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      L(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function q() {
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
  module1359 = (function (t) {
    module7.default(L, t);

    var module49 = L,
      module506 = q(),
      A = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var o;
      module4.default(this, L);
      (o = A.call(this, t)).state = {
        shouldShow: false,
        waterSettingTip: o.waterModeSettingTip(),
        isCustomMode: false,
        shouldShowRedTip: false,
        cleanModeSwitcherEnabled: true,
        waterModeSwitcherEnabled: true,
        mopMethodSwitcherEnabled: o.isMopModeEnabled(module377.RSM.waterBoxMode),
        switchViewLeftWidth: 0,
        isDoggeDirtyMode: false,
        waterBoxDistance: module377.RSM.waterBoxDistance || 205,
        visualWaterBoxDistance: 265 - (module377.RSM.waterBoxDistance || 205),
      };
      o.animatedMarginBottom = new module12.Animated.Value(-200);
      o.isRequesting = false;
      o.preIsWaterBoxIn = module377.RSM.isWaterBoxIn;
      o.preIsWaterBoxCarriageIn = module377.RSM.isWaterBoxCarriageIn;
      o.preWaterShortageStatus = module377.RSM.waterShortageStatus;
      return o;
    }

    module5.default(L, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t = this;
          module1061.default.shared().enableBackAndMore();
          module1352.ModeDataInstance.removeChangeListener(function () {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          module1352.ModeDataInstance.addChangeListener(function () {
            t.forceUpdate();
          });
        },
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
            n = module1229.MM.customCleanModes.length > 0,
            l = this.props,
            u = l.isInHomePage,
            c = l.isTimerPage,
            p = l.parent,
            h = (u && (null == p ? undefined : p.tabIndex) == module1345.TabZone) || this.props.isTabZone,
            f = null;
          f = c
            ? module491.custom_mode_panel_has_custom_data_tip
            : h
            ? module491.custom_mode_panel_zoneclean_notwork_tip
            : n
            ? module415.DMM.isGarnet
              ? module491.mode_setting_panel_custom_mode_tip
              : module491.custom_mode_switch_description
            : module491.custom_mode_panel_no_custom_data_tip;

          var w = React.default.createElement(
              module12.ImageBackground,
              {
                source: require(c ? d[36] : d[37]),
                style: [
                  J.noCustomShowView,
                  {
                    marginTop: c ? 50 : 40,
                  },
                ],
              },
              !c &&
                React.default.createElement(module1284.ModeBubble, {
                  cleanMode: 102,
                  waterMode: 202,
                  iconWidth: 24,
                  iconHeight: 24,
                  style: {
                    width: 70,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 35,
                    marginLeft: 160,
                  },
                })
            ),
            _ = React.default.createElement(module1231.MapView, {
              top: 50,
              righ: 0,
              left: 0,
              bottom: 0,
              ref: function (o) {
                return (t.mapView = o);
              },
              style: {
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignSelf: 'stretch',
                paddingHorizontal: 30,
              },
              pointerEvents: 'none',
              hideAccessory: true,
              inBlockMode: true,
              blockBubbleShowInfo: module1231.BlockBubbleShowInfo.CLEANMODE,
              onPanResponderGrant: this.props.onPanResponderGrant,
              onPanResponderRelease: this.props.onPanResponderRelease,
              selectedBlocksDidChange: this.props.selectedBlocksDidChange,
            });

          return React.default.createElement(
            module12.View,
            {
              style: [
                J.customModeView,
                {
                  backgroundColor: o.modeSetCardBackgroundColor,
                },
              ],
            },
            !c &&
              !h &&
              React.default.createElement(module381.TopImageButton, {
                funcId: 'custom_mode_panel_top_btn',
                title: module491.multi_floor_edit,
                textColor: o.buttonTextColor,
                selectedTextColor: o.buttonTextSelectedColor,
                textTop: 4,
                imageWidth: 30,
                imageHeight: 30,
                fontSize: 12,
                enabled: true,
                onPress: this.gotoCustomModePage.bind(this),
                image: o.customModeEditIcon,
                style: J.customModeEditIcon,
              }),
            !n || h || c ? w : _,
            React.default.createElement(
              module12.Text,
              module21.default({}, module387.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  J.bottomTip,
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
        key: 'getDoggedDirtyView',
        value: function () {
          var t = this.context.theme.ModeSettingPanel;
          return React.default.createElement(
            module12.View,
            {
              style: [
                J.customModeView,
                {
                  backgroundColor: t.modeSetCardBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.ImageBackground, {
              source: require('./1359'),
              style: [
                J.noCustomShowView,
                {
                  marginTop: 20,
                },
              ],
            }),
            React.default.createElement(
              module12.Text,
              module21.default({}, module387.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  J.bottom,
                  {
                    color: t.enableSubTitleColor,
                    marginTop: 20,
                  },
                ],
              }),
              module491.custom_mode_clean_dogged_dirty_tip
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          if (this.state.shouldShowRedTip) s.warningTextColor;
          else if (module1229.MM.customCleanModes.length > 0) s.enableSubTitleColor;
          else s.disableSubTitleColor;
          if (this.state.shouldShowRedTip) module491.custom_mode_goto_setting_tip;
          else if (this.state.isCustomMode && W && !module386.default.isShakeMopStrengthSupported()) module491.zero_water_will_be_first_short;
          else module491.custom_mode_switch_description;
          this.animatedMarginBottom.interpolate({
            inputRange: [-200, 0],
            outputRange: [0, 1],
          });
          var t,
            n = this,
            s = this.context.theme.ModeSettingPanel,
            l = this.props,
            u = l.onPressMore,
            c = l.shouldShowCustomSwitch,
            p = l.isInHomePage,
            h = l.isInMapEditPage,
            y = l.parent,
            B = p && module386.default.isSoftCleanModeSupportedInMain() ? 0 : 1,
            R = module1228.CleanModes().slice(B, module1228.CleanModes().length),
            V = module386.default.isElectronicWaterBoxSupported() || module386.default.isShakeMopStrengthSupported(),
            W =
              -1 !=
              module1229.MM.customCleanModes.findIndex(function (t) {
                return 200 == t.water_box_mode;
              }),
            T = module377.RSM.mapSaveEnabled && module386.default.isCustomModeSupported() && c,
            z = (!this.state.isCustomMode && this.state.cleanModeSwitcherEnabled) || h,
            G = (!this.state.isCustomMode && this.state.waterModeSwitcherEnabled) || h,
            A = (this.state.mopMethodSwitcherEnabled && !this.state.isCustomMode) || h,
            L = React.default.createElement(
              module12.View,
              null,
              React.default.createElement(module380.default, {
                funcId: 'clean_mode_set_view_',
                ref: function (t) {
                  n.cleanModeSetView = t;
                },
                style: {
                  marginHorizontal: 20,
                  marginTop: 5,
                  marginBottom: V ? 15 : 0,
                },
                title: module491.localization_strings_Setting_CleanModePage_5,
                items: R,
                enabled: z,
                addonTip: z && this.props.isInHomePage && module386.default.isSoftCleanModeSupportedInMain() ? module491.effect_only_once_tip : null,
                isInHomePage: p,
                onPressButton: this.onPressCleanMode.bind(this),
              }),
              V &&
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      backgroundColor: s.modeSetCardBackgroundColor,
                      marginHorizontal: 20,
                      paddingBottom: module415.DMM.isGarnet ? 0 : 10,
                      borderRadius: 12,
                    },
                  },
                  V &&
                    !module415.DMM.isGarnet &&
                    React.default.createElement(module380.default, {
                      funcId: 'water_mode_set_view_',
                      ref: function (t) {
                        n.waterModeSetView = t;
                      },
                      style: {
                        marginBottom: -10,
                      },
                      tip: this.state.waterSettingTip,
                      submode:
                        207 == (null == this ? undefined : null == (t = this.waterModeSetView) ? undefined : t.value)
                          ? this.getCustomWaterModeText(this.state.waterBoxDistance || module377.RSM.waterBoxDistance)
                          : null,
                      title: module386.default.isShakeMopStrengthSupported() ? module491.custom_water_tanos_mode_title : module491.custom_water_mode_title,
                      items: module1228.MopWaterOrStrengths(),
                      enabled: G,
                      isInHomePage: p,
                      addonTip:
                        G && module377.RSM.isWaterBoxIn && this.props.isInHomePage
                          ? module491.effect_only_once_tip
                          : this.props.isInMapEditPage && !module386.default.isShakeMopSetSupported()
                          ? module491.zero_water_will_be_first_short
                          : null,
                      onPressButton: this.onPressWateMode.bind(this),
                    }),
                  module386.default.isCustomWaterBoxDistanceSupported() &&
                    207 == module377.RSM.waterBoxMode &&
                    p &&
                    React.default.createElement(module1356.SliderAdjuster, {
                      title: null,
                      style: {
                        backgroundColor: 'transparent',
                      },
                      sliderWidth: module12.Dimensions.get('window').width - 80,
                      minValue: 60,
                      maxValue: 205,
                      step: 5,
                      value: this.state.visualWaterBoxDistance,
                      circleValue: (n.state.visualWaterBoxDistance - 60) / 5 + 1,
                      shouldShowSideValue: false,
                      shouldShowValue: true,
                      showValue: null,
                      desc: null,
                      onSlidingMove: function (t) {
                        n.setState({
                          visualWaterBoxDistance: t,
                          waterBoxDistance: 265 - t,
                        });
                      },
                      onSlidingComplete: function (t) {
                        var n;
                        return regeneratorRuntime.default.async(
                          function (s) {
                            for (;;)
                              switch ((s.prev = s.next)) {
                                case 0:
                                  s.prev = 0;
                                  s.next = 3;
                                  return regeneratorRuntime.default.awrap(module407.default.setWaterBoxDistance(265 - t));

                                case 3:
                                  n = s.sent;
                                  module377.RSM.waterBoxDistance = 265 - t;
                                  console.log('set custom water', n);
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
                    }),
                  module386.default.isShakeMopSetSupported() &&
                    !module415.DMM.isGarnet &&
                    React.default.createElement(module1227.default, {
                      ref: function (t) {
                        n.mopModeSetView = t;
                      },
                      style: {
                        marginBottom: 20,
                        marginHorizontal: 20,
                      },
                      title: module491.tanos_s_mop_mode,
                      items: module1228.MopMethods(),
                      enabled: A,
                      addonTip: A ? module491.custom_mode_panel_mop_method2_red_tip : null,
                      isRedAddonTip: true,
                      isInHomePage: p,
                      shouldShowQuestionIcon: p,
                      onPressButton: this.onPressMopMode.bind(this),
                      onPressQuestion: this.props.onPressQuestion,
                    }),
                  module415.DMM.isGarnet &&
                    React.default.createElement(module1354.CustomMopModeView, {
                      currentMopId: this.mopModeId,
                      items: module1352.ModeDataInstance.modePannelCustomMops,
                      onPressMore: u,
                      shouldCallRpc: p,
                      didSelectMopMode: function (t) {
                        n.mopModeConfig = t;
                        n.mopModeId = t.id;
                        n.lastMopId = n.mopModeId;
                      },
                    })
                )
            ),
            N = module415.DMM.isGarnet && p && ((null == y ? undefined : y.tabIndex) == module1345.TabZone || (null == y ? undefined : y.tabIndex) == module1345.TabSegment),
            q = [module491.custom_mode_panel_tab_general, module491.map_edit_bottom_menu_mode];
          if (N) q.push(module491.custom_mode_panel_tab_clean_strong_dirty);
          return React.default.createElement(
            module381.AModal,
            {
              isModal: !this.props.isInHomePage,
              visible: this.state.shouldShow,
              style: {
                zIndex: 9e3,
                justifyContent: 'flex-end',
              },
              onPress: function () {
                if (n.props.onPressCloseButton) n.props.onPressCloseButton();
                n.hide();
              },
            },
            React.default.createElement(
              module1353.default,
              {
                onClose: function () {
                  n.hide();
                },
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    J.wrap,
                    {
                      bottom: this.animatedMarginBottom,
                      backgroundColor: s.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module1353.SwipeDownIndicator, {
                  style: {
                    marginBottom: 10,
                  },
                }),
                T &&
                  React.default.createElement(module1355.default, {
                    tabs: q,
                    current: this.state.isCustomMode ? 1 : this.state.isDoggeDirtyMode ? 2 : 0,
                    tabWillChange: this.modeTabWillChange.bind(this),
                    onPressTab: this.modeTabDidChange.bind(this),
                  }),
                h ? L : this.state.isCustomMode ? this.getCustomModeView() : this.state.isDoggeDirtyMode ? this.getDoggedDirtyView() : L,
                module387.default.isIphoneX() &&
                  React.default.createElement(module12.View, {
                    style: [
                      J.whilteSplitView,
                      {
                        backgroundColor: s.backgroundColor,
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
          return 2 != t || module377.RSM.cleanResumeFlag == module377.CleanResumeFlag.None || (this.showToast(module491.select_dogged_dirty_mop_mode_when_running_tip), false);
        },
      },
      {
        key: 'modeTabDidChange',
        value: function (t) {
          var module49, module21;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module49 = this.props;
                    module21 = module49.tabModeDidChange;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(this.handleModeTabDidChange(t));

                  case 3:
                    if (module21) module21();

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
          module1061.default.shared().enableBackAndMore();

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
        value: function (t, n, s) {
          var l,
            u,
            c,
            p,
            h,
            M,
            f,
            w,
            b,
            x,
            v,
            B = this;
          return regeneratorRuntime.default.async(
            function (R) {
              for (;;)
                switch ((R.prev = R.next)) {
                  case 0:
                    if (
                      (module1061.default.shared().disableBackAndMore(),
                      module386.default.isCustomWaterBoxDistanceSupported() &&
                        ((this.state.waterBoxDistance = module377.RSM.waterBoxDistance || 205), (this.state.visualWaterBoxDistance = 265 - this.state.waterBoxDistance)),
                      (l = this.props),
                      (u = l.isTimerPage),
                      (c = l.isInMapEditPage),
                      (p = l.isInHomePage),
                      (h = l.isSmartScene),
                      (M = t || module377.RSM.fanPower),
                      module386.default.isSoftCleanModeSupportedInMain() || 105 != M)
                    ) {
                      R.next = 10;
                      break;
                    }

                    if (((M = 102), (R.t0 = p), !R.t0)) {
                      R.next = 10;
                      break;
                    }

                    R.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(M));

                  case 10:
                    if (
                      ((f = n || module377.RSM.waterBoxMode),
                      (w = s || (module415.DMM.isGarnet ? module377.RSM.mopModeId : module377.RSM.mopMode)),
                      module415.DMM.isGarnet &&
                        ((this.mopModeId = s || (p ? module377.RSM.mopModeId : null == (b = module1352.ModeDataInstance.modePannelCustomMops[0]) ? undefined : b.id)),
                        (this.mopModeConfig = module1352.ModeDataInstance.getCustomMopModeConfigById(this.mopModeId))),
                      (x = module1228.isModeCustomized(M, f, w) && !h && !c),
                      (v = module415.DMM.isGarnet && p && 4 == this.mopModeId),
                      (module390.MC.customTabIndex = x ? 1 : v ? 2 : 0),
                      !x || module377.RSM.mapStatus == module377.MapStatus.Has_WithSegments || !p)
                    ) {
                      R.next = 27;
                      break;
                    }

                    if (M == module1228.CustomCleanMode) M = module1228.CleanModes()[2].strength;
                    if (f == module1228.CustomWaterMode) f = module1228.MopWaterOrStrengths()[2].strength;
                    if (w == module1228.CustomMopMode) w = module1228.MopMethods()[0].strength;
                    if (this.props.didSetMode) this.props.didSetMode(M, f, w, false);
                    R.next = 23;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.CleanMode, M + ''));

                  case 23:
                    R.next = 25;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.WaterMode, f + ''));

                  case 25:
                    R.next = 27;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MopMode, w + ''));

                  case 27:
                    this.setState(
                      {
                        shouldShow: true,
                        isCustomMode: x,
                        mopMethodSwitcher: this.isMopModeEnabled(f),
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(w),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(M, f, w),
                      },
                      function () {
                        if (B.cleanModeSetView) B.cleanModeSetView.setMode(M, module1228.CustomCleanMode);
                        if (B.waterModeSetView) B.waterModeSetView.setMode(f, module1228.CustomWaterMode);
                        if (!module415.DMM.isGarnet) B.mopModeSetView && B.mopModeSetView.setMode(w, u || c ? 0 : 301);
                        B.updateMapWithCustomMode();
                        module12.Animated.timing(B.animatedMarginBottom, {
                          toValue: 0,
                          duration: 250,
                        }).start();
                        B.forceUpdate();
                      }
                    );
                    this.addBackListener();

                  case 29:
                  case 'end':
                    return R.stop();
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
          if (this.mapView) this.mapView.setState(N({}, module1229.MM.mapData));
          if (this.mapView) this.mapView.setAllCleanMopMode(module1229.MM.customCleanModes);
        },
      },
      {
        key: 'setCleanWaterMode',
        value: function (t, o, n) {
          if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1228.CustomCleanMode);
          if (this.waterModeSetView) this.waterModeSetView.setMode(o, module1228.CustomWaterMode);
          if (this.mopModeSetView) this.mopModeSetView.setMode(n, 301);
        },
      },
      {
        key: 'modeDidChange',
        value: function () {
          var t, n, s, l, u, c, p, h;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    u = this.state.isCustomMode;
                    c = u ? module1228.CustomCleanMode : null == this ? undefined : null == (t = this.cleanModeSetView) ? undefined : t.value;
                    p = u ? module1228.CustomWaterMode : null == this ? undefined : null == (n = this.waterModeSetView) ? undefined : n.value;
                    h = u ? module1228.CustomMopMode : null == this ? undefined : null == (s = this.mopModeSetView) ? undefined : s.value;
                    console.log('CustomCleanWaterModeView  cleanMode - ' + c + ' , waterMode - ' + p + ' , mopMode - ' + h);
                    if (!(null == (l = this.props) || null == l.didSetMode)) l.didSetMode(c, p, module415.DMM.isGarnet ? this.mopModeConfig : h);

                  case 6:
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
          if (t >= 60 && t <= 70) o = module491.mode_setting_panel_custom_water_box_1;
          else if (75 == t) o = module491.mode_setting_panel_custom_water_box_2;
          else if (t >= 80 && t <= 125) o = module491.mode_setting_panel_custom_water_box_3;
          else if (130 == t) o = module491.mode_setting_panel_custom_water_box_4;
          else if (t >= 135 && t <= 170) o = module491.mode_setting_panel_custom_water_box_5;
          else if (175 == t) o = module491.mode_setting_panel_custom_water_box_6;
          else if (t >= 180 && t <= 205) o = module491.mode_setting_panel_custom_water_box_7;
          return o;
        },
      },
      {
        key: 'waterModeSettingTip',
        value: function () {
          if (module386.default.isShakeMopStrengthSupported())
            return module415.DMM.isGarnet
              ? null
              : !module377.RSM.isWaterBoxIn && this.props.isInHomePage
              ? module491.water_box_not_installed_tip_tanos
              : !module377.RSM.isWaterBoxCarriageIn && this.props.isInHomePage
              ? module491.water_box_not_installed_tip
              : module377.RSM.waterShortageStatus && this.props.isInHomePage
              ? module491.tanos_s_water_shortage
              : null;
          else return module386.default.isElectronicWaterBoxSupported() && !module377.RSM.isWaterBoxIn && this.props.isInHomePage ? module491.water_box_not_installed_tip : null;
        },
      },
      {
        key: 'onPressCleanMode',
        value: function (t, n) {
          var module21, l, u, c, p, h;
          return regeneratorRuntime.default.async(
            function (M) {
              for (;;)
                switch ((M.prev = M.next)) {
                  case 0:
                    if ((this.modeDidChange(), this.props.isInHomePage)) {
                      M.next = 3;
                      break;
                    }

                    return M.abrupt('return');

                  case 3:
                    if (105 == n && this.props.parent) this.props.parent.onPressMopModeItem();
                    module21 = this.waterModeSetView ? this.waterModeSetView.value : undefined;
                    M.prev = 5;
                    M.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(n));

                  case 8:
                    module377.RSM.fanPower = n;
                    if (null == (l = this.props.parent) ? undefined : l.sidebarMenu)
                      null == (u = this.props.parent) || null == (c = u.sidebarMenu) || c.updateModeIcon(n, module21, module377.RSM.mopMode);
                    if (!(null == (p = (h = this.props).onModeChange))) p.call(h, n, module21, module377.RSM.mopMode);
                    console.log('set mode rpc success,  cleanMode- ' + n);
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanWaterModeDidChange,
                    });
                    M.next = 16;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.CleanMode, n + ''));

                  case 16:
                    M.next = 23;
                    break;

                  case 18:
                    M.prev = 18;
                    M.t0 = M.catch(5);
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t0 ? JSON.stringify(M.t0) : M.t0));
                    this.showToast(module491.robot_communication_exception);
                    if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1228.CustomCleanMode);

                  case 23:
                  case 'end':
                    return M.stop();
                }
            },
            null,
            this,
            [[5, 18]],
            Promise
          );
        },
      },
      {
        key: 'onPressWateMode',
        value: function (t, n) {
          var s, l, u, c, p, h;
          return regeneratorRuntime.default.async(
            function (M) {
              for (;;)
                switch ((M.prev = M.next)) {
                  case 0:
                    if (
                      ((s = this.mopModeSetView && this.mopModeSetView.value),
                      module386.default.isShakeMopSetSupported() &&
                        (this.setState({
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(n),
                        }),
                        200 == n &&
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
                      ((l = this.cleanModeSetView ? this.cleanModeSetView.value : undefined), (M.prev = 7), (this.isRequesting = true), !module386.default.isShakeMopSetSupported())
                    ) {
                      M.next = 22;
                      break;
                    }

                    if (200 != n || 301 != s) {
                      M.next = 18;
                      break;
                    }

                    M.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMopMode(module377.RSM.fanPower, n, 300));

                  case 13:
                    module377.RSM.mopMode = 300;
                    M.next = 16;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MopMode, '300'));

                  case 16:
                    M.next = 20;
                    break;

                  case 18:
                    M.next = 20;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(n));

                  case 20:
                    M.next = 24;
                    break;

                  case 22:
                    M.next = 24;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(n));

                  case 24:
                    this.isRequesting = false;
                    module377.RSM.waterBoxMode = n;
                    this.forceUpdate();
                    if (null == (u = this.props.parent) ? undefined : u.sidebarMenu) null == (c = this.props.parent) || c.sidebarMenu.updateModeIcon(l, n, module377.RSM.mopMode);
                    if (!(null == (p = (h = this.props).onModeChange))) p.call(h, l, n, module377.RSM.mopMode);
                    console.log('set mode rpc success,  waterBoxMode- ' + n);
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanWaterModeDidChange,
                    });
                    M.next = 33;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.WaterMode, n + ''));

                  case 33:
                    M.next = 41;
                    break;

                  case 35:
                    M.prev = 35;
                    M.t0 = M.catch(7);
                    this.isRequesting = false;
                    console.log('setCustomMode  error: ' + ('object' == typeof M.t0 ? JSON.stringify(M.t0) : M.t0));
                    this.showToast(module491.robot_communication_exception);
                    if (this.waterModeSetView) this.waterModeSetView.setMode(t, module1228.CustomWaterMode);

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
        value: function (t, n) {
          var s, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      (this.modeDidChange(),
                      (s = this.cleanModeSetView && this.cleanModeSetView.value),
                      (l = this.waterModeSetView && this.waterModeSetView.value),
                      this.setState({
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(n),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(s, l, n),
                      }),
                      this.props.isInHomePage)
                    ) {
                      u.next = 6;
                      break;
                    }

                    return u.abrupt('return');

                  case 6:
                    if (301 == n && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog();
                    u.prev = 7;
                    this.isRequesting = true;
                    u.next = 11;
                    return regeneratorRuntime.default.awrap(module407.default.setMopMode(n));

                  case 11:
                    this.isRequesting = false;
                    module377.RSM.mopMode = n;
                    if (301 == n && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog();
                    if (this.mopModeSetView) this.mopModeSetView.setMode(n, 301);
                    u.next = 18;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MopMode, n + ''));

                  case 18:
                    u.next = 26;
                    break;

                  case 20:
                    u.prev = 20;
                    u.t0 = u.catch(7);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                    this.showToast(module491.robot_communication_exception);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(t, 301);

                  case 26:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[7, 20]],
            Promise
          );
        },
      },
      {
        key: 'handleModeTabDidChange',
        value: function (t) {
          var n,
            s,
            l,
            u,
            c,
            p,
            h,
            M,
            f,
            w,
            b,
            x,
            v,
            B,
            R,
            P,
            E,
            V,
            W,
            H,
            j = this;
          return regeneratorRuntime.default.async(
            function (K) {
              for (;;)
                switch ((K.prev = K.next)) {
                  case 0:
                    if (((n = this.props), (s = n.isInHomePage), (l = n.parent), (u = n.onModeChange), (c = 0 == t), (h = 2 == t), !(p = 1 == t))) {
                      K.next = 8;
                      break;
                    }

                    K.t0 = module1228.CustomCleanMode;
                    K.next = 16;
                    break;

                  case 8:
                    K.t1 = parseInt;
                    K.next = 11;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.CleanMode));

                  case 11:
                    if (((K.t2 = K.sent), K.t2)) {
                      K.next = 14;
                      break;
                    }

                    K.t2 = 101;

                  case 14:
                    K.t3 = K.t2;
                    K.t0 = K.t1(K.t3);

                  case 16:
                    if (((M = K.t0), !p)) {
                      K.next = 21;
                      break;
                    }

                    K.t4 = module1228.CustomWaterMode;
                    K.next = 29;
                    break;

                  case 21:
                    K.t5 = parseInt;
                    K.next = 24;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.WaterMode));

                  case 24:
                    if (((K.t6 = K.sent), K.t6)) {
                      K.next = 27;
                      break;
                    }

                    K.t6 = 201;

                  case 27:
                    K.t7 = K.t6;
                    K.t4 = K.t5(K.t7);

                  case 29:
                    if (((f = K.t4), !p)) {
                      K.next = 34;
                      break;
                    }

                    K.t8 = module1228.CustomMopMode;
                    K.next = 42;
                    break;

                  case 34:
                    K.t9 = parseInt;
                    K.next = 37;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MopMode));

                  case 37:
                    if (((K.t10 = K.sent), K.t10)) {
                      K.next = 40;
                      break;
                    }

                    K.t10 = 300;

                  case 40:
                    K.t11 = K.t10;
                    K.t8 = K.t9(K.t11);

                  case 42:
                    if (
                      ((w = K.t8),
                      module415.DMM.isGarnet &&
                        (c
                          ? ((this.mopModeId = this.lastMopId || (null == (b = module1352.ModeDataInstance.modePannelCustomMops[0]) ? undefined : b.id)),
                            (this.lastMopId = this.mopModeId))
                          : p
                          ? (this.mopModeId = 0)
                          : h && (this.mopModeId = 4),
                        (w = this.mopModeId)),
                      (K.prev = 44),
                      this.setState(
                        {
                          isCustomMode: p,
                          isDoggeDirtyMode: h,
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(f),
                          cleanModeSwitcherEnabled: this.isCleanModeEnabled(w),
                          waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(M, f, w),
                        },
                        function () {
                          if (p) j.updateMapWithCustomMode();
                        }
                      ),
                      null == (x = this.cleanModeSetView) || x.setMode(M),
                      null == (v = this.waterModeSetView) || v.setMode(f),
                      null == (B = this.mopModeSetView) || B.setMode(w, 301),
                      this.modeDidChange(),
                      s)
                    ) {
                      K.next = 52;
                      break;
                    }

                    return K.abrupt('return');

                  case 52:
                    if (!module386.default.isShakeMopSetSupported()) {
                      K.next = 57;
                      break;
                    }

                    K.next = 55;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMopMode(M, f, w, module415.DMM.isGarnet));

                  case 55:
                    K.next = 66;
                    break;

                  case 57:
                    if (!module377.RSM.isSupportFeature(118)) {
                      K.next = 62;
                      break;
                    }

                    K.next = 60;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMotorMode(M, f));

                  case 60:
                    K.next = 66;
                    break;

                  case 62:
                    K.next = 64;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(M));

                  case 64:
                    K.next = 66;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(f));

                  case 66:
                    this.isRequesting = false;
                    module377.RSM.fanPower = M;
                    module377.RSM.waterBoxMode = f;
                    module377.RSM.mopMode = w;
                    module377.RSM.mopModeId = this.mopModeId;
                    if (s) null == l || null == (R = l.sidebarMenu) || R.updateModeIcon(M, f, w);
                    if (u) u(M, f, w);
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanWaterModeDidChange,
                    });
                    P = w
                      ? {
                          mopMode: w,
                        }
                      : {};
                    module383.LogEventStatus(
                      'custom_mode_value',
                      N(
                        {
                          cleanMode: M,
                          waterMode: f,
                        },
                        P
                      )
                    );
                    this.forceUpdate();
                    K.next = 88;
                    break;

                  case 79:
                    K.prev = 79;
                    K.t12 = K.catch(44);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof K.t12 ? JSON.stringify(K.t12) : K.t12));
                    this.showToast(module491.robot_communication_exception);
                    if (!(null == (E = this.cleanModeSetView))) E.setMode(module377.RSM.fanPower);
                    if (!(null == (V = this.waterModeSetView))) V.setMode(module377.RSM.waterBoxMode);
                    if (!(null == (W = this.mopModeSetView))) W.setMode(module377.RSM.mopMode, 301);
                    this.setState({
                      isCustomMode: !p,
                      isDoggeDirtyMode: !h,
                    });

                  case 88:
                    H = w
                      ? {
                          mopMode: w,
                        }
                      : {};
                    module383.LogEventStatus(
                      'custom_mode_switch',
                      N(
                        {
                          on: p,
                          cleanMode: M,
                          waterMode: f,
                        },
                        H
                      )
                    );

                  case 90:
                  case 'end':
                    return K.stop();
                }
            },
            null,
            this,
            [[44, 79]],
            Promise
          );
        },
      },
      {
        key: 'gotoCustomModePage',
        value: function () {
          var t = this;
          if (module377.RSM.isRunning)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (o) {
              t.showToast(module491.robot_communication_exception);
            });
          else {
            if (this.props.onPressCustomModeButton) this.props.onPressCustomModeButton();
            this.hide();
          }
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
            !!module415.DMM.isGarnet ||
            (204 != t &&
              ((!this.props.isInHomePage && 200 != t) || !(!module377.RSM.isWaterBoxIn || !module377.RSM.isWaterBoxCarriageIn || module377.RSM.waterShortageStatus || 200 == t)))
          );
        },
      },
      {
        key: 'mopModeEnableByWaterState',
        value: function () {
          if (module386.default.isShakeMopStrengthSupported() && this.props.isInHomePage) {
            var t = this.mopModeSetView && this.mopModeSetView.value;

            if (this.preIsWaterBoxIn != module377.RSM.isWaterBoxIn) {
              this.preIsWaterBoxIn = module377.RSM.isWaterBoxIn;
              this.setState({
                mopMethodSwitcherEnabled: module377.RSM.isWaterBoxIn,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module377.RSM.mopMode),
              });
            }

            if (this.preIsWaterBoxCarriageIn != module377.RSM.isWaterBoxCarriageIn) {
              this.preIsWaterBoxCarriageIn = module377.RSM.isWaterBoxCarriageIn;
              this.setState({
                mopMethodSwitcherEnabled: module377.RSM.isWaterBoxCarriageIn,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module377.RSM.mopMode),
              });
            }

            if (this.preWaterShortageStatus != module377.RSM.waterShortageStatus) {
              this.preWaterShortageStatus = module377.RSM.waterShortageStatus;
              this.setState({
                mopMethodSwitcherEnabled: !module377.RSM.waterShortageStatus,
                cleanModeSwitcherEnabled: this.isCleanModeEnabled(t || module377.RSM.mopMode),
              });
            }
          }
        },
      },
      {
        key: 'isCleanModeEnabled',
        value: function (t) {
          return (
            !(module386.default.isShakeMopSetSupported() && !module415.DMM.isGarnet) ||
            (302 != t &&
              (301 == t && this.props.isInHomePage
                ? !(module377.RSM.isWaterBoxIn && module377.RSM.isWaterBoxCarriageIn && !module377.RSM.waterShortageStatus)
                : !(301 == t && !this.props.isInHomePage)))
          );
        },
      },
      {
        key: 'waterModeSwitcherEnabled',
        value: function (t, o, n) {
          return !(module1228.isModeCustomized(t, o, n) && !this.props.isSmartScene);
        },
      },
    ]);
    return L;
  })(React.default.Component);

exports.default = module1359;
module1359.contextType = module506.AppConfigContext;
module1359.defaultProps = {
  shouldShowCustomSwitch: true,
  isInHomePage: false,
  isInMapEditPage: false,
  isTimerPage: false,
  isSmartScene: false,
};
var J = module12.StyleSheet.create({
  wrap: {
    width: module12.Dimensions.get('window').width,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  tip: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
  },
  confirmButton: {
    height: module387.default.isIphoneX() ? 80 : 70,
    marginBottom: module387.default.isIphoneX() ? 0 : -15,
    marginHorizontal: -20,
  },
  line: {
    marginTop: 15,
    height: 0.8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  splitView: {
    marginTop: 20,
    marginHorizontal: -20,
    height: 1,
  },
  whilteSplitView: {
    height: 10,
    backgroundColor: 'white',
  },
  switchView: {
    marginTop: 5,
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  switchViewLeft: {
    flexDirection: 'column',
    flex: 1,
  },
  switch: {},
  switchTitle: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '500',
  },
  switchSubTitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
  },
  switchDescription: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.3)',
    textAlign: 'left',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  customModeView: {
    height: (module415.DMM.isGarnet, 380),
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  customModeEditIcon: {
    width: 40,
    height: 60,
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 9,
  },
  customModeViewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomTip: {
    marginTop: 30,
    textAlign: 'center',
    width: module12.Dimensions.get('window').width - 80,
  },
  noCustomShowView: {
    width: 270,
    height: 188,
  },
});
