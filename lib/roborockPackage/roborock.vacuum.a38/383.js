var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module384 = require('./384'),
  module1325 = require('./1325'),
  module385 = require('./385'),
  module1326 = require('./1326'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module391 = require('./391'),
  module418 = require('./418'),
  module390 = require('./390'),
  module422 = require('./422'),
  module515 = require('./515'),
  module1330 = require('./1330'),
  module414 = require('./414'),
  module1493 = require('./1493'),
  module1322 = require('./1322'),
  module1157 = require('./1157'),
  module387 = require('./387'),
  module1502 = require('./1502'),
  module1328 = require('./1328'),
  module1503 = require('./1503'),
  module1504 = require('./1504'),
  module394 = require('./394'),
  module1391 = require('./1391');

function A(t, o) {
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

function z(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      A(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      A(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function Z() {
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

var module500 = require('./500').strings,
  module1506 = (function (t) {
    module7.default(A, t);

    var o = A,
      module50 = Z(),
      P = function () {
        var t,
          s = module11.default(o);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function A(t) {
      var o;
      module4.default(this, A);
      (o = P.call(this, t)).state = {
        shouldShow: false,
        waterSettingTip: o.waterModeSettingTip(),
        isCustomMode: false,
        shouldShowRedTip: false,
        cleanModeSwitcherEnabled: true,
        waterModeSwitcherEnabled: true,
        mopMethodSwitcherEnabled: o.isMopModeEnabled(module381.RSM.waterBoxMode),
        switchViewLeftWidth: 0,
        isDoggeDirtyMode: false,
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

    module5.default(A, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t = this;
          module1157.default.shared().enableBackAndMore();
          module1328.ModeDataInstance.removeChangeListener(function () {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          module1328.ModeDataInstance.addChangeListener(function () {
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
            n = module1329.MM.customCleanModes.length > 0,
            s = this.props,
            u = s.isInHomePage,
            p = s.isTimerPage,
            h = s.parent,
            M = s.isSmartScene,
            c = (u && (null == h ? undefined : h.tabIndex) == module1493.TabZone) || this.props.isTabZone,
            f = null;
          if (p || (M && !c)) f = module500.custom_mode_panel_has_custom_data_tip;
          else if (c) f = module500.custom_mode_panel_zoneclean_notwork_tip;
          else {
            f = n && module422.DMM.isGarnet ? module500.mode_setting_panel_custom_mode_tip : module500.custom_mode_panel_has_custom_data_tip;
            if (!module381.RSM.mapSaveEnabled) f = module500.open_map_save_mode_tip;
          }

          var C = React.default.createElement(module12.ImageBackground, {
              source: module390.default.isSupportWaterMode() ? this.context.theme.guideImages.mode : this.context.theme.guideImages.modeWithoutWater,
              style: [
                U.noCustomShowView,
                {
                  marginTop: p ? 50 : 40,
                  width: 270,
                  height: 261,
                },
              ],
            }),
            _ = React.default.createElement(module1330.MapView, {
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
              blockBubbleShowInfo: module1330.BlockBubbleShowInfo.CLEANMODE,
              onPanResponderGrant: this.props.onPanResponderGrant,
              onPanResponderRelease: this.props.onPanResponderRelease,
              selectedBlocksDidChange: this.props.selectedBlocksDidChange,
            });

          return React.default.createElement(
            module12.View,
            {
              style: [
                U.customModeView,
                {
                  backgroundColor: o.modeSetCardBackgroundColor,
                },
              ],
            },
            !(p || M) &&
              !c &&
              module381.RSM.mapSaveEnabled &&
              React.default.createElement(module385.TopImageButton, {
                funcId: 'custom_mode_panel_top_btn',
                title: module500.multi_floor_edit,
                textColor: o.buttonTextColor,
                selectedTextColor: o.buttonTextSelectedColor,
                textTop: 4,
                imageWidth: 30,
                imageHeight: 30,
                fontSize: 12,
                enabled: true,
                onPress: this.gotoCustomModePage.bind(this),
                image: o.customModeEditIcon,
                style: U.customModeEditIcon,
              }),
            !n || c || p || M ? C : _,
            React.default.createElement(
              module12.Text,
              module22.default({}, module391.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  U.bottomTip,
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
                U.customModeView,
                {
                  backgroundColor: t.modeSetCardBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.ImageBackground, {
              source: require('./1506'),
              style: [
                U.noCustomShowView,
                {
                  marginTop: 20,
                },
              ],
            }),
            React.default.createElement(
              module12.Text,
              module22.default({}, module391.default.getAccessibilityLabel('custom_mode_panel_top_tip'), {
                style: [
                  U.bottom,
                  {
                    color: t.enableSubTitleColor,
                    marginTop: 20,
                  },
                ],
              }),
              module500.custom_mode_clean_dogged_dirty_tip
            )
          );
        },
      },
      {
        key: 'getCurrentTab',
        value: function () {
          var t = this.state.isCustomMode ? 1 : this.state.isDoggeDirtyMode ? 2 : 0;
          if (module390.default.isPureCleanMopSupported())
            this.waterMode == module1326.WaterModeZero ? (t = 2) : this.cleanMode == module1326.CleanModeZero ? (t = 1) : this.state.isCustomMode && (t = 3);
          return t;
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            o = this,
            n = this.context.theme.ModeSettingPanel,
            l = this.props,
            u = l.onPressMore,
            p = l.shouldShowCustomSwitch,
            h = l.isInHomePage,
            M = l.isInMapEditPage,
            c = l.parent,
            v = this.state,
            I = v.shouldShowCleanModeView,
            P = v.shouldShowMopMethodView,
            E = v.shouldShowWaterModeView,
            W = h && module390.default.isSoftCleanModeSupportedInMain() ? 0 : 1,
            T = module1326.CleanModes().slice(W, module1326.CleanModes().length);
          if (module390.default.isMaxPlusModeSupported()) T.pop();
          this.animatedMarginBottom.interpolate({
            inputRange: [-200, 0],
            outputRange: [0, 1],
          });
          var G = module390.default.isElectronicWaterBoxSupported() || module390.default.isShakeMopStrengthSupported(),
            j = module390.default.isCustomModeSupported() && p,
            A = !this.state.isCustomMode && this.state.cleanModeSwitcherEnabled,
            z = (!this.state.isCustomMode && this.state.waterModeSwitcherEnabled) || M,
            Z = (this.state.mopMethodSwitcherEnabled && !this.state.isCustomMode) || M,
            q = module390.default.isMaxPlusModeSupported() && 2 == this.getCurrentTab();
          if (!h) console.log('mopModeEnabled', this.state.mopMethodSwitcherEnabled, !this.state.isCustomMode);
          var F,
            J = React.default.createElement(
              module12.View,
              null,
              I &&
                React.default.createElement(
                  module12.View,
                  null,
                  React.default.createElement(module384.default, {
                    funcId: 'clean_mode_set_view_',
                    ref: function (t) {
                      o.cleanModeSetView = t;
                    },
                    style: {
                      marginHorizontal: 20,
                      marginTop: 5,
                      marginBottom: G && !q ? 15 : 0,
                    },
                    title: module500.localization_strings_Setting_CleanModePage_5,
                    items: T,
                    enabled: A,
                    addonTip: A && this.props.isInHomePage && module390.default.isSoftCleanModeSupportedInMain() ? module500.effect_only_once_tip : null,
                    isInHomePage: h,
                    onPressButton: this.onPressCleanMode.bind(this),
                  }),
                  q &&
                    React.default.createElement(
                      module12.View,
                      {
                        style: {
                          marginHorizontal: 20,
                          marginTop: -6,
                        },
                      },
                      React.default.createElement(module12.View, {
                        style: {
                          height: 0.6,
                          marginHorizontal: 20,
                          backgroundColor: n.splitLineColor,
                        },
                      }),
                      React.default.createElement(module385.SettingListItemView, {
                        title: module500.clean_mode_max_plus,
                        bottomDetail: module500.mode_setting_panel_max_plus_desc,
                        style: {
                          borderRadius: 8,
                          backgroundColor: n.modeSetCardBackgroundColor,
                        },
                        shouldShowBottomLine: false,
                        shouldShowSwitch: true,
                        switchOn: 108 == this.cleanMode,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 80,
                        switchValueChanged: this.onMaxModeChanged.bind(this),
                      })
                    )
                ),
              G &&
                E &&
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      backgroundColor: n.modeSetCardBackgroundColor,
                      marginHorizontal: 20,
                      paddingBottom: module422.DMM.isGarnet ? 0 : 10,
                      borderRadius: 12,
                    },
                  },
                  G &&
                    !module422.DMM.isGarnet &&
                    E &&
                    React.default.createElement(module384.default, {
                      funcId: 'water_mode_set_view_',
                      ref: function (t) {
                        o.waterModeSetView = t;
                      },
                      style: {
                        marginBottom: -10,
                      },
                      tip: this.state.waterSettingTip,
                      submode:
                        207 == (null == this ? undefined : null == (t = this.waterModeSetView) ? undefined : t.value)
                          ? this.getCustomWaterModeText(this.state.waterBoxDistance || module381.RSM.waterBoxDistance)
                          : null,
                      title: module390.default.isShakeMopStrengthSupported() ? module500.custom_water_tanos_mode_title : module500.custom_water_mode_title,
                      items: ((F = module1326.MopWaterOrStrengths()), module390.default.isPureCleanMopSupported() && F.shift(), F),
                      enabled: z,
                      isInHomePage: h,
                      addonTip: module390.default.isPureCleanMopSupported()
                        ? null
                        : z && module381.RSM.isWaterBoxIn && o.props.isInHomePage
                        ? module500.effect_only_once_tip
                        : o.props.isInMapEditPage && !module390.default.isShakeMopSetSupported()
                        ? module500.zero_water_will_be_first_short
                        : null,
                      onPressButton: this.onPressWateMode.bind(this),
                    }),
                  module390.default.isCustomWaterBoxDistanceSupported() &&
                    207 == module381.RSM.waterBoxMode &&
                    h &&
                    React.default.createElement(module1504.SliderAdjuster, {
                      title: null,
                      style: {
                        backgroundColor: 'transparent',
                      },
                      sliderWidth: module12.Dimensions.get('window').width - 80,
                      minValue: 60,
                      maxValue: 205,
                      step: 5,
                      value: this.state.visualWaterBoxDistance,
                      circleValue: (o.state.visualWaterBoxDistance - 60) / 5 + 1,
                      shouldShowSideValue: false,
                      shouldShowValue: true,
                      showValue: null,
                      desc: null,
                      onSlidingMove: function (t) {
                        o.setState({
                          visualWaterBoxDistance: t,
                          waterBoxDistance: 265 - t,
                        });
                      },
                      onSlidingComplete: function (t) {
                        var o;
                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  n.prev = 0;
                                  n.next = 3;
                                  return regeneratorRuntime.default.awrap(module414.default.setWaterBoxDistance(265 - t));

                                case 3:
                                  o = n.sent;
                                  module381.RSM.waterBoxDistance = 265 - t;
                                  console.log('set custom water', o);
                                  n.next = 11;
                                  break;

                                case 8:
                                  n.prev = 8;
                                  n.t0 = n.catch(0);
                                  console.log('set custom water error', 265 - t, n.t0);

                                case 11:
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
                    }),
                  module390.default.isShakeMopSetSupported() &&
                    !module422.DMM.isGarnet &&
                    P &&
                    React.default.createElement(
                      module12.View,
                      null,
                      React.default.createElement(module12.View, {
                        style: {
                          marginTop: 10,
                          height: 0.6,
                          marginHorizontal: 20,
                          backgroundColor: n.splitLineColor,
                        },
                      }),
                      React.default.createElement(module1325.default, {
                        ref: function (t) {
                          o.mopModeSetView = t;
                        },
                        style: {
                          marginBottom: 20,
                          marginHorizontal: 20,
                        },
                        title: module500.tanos_s_mop_mode,
                        items: module1326.MopMethods(),
                        enabled: Z,
                        addonTip:
                          !Z || (module390.default.isPureCleanMopSupported() && this.cleanMode == module1326.CleanModeZero)
                            ? null
                            : module500.custom_mode_panel_mop_method2_red_tip,
                        isRedAddonTip: true,
                        isInHomePage: h,
                        shouldShowQuestionIcon: h,
                        onPressButton: this.onPressMopMode.bind(this),
                        onPressQuestion: this.props.onPressQuestion,
                      })
                    ),
                  module422.DMM.isGarnet &&
                    React.default.createElement(module1502.CustomMopModeView, {
                      currentMopId: this.mopModeId,
                      items: module1328.ModeDataInstance.modePannelCustomMops,
                      onPressMore: function () {
                        o.removeBackListeners();
                        if (u) u();
                      },
                      shouldCallRpc: h,
                      didSelectMopMode: function (t) {
                        o.mopModeConfig = t;
                        o.mopModeId = t.id;
                        o.lastMopId = o.mopModeId;
                      },
                    })
                )
            ),
            Q = module422.DMM.isGarnet && h && ((null == c ? undefined : c.tabIndex) == module1493.TabZone || (null == c ? undefined : c.tabIndex) == module1493.TabSegment),
            X = module390.default.isPureCleanMopSupported()
              ? [module500.robot_status_clean_mop_mode, module500.robot_clean_status_only_mop, module500.robot_clean_status_only_clean]
              : [module500.custom_mode_panel_tab_general];
          if (j) X.push(module390.default.isPureCleanMopSupported() ? module500.localization_strings_Common_custom_mode : module500.map_edit_bottom_menu_mode);
          if (Q) X.push(module500.custom_mode_panel_tab_clean_strong_dirty);
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
                o.hide();
              },
            },
            React.default.createElement(
              module1322.default,
              {
                onClose: function () {
                  o.hide();
                },
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    U.wrap,
                    {
                      bottom: this.animatedMarginBottom,
                      backgroundColor: n.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module1322.SwipeDownIndicator, {
                  style: {
                    marginBottom: 10,
                  },
                }),
                (!M || module390.default.isPureCleanMopSupported()) &&
                  React.default.createElement(module1503.default, {
                    tabs: X,
                    current: this.getCurrentTab(),
                    tabWillChange: this.modeTabWillChange.bind(this),
                    onPressTab: this.modeTabDidChange.bind(this),
                  }),
                M ? J : this.state.isCustomMode ? this.getCustomModeView() : this.state.isDoggeDirtyMode ? this.getDoggedDirtyView() : J,
                module391.default.isIphoneX() &&
                  React.default.createElement(module12.View, {
                    style: [
                      U.whilteSplitView,
                      {
                        backgroundColor: n.backgroundColor,
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
          if (module422.DMM.isGarnet && 2 == t && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
            this.showToast(module500.select_dogged_dirty_mop_mode_when_running_tip);
            return false;
          }

          module390.default.isPureCleanMopSupported();
          return true;
        },
      },
      {
        key: 'modeTabDidChange',
        value: function (t) {
          var o, module50;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    o = this.props;
                    module50 = o.tabModeDidChange;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(this.handleModeTabDidChange(t));

                  case 3:
                    if (module50) module50();

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
          module1157.default.shared().enableBackAndMore();

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
        value: function (t, o, n) {
          var l,
            u,
            p,
            h,
            M,
            c,
            S,
            f,
            C,
            b,
            v,
            y,
            P,
            E,
            R,
            B = this;
          return regeneratorRuntime.default.async(
            function (T) {
              for (;;)
                switch ((T.prev = T.next)) {
                  case 0:
                    if (
                      (module1157.default.shared().disableBackAndMore(),
                      module390.default.isCustomWaterBoxDistanceSupported() &&
                        ((this.state.waterBoxDistance = module381.RSM.waterBoxDistance || 205), (this.state.visualWaterBoxDistance = 265 - this.state.waterBoxDistance)),
                      (l = this.props),
                      (u = l.isTimerPage),
                      (p = l.isInMapEditPage),
                      (h = l.isInHomePage),
                      (M = l.isSmartScene),
                      (c = t || module381.RSM.fanPower),
                      module390.default.isSoftCleanModeSupportedInMain() || 105 != c || module390.default.isPureCleanMopSupported())
                    ) {
                      T.next = 10;
                      break;
                    }

                    if (((c = 102), (T.t0 = h), !T.t0)) {
                      T.next = 10;
                      break;
                    }

                    T.next = 10;
                    return regeneratorRuntime.default.awrap(module414.default.setCustomMode(c));

                  case 10:
                    if (
                      ((S = o || module381.RSM.waterBoxMode),
                      (f = n || (module422.DMM.isGarnet ? module381.RSM.mopModeId : module381.RSM.mopMode)),
                      (this.cleanMode = c),
                      (this.waterMode = S),
                      (this.mopMode = f),
                      module422.DMM.isGarnet &&
                        ((this.mopModeId = n || (h ? module381.RSM.mopModeId : null == (C = module1328.ModeDataInstance.modePannelCustomMops[0]) ? undefined : C.id)),
                        (this.mopModeConfig = module1328.ModeDataInstance.getCustomMopModeConfigById(this.mopModeId))),
                      (b = module1326.isModeCustomized(c, S, f) && !p),
                      (v = module422.DMM.isGarnet && h && 4 == this.mopModeId),
                      (y = module390.default.isPureCleanMopSupported() && c == module1326.CleanModeZero),
                      (P = module390.default.isPureCleanMopSupported() && S == module1326.WaterModeZero),
                      module390.default.isPureCleanMopSupported()
                        ? ((E = S != module1326.WaterModeZero && c != module1326.CleanModeZero),
                          (R = 0),
                          y ? (R = 1) : P ? (R = 2) : b && (R = 3),
                          (this.state.shouldShowCleanModeView = E || P),
                          (this.state.shouldShowWaterModeView = E || y),
                          (this.state.shouldShowMopMethodView = y),
                          (module394.MC.customTabIndex = R))
                        : (module394.MC.customTabIndex = b ? 1 : v ? 2 : 0),
                      !b || module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments || !h)
                    ) {
                      T.next = 32;
                      break;
                    }

                    if (c == module1326.CustomCleanMode) c = module1326.CleanModes()[2].strength;
                    if (S == module1326.CustomWaterMode) S = module1326.MopWaterOrStrengths()[2].strength;
                    if (f == module1326.CustomMopMode) f = module1326.MopMethods()[0].strength;
                    if (this.props.didSetMode) this.props.didSetMode(c, S, f, false);
                    T.next = 28;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.CleanMode, c + ''));

                  case 28:
                    T.next = 30;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.WaterMode, S + ''));

                  case 30:
                    T.next = 32;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.MopMode, f + ''));

                  case 32:
                    this.setState(
                      {
                        shouldShow: true,
                        isCustomMode: b,
                        mopMethodSwitcherEnabled: this.isMopModeEnabled(S),
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(f),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(c, S, f),
                      },
                      function () {
                        if (B.cleanModeSetView) B.cleanModeSetView.setMode(c, module1326.CustomCleanMode);
                        if (B.waterModeSetView) B.waterModeSetView.setMode(S, module1326.CustomWaterMode);
                        if (!module422.DMM.isGarnet) B.mopModeSetView && B.mopModeSetView.setMode(f, u || p || M ? 0 : 301);
                        B.updateMapWithCustomMode();
                        module12.Animated.timing(B.animatedMarginBottom, {
                          toValue: 0,
                          duration: 250,
                        }).start();
                        B.forceUpdate();
                      }
                    );
                    this.addBackListener();

                  case 34:
                  case 'end':
                    return T.stop();
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
          if (this.mapView) this.mapView.setState(z({}, module1329.MM.mapData));
          if (this.mapView) this.mapView.setAllCleanMopMode(module1329.MM.customCleanModes);
        },
      },
      {
        key: 'setCleanWaterMode',
        value: function (t, o, n) {
          if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1326.CustomCleanMode);
          if (this.waterModeSetView) this.waterModeSetView.setMode(o, module1326.CustomWaterMode);
          if (this.mopModeSetView) this.mopModeSetView.setMode(n, 301);
        },
      },
      {
        key: 'modeDidChange',
        value: function () {
          var t, o, n, l, u, p, h;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    u = this.cleanMode || (null == this ? undefined : null == (t = this.cleanModeSetView) ? undefined : t.value);
                    p = (null == this ? undefined : null == (o = this.waterModeSetView) ? undefined : o.value) || this.waterMode;
                    h = (null == this ? undefined : null == (n = this.mopModeSetView) ? undefined : n.value) || this.mopMode;
                    console.log('CustomCleanWaterModeView  cleanMode - ' + u + ' , waterMode - ' + p + ' , mopMode - ' + h);
                    if (!(null == (l = this.props) || null == l.didSetMode)) l.didSetMode(u, p, module422.DMM.isGarnet ? this.mopModeConfig : h);

                  case 5:
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
          if (t >= 60 && t <= 70) o = module500.mode_setting_panel_custom_water_box_1;
          else if (75 == t) o = module500.mode_setting_panel_custom_water_box_2;
          else if (t >= 80 && t <= 125) o = module500.mode_setting_panel_custom_water_box_3;
          else if (130 == t) o = module500.mode_setting_panel_custom_water_box_4;
          else if (t >= 135 && t <= 170) o = module500.mode_setting_panel_custom_water_box_5;
          else if (175 == t) o = module500.mode_setting_panel_custom_water_box_6;
          else if (t >= 180 && t <= 205) o = module500.mode_setting_panel_custom_water_box_7;
          return o;
        },
      },
      {
        key: 'waterModeSettingTip',
        value: function () {
          if (module390.default.isShakeMopStrengthSupported())
            return module422.DMM.isGarnet
              ? null
              : !module381.RSM.isWaterBoxIn && this.props.isInHomePage
              ? module500.water_box_not_installed_tip_tanos
              : !module381.RSM.isWaterBoxCarriageIn && this.props.isInHomePage
              ? module500.water_box_not_installed_tip
              : module381.RSM.waterShortageStatus && this.props.isInHomePage
              ? module500.tanos_s_water_shortage
              : null;
          else return module390.default.isElectronicWaterBoxSupported() && !module381.RSM.isWaterBoxIn && this.props.isInHomePage ? module500.water_box_not_installed_tip : null;
        },
      },
      {
        key: 'onPressCleanMode',
        value: function (t, o) {
          var module50, l, u, p, h, M;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (((this.cleanMode = o), this.modeDidChange(), this.props.isInHomePage)) {
                      c.next = 4;
                      break;
                    }

                    return c.abrupt('return');

                  case 4:
                    if (105 == o && this.props.parent) this.props.parent.onPressMopModeItem();
                    module50 = this.waterModeSetView ? this.waterModeSetView.value : undefined;
                    c.prev = 6;
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module414.default.setCustomMode(o));

                  case 9:
                    if (
                      (c.sent,
                      (module381.RSM.fanPower = o),
                      (null == (l = this.props.parent) ? undefined : l.sidebarMenu) &&
                        (null == (u = this.props.parent) || null == (p = u.sidebarMenu) || p.updateModeIcon(o, module50, module381.RSM.mopMode)),
                      null == (h = (M = this.props).onModeChange) || h.call(M, o, module50, module381.RSM.mopMode),
                      console.log('set mode rpc success,  cleanMode- ' + o),
                      module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module418.EventKeys.CleanWaterModeDidChange,
                      }),
                      (c.t0 = 108 != o),
                      !c.t0)
                    ) {
                      c.next = 19;
                      break;
                    }

                    c.next = 19;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.CleanMode, o + ''));

                  case 19:
                    c.next = 27;
                    break;

                  case 21:
                    c.prev = 21;
                    c.t1 = c.catch(6);
                    console.log('setCustomMode  error: ' + ('object' == typeof c.t1 ? JSON.stringify(c.t1) : c.t1));
                    this.showToast(module500.robot_communication_exception);
                    this.cleanMode = t;
                    if (this.cleanModeSetView) this.cleanModeSetView.setMode(t, module1326.CustomCleanMode);

                  case 27:
                  case 'end':
                    return c.stop();
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(this.onPressCleanMode(this.cleanMode, t ? 108 : 102));

                  case 2:
                    this.setState({
                      cleanModeSwitcherEnabled: !t,
                    });
                    if (!(null == (o = this.cleanModeSetView))) o.setMode(this.cleanMode, t ? 108 : 102);

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
        key: 'onPressWateMode',
        value: function (t, o) {
          var n, l, u, p, h, M;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((n = this.mopModeSetView && this.mopModeSetView.value),
                      module390.default.isShakeMopSetSupported() &&
                        (this.setState({
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(o),
                        }),
                        200 == o &&
                          301 == n &&
                          (this.setState({
                            cleanModeSwitcherEnabled: true,
                          }),
                          this.mopModeSetView && this.mopModeSetView.setMode(300, 301))),
                      this.modeDidChange(),
                      this.forceUpdate(),
                      this.props.isInHomePage)
                    ) {
                      c.next = 6;
                      break;
                    }

                    return c.abrupt('return');

                  case 6:
                    if (
                      ((l = this.cleanModeSetView ? this.cleanModeSetView.value : module381.RSM.fanPower),
                      (c.prev = 7),
                      (this.isRequesting = true),
                      !module390.default.isShakeMopSetSupported())
                    ) {
                      c.next = 22;
                      break;
                    }

                    if (200 != o || 301 != n) {
                      c.next = 18;
                      break;
                    }

                    c.next = 13;
                    return regeneratorRuntime.default.awrap(module414.default.setCleanMopMode(module381.RSM.fanPower, o, 300));

                  case 13:
                    module381.RSM.mopMode = 300;
                    c.next = 16;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.MopMode, '300'));

                  case 16:
                    c.next = 20;
                    break;

                  case 18:
                    c.next = 20;
                    return regeneratorRuntime.default.awrap(module414.default.setWaterBoxMode(o));

                  case 20:
                    c.next = 24;
                    break;

                  case 22:
                    c.next = 24;
                    return regeneratorRuntime.default.awrap(module414.default.setWaterBoxMode(o));

                  case 24:
                    this.isRequesting = false;
                    module381.RSM.waterBoxMode = o;
                    this.forceUpdate();
                    if (null == (u = this.props.parent) ? undefined : u.sidebarMenu) null == (p = this.props.parent) || p.sidebarMenu.updateModeIcon(l, o, module381.RSM.mopMode);
                    if (!(null == (h = (M = this.props).onModeChange))) h.call(M, l, o, module381.RSM.mopMode);
                    console.log('set mode rpc success,  waterBoxMode- ' + o);
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanWaterModeDidChange,
                    });
                    c.next = 33;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.WaterMode, o + ''));

                  case 33:
                    c.next = 41;
                    break;

                  case 35:
                    c.prev = 35;
                    c.t0 = c.catch(7);
                    this.isRequesting = false;
                    console.log('setCustomMode  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    this.showToast(module500.robot_communication_exception);
                    if (this.waterModeSetView) this.waterModeSetView.setMode(t, module1326.CustomWaterMode);

                  case 41:
                  case 'end':
                    return c.stop();
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
          var n, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      (this.modeDidChange(),
                      (n = this.cleanModeSetView && this.cleanModeSetView.value),
                      (l = this.waterModeSetView && this.waterModeSetView.value),
                      this.setState({
                        cleanModeSwitcherEnabled: this.isCleanModeEnabled(o),
                        waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(n, l, o),
                      }),
                      this.props.isInHomePage)
                    ) {
                      u.next = 6;
                      break;
                    }

                    return u.abrupt('return');

                  case 6:
                    if (301 == o && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog(o);
                    if (303 == o && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog(o);
                    u.prev = 8;
                    this.isRequesting = true;
                    u.next = 12;
                    return regeneratorRuntime.default.awrap(module414.default.setMopMode(o));

                  case 12:
                    this.isRequesting = false;
                    module381.RSM.mopMode = o;
                    if (301 == o && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog(o);
                    if (303 == o && this.props.onShowCleanModeDialog) this.props.onShowCleanModeDialog(o);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(o, 301);
                    u.next = 20;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.MopMode, o + ''));

                  case 20:
                    u.next = 28;
                    break;

                  case 22:
                    u.prev = 22;
                    u.t0 = u.catch(8);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                    this.showToast(module500.robot_communication_exception);
                    if (this.mopModeSetView) this.mopModeSetView.setMode(t, 301);

                  case 28:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[8, 22]],
            Promise
          );
        },
      },
      {
        key: 'handleModeTabDidChange',
        value: function (t) {
          var o,
            n,
            l,
            u,
            p,
            h,
            M,
            c,
            S,
            f,
            C,
            b,
            v,
            y,
            P,
            E,
            R,
            B,
            W,
            H,
            O,
            L,
            G = this;
          return regeneratorRuntime.default.async(
            function (j) {
              for (;;)
                switch ((j.prev = j.next)) {
                  case 0:
                    if (
                      ((o = this.props),
                      (n = o.isInHomePage),
                      (l = o.parent),
                      (u = o.onModeChange),
                      (p = 0 == t),
                      (h = module390.default.isPureCleanMopSupported() ? 3 == t : 1 == t),
                      (M = module390.default.isPureCleanMopSupported() && 1 == t),
                      (c = module390.default.isPureCleanMopSupported() && 2 == t),
                      (S = !module390.default.isPureCleanMopSupported() && 2 == t),
                      !h)
                    ) {
                      j.next = 10;
                      break;
                    }

                    j.t0 = module1326.CustomCleanMode;
                    j.next = 18;
                    break;

                  case 10:
                    j.t1 = parseInt;
                    j.next = 13;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.CleanMode));

                  case 13:
                    if (((j.t2 = j.sent), j.t2)) {
                      j.next = 16;
                      break;
                    }

                    j.t2 = 101;

                  case 16:
                    j.t3 = j.t2;
                    j.t0 = j.t1(j.t3);

                  case 18:
                    if (((f = j.t0), !h)) {
                      j.next = 23;
                      break;
                    }

                    j.t4 = module1326.CustomWaterMode;
                    j.next = 31;
                    break;

                  case 23:
                    j.t5 = parseInt;
                    j.next = 26;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.WaterMode));

                  case 26:
                    if (((j.t6 = j.sent), j.t6)) {
                      j.next = 29;
                      break;
                    }

                    j.t6 = 201;

                  case 29:
                    j.t7 = j.t6;
                    j.t4 = j.t5(j.t7);

                  case 31:
                    if (((C = j.t4), !h)) {
                      j.next = 36;
                      break;
                    }

                    j.t8 = module1326.CustomMopMode;
                    j.next = 44;
                    break;

                  case 36:
                    j.t9 = parseInt;
                    j.next = 39;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.MopMode));

                  case 39:
                    if (((j.t10 = j.sent), j.t10)) {
                      j.next = 42;
                      break;
                    }

                    j.t10 = 300;

                  case 42:
                    j.t11 = j.t10;
                    j.t8 = j.t9(j.t11);

                  case 44:
                    if (
                      ((b = j.t8),
                      module390.default.isPureCleanMopSupported() &&
                        (c
                          ? ((C = module1326.WaterModeZero),
                            (b = 300),
                            (this.state.shouldShowCleanModeView = true),
                            (this.state.shouldShowWaterModeView = false),
                            (this.state.shouldShowMopMethodView = false))
                          : M
                          ? ((f = module1326.CleanModeZero),
                            (this.state.shouldShowCleanModeView = false),
                            (this.state.shouldShowWaterModeView = true),
                            (this.state.shouldShowMopMethodView = true))
                          : p &&
                            ((b = 300),
                            108 == f && ((f = 102), this.cleanModeSetView && (this.cleanModeSetView.state.current = 1)),
                            (this.state.shouldShowCleanModeView = true),
                            (this.state.shouldShowWaterModeView = true),
                            (this.state.shouldShowMopMethodView = false))),
                      module422.DMM.isGarnet &&
                        (p
                          ? ((this.mopModeId = this.lastMopId || (null == (v = module1328.ModeDataInstance.modePannelCustomMops[0]) ? undefined : v.id)),
                            (this.lastMopId = this.mopModeId))
                          : h
                          ? (this.mopModeId = 0)
                          : S && (this.mopModeId = 4),
                        (b = this.mopModeId)),
                      (j.prev = 47),
                      (this.cleanMode = f),
                      (this.waterMode = C),
                      (this.mopMode = b),
                      this.setState(
                        {
                          isCustomMode: h,
                          isDoggeDirtyMode: S,
                          mopMethodSwitcherEnabled: this.isMopModeEnabled(C),
                          cleanModeSwitcherEnabled: this.isCleanModeEnabled(b),
                          waterModeSwitcherEnabled: this.waterModeSwitcherEnabled(f, C, b),
                        },
                        function () {
                          if (h) G.updateMapWithCustomMode();
                          if (p && module390.default.isPureCleanMopSupported() && 104 == f)
                            null == G ||
                              G.cleanModeSetView.setState({
                                current: 3,
                              });
                        }
                      ),
                      null == (y = this.cleanModeSetView) || y.setMode(f),
                      null == (P = this.waterModeSetView) || P.setMode(C),
                      null == (E = this.mopModeSetView) || E.setMode(b, 301),
                      this.modeDidChange(),
                      n)
                    ) {
                      j.next = 58;
                      break;
                    }

                    return j.abrupt('return');

                  case 58:
                    if (!module390.default.isShakeMopSetSupported()) {
                      j.next = 63;
                      break;
                    }

                    j.next = 61;
                    return regeneratorRuntime.default.awrap(module414.default.setCleanMopMode(f, C, b, module422.DMM.isGarnet));

                  case 61:
                    j.next = 72;
                    break;

                  case 63:
                    if (!module381.RSM.isSupportFeature(118)) {
                      j.next = 68;
                      break;
                    }

                    j.next = 66;
                    return regeneratorRuntime.default.awrap(module414.default.setCleanMotorMode(f, C));

                  case 66:
                    j.next = 72;
                    break;

                  case 68:
                    j.next = 70;
                    return regeneratorRuntime.default.awrap(module414.default.setCustomMode(f));

                  case 70:
                    j.next = 72;
                    return regeneratorRuntime.default.awrap(module414.default.setWaterBoxMode(C));

                  case 72:
                    this.isRequesting = false;
                    module381.RSM.fanPower = f;
                    module381.RSM.waterBoxMode = C;
                    module381.RSM.mopMode = b;
                    module381.RSM.mopModeId = this.mopModeId;
                    if (n) null == l || null == (R = l.sidebarMenu) || R.updateModeIcon(f, C, b);
                    if (u) u(f, C, b);
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanWaterModeDidChange,
                    });
                    B = b
                      ? {
                          mopMode: b,
                        }
                      : {};
                    module387.LogEventStatus(
                      'custom_mode_value',
                      z(
                        {
                          cleanMode: f,
                          waterMode: C,
                        },
                        B
                      )
                    );
                    this.forceUpdate();
                    j.next = 94;
                    break;

                  case 85:
                    j.prev = 85;
                    j.t12 = j.catch(47);
                    this.isRequesting = false;
                    console.log('setMopMode  error: ' + ('object' == typeof j.t12 ? JSON.stringify(j.t12) : j.t12));
                    this.showToast(module500.robot_communication_exception);
                    if (!(null == (W = this.cleanModeSetView))) W.setMode(module381.RSM.fanPower);
                    if (!(null == (H = this.waterModeSetView))) H.setMode(module381.RSM.waterBoxMode);
                    if (!(null == (O = this.mopModeSetView))) O.setMode(module381.RSM.mopMode, 301);
                    this.setState({
                      isCustomMode: !h,
                      isDoggeDirtyMode: !S,
                    });

                  case 94:
                    L = b
                      ? {
                          mopMode: b,
                        }
                      : {};
                    module387.LogEventStatus(
                      'custom_mode_switch',
                      z(
                        {
                          on: h,
                          cleanMode: f,
                          waterMode: C,
                        },
                        L
                      )
                    );

                  case 96:
                  case 'end':
                    return j.stop();
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

          if (module390.default.isSupportCustomModeInCleaning() || !module381.RSM.isRunning) {
            if (!(null == (t = (o = this.props).onPressCustomModePage))) t.call(o);
            this.hide();
          } else
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              n.showToast(module500.robot_communication_exception);
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
            !!module422.DMM.isGarnet ||
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
          return !(module1326.isModeCustomized(t, o, n) && !this.props.isSmartScene);
        },
      },
    ]);
    return A;
  })(React.default.Component);

exports.default = module1506;
module1506.contextType = module515.AppConfigContext;
module1506.defaultProps = {
  shouldShowCustomSwitch: true,
  isInHomePage: false,
  isInMapEditPage: false,
  isTimerPage: false,
  isSmartScene: false,
};
var U = module12.StyleSheet.create({
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
    height: (module422.DMM.isGarnet, 380),
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  bottomTip: {
    marginTop: 30,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  noCustomShowView: {
    width: 270,
    height: 188,
  },
});
