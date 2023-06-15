var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module1067 = require('./1067'),
  module506 = require('./506'),
  module381 = require('./381'),
  module411 = require('./411'),
  module407 = require('./407'),
  module390 = require('./390'),
  module387 = require('./387'),
  module377 = require('./377'),
  module1233 = require('./1233'),
  module415 = require('./415'),
  module1261 = require('./1261');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function T(t, n) {
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

function k(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      T(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function I() {
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
  module385 = require('./385'),
  F = module12.Dimensions.get('window'),
  L = F.width,
  D = F.height,
  H = L / 375,
  A = module12.StatusBar.currentHeight || 0,
  module1970 = (function (t) {
    module7.default(T, t);

    var module49 = T,
      module506 = I(),
      O = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var n;
      module4.default(this, T);

      (n = O.call(this, t)).handlePressForbiddenBtn = function () {
        if (module377.RSM.mapSaveEnabled) {
          n.props.navigation.pop();
          n.props.navigation.navigate('MapEditForbiddenZonePage', {
            title: module491.map_edit_virtual_wall_and_forbidden_zone,
            carpetRect: n.carpetRect,
          });
        } else globals.showToast(module491.open_map_save_mode_tip);
      };

      n.handlePressIgnoreBtn = function () {
        if (module377.RSM.mapSaveEnabled)
          module377.RSM.isRunning
            ? module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module491.robot_communication_exception);
              })
            : (n.props.navigation.pop(),
              n.props.navigation.navigate('MapCarpetIgnorePage', {
                title: module491.map_edit_carpet_ignore_title,
                carpetRect: n.carpetRect,
              }));
        else globals.showToast(module491.open_map_save_mode_tip);
      };

      n.handlePressModeBtn = function () {
        n.props.navigation.navigate('CarpetCleanModeSetting', {
          parent: module6.default(n),
          title: module491.carpet_clean_mode_setting_title,
        });
      };

      n.handlePressRetryBtn = function () {
        return n.initData(true);
      };

      n.handleSubTextLayout = function (t) {
        var o = 234 + t.nativeEvent.layout.height + 20;
        o = 360 ** o;
        o = o ** (D - A - 44 - 142 - 30);
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
        cleanMode: module390.default.sharedCache().carPetCleanMode,
        topHeight: 360,
        igBtnHeight: 42,
      };
      return n;
    }

    module5.default(T, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.carpetRect = this.props.navigation.getParam('carpetRect', null);
                    this.showBottomView = this.props.navigation.getParam('showBottomView', true);
                    this.carpetCleanModelistener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.CarpetCleanModeDidChange, function (n) {
                      t.setState({
                        cleanMode: module390.default.sharedCache().carPetCleanMode,
                      });
                    });
                    this.initData();

                  case 4:
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
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          if (this.carpetCleanModelistener) this.carpetCleanModelistener.remove();
        },
      },
      {
        key: 'initData',
        value: function () {
          var t = this,
            n = arguments.length > 0 && undefined !== arguments[0] && arguments[0];
          if (n)
            this.setState(
              {
                requestFailed: false,
              },
              function () {
                if (t.loadingView) t.loadingView.showWithText();
              }
            );
          this.getDataTask = module407.default.getCarpetCleanMode();
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
                globals.showToast(module491.robot_communication_exception);
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
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          if (this.loadingView) this.loadingView.hide();
          this.setState({
            requestFailed: t,
          });
        },
      },
      {
        key: 'getCleanModeText',
        value: function () {
          switch (this.state.cleanMode) {
            case module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module491.carpet_clean_mode_setting_title1;

            case module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module491.carpet_clean_mode_setting_title2;

            default:
              return module491.carpet_clean_mode_setting_title3;
          }
        },
      },
      {
        key: 'getCleanModeSubText',
        value: function () {
          var t = '\n' + module491.carpet_info_mode_ingore_tip,
            n = '\n' + module491.carpet_info_mode_forbidden_tip;

          switch (this.state.cleanMode) {
            case module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module491.carpet_clean_mode_setting_sub_title1 + t;

            case module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module491.carpet_clean_mode_setting_sub_title2 + t + n;

            default:
              return module491.carpet_clean_mode_setting_sub_title3 + n;
          }
        },
      },
      {
        key: 'getLoadingView',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: W.container,
            },
            React.default.createElement(module381.CancelableLoadingView, {
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
          var t = this.context.theme.carpetInfoPage,
            n = {
              width: 335 * H,
              height: this.state.topHeight,
              color: t.shadowColor,
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
                W.topViewStyle,
                {
                  backgroundColor: t.topBackgroundColor,
                  height: this.state.topHeight,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  width: 335 * H,
                  height: this.state.topHeight,
                },
              },
              React.default.createElement(module1067.BoxShadow, {
                setting: n,
              })
            ),
            React.default.createElement(
              module12.ImageBackground,
              {
                resizeMode: 'cover',
                style: W.imageBgStyle,
                imageStyle: W.imageStyle,
                source: require('./1963'),
              },
              React.default.createElement(module12.ImageBackground, {
                resizeMode: 'contain',
                style: W.carpetImageStyle,
                source: require('./449'),
              })
            ),
            React.default.createElement(
              module12.ScrollView,
              {
                style: W.textViewStyle,
                alwaysBounceVertical: false,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    W.titleStyle,
                    {
                      color: t.titleColor,
                    },
                  ],
                },
                module491.carpet_bubble_name
              ),
              !module415.DMM.isGarnet &&
                React.default.createElement(
                  module12.View,
                  {
                    style: W.modeView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        W.modeTextBase,
                        {
                          color: t.detailColor,
                        },
                      ],
                    },
                    module491.carpet_info_mode_title
                  ),
                  React.default.createElement(
                    module12.TouchableOpacity,
                    module21.default({}, module387.default.getAccessibilityLabel('carpet_info_mode_entry'), {
                      onPress: this.handlePressModeBtn,
                    }),
                    React.default.createElement(
                      module12.View,
                      {
                        style: W.modeViewInner,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: W.modeTextInner,
                        },
                        this.getCleanModeText()
                      ),
                      React.default.createElement(module12.Image, {
                        style: W.modeImage,
                        source: require('./1970'),
                      })
                    )
                  )
                ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    W.detailStyle,
                    {
                      color: t.detailColor,
                    },
                  ],
                  onLayout: this.handleSubTextLayout,
                },
                this.getCleanModeSubText()
              )
            )
          );
        },
      },
      {
        key: 'getBottomView',
        value: function () {
          var t = this.context.theme,
            n = k(
              {
                width: L - 84,
                height: 42,
                radius: 20,
              },
              t.shadowConfig
            ),
            o = k(
              {
                width: L - 84,
                height: this.state.igBtnHeight,
                radius: 20,
              },
              t.shadowConfig
            ),
            l = this.state.cleanMode == module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
            s = React.default.createElement(
              module12.View,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: W.shadowView,
                },
                React.default.createElement(module1067.BoxShadow, {
                  setting: n,
                })
              ),
              React.default.createElement(module381.PureButton, {
                funcId: 'carpet_info_forbidden_entry',
                style: [
                  W.forbiddenBtn,
                  {
                    backgroundColor: t.carpetInfoPage.fbButtonColor,
                  },
                ],
                title: module491.carpet_info_goto_forbidden,
                textColor: t.carpetInfoPage.fbTextColor,
                fontSize: 16,
                onPress: this.handlePressForbiddenBtn,
              })
            ),
            c = React.default.createElement(
              module1067.BoxShadow,
              {
                setting: o,
              },
              React.default.createElement(
                module381.GradientView,
                {
                  colors: [t.gradientColorStart, t.gradientColorEnd],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: W.gradientView,
                },
                React.default.createElement(module381.PureButton, {
                  funcId: 'carpet_info_ignore_entry',
                  style: W.ignoreBtn,
                  title: module491.carpet_clean_mode_setting_ignore_carpet,
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
                W.bottomViewStyle,
                {
                  justifyContent: l ? 'space-around' : 'flex-end',
                },
              ],
            },
            this.state.cleanMode != module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden && s,
            this.state.cleanMode != module385.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden && c
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.carpetInfoPage,
            n = React.default.createElement(module381.RequestRetryView, {
              onPressButton: this.handlePressRetryBtn,
            });
          if (this.state.requestFailed) return n;
          var o = React.default.createElement(
            module12.View,
            {
              style: [
                W.container,
                {
                  backgroundColor: t.backgroundColor,
                  justifyContent: 'center',
                },
              ],
            },
            React.default.createElement(module381.Spinner, null)
          );
          return this.state.initLoad
            ? o
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    W.container,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                this.getHeaderView(),
                this.showBottomView && module1233.MapEditCommonService.mapEditStep >= module1233.MapEditSteps.Saved && this.getBottomView(),
                this.getLoadingView()
              );
        },
      },
    ]);
    return T;
  })(React.Component);

exports.default = module1970;
module1970.contextType = module506.AppConfigContext;
var W = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  topViewStyle: {
    width: 335 * H,
    borderRadius: 8,
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
    marginLeft: 20 * H,
    marginRight: 16 * H,
    alignSelf: 'flex-start',
  },
  titleStyle: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  modeView: {
    minHeight: 20,
    minWidth: 180,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modeViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeTextBase: {
    fontSize: 12,
    textAlign: 'left',
    color: '#9b9b9b',
    maxWidth: L / 2 - 42,
  },
  modeTextInner: {
    fontSize: 12,
    textAlign: 'left',
    color: '#007AFF',
    maxWidth: L / 2 - 58,
  },
  modeImage: {
    width: 14,
    height: 14,
    tintColor: '#007AFF',
  },
  detailStyle: {
    fontSize: 12,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 13,
  },
  bottomViewStyle: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'center',
    width: L - 84,
    minHeight: 100,
    bottom: module387.default.isIphoneX() ? 35 : 20,
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
    width: L - 84,
    height: 42,
  },
  ignoreBtn: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
