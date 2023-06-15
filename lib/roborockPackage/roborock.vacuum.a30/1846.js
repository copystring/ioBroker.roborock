var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module414 = require('./414'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module419 = require('./419'),
  module1269 = require('./1269'),
  module1136 = require('./1136'),
  module387 = require('./387'),
  module1265 = require('./1265'),
  module1122 = require('./1122'),
  module1055 = require('./1055');

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

var module505 = require('./505').strings,
  module393 = require('./393'),
  module1334 = require('./1334'),
  D = -100,
  H = -101,
  L = {
    Home: 'Home',
    MapManagement: 'MapManagement',
  };

exports.ModalMapEditMenuMode = L;

var A = (function (t) {
  module7.default(F, t);

  var module1121 = F,
    module1265 = C(),
    module1847 = function () {
      var t,
        n = module11.default(module1121);

      if (module1265) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function F(t) {
    var n;
    module4.default(this, F);

    (n = module1847.call(this, t)).onPressAddMap = function () {
      if (module381.RSM.isRunning) {
        if (!(null == n.props.onPressCreateMap)) n.props.onPressCreateMap();
        module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
          globals.showToast(module505.robot_communication_exception);
        });
      } else n.multimapHintModal.show();
    };

    n.onPressGoToMapSetting = function () {
      var t;
      if (!(null == (t = n.props.parent) || null == t.hide)) t.hide();
      if (!(null == n.props.onPressResetMapButton)) n.props.onPressResetMapButton();
    };

    n.onShowMapSwitchSheet = function () {
      var t;
      if (!(module414.MM.maps.length < 1 || null == (t = n.mapSelectView))) t.show();
    };

    n.onMapSwitchAction = function (t) {
      var o;
      if (!(null == (o = n.mapSelectView)))
        o.hide(function () {
          if (t && undefined !== t.id) n.onPressFloor(t.id);
        });
    };

    n.state = {
      selectedMapId: module381.RSM.currentMapId,
      showAddRoomView: false,
      maps: module414.MM.maps,
    };
    n.dataProvider = module390.default.isMultiFloorSupported() ? new module1269.MultiMapDataProvider() : new module1269.SingleMapDataProvider();
    n.mapUpdated = true;
    return n;
  }

  module5.default(F, [
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
        this.mapUpdateListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapDidUpdate, function (n) {
          if (!t.mapUpdated) {
            module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapManualReset);
            t.mapUpdated = true;
          }
        });
        this.multiMapsListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module419.EventKeys.MultiMapsDidReceive)
            t.setState({
              selectedMapId: module381.RSM.currentMapId,
              maps: module414.MM.maps,
            });
          else if (n.data == module419.EventKeys.CurrentMapDidChange)
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
          var s;
          if (t != module381.RSM.currentMapId)
            module381.RSM.isRunning
              ? l(H)
              : n.isLoadingMap
              ? l(D)
              : ((n.isLoadingMap = true),
                null == (s = n.globalLoadingView) || s.showWithText(),
                n.dataProvider
                  .loadMap(t)
                  .then(function (o) {
                    n.mapUpdated = false;
                    module414.MM.getMap(true);
                    return n.checkMapUpdated(t);
                  })
                  .then(function () {
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module419.EventKeys.MapSegmentsDidChange,
                    });
                    o();
                  })
                  .catch(function (t) {
                    l(t);
                  })
                  .finally(function () {
                    var t;
                    n.isLoadingMap = false;
                    if (!(null == (t = n.globalLoadingView) || null == t.hide)) t.hide();
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
                if (t != H) {
                  if (!(null == n.props.toastHandler)) n.props.toastHandler(module505.map_reset_page_operate_fail);
                } else
                  module1122.showFinishCurrentTastAlertIfNeeded(n.props.alertHandler).catch(function (t) {
                    if (!(null == n.props.toastHandler)) n.props.toastHandler(module505.robot_communication_exception);
                  });
              });
          };

          if (-1 == module381.RSM.currentMapId && module381.RSM.mapStatus != module381.MapStatus.None) {
            var l,
              s,
              p = {
                text: module505.localization_strings_Main_MainPage_11,
              },
              u = {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  o();
                },
              };
            if (!(null == (l = (s = this.props).alertHandler))) l.call(s, module505.delete_new_map_if_switch_map_hint, '', [p, u]);
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
                module414.MM.getMultiMaps();
              })
              .catch(function (t) {
                if (!(null == c.props.toastHandler)) c.props.toastHandler(module505.naming_failed);
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
        var t,
          n = this;
        module387.LogEventCommon('delete_map');
        if (!(null == (t = this.globalLoadingView))) t.showWithText();
        this.dataProvider
          .deleteMap(this.editingID)
          .then(function (t) {
            var o = n.state.maps.filter(function (t) {
              return t.id !== n.editingID;
            });
            n.setState({
              maps: o,
            });
            module414.MM.getMultiMaps();
            if (!(null == n.props.onDeleteMapSuccess)) n.props.onDeleteMapSuccess(n.editingID);
          })
          .catch(function (t) {
            if (t.data && t.data.result && 'unknown_method' == t.data.result) {
              var o = {
                text: module505.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {
                  module393.closeCurrentPage();
                },
              };
              if (!(null == n.props.alertHandler)) n.props.alertHandler(module505.plugin_need_update, '', [o]);
            } else null == n.props.toastHandler || n.props.toastHandler(module505.map_object_ignore_failed);
          })
          .finally(function () {
            if (n.globalLoadingView) null == n.globalLoadingView.hide || n.globalLoadingView.hide();
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
                text: module505.localization_strings_Main_MainPage_11,
              },
              s = {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
            if (!(null == (n = (o = this.props).alertHandler))) n.call(o, module505.delete_map_hint_when_cleaning, '', [l, s]);
          } else {
            var p,
              u,
              c = {
                text: module505.localization_strings_Main_MainPage_11,
              },
              f = {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  t.requestDeleteMap(t.editingID);
                },
              };
            if (!(null == (p = (u = this.props).alertHandler))) p.call(u, module505.map_edit_map_edit_reset_remind, '', [c, f]);
          }
        } else {
          var h,
            M,
            v = {
              text: module505.localization_strings_Main_MainPage_11,
            },
            w = {
              text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.requestDeleteMap(t.editingID);
              },
            };
          if (!(null == (h = (M = this.props).alertHandler))) h.call(M, module505.map_edit_map_edit_reset_remind, '', [v, w]);
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
      key: 'onTapLoadMap',
      value: function (t) {
        var n, o;
        if (this.props.onTapLoadMap) {
          if (!(null == (n = (o = this.props).onTapLoadMap))) n.call(o, t);
        } else this.loadMap(t);
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
              p = module1136.FloorMapPageUtils.getRealLength(o);
            if (module1136.FloorMapPageUtils.getRealLength(o) >= 30) null == (l = (s = this.props).toastHandler) || l.call(s, module505.floor_map_name_too_long);
            else this.requestEditingMapName(o, p);
          }
        } else {
          var u, c;
          if (!(null == (u = (c = this.props).toastHandler))) u.call(c, module505.name_already_exists);
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
      key: 'getBottomButtons',
      value: function () {
        var t = this,
          n = module505.map_edit_ground_material_title;
        if (module390.default.groundOnlySupportCarpet()) n = module505.map_edit_carpet_ignore_title;
        else if (module390.default.groundOnlySupportFloor()) n = module505.map_edit_floor_wood_tile;
        else if (module390.default.groundOnlySupportDoorSill()) n = module505.map_edit_door_sill_title;
        var o = {
            title: n,
            funcId: 'carpet_edit_entrance',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (!(null == t.props.toastHandler)) t.props.toastHandler(module505.robot_communication_exception);
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (!(null == t.props.onPressGroundEditButton)) t.props.onPressGroundEditButton();
              }
            },
            icon: this.iconTheme.floorIcon,
            visible: module390.default.isSupportFloorEdit() || module390.default.isCarpetSupported() || module390.default.isSupportCustomDoorSill(),
          },
          l = {
            title: module505.map_edit_furniture_title,
            funcId: 'furniture_edit_entrance',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (!(null == t.props.toastHandler)) t.props.toastHandler(module505.robot_communication_exception);
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (!(null == t.props.onPressFurnitureEditButton)) t.props.onPressFurnitureEditButton();
              }
            },
            icon: this.iconTheme.furnitureIcon,
            visible: module390.default.isSupportFurniture(),
          };
        return [
          {
            title: module505.map_edit_virtual_wall_and_forbidden_zone,
            funcId: 'virtual_wall_entrance',
            onPress: function () {
              if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
              if (t.props.onPressVirtualWallButton) t.props.onPressVirtualWallButton();
            },
            icon: this.iconTheme.forbiddenIcon,
            visible: true,
          },
          {
            title: module505.map_edit_zone,
            funcId: 'zone_edit_entrance',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (t.props.parent.toast)
                    t.props.parent.toast.setState({
                      text: module505.robot_communication_exception,
                    });
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (t.props.onPressEditZoneButton) t.props.onPressEditZoneButton();
              }
            },
            icon: this.iconTheme.editIcon,
            visible: module390.default.isMapSegmentSupported(),
          },
          l,
          o,
          {
            title: module505.map_edit_bottom_menu_order,
            funcId: 'custom_order_entrance',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (t.props.parent.toast)
                    t.props.parent.toast.setState({
                      text: module505.robot_communication_exception,
                    });
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (t.props.onPressCustomOrderButton) t.props.onPressCustomOrderButton();
              }
            },
            icon: this.iconTheme.orderIcon,
            visible: module390.default.isOrderCleanSupported(),
          },
          {
            title: module505.recover_selected_map_button,
            funcId: 'menu_load_map',
            onPress: function () {
              t.onTapLoadMap(t.editingID);
            },
            icon: this.iconTheme.loadIcon,
            visible: this.props.mode == L.MapManagement,
          },
        ].filter(function (t) {
          return t.visible;
        });
      },
    },
    {
      key: 'getTopButtons',
      value: function () {
        var t = this,
          n = -1 == this.editingID;
        return [
          {
            title: module505.backup_map,
            funcId: 'menu_back_up_map',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (!(null == t.props.toastHandler)) t.props.toastHandler(module505.robot_communication_exception);
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (!(null == t.props.onPressBackup)) t.props.onPressBackup();
              }
            },
            icon: this.iconTheme.backupIcon,
            visible: module390.default.isSupportBackupMap() && !n,
          },
          {
            title: module505.recover_map,
            funcId: 'menu_recover_from_back_up',
            onPress: function () {
              if (module381.RSM.isRunning)
                module1122.showFinishCurrentTastAlertIfNeeded(t.props.alertHandler).catch(function (n) {
                  if (!(null == t.props.toastHandler)) t.props.toastHandler(module505.robot_communication_exception);
                });
              else {
                if (t.props.parent) null == t.props.parent.hide || t.props.parent.hide();
                if (!(null == t.props.onPressRecoverFromBackup)) t.props.onPressRecoverFromBackup();
              }
            },
            shouldShowBottomLine: false,
            icon: this.iconTheme.recoverIcon,
            visible: module390.default.isSupportBackupMap() && !n,
          },
          {
            title: module505.multi_floor_rename,
            funcId: 'menu_floor_rename',
            onPress: function () {
              t.setState({
                showAddRoomView: true,
              });
            },
            icon: this.iconTheme.nameIcon,
            visible: !n,
          },
          {
            title: module505.map_edit_delete,
            funcId: 'menu_floor_delete',
            onPress: function () {
              t.onTapRemoveMap();
            },
            icon: this.iconTheme.deleteIcon,
            visible: !n,
          },
        ].filter(function (t) {
          return t.visible;
        });
      },
    },
    {
      key: 'getMapSaveTipView',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: [N.saveTipView],
          },
          React.default.createElement(
            module12.TouchableWithoutFeedback,
            module22.default({}, module391.default.getAccessibilityLabel('map_save_go_to_my_map'), {
              onPress: this.onPressGoToMapSetting,
            }),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  N.saveTipText,
                  {
                    color: this.iconTheme.titleColor,
                    fontSize: 14,
                    textAlignVertical: 'center',
                    alignSelf: 'center',
                  },
                ],
                numberOfLines: 2,
              },
              module505.open_map_save_mode_tip + ' >'
            )
          )
        );
      },
    },
    {
      key: 'getAddNameView',
      value: function () {
        var t = this;
        return React.default.createElement(module385.InputDialog, {
          visible: this.state.showAddRoomView,
          title: module505.set_map_name,
          inputPlaceholder: module505.please_input_map_name,
          inputDefaultValue: this.currentMapName,
          warningText: module505.floor_map_name_too_long,
          onPressConfirmButton: function (n) {
            return t.onTapRoomNameConfirm.apply(t, [n]);
          },
          onPressCancelButton: function () {
            return t.onTapRoomNameCancel.apply(t, []);
          },
          warningVisibilityAdapter: function (t) {
            return !module1136.FloorMapPageUtils.isLengthValid(t);
          },
        });
      },
    },
    {
      key: 'getLoadingView',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.View,
          {
            style: N.container,
          },
          React.default.createElement(module385.CancelableLoadingView, {
            loadingAccessibilityLabelKey: 'map_edit_loading',
            closeAccessibilityLabelKey: 'map_edit_loading_close',
            ref: function (n) {
              t.globalLoadingView = n;
            },
            showButton: true,
            onPressCancel: function () {},
          })
        );
      },
    },
    {
      key: 'getMapSwitchSheet',
      value: function () {
        var t = this;
        return React.default.createElement(module1055.MultiMapSelectView, {
          didSelectMap: this.onMapSwitchAction,
          ref: function (n) {
            return (t.mapSelectView = n);
          },
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          l = this,
          s = module12.Dimensions.get('window').width - 24 - 4,
          p = s / 4,
          u = p ** 60,
          c = u,
          b = (null == (t = this.state.maps) ? undefined : t.length) <= 0 && module381.RSM.mapStatus == module381.MapStatus.None,
          I = module381.RSM.mapSaveEnabled && this.state.maps && 0 == this.state.maps.length;
        if (!this.hasNewMap && I) b = true;
        var y,
          T,
          P,
          R,
          E,
          C,
          B = module381.RSM.multiFloorEnabled && module381.RSM.mapSaveEnabled && this.state.maps && this.state.maps.length < 4,
          D = !b && (I || B) && module390.default.isMultiFloorSupported(),
          H = this.getTopButtons(),
          L = (null == H ? undefined : H.length) ? s / H.length : 0,
          module1847 = {
            textColor: this.theme.subTextColor,
            enabled: module381.RSM.mapSaveEnabled,
            fontSize: 12,
            imageWidth: 24,
            imageHeight: 24,
            numberOfLines: 2,
            textTop: 1,
          },
          module1848 = React.default.createElement(
            module12.View,
            {
              style: [
                N.newMapEntranceView,
                {
                  borderTopColor: this.iconTheme.lineColor,
                },
              ],
            },
            React.default.createElement(
              module385.LeftImageButton,
              module22.default(
                {
                  funcId: 'new_floor',
                  style: N.newMapButton,
                  onPress: this.onPressAddMap,
                  title: module505.new_map_entrance_in_multiMap_2,
                  textLeft: 10,
                  textStyle: N.newMapText,
                  image: require('./1848'),
                  imageStyle: {
                    width: 24,
                    height: 24,
                  },
                },
                module391.default.getAccessibilityLabel('new_floor', module505.new_map_entrance_in_multiMap_2)
              )
            )
          ),
          z = (!this.props.isTitleViewHidden && !b) || (null == H ? undefined : H.length) > 0,
          W = this.getBottomButtons(),
          U = {
            textColor: this.theme.subTextColor,
            enabled: module381.RSM.mapSaveEnabled,
            fontSize: 12,
            imageWidth: u,
            imageHeight: u,
            numberOfLines: 2,
            textTop: 12,
          },
          O = this.getMapSaveTipView(),
          j = this.getAddNameView(),
          K = this.getLoadingView(),
          q = this.getMapSwitchSheet(),
          G = React.default.createElement(module1055.MultiMapHintModal, {
            ref: function (t) {
              return (l.multimapHintModal = t);
            },
            isModal: true,
            navigator: this.props.navigator,
            onPressCreateMap: function () {
              var t;
              return null == (t = l.props) ? undefined : null == t.onPressCreateMap ? undefined : t.onPressCreateMap();
            },
          });
        return React.default.createElement(
          module12.View,
          {
            style: [
              N.mainView,
              {
                backgroundColor: this.iconTheme.backgroundColor,
                borderColor: this.theme.componentBackgroundColor,
              },
            ],
          },
          React.default.createElement(module385.SwipeDownIndicator, {
            style: {
              marginTop: 10,
              marginBottom: this.props.isTitleViewHidden ? 12 : 2,
            },
          }),
          !this.props.isTitleViewHidden &&
            (module381.RSM.mapSaveEnabled
              ? ((y = {
                  id: -1,
                  name: module505.multi_floors_change,
                }),
                (T = l.hasNewMap ? [y].concat(module31.default(l.state.maps)) : module31.default(l.state.maps)),
                (P = T.find(function (t) {
                  return t.id == l.state.selectedMapId;
                })),
                (R = P ? l.currentMapSource : require('./1847')),
                (E = P ? unescape(P.name) : module505.map_edit_select_one_map),
                (C = (module414.MM.mapRotateAngle[module381.RSM.currentMapId] || 0) + 'deg'),
                b
                  ? React.default.createElement(module12.View, null)
                  : React.default.createElement(
                      module12.View,
                      {
                        style: N.floorNameMainView,
                      },
                      React.default.createElement(
                        module12.View,
                        {
                          style: N.floorNameLeftView,
                        },
                        P &&
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                N.floorImageView,
                                {
                                  backgroundColor: l.theme.pageBackgroundColor,
                                  transform: [
                                    {
                                      rotateZ: C,
                                    },
                                  ],
                                },
                              ],
                            },
                            'ios' == module12.Platform.OS
                              ? React.default.createElement(module12.Image, {
                                  style: N.floorImage,
                                  resizeMode: 'contain',
                                  source: R,
                                })
                              : React.default.createElement(module1334, {
                                  style: N.floorImageAndroid,
                                  source: R,
                                })
                          ),
                        React.default.createElement(
                          module12.Text,
                          {
                            style: [
                              N.floorText,
                              {
                                color: l.iconTheme.floorNameSelectedTextColor,
                              },
                            ],
                          },
                          E
                        )
                      ),
                      ((!P && 1 == (null == T ? undefined : T.length)) || (null == T ? undefined : T.length) > 1) &&
                        React.default.createElement(module385.PureImageButton, {
                          image: l.theme.settingListItem.rightArrowImg,
                          imageWidth: 24,
                          imageHeight: 24,
                          style: N.floorArrow,
                          imageStyle: N.arrowImage,
                          onPress: l.onShowMapSwitchSheet,
                        })
                    ))
              : O),
          !this.props.isBottomViewHidden &&
            React.default.createElement(
              module12.View,
              {
                style: N.topButtonView,
              },
              H.map(function (t, n) {
                var s;
                return React.default.createElement(
                  module385.TopImageButton,
                  module22.default(
                    {
                      key: n,
                      funcId: t.funcId,
                      style: [
                        N.topButton,
                        {
                          width: L,
                        },
                      ],
                      maxTextWidth: L - 2,
                      onPress: t.onPress.bind(l),
                      image: null != (s = t.icon) ? s : l.iconTheme.editIcon,
                      title: t.title,
                    },
                    module1847
                  )
                );
              })
            ),
          !this.props.isBottomViewHidden &&
            React.default.createElement(
              module12.View,
              {
                style: [
                  N.bottomButtonView,
                  {
                    borderTopColor: z ? l.iconTheme.lineColor : l.iconTheme.backgroundColor,
                  },
                ],
              },
              W.map(function (t, n) {
                var s, _;

                return React.default.createElement(
                  module12.View,
                  {
                    style: {
                      paddingVertical: 10,
                      alignItems: 'center',
                      width: p,
                      justifyContent: 'center',
                    },
                    key: n,
                  },
                  React.default.createElement(
                    module385.TopImageButton,
                    module22.default(
                      {
                        funcId: t.funcId,
                        style: [
                          N.bottomButton,
                          {
                            width: u,
                            height: u + 30,
                            opacity: 1,
                          },
                        ],
                        maxTextWidth: c,
                        onPress: t.onPress.bind(l),
                        image: null != (s = t.icon) ? s : l.iconTheme.editOrderImg,
                        imageWrapperStyle: {
                          backgroundColor: l.iconTheme.iconBackgroundColor,
                          borderRadius: u / 2,
                        },
                        imageStyle: {
                          width: u / 2,
                          height: u / 2,
                          transform: [
                            {
                              rotate: null != (_ = t.imageRotate) ? _ : '0deg',
                            },
                          ],
                        },
                        title: t.title,
                      },
                      U
                    )
                  )
                );
              })
            ),
          !this.props.isTitleViewHidden && D && module1848,
          !this.props.isBottomViewHidden && j,
          K,
          G,
          q
        );
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
        return module1136.FloorMapPageUtils.getRealName(
          null !=
            (t =
              null ==
              (n = module414.MM.maps.find(function (t) {
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
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
    {
      key: 'iconTheme',
      get: function () {
        return this.context.theme.mapEditMenu;
      },
    },
    {
      key: 'hasNewMap',
      get: function () {
        return (
          module414.MM.mapData &&
          !module414.MM.mapData.map.isEmpty &&
          module390.default.isMultiFloorSupported() &&
          module381.RSM.mapSaveEnabled &&
          -1 == module381.RSM.currentMapId &&
          module381.RSM.mapStatus != module381.MapStatus.None
        );
      },
    },
    {
      key: 'currentMapSource',
      get: function () {
        var t;
        return module414.MM.mapData && module414.MM.mapData.map && !module414.MM.mapData.map.isEmpty
          ? {
              uri: (null == (t = module414.MM.mapData.map.data) ? undefined : t.blockNum) <= 1 ? module414.MM.mapData.map.imageNoBlock : module414.MM.mapData.map.image,
            }
          : require('./1847');
      },
    },
  ]);
  return F;
})(React.default.Component);

A.contextType = module1121.AppConfigContext;
A.defaultProps = {
  isBottomViewHidden: false,
  isTitleViewHidden: false,
};
var N = module12.StyleSheet.create({
    mainView: {
      paddingTop: 0,
      paddingBottom: 5,
      backgroundColor: 'white',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomLeftRadius: module1265.AppBorderRadius,
      borderBottomRightRadius: module1265.AppBorderRadius,
      borderWidth: 1,
      borderColor: 'white',
    },
    bottomButtonView: {
      alignSelf: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      borderTopWidth: 1,
    },
    bottomButton: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
    },
    topButtonView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginHorizontal: 12,
      marginBottom: 6,
    },
    topButton: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
      alignItems: 'center',
      maxHeight: 64,
    },
    saveTipView: {
      marginTop: 15,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
    },
    saveTipText: {
      fontSize: module391.default.scaledPixelForPad(16),
      color: '#4A4A4A',
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
    floorNameMainView: {
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingHorizontal: 22,
      paddingVertical: 10,
    },
    floorNameLeftView: {
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    floorImageView: {
      width: 70,
      height: 70,
      padding: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: globals.isRTL ? 3 : 18,
      marginLeft: globals.isRTL ? 18 : 3,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    floorImage: {
      width: 58,
      height: 58,
    },
    floorImageAndroid: {
      width: 58,
      height: 58,
      resizeMode: 'contain',
    },
    floorArrow: {
      width: 36,
      alignSelf: 'stretch',
    },
    floorText: {
      textAlign: 'left',
      fontSize: 18,
      fontWeight: 'bold',
    },
    arrowImage: {
      transform: [
        {
          rotateY: globals.isRTL ? '180deg' : '0deg',
        },
      ],
    },
    newMapEntranceView: {
      height: 94,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
    },
    newMapText: {
      textAlign: 'left',
      color: '#007AFF',
      fontSize: 16,
    },
    newMapButton: {
      height: 24,
      backgroundColor: 'transparent',
    },
  }),
  F = module385.HocBottomModal(module385.WithSwipeToClose(A), !module393.isMiApp || 'android' != module12.Platform.OS);
exports.default = F;
