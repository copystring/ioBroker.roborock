var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module391 = require('./391'),
  module390 = require('./390'),
  module515 = require('./515'),
  module418 = require('./418'),
  module1797 = require('./1797'),
  module1322 = require('./1322'),
  module1397 = require('./1397'),
  module387 = require('./387'),
  module1153 = require('./1153'),
  module1391 = require('./1391'),
  module1799 = require('./1799');

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

function D(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      C(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function B() {
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
  module393 = require('./393'),
  N = -100,
  F = -101,
  A = {
    Home: 'Home',
    MapManagement: 'MapManagement',
  };

exports.ModalMapEditMenuMode = A;

var O = (function (t) {
  module7.default(C, t);

  var module50 = C,
    module515 = B(),
    V = function () {
      var t,
        o = module11.default(module50);

      if (module515) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var n;
    module4.default(this, C);
    (n = V.call(this, t)).state = {
      selectedMapId: module381.RSM.currentMapId,
      showAddRoomView: false,
      maps: module1329.MM.maps,
    };
    n.isTitleViewHidden = false;
    n.isBottomViewHidden = false;
    n.isGotoMyMapHidden = false;
    if (t.isTitleViewHidden) n.isTitleViewHidden = t.isTitleViewHidden;
    if (t.isBottomViewHidden) n.isBottomViewHidden = t.isBottomViewHidden;
    if (t.isGotoMyMapHidden) n.isGotoMyMapHidden = t.isGotoMyMapHidden;
    n.dataProvider = module390.default.isMultiFloorSupported() ? new module1797.MultiMapDataProvider() : new module1797.SingleMapDataProvider();
    n.mapUpdated = true;
    return n;
  }

  module5.default(C, [
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
        this.mapUpdateListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapDidUpdate, function (n) {
          if (!t.mapUpdated) {
            module12.DeviceEventEmitter.emit(module418.NotificationKeys.MapManualReset);
            t.mapUpdated = true;
          }
        });
        this.multiMapsListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module418.EventKeys.MultiMapsDidReceive)
            t.setState({
              selectedMapId: module381.RSM.currentMapId,
              maps: module1329.MM.maps,
            });
          else if (n.data == module418.EventKeys.CurrentMapDidChange)
            t.setState({
              selectedMapId: module381.RSM.currentMapId,
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

              if (n.mapUpdated && module381.RSM.currentMapId == t) {
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
          if (t != module381.RSM.currentMapId)
            module381.RSM.isRunning
              ? l(F)
              : n.isLoadingMap
              ? l(N)
              : ((n.isLoadingMap = true),
                n.globalLoadingView && n.globalLoadingView.showWithText(),
                n.dataProvider
                  .loadMap(t)
                  .then(function (o) {
                    n.mapUpdated = false;
                    module1329.MM.getMap(true);
                    return n.checkMapUpdated(t);
                  })
                  .then(function () {
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MapSegmentsDidChange,
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
        var n = this;

        if (this.state.selectedMapId != t) {
          var o = function () {
            n.setState({
              selectedMapId: t,
            });
            n.loadEditingMap(t)
              .then(function () {})
              .catch(function (t) {
                n.setState({
                  selectedMapId: module381.RSM.currentMapId,
                });
                if (t != F) {
                  if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.map_reset_page_operate_fail);
                } else
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.robot_communication_exception);
                  });
              });
          };

          if (-1 == module381.RSM.currentMapId && module381.RSM.mapStatus != module381.MapStatus.None) {
            var l,
              s,
              p = {
                text: module500.localization_strings_Main_MainPage_11,
              },
              u = {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  o();
                },
              };
            if (!(null == (l = (s = this.props).alertHandler))) l.call(s, module500.delete_new_map_if_switch_map_hint, '', [p, u]);
          } else o();
        }
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
        if ((null == (o = this.globalLoadingView) || o.showWithText(), null == (l = this.dataProvider) ? undefined : l.editMapName)) {
          if (!(null == (s = (p = this.dataProvider).editMapName)))
            s.call(p, this.editingID, t, n)
              .then(function () {
                if (!(null == c.props.onEditingMapNameSuccess)) c.props.onEditingMapNameSuccess(c.editingID, t);
                module1329.MM.getMultiMaps();
              })
              .catch(function (t) {
                if (!(null == c.props.toastHandler)) c.props.toastHandler(module500.naming_failed);
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
        module387.LogEventCommon('delete_map');
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
            module1329.MM.getMultiMaps();
            if (!(null == t.props.onDeleteMapSuccess)) t.props.onDeleteMapSuccess();
          })
          .catch(function (n) {
            if (n.data && n.data.result && 'unknown_method' == n.data.result) {
              var o = {
                text: module500.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {
                  module393.closeCurrentPage();
                },
              };
              if (!(null == t.props.alertHandler)) t.props.alertHandler(module500.plugin_need_update, '', [o]);
            } else null == t.props.toastHandler || t.props.toastHandler(module500.map_object_ignore_failed);
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
        if (module390.default.isMultiFloorSupported()) {
          if (module381.RSM.isRunning && this.editingID == module381.RSM.currentMapId) {
            var n,
              o,
              l = {
                text: module500.localization_strings_Main_MainPage_11,
              },
              s = {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  var n;
                  if (!(null == (n = t.globalLoadingView))) n.showWithText();
                  t.dataProvider
                    .stopRobot()
                    .then(function () {
                      return module381.RSM.waitUntilStateIsNotLocked().then(function () {
                        t.requestDeleteMap(t.editingID);
                      });
                    })
                    .catch(function () {
                      var n;
                      if (!(null == (n = t.globalLoadingView) || null == n.hide)) n.hide();
                    });
                },
              };
            if (!(null == (n = (o = this.props).alertHandler))) n.call(o, module500.delete_map_hint_when_cleaning, '', [l, s]);
          } else {
            var p,
              u,
              c = {
                text: module500.localization_strings_Main_MainPage_11,
              },
              f = {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  t.requestDeleteMap(t.editingID);
                },
              };
            if (!(null == (p = (u = this.props).alertHandler))) p.call(u, module500.map_edit_map_edit_reset_remind, '', [c, f]);
          }
        } else {
          var h,
            M,
            _ = {
              text: module500.localization_strings_Main_MainPage_11,
            },
            w = {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.requestDeleteMap(t.editingID);
              },
            };
          if (!(null == (h = (M = this.props).alertHandler))) h.call(M, module500.map_edit_map_edit_reset_remind, '', [_, w]);
        }
      },
    },
    {
      key: 'onPressFloor',
      value: function (t) {
        var n,
          o,
          l = this;
        if (null == (n = this.props) ? undefined : n.onPressFloor) {
          if (!(null == (o = this.props)))
            o.onPressFloor(function () {
              l.loadMap(t);
            });
        } else this.loadMap(t);
      },
    },
    {
      key: 'onPressAddMap',
      value: function () {
        var t, n;

        if (module381.RSM.isRunning) {
          if (!(null == (t = (n = this.props).onPressCreateMap))) t.call(n);
          module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
            globals.showToast(module500.robot_communication_exception);
          });
        } else this.multimapHintModal.show();
      },
    },
    {
      key: 'getMainView',
      value: function () {
        var t,
          n = this,
          s = module12.Dimensions.get('window').width,
          p = (s - 24 - 4) / 4,
          u = p ** 60,
          c = this.context.theme,
          f = this.context.theme.mapEditMenu,
          S =
            module1329.MM.mapData &&
            !module1329.MM.mapData.map.isEmpty &&
            module390.default.isMultiFloorSupported() &&
            module381.RSM.mapSaveEnabled &&
            -1 == module381.RSM.currentMapId &&
            module381.RSM.mapStatus != module381.MapStatus.None,
          P = -1 == this.editingID,
          R = {
            textColor: this.context.theme.subTextColor,
            enabled: module381.RSM.mapSaveEnabled,
            fontSize: 12,
            imageWidth: u,
            imageHeight: u,
            numberOfLines: 2,
            textTop: 12,
          },
          x = (null == (t = this.state.maps) ? undefined : t.length) <= 0 && module381.RSM.mapStatus == module381.MapStatus.None,
          V = module381.RSM.mapSaveEnabled && this.state.maps && 0 == this.state.maps.length;
        if (!S && V) x = true;
        var C = React.default.createElement(
            module12.View,
            {
              style: [z.saveTipView],
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              module22.default({}, module391.default.getAccessibilityLabel('map_save_go_to_my_map'), {
                onPress: function () {
                  n.goToMyMap();
                },
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    z.myMapText,
                    {
                      color: c.mapEditMenu.titleColor,
                      fontSize: 14,
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                    },
                  ],
                  numberOfLines: 2,
                },
                module500.open_map_save_mode_tip + ' >'
              )
            )
          ),
          B = {
            fontSize: 15,
            shouldShowRightArrow: true,
            visible: true,
            shouldShowBottomLine: true,
            bottomLineStyle: {
              width: s - 40,
            },
          },
          k = module500.map_edit_ground_material_title;
        if (module390.default.isCarpetSupported() && !module390.default.isSupportFloorEdit()) k = module500.map_edit_carpet_ignore_title;
        else if (!module390.default.isCarpetSupported() && module390.default.isSupportFloorEdit()) k = module500.map_edit_floor_wood_tile;
        var N = D(
            D({}, B),
            {},
            {
              title: k,
              funcId: 'carpet_edit_entrance',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.robot_communication_exception);
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (!(null == n.props.onPressGroundEditButton)) n.props.onPressGroundEditButton();
                }
              },
              icon: f.floorIcon,
              visible: module390.default.isSupportFloorEdit() || module390.default.isCarpetSupported(),
            }
          ),
          F = D(
            D({}, B),
            {},
            {
              title: module500.map_edit_furniture_title,
              funcId: 'furniture_edit_entrance',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.robot_communication_exception);
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (!(null == n.props.onPressFurnitureEditButton)) n.props.onPressFurnitureEditButton();
                }
              },
              icon: f.furnitureIcon,
              visible: module390.default.isSupportFurniture(),
            }
          ),
          module1804 = D(
            D({}, B),
            {},
            {
              title: module500.multi_floor_rename,
              funcId: 'menu_floor_rename',
              onPress: function () {
                n.setState({
                  showAddRoomView: true,
                });
              },
              icon: f.nameIcon,
              visible: !P,
            }
          ),
          j = D(
            D({}, B),
            {},
            {
              title: module500.rubys_history_del_button,
              funcId: 'menu_floor_delete',
              onPress: function () {
                n.onTapRemoveMap();
              },
              icon: f.deleteIcon,
              visible: !P,
            }
          ),
          W = D(
            D({}, B),
            {},
            {
              title: module500.recover_selected_map_button,
              funcId: 'menu_load_map',
              onPress: function () {
                n.onTapLoadMap(n.editingID);
              },
              icon: f.loadIcon,
              visible: this.props.mode == A.MapManagement,
            }
          ),
          U = D(
            D({}, B),
            {},
            {
              title: module500.backup_map,
              funcId: 'menu_back_up_map',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.robot_communication_exception);
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (!(null == n.props.onPressBackup)) n.props.onPressBackup();
                }
              },
              icon: f.backupIcon,
              visible: module390.default.isSupportBackupMap() && !P,
            }
          ),
          K = D(
            D({}, B),
            {},
            {
              title: module500.recover_map,
              funcId: 'menu_recover_from_back_up',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module500.robot_communication_exception);
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (!(null == n.props.onPressRecoverFromBackup)) n.props.onPressRecoverFromBackup();
                }
              },
              shouldShowBottomLine: false,
              icon: f.recoverIcon,
              visible: module390.default.isSupportBackupMap() && !P,
            }
          ),
          G = u,
          q = D(
            D({}, B),
            {},
            {
              title: module500.map_edit_virtual_wall_and_forbidden_zone,
              funcId: 'virtual_wall_entrance',
              onPress: function () {
                if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                if (n.props.onPressVirtualWallButton) n.props.onPressVirtualWallButton();
              },
              icon: f.forbiddenIcon,
              visible: true,
            }
          ),
          Z = D(
            D({}, B),
            {},
            {
              title: module500.map_edit_zone,
              funcId: 'zone_edit_entrance',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (n.props.parent.toast)
                      n.props.parent.toast.setState({
                        text: module500.robot_communication_exception,
                      });
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (n.props.onPressEditZoneButton) n.props.onPressEditZoneButton();
                }
              },
              icon: f.editIcon,
              visible: module390.default.isMapSegmentSupported(),
            }
          ),
          J = D(
            D({}, B),
            {},
            {
              title: module500.map_edit_bottom_menu_order,
              funcId: 'custom_order_entrance',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1391.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (n.props.parent.toast)
                      n.props.parent.toast.setState({
                        text: module500.robot_communication_exception,
                      });
                  });
                else {
                  if (n.props.parent) null == n.props.parent.hide || n.props.parent.hide();
                  if (n.props.onPressCustomOrderButton) n.props.onPressCustomOrderButton();
                }
              },
              icon: f.orderIcon,
              visible: module390.default.isOrderCleanSupported(),
            }
          ),
          Q = [
            D(
              D({}, B),
              {},
              {
                title: module500.map_element_switcher_title,
                funcId: 'map_type_switch',
                onPress: function () {
                  if (!(null == n.props.onPressMapTypeButton)) n.props.onPressMapTypeButton();
                },
                icon: f.typeIcon,
                visible: module390.default.isSupportMainSlideForMapShow() && this.props.mode == A.Home,
              }
            ),
            q,
            Z,
            F,
            N,
            J,
            U,
            K,
            j,
            module1804,
            W,
          ].filter(function (t) {
            return t.visible;
          }),
          X = React.default.createElement(module385.InputDialog, {
            visible: this.state.showAddRoomView,
            title: module500.set_map_name,
            inputPlaceholder: module500.please_input_map_name,
            inputDefaultValue: this.currentMapName,
            warningText: module500.floor_map_name_too_long,
            onPressConfirmButton: function (t) {
              return n.onTapRoomNameConfirm.apply(n, [t]);
            },
            onPressCancelButton: function () {
              return n.onTapRoomNameCancel.apply(n, []);
            },
            warningVisibilityAdapter: function (t) {
              return !module1397.FloorMapPageUtils.isLengthValid(t);
            },
          }),
          Y = React.default.createElement(
            module12.View,
            {
              style: z.container,
            },
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_loading',
              closeAccessibilityLabelKey: 'map_edit_loading_close',
              ref: function (t) {
                n.globalLoadingView = t;
              },
              showButton: true,
              onPressCancel: function () {},
            })
          ),
          $ = React.default.createElement(module1799.MultiMapHintModal, {
            ref: function (t) {
              return (n.multimapHintModal = t);
            },
            isModal: true,
            navigator: this.props.navigator,
            onPressCreateMap: function () {
              var t;
              return null == (t = n.props) ? undefined : null == t.onPressCreateMap ? undefined : t.onPressCreateMap();
            },
          });
        return React.default.createElement(
          module12.View,
          {
            style: [
              z.mainView,
              {
                backgroundColor: c.mapEditMenu.backgroundColor,
                borderColor: c.componentBackgroundColor,
              },
            ],
          },
          React.default.createElement(module1322.SwipeDownIndicator, {
            style: {
              marginTop: 10,
            },
          }),
          !this.props.isTitleViewHidden &&
            (module381.RSM.mapSaveEnabled
              ? (function () {
                  var t = {
                      id: -1,
                      name: module500.multi_floors_change,
                    },
                    p = S ? [t].concat(module31.default(n.state.maps)) : module31.default(n.state.maps),
                    u = n.isBottomViewHidden ? 30 : 0;
                  if (x)
                    return React.default.createElement(module12.View, {
                      style: {
                        paddingBottom: u,
                      },
                    });
                  var f = module381.RSM.multiFloorEnabled && module381.RSM.mapSaveEnabled && n.state.maps && n.state.maps.length < 4,
                    w = (V || f) && module390.default.isMultiFloorSupported();
                  return React.default.createElement(
                    module12.View,
                    {
                      style: [
                        z.floorNameMenuRoot,
                        {
                          paddingBottom: u,
                        },
                      ],
                    },
                    p.map(function (t) {
                      var l = t.id == n.state.selectedMapId,
                        u = l ? c.mapEditMenu.floorNameSelectedTextColor : c.mapEditMenu.floorNameNormalTextColor,
                        f = l ? 'bold' : 'normal',
                        v = l ? 17 : 16,
                        y = s - 30 - (w ? 50 : 0) - 42 * (p.length - 1);
                      return React.default.createElement(
                        module12.View,
                        {
                          key: t.id,
                          style: {
                            minWidth: 30,
                            maxWidth: y,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: 32,
                            marginHorizontal: 6,
                            flexShrink: l ? 0 : 1,
                          },
                        },
                        React.default.createElement(
                          module12.TouchableWithoutFeedback,
                          module22.default({}, module391.default.getAccessibilityLabel('map_load_' + t.id), {
                            onPress: function () {
                              n.onPressFloor(t.id);
                            },
                          }),
                          React.default.createElement(
                            module12.Text,
                            {
                              style: {
                                fontSize: v,
                                fontWeight: f,
                                color: u,
                                alignSelf: 'center',
                              },
                              numberOfLines: 1,
                            },
                            unescape(t.name)
                          )
                        ),
                        l
                          ? React.default.createElement(module385.GradientView, {
                              colors: c.ModeSettingPanel.gradientBackground,
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
                    }),
                    w &&
                      React.default.createElement(
                        module12.View,
                        {
                          style: z.newMapEntranceView,
                        },
                        React.default.createElement(
                          module385.TopImageButton,
                          module22.default(
                            {
                              funcId: 'new_floor',
                              style: {
                                width: 20,
                                height: 20,
                              },
                              maxTextWidth: G,
                              onPress: function () {
                                return null == n.onPressAddMap ? undefined : n.onPressAddMap();
                              },
                              image: require('./1804'),
                              imageStyle: {
                                width: 20,
                                height: 20,
                                tintColor: c.mapEditMenu.floorNameSelectedTextColor,
                              },
                            },
                            module391.default.getAccessibilityLabel('new_floor', module500.new_map_entrance_in_multiMap_2)
                          )
                        )
                      )
                  );
                })()
              : C),
          !this.props.isBottomViewHidden &&
            React.default.createElement(
              module12.View,
              {
                style: z.bottomView,
              },
              Q.map(function (t, l) {
                var s, c;
                return React.default.createElement(
                  module12.View,
                  {
                    style: {
                      paddingVertical: 10,
                      alignItems: 'center',
                      width: p,
                      justifyContent: 'center',
                    },
                    key: l,
                  },
                  React.default.createElement(
                    module385.TopImageButton,
                    module22.default(
                      {
                        funcId: t.funcId,
                        style: [
                          z.bottomButton,
                          {
                            width: u,
                            height: u + 30,
                            opacity: 1,
                          },
                        ],
                        maxTextWidth: G,
                        onPress: t.onPress.bind(n),
                        image: null != (s = t.icon) ? s : n.context.theme.mapEditMenu.editOrderImg,
                        imageWrapperStyle: {
                          backgroundColor: f.iconBackgroundColor,
                          borderRadius: u / 2,
                        },
                        imageStyle: {
                          width: u / 2,
                          height: u / 2,
                          transform: [
                            {
                              rotate: null != (c = t.imageRotate) ? c : '0deg',
                            },
                          ],
                        },
                        title: t.title,
                      },
                      R
                    )
                  )
                );
              })
            ),
          !this.props.isBottomViewHidden && X,
          Y,
          $
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
          var o = module391.default.specEncode(t);

          if ('' != o) {
            var l,
              s,
              p = module1397.FloorMapPageUtils.getRealLength(o);
            if (module1397.FloorMapPageUtils.getRealLength(o) >= 30) null == (l = (s = this.props).toastHandler) || l.call(s, module500.floor_map_name_too_long);
            else this.requestEditingMapName(o, p);
          }
        } else {
          var u, c;
          if (!(null == (u = (c = this.props).toastHandler))) u.call(c, module500.name_already_exists);
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
        return module1397.FloorMapPageUtils.getRealName(
          null !=
            (t =
              null ==
              (n = module1329.MM.maps.find(function (t) {
                return t.id == o.editingID;
              }))
                ? undefined
                : n.name)
            ? t
            : ''
        );
      },
    },
  ]);
  return C;
})(React.default.Component);

O.contextType = module515.AppConfigContext;
var z = module12.StyleSheet.create({
    mainView: {
      paddingTop: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomLeftRadius: module1153.AppBorderRadius,
      borderBottomRightRadius: module1153.AppBorderRadius,
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
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
      paddingHorizontal: 12,
      paddingBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      borderRadius: 8,
    },
    bottomButton: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
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
      fontSize: module391.default.scaledPixelForPad(16),
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
    newMapEntranceView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 15,
    },
  }),
  j = module385.HocBottomModal(module1322.WithSwipeToClose(O), true);
exports.default = j;
