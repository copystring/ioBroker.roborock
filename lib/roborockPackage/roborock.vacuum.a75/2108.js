var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module391 = require('./391'),
  module416 = require('./416'),
  module390 = require('./390'),
  module385 = require('./385'),
  module394 = require('./394'),
  module1126 = require('./1126'),
  module1197 = require('./1197'),
  module1198 = require('./1198'),
  module1349 = require('./1349'),
  module1125 = require('./1125'),
  module1199 = require('./1199');

function F(t, n) {
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

function O(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      F(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      F(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function R() {
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

var module1420 = require('./1420'),
  module510 = require('./510').strings,
  module1343 = require('./1343'),
  B = (function (t) {
    module9.default(F, t);

    var n = F,
      module50 = R(),
      L = function () {
        var t,
          s = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function F(t) {
      var n;
      module6.default(this, F);

      (n = L.call(this, t)).onOverTimer = function () {
        globals.showToast(module510.map_object_ignore_failed);
      };

      n.mapCarpetFocus = function (t, o) {
        n.editAction = o ? module1198.EditAction.Ignore : module1198.EditAction.AddCarpet;
        n.setState(
          o
            ? {
                cusCarpetEdited: false,
              }
            : {
                ignoreCarpetEdited: false,
              }
        );
        n.showEditMenu(o, t);
      };

      n.resetAllCarpetStatus = function (t) {
        n.editAction = '';
        n.setState(
          {
            ignoreCarpetEdited: false,
            cusCarpetEdited: false,
          },
          function () {
            var o, s, u;
            if (!(null == (o = n.mapView))) o.clearCarpetFbzFocus(false);
            if (!(null == (s = n.mapView))) s.clearCarpetFbzFocus(true);
            if (!(null == (u = n.editMenu)))
              u.setState({
                tip: module510.map_edit_carpet_init_tip,
              });
            if (!t) n.endLoading();
            if (t) t();
          }
        );
      };

      n.mapCarpetSaveEdit = function (t, o, s, u) {
        if (s) n.ignoreFocusId = t;
        else n.addFocusId = t;
        if (s) n.trySavingChanges(o, u);
        else n.trySavingAddChanges(o);
      };

      n.onPressAddCarpetButton = function () {
        var t;
        return regeneratorRuntime.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  if (null == (t = n.mapView) ? undefined : t.isCarpetReachMaxNum(true)) globals.showToast(module510.map_edit_carpet_zone_exceed_limit);
                  else n._onPressAddButton(true);

                case 1:
                case 'end':
                  return o.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.state = {
        mapStatus: module381.RSM.mapStatus,
        ignoreCarpetEdited: false,
        cusCarpetEdited: false,
      };
      n.editAction = '';
      return n;
    }

    module7.default(F, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.carpetRect = this.props.navigation.getParam('carpetRect', null);
          this.carpetEditMode = this.props.navigation.getParam('action', module1197.CarpetEditMode.CarpetIgnore);
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
                    module415.MM.getMap(true);

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
          module1349.default.setNavigation(this, null, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'initMapView',
        value: function () {
          if (this.mapView) {
            var t = module415.MM.mapData;
            this.mapView.setState(O({}, t));
          }
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
            if (t.mapView)
              t.mapView.setState(
                O(
                  O({}, module415.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );

            if (t.waitForUpdate) {
              t.resetAllCarpetStatus(null);
              t.waitForUpdate = false;
            }
          });
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapEditDidChange, function (n) {
            if (!(n.data != module1126.FbzType.FBZ_TYPE_CARPET && n.data != module1126.FbzType.RECT_TYPE_CARPET))
              t.setState({
                ignoreCarpetEdited: n.data == module1126.FbzType.FBZ_TYPE_CARPET,
                cusCarpetEdited: n.data == module1126.FbzType.RECT_TYPE_CARPET,
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
        key: 'quit',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    module1349.default.endEditMap();
                    this.props.navigation.pop();

                  case 2:
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
        key: 'trySavingAddChanges',
        value: function (t) {
          var n, o, s;
          if (t && (null == (n = this.mapView) ? undefined : n.isCustomCarpetOverlap())) globals.showToast(module510.map_edit_carpet_overlap_tip);
          else if (t && (null == (o = this.mapView) ? undefined : o.isCustomCarpetRectUnknown())) globals.showToast(module510.map_edit_carpet_unknown_tip);
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
            s,
            u = this;
          if (t && (null == (o = this.mapView) ? undefined : o.isIgnoreCarpetOverlap())) globals.showToast(module510.map_edit_carpet_overlap_tip);
          else {
            var p = null == (s = this.mapView) ? undefined : s.getCarpetZonesParams(false, t ? -1 : this.ignoreFocusId);
            if ((null == p && (p = []), t && !n)) this.saveChangedParams(p);
            else {
              var c,
                l = t ? module510.map_edit_carpet_ignore_confirm_ignore : module510.map_edit_carpet_ignore_confirm_cancel,
                h = {
                  text: module510.localization_strings_Main_MainPage_11,
                },
                f = {
                  text: module510.rubys_location_confirm_button_confirm,
                  onPress: function () {
                    return u.saveChangedParams(p);
                  },
                };
              if (!(null == (c = globals.Alert))) c.alert(l, '', [h, f]);
            }
          }
        },
      },
      {
        key: 'saveChangedParams',
        value: function (t) {
          var n = module381.RSM.currentMapId;
          if (module390.default.isMultiFloorSupported())
            this.state.mapStatus != module381.MapStatus.None && module415.MM.maps.length >= 1 && -1 == n
              ? globals.showToast(module510.no_map_status_description)
              : 1 == module415.MM.maps.length && 1 == module415.MM.mapCountMax
              ? ((n = module415.MM.maps[0].id), this.startMapSave(n, t))
              : this.startMapSave(n, t);
          else this.startMapSave(n, t);
        },
      },
      {
        key: 'startMapSave',
        value: function (t, n) {
          var o = this;
          module1420.setTimeout(function () {
            return o.startLoading();
          }, 300);
          if (this.editAction == module1198.EditAction.Ignore)
            module1420.setTimeout(function () {
              return module415.MM.saveCarpetIgnoreZone(t, n, o.onMapSaveCompleted.bind(o));
            }, 500);
          else if (this.editAction == module1198.EditAction.AddCarpet)
            module1420.setTimeout(function () {
              return module415.MM.saveCarpetAddedZone(t, 1, n, o.onMapSaveCompleted.bind(o));
            }, 500);
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;

          if (t) {
            module415.MM.getMapAfterSaveMap();
            this.waitForUpdate = true;
            module1420.setTimeout(function () {
              if (n.waitForUpdate) {
                n.resetAllCarpetStatus(null);
                n.waitForUpdate = false;
              }
            }, 2e4);
          } else {
            globals.showToast(module510.robot_communication_exception);
            this.endLoading();
          }
        },
      },
      {
        key: '_onPressAddButton',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.editAction = module1198.EditAction.AddCarpet;
                    if (!(null == (n = this.mapView))) n.addCarpetNewZone(t);
                    this.showEditMenu(false, true);
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.startEditMap());

                  case 6:
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(3);
                    console.log('add new czone: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 8]],
            Promise
          );
        },
      },
      {
        key: 'showEditMenu',
        value: function (t, n) {
          var o,
            s = '';
          s = t
            ? n
              ? module510.map_edit_carpet_ignore_tip
              : module510.map_edit_carpet_ignore_edit_tip
            : n
            ? module510.map_edit_carpet_add_tip
            : module510.map_edit_carpet_add_edit_tip;
          if (!(null == (o = this.editMenu)))
            o.setState({
              tip: s,
            });
        },
      },
      {
        key: 'startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText(module510.rubys_main_diag_update_map);
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
            n = React.default.createElement(module1125.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1349.MapEditCommonStyles.map,
              top: module1349.MapEditCommonStyles.mapTop,
              bottom: module1349.MapEditCommonStyles.mapBottom,
              left: module1349.MapEditCommonStyles.mapLeft,
              right: module1349.MapEditCommonStyles.mapRight,
              initFBZone: this.carpetRect,
              mapMode: module1343.MAP_MODE_CARPET_EDIT,
              subCarpetMode: this.carpetEditMode,
              hideAccessory: true,
              mapCarpetFocusCallback: this.mapCarpetFocus,
              mapCarpetSaveEdit: this.mapCarpetSaveEdit,
              ignoreCarpetEdited: this.state.ignoreCarpetEdited,
              cusCarpetEdited: this.state.cusCarpetEdited,
              resetAllCarpetStatus: this.resetAllCarpetStatus,
            }),
            o = module1349.default.getNoMapTipView(this.state.mapStatus);
          return this.state.mapStatus == module381.MapStatus.None ? o : n;
        },
      },
      {
        key: '_getMapEditMenuView',
        value: function () {
          var t = this;
          return React.default.createElement(module1198.default, {
            type: module1198.MenuType.Menu_Carpet,
            subType: this.carpetEditMode,
            ref: function (n) {
              return (t.editMenu = n);
            },
            hasConfirmMenu: true,
            onPressAddCarpetButton: this.onPressAddCarpetButton,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          return React.default.createElement(
            module13.View,
            {
              style: [
                module1349.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            this._getMapView(),
            this._getMapEditMenuView(),
            React.default.createElement(module385.CancelableLoadingView, {
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
    return F;
  })(React.default.Component);

exports.default = B;
B.contextType = module1199.AppConfigContext;
