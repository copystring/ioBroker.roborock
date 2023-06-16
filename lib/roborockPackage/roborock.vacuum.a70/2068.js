var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module381 = require('./381'),
  module385 = require('./385'),
  module416 = require('./416'),
  module415 = require('./415'),
  module390 = require('./390'),
  module1193 = require('./1193'),
  module1206 = require('./1206'),
  module387 = require('./387'),
  module1194 = require('./1194');

function F() {
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
  module1414 = require('./1414'),
  T = (function (t) {
    module9.default(I, t);

    var module1193 = I,
      T = F(),
      V = function () {
        var t,
          n = module12.default(module1193);

        if (T) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function I(t) {
      var n;
      module6.default(this, I);
      (n = V.call(this, t)).state = {
        mapSaveEnabled: module381.RSM.mapSaveEnabled,
        multiFloorEnabled: module381.RSM.multiFloorEnabled,
        smartSwitchEnabled: !module381.RSM.isSwitchMapModeManual,
      };
      return n;
    }

    module7.default(I, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
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
            n,
            l,
            s = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (module381.RSM.multiFloorEnabled != this.state.multiFloorEnabled || this.state.smartSwitchEnabled != !module381.RSM.isSwitchMapModeManual) {
                      c.next = 2;
                      break;
                    }

                    return c.abrupt('return');

                  case 2:
                    if (1 != this.state.multiFloorEnabled) {
                      c.next = 6;
                      break;
                    }

                    this.setMultiFloorSwitch(true);
                    c.next = 18;
                    break;

                  case 6:
                    if (!(null == (t = this.globalLoadingView))) t.showWithText();
                    c.prev = 7;
                    c.next = 10;
                    return regeneratorRuntime.default.awrap(module415.MM.getMultiMaps());

                  case 10:
                    if (module415.MM.maps.length <= 1) this.setMultiFloorSwitch(false);
                    else {
                      module1414.setTimeout(function () {
                        return s.mapSavingActionSheet && s.mapSavingActionSheet.show();
                      }, 300);
                      if (!(null == (n = this.globalLoadingView))) n.hide();
                    }
                    c.next = 18;
                    break;

                  case 13:
                    c.prev = 13;
                    c.t0 = c.catch(7);
                    this.setState({
                      multiFloorEnabled: true,
                    });
                    globals.showToast(module510.robot_communication_exception);
                    if (!(null == (l = this.globalLoadingView))) l.hide();

                  case 18:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[7, 13]],
            Promise
          );
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
          module1414.setTimeout(function () {
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
                    module1194
                      .showFinishCurrentTastAlertIfNeeded()
                      .then(function () {
                        var l, s;
                        return regeneratorRuntime.default.async(
                          function (c) {
                            for (;;)
                              switch ((c.prev = c.next)) {
                                case 0:
                                  if (
                                    (n.setState({
                                      multiFloorEnabled: t,
                                    }),
                                    module387.LogEventCommon('set_multi_floor_switch', {
                                      on: t,
                                    }),
                                    (c.prev = 2),
                                    !t)
                                  ) {
                                    c.next = 11;
                                    break;
                                  }

                                  if (module381.RSM.multiFloorEnabled) {
                                    c.next = 7;
                                    break;
                                  }

                                  c.next = 7;
                                  return regeneratorRuntime.default.awrap(
                                    module416.default.setLabStatus({
                                      lab_status: 3,
                                    })
                                  );

                                case 7:
                                  module415.MM.getMultiMaps();
                                  module381.RSM.multiFloorEnabled = true;
                                  c.next = 15;
                                  break;

                                case 11:
                                  l = module415.MM.maps.length >= 1 ? module415.MM.maps[0].id : -1;
                                  c.next = 14;
                                  return regeneratorRuntime.default.awrap(n.saveSelectMap(l));

                                case 14:
                                  module381.RSM.multiFloorEnabled = false;

                                case 15:
                                  c.next = 22;
                                  break;

                                case 17:
                                  c.prev = 17;
                                  c.t0 = c.catch(2);
                                  n.setState({
                                    multiFloorEnabled: !t,
                                  });
                                  globals.showToast(module510.robot_communication_exception);
                                  console.log(c.t0);

                                case 22:
                                  c.prev = 22;
                                  if (!(null == (s = n.globalLoadingView))) s.hide();
                                  return c.finish(22);

                                case 25:
                                case 'end':
                                  return c.stop();
                              }
                          },
                          null,
                          null,
                          [[2, 17, 22, 25]],
                          Promise
                        );
                      })
                      .catch(function (o) {
                        var l;
                        n.setState({
                          multiFloorEnabled: !t,
                        });
                        globals.showToast(module510.robot_communication_exception);
                        if (!(null == (l = n.globalLoadingView))) l.hide();
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
                    return regeneratorRuntime.default.awrap(module416.default.setSwitchMapMode(this.state.smartSwitchEnabled ? 0 : 1));

                  case 4:
                    t.next = 10;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);
                    this.setState({
                      smartSwitchEnabled: !this.state.smartSwitchEnabled,
                    });
                    globals.showToast(module510.robot_communication_exception);

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
                      module416.default.setLabStatus({
                        lab_status: 1,
                        reserve_map: t,
                      })
                    );

                  case 5:
                    module415.MM.getMap(true);
                    module415.MM.getMultiMaps();
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
          if (!t) globals.showToast(module510.robot_communication_exception);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = module13.Dimensions.get('window').width,
            module2071 = React.default.createElement(
              module13.View,
              {
                style: C.floorItem,
              },
              React.default.createElement(
                module13.TouchableWithoutFeedback,
                module22.default(
                  {
                    onPress: this.changeSwitchStatus.bind(this, false),
                  },
                  Utils.getAccessibilityLabel('single_floor_item')
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module13.Image, {
                    style: {
                      width: 131,
                      height: 87,
                    },
                    source: require('./2069'),
                  }),
                  React.default.createElement(
                    module13.View,
                    {
                      style: C.floorItemSel,
                    },
                    React.default.createElement(module13.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./2071') : require('./2070'),
                    }),
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? o.mainTextColor : '#007AFF',
                        },
                      },
                      module510.single_floor_pattern
                    )
                  )
                )
              )
            ),
            module2071 = React.default.createElement(
              module13.View,
              {
                style: C.floorItem,
              },
              React.default.createElement(
                module13.TouchableWithoutFeedback,
                module22.default(
                  {
                    onPress: this.changeSwitchStatus.bind(this, true),
                  },
                  Utils.getAccessibilityLabel('multi_floor_item')
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module13.Image, {
                    style: {
                      width: 101,
                      height: 87,
                    },
                    source: require('./2072'),
                  }),
                  React.default.createElement(
                    module13.View,
                    {
                      style: C.floorItemSel,
                    },
                    React.default.createElement(module13.Image, {
                      style: {
                        width: 14,
                        height: 14,
                      },
                      source: this.state.multiFloorEnabled ? require('./2070') : require('./2071'),
                    }),
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          marginLeft: 5,
                          fontSize: 14,
                          color: this.state.multiFloorEnabled ? '#007AFF' : o.mainTextColor,
                        },
                      },
                      module510.multi_floor_pattern
                    )
                  )
                )
              )
            ),
            u = React.default.createElement(module1206.MapSaveActionSheetView, {
              actionPrefix: 'reserve_map',
              ref: function (n) {
                return (t.mapSavingActionSheet = n);
              },
              handleSaveMap: this.saveMapOnSelectedMenu.bind(this),
              mode: module1206.MapSaveActionSheetMode.KeepMap,
            }),
            h = this.state.multiFloorEnabled
              ? React.default.createElement(
                  module13.View,
                  module22.default({}, Utils.getAccessibilityLabel('multifloor_hint'), {
                    style: C.segTimeSupport,
                  }),
                  React.default.createElement(
                    module13.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: o.multiFloor.multiFloorSwitchDescColor,
                      },
                    },
                    module510.multi_map_function_description_text_1
                  ),
                  React.default.createElement(
                    module13.Text,
                    {
                      numberOfLines: 0,
                      style: {
                        fontSize: 12,
                        color: o.multiFloor.multiFloorSwitchDescColor,
                        marginTop: 5,
                      },
                    },
                    module510.single_floor_save_new_map_tip
                  )
                )
              : React.default.createElement(module13.View, null),
            p = React.default.createElement(
              module13.View,
              {
                style: C.segTimeNoSupport,
              },
              React.default.createElement(
                module13.Text,
                {
                  numberOfLines: 2,
                  style: {
                    fontSize: 12,
                    color: o.multiFloor.multiFloorSwitchDescColor,
                  },
                },
                module510.multi_floor_not_support_block_timer
              )
            ),
            b = module390.default.isSupportSetSwitchMapMode() && this.state.multiFloorEnabled,
            module2065 = {
              title: module510.smart_switch_pattern,
              bottomDetail: module510.smart_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? '#007AFF' : 'rgba(0,0,0,0.8)',
              onPress: this.changeSmartSwitchStatus.bind(this, true),
              shouldShowRightArrow: this.state.smartSwitchEnabled,
              isDetailCenter: false,
              rightImgStyle: C.rightImgStyle,
              rightSrc: require('./2065'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              selected: this.state.smartSwitchEnabled,
              bottomDetailWidth: l - 90,
            },
            module2065 = {
              title: module510.manual_switch_pattern,
              bottomDetail: module510.manual_switch_tip,
              fontSize: 16,
              titleColor: this.state.smartSwitchEnabled ? 'rgba(0,0,0,0.8)' : '#007AFF',
              onPress: this.changeSmartSwitchStatus.bind(this, false),
              shouldShowRightArrow: !this.state.smartSwitchEnabled,
              isDetailCenter: false,
              rightImgStyle: C.rightImgStyle,
              rightSrc: require('./2065'),
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              selected: !this.state.smartSwitchEnabled,
              bottomDetailWidth: l - 90,
            },
            y = React.default.createElement(
              module13.View,
              {
                style: {
                  alignSelf: 'stretch',
                  marginTop: 0,
                },
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, module2065, {
                  funcId: 'smart_switch_item',
                  key: 0,
                })
              )
            ),
            x = React.default.createElement(
              module13.View,
              {
                style: {
                  alignSelf: 'stretch',
                  marginTop: 0,
                },
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, module2065, {
                  funcId: 'manual_switch_item',
                  key: 1,
                })
              )
            ),
            F = React.default.createElement(
              module13.View,
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
            module13.ScrollView,
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
              module13.View,
              {
                style: C.sectionView,
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    borderRadius: 8,
                    backgroundColor: o.componentBackgroundColor,
                    flexDirection: 'row',
                    paddingVertical: 30,
                    marginTop: 20,
                  },
                },
                module2071,
                module2071
              )
            ),
            b &&
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    marginTop: 20,
                    color: o.subTextColor,
                  },
                },
                module510.smart_switch_section_title
              ),
            React.default.createElement(
              module13.View,
              {
                style: C.sectionView,
              },
              b && y,
              b && x
            ),
            module390.default.isMultiMapSegmentTimerSupported() ? h : p,
            u,
            F
          );
        },
      },
    ]);
    return I;
  })(React.default.Component);

exports.default = T;
T.contextType = module1193.AppConfigContext;
var C = module13.StyleSheet.create({
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
