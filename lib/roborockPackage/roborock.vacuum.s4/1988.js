var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = k(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module390 = require('./390'),
  module506 = require('./506'),
  module415 = require('./415'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1233 = require('./1233'),
  module1241 = require('./1241'),
  module1235 = require('./1235'),
  module1344 = k(require('./1344'));

function R(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (R = function (t) {
    return t ? o : n;
  })(t);
}

function k(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = R(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in t)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
      var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
      if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
      else s[l] = t[l];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
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

function F(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      C(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function V() {
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

var module936 = require('./936'),
  module389 = require('./389'),
  module1235 = require('./1235'),
  module1249 = require('./1249'),
  module491 = require('./491').strings,
  j = (function (t) {
    module7.default(k, t);

    var module49 = k,
      module506 = V(),
      R = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);

      (n = R.call(this, t)).onNavigationBackPress = function () {
        n.tryQuiting();
      };

      n.onNavigationSavePress = function () {
        n.trySavingChanges();
      };

      n.onPressResetEditButton = function () {
        n.setState(
          {
            hasEditedMap: false,
          },
          function () {
            var t;
            if (!(null == (t = n.mapView))) t.setState(F({}, module1231.MM.mapData));
          }
        );
      };

      n.onPressClosePanelButton = function () {
        n.hideEidtPanel(function () {
          n.setState({
            showButton: true,
          });
        });
      };

      n.onPressShowPanelButton = function () {
        n.setState(
          {
            showButton: false,
          },
          function () {
            n.showEditPanel();
          }
        );
      };

      n.onPressSwitch3DButton = function () {
        if (module389.isSupport3DMap())
          module389.open3DMapTestPage({
            parsedMapData: module1231.MM.parsedMapData,
            originBase64MapData: module1231.MM.originBase64MapData,
          });
      };

      n.eidtCountChange = function (t) {
        n.setState({
          editCount: module1235.MAX_FURNITURE_EDIT_MIAPP - t,
        });
      };

      n.state = {
        mapStatus: module377.RSM.mapStatus,
        hasEditedMap: false,
        showButton: true,
        editCount: module1235.MAX_FURNITURE_EDIT_MIAPP,
        showDragItem: false,
        dragItemType: module1235.FurnitureType.FT_BED,
        dragItemSize: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      };
      n.editPanelTop = new module12.Animated.Value(-126);
      n.menuItemRef = {};
      return n;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.initPanResponder();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.configNavibar();
                    this.updateMap();
                    this.registListeners();
                    module1231.MM.getMap(true);

                  case 4:
                  case 'end':
                    return t.stop();
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
        key: 'componentWillUnmount',
        value: function () {
          this.removeListeners();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = this.state.mapStatus != module377.MapStatus.None && this.state.hasEditedMap,
            o = module1344.default.confirmButton(this.onNavigationSavePress, n, function (n) {
              t.mapSaveButton = n;
            });
          module1344.default.setNavigation(this, [o], this.onNavigationBackPress);
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            t.updateMap();
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapEditDidChange, function (n) {
            t.setSaveButtonEnable();
          });
        },
      },
      {
        key: 'initPanResponder',
        value: function () {
          var t = this;
          this.panResponderDrop = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderStart: function (n, o) {
              var s;

              if (
                (Object.keys(t.menuItemRef).forEach(function (o) {
                  if (module12.findNodeHandle(t.menuItemRef[o]) == n.nativeEvent.target) s = parseInt(o);
                }),
                s)
              ) {
                var u = {
                  width: module1235.FurnitureResource[s].imageWidth,
                  height: module1235.FurnitureResource[s].imageHeight,
                };
                t.setState({
                  showDragItem: true,
                  dragItemType: s,
                  dragItemSize: F(
                    {
                      x: o.moveX - u.width / 2,
                      y: o.moveY - u.height / 2,
                    },
                    u
                  ),
                });
              }
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) {
                t.setState({
                  showDragItem: false,
                });
                t.dropFurnitureByPos(
                  {
                    x: o.moveX,
                    y: o.moveY,
                  },
                  t.state.dragItemType,
                  0
                );
              }
            },
            onPanResponderMove: function (n, o) {
              t.setState({
                dragItemSize: F(
                  F({}, t.state.dragItemSize),
                  {},
                  {
                    x: o.moveX - t.state.dragItemSize.width / 2,
                    y: o.moveY - t.state.dragItemSize.height / 2,
                  }
                ),
              });
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          var t, n, o, s;
          if (!(null == (t = this.mapListener))) t.remove();
          if (!(null == (n = this.backListener))) n.remove();
          if (!(null == (o = this.robotStatusListener))) o.remove();
          if (!(null == (s = this.mapEditDidChange))) s.remove();
        },
      },
      {
        key: 'updateMap',
        value: function () {
          var t;
          if (!(null == (t = this.mapView)))
            t.setState(
              F(
                F({}, module1231.MM.mapData),
                {},
                {
                  robotStatus: module377.RSM.state,
                }
              )
            );
        },
      },
      {
        key: 'dropFurnitureByPos',
        value: function (t, n, o) {
          var s, u, l;
          if (t && t.x && t.y)
            t.y > (null == (s = this.mapView) ? undefined : s.size.height) - (null == (u = this.mapView) ? undefined : u.bottom) ||
              null == (l = this.mapView) ||
              l.addFurniture(n, 0, t);
        },
      },
      {
        key: 'trySavingChanges',
        value: function () {
          var t,
            n = this,
            o = (null == (t = this.mapView) ? undefined : t.getEditFurnitureParams()) || [];
          module1249.setTimeout(function () {
            return n.startLoading();
          }, 300);
          module1249.setTimeout(function () {
            return module1231.MM.saveFurnitureEditZones(module377.RSM.currentMapId, o, n.onMapSaveCompleted.bind(n));
          }, 500);
        },
      },
      {
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.state.hasEditedMap) {
            var n,
              o = {
                text: module491.map_edit_no_save,
                onPress: function () {
                  t.quit();
                },
              },
              s = {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  module1249.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module491.map_edit_save_current_action, '', [o, s]);
          } else this.quit();
        },
      },
      {
        key: 'quit',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.pop();

                  case 1:
                  case 'end':
                    return t.stop();
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
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;
          if (t)
            this.setState(
              {
                hasEditedMap: false,
              },
              function () {
                var t;
                if (!(null == (t = n.mapView))) t.clearAllFurnitureFocus();
                module1249.setTimeout(function () {
                  module1231.MM.getMap(true);
                  n.quit();
                }, 1e3);
              }
            );
          else this.showToast(module491.robot_communication_exception);
          this.endLoading();
        },
      },
      {
        key: 'setSaveButtonEnable',
        value: function () {
          var t;

          if (!(this.state.mapStatus == module377.MapStatus.None || this.state.hasEditedMap)) {
            this.setState({
              hasEditedMap: true,
            });
            if (!(null == (t = this.mapSaveButton))) t.setEnabled(true);
          }
        },
      },
      {
        key: 'startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText(module491.rubys_main_diag_update_map);
        },
      },
      {
        key: 'endLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.hide();
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'showEditPanel',
        value: function () {
          module12.Animated.timing(this.editPanelTop, {
            toValue: 20,
            duration: 500,
          }).start();
        },
      },
      {
        key: 'hideEidtPanel',
        value: function (t) {
          module12.Animated.timing(this.editPanelTop, {
            toValue: -126,
            duration: 500,
          }).start(t && t());
        },
      },
      {
        key: 'getMapView',
        value: function () {
          var t = this,
            n = React.default.createElement(module1233.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1344.MapEditCommonStyles.map,
              left: module1344.MapEditCommonStyles.mapLeft,
              right: module1344.MapEditCommonStyles.mapRight,
              top: module1344.MapEditCommonStyles.mapTop,
              bottom: module1344.MapEditCommonStyles.mapBottom + 100,
              hideAccessory: true,
              mapMode: module936.MAP_MODE_FURNITURE_EDIT,
              zonesHasEdited: this.state.hasEditedMap,
              eidtCountChange: this.eidtCountChange,
            });
          return this.state.mapStatus == module377.MapStatus.None ? module1344.default.getNoMapTipView(this.state.mapStatus) : n;
        },
      },
      {
        key: 'getDragFurniture',
        value: function () {
          return React.default.createElement(module1241.Furniture, {
            id: 0,
            type: this.state.dragItemType,
            rectSize: this.state.dragItemSize,
            slopeAngle: 0,
            isFocus: false,
            isDrag: true,
            transform: {
              xx: 1,
              yy: 1,
            },
          });
        },
      },
      {
        key: 'getFurnitureEditPanel',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = [];
          s.push(module1235.FurnitureResource[module1235.FurnitureType.FT_BED]);
          s.push(module1235.FurnitureResource[module1235.FurnitureType.FT_SOFA]);
          s.push(module1235.FurnitureResource[module1235.FurnitureType.FT_DINNERTABLE]);
          s.push(module1235.FurnitureResource[module1235.FurnitureType.FT_TEATABLE]);
          var u = s.map(function (n, s) {
            return React.default.createElement(
              module12.View,
              module21.default(
                {
                  style: {
                    width: n.imageWidth,
                    alignItems: 'center',
                  },
                  key: s,
                },
                t.panResponderDrop.panHandlers
              ),
              React.default.createElement(module12.Image, {
                style: {
                  width: n.imageWidth,
                  height: 52,
                },
                resizeMode: 'center',
                source: n.image,
                ref: function (o) {
                  return (t.menuItemRef[n.type] = o);
                },
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: W.furnitureText,
                },
                n.title
              )
            );
          });
          return React.default.createElement(
            module12.Animated.View,
            {
              style: [
                W.editPanelView,
                {
                  bottom: this.editPanelTop,
                  backgroundColor: n.furnitureEdit.editPanelBackgroud,
                },
              ],
            },
            React.default.createElement(module381.PureImageButton, {
              image: n.furnitureEdit.closePanelIcon,
              onPress: this.onPressClosePanelButton,
              imageWidth: 20,
              imageHeight: 20,
              style: W.panelCloseBtn,
            }),
            React.default.createElement(
              module12.View,
              {
                style: W.editBtnsView,
              },
              u
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = this.getMapView(),
            s = this.getFurnitureEditPanel(),
            u = this.getDragFurniture(),
            l = React.default.createElement(module381.PureImageButton, {
              image: n.furnitureEdit.addIcon,
              onPress: this.onPressShowPanelButton,
              imageWidth: 56,
              imageHeight: 56,
              style: W.showPanelBtn,
            }),
            c = React.default.createElement(module381.PureImageButton, {
              image: n.furnitureEdit.switchIcon,
              onPress: this.onPressSwitch3DButton,
              imageWidth: 56,
              imageHeight: 56,
              style: W.switch3DBtn,
            }),
            p = React.default.createElement(module381.PureImageButton, {
              style: module1344.MapEditCommonStyles.refreshMapSegmentIndicator,
              image: n.mapEdit.resetImg,
              imageWidth: 40,
              imageHeight: 40,
              hitSlop: {
                top: 20,
                left: 30,
                bottom: 20,
                right: 15,
              },
              onPress: this.onPressResetEditButton,
            }),
            h =
              '' +
              module491.map_edit_furniture_count_tip_miapp.templateStringWithParams({
                max: module1235.MAX_FURNITURE_EDIT_MIAPP,
                count: this.state.editCount,
              }),
            y = React.default.createElement(
              module12.Text,
              {
                style: [
                  W.countTip,
                  {
                    color: n.mapTipView.textColor,
                  },
                ],
              },
              h
            ),
            E = this.state.showButton && !module389.isMiApp && (module415.DMM.isV2 || module415.DMM.isV4 || module415.DMM.isV5) && module389.isSupport3DMap();
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1344.MapEditCommonStyles.root,
                {
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            o,
            s,
            this.state.showDragItem && u,
            this.state.hasEditedMap && p,
            this.state.showButton && l,
            E && c,
            module389.isMiApp && y,
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_forbidden_view_loading',
              closeAccessibilityLabelKey: 'map_edit_forbidden_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module491.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = j;
j.contextType = module506.AppConfigContext;
var W = module12.StyleSheet.create({
  editPanelView: {
    position: 'absolute',
    left: 12,
    width: module12.Dimensions.get('window').width - 24,
    height: 126,
    backgroundColor: 'transparent',
    borderRadius: 14,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  editBtnsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  panelCloseBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  furnitureText: {
    fontSize: 12,
    marginTop: 8,
    color: '#9B9B9B',
  },
  showPanelBtn: {
    position: 'absolute',
    right: 33,
    bottom: 60,
  },
  switch3DBtn: {
    position: 'absolute',
    left: 33,
    bottom: 60,
  },
  countTip: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    height: 30,
    bottom: 60,
    textAlign: 'center',
    fontSize: 14,
  },
});
