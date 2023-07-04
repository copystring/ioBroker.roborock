var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = k(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var p = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (p && (p.get || p.set)) Object.defineProperty(s, c, p);
        else s[c] = t[c];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module1231 = require('./1231'),
  module381 = require('./381'),
  module377 = require('./377'),
  module411 = require('./411'),
  module506 = require('./506'),
  module1345 = require('./1345');

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (k = function (t) {
    return t ? o : n;
  })(t);
}

function C(t, n) {
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
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      C(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function T() {
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

require('./389');

require('./385');

require('base64-js');

require('./1341').parseSync;

var module491 = require('./491').strings,
  E = (function (t) {
    module7.default(C, t);

    var module49 = C,
      module506 = T(),
      k = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = k.call(this, t)).selectedSegments = t.selectedSegments;
      n.state = {
        shouldShowBottom: false,
        mapName: null,
        isLoading: false,
        needShowStopTask: false,
      };
      n.selectedMap = null;
      n.needUpdateMap = false;
      return n;
    }

    module5.default(C, [
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
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            if (t.needWaitNextLoop) t.needWaitNextLoop = false;
            else if (t.needUpdateMap) t.setMapData(module1231.MM.mapData);
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
          var s = this,
            l = -1 != t.id;
          this.selectedMap = t;
          var c = o && module377.RSM.isRunning && !n;
          this.needUpdateMap = true;
          this.setState(
            {
              shouldShowBottom: l,
              mapName: t.name,
              isLoading: l,
              needShowStopTask: c,
            },
            function () {
              if (s.needUpdateMap && n) s.setMapData(module1231.MM.mapData);
              s.needWaitNextLoop = !n;
            }
          );
        },
      },
      {
        key: 'setCustomMode',
        value: function (t) {
          if (this.mapView)
            this.mapView.changeMapViewMode(t ? module1233.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type : module1233.MapModelInCleanMode.Segment_Clean_Edit);
        },
      },
      {
        key: 'setMapData',
        value: function (t) {
          var n = this;

          if (this.needUpdateMap) {
            var o = function (t) {
              if (n.mapView) n.mapView.setState(x({}, t));
              var o = [];

              if ('0' != n.selectedSegments) {
                n.selectedSegments.split(',').forEach(function (t) {
                  o.push(parseInt(t));
                });
                console.log('setHighlight blocks', o);
                if (n.mapView) n.mapView.setHighlightSegments(o);
              }

              n.handleSelectedBlocksCount(o);
              if (n.mapView) n.mapView.setAllCleanMopMode(module1231.MapManager.sharedManager().customCleanModes);
              if (n.mapView) n.mapView.setCleanSequence(module1231.MapManager.sharedManager().cleanSequence.concat(), false);
              if (n.mapView)
                n.mapView.changeMapViewMode(
                  n.props.isCustomMode ? module1233.MapModelInCleanMode.Segment_Clean_Edit_With_Clean_Type : module1233.MapModelInCleanMode.Segment_Clean_Edit
                );
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
                module491.main_page_top_tip_has_selected.templateStringWithParams({
                  zones: t.length,
                })
              : module491.home_menu_select_zone_tip;
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
            module12.View,
            {
              style: O.tipWrap,
            },
            React.default.createElement(module12.Image, {
              source: this.context.theme.mapTipView.icon,
              style: O.tipIcon,
            }),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  O.tipText,
                  {
                    color: this.context.theme.mapTipView.textColor,
                  },
                ],
              },
              module491.multi_map_timer_not_current_map_tip
            ),
            React.default.createElement(module381.PureButton, {
              title: module491.multi_map_timer_select_map_stop_task_title,
              style: O.stopTaskButton,
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      shouldShowBottom: true,
                      isLoading: true,
                      needShowStopTask: false,
                    });
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(RobotApi.stop());

                  case 4:
                    o.next = 9;
                    break;

                  case 6:
                    o.prev = 6;
                    o.t0 = o.catch(1);
                    console.log('stop robot  error: ' + ('string' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 9:
                    setTimeout(function () {
                      return regeneratorRuntime.default.async(
                        function (o) {
                          for (;;)
                            switch ((o.prev = o.next)) {
                              case 0:
                                if (((o.prev = 0), t.selectedMap.id == module377.RSM.currentMapId)) {
                                  o.next = 8;
                                  break;
                                }

                                o.next = 5;
                                return regeneratorRuntime.default.awrap(RobotApi.loadMultiMap(t.selectedMap.id));

                              case 5:
                                setTimeout(function () {
                                  module1231.MM.getMap(true);
                                  module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                                    data: module411.EventKeys.MapSegmentsDidChange,
                                  });
                                }, 2e3);
                                o.next = 9;
                                break;

                              case 8:
                                if (t.props.stopTaskSwitchMap) t.props.stopTaskSwitchMap(t.selectedMap);

                              case 9:
                                o.next = 15;
                                break;

                              case 11:
                                o.prev = 11;
                                o.t0 = o.catch(0);
                                console.log('loadMultiMap  error: ' + ('string' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                                globals.showToast(module491.robot_communication_exception);

                              case 15:
                              case 'end':
                                return o.stop();
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
                    return o.stop();
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.timerSetting,
            o = this.context.theme.settingBackgroundColor,
            s = this.state,
            l = s.isLoading,
            c = s.bottomTip,
            p = module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments,
            u = React.default.createElement(module1345.default, {
              tip: module491.no_seg_map_tip,
              shouldShowGuideButton: p,
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                O.containter,
                this.props.style,
                {
                  backgroundColor: n.segmentSettingViewBackgroundColor,
                },
              ],
              pointerEvent: 'box-only',
            },
            React.default.createElement(module381.SettingListItemView, {
              funcId: 'timer_setting_select_area',
              title: module491.multi_map_timer_select_map_title,
              detail: this.state.mapName || 'unknow',
              onPress: this.props.showMapSelectView,
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: !this.state.shouldShowBottom,
            }),
            this.state.shouldShowBottom &&
              (this.state.needShowStopTask
                ? this.getTipView()
                : React.default.createElement(
                    module12.View,
                    {
                      style: O.bottom,
                    },
                    l
                      ? React.default.createElement(module12.ActivityIndicator, {
                          style: {
                            flex: 1,
                            alignItems: 'center',
                          },
                        })
                      : p
                      ? u
                      : React.default.createElement(module1233.MapView, {
                          ref: function (n) {
                            return (t.mapView = n);
                          },
                          style: O.map,
                          pointerEvents: 'box-only',
                          top: 10,
                          bottom: 10,
                          left: 30,
                          right: 30,
                          noScale: true,
                          showAllBubbleInfo: true,
                          inBlockMode: true,
                          hideAccessory: true,
                          onPanResponderGrant: this.props.onPanResponderGrant,
                          onPanResponderRelease: this.props.onPanResponderRelease,
                          selectedBlocksDidChange: this.selectedBlocksDidChange.bind(this),
                        }),
                    !l &&
                      React.default.createElement(module12.View, {
                        style: [
                          O.line,
                          {
                            backgroundColor: n.borderColor,
                          },
                        ],
                      }),
                    !l &&
                      !p &&
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            O.bottomTip,
                            {
                              top: 15,
                              color: n.segmentSettingViewTextColor,
                            },
                          ],
                        },
                        c
                      ),
                    !l &&
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            O.bottomTip2,
                            {
                              backgroundColor: o,
                              color: n.segmentSettingViewTextColor,
                            },
                          ],
                        },
                        module491.multi_map_timer_segment_select_bottom_tip
                      )
                  ))
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = E;
E.contextType = module506.AppConfigContext;
var O = module12.StyleSheet.create({
  containter: {
    backgroundColor: 'white',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textWrap: {
    width: module12.Dimensions.get('window').width - 100,
    justifyContent: 'center',
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
    width: module12.Dimensions.get('window').width - 40,
    height: 40,
    marginTop: 30,
    borderRadius: 20,
    borderColor: '#007AFF',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  line: {
    width: module12.Dimensions.get('window').width,
    height: 0.8,
  },
});
