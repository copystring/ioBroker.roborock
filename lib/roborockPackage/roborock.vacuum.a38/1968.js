var module22 = require('./22'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module385 = require('./385'),
  module418 = require('./418'),
  module391 = require('./391'),
  module1390 = require('./1390'),
  module1330 = require('./1330'),
  module1410 = require('./1410'),
  module394 = require('./394'),
  module515 = require('./515');

function N(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function O(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      N(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      N(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
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

var module1404 = require('./1404'),
  module500 = require('./500').strings,
  V = (function (t) {
    module7.default(N, t);

    var n = N,
      module50 = x(),
      L = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function N(t) {
      var n;
      module4.default(this, N);

      (n = L.call(this, t)).onNavigationBackPress = function () {
        n.tryQuiting();
      };

      n.onNavigationSavePress = function () {
        n.trySavingChanges();
      };

      n.onPressResetEditButton = function () {
        n.startLoading();
        n.resetMapEdit();
        n.setState(
          {
            hasEditedMap: false,
          },
          function () {
            module1404.setTimeout(function () {
              n.endLoading();
            }, 1e3);
          }
        );
      };

      n.state = {
        mapStatus: module381.RSM.mapStatus,
        hasEditedMap: false,
      };
      return n;
    }

    module5.default(N, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.exProps = this.getExProps();
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
            n = this.state.mapStatus != module381.MapStatus.None && this.state.hasEditedMap;
          if (!this.exProps.ignoreSegment) n = n && this.state.mapStatus != module381.MapStatus.Has_WithoutSegments;
          var s = module1410.default.confirmButton(this.onNavigationSavePress, n, function (n) {
              t.mapSaveButton = n;
            }),
            o = this.exProps.hideNavComfirm ? [] : [s];
          module1410.default.setNavigation(this, o, this.onNavigationBackPress);
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
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          var t, n, s, o;
          if (!(null == (t = this.mapListener))) t.remove();
          if (!(null == (n = this.backListener))) n.remove();
          if (!(null == (s = this.robotStatusListener))) s.remove();
          if (!(null == (o = this.mapEditDidChange))) o.remove();
        },
      },
      {
        key: 'updateMap',
        value: function () {
          var t;

          if (!this.unMount) {
            if (!(null == (t = this.mapView)))
              t.setState(
                O(
                  O({}, module1329.MM.mapData),
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
        key: 'trySavingChanges',
        value: function () {
          var t = this;
          module1404.setTimeout(function () {
            return t.startLoading();
          }, 300);
          module1404.setTimeout(function () {
            return t.savingChanges(t.onMapSaveCompleted.bind(t));
          }, 500);
        },
      },
      {
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.state.hasEditedMap) {
            var n,
              s = {
                text: module500.map_edit_no_save,
                onPress: function () {
                  t.quit();
                },
              },
              o = {
                text: module500.map_edit_button_text_save,
                onPress: function () {
                  module1404.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module500.map_edit_save_current_action, '', [s, o]);
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
          var n = this,
            s = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];
          if (t)
            this.setState(
              {
                hasEditedMap: false,
              },
              function () {
                module1329.MM.getMap(true);

                if (s) {
                  n.waitForUpdate = true;
                  module1404.setTimeout(function () {
                    if (n.waitForUpdate) n.resetStatus();
                  }, 2e4);
                } else n.resetStatus();
              }
            );
          else {
            this.showToast(module500.robot_communication_exception);
            this.endLoading();
          }
        },
      },
      {
        key: 'resetStatus',
        value: function () {
          this.waitForUpdate = false;
          this.endLoading();
          this.quit();
        },
      },
      {
        key: 'getExProps',
        value: function () {
          return {};
        },
      },
      {
        key: 'savingChanges',
        value: function (t) {
          if (t) t(true, false);
        },
      },
      {
        key: 'resetMapEdit',
        value: function () {},
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
        key: 'showRingLoading',
        value: function (t) {
          this.setState({
            loadingRing: t,
          });
        },
      },
      {
        key: 'getMapView',
        value: function (t) {
          var n = this,
            o = React.default.createElement(
              module1330.MapView,
              module22.default(
                {
                  ref: function (t) {
                    n.mapView = t;
                  },
                  parent: this,
                  style: module1410.MapEditCommonStyles.map,
                  left: module1410.MapEditCommonStyles.mapLeft,
                  right: module1410.MapEditCommonStyles.mapRight,
                  top: module1410.MapEditCommonStyles.mapTop,
                  bottom: module1410.MapEditCommonStyles.mapBottom,
                },
                t
              )
            );
          return this.state.mapStatus == module381.MapStatus.None ? module1410.default.getNoMapTipView(this.state.mapStatus) : o;
        },
      },
      {
        key: 'getResetButton',
        value: function () {
          return React.default.createElement(module385.PureImageButton, {
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
            onPress: this.onPressResetEditButton.bind(this),
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.exProps,
            o = n.menuProps,
            u = undefined === o ? {} : o,
            l = n.mapProps,
            c = undefined === l ? {} : l,
            p = n.ignoreSegment,
            f =
              !(undefined !== p && p) && (this.state.mapStatus == module381.MapStatus.None || this.state.mapStatus == module381.MapStatus.Has_WithoutSegments)
                ? module1410.default.getNoMapTipView(this.state.mapStatus)
                : this.getMapView(c),
            h = this.getResetButton(),
            M = React.default.createElement(
              module12.View,
              {
                style: T.ringView,
              },
              React.default.createElement(module385.Spinner, null)
            ),
            E = this.state.hasEditedMap;
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
            f,
            E && h,
            React.default.createElement(
              module1390.default,
              module22.default(
                {
                  ref: function (n) {
                    return (t.editMenu = n);
                  },
                },
                u
              )
            ),
            this.state.loadingRing && M,
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
    return N;
  })(React.Component);

exports.default = V;
V.contextType = module515.AppConfigContext;
var T = module12.StyleSheet.create({
  ringView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
