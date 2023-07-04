var module22 = require('./22'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module394 = require('./394'),
  module1200 = require('./1200'),
  module391 = require('./391'),
  module1199 = require('./1199'),
  module1126 = require('./1126'),
  module1350 = require('./1350'),
  module1347 = require('./1347');

function N(t, n) {
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

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      N(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      N(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
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

var module1421 = require('./1421'),
  module510 = require('./510').strings,
  R = (function (t) {
    module9.default(N, t);

    var n = N,
      module50 = B(),
      _ = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function N(t) {
      var n;
      module6.default(this, N);

      (n = _.call(this, t)).onNavigationBackPress = function () {
        n.tryQuiting();
      };

      n.onNavigationSavePress = function () {
        n.trySavingChanges();
      };

      n.onNavigationGuidePress = function () {
        var t;
        if (!(null == (t = n.newSwitchGuideView))) t.show();
      };

      n.onPressResetEditButton = function () {
        n.startLoading();
        n.resetMapEdit();
        n.setState(
          {
            hasEditedMap: false,
          },
          function () {
            module1421.setTimeout(function () {
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

    module7.default(N, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
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
                    this.showGuideViewIfNeeded();
                    module415.MM.getMap(true);

                  case 5:
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
          var o = module1350.default.confirmButton(this.onNavigationSavePress, n, function (n) {
              t.mapSaveButton = n;
            }),
            s = module1350.default.guideButton(
              this.onNavigationGuidePress,
              function (n) {
                t.guideButton = n;
              },
              false
            ),
            u = globals.isRTL ? [o, s] : [s, o],
            l = this.exProps.hideNavComfirm ? [] : this.exProps.showGuideBtn ? u : [o];
          module1350.default.setNavigation(this, l, this.onNavigationBackPress);
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
            t.updateMap();
          });
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapEditDidChange, function (n) {
            t.setSaveButtonEnable();
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
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            n,
            o,
            s,
            module6,
            c,
            p = this;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    if (!(null == (t = this.exProps) ? undefined : null == (n = t.guideProps) ? undefined : n.guideKey)) {
                      f.next = 16;
                      break;
                    }

                    f.prev = 1;
                    module6 = null == (o = this.exProps) ? undefined : null == (s = o.guideProps) ? undefined : s.guideKey;
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module6));

                  case 5:
                    if (((c = f.sent), !!c)) {
                      f.next = 11;
                      break;
                    }

                    f.next = 10;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module6, module6));

                  case 10:
                    module1421.setTimeout(function () {
                      var t;
                      if (!(null == (t = p.newSwitchGuideView))) t.show();
                    }, 50);

                  case 11:
                    f.next = 16;
                    break;

                  case 13:
                    f.prev = 13;
                    f.t0 = f.catch(1);
                    console.warn('showGuideViewIfNeeded error = ' + ('object' == typeof error ? JSON.stringify(error) : error));

                  case 16:
                  case 'end':
                    return f.stop();
                }
            },
            null,
            this,
            [[1, 13]],
            Promise
          );
        },
      },
      {
        key: 'updateMap',
        value: function () {
          var t;

          if (!this.unMount) {
            if (!(null == (t = this.mapView)))
              t.setState(
                V(
                  V({}, module415.MM.mapData),
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
          module1421.setTimeout(function () {
            return t.startLoading();
          }, 300);
          module1421.setTimeout(function () {
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
              o = {
                text: module510.map_edit_no_save,
                onPress: function () {
                  t.quit();
                },
              },
              s = {
                text: module510.map_edit_button_text_save,
                onPress: function () {
                  module1421.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module510.map_edit_save_current_action, '', [o, s]);
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
                    module1350.default.endEditMap();
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
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this,
            o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];

          if (t) {
            this.updataEvent();
            this.setState(
              {
                hasEditedMap: false,
              },
              function () {
                module415.MM.getMapAfterSaveMap();

                if (o) {
                  n.waitForUpdate = true;
                  module1421.setTimeout(function () {
                    if (n.waitForUpdate) n.resetStatus();
                  }, 2e4);
                } else n.resetStatus();
              }
            );
          } else {
            this.showToast(module510.robot_communication_exception);
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
        key: 'updataEvent',
        value: function () {},
      },
      {
        key: 'setSaveButtonEnable',
        value: function () {
          var t;

          if (!(this.state.mapStatus == module381.MapStatus.None || this.state.hasEditedMap || this.exProps.ignoreNoSave)) {
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
            s = React.default.createElement(
              module1126.MapView,
              module22.default(
                {
                  ref: function (t) {
                    n.mapView = t;
                  },
                  parent: this,
                  style: module1350.MapEditCommonStyles.map,
                  left: module1350.MapEditCommonStyles.mapLeft,
                  right: module1350.MapEditCommonStyles.mapRight,
                  top: module1350.MapEditCommonStyles.mapTop,
                  bottom: module1350.MapEditCommonStyles.mapBottom,
                  zonesHasEdited: this.state.hasEditedMap,
                },
                t
              )
            );
          return this.state.mapStatus == module381.MapStatus.None ? module1350.default.getNoMapTipView(this.state.mapStatus) : s;
        },
      },
      {
        key: 'getResetButton',
        value: function () {
          return React.default.createElement(module385.PureImageButton, {
            style: module1350.MapEditCommonStyles.refreshMapSegmentIndicator,
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
            s = n.menuProps,
            u = undefined === s ? {} : s,
            l = n.mapProps,
            c = undefined === l ? {} : l,
            p = n.ignoreSegment,
            f = undefined !== p && p,
            h = n.guideProps,
            M = undefined === h ? {} : h,
            E = n.showResetBtn,
            _ = undefined === E || E,
            C =
              !f && (this.state.mapStatus == module381.MapStatus.None || this.state.mapStatus == module381.MapStatus.Has_WithoutSegments)
                ? module1350.default.getNoMapTipView(this.state.mapStatus)
                : this.getMapView(c),
            N = this.getResetButton(),
            V = React.default.createElement(
              module13.View,
              {
                style: D.ringView,
              },
              React.default.createElement(module385.Spinner, null)
            ),
            B = this.state.hasEditedMap && _;

          return React.default.createElement(
            module13.View,
            {
              style: [
                module1350.MapEditCommonStyles.root,
                {
                  height: module394.MC.ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: this.theme.mapEdit.backgroundColor,
                },
              ],
            },
            C,
            B && N,
            React.default.createElement(
              module1199.default,
              module22.default(
                {
                  ref: function (n) {
                    return (t.editMenu = n);
                  },
                },
                u
              )
            ),
            this.state.loadingRing && V,
            M.topTitle &&
              React.default.createElement(module1347.default, {
                ref: function (n) {
                  t.newSwitchGuideView = n;
                },
                isModal: true,
                bgImage: this.theme.guideImages.forbiddenZone,
                topTitle: M.topTitle,
                context: M.context,
                buttonInfo: [module510.localization_strings_Setting_RemoteControlPage_51],
                buttonFuncId: ['map_edit_order_guide_ok'],
              }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_forbidden_view_loading',
              closeAccessibilityLabelKey: 'map_edit_forbidden_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module510.map_object_ignore_failed);
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

exports.default = R;
R.contextType = module1200.AppConfigContext;
var D = module13.StyleSheet.create({
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
