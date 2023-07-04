var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module387 = require('./387'),
  module407 = require('./407'),
  module386 = require('./386'),
  module381 = require('./381'),
  module1345 = require('./1345'),
  module390 = require('./390'),
  module1233 = require('./1233'),
  module506 = require('./506');

function B(t, n) {
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

function k(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      B(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      B(Object(s)).forEach(function (n) {
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

var module1249 = require('./1249'),
  module491 = require('./491').strings,
  module936 = require('./936'),
  L = (function (t) {
    module7.default(L, t);

    var module49 = L,
      module506 = T(),
      B = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var n;
      module4.default(this, L);

      (n = B.call(this, t)).onOverTimer = function () {
        globals.showToast(module491.map_object_ignore_failed);
      };

      n.mapCarpetFocus = function (t, o, u) {
        var c;
        if (u) n.ignoreFocusId = t;
        else n.addFocusId = t;
        var p = u
            ? {
                cusCarpetEdited: false,
              }
            : {
                ignoreCarpetEdited: false,
              },
          l = module21.default(p, {
            editAction: u ? module1233.EditAction.Ignore : module1233.EditAction.AddCarpet,
          });
        n.setState(l, function () {
          var t;
          if (!(null == (t = n.mapView))) t.clearCarpetFbzFocus(u);
        });
        if (!(null == (c = n.editMenu))) c.showCarpetConfirmMenu(u ? module1233.EditAction.Ignore : module1233.EditAction.AddCarpet, !o);
      };

      n.resetAllCarpetStatus = function (t) {
        n.setState(
          {
            editAction: '',
            ignoreCarpetEdited: false,
            cusCarpetEdited: false,
          },
          function () {
            var o, s, u;
            if (!(null == (o = n.mapView))) o.clearCarpetFbzFocus(false);
            if (!(null == (s = n.mapView))) s.clearCarpetFbzFocus(true);
            if (!(null == (u = n.editMenu))) u.hideConfirmMenu();
            if (!t) n.endLoading();
            if (t) t();
          }
        );
      };

      n.onPressCancelButtonForAdd = function () {
        n.addFocusId = 0;
        n.setState(
          {
            editAction: '',
            cusCarpetEdited: false,
          },
          function () {
            var t, o;
            if (!(null == (t = n.mapView))) t.clearCarpetFbzFocus(true);
            if (!(null == (o = n.editMenu))) o.hideConfirmMenu();
          }
        );
      };

      n.onPressConfirmButtonForAdd = function () {
        n.trySavingAddChanges(true);
      };

      n.onPressDeleteButtonForAdd = function () {
        n.trySavingAddChanges(false);
      };

      n.onPressCancelButtonForIgnore = function () {
        n.ignoreFocusId = 0;
        n.setState(
          {
            editAction: '',
            ignoreCarpetEdited: false,
          },
          function () {
            var t, o;
            if (!(null == (t = n.mapView))) t.clearCarpetFbzFocus(false);
            if (!(null == (o = n.editMenu))) o.hideConfirmMenu();
          }
        );
      };

      n.onPressConfirmButtonForIgnore = function () {
        if (n.ignoreFocusId) n.trySavingChanges(true, n.ignoreFocusId);
      };

      n.onPressDeleteButtonForIgnore = function () {
        if (n.ignoreFocusId) n.trySavingChanges(false, n.ignoreFocusId);
      };

      n.state = {
        mapStatus: module377.RSM.mapStatus,
        editAction: '',
        ignoreCarpetEdited: false,
        cusCarpetEdited: false,
      };
      return n;
    }

    module5.default(L, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.carpetRect = this.props.navigation.getParam('carpetRect', null);
          this.carpetEditMode = this.props.navigation.getParam('action', module377.CarpetEditMode.CarpetIgnore);
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
                    this.initMapView();
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
          module1233.MapEditCommonService.setNavigation(this, null, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'initMapView',
        value: function () {
          if (this.mapView) {
            var t = module1231.MM.mapData;
            this.mapView.setState(k({}, t));
          }
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            if (t.mapView)
              t.mapView.setState(
                k(
                  k({}, module1231.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );

            if (t.waitForUpdate) {
              t.resetAllCarpetStatus(null);
              t.waitForUpdate = false;
            }
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapEditDidChange, function (n) {
            if (!(n.data != module1233.FbzType.FBZ_TYPE_CARPET && n.data != module1233.FbzType.RECT_TYPE_CARPET))
              t.setState({
                ignoreCarpetEdited: n.data == module1233.FbzType.FBZ_TYPE_CARPET,
                cusCarpetEdited: n.data == module1233.FbzType.RECT_TYPE_CARPET,
              });
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.mapEditDidChange) this.mapEditDidChange.remove();
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          this.quit();
        },
      },
      {
        key: 'onPressAddCarpetButton',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (null != (t = this.mapView) && t.isCarpetReachMaxNum(true)) globals.showToast(module491.map_edit_carpet_zone_exceed_limit);
                    else this._onPressAddButton(module1233.EditAction.AddCarpet);

                  case 1:
                  case 'end':
                    return n.stop();
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
        key: 'onPressIgnoreCarpetButton',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (null != (t = this.mapView) && t.isCarpetReachMaxNum(false)) globals.showToast(module491.map_edit_carpet_zone_exceed_limit);
                    else this._onPressAddButton(module1233.EditAction.Ignore);

                  case 1:
                  case 'end':
                    return n.stop();
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
        key: 'quit',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.endEditMap());

                  case 3:
                    t.next = 8;
                    break;

                  case 5:
                    t.prev = 5;
                    t.t0 = t.catch(0);
                    console.log('end carpet map error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 8:
                    this.props.navigation.pop();

                  case 9:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 5]],
            Promise
          );
        },
      },
      {
        key: 'trySavingAddChanges',
        value: function (t) {
          var n, o, s;
          if (t && null != (n = this.mapView) && n.isCustomCarpetOverlap()) globals.showToast(module491.map_edit_carpet_overlap_tip);
          else if (t && null != (o = this.mapView) && o.isCustomCarpetRectUnknown()) globals.showToast(module491.map_edit_carpet_unknown_tip);
          else {
            var u = null == (s = this.mapView) ? undefined : s.getCarpetZonesParams(true, t ? -1 : this.addFocusId);
            if (null == u) u = [];
            this.saveChangedParams(u);
          }
        },
      },
      {
        key: 'trySavingChanges',
        value: function (t, n) {
          var o,
            s = this;
          if (t && null != (o = this.mapView) && o.isIgnoreCarpetOverlap()) globals.showToast(module491.map_edit_carpet_overlap_tip);
          else {
            var u = t ? module491.map_edit_carpet_ignore_confirm_ignore : module491.map_edit_carpet_ignore_confirm_cancel,
              c = {
                text: module491.localization_strings_Main_MainPage_11,
              },
              p = {
                text: module491.rubys_location_confirm_button_confirm,
                onPress: function () {
                  var o,
                    u = null == (o = s.mapView) ? undefined : o.getCarpetZonesParams(false, t ? -1 : n);
                  if (null == u) u = [];
                  s.saveChangedParams(u);
                },
              };
            if (globals.Alert) globals.Alert.alert(u, '', [c, p]);
          }
        },
      },
      {
        key: 'saveChangedParams',
        value: function (t) {
          var n = module377.RSM.currentMapId;
          if (module386.default.isMultiFloorSupported())
            this.state.mapStatus != module377.MapStatus.None && module1231.MM.maps.length >= 1 && -1 == n
              ? globals.showToast(module491.no_map_status_description)
              : 1 == module1231.MM.maps.length && 1 == module1231.MM.mapCountMax
              ? ((n = module1231.MM.maps[0].id), this.startMapSave(n, t))
              : this.startMapSave(n, t);
          else this.startMapSave(n, t);
        },
      },
      {
        key: 'startMapSave',
        value: function (t, n) {
          var o = this;
          module1249.setTimeout(function () {
            return o.startLoading();
          }, 300);
          if (this.state.editAction == module1233.EditAction.Ignore)
            module1249.setTimeout(function () {
              return module1231.MM.saveCarpetIgnoreZone(t, n, o.onMapSaveCompleted.bind(o));
            }, 500);
          else if (this.state.editAction == module1233.EditAction.AddCarpet)
            module1249.setTimeout(function () {
              return module1231.MM.saveCarpetAddedZone(t, 1, n, o.onMapSaveCompleted.bind(o));
            }, 500);
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;

          if (t) {
            module1231.MM.getMap(true);
            this.waitForUpdate = true;
            module1249.setTimeout(function () {
              if (n.waitForUpdate) {
                n.resetAllCarpetStatus(null);
                n.waitForUpdate = false;
              }
            }, 2e4);
          } else {
            globals.showToast(module491.robot_communication_exception);
            this.endLoading();
          }
        },
      },
      {
        key: '_onPressAddButton',
        value: function (t) {
          var o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.setState(
                      {
                        editAction: t,
                      },
                      function () {
                        var n, s;
                        if (!(null == (n = o.mapView))) n.addCarpetNewZone(t == module1233.EditAction.AddCarpet);
                        if (!(null == (s = o.editMenu))) s.showCarpetConfirmMenu(t, false);
                      }
                    );
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

                  case 4:
                    s.next = 9;
                    break;

                  case 6:
                    s.prev = 6;
                    s.t0 = s.catch(1);
                    console.log('add new czone: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 9:
                  case 'end':
                    return s.stop();
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
        key: '_getMapView',
        value: function () {
          var t = this,
            n = React.default.createElement(module1233.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1233.MapEditCommonStyles.map,
              top: module1233.MapEditCommonStyles.mapTop,
              bottom: module1233.MapEditCommonStyles.mapBottom,
              left: module1233.MapEditCommonStyles.mapLeft,
              right: module1233.MapEditCommonStyles.mapRight,
              initFBZone: this.carpetRect,
              mapMode: module936.MAP_MODE_CARPET_EDIT,
              subCarpetMode: this.carpetEditMode,
              hideAccessory: true,
              mapCarpetFocusCallback: this.mapCarpetFocus,
              ignoreCarpetEdited: this.state.ignoreCarpetEdited,
              cusCarpetEdited: this.state.cusCarpetEdited,
              resetAllCarpetStatus: this.resetAllCarpetStatus,
            }),
            o = React.default.createElement(module1345.default, {
              tip: module491.no_map_tip,
            });
          return this.state.mapStatus == module377.MapStatus.None ? o : n;
        },
      },
      {
        key: '_getMapEditMenuView',
        value: function () {
          var t = this;
          return React.default.createElement(module1233.MapEditMenuView, {
            type: module1233.MenuType.Menu_Carpet,
            subType: this.carpetEditMode,
            ref: function (n) {
              return (t.editMenu = n);
            },
            hasConfirmMenu: true,
            onPressAddCarpetButton: this.onPressAddCarpetButton.bind(this),
            onPressIgnoreCarpetButton: this.onPressIgnoreCarpetButton.bind(this),
            onPressCancelButtonForAdd: this.onPressCancelButtonForAdd,
            onPressConfirmButtonForAdd: this.onPressConfirmButtonForAdd,
            onPressDeleteButtonForAdd: this.onPressDeleteButtonForAdd,
            onPressCancelButtonForIgnore: this.onPressCancelButtonForIgnore,
            onPressConfirmButtonForIgnore: this.onPressConfirmButtonForIgnore,
            onPressDeleteButtonForIgnore: this.onPressDeleteButtonForIgnore,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1233.MapEditCommonStyles.root,
                {
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            this._getMapView(),
            this._getMapEditMenuView(),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_carpet_ignore_view_loading',
              closeAccessibilityLabelKey: 'map_carpet_ignore_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: this.onOverTimer,
              showButton: true,
            })
          );
        },
      },
    ]);
    return L;
  })(React.default.Component);

exports.default = L;
L.contextType = module506.AppConfigContext;
