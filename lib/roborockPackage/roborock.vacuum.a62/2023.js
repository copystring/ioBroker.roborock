var o,
  module22 = require('./22'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module50 = require('./50'),
  React = require('react'),
  module12 = require('./12'),
  module1328 = require('./1328'),
  module1121 = require('./1121'),
  module385 = require('./385'),
  module1122 = require('./1122'),
  module419 = require('./419'),
  module381 = require('./381'),
  module390 = require('./390'),
  module414 = require('./414'),
  module394 = require('./394'),
  module415 = require('./415'),
  module391 = require('./391'),
  module423 = require('./423'),
  module1271 = require('./1271'),
  module1057 = require('./1057');

function V(t, n) {
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

function L(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      V(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      V(Object(o)).forEach(function (n) {
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
module50.default(o, module1057.AIInfoPageType.Carpet, {
  topText: module505.carpet_info_goto_forbidden,
  bottomText: module505.carpet_clean_mode_setting_ignore_carpet,
});
module50.default(o, module1057.AIInfoPageType.DoorSill, {
  topText: module505.map_edit_ignore,
  bottomText: module505.map_edit_add_door_sill,
});
module50.default(o, module1057.AIInfoPageType.StuckZone, {
  topText: module505.map_edit_ignore,
  bottomText: module505.map_edit_add_ai_zone,
});
module50.default(o, module1057.AIInfoPageType.CliffZone, {
  topText: module505.map_edit_cliff_zone_ignore,
  bottomText: module505.map_edit_cliff_zone_adjust,
});

var module1340 = require('./1340'),
  module505 = require('./505').strings,
  module389 = require('./389'),
  module393 = require('./393'),
  Z = module12.Dimensions.get('window'),
  N = Z.width,
  W = Z.height,
  q = N / 375,
  G = module12.StatusBar.currentHeight || 0,
  K = o,
  module461 = (function (t) {
    module7.default(S, t);

    var n = S,
      o = z(),
      y = function () {
        var t,
          l = module11.default(n);

        if (o) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);

      (n = y.call(this, t)).handlePressForbiddenBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          n.pageType == module1057.AIInfoPageType.Carpet
            ? n._carpetPageAction(true)
            : n.pageType == module1057.AIInfoPageType.DoorSill
            ? n._doorSillPageAction(true)
            : n.pageType == module1057.AIInfoPageType.StuckZone
            ? n._stuckZonePageAction(true)
            : n.pageType == module1057.AIInfoPageType.CliffZone && n._cliffZonePageAction(true);
        else globals.showToast(module505.open_map_save_mode_tip);
      };

      n.handlePressIgnoreBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          n.pageType == module1057.AIInfoPageType.Carpet
            ? n._carpetPageAction(false)
            : n.pageType == module1057.AIInfoPageType.DoorSill
            ? n._doorSillPageAction(false)
            : n.pageType == module1057.AIInfoPageType.StuckZone
            ? n._stuckZonePageAction(false)
            : n.pageType == module1057.AIInfoPageType.CliffZone && n._cliffZonePageAction(false);
        else globals.showToast(module505.open_map_save_mode_tip);
      };

      n.handlePressModeBtn = function () {
        n.props.navigation.navigate('CarpetCleanModeSetting', {
          parent: module6.default(n),
          title: module505.carpet_clean_mode_setting_title,
        });
      };

      n.handlePressRetryBtn = function () {
        return n.initData(true);
      };

      n.handleSubTextLayout = function (t) {
        var o = 234 + t.nativeEvent.layout.height + 20,
          l = n.pageType == module1057.AIInfoPageType.DoorSill ? 285 : 360;
        o = l ** o;
        o = o ** (W - G - 44 - 142 - 30);
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

      n.onGotoBuyDoorSillPage = function () {
        if (module393.isMiApp) module393.openShopPage('142645');
        else if (module393.isMiApp || module393.isSupportGotoMainlandMall()) {
          if (module393.isSupportGotoMainlandMall()) module393.gotoMainlandMall('/h5/#/pages/product/product?id=130&isFromRRApp=true');
        } else globals.showToast(module505.map_object_app_version_tip);
      };

      n.unMount = false;
      n.state = {
        initLoad: true,
        requestFailed: false,
        cleanMode: module394.MC.carPetCleanMode,
        topHeight: 360,
        igBtnHeight: 42,
      };
      n.pageType = n.props.navigation.getParam('pageType', module1057.AIInfoPageType.Carpet);
      return n;
    }

    module5.default(S, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.initParams = this.props.navigation.getParam('initParams', null);
          this.showBottomView = this.props.navigation.getParam('showBottomView', true);
          if (this.isCarpetPage)
            this.carpetCleanModelistener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.CarpetCleanModeDidChange, function (n) {
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
            this.getDataTask = module415.default.getCarpetCleanMode();
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
                  globals.showToast(module505.robot_communication_exception);
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
            case module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module505.carpet_clean_mode_setting_title1;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module505.carpet_clean_mode_setting_title2;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden:
              return module505.carpet_clean_mode_setting_title3;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden:
              return module505.carpet_clean_mode_setting_title4;
          }
        },
      },
      {
        key: 'getCleanModeSubText',
        value: function () {
          var t = '\n' + module505.carpet_info_mode_ingore_tip,
            n = '\n' + module505.carpet_info_mode_forbidden_tip;

          switch (this.state.cleanMode) {
            case module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module505.carpet_clean_mode_setting_sub_title1 + t;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module505.carpet_clean_mode_setting_sub_title2 + t + n;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden:
              return module505.carpet_clean_mode_setting_sub_title3 + n;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden:
              return module505.carpet_clean_mode_setting_sub_title2 + t + n;
          }
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;
          if (t)
            module1340.setTimeout(function () {
              module414.MM.getMapAfterSaveMap();
              n.props.navigation.pop();
            }, 1e3);
          else globals.showToast(module505.robot_communication_exception);
          this.finishLoading(false);
        },
      },
      {
        key: 'getLoadingView',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: U.container,
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
            width: 335 * q,
            height: this.state.topHeight,
            color: this.theme.shadowColor,
            border: 10,
            radius: 8,
            opacity: 0.05,
            x: 0,
            y: 0,
          };
          return React.default.createElement(
            module12.View,
            {
              style: [
                U.topViewStyle,
                {
                  backgroundColor: this.theme.topBackgroundColor,
                  height: this.state.topHeight,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  width: 335 * q,
                  height: this.state.topHeight,
                },
              },
              React.default.createElement(module1328.BoxShadow, {
                setting: t,
              })
            ),
            React.default.createElement(
              module12.ImageBackground,
              {
                resizeMode: 'cover',
                style: U.imageBgStyle,
                imageStyle: U.imageStyle,
                source: require('./1986'),
              },
              React.default.createElement(module12.ImageBackground, {
                resizeMode: 'contain',
                style: U.carpetImageStyle,
                source: this.backgroundImage,
              })
            ),
            React.default.createElement(
              module12.ScrollView,
              {
                style: U.textViewStyle,
                alwaysBounceVertical: false,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    U.titleStyle,
                    {
                      color: this.theme.titleColor,
                    },
                  ],
                },
                this.title
              ),
              this.isCarpetPage &&
                !module423.DMM.isGarnet &&
                React.default.createElement(
                  module12.View,
                  {
                    style: U.modeView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        U.modeTextBase,
                        {
                          color: this.theme.detailColor,
                        },
                      ],
                    },
                    module505.carpet_info_mode_title
                  ),
                  React.default.createElement(
                    module12.TouchableOpacity,
                    module22.default({}, module391.default.getAccessibilityLabel('carpet_info_mode_entry'), {
                      onPress: this.handlePressModeBtn,
                    }),
                    React.default.createElement(
                      module12.View,
                      {
                        style: U.modeViewInner,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: U.modeTextInner,
                        },
                        this.getCleanModeText()
                      ),
                      React.default.createElement(module12.Image, {
                        style: [
                          U.modeImage,
                          globals.isRTL && {
                            transform: [
                              {
                                rotate: '180deg',
                              },
                            ],
                          },
                        ],
                        source: require('./2024'),
                      })
                    )
                  )
                ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    U.detailStyle,
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
          var t = L(
              {
                width: N - 84,
                height: 42,
                radius: 20,
              },
              this.contextTheme.shadowConfig
            ),
            n = L(
              {
                width: N - 84,
                height: this.state.igBtnHeight,
                radius: 20,
              },
              this.contextTheme.shadowConfig
            ),
            o =
              !this.isCarpetPage ||
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden ||
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
            l = !this.isCarpetPage || this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
            s = React.default.createElement(
              module12.View,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: U.shadowView,
                },
                React.default.createElement(module1328.BoxShadow, {
                  setting: t,
                })
              ),
              React.default.createElement(module385.PureButton, {
                funcId: 'carpet_info_forbidden_entry',
                style: [
                  U.forbiddenBtn,
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
            c = !this.isCarpetPage || this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
            u = React.default.createElement(
              module1328.BoxShadow,
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
                  style: U.gradientView,
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'carpet_info_ignore_entry',
                  style: U.ignoreBtn,
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
            module12.View,
            {
              style: [
                U.bottomViewStyle,
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
        key: 'getDoorSillBuyView',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: [
                U.doorBuyView,
                {
                  backgroundColor: this.theme.topBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: U.doorBuyLeft,
              },
              React.default.createElement(module12.Image, {
                style: U.doorBugImg,
                resizeMode: 'contain',
                source: require('./1571'),
              }),
              React.default.createElement(
                module12.View,
                {
                  style: U.doorBuyText,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      U.buyMainText,
                      {
                        color: this.contextTheme.mainTextColor,
                      },
                    ],
                  },
                  module505.localization_strings_Setting_Supplies_Common_6
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      U.buySubText,
                      {
                        color: this.contextTheme.subTextColor,
                      },
                    ],
                  },
                  module505.localization_strings_Setting_Supplies_DetailsPage_15
                )
              )
            ),
            React.default.createElement(module385.PureImageButton, {
              image: this.contextTheme.settingListItem.rightArrowImg,
              imageWidth: 24,
              imageHeight: 24,
              style: U.floorArrow,
              imageStyle: U.arrowImage,
              onPress: this.onGotoBuyDoorSillPage,
            })
          );
        },
      },
      {
        key: '_carpetPageAction',
        value: function (t) {
          if (t) {
            var n;
            this.props.navigation.replace('MapEditForbiddenZonePage', {
              title: module505.map_edit_virtual_wall_and_forbidden_zone,
              carpetRect: null == (n = this.initParams) ? undefined : n.zoneData,
            });
          } else {
            var o;
            if (module381.RSM.isRunning)
              return void module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module505.robot_communication_exception);
              });
            this.props.navigation.replace('MapEditCarpetPage', {
              title: module505.map_edit_carpet_ignore_title,
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
            module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module505.robot_communication_exception);
            });
          else if (t) {
            if (
              (null == (n = this.initParams) ? undefined : n.zoneData) &&
              (null == (o = module414.MM.mapData) ? undefined : null == (s = o.smartds) ? undefined : null == (c = s.fbzs) ? undefined : c.length)
            ) {
              var h,
                _ = module414.MM.mapData.smartds.fbzs.concat(),
                y = null == (h = this.initParams.zoneData) ? undefined : h.data;

              if (!y) return;

              for (var C = [], v = 0; v < _.length; v++)
                if (_[v].toString() != y.toString()) {
                  var M = _[v];
                  M.forEach(function (t, n, o) {
                    return (o[n] = parseInt((50 * t).toFixed()));
                  });
                  C.push([1].concat(module31.default(M)));
                }

              y.forEach(function (t, n, o) {
                return (o[n] = parseInt((50 * t).toFixed()));
              });
              C.push([0].concat(module31.default(y)));

              if (C.length > 0) {
                module1340.setTimeout(function () {
                  return f.showLoading();
                }, 300);
                module1340.setTimeout(function () {
                  module414.MM.saveSmartDoorSillBlocks(module381.RSM.currentMapId, C, f.onMapSaveCompleted.bind(f));
                }, 500);
              }
            }
          } else
            (null == (u = this.initParams) ? undefined : u.zoneData) &&
              this.props.navigation.replace('MapEditDoorSillPage', {
                title: module505.map_edit_door_sill_title,
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
              return void module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module505.robot_communication_exception);
              });

            if (null == (o = this.initParams) ? undefined : o.zoneData) {
              module1340.setTimeout(function () {
                return n.showLoading();
              }, 300);
              module1340.setTimeout(function () {
                var t,
                  o,
                  l = null == (t = n.initParams) ? undefined : null == (o = t.zoneData.stuckPoint) ? undefined : o.data,
                  s = [[parseInt((50 * l[0]).toFixed()), parseInt((50 * l[1]).toFixed())]];
                module414.MM.saveSetIgnoreStuckPoint(module381.RSM.currentMapId, s, n.onMapSaveCompleted.bind(n));
              }, 500);
            }
          } else {
            var l;
            if (null == (l = this.initParams) ? undefined : l.zoneData)
              this.props.navigation.replace('MapEditForbiddenZonePage', {
                title: module505.map_edit_virtual_wall_and_forbidden_zone,
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
              return void module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module505.robot_communication_exception);
              });
            if (null == (o = this.initParams) ? undefined : o.zoneData)
              if (null == (s = module414.MM.mapData) ? undefined : null == (c = s.clffbz) ? undefined : null == (u = c.fbzs) ? undefined : u.length) {
                var p,
                  f = module414.MM.mapData.clffbz.fbzs.concat(),
                  h = null == (p = this.initParams.zoneData) ? undefined : p.data;
                if (!h) return;

                for (var _ = [], y = 0; y < f.length; y++)
                  if (f[y].toString() != h.toString()) {
                    var C = f[y];
                    C.forEach(function (t, n, o) {
                      return (o[n] = parseInt((50 * t).toFixed()));
                    });

                    _.push([1].concat(module31.default(C)));
                  }

                h.forEach(function (t, n, o) {
                  return (o[n] = parseInt((50 * t).toFixed()));
                });

                _.push([0].concat(module31.default(h)));

                if (_.length > 0) {
                  module1340.setTimeout(function () {
                    return n.showLoading();
                  }, 300);
                  module1340.setTimeout(function () {
                    module414.MM.saveSmartCliffForbidden(module381.RSM.currentMapId, _, n.onMapSaveCompleted.bind(n));
                  }, 500);
                }
              }
          } else {
            var v, M;
            if (null == (v = this.initParams) ? undefined : v.zoneData)
              this.props.navigation.replace('MapEditForbiddenZonePage', {
                title: module505.map_edit_virtual_wall_and_forbidden_zone,
                cliffZone: null == (M = this.initParams) ? undefined : M.zoneData,
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
            module12.View,
            {
              style: [
                U.container,
                {
                  backgroundColor: this.theme.backgroundColor,
                  justifyContent: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.initLoad) return n;
          var o = 'cn' == module381.RSM.serverCode && module390.default.isOpenMiShopSupported(),
            l = this.pageType == module1057.AIInfoPageType.DoorSill && o;
          return React.default.createElement(
            module12.View,
            {
              style: [
                U.container,
                {
                  backgroundColor: this.theme.backgroundColor,
                },
              ],
            },
            this.getHeaderView(),
            l && this.getDoorSillBuyView(),
            this.showBottomView && module1271.default.mapEditStep >= module1271.MapEditSteps.Saved && this.getBottomView(),
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
          return module1057.AIInfoPageBackRes[this.pageType].image || require('./461');
        },
      },
      {
        key: 'title',
        get: function () {
          return module1057.AIInfoPageBackRes[this.pageType].title || module505.carpet_bubble_name;
        },
      },
      {
        key: 'subText',
        get: function () {
          return module1057.AIInfoPageBackRes[this.pageType].detail || this.getCleanModeSubText();
        },
      },
      {
        key: 'topButtonText',
        get: function () {
          return K[this.pageType].topText || module505.carpet_info_goto_forbidden;
        },
      },
      {
        key: 'bottomBtnText',
        get: function () {
          return K[this.pageType].bottomText || module505.carpet_clean_mode_setting_ignore_carpet;
        },
      },
      {
        key: 'isCarpetPage',
        get: function () {
          return this.pageType == module1057.AIInfoPageType.Carpet;
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = module461;
module461.contextType = module1121.AppConfigContext;
var U = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  topViewStyle: {
    width: 335 * q,
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
    marginLeft: 20 * q,
    marginRight: 16 * q,
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
    maxWidth: N / 2 - 42,
  },
  modeTextInner: {
    fontSize: 12,
    color: '#007AFF',
    maxWidth: N / 2 - 58,
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
    width: N - 84,
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
    width: N - 84,
    height: 42,
  },
  ignoreBtn: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  doorBuyView: {
    marginTop: 16,
    width: 335 * q,
    height: 118,
    borderRadius: 10,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  arrowImage: {
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  floorArrow: {
    width: 36,
    alignSelf: 'stretch',
  },
  doorBuyLeft: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'flex-start',
  },
  doorBugImg: {
    width: 100,
    height: 72,
    marginRight: globals.isRTL ? 0 : 10,
    marginLeft: globals.isRTL ? 10 : 0,
  },
  doorBuyText: {
    justifyContent: 'center',
  },
  buyMainText: {
    fontSize: 14,
    marginBottom: 2,
  },
  buySubText: {
    fontSize: 12,
    marginTop: 2,
  },
});
