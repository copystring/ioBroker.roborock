require('./390');

var o,
  module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module1408 = require('./1408'),
  module1199 = require('./1199'),
  module385 = require('./385'),
  module1200 = require('./1200'),
  module420 = require('./420'),
  module381 = require('./381'),
  module415 = require('./415'),
  module394 = require('./394'),
  module416 = require('./416'),
  module391 = require('./391'),
  module424 = require('./424'),
  module1349 = require('./1349'),
  module1126 = require('./1126');

function R(t, n) {
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

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function z() {
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

o = {};
module50.default(o, module1126.AIInfoPageType.Carpet, {
  topText: module510.carpet_info_goto_forbidden,
  bottomText: module510.carpet_clean_mode_setting_ignore_carpet,
});
module50.default(o, module1126.AIInfoPageType.DoorSill, {
  topText: module510.map_edit_ignore,
  bottomText: module510.map_edit_add_door_sill,
});
module50.default(o, module1126.AIInfoPageType.StuckZone, {
  topText: module510.map_edit_ignore,
  bottomText: module510.map_edit_add_ai_zone,
});
module50.default(o, module1126.AIInfoPageType.CliffZone, {
  topText: module510.map_edit_cliff_zone_ignore,
  bottomText: module510.map_edit_cliff_zone_adjust,
});

var module1420 = require('./1420'),
  module510 = require('./510').strings,
  module389 = require('./389'),
  j = module13.Dimensions.get('window'),
  Z = j.width,
  H = j.height,
  N = Z / 375,
  q = module13.StatusBar.currentHeight || 0,
  W = o,
  module461 = (function (t) {
    module9.default(M, t);

    var n = M,
      o = z(),
      y = function () {
        var t,
          l = module12.default(n);

        if (o) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function M(t) {
      var n;
      module6.default(this, M);

      (n = y.call(this, t)).handlePressForbiddenBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          module381.RSM.state != module381.RobotState.UPDATING
            ? n.pageType == module1126.AIInfoPageType.Carpet
              ? n._carpetPageAction(true)
              : n.pageType == module1126.AIInfoPageType.DoorSill
              ? n._doorSillPageAction(true)
              : n.pageType == module1126.AIInfoPageType.StuckZone
              ? n._stuckZonePageAction(true)
              : n.pageType == module1126.AIInfoPageType.CliffZone && n._cliffZonePageAction(true)
            : globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);
        else globals.showToast(module510.open_map_save_mode_tip);
      };

      n.handlePressIgnoreBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          module381.RSM.state != module381.RobotState.UPDATING
            ? n.pageType == module1126.AIInfoPageType.Carpet
              ? n._carpetPageAction(false)
              : n.pageType == module1126.AIInfoPageType.DoorSill
              ? n._doorSillPageAction(false)
              : n.pageType == module1126.AIInfoPageType.StuckZone
              ? n._stuckZonePageAction(false)
              : n.pageType == module1126.AIInfoPageType.CliffZone && n._cliffZonePageAction(false)
            : globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);
        else globals.showToast(module510.open_map_save_mode_tip);
      };

      n.handlePressModeBtn = function () {
        n.props.navigation.navigate('CarpetCleanModeSetting', {
          parent: module8.default(n),
          title: module510.carpet_clean_mode_setting_title,
        });
      };

      n.handlePressRetryBtn = function () {
        return n.initData(true);
      };

      n.handleSubTextLayout = function (t) {
        var o = 234 + t.nativeEvent.layout.height + 20,
          l = n.pageType == module1126.AIInfoPageType.DoorSill ? 285 : 360;
        o = l ** o;
        o = o ** (H - q - 44 - 142 - 30);
        n.setState({
          topHeight: o,
        });
      };

      n.handleIgnoreBtnOnLayout = function (t) {
        var o = t.nativeEvent.layout.height;
        n.setState({
          igBtnHeight: o,
        });
      };

      n.unMount = false;
      n.state = {
        initLoad: true,
        requestFailed: false,
        cleanMode: module394.MC.carPetCleanMode,
        topHeight: 360,
        igBtnHeight: 42,
      };
      n.pageType = n.props.navigation.getParam('pageType', module1126.AIInfoPageType.Carpet);
      return n;
    }

    module7.default(M, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.initParams = this.props.navigation.getParam('initParams', null);
          this.showBottomView = this.props.navigation.getParam('showBottomView', true);
          if (this.isCarpetPage)
            this.carpetCleanModelistener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.CarpetCleanModeDidChange, function (n) {
              t.setState({
                cleanMode: module394.MC.carPetCleanMode,
              });
            });
          this.initData();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          this.unMount = true;
          if (!(null == (t = this.carpetCleanModelistener))) t.remove();
        },
      },
      {
        key: 'initData',
        value: function () {
          var t = this,
            n = arguments.length > 0 && undefined !== arguments[0] && arguments[0];

          if (this.isCarpetPage) {
            if (n)
              this.setState(
                {
                  requestFailed: false,
                },
                function () {
                  t.showLoading();
                }
              );
            this.getDataTask = module416.default.getCarpetCleanMode();
            this.getDataTask
              .then(function (n) {
                if (!t.unMount)
                  t.setState({
                    cleanMode: n.result[0].carpet_clean_mode,
                  });
                console.log('getCarpetCleanStatus: ' + JSON.stringify(n));
              })
              .catch(function (n) {
                if (!t.unMount) {
                  globals.showToast(module510.robot_communication_exception);
                  t.setState({
                    requestFailed: true,
                  });
                  console.log('getCarpetCleanStatus: ' + JSON.stringify(n));
                }
              })
              .finally(function () {
                if (!t.unMount) {
                  if (n && t.loadingView) t.finishLoading(false);
                  t.setState({
                    initLoad: false,
                  });
                }
              });
          } else
            this.setState({
              initLoad: false,
            });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          var n;
          if (!(null == (n = this.loadingView))) n.hide();
          this.setState({
            requestFailed: t,
          });
        },
      },
      {
        key: 'showLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText();
        },
      },
      {
        key: 'getCleanModeText',
        value: function () {
          switch (this.state.cleanMode) {
            case module389.CarPetCleanModeSettingMap.CarpetAvoidMode:
              return module510.carpet_clean_mode_setting_title1;

            case module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode:
              return module510.carpet_clean_mode_setting_title2;

            case module389.CarPetCleanModeSettingMap.CarpetIgnoreMode:
              return module510.carpet_clean_mode_setting_title3;

            case module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode:
              return module510.carpet_clean_mode_setting_title4;
          }
        },
      },
      {
        key: 'getCleanModeSubText',
        value: function () {
          var t = '\n' + module510.carpet_info_mode_ingore_tip,
            n = '\n' + module510.carpet_info_mode_forbidden_tip;

          switch (this.state.cleanMode) {
            case module389.CarPetCleanModeSettingMap.CarpetAvoidMode:
              return module510.carpet_clean_mode_setting_sub_title1 + t;

            case module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode:
              return module510.carpet_clean_mode_setting_sub_title2 + t + n;

            case module389.CarPetCleanModeSettingMap.CarpetIgnoreMode:
              return module510.carpet_clean_mode_setting_sub_title3 + n;

            case module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode:
              return module510.carpet_clean_mode_setting_sub_title2 + t + n;
          }
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;
          if (t)
            module1420.setTimeout(function () {
              module415.MM.getMapAfterSaveMap();
              n.props.navigation.pop();
            }, 1e3);
          else globals.showToast(module510.robot_communication_exception);
          this.finishLoading(false);
        },
      },
      {
        key: 'getLoadingView',
        value: function () {
          var t = this;
          return React.default.createElement(
            module13.View,
            {
              style: K.container,
            },
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_carpet_info_view_loading',
              closeAccessibilityLabelKey: 'map_carpet_info_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onPressCancel: function () {
                t.props.navigation.goBack();
              },
              showButton: true,
            })
          );
        },
      },
      {
        key: 'getHeaderView',
        value: function () {
          var t = {
            width: 335 * N,
            height: this.state.topHeight,
            color: this.theme.shadowColor,
            border: 10,
            radius: 8,
            opacity: 0.05,
            x: 0,
            y: 0,
          };
          return React.default.createElement(
            module13.View,
            {
              style: [
                K.topViewStyle,
                {
                  backgroundColor: this.theme.topBackgroundColor,
                  height: this.state.topHeight,
                },
              ],
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  position: 'absolute',
                  width: 335 * N,
                  height: this.state.topHeight,
                },
              },
              React.default.createElement(module1408.BoxShadow, {
                setting: t,
              })
            ),
            React.default.createElement(
              module13.ImageBackground,
              {
                resizeMode: 'cover',
                style: K.imageBgStyle,
                imageStyle: K.imageStyle,
                source: require('./2073'),
              },
              React.default.createElement(module13.ImageBackground, {
                resizeMode: 'contain',
                style: K.carpetImageStyle,
                source: this.backgroundImage,
              })
            ),
            React.default.createElement(
              module13.ScrollView,
              {
                style: K.textViewStyle,
                alwaysBounceVertical: false,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    K.titleStyle,
                    {
                      color: this.theme.titleColor,
                    },
                  ],
                },
                this.title
              ),
              this.isCarpetPage &&
                !module424.DMM.isGarnet &&
                React.default.createElement(
                  module13.View,
                  {
                    style: K.modeView,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        K.modeTextBase,
                        {
                          color: this.theme.detailColor,
                        },
                      ],
                    },
                    module510.carpet_info_mode_title
                  ),
                  React.default.createElement(
                    module13.TouchableOpacity,
                    module22.default({}, module391.default.getAccessibilityLabel('carpet_info_mode_entry'), {
                      onPress: this.handlePressModeBtn,
                    }),
                    React.default.createElement(
                      module13.View,
                      {
                        style: K.modeViewInner,
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: K.modeTextInner,
                        },
                        this.getCleanModeText()
                      ),
                      React.default.createElement(module13.Image, {
                        style: [
                          K.modeImage,
                          globals.isRTL && {
                            transform: [
                              {
                                rotate: '180deg',
                              },
                            ],
                          },
                        ],
                        source: require('./2116'),
                      })
                    )
                  )
                ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    K.detailStyle,
                    {
                      color: this.theme.detailColor,
                    },
                  ],
                  onLayout: this.handleSubTextLayout,
                },
                this.subText
              )
            )
          );
        },
      },
      {
        key: 'getBottomView',
        value: function () {
          var t = V(
              {
                width: Z - 84,
                height: 42,
                radius: 20,
              },
              this.contextTheme.shadowConfig
            ),
            n = V(
              {
                width: Z - 84,
                height: this.state.igBtnHeight,
                radius: 20,
              },
              this.contextTheme.shadowConfig
            ),
            o =
              !this.isCarpetPage ||
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode ||
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode,
            l = !this.isCarpetPage || this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarpetAvoidMode,
            s = React.default.createElement(
              module13.View,
              null,
              React.default.createElement(
                module13.View,
                {
                  style: K.shadowView,
                },
                React.default.createElement(module1408.BoxShadow, {
                  setting: t,
                })
              ),
              React.default.createElement(module385.PureButton, {
                funcId: 'carpet_info_forbidden_entry',
                style: [
                  K.forbiddenBtn,
                  {
                    backgroundColor: this.theme.fbButtonColor,
                  },
                ],
                title: this.topButtonText,
                textColor: this.theme.fbTextColor,
                fontSize: 16,
                onPress: this.handlePressForbiddenBtn,
              })
            ),
            c = !this.isCarpetPage || this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarpetIgnoreMode,
            u = React.default.createElement(
              module1408.BoxShadow,
              {
                setting: n,
              },
              React.default.createElement(
                module385.GradientView,
                {
                  colors: [this.contextTheme.gradientColorStart, this.contextTheme.gradientColorEnd],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: K.gradientView,
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'carpet_info_ignore_entry',
                  style: K.ignoreBtn,
                  title: this.bottomBtnText,
                  textColor: 'white',
                  fontSize: 16,
                  numberOfLines: 0,
                  onPress: this.handlePressIgnoreBtn,
                  onLayout: this.handleIgnoreBtnOnLayout,
                })
              )
            );
          return React.default.createElement(
            module13.View,
            {
              style: [
                K.bottomViewStyle,
                {
                  justifyContent: o ? 'space-around' : 'flex-end',
                },
              ],
            },
            l && s,
            c && u
          );
        },
      },
      {
        key: '_carpetPageAction',
        value: function (t) {
          if (t) {
            var n;
            this.props.navigation.replace('MapEditForbiddenZonePage', {
              title: module510.map_edit_virtual_wall_and_forbidden_zone,
              carpetRect: null == (n = this.initParams) ? undefined : n.zoneData,
            });
          } else {
            var o;
            if (module381.RSM.isRunning)
              return void module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module510.robot_communication_exception);
              });
            this.props.navigation.replace('MapEditCarpetPage', {
              title: module510.map_edit_carpet_ignore_title,
              carpetRect: null == (o = this.initParams) ? undefined : o.zoneData,
            });
          }
        },
      },
      {
        key: '_doorSillPageAction',
        value: function (t) {
          var n,
            o,
            s,
            c,
            u,
            p,
            f = this;
          if (module381.RSM.isRunning)
            module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
            });
          else if (t) {
            if (
              (null == (n = this.initParams) ? undefined : n.zoneData) &&
              (null == (o = module415.MM.mapData) ? undefined : null == (s = o.smartds) ? undefined : null == (c = s.fbzs) ? undefined : c.length)
            ) {
              var h,
                _ = module415.MM.mapData.smartds.fbzs.concat(),
                y = null == (h = this.initParams.zoneData) ? undefined : h.data;

              if (!y) return;

              for (var v = [], C = 0; C < _.length; C++)
                if (_[C].toString() != y.toString()) {
                  var S = _[C];
                  S.forEach(function (t, n, o) {
                    return (o[n] = parseInt((50 * t).toFixed()));
                  });
                  v.push([1].concat(module31.default(S)));
                }

              y.forEach(function (t, n, o) {
                return (o[n] = parseInt((50 * t).toFixed()));
              });
              v.push([0].concat(module31.default(y)));

              if (v.length > 0) {
                module1420.setTimeout(function () {
                  return f.showLoading();
                }, 300);
                module1420.setTimeout(function () {
                  module415.MM.saveSmartDoorSillBlocks(module381.RSM.currentMapId, v, f.onMapSaveCompleted.bind(f));
                }, 500);
              }
            }
          } else
            (null == (u = this.initParams) ? undefined : u.zoneData) &&
              this.props.navigation.replace('MapEditDoorSillPage', {
                title: module510.map_edit_door_sill_title,
                initParams: null == (p = this.initParams) ? undefined : p.zoneData,
              });
        },
      },
      {
        key: '_stuckZonePageAction',
        value: function (t) {
          var n = this;

          if (t) {
            var o;
            if (module381.RSM.isRunning)
              return void module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module510.robot_communication_exception);
              });

            if (null == (o = this.initParams) ? undefined : o.zoneData) {
              module1420.setTimeout(function () {
                return n.showLoading();
              }, 300);
              module1420.setTimeout(function () {
                var t,
                  o,
                  l = null == (t = n.initParams) ? undefined : null == (o = t.zoneData) ? undefined : o.data,
                  s = [[parseInt((50 * l[0]).toFixed()), parseInt((50 * l[1]).toFixed())]];
                module415.MM.saveSetIgnoreStuckPoint(module381.RSM.currentMapId, s, n.onMapSaveCompleted.bind(n));
              }, 500);
            }
          } else {
            var l;
            if (null == (l = this.initParams) ? undefined : l.zoneData)
              this.props.navigation.replace('MapEditForbiddenZonePage', {
                title: module510.map_edit_virtual_wall_and_forbidden_zone,
                stuckPoint: this.initParams.zoneData,
              });
          }
        },
      },
      {
        key: '_cliffZonePageAction',
        value: function (t) {
          var n = this;

          if (t) {
            var o, s, c, u;
            if (module381.RSM.isRunning)
              return void module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module510.robot_communication_exception);
              });
            if (null == (o = this.initParams) ? undefined : o.zoneData)
              if (null == (s = module415.MM.mapData) ? undefined : null == (c = s.clffbz) ? undefined : null == (u = c.fbzs) ? undefined : u.length) {
                var p,
                  f = module415.MM.mapData.clffbz.fbzs.concat(),
                  h = null == (p = this.initParams.zoneData) ? undefined : p.data;
                if (!h) return;

                for (var _ = [], y = 0; y < f.length; y++)
                  if (f[y].toString() != h.toString()) {
                    var v = f[y];
                    v.forEach(function (t, n, o) {
                      return (o[n] = parseInt((50 * t).toFixed()));
                    });

                    _.push([1].concat(module31.default(v)));
                  }

                h.forEach(function (t, n, o) {
                  return (o[n] = parseInt((50 * t).toFixed()));
                });

                _.push([0].concat(module31.default(h)));

                if (_.length > 0) {
                  module1420.setTimeout(function () {
                    return n.showLoading();
                  }, 300);
                  module1420.setTimeout(function () {
                    module415.MM.saveSmartCliffForbidden(module381.RSM.currentMapId, _, n.onMapSaveCompleted.bind(n));
                  }, 500);
                }
              }
          } else {
            var C, S;
            if (null == (C = this.initParams) ? undefined : C.zoneData)
              this.props.navigation.replace('MapEditForbiddenZonePage', {
                title: module510.map_edit_virtual_wall_and_forbidden_zone,
                cliffZone: null == (S = this.initParams) ? undefined : S.zoneData,
              });
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = React.default.createElement(module385.RequestRetryView, {
            onPressButton: this.handlePressRetryBtn,
          });
          if (this.state.requestFailed) return t;
          var n = React.default.createElement(
            module13.View,
            {
              style: [
                K.container,
                {
                  backgroundColor: this.theme.backgroundColor,
                  justifyContent: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          return this.state.initLoad
            ? n
            : React.default.createElement(
                module13.View,
                {
                  style: [
                    K.container,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                },
                this.getHeaderView(),
                this.showBottomView && module1349.default.mapEditStep >= module1349.MapEditSteps.Saved && this.getBottomView(),
                this.getLoadingView()
              );
        },
      },
      {
        key: 'contextTheme',
        get: function () {
          return this.context.theme;
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme.carpetInfoPage;
        },
      },
      {
        key: 'backgroundImage',
        get: function () {
          return module1126.AIInfoPageBackRes[this.pageType].image || require('./461');
        },
      },
      {
        key: 'title',
        get: function () {
          return module1126.AIInfoPageBackRes[this.pageType].title || module510.carpet_bubble_name;
        },
      },
      {
        key: 'subText',
        get: function () {
          return module1126.AIInfoPageBackRes[this.pageType].detail || this.getCleanModeSubText();
        },
      },
      {
        key: 'topButtonText',
        get: function () {
          return W[this.pageType].topText || module510.carpet_info_goto_forbidden;
        },
      },
      {
        key: 'bottomBtnText',
        get: function () {
          return W[this.pageType].bottomText || module510.carpet_clean_mode_setting_ignore_carpet;
        },
      },
      {
        key: 'isCarpetPage',
        get: function () {
          return this.pageType == module1126.AIInfoPageType.Carpet;
        },
      },
    ]);
    return M;
  })(React.Component);

exports.default = module461;
module461.contextType = module1199.AppConfigContext;
var K = module13.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  topViewStyle: {
    width: 335 * N,
    borderRadius: 10,
    justifyContent: 'flex-start',
    marginTop: 22,
  },
  imageBgStyle: {
    height: 150,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  imageStyle: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  carpetImageStyle: {
    width: 147,
    height: 147,
    alignSelf: 'center',
  },
  textViewStyle: {
    marginTop: 26,
    marginLeft: 20 * N,
    marginRight: 16 * N,
    alignSelf: 'flex-start',
  },
  titleStyle: {
    fontSize: 16,
    textAlign: globals.isRTL ? 'right' : 'left',
    fontWeight: 'bold',
  },
  modeView: {
    minHeight: 20,
    minWidth: 180,
    marginTop: 5,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modeViewInner: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  modeTextBase: {
    fontSize: 12,
    color: '#9b9b9b',
    maxWidth: Z / 2 - 42,
  },
  modeTextInner: {
    fontSize: 12,
    color: '#007AFF',
    maxWidth: Z / 2 - 58,
  },
  modeImage: {
    width: 14,
    height: 14,
    tintColor: '#007AFF',
  },
  detailStyle: {
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
    lineHeight: 20,
    marginTop: 13,
  },
  bottomViewStyle: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'center',
    width: Z - 84,
    minHeight: 100,
    bottom: module391.default.isIphoneX() ? 35 : 20,
  },
  forbiddenBtn: {
    height: 42,
    borderRadius: 28,
    marginBottom: 10,
  },
  gradientView: {
    minHeight: 42,
    borderRadius: 28,
    backgroundColor: '#3777F7',
  },
  shadowView: {
    position: 'absolute',
    width: Z - 84,
    height: 42,
  },
  ignoreBtn: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
