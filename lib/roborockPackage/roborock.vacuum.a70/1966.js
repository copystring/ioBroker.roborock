var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1118 = require('./1118'),
  module415 = require('./415'),
  module385 = require('./385'),
  module381 = require('./381'),
  module420 = require('./420'),
  module1193 = require('./1193'),
  module1387 = require('./1387');

function C(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function T(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      C(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function x() {
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
  B = (function (t) {
    module9.default(C, t);

    var n = C,
      module50 = x(),
      v = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t) {
      var n;
      module6.default(this, C);
      (n = v.call(this, t)).selectedSegments = t.selectedSegments;
      n.state = {
        shouldShowBottom: false,
        mapName: null,
        isLoading: false,
        needShowStopTask: false,
        cleanAreaTab: t.isGlobalTab ? 0 : 1,
      };
      n.selectedMap = null;
      n.needUpdateMap = false;
      return n;
    }

    module7.default(C, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
            if (t.needWaitNextLoop) t.needWaitNextLoop = false;
            else if (t.needUpdateMap) t.setMapData(module415.MM.mapData);
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'switchMap',
        value: function (t, n, o) {
          var l = this,
            s = -1 != t.id;
          this.selectedMap = t;
          var c = o && module381.RSM.isRunning && !n;
          this.needUpdateMap = true;
          this.setState(
            {
              shouldShowBottom: s,
              mapName: t.name,
              isLoading: s,
              needShowStopTask: c,
            },
            function () {
              if (l.needUpdateMap && n) l.setMapData(module415.MM.mapData);
              l.needWaitNextLoop = !n;
            }
          );
        },
      },
      {
        key: 'setCustomMode',
        value: function (t) {
          var n;
          if (!(null == (n = this.mapView)))
            n.changeMapViewMode(t ? module1118.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type : module1118.MapModelInCleanMode.Segment_Clean_Edit);
        },
      },
      {
        key: 'setMapData',
        value: function (t) {
          var n = this;

          if (this.needUpdateMap) {
            var o = function (t) {
              var o, l;
              if (n.mapView) n.mapView.setState(T({}, t));
              var s,
                c = [];

              if ('0' != n.selectedSegments) {
                n.selectedSegments.split(',').forEach(function (t) {
                  c.push(parseInt(t));
                });
                console.log('setHighlight blocks', c);
                if (!(null == (s = n.mapView))) s.setHighlightSegments(c);
              }

              n.handleSelectedBlocksCount(c);
              if (!(null == (o = n.mapView))) o.setAllCleanMopMode(module415.MM.customCleanModes);
              if (!(null == (l = n.mapView))) l.setCleanSequence(module415.MM.cleanSequence.concat());
              n.setCustomMode(n.props.isCustomMode);
            };

            this.setState(
              {
                isLoading: false,
              },
              function () {
                o(t);
              }
            );
            this.needUpdateMap = false;
          }
        },
      },
      {
        key: 'handleSelectedBlocksCount',
        value: function (t, n) {
          if (n) n(t);
          console.log('handleSelectedBlocksCount', t);
          var o =
            t.length > 0
              ? '' +
                module510.main_page_top_tip_has_selected.templateStringWithParams({
                  zones: t.length,
                })
              : module510.home_menu_select_zone_tip;
          this.setState({
            bottomTip: o,
          });
        },
      },
      {
        key: 'selectedBlocksDidChange',
        value: function (t) {
          var n = this;
          console.log('selectedBlocksDidChange', t);
          this.selectedSegments = t.length > 0 ? t.join(',') : '0';
          this.handleSelectedBlocksCount(t, function () {
            if (n.props.selectedBlocksDidChange) n.props.selectedBlocksDidChange(t);
          });
        },
      },
      {
        key: 'getTipView',
        value: function () {
          return React.default.createElement(
            module13.View,
            {
              style: V.tipWrap,
            },
            React.default.createElement(module13.Image, {
              source: this.context.theme.mapTipView.icon,
              style: V.tipIcon,
            }),
            React.default.createElement(
              module13.Text,
              {
                style: [
                  V.tipText,
                  {
                    color: this.context.theme.mapTipView.textColor,
                  },
                ],
              },
              module510.multi_map_timer_not_current_map_tip
            ),
            React.default.createElement(module385.PureButton, {
              title: module510.multi_map_timer_select_map_stop_task_title,
              style: V.stopTaskButton,
              textColor: '#007AFF',
              onPress: this.stopTask.bind(this),
            })
          );
        },
      },
      {
        key: 'stopTask',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      shouldShowBottom: true,
                      isLoading: true,
                      needShowStopTask: false,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(RobotApi.stop());

                  case 4:
                    n.next = 9;
                    break;

                  case 6:
                    n.prev = 6;
                    n.t0 = n.catch(1);
                    console.log('stop robot  error: ' + ('string' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 9:
                    setTimeout(function () {
                      return regeneratorRuntime.default.async(
                        function (n) {
                          for (;;)
                            switch ((n.prev = n.next)) {
                              case 0:
                                if (((n.prev = 0), t.selectedMap.id == module381.RSM.currentMapId)) {
                                  n.next = 8;
                                  break;
                                }

                                n.next = 5;
                                return regeneratorRuntime.default.awrap(RobotApi.loadMultiMap(t.selectedMap.id));

                              case 5:
                                setTimeout(function () {
                                  module415.MM.getMap(true);
                                  module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                                    data: module420.EventKeys.MapSegmentsDidChange,
                                  });
                                }, 2e3);
                                n.next = 9;
                                break;

                              case 8:
                                if (t.props.stopTaskSwitchMap) t.props.stopTaskSwitchMap(t.selectedMap);

                              case 9:
                                n.next = 15;
                                break;

                              case 11:
                                n.prev = 11;
                                n.t0 = n.catch(0);
                                console.log('loadMultiMap  error: ' + ('string' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));
                                globals.showToast(module510.robot_communication_exception);

                              case 15:
                              case 'end':
                                return n.stop();
                            }
                        },
                        null,
                        null,
                        [[0, 11]],
                        Promise
                      );
                    }, 1e3);

                  case 10:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 6]],
            Promise
          );
        },
      },
      {
        key: 'onPressCleanAreaTab',
        value: function (t) {
          var n = this.props,
            o = n.selectedBlocksDidChange,
            l = n.switchToSelectAreaMode;
          this.setState({
            cleanAreaTab: t,
          });

          if (0 == t) {
            this.selectedSegments = '0';
            if (o) o([]);
          } else if (1 == t && l) l();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.timerSetting,
            o = this.context.theme.settingBackgroundColor,
            l = this.state,
            s = l.isLoading,
            c = l.bottomTip,
            p = l.cleanAreaTab,
            u = undefined === p ? 0 : p,
            h = 0 == u,
            w = module381.RSM.mapSaveEnabled ? [module510.home_bottom_menu_global, module510.home_bottom_menu_select_zone] : [module510.home_bottom_menu_global],
            v = module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments,
            C = React.default.createElement(module1387.default, {
              tip: module510.no_seg_map_tip,
              shouldShowGuideButton: v,
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                V.containter,
                this.props.style,
                {
                  backgroundColor: n.segmentSettingViewBackgroundColor,
                },
              ],
              pointerEvent: 'box-only',
            },
            React.default.createElement(
              module13.View,
              {
                style: V.topWrap,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    fontSize: 16,
                    color: this.context.theme.settingListItem.titleColor,
                  },
                },
                module510.multi_map_timer_select_map_title
              ),
              React.default.createElement(
                module13.View,
                {
                  style: T(
                    T({}, V.tabWrap),
                    {},
                    {
                      backgroundColor: n.areaTabBackground,
                    }
                  ),
                },
                w.map(function (o, l) {
                  var s = l == u;
                  return React.default.createElement(module385.PureButton, {
                    funcId: 'multi_map_segment_setting_' + l,
                    title: o,
                    key: l,
                    textColor: s ? 'white' : n.areaTabItemTextColor,
                    style: T(
                      T({}, V.tabButton),
                      {},
                      {
                        flex: 1 / w.length,
                        backgroundColor: s ? n.areaTabItemSelectedBackground : 'transparent',
                      }
                    ),
                    onPress: t.onPressCleanAreaTab.bind(t, l),
                  });
                })
              )
            ),
            !h &&
              React.default.createElement(
                module13.View,
                null,
                (module415.MM.maps.length > 1 || (1 == module415.MM.maps.length && -1 == module381.RSM.currentMapId)) &&
                  React.default.createElement(module385.SettingListItemView, {
                    funcId: 'timer_setting_select_area',
                    title: this.state.mapName || 'unknow',
                    onPress: this.props.showMapSelectView,
                    shouldShowTopLongLine: false,
                    shouldShowBottomLine: false,
                  }),
                this.state.shouldShowBottom &&
                  (this.state.needShowStopTask
                    ? this.getTipView()
                    : React.default.createElement(
                        module13.View,
                        {
                          style: V.bottom,
                        },
                        s
                          ? React.default.createElement(module385.LoadingRing, {
                              itemSize: 80,
                              style: {
                                alignSelf: 'center',
                                marginTop: 20,
                              },
                            })
                          : v
                          ? C
                          : React.default.createElement(module1118.MapView, {
                              ref: function (n) {
                                return (t.mapView = n);
                              },
                              style: V.map,
                              pointerEvents: 'box-only',
                              top: 10,
                              bottom: 10,
                              left: 30,
                              right: 30,
                              noScale: true,
                              showAllBlocksBubble: true,
                              hideAccessory: true,
                              onPanResponderGrant: this.props.onPanResponderGrant,
                              onPanResponderRelease: this.props.onPanResponderRelease,
                              selectedBlocksDidChange: this.selectedBlocksDidChange.bind(this),
                            }),
                        !s &&
                          React.default.createElement(module13.View, {
                            style: [
                              V.line,
                              {
                                backgroundColor: n.borderColor,
                              },
                            ],
                          }),
                        !s &&
                          !v &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: [
                                V.bottomTip,
                                {
                                  top: 15,
                                  color: n.segmentSettingViewTextColor,
                                },
                              ],
                            },
                            c
                          ),
                        !s &&
                          module415.MM.maps.length > 1 &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: [
                                V.bottomTip2,
                                {
                                  backgroundColor: o,
                                  color: n.segmentSettingViewTextColor,
                                },
                              ],
                            },
                            module510.multi_map_timer_segment_select_bottom_tip
                          )
                      ))
              )
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = B;
B.contextType = module1193.AppConfigContext;
var V = module13.StyleSheet.create({
  containter: {
    backgroundColor: 'white',
  },
  topWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  tabWrap: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: '#eeedf2',
  },
  tabButton: {
    flex: 0.5,
    height: 40,
    borderRadius: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  desc: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
  },
  switch: {
    marginRight: 10,
  },
  bottom: {
    height: 400,
  },
  bottomTip: {
    marginHorizontal: 20,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
  bottomTip2: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    textAlign: globals.isRTL ? 'right' : 'left',
    color: 'rgba(0,0,0,0.6)',
  },
  tipWrap: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  tipIcon: {
    width: 90,
    height: 90,
    marginBottom: 30,
  },
  tipText: {
    color: 'rgba(0,0,0,0.6)',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  stopTaskButton: {
    marginHorizontal: 20,
    height: 40,
    marginTop: 30,
    borderRadius: 20,
    borderColor: '#007AFF',
    borderWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  line: {
    alignSelf: 'stretch',
    height: 0.8,
  },
});
