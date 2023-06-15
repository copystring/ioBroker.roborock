var module49 = require('./49'),
  module21 = require('./21'),
  module30 = require('./30'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1229 = require('./1229'),
  module387 = require('./387'),
  module386 = require('./386'),
  module506 = require('./506'),
  module411 = require('./411'),
  module1799 = require('./1799'),
  module1353 = require('./1353'),
  module1243 = require('./1243'),
  module383 = require('./383'),
  module934 = require('./934'),
  module1259 = require('./1259');

function B(t, n) {
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

function H(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      B(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      B(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function C() {
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
  module389 = require('./389'),
  k = -100,
  N = -101,
  z = {
    Home: 'Home',
    MapManagement: 'MapManagement',
  };

exports.ModalMapEditMenuMode = z;

var O = (function (t) {
  module7.default(B, t);

  var module49 = B,
    module506 = C(),
    x = function () {
      var t,
        o = module11.default(module49);

      if (module506) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function B(t) {
    var n;
    module4.default(this, B);
    (n = x.call(this, t)).state = {
      selectedMapId: module377.RSM.currentMapId,
      showAddRoomView: false,
      maps: module1229.MM.maps,
    };
    n.isTitleViewHidden = false;
    n.isBottomViewHidden = false;
    n.isGotoMyMapHidden = false;
    if (t.isTitleViewHidden) n.isTitleViewHidden = t.isTitleViewHidden;
    if (t.isBottomViewHidden) n.isBottomViewHidden = t.isBottomViewHidden;
    if (t.isGotoMyMapHidden) n.isGotoMyMapHidden = t.isGotoMyMapHidden;
    n.dataProvider = module386.default.isMultiFloorSupported() ? new module1799.MultiMapDataProvider() : new module1799.SingleMapDataProvider();
    n.mapUpdated = true;
    return n;
  }

  module5.default(B, [
    {
      key: 'editingID',
      get: function () {
        return undefined != this.props.editingId ? this.props.editingId : this.state.selectedMapId;
      },
    },
    {
      key: 'currentMapName',
      get: function () {
        var t,
          n,
          o = this;
        return module1243.FloorMapPageUtils.getRealName(
          null !=
            (t =
              null ==
              (n = module1229.MM.maps.find(function (t) {
                return t.id == o.editingID;
              }))
                ? undefined
                : n.name)
            ? t
            : ''
        );
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.mapUpdateListener.remove();
        this.multiMapsListener.remove();
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.mapUpdateListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
          if (!t.mapUpdated) {
            module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapManualReset);
            t.mapUpdated = true;
          }
        });
        this.multiMapsListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module411.EventKeys.MultiMapsDidReceive)
            t.setState({
              selectedMapId: module377.RSM.currentMapId,
              maps: module1229.MM.maps,
            });
          else if (n.data == module411.EventKeys.CurrentMapDidChange)
            t.setState({
              selectedMapId: module377.RSM.currentMapId,
            });
        });
      },
    },
    {
      key: 'checkMapUpdated',
      value: function (t) {
        var n = this;
        return new Promise(function (o, l) {
          var s = 0,
            p = setInterval(function () {
              if (s > 15) {
                clearInterval(p);
                l();
              }

              if (n.mapUpdated && module377.RSM.currentMapId == t) {
                clearInterval(p);
                o();
              } else s++;
            }, 300);
        });
      },
    },
    {
      key: 'loadEditingMap',
      value: function (t) {
        var n = this;
        return new Promise(function (o, l) {
          if (t != module377.RSM.currentMapId)
            module377.RSM.isRunning
              ? l(N)
              : n.isLoadingMap
              ? l(k)
              : ((n.isLoadingMap = true),
                n.globalLoadingView && n.globalLoadingView.showWithText(),
                n.dataProvider
                  .loadMap(t)
                  .then(function (o) {
                    n.mapUpdated = false;
                    module1229.MM.getMap(true);
                    return n.checkMapUpdated(t);
                  })
                  .then(function () {
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    o();
                  })
                  .catch(function (t) {
                    l(t);
                  })
                  .finally(function () {
                    n.isLoadingMap = false;
                    if (n.globalLoadingView) null == n.globalLoadingView.hide || n.globalLoadingView.hide();
                  }));
          else o();
        });
      },
    },
    {
      key: 'loadMap',
      value: function (t) {
        var n = this,
          o = function () {
            n.setState({
              selectedMapId: t,
            });
            n.loadEditingMap(t)
              .then(function () {})
              .catch(function (t) {
                n.setState({
                  selectedMapId: module377.RSM.currentMapId,
                });
                if (t != N) {
                  if (!(null == n.props.toastHandler)) n.props.toastHandler(module491.map_reset_page_operate_fail);
                } else
                  module1259.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module491.robot_communication_exception);
                  });
              });
          };

        if (-1 == module377.RSM.currentMapId && module377.RSM.mapStatus != module377.MapStatus.None) {
          var l,
            s,
            p = {
              text: module491.localization_strings_Main_MainPage_11,
            },
            u = {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                o();
              },
            };
          if (!(null == (l = (s = this.props).alertHandler))) l.call(s, module491.delete_new_map_if_switch_map_hint, '', [p, u]);
        } else o();
      },
    },
    {
      key: 'requestEditingMapName',
      value: function (t, n) {
        var o,
          l,
          s,
          p,
          u,
          c = this;
        if ((null == (o = this.globalLoadingView) || o.showWithText(), null != (l = this.dataProvider) && l.editMapName)) {
          if (!(null == (s = (p = this.dataProvider).editMapName)))
            s.call(p, this.editingID, t, n)
              .then(function () {
                if (!(null == c.props.onEditingMapNameSuccess)) c.props.onEditingMapNameSuccess(c.editingID, t);
                module1229.MM.getMultiMaps();
              })
              .catch(function (t) {
                if (!(null == c.props.toastHandler)) c.props.toastHandler(module491.naming_failed);
              })
              .finally(function () {
                var t;
                if (!(null == (t = c.globalLoadingView) || null == t.hide)) t.hide();
              });
        } else if (!(null == (u = this.globalLoadingView) || null == u.hide)) u.hide();
      },
    },
    {
      key: 'requestDeleteMap',
      value: function () {
        var t = this;
        module383.LogEventCommon('delete_map');
        if (this.globalLoadingView) this.globalLoadingView.showWithText();
        this.dataProvider
          .deleteMap(this.editingID)
          .then(function (n) {
            var o = t.state.maps.filter(function (n) {
              return n.id !== t.editingID;
            });
            t.setState({
              maps: o,
            });
            if (t.state.multiFloorFeatureEnabled) module1229.MM.getMultiMaps();
            else {
              module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                data: module411.EventKeys.MapSegmentsDidChange,
                sender: t,
              });
              module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                data: module411.EventKeys.SegmentCustomModeDidChange,
              });
            }
            if (!(null == t.props.onDeleteMapSuccess)) t.props.onDeleteMapSuccess();
          })
          .catch(function (n) {
            if (n.data && n.data.result && 'unknown_method' == n.data.result) {
              var o = {
                text: module491.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {
                  module389.closeCurrentPage();
                },
              };
              if (!(null == t.props.alertHandler)) t.props.alertHandler(module491.plugin_need_update, '', [o]);
            } else null == t.props.toastHandler || t.props.toastHandler(module491.map_object_ignore_failed);
          })
          .finally(function () {
            if (t.globalLoadingView) null == t.globalLoadingView.hide || t.globalLoadingView.hide();
          });
      },
    },
    {
      key: 'onTapRemoveMap',
      value: function () {
        var t = this;
        if (module386.default.isMultiFloorSupported()) {
          if (module377.RSM.isRunning && this.editingID == module377.RSM.currentMapId) {
            var n,
              o,
              l = {
                text: module491.localization_strings_Main_MainPage_11,
              },
              s = {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  var n;
                  if (!(null == (n = t.globalLoadingView))) n.showWithText();
                  t.dataProvider
                    .stopRobot()
                    .then(function () {
                      return module377.RSM.waitUntilStateIsNotLocked().then(function () {
                        t.requestDeleteMap(t.editingID);
                      });
                    })
                    .catch(function () {
                      var n;
                      if (!(null == (n = t.globalLoadingView) || null == n.hide)) n.hide();
                    });
                },
              };
            if (!(null == (n = (o = this.props).alertHandler))) n.call(o, module491.delete_map_hint_when_cleaning, '', [l, s]);
          } else {
            var p,
              u,
              c = {
                text: module491.localization_strings_Main_MainPage_11,
              },
              f = {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  t.requestDeleteMap(t.editingID);
                },
              };
            if (!(null == (p = (u = this.props).alertHandler))) p.call(u, module491.map_edit_map_edit_reset_remind, '', [c, f]);
          }
        } else {
          var h,
            M,
            _ = {
              text: module491.localization_strings_Main_MainPage_11,
            },
            v = {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.requestDeleteMap(t.editingID);
              },
            };
          if (!(null == (h = (M = this.props).alertHandler))) h.call(M, module491.map_edit_map_edit_reset_remind, '', [_, v]);
        }
      },
    },
    {
      key: 'onPressFloor',
      value: function (t) {
        var n,
          o,
          l = this;
        if (null != (n = this.props) && n.onPressFloor) {
          if (!(null == (o = this.props)))
            o.onPressFloor(function () {
              l.loadMap(t);
            });
        } else this.loadMap(t);
      },
    },
    {
      key: 'getMainView',
      value: function () {
        var t,
          n,
          s,
          p = this,
          u = this.context.theme,
          c = module386.default.isMapSegmentSupported(),
          f = module386.default.isCarpetSupported(),
          b = module386.default.shouldRotateMap(),
          E = module386.default.isSupportFurniture(),
          R =
            module1229.MM.mapData &&
            !module1229.MM.mapData.map.isEmpty &&
            module386.default.isMultiFloorSupported() &&
            module377.RSM.mapSaveEnabled &&
            module377.RSM.mapStatus != module377.MapStatus.None &&
            !module377.RSM.isRunning &&
            -1 == module377.RSM.currentMapId &&
            module377.RSM.state != module377.RobotState.LOCKED,
          I = R,
          x = {
            textColor: this.context.theme.subTextColor,
            enabled: module377.RSM.mapSaveEnabled,
            fontSize: 12,
            imageWidth: 56,
            imageHeight: 56,
            numberOfLines: 2,
            textTop: 12,
          },
          B = module1229.MM.maps.length <= 0,
          C = React.default.createElement(
            module12.View,
            {
              style: [F.saveTipView],
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              module21.default({}, module387.default.getAccessibilityLabel('map_save_go_to_my_map'), {
                onPress: function () {
                  p.goToMyMap();
                },
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    F.myMapText,
                    {
                      color: u.mapEditMenu.titleColor,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                    },
                  ],
                  numberOfLines: 2,
                },
                module491.open_map_save_mode_tip + ' >'
              )
            )
          ),
          L = {
            fontSize: 15,
            shouldShowRightArrow: true,
            visible: true,
            shouldShowBottomLine: true,
            bottomLineStyle: {
              width: module12.Dimensions.get('window').width - 2 * this.getMarginHorizontal() - 40,
            },
          },
          k = H(
            H({}, L),
            {},
            {
              title: module491.map_edit_carpet_ignore_title,
              funcId: 'carpet_edit_entrance',
              onPress: function () {
                if (module377.RSM.isRunning)
                  module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                    if (!(null == p.props.toastHandler)) p.props.toastHandler(module491.robot_communication_exception);
                  });
                else {
                  if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                  if (p.props.onPressCarpetEditButton) p.props.onPressCarpetEditButton();
                }
              },
            }
          ),
          N = H(
            H({}, L),
            {},
            {
              title: module491.map_edit_rotate_map_title,
              funcId: 'rotate_map_entrance',
              onPress: function () {
                if (module377.RSM.isRunning)
                  module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                    if (!(null == p.props.toastHandler)) p.props.toastHandler(module491.robot_communication_exception);
                  });
                else {
                  if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                  if (p.props.onPressRotateMapButton) p.props.onPressRotateMapButton();
                }
              },
            }
          ),
          O = H(
            H({}, L),
            {},
            {
              title: module491.map_edit_furniture_title,
              funcId: 'furniture_edit_entrance',
              onPress: function () {
                if (module377.RSM.isRunning)
                  module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                    if (!(null == p.props.toastHandler)) p.props.toastHandler(module491.robot_communication_exception);
                  });
                else {
                  if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                  if (!(null == p.props.onPressFurnitureEditButton)) p.props.onPressFurnitureEditButton();
                }
              },
            }
          ),
          A = H(
            H({}, L),
            {},
            {
              title: module491.multi_floor_rename,
              funcId: 'menu_floor_rename',
              onPress: function () {
                p.setState({
                  showAddRoomView: true,
                });
              },
            }
          ),
          W = H(
            H({}, L),
            {},
            {
              title: module491.rubys_history_del_button,
              funcId: 'menu_floor_delete',
              onPress: function () {
                p.onTapRemoveMap();
              },
              shouldShowBottomLine: false,
            }
          ),
          j = H(
            H({}, L),
            {},
            {
              title: module491.map_edit_title,
              funcId: 'menu_go_to_multifloor',
              detail: R ? module491.found_new_map : null,
              detailWidth: 120,
              onPress: function () {
                p.goToMyMap();
              },
              shouldShowRedPoint: R,
              shouldShowBottomLine: false,
            }
          ),
          U = H(
            H({}, L),
            {},
            {
              title: module491.recover_selected_map_button,
              funcId: 'menu_load_map',
              onPress: function () {
                p.onTapLoadMap(p.editingID);
              },
              shouldShowBottomLine: false,
            }
          ),
          K = React.default.createElement(
            module12.View,
            {
              style: {
                marginTop: 10,
                marginBottom: 0,
                marginHorizontal: 15,
                borderRadius: 8,
                overflow: 'hidden',
              },
            },
            E &&
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, O, {
                  key: 0,
                })
              ),
            f &&
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, k, {
                  key: 1,
                })
              ),
            b &&
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, N, {
                  key: 2,
                })
              ),
            React.default.createElement(
              module381.SettingListItemView,
              module21.default({}, A, {
                key: 3,
              })
            ),
            React.default.createElement(
              module381.SettingListItemView,
              module21.default({}, W, {
                key: 4,
              })
            )
          ),
          q = React.default.createElement(
            module12.View,
            {
              style: {
                marginTop: 10,
                marginBottom: 34,
                marginHorizontal: 15,
                borderRadius: 8,
                overflow: 'hidden',
              },
            },
            this.props.mode == z.Home &&
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, j, {
                  key: 0,
                })
              ),
            this.props.mode == z.MapManagement &&
              this.props.showRecoverButton &&
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, U, {
                  key: 1,
                })
              )
          ),
          G = module12.Dimensions.get('window').width - 2 * this.getMarginHorizontal(),
          Z = G / this.getIconNumber() - 6,
          J = React.default.createElement(module381.InputDialog, {
            visible: this.state.showAddRoomView,
            title: module491.set_map_name,
            inputPlaceholder: module491.please_input_map_name,
            inputDefaultValue: this.currentMapName,
            warningText: module491.floor_map_name_too_long,
            onPressConfirmButton: function (t) {
              return p.onTapRoomNameConfirm.apply(p, [t]);
            },
            onPressCancelButton: function () {
              return p.onTapRoomNameCancel.apply(p, []);
            },
            warningVisibilityAdapter: function (t) {
              return !module1243.FloorMapPageUtils.isLengthValid(t);
            },
          }),
          Q = React.default.createElement(
            module12.View,
            {
              style: F.container,
            },
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_loading',
              closeAccessibilityLabelKey: 'map_edit_loading_close',
              ref: function (t) {
                p.globalLoadingView = t;
              },
              showButton: true,
              onPressCancel: function () {},
            })
          );
        return React.default.createElement(
          module12.View,
          {
            style: [
              F.mainView,
              {
                backgroundColor: u.mapEditMenu.backgroundColor,
                borderColor: u.componentBackgroundColor,
              },
            ],
          },
          React.default.createElement(module1353.SwipeDownIndicator, {
            style: {
              marginTop: 10,
            },
          }),
          !this.props.isTitleViewHidden &&
            (module377.RSM.mapSaveEnabled
              ? ((t = {
                  id: -1,
                  name: module491.multi_floors_change,
                }),
                (n = I ? [t].concat(module30.default(p.state.maps)) : p.state.maps),
                (s = p.isBottomViewHidden ? 30 : 0),
                B
                  ? React.default.createElement(module12.View, {
                      style: {
                        paddingBottom: s,
                      },
                    })
                  : React.default.createElement(
                      module12.View,
                      {
                        style: [
                          F.floorNameMenuRoot,
                          {
                            paddingBottom: s,
                          },
                        ],
                      },
                      n.map(function (t) {
                        var l = t.id == p.state.selectedMapId,
                          s = l ? u.mapEditMenu.floorNameSelectedTextColor : u.mapEditMenu.floorNameNormalTextColor,
                          c = l ? 'bold' : 'normal',
                          f = l ? 17 : 16,
                          w = module12.Dimensions.get('window').width - 30 - 46 * (n.length - 1);
                        return React.default.createElement(
                          module12.View,
                          {
                            key: t.id,
                            style: {
                              minWidth: 30,
                              maxWidth: w,
                              flexDirection: 'column',
                              justifyContent: 'center',
                              height: 32,
                              marginHorizontal: 8,
                              flexShrink: l ? 0 : 1,
                            },
                          },
                          React.default.createElement(
                            module12.TouchableWithoutFeedback,
                            module21.default({}, module387.default.getAccessibilityLabel('map_load_' + t.id), {
                              onPress: function () {
                                p.onPressFloor(t.id);
                              },
                            }),
                            React.default.createElement(
                              module12.Text,
                              {
                                style: {
                                  fontSize: f,
                                  fontWeight: c,
                                  color: s,
                                  alignSelf: 'center',
                                },
                                numberOfLines: 1,
                              },
                              unescape(t.name)
                            )
                          ),
                          l
                            ? React.default.createElement(module381.GradientView, {
                                colors: u.ModeSettingPanel.gradientBackground,
                                start: {
                                  x: 0,
                                  y: 0,
                                },
                                end: {
                                  x: 1,
                                  y: 0,
                                },
                                style: {
                                  marginTop: 6,
                                  height: 2,
                                },
                              })
                            : React.default.createElement(module12.View, {
                                style: {
                                  marginTop: 6,
                                  height: 2,
                                },
                              })
                        );
                      })
                    ))
              : C),
          !this.props.isBottomViewHidden &&
            React.default.createElement(
              module12.View,
              {
                style: [
                  F.bottomView,
                  {
                    width: G,
                    paddingVertical: this.props.isTitleViewHidden ? 10 : 0,
                    backgroundColor: u.componentBackgroundColor,
                    paddingBottom: 10,
                    paddingTop: 20,
                    borderRadius: 8,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: F.buttonViewButton,
                },
                React.default.createElement(
                  module381.TopImageButton,
                  module21.default(
                    {
                      funcId: 'virtual_wall_entrance',
                      style: F.bottomButton,
                      maxTextWidth: Z,
                      onPress: function () {
                        if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                        if (p.props.onPressVirtualWallButton) p.props.onPressVirtualWallButton();
                      },
                      image: this.context.theme.mapEditMenu.fbzImg,
                      title: module491.map_edit_virtual_wall_and_forbidden_zone,
                    },
                    x
                  )
                )
              ),
              c
                ? React.default.createElement(
                    module12.View,
                    {
                      style: F.buttonViewButton,
                    },
                    React.default.createElement(
                      module381.TopImageButton,
                      module21.default(
                        {
                          funcId: 'zone_edit_entrance',
                          style: [
                            F.bottomButton,
                            {
                              opacity: module377.RSM.isRunning ? 0.3 : 1,
                            },
                          ],
                          maxTextWidth: Z,
                          onPress: function () {
                            if (module377.RSM.isRunning)
                              module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                                if (p.props.parent.toast)
                                  p.props.parent.toast.setState({
                                    text: module491.robot_communication_exception,
                                  });
                              });
                            else {
                              if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                              if (p.props.onPressEditZoneButton) p.props.onPressEditZoneButton();
                            }
                          },
                          image: this.context.theme.mapEditMenu.editZoneImg,
                          title: module491.map_edit_zone,
                        },
                        x
                      )
                    )
                  )
                : null,
              module386.default.isCustomModeSupported() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: F.buttonViewButton,
                  },
                  React.default.createElement(
                    module381.TopImageButton,
                    module21.default(
                      {
                        funcId: 'custom_mode_entrance',
                        style: [
                          F.bottomButton,
                          {
                            opacity: module377.RSM.isRunning ? 0.3 : 1,
                          },
                        ],
                        maxTextWidth: Z,
                        onPress: function () {
                          if (module377.RSM.isRunning)
                            module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                              if (p.props.parent.toast)
                                p.props.parent.toast.setState({
                                  text: module491.robot_communication_exception,
                                });
                            });
                          else {
                            if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                            if (p.props.onPressCustomModeButton) p.props.onPressCustomModeButton();
                          }
                        },
                        image: this.context.theme.mapEditMenu.customModeImg,
                        title: module491.map_edit_bottom_menu_mode,
                      },
                      x
                    )
                  )
                ),
              module386.default.isOrderCleanSupported() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: F.buttonViewButton,
                  },
                  React.default.createElement(
                    module381.TopImageButton,
                    module21.default(
                      {
                        funcId: 'custom_order_entrance',
                        style: [
                          F.bottomButton,
                          {
                            opacity: module377.RSM.isRunning ? 0.3 : 1,
                          },
                        ],
                        maxTextWidth: Z,
                        onPress: function () {
                          if (module377.RSM.isRunning)
                            module1259.showFinishCurrentTastAlertIfNeeded(p.props.alertHandler).catch(function (t) {
                              if (p.props.parent.toast)
                                p.props.parent.toast.setState({
                                  text: module491.robot_communication_exception,
                                });
                            });
                          else {
                            if (p.props.parent) null == p.props.parent.hide || p.props.parent.hide();
                            if (p.props.onPressCustomOrderButton) p.props.onPressCustomOrderButton();
                          }
                        },
                        image: this.context.theme.mapEditMenu.editOrderImg,
                        title: module491.map_edit_bottom_menu_order,
                      },
                      x
                    )
                  )
                )
            ),
          !this.props.isBottomViewHidden && -1 != this.editingID && K,
          !this.props.isBottomViewHidden && q,
          !this.props.isBottomViewHidden && J,
          Q
        );
      },
    },
    {
      key: 'onTapRoomNameConfirm',
      value: function (t) {
        var n = this;

        if (
          (this.setState({
            showAddRoomView: false,
          }),
          undefined ==
            this.state.maps
              .filter(function (t) {
                return t.id != n.state.selectedMapId;
              })
              .map(function (t) {
                return t.name;
              })
              .find(function (n) {
                return n == t;
              }))
        ) {
          var o = module387.default.specEncode(t);

          if ('' != o) {
            var l,
              s,
              p = module1243.FloorMapPageUtils.getRealLength(o);
            if (module1243.FloorMapPageUtils.getRealLength(o) >= 30) null == (l = (s = this.props).toastHandler) || l.call(s, module491.floor_map_name_too_long);
            else this.requestEditingMapName(o, p);
          }
        } else {
          var u, c;
          if (!(null == (u = (c = this.props).toastHandler))) u.call(c, module491.name_already_exists);
        }
      },
    },
    {
      key: 'onTapRoomNameCancel',
      value: function () {
        this.setState({
          showAddRoomView: false,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        return this.getMainView();
      },
    },
    {
      key: 'getMarginHorizontal',
      value: function () {
        return 15;
      },
    },
    {
      key: 'getIconNumber',
      value: function () {
        var t = 1;
        if (module386.default.isMapSegmentSupported()) t++;
        if (module386.default.isCustomModeSupported()) t++;
        if (module386.default.isOrderCleanSupported()) t++;
        return t;
      },
    },
    {
      key: 'onTapLoadMap',
      value: function (t) {
        var n, o;
        if (this.props.onTapLoadMap) {
          if (!(null == (n = (o = this.props).onTapLoadMap))) n.call(o, t);
        } else this.loadMap(t);
      },
    },
    {
      key: 'goToMyMap',
      value: function () {
        var t, n;
        if (this.props.parent) null == (t = (n = this.props.parent).hide) || t.call(n);
        if (this.props.onPressResetMapButton) this.props.onPressResetMapButton();
      },
    },
  ]);
  return B;
})(React.default.Component);

O.contextType = module506.AppConfigContext;
var F = module12.StyleSheet.create({
    mainView: {
      paddingTop: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomLeftRadius: module934.AppBorderRadius,
      borderBottomRightRadius: module934.AppBorderRadius,
      borderWidth: 1,
      borderColor: 'white',
    },
    buttonViewButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    bottomView: {
      marginTop: 22,
      marginBottom: 5,
      alignSelf: 'center',
      paddingHorizontal: (module387.default.isShareUser(), 0),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomButton: {
      width: 86,
      flex: 0,
      justifyContent: 'flex-start',
      paddingHorizontal: 3,
    },
    myMapButton: {
      height: 50,
    },
    myMapButtonOutView: {
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    saveTipView: {
      marginTop: 15,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
    },
    myMapText: {
      fontSize: module387.default.scaledPixelForPad(16),
      color: '#4A4A4A',
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
    floorNameMenuRoot: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 15,
    },
  }),
  A = module381.HocBottomModal(module1353.WithSwipeToClose(O), true);
exports.default = A;
