var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module377 = require('./377'),
  module381 = require('./381'),
  module407 = require('./407'),
  module1229 = require('./1229'),
  module386 = require('./386'),
  module506 = require('./506'),
  module1241 = require('./1241'),
  module383 = require('./383'),
  module1259 = require('./1259');

function x() {
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
  module1247 = require('./1247'),
  T = module12.Dimensions.get('window').width,
  C = (function (t) {
    module7.default(I, t);

    var module506 = I,
      C = x(),
      A = function () {
        var t,
          n = module11.default(module506);

        if (C) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var n;
      module4.default(this, I);
      (n = A.call(this, t)).state = {
        mapSaveEnabled: module377.RSM.mapSaveEnabled,
        multiFloorEnabled: module377.RSM.multiFloorEnabled,
        smartSwitchEnabled: !module377.RSM.isSwitchMapModeManual,
      };
      return n;
    }

    module5.default(I, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onLeftButtonPress();
            return true;
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavibar();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.navBackgroundColor,
            onPressLeft: this.onLeftButtonPress.bind(this),
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.backListener) this.backListener.remove();
        },
      },
      {
        key: 'changeSwitchStatus',
        value: function (t) {
          var n = this;
          this.setState(
            {
              multiFloorEnabled: t,
            },
            function () {
              n.onSwitchStatusChange();
            }
          );
        },
      },
      {
        key: 'changeSmartSwitchStatus',
        value: function (t) {
          var n = this;
          this.setState(
            {
              smartSwitchEnabled: t,
            },
            function () {
              n.setSwitchMapMode();
            }
          );
        },
      },
      {
        key: 'onSwitchStatusChange',
        value: function () {
          var t,
            n = this;
          if (!(module377.RSM.multiFloorEnabled == this.state.multiFloorEnabled && this.state.smartSwitchEnabled == !module377.RSM.isSwitchMapModeManual))
            1 == this.state.multiFloorEnabled
              ? this.setMultiFloorSwitch(true)
              : (null == (t = this.globalLoadingView) || t.showWithText(),
                module1229.MM.getMultiMaps()
                  .then(function () {
                    if (module1229.MM.maps.length <= 1) n.setMultiFloorSwitch(false);
                    else
                      module1247.setTimeout(function () {
                        return n.mapSavingActionSheet && n.mapSavingActionSheet.show();
                      }, 300);
                  })
                  .catch(function () {
                    globals.showToast(module491.robot_communication_exception);
                  })
                  .finally(function () {
                    var t;
                    if (!(null == (t = n.globalLoadingView))) t.hide();
                  }));
        },
      },
      {
        key: 'onLeftButtonPress',
        value: function () {
          this.props.navigation.pop();
        },
      },
      {
        key: 'saveMapOnSelectedMenu',
        value: function (t) {
          var n = this;
          if (this.mapSavingActionSheet) this.mapSavingActionSheet.hide();
          module1247.setTimeout(function () {
            return n.saveSelectMap(t);
          }, 500);
        },
      },
      {
        key: 'setMultiFloorSwitch',
        value: function (t) {
          var o = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module1259
                      .showFinishCurrentTastAlertIfNeeded()
                      .then(function () {
                        return regeneratorRuntime.default.async(
                          function (l) {
                            for (;;)
                              switch ((l.prev = l.next)) {
                                case 0:
                                  if (
                                    (o.setState({
                                      multiFloorEnabled: t,
                                    }),
                                    module383.LogEventCommon('set_multi_floor_switch', {
                                      on: t,
                                    }),
                                    (l.prev = 2),
                                    !t)
                                  ) {
                                    l.next = 11;
                                    break;
                                  }

                                  if (module377.RSM.multiFloorEnabled) {
                                    l.next = 7;
                                    break;
                                  }

                                  l.next = 7;
                                  return regeneratorRuntime.default.awrap(
                                    module407.default.setLabStatus({
                                      lab_status: 3,
                                    })
                                  );

                                case 7:
                                  module1229.MM.getMultiMaps();
                                  module377.RSM.multiFloorEnabled = true;
                                  l.next = 13;
                                  break;

                                case 11:
                                  module1247.setTimeout(function () {
                                    return o.saveSelectMap(module1229.MM.maps.length >= 1 ? module1229.MM.maps[0].id : -1, 1e3);
                                  });
                                  module377.RSM.multiFloorEnabled = false;

                                case 13:
                                  l.next = 20;
                                  break;

                                case 15:
                                  l.prev = 15;
                                  l.t0 = l.catch(2);
                                  o.setState({
                                    multiFloorEnabled: !t,
                                  });
                                  globals.showToast(module491.robot_communication_exception);
                                  console.log(l.t0);

                                case 20:
                                case 'end':
                                  return l.stop();
                              }
                          },
                          null,
                          null,
                          [[2, 15]],
                          Promise
                        );
                      })
                      .catch(function (t) {
                        globals.showToast(module491.robot_communication_exception);
                      });

                  case 1:
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
        key: 'setSwitchMapMode',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((t.prev = 0), !module386.default.isSupportSetSwitchMapMode() || this.state.smartSwitchEnabled != module377.RSM.isSwitchMapModeManual)) {
                      t.next = 4;
                      break;
                    }

                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setSwitchMapMode(this.state.smartSwitchEnabled ? 0 : 1));

                  case 4:
                    t.next = 10;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);
                    this.setState({
                      smartSwitchEnabled: !this.state.smartSwitchEnabled,
                    });
                    globals.showToast(module491.robot_communication_exception);

                  case 10:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: 'saveSelectMap',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    module383.LogEventCommon('reserve_map', {
                      mapId: t,
                    });
                    module383.LogEventCommon('set_multi_floor_switch', {
                      on: false,
                    });
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setLabStatus({
                        lab_status: 1,
                        reserve_map: t,
                      })
                    );

                  case 5:
                    module1229.MM.getMap(true);
                    module1229.MM.getMultiMaps();
                    this.setState({
                      multiFloorEnabled: false,
                    });
                    module377.RSM.multiFloorEnabled = false;
                    this.callBackForManualMapSave(true);
                    o.next = 16;
                    break;

                  case 12:
                    o.prev = 12;
                    o.t0 = o.catch(0);
                    this.setState({
                      multiFloorEnabled: true,
                    });
                    this.callBackForManualMapSave(false);

                  case 16:
                  case 'end':
                    return o.stop();
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
        key: 'callBackForManualMapSave',
        value: function (t) {
          if (!t) globals.showToast(module491.robot_communication_exception);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            module1973 = React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                module21.default(
                  {
                    style: {
                      alignItems: 'center',
                    },
                    onPress: this.changeSwitchStatus.bind(this, false),
                  },
                  Utils.getAccessibilityLabel('single_floor_item')
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: {
                      width: 100,
                      height: 100,
                    },
                    source: require('./1971'),
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 8,
                        paddingHorizontal: 10,
                      },
                    },
                    React.default.createElement(module12.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./1973') : require('./1972'),
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? n.mainTextColor : '#007AFF',
                        },
                      },
                      module491.single_floor_pattern
                    )
                  )
                )
              )
            ),
            module1973 = React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                module21.default(
                  {
                    onPress: this.changeSwitchStatus.bind(this, true),
                  },
                  Utils.getAccessibilityLabel('multi_floor_item')
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: {
                      width: 100,
                      height: 100,
                    },
                    source: require('./1974'),
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 8,
                        paddingHorizontal: 10,
                      },
                    },
                    React.default.createElement(module12.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./1972') : require('./1973'),
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? '#007AFF' : n.mainTextColor,
                        },
                      },
                      module491.multi_floor_pattern
                    )
                  )
                )
              )
            ),
            c = React.default.createElement(module1241.MapSaveActionSheetView, {
              actionPrefix: 'reserve_map',
              ref: function (n) {
                return (t.mapSavingActionSheet = n);
              },
              handleSaveMap: this.saveMapOnSelectedMenu.bind(this),
              mode: module1241.MapSaveActionSheetMode.KeepMap,
            }),
            u = this.state.multiFloorEnabled
              ? React.default.createElement(
                  module12.View,
                  module21.default({}, Utils.getAccessibilityLabel('multifloor_hint'), {
                    style: {
                      marginLeft: 20,
                      marginTop: 15,
                      width: T - 40,
                    },
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: n.multiFloor.multiFloorSwitchDescColor,
                      },
                    },
                    module491.multi_map_function_description_text_1
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: n.multiFloor.multiFloorSwitchDescColor,
                        marginTop: 5,
                      },
                    },
                    module491.single_floor_save_new_map_tip
                  )
                )
              : React.default.createElement(module12.View, null),
            h = React.default.createElement(
              module12.View,
              {
                style: {
                  marginLeft: 20,
                  marginTop: 20,
                  height: 35,
                  width: T - 40,
                  flexDirection: 'row',
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 2,
                  style: {
                    fontSize: 12,
                    color: n.multiFloor.multiFloorSwitchDescColor,
                  },
                },
                module491.multi_floor_not_support_block_timer
              )
            ),
            p = module386.default.isSupportSetSwitchMapMode() && this.state.multiFloorEnabled,
            module1965 = {
              title: module491.smart_switch_pattern,
              bottomDetail: module491.smart_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? '#007AFF' : 'rgba(0,0,0,0.8)',
              onPress: this.changeSmartSwitchStatus.bind(this, true),
              shouldShowRightArrow: this.state.smartSwitchEnabled,
              rightImgStyle: V.rightImgStyle,
              rightSrc: require('./1965'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              selected: this.state.smartSwitchEnabled,
            },
            module1965 = {
              title: module491.manual_switch_pattern,
              bottomDetail: module491.manual_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? 'rgba(0,0,0,0.8)' : '#007AFF',
              onPress: this.changeSmartSwitchStatus.bind(this, false),
              shouldShowRightArrow: !this.state.smartSwitchEnabled,
              rightImgStyle: V.rightImgStyle,
              rightSrc: require('./1965'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: true,
              selected: !this.state.smartSwitchEnabled,
            },
            _ = React.default.createElement(
              module12.View,
              {
                style: {
                  width: T,
                  marginTop: 20,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    color: n.subTextColor,
                  },
                },
                module491.smart_switch_section_title
              ),
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, module1965, {
                  funcId: 'smart_switch_item',
                  key: 0,
                })
              )
            ),
            y = React.default.createElement(
              module12.View,
              {
                style: {
                  width: T,
                  marginTop: 0,
                },
              },
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, module1965, {
                  funcId: 'manual_switch_item',
                  key: 1,
                })
              )
            ),
            F = React.default.createElement(
              module12.View,
              {
                style: [
                  V.container,
                  {
                    backgroundColor: 'transparent',
                  },
                ],
              },
              React.default.createElement(module381.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'multi_floor_switch_view_loading',
                closeAccessibilityLabelKey: 'multi_floor_switch_view_loading_close',
                ref: function (n) {
                  t.globalLoadingView = n;
                },
                showButton: true,
                onPressCancel: function () {},
              })
            );

          return React.default.createElement(
            module12.ScrollView,
            {
              style: {
                backgroundColor: n.settingBackgroundColor,
                flex: 1,
              },
              contentContainerStyle: {
                paddingBottom: 30,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  backgroundColor: n.componentBackgroundColor,
                  flexDirection: 'row',
                  paddingVertical: 30,
                  marginTop: 20,
                },
              },
              module1973,
              module1973
            ),
            p && _,
            p && y,
            module386.default.isMultiMapSegmentTimerSupported() ? u : h,
            c,
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            F
          );
        },
      },
    ]);
    return I;
  })(React.default.Component);

exports.default = C;
C.contextType = module506.AppConfigContext;
var V = module12.StyleSheet.create({
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -60,
  },
});
