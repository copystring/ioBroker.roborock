var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module385 = require('./385'),
  module415 = require('./415'),
  module414 = require('./414'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module1134 = require('./1134'),
  module387 = require('./387'),
  module1122 = require('./1122');

function k() {
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
  module1340 = require('./1340'),
  L = (function (t) {
    module7.default(I, t);

    var module1121 = I,
      L = k(),
      V = function () {
        var t,
          n = module11.default(module1121);

        if (L) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var n;
      module4.default(this, I);
      (n = V.call(this, t)).state = {
        mapSaveEnabled: module381.RSM.mapSaveEnabled,
        multiFloorEnabled: module381.RSM.multiFloorEnabled,
        smartSwitchEnabled: !module381.RSM.isSwitchMapModeManual,
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
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
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
          if (!(module381.RSM.multiFloorEnabled == this.state.multiFloorEnabled && this.state.smartSwitchEnabled == !module381.RSM.isSwitchMapModeManual))
            1 == this.state.multiFloorEnabled
              ? this.setMultiFloorSwitch(true)
              : (null == (t = this.globalLoadingView) || t.showWithText(),
                module414.MM.getMultiMaps()
                  .then(function () {
                    if (module414.MM.maps.length <= 1) n.setMultiFloorSwitch(false);
                    else
                      module1340.setTimeout(function () {
                        return n.mapSavingActionSheet && n.mapSavingActionSheet.show();
                      }, 300);
                  })
                  .catch(function () {
                    globals.showToast(module505.robot_communication_exception);
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
          module1340.setTimeout(function () {
            return n.saveSelectMap(t);
          }, 500);
        },
      },
      {
        key: 'setMultiFloorSwitch',
        value: function (t) {
          var n = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module1122
                      .showFinishCurrentTastAlertIfNeeded()
                      .then(function () {
                        return regeneratorRuntime.default.async(
                          function (l) {
                            for (;;)
                              switch ((l.prev = l.next)) {
                                case 0:
                                  if (
                                    (n.setState({
                                      multiFloorEnabled: t,
                                    }),
                                    module387.LogEventCommon('set_multi_floor_switch', {
                                      on: t,
                                    }),
                                    (l.prev = 2),
                                    !t)
                                  ) {
                                    l.next = 11;
                                    break;
                                  }

                                  if (module381.RSM.multiFloorEnabled) {
                                    l.next = 7;
                                    break;
                                  }

                                  l.next = 7;
                                  return regeneratorRuntime.default.awrap(
                                    module415.default.setLabStatus({
                                      lab_status: 3,
                                    })
                                  );

                                case 7:
                                  module414.MM.getMultiMaps();
                                  module381.RSM.multiFloorEnabled = true;
                                  l.next = 13;
                                  break;

                                case 11:
                                  module1340.setTimeout(function () {
                                    return n.saveSelectMap(module414.MM.maps.length >= 1 ? module414.MM.maps[0].id : -1, 1e3);
                                  });
                                  module381.RSM.multiFloorEnabled = false;

                                case 13:
                                  l.next = 20;
                                  break;

                                case 15:
                                  l.prev = 15;
                                  l.t0 = l.catch(2);
                                  n.setState({
                                    multiFloorEnabled: !t,
                                  });
                                  globals.showToast(module505.robot_communication_exception);
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
                        globals.showToast(module505.robot_communication_exception);
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
                    if (((t.prev = 0), !module390.default.isSupportSetSwitchMapMode() || this.state.smartSwitchEnabled != module381.RSM.isSwitchMapModeManual)) {
                      t.next = 4;
                      break;
                    }

                    t.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.setSwitchMapMode(this.state.smartSwitchEnabled ? 0 : 1));

                  case 4:
                    t.next = 10;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);
                    this.setState({
                      smartSwitchEnabled: !this.state.smartSwitchEnabled,
                    });
                    globals.showToast(module505.robot_communication_exception);

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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    module387.LogEventCommon('reserve_map', {
                      mapId: t,
                    });
                    module387.LogEventCommon('set_multi_floor_switch', {
                      on: false,
                    });
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module415.default.setLabStatus({
                        lab_status: 1,
                        reserve_map: t,
                      })
                    );

                  case 5:
                    module414.MM.getMap(true);
                    module414.MM.getMultiMaps();
                    this.setState({
                      multiFloorEnabled: false,
                    });
                    module381.RSM.multiFloorEnabled = false;
                    this.callBackForManualMapSave(true);
                    n.next = 16;
                    break;

                  case 12:
                    n.prev = 12;
                    n.t0 = n.catch(0);
                    this.setState({
                      multiFloorEnabled: true,
                    });
                    this.callBackForManualMapSave(false);

                  case 16:
                  case 'end':
                    return n.stop();
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
          if (!t) globals.showToast(module505.robot_communication_exception);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = module12.Dimensions.get('window').width,
            module1995 = React.default.createElement(
              module12.View,
              {
                style: C.floorItem,
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                module22.default(
                  {
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
                      width: 131,
                      height: 87,
                    },
                    source: require('./1993'),
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: C.floorItemSel,
                    },
                    React.default.createElement(module12.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./1995') : require('./1994'),
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? o.mainTextColor : '#007AFF',
                        },
                      },
                      module505.single_floor_pattern
                    )
                  )
                )
              )
            ),
            module1995 = React.default.createElement(
              module12.View,
              {
                style: C.floorItem,
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                module22.default(
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
                      width: 101,
                      height: 87,
                    },
                    source: require('./1996'),
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: C.floorItemSel,
                    },
                    React.default.createElement(module12.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./1994') : require('./1995'),
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? '#007AFF' : o.mainTextColor,
                        },
                      },
                      module505.multi_floor_pattern
                    )
                  )
                )
              )
            ),
            u = React.default.createElement(module1134.MapSaveActionSheetView, {
              actionPrefix: 'reserve_map',
              ref: function (n) {
                return (t.mapSavingActionSheet = n);
              },
              handleSaveMap: this.saveMapOnSelectedMenu.bind(this),
              mode: module1134.MapSaveActionSheetMode.KeepMap,
            }),
            h = this.state.multiFloorEnabled
              ? React.default.createElement(
                  module12.View,
                  module22.default({}, Utils.getAccessibilityLabel('multifloor_hint'), {
                    style: C.segTimeSupport,
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: o.multiFloor.multiFloorSwitchDescColor,
                      },
                    },
                    module505.multi_map_function_description_text_1
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: o.multiFloor.multiFloorSwitchDescColor,
                        marginTop: 5,
                      },
                    },
                    module505.single_floor_save_new_map_tip
                  )
                )
              : React.default.createElement(module12.View, null),
            p = React.default.createElement(
              module12.View,
              {
                style: C.segTimeNoSupport,
              },
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 2,
                  style: {
                    fontSize: 12,
                    color: o.multiFloor.multiFloorSwitchDescColor,
                  },
                },
                module505.multi_floor_not_support_block_timer
              )
            ),
            b = module390.default.isSupportSetSwitchMapMode() && this.state.multiFloorEnabled,
            module1989 = {
              title: module505.smart_switch_pattern,
              bottomDetail: module505.smart_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? '#007AFF' : 'rgba(0,0,0,0.8)',
              onPress: this.changeSmartSwitchStatus.bind(this, true),
              shouldShowRightArrow: this.state.smartSwitchEnabled,
              isDetailCenter: false,
              rightImgStyle: C.rightImgStyle,
              rightSrc: require('./1989'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              selected: this.state.smartSwitchEnabled,
              bottomDetailWidth: l - 90,
            },
            module1989 = {
              title: module505.manual_switch_pattern,
              bottomDetail: module505.manual_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? 'rgba(0,0,0,0.8)' : '#007AFF',
              onPress: this.changeSmartSwitchStatus.bind(this, false),
              shouldShowRightArrow: !this.state.smartSwitchEnabled,
              isDetailCenter: false,
              rightImgStyle: C.rightImgStyle,
              rightSrc: require('./1989'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              selected: !this.state.smartSwitchEnabled,
              bottomDetailWidth: l - 90,
            },
            y = React.default.createElement(
              module12.View,
              {
                style: {
                  alignSelf: 'stretch',
                  marginTop: 0,
                },
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, module1989, {
                  funcId: 'smart_switch_item',
                  key: 0,
                })
              )
            ),
            F = React.default.createElement(
              module12.View,
              {
                style: {
                  alignSelf: 'stretch',
                  marginTop: 0,
                },
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, module1989, {
                  funcId: 'manual_switch_item',
                  key: 1,
                })
              )
            ),
            k = React.default.createElement(
              module12.View,
              {
                style: [
                  C.container,
                  {
                    backgroundColor: 'transparent',
                  },
                ],
              },
              React.default.createElement(module385.CancelableLoadingView, {
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
                backgroundColor: o.settingBackgroundColor,
                flex: 1,
              },
              contentContainerStyle: {
                paddingBottom: 30,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: C.sectionView,
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    backgroundColor: o.componentBackgroundColor,
                    flexDirection: 'row',
                    paddingVertical: 30,
                    marginTop: 20,
                  },
                },
                module1995,
                module1995
              )
            ),
            b &&
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    marginTop: 20,
                    color: o.subTextColor,
                  },
                },
                module505.smart_switch_section_title
              ),
            React.default.createElement(
              module12.View,
              {
                style: C.sectionView,
              },
              b && y,
              b && F
            ),
            module390.default.isMultiMapSegmentTimerSupported() ? h : p,
            u,
            k
          );
        },
      },
    ]);
    return I;
  })(React.default.Component);

exports.default = L;
L.contextType = module1121.AppConfigContext;
var C = module12.StyleSheet.create({
  rightImgStyle: {
    width: 22,
    height: 22,
    transform: [
      {
        rotateY: '0deg',
      },
    ],
  },
  floorItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floorItemSel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 10,
  },
  sectionView: {
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  segTimeSupport: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  segTimeNoSupport: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 35,
    flexDirection: 'row',
  },
});
