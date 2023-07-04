var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module418 = require('./418'),
  module394 = require('./394'),
  module515 = require('./515'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1330 = require('./1330'),
  module1393 = require('./1393'),
  module1332 = require('./1332'),
  module1410 = require('./1410');

function k(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, s);
  }

  return u;
}

function A(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      k(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      k(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function C() {
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

var module1153 = require('./1153'),
  module393 = require('./393'),
  module1332 = require('./1332'),
  module1404 = require('./1404'),
  module500 = require('./500').strings,
  O = 500,
  V = (function (t) {
    module7.default(k, t);

    var n = k,
      module50 = C(),
      M = function () {
        var t,
          u = module11.default(n);

        if (module50) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(u, arguments, s);
        } else t = u.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);

      (n = M.call(this, t)).onNavigationSavePress = function () {
        var t,
          u = {
            text: module500.localization_strings_Main_MainPage_11,
          },
          s = {
            text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              module1404.setTimeout(function () {
                n.trySavingChanges();
              }, O);
            },
          };
        if (!(null == (t = globals.Alert))) t.alert(module500.map_furniture_guide_save_tip, '', [u, s]);
      };

      n.onNavigationBackPress = function () {
        n.tryQuiting();
      };

      n.onPressResetEditButton = function () {
        n.setState(
          {
            hasEditedMap: false,
          },
          function () {
            var t;
            if (!(null == (t = n.mapView))) t.setState(A({}, module1329.MM.mapData));
          }
        );
      };

      n.eidtCountChange = function (t) {
        if (module393.isMiApp) {
          var u = module1332.MAX_FURNITURE_EDIT_MIAPP - t;
          if (n.state.editCount != u)
            n.setState({
              editCount: u,
            });
        }
      };

      n.state = {
        mapStatus: module381.RSM.mapStatus,
        hasEditedMap: false,
        editCount: module1332.MAX_FURNITURE_EDIT_MIAPP,
        showDragItem: false,
        dragItemType: module1332.FurnitureType.FT_BED,
        dragItemSize: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      };
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
          var n = this.props.navigation.getParam('initAction', module1330.EditAction.None);
          this.onlyFurniture = n == module1330.EditAction.Furniture;
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
                    module1329.MM.getMap(true);

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
          this.unMount = true;
          this.removeListeners();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = this.state.mapStatus != module381.MapStatus.None && this.state.mapStatus != module381.MapStatus.Has_WithoutSegments,
            u = module1410.default.confirmButton(this.onNavigationSavePress, n, function (n) {
              t.mapSaveButton = n;
            });
          module1410.default.setNavigation(this, [u], this.onNavigationBackPress);
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapDidUpdate, function (n) {
            t.updateMap();
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapEditDidChange, function (n) {
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
              return !(module393.isMiApp && t.state.editCount <= 0);
            },
            onPanResponderStart: function (n, u) {
              var s;

              if (
                (Object.keys(t.menuItemRef).forEach(function (u) {
                  if (module12.findNodeHandle(t.menuItemRef[u]) == n.nativeEvent.target) s = parseInt(u);
                }),
                s)
              ) {
                var o = t.getFurnitureResItemByType(s);

                if (o) {
                  t.setState({
                    dragItemType: s,
                  });
                  t.resetLongPressTimer();
                  t.longPressTimer = setTimeout(function () {
                    var n = {
                      width: 1.5 * o.imageWidth,
                      height: 1.5 * o.imageHeight,
                    };
                    t.setState({
                      showDragItem: true,
                      dragItemType: s,
                      dragItemSize: A(
                        {
                          x: u.moveX - n.width / 2,
                          y: u.moveY - n.height / 2,
                        },
                        n
                      ),
                    });
                  }, 400);
                }
              }
            },
            onPanResponderEnd: function (n, u) {
              if (0 === n.nativeEvent.touches.length) {
                if (
                  (t.resetLongPressTimer(),
                  t.scrollPan.setNativeProps({
                    scrollEnabled: true,
                  }),
                  t.state.showDragItem)
                ) {
                  t.setState({
                    showDragItem: false,
                  });
                  if (t.checkCanAddNew())
                    t.dropFurnitureByPos(
                      {
                        x: u.moveX,
                        y: u.moveY,
                      },
                      t.state.dragItemType
                    );
                } else if (!t.scrolling && !t.dragItemPanMoving) {
                  var s;
                  if (t.checkCanAddNew()) null == (s = t.mapView) || s.addFurniture((t.state.dragItemType >> 8) & 255, 255 & t.state.dragItemType);
                }

                if (t.dragItemPanMoving) t.dragItemPanMoving = false;
              }
            },
            onPanResponderMove: function (n, u) {
              if ('android' == module12.Platform.OS && (Math.abs(u.dx) > 3 || Math.abs(u.dy) > 3)) t.dragItemPanMoving = true;

              if (u.dy < -20 && t.state.showDragItem) {
                t.scrollPan.setNativeProps({
                  scrollEnabled: false,
                });
                t.setState({
                  dragItemSize: A(
                    A({}, t.state.dragItemSize),
                    {},
                    {
                      x: u.moveX - t.state.dragItemSize.width / 2,
                      y: u.moveY - t.state.dragItemSize.height / 2,
                    }
                  ),
                });
              }
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
          var t, n, u, s;
          if (!(null == (t = this.mapListener))) t.remove();
          if (!(null == (n = this.backListener))) n.remove();
          if (!(null == (u = this.robotStatusListener))) u.remove();
          if (!(null == (s = this.mapEditDidChange))) s.remove();
        },
      },
      {
        key: 'updateMap',
        value: function () {
          var t;

          if (!this.unMount) {
            if (!(null == (t = this.mapView)))
              t.setState(
                A(
                  A({}, module1329.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
            if (this.waitForUpdate) this.resetStatus();
          }
        },
      },
      {
        key: 'resetLongPressTimer',
        value: function () {
          if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
          }
        },
      },
      {
        key: 'dropFurnitureByPos',
        value: function (t, n) {
          var u, s, o;
          if (t && t.x && t.y)
            t.y > (null == (u = this.mapView) ? undefined : u.size.height) - (null == (s = this.mapView) ? undefined : s.bottom) ||
              null == (o = this.mapView) ||
              o.addFurniture((n >> 8) & 255, 255 & n, t);
        },
      },
      {
        key: 'trySavingChanges',
        value: function () {
          var t = this;
          module1404.setTimeout(function () {
            return t.startLoading();
          }, 300);
          module1404.setTimeout(function () {
            return t.startSaveFurnitures();
          }, O);
        },
      },
      {
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.state.hasEditedMap) {
            var n,
              u = {
                text: module500.map_edit_no_save,
                onPress: function () {
                  t.quit();
                },
              },
              s = {
                text: module500.map_edit_button_text_save,
                onPress: function () {
                  module1404.setTimeout(function () {
                    t.trySavingChanges();
                  }, O);
                },
              },
              o = module500.map_edit_save_current_action + '\r\n' + module500.map_furniture_guide_save_tip;
            if (!(null == (n = globals.Alert))) n.alert(o, '', [u, s]);
          } else this.quit();
        },
      },
      {
        key: 'quit',
        value: function () {
          var t = arguments;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!(t.length > 0 && undefined !== t[0] && t[0]) || !this.onlyFurniture) {
                      n.next = 9;
                      break;
                    }

                    n.prev = 2;
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.CloseFurnitureGuide + '_' + module381.RSM.currentMapId, ''));

                  case 5:
                    n.next = 9;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(2);

                  case 9:
                    this.props.navigation.pop();

                  case 10:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 7]],
            Promise
          );
        },
      },
      {
        key: 'startSaveFurnitures',
        value: function () {
          var t, n, module22, module50, module4;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (0 != (n = (null == (t = this.mapView) ? undefined : t.getEditFurnitureParams()) || []).length) {
                      c.next = 4;
                      break;
                    }

                    this.resetStatus();
                    return c.abrupt('return');

                  case 4:
                    if (((c.prev = 4), module393.isMiApp && !(n.length <= 10))) {
                      c.next = 11;
                      break;
                    }

                    c.next = 8;
                    return regeneratorRuntime.default.awrap(module1329.MM.saveFurnitureEditZones(module381.RSM.currentMapId, n));

                  case 8:
                    this.onMapSaveCompleted(true);
                    c.next = 19;
                    break;

                  case 11:
                    if (!((null == n ? undefined : n.length) > 0)) {
                      c.next = 19;
                      break;
                    }

                    module22 = n.length;
                    module50 = module22 <= 10;
                    module4 = n.splice(0, module22 ** 10);
                    c.next = 16;
                    return regeneratorRuntime.default.awrap(module1329.MM.saveFurnitureEditZones(module381.RSM.currentMapId, module4, module50));

                  case 16:
                    if (module50) this.onMapSaveCompleted(true);
                    c.next = 11;
                    break;

                  case 19:
                    c.next = 24;
                    break;

                  case 21:
                    c.prev = 21;
                    c.t0 = c.catch(4);
                    this.onMapSaveCompleted(false);

                  case 24:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[4, 21]],
            Promise
          );
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n,
            u,
            o = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!t) {
                      l.next = 12;
                      break;
                    }

                    if (!module1329.MM.preCheckInferZoneTagStatus() || module1329.MM.checkAllRoomTagged()) {
                      l.next = 7;
                      break;
                    }

                    if (((n = this.getAllFurnitureRects()), !((u = module1329.MM.smartInferZoneTag(n)) && Object.keys(u).length > 0))) {
                      l.next = 7;
                      break;
                    }

                    l.next = 7;
                    return regeneratorRuntime.default.awrap(module1329.MM.updateTagInfoForMap(u));

                  case 7:
                    module1329.MM.getMap(true);
                    this.waitForUpdate = true;
                    module1404.setTimeout(function () {
                      if (o.waitForUpdate) o.resetStatus();
                    }, 2e4);
                    l.next = 14;
                    break;

                  case 12:
                    this.showToast(module500.robot_communication_exception);
                    this.endLoading();

                  case 14:
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
        key: 'getAllFurnitureRects',
        value: function () {
          var t,
            n = null == (t = this.mapView) ? undefined : t.getAllFurnitureParams();
          if (!n || n.length <= 0) return [];

          for (var u = [], s = 0; s < n.length; s++) {
            var o = n[s],
              l = o[8];

            if (!(l < module1332.FurnitureType.FT_TVCABINET || l > module1332.FurnitureType.FT_DINNERTABLE)) {
              var c = o[0] / 50,
                p = o[4] / 50,
                h = o[1] / 50,
                f = o[5] / 50;

              if (c < p) {
                var v = [p, c];
                c = v[0];
                p = v[1];
              }

              if (f < h) {
                var y = [h, f];
                f = y[0];
                h = y[1];
              }

              u.push([p, c, h, f, l]);
            }
          }

          return u;
        },
      },
      {
        key: 'getFurnitureResItemByType',
        value: function (t) {
          var n = module1332.FurnitureResource[(t >> 8) & 255];
          return n ? (n.hasSubtype ? n[255 & t] : n) : null;
        },
      },
      {
        key: 'resetStatus',
        value: function () {
          this.waitForUpdate = false;
          this.endLoading();
          this.quit(true);
        },
      },
      {
        key: 'checkCanAddNew',
        value: function () {
          if (module393.isMiApp && this.state.editCount <= 0) {
            var t = {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
            };
            globals.Alert.alert(module500.map_edit_furniture_max_tip_miapp, '', [t]);
            return false;
          }

          return true;
        },
      },
      {
        key: 'setSaveButtonEnable',
        value: function () {
          var t;

          if (!(this.state.mapStatus == module381.MapStatus.None || this.state.hasEditedMap)) {
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
          if (!(null == (t = this.loadingView))) t.showWithText(module500.rubys_main_diag_update_map);
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
        key: 'getMapView',
        value: function () {
          var t = this,
            n = React.default.createElement(module1330.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1410.MapEditCommonStyles.map,
              left: module1410.MapEditCommonStyles.mapLeft,
              right: module1410.MapEditCommonStyles.mapRight,
              top: module1410.MapEditCommonStyles.mapTop,
              bottom: module1410.MapEditCommonStyles.mapBottom + 100,
              hideAccessory: true,
              mapMode: module1153.MAP_MODE_FURNITURE_EDIT,
              showFurnitureOnly: true,
              editAction: module1330.EditAction.Furniture,
              zonesHasEdited: this.state.hasEditedMap,
              eidtCountChange: this.eidtCountChange,
            });
          return this.state.mapStatus == module381.MapStatus.None ? module1410.default.getNoMapTipView(this.state.mapStatus) : n;
        },
      },
      {
        key: 'getDragFurniture',
        value: function () {
          return React.default.createElement(module1393.Furniture, {
            id: 0,
            type: (this.state.dragItemType >> 8) & 255,
            subType: 255 & this.state.dragItemType,
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
            n = [];
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_BED][module1332.BedSubType.BST_DOUBLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_BED][module1332.BedSubType.BST_SINGLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_TVCABINET]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SOFA][module1332.SofaSubType.SST_THREE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SOFA][module1332.SofaSubType.SST_DOUBLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SOFA][module1332.SofaSubType.SST_SINGLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SOFA][module1332.SofaSubType.SST_SECTIONAL]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SOFA][module1332.SofaSubType.SST_SECTIONAL_LEFT]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_DINNERTABLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_TEATABLE][module1332.TableSubType.TST_RECT]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_TEATABLE][module1332.TableSubType.TST_CIRCLE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_SHOECABINET]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_WARDROBE]);
          n.push(module1332.FurnitureResource[module1332.FurnitureType.FT_NIGHTSTAND]);
          var s = n.map(function (n, s) {
            var o = n.title.length > 3 ? 54 : 40,
              l = 'furniture_panel_item_' + s;
            return React.default.createElement(
              module12.View,
              module22.default(
                {
                  style: [
                    z.editBtnsItem,
                    {
                      width: n.imageWidth ** o,
                    },
                  ],
                  key: s,
                },
                t.panResponderDrop.panHandlers
              ),
              React.default.createElement(
                module12.Image,
                module22.default(
                  {
                    style: {
                      width: n.imageWidth,
                      height: 52,
                    },
                    resizeMode: 'contain',
                    source: n.image,
                    ref: function (u) {
                      return (t.menuItemRef[n.type] = u);
                    },
                  },
                  module391.default.getAccessibilityLabel(l)
                )
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: A(
                    A({}, z.furnitureItemText),
                    {},
                    {
                      width: n.imageWidth ** o,
                    }
                  ),
                  numberOfLines: 3,
                },
                n.title
              )
            );
          });
          return React.default.createElement(
            module12.Animated.View,
            {
              style: [
                z.editPanelView,
                {
                  backgroundColor: this.theme.furnitureEdit.editPanelBackgroud,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                horizontal: true,
                ref: function (n) {
                  return (t.scrollPan = n);
                },
                onScrollBeginDrag: function () {
                  return (t.scrolling = true);
                },
                onScrollEndDrag: function () {
                  return (t.scrolling = false);
                },
                onMomentumScrollEnd: function () {
                  if ('android' == module12.Platform.OS) t.dragItemPanMoving = false;
                },
              },
              s
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.state.mapStatus == module381.MapStatus.None || this.state.mapStatus == module381.MapStatus.Has_WithoutSegments,
            u = n ? module1410.default.getNoMapTipView(this.state.mapStatus) : this.getMapView(),
            s = this.getFurnitureEditPanel(),
            o = this.getDragFurniture(),
            l = React.default.createElement(module385.PureImageButton, {
              style: module1410.MapEditCommonStyles.refreshMapSegmentIndicator,
              image: this.theme.mapEdit.resetImg,
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
            c =
              '' +
              module500.map_edit_furniture_count_tip_miapp.templateStringWithParams({
                max: module1332.MAX_FURNITURE_EDIT_MIAPP,
                count: this.state.editCount,
              }),
            p = React.default.createElement(
              module12.Text,
              {
                style: [
                  z.countTip,
                  {
                    color: this.theme.mapTipView.textColor,
                  },
                ],
                numberOfLines: 2,
              },
              c
            ),
            h = module393.isMiApp;
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1410.MapEditCommonStyles.root,
                {
                  height: module394.MC.ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: this.theme.mapEdit.backgroundColor,
                },
              ],
            },
            u,
            this.state.showDragItem && o,
            this.state.hasEditedMap && l,
            h && p,
            !n && s,
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_forbidden_view_loading',
              closeAccessibilityLabelKey: 'map_edit_forbidden_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module500.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = V;
V.contextType = module515.AppConfigContext;
var z = module12.StyleSheet.create({
  editPanelView: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: 136,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingTop: 16,
    bottom: 20,
  },
  editBtnsItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    paddingTop: 12,
  },
  furnitureItemText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: 'white',
  },
  countTip: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 20,
    bottom: 170,
    textAlign: 'center',
    fontSize: 14,
  },
});
