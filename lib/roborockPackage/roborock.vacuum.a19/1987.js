var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = B(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1326 = B(require('./1326')),
  module1233 = require('./1233'),
  module1344 = B(require('./1344')),
  module390 = require('./390'),
  module506 = require('./506');

function R(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (R = function (t) {
    return t ? o : n;
  })(t);
}

function B(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = R(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (l && (l.get || l.set)) Object.defineProperty(s, c, l);
      else s[c] = t[c];
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

function j(t) {
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

function N() {
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
  T = (function (t) {
    module7.default(B, t);

    var module49 = B,
      module506 = N(),
      R = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var n;
      module4.default(this, B);

      (n = R.call(this, t)).onNavigationBackPress = function () {
        n.tryQuiting();
      };

      n.onNavigationSavePress = function () {
        n.trySavingChanges();
      };

      n.onPressRotateLeftButton = function () {
        var t;
        if (!(null == (t = n.mapView))) t.rotateMap(false, n.setSaveButtonEnable.bind(module6.default(n)));
      };

      n.onPressRotateRightButton = function () {
        var t;
        if (!(null == (t = n.mapView))) t.rotateMap(true, n.setSaveButtonEnable.bind(module6.default(n)));
      };

      n.state = {
        mapStatus: module377.RSM.mapStatus,
      };
      n.hasEditedMap = false;
      return n;
    }

    module5.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
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
          var t = this,
            n = this.state.mapStatus != module377.MapStatus.None && this.hasEditedMap,
            o = module1344.default.confirmButton(this.onNavigationSavePress, n, function (n) {
              t.mapSaveButton = n;
            });
          module1344.default.setNavigation(this, [o], this.onNavigationBackPress);
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(j({}, module1231.MM.mapData));
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            var o;
            if (!(null == (o = t.mapView)))
              o.setState(
                j(
                  j({}, module1231.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
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
        },
      },
      {
        key: 'trySavingChanges',
        value: function () {
          var t = this;
          module1249.setTimeout(function () {
            return t.startLoading();
          }, 300);
          module1249.setTimeout(function () {
            return t.startMapSave();
          }, 500);
        },
      },
      {
        key: 'startMapSave',
        value: function () {
          var t, module49, u;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MapRotateAngle));

                  case 2:
                    t = c.sent;
                    module49 = module377.RSM.currentMapId;
                    (u = t ? JSON.parse(t) : module21.default({}))[module49] = this.mapView.state.mapDeg;
                    t = JSON.stringify(u);
                    module1231.MM.mapRotateAngle = u;
                    c.next = 10;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MapRotateAngle, t));

                  case 10:
                    this.onMapSaveCompleted();

                  case 11:
                  case 'end':
                    return c.stop();
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
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.hasEditedMap) {
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
        value: function () {
          var t = this;
          module1249.setTimeout(function () {
            module1231.MM.getMap(true);
            module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
              data: module411.EventKeys.MapDidRotate,
              sender: t,
            });
            t.quit();
          }, 1e3);
          this.hasEditedMap = false;
          this.endLoading();
        },
      },
      {
        key: 'setSaveButtonEnable',
        value: function () {
          var t;
          if (((this.hasEditedMap = true), this.state.mapStatus != module377.MapStatus.None)) null == (t = this.mapSaveButton) || t.setEnabled(true);
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1233.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1344.MapEditCommonStyles.map,
              left: module1344.MapEditCommonStyles.mapLeft,
              right: module1344.MapEditCommonStyles.mapRight,
              top: module1344.MapEditCommonStyles.mapTop,
              bottom: module1344.MapEditCommonStyles.mapBottom,
              hideAccessory: true,
            }),
            s = this.state.mapStatus == module377.MapStatus.None ? module1344.default.getNoMapTipView(this.state.mapStatus) : o;
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
            s,
            React.default.createElement(module1326.default, {
              type: module1326.MenuType.Menu_Rotate,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressRotateLeftButton: this.onPressRotateLeftButton,
              onPressRotateRightButton: this.onPressRotateRightButton,
            }),
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
    return B;
  })(React.Component);

exports.default = T;
T.contextType = module506.AppConfigContext;
