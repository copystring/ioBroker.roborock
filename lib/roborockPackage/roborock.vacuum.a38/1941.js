var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1161 = require('./1161'),
  module515 = require('./515'),
  module385 = require('./385'),
  module418 = require('./418'),
  module414 = require('./414'),
  module394 = require('./394'),
  module391 = require('./391'),
  module381 = require('./381'),
  module1330 = require('./1330'),
  module422 = require('./422'),
  module1391 = require('./1391');

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

function I(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      R(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function k() {
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
  module389 = require('./389'),
  O = module12.Dimensions.get('window'),
  D = O.width,
  j = O.height,
  H = D / 375,
  A = module12.StatusBar.currentHeight || 0,
  module1942 = (function (t) {
    module7.default(R, t);

    var n = R,
      module50 = k(),
      b = function () {
        var t,
          l = module11.default(n);

        if (module50) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);

      (n = b.call(this, t)).handlePressForbiddenBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          n.props.navigation.replace('MapEditForbiddenZonePage', {
            title: module500.map_edit_virtual_wall_and_forbidden_zone,
            carpetRect: n.carpetRect,
          });
        else globals.showToast(module500.open_map_save_mode_tip);
      };

      n.handlePressIgnoreBtn = function () {
        if (module381.RSM.mapSaveEnabled)
          module381.RSM.isRunning
            ? module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module500.robot_communication_exception);
              })
            : n.props.navigation.replace('MapCarpetIgnorePage', {
                title: module500.map_edit_carpet_ignore_title,
                carpetRect: n.carpetRect,
              });
        else globals.showToast(module500.open_map_save_mode_tip);
      };

      n.handlePressModeBtn = function () {
        n.props.navigation.navigate('CarpetCleanModeSetting', {
          parent: module6.default(n),
          title: module500.carpet_clean_mode_setting_title,
        });
      };

      n.handlePressRetryBtn = function () {
        return n.initData(true);
      };

      n.handleSubTextLayout = function (t) {
        var o = 234 + t.nativeEvent.layout.height + 20;
        o = 360 ** o;
        o = o ** (j - A - 44 - 142 - 30);
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
        cleanMode: module394.default.sharedCache().carPetCleanMode,
        topHeight: 360,
        igBtnHeight: 42,
      };
      return n;
    }

    module5.default(R, [
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
                    this.carpetCleanModelistener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.CarpetCleanModeDidChange, function (n) {
                      t.setState({
                        cleanMode: module394.default.sharedCache().carPetCleanMode,
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
          this.getDataTask = module414.default.getCarpetCleanMode();
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
                globals.showToast(module500.robot_communication_exception);
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
            case module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module500.carpet_clean_mode_setting_title1;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module500.carpet_clean_mode_setting_title2;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden:
              return module500.carpet_clean_mode_setting_title3;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden:
              return module500.carpet_clean_mode_setting_title4;
          }
        },
      },
      {
        key: 'getCleanModeSubText',
        value: function () {
          var t = '\n' + module500.carpet_info_mode_ingore_tip,
            n = '\n' + module500.carpet_info_mode_forbidden_tip;

          switch (this.state.cleanMode) {
            case module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden:
              return module500.carpet_clean_mode_setting_sub_title1 + t;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden:
              return module500.carpet_clean_mode_setting_sub_title2 + t + n;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden:
              return module500.carpet_clean_mode_setting_sub_title3 + n;

            case module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden:
              return module500.carpet_clean_mode_setting_sub_title2 + t + n;
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
              style: N.container,
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
                N.topViewStyle,
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
              React.default.createElement(module1161.BoxShadow, {
                setting: n,
              })
            ),
            React.default.createElement(
              module12.ImageBackground,
              {
                resizeMode: 'cover',
                style: N.imageBgStyle,
                imageStyle: N.imageStyle,
                source: require('./1935'),
              },
              React.default.createElement(module12.ImageBackground, {
                resizeMode: 'contain',
                style: N.carpetImageStyle,
                source: require('./456'),
              })
            ),
            React.default.createElement(
              module12.ScrollView,
              {
                style: N.textViewStyle,
                alwaysBounceVertical: false,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    N.titleStyle,
                    {
                      color: t.titleColor,
                    },
                  ],
                },
                module500.carpet_bubble_name
              ),
              !module422.DMM.isGarnet &&
                React.default.createElement(
                  module12.View,
                  {
                    style: N.modeView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        N.modeTextBase,
                        {
                          color: t.detailColor,
                        },
                      ],
                    },
                    module500.carpet_info_mode_title
                  ),
                  React.default.createElement(
                    module12.TouchableOpacity,
                    module22.default({}, module391.default.getAccessibilityLabel('carpet_info_mode_entry'), {
                      onPress: this.handlePressModeBtn,
                    }),
                    React.default.createElement(
                      module12.View,
                      {
                        style: N.modeViewInner,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: N.modeTextInner,
                        },
                        this.getCleanModeText()
                      ),
                      React.default.createElement(module12.Image, {
                        style: [
                          N.modeImage,
                          globals.isRTL && {
                            transform: [
                              {
                                rotate: '180deg',
                              },
                            ],
                          },
                        ],
                        source: require('./1942'),
                      })
                    )
                  )
                ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    N.detailStyle,
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
            n = I(
              {
                width: D - 84,
                height: 42,
                radius: 20,
              },
              t.shadowConfig
            ),
            o = I(
              {
                width: D - 84,
                height: this.state.igBtnHeight,
                radius: 20,
              },
              t.shadowConfig
            ),
            l =
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden ||
              this.state.cleanMode == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
            s = React.default.createElement(
              module12.View,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: N.shadowView,
                },
                React.default.createElement(module1161.BoxShadow, {
                  setting: n,
                })
              ),
              React.default.createElement(module385.PureButton, {
                funcId: 'carpet_info_forbidden_entry',
                style: [
                  N.forbiddenBtn,
                  {
                    backgroundColor: t.carpetInfoPage.fbButtonColor,
                  },
                ],
                title: module500.carpet_info_goto_forbidden,
                textColor: t.carpetInfoPage.fbTextColor,
                fontSize: 16,
                onPress: this.handlePressForbiddenBtn,
              })
            ),
            c = React.default.createElement(
              module1161.BoxShadow,
              {
                setting: o,
              },
              React.default.createElement(
                module385.GradientView,
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
                  style: N.gradientView,
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'carpet_info_ignore_entry',
                  style: N.ignoreBtn,
                  title: module500.carpet_clean_mode_setting_ignore_carpet,
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
                N.bottomViewStyle,
                {
                  justifyContent: l ? 'space-around' : 'flex-end',
                },
              ],
            },
            this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden && s,
            this.state.cleanMode != module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden && c
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.carpetInfoPage,
            n = React.default.createElement(module385.RequestRetryView, {
              onPressButton: this.handlePressRetryBtn,
            });
          if (this.state.requestFailed) return n;
          var o = React.default.createElement(
            module12.View,
            {
              style: [
                N.container,
                {
                  backgroundColor: t.backgroundColor,
                  justifyContent: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          return this.state.initLoad
            ? o
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    N.container,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                this.getHeaderView(),
                this.showBottomView && module1330.MapEditCommonService.mapEditStep >= module1330.MapEditSteps.Saved && this.getBottomView(),
                this.getLoadingView()
              );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = module1942;
module1942.contextType = module515.AppConfigContext;
var N = module12.StyleSheet.create({
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
    maxWidth: D / 2 - 42,
  },
  modeTextInner: {
    fontSize: 12,
    color: '#007AFF',
    maxWidth: D / 2 - 58,
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
    width: D - 84,
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
    width: D - 84,
    height: 42,
  },
  ignoreBtn: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
