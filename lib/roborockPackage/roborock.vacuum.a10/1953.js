require('./1955');

require('./405');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = B(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module407 = require('./407'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1954 = require('./1954'),
  module390 = B(require('./390')),
  module386 = require('./386'),
  module1361 = require('./1361'),
  module925 = require('./925'),
  module415 = require('./415'),
  module411 = require('./411'),
  module1065 = require('./1065'),
  module506 = require('./506'),
  module1063 = require('./1063'),
  module935 = require('./935'),
  module1115 = require('./1115'),
  module1259 = require('./1259');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (x = function (t) {
    return t ? n : o;
  })(t);
}

function B(t, o) {
  if (!o && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var n = x(o);
  if (n && n.has(t)) return n.get(t);
  var s = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var u in t)
    if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
      var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
      if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
      else s[u] = t[u];
    }

  s.default = t;
  if (n) n.set(t, s);
  return s;
}

function L(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function A(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      L(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      L(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function R() {
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

require('./1268').Palette;
module12.ART.Group;
module12.ART.Transform;

var module389 = require('./389'),
  module491 = require('./491').strings,
  module934 = require('./934'),
  module1247 = require('./1247'),
  W = module12.PixelRatio.get(),
  G = module12.Dimensions.get('window').height - module934.StatusBarHeight - 44 - 150,
  U = module12.ART.Surface,
  q = module12.ART.Shape,
  K = module12.ART.Path,
  J = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
  };

exports.PhotoLoadingStatus = J;

var Q = (function (t) {
  module7.default(B, t);

  var module49 = B,
    module506 = R(),
    x = function () {
      var t,
        o = module11.default(module49);

      if (module506) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function B(t) {
    var o;
    module4.default(this, B);
    (o = x.call(this, t)).unMount = false;
    o.state = {
      gotPhoto: false,
      photoSource: '',
      photoSize: null,
      rectInfo: null,
      readPhotoLoadingStatus: J.LOADING,
      mapDebugInfoVisible: false,
      selfHeight: 300,
      shouldShowMenuView: false,
    };
    o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
    return o;
  }

  module5.default(B, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.unMount = true;
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        if (this.lottieView) this.lottieView.play();
        this.requestPhoto();
        var n;
        regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  s.next = 2;
                  return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MapDebugInfoVisible));

                case 2:
                  n = !!s.sent;
                  t.setState({
                    mapDebugInfoVisible: n,
                  });

                case 4:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
        this.props.navigation.setParams({
          navBarBackgroundColor: this.context.theme.remoteControl.backgroundColor,
          hiddenBottomLine: true,
        });
      },
    },
    {
      key: 'requestPhoto',
      value: function () {
        var t = this,
          o = this.props.navigation.state.params.currentObj.type,
          n = this.props.navigation.state.params.currentObj.photoId;
        if (18 == o && n.length < 1)
          this.setState({
            readPhotoLoadingStatus: J.FINISHED,
          });
        else if (!n || n.length < 1)
          this.setState({
            readPhotoLoadingStatus: J.NOPHOTO,
          });
        else if (module386.default.isFwFilterObstacleSupported() && module1361.default.mapObjectPhotoEnabled && n) {
          this.setState({
            readPhotoLoadingStatus: J.LOADING,
          });

          if (module390.MC.mapObjectLargePhotos['' + n]) {
            this.setState({
              photoSource: module390.MC.mapObjectLargePhotos['' + n].photoData,
              photoSize: module390.MC.mapObjectLargePhotos['' + n].photoSize,
              rectInfo: module390.MC.mapObjectLargePhotos['' + n].rectInfo,
            });
            this.setState({
              readPhotoLoadingStatus: J.FINISHED,
            });
          } else
            module389.getPhotoBase64Data(n, 0, function (o, s) {
              if (o) {
                var l = '' + s.photoData;
                module390.MC.mapObjectLargePhotos['' + n] = s;
                if (!t.unMount)
                  t.setState({
                    photoSource: l,
                    photoSize: s.photoSize,
                    rectInfo: s.rectInfo,
                    readPhotoLoadingStatus: J.FINISHED,
                  });
              } else
                !t.unMount &&
                  t.setState({
                    readPhotoLoadingStatus: J.FAILED,
                  });
            });
        }
      },
    },
    {
      key: 'actionSheetEnabledAdapter',
      value: function (t) {
        return !(!this.props.navigation.state.params.currentObj.photoId && 0 != t);
      },
    },
    {
      key: '_onSelectMenuViewMode',
      value: function (t) {
        var n = this;
        return regeneratorRuntime.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  setTimeout(function () {
                    if (0 == t) n.mapObjectIgnoreDescDialog && n.mapObjectIgnoreDescDialog.show();
                    else if (1 == t) {
                      var o = n.props.navigation.state.params.currentObj;
                      n.props.navigation.navigate('ObstacleTypeSelection', {
                        title: module491.actual_type_of_obstacle,
                        currentObj: o,
                      });
                    }
                  }, 500);
                  this.hideMenuView();

                case 2:
                case 'end':
                  return o.stop();
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
      key: 'setMenuView',
      value: function () {
        var t = this;
        this.setState(
          {
            shouldShowMenuView: true,
          },
          function () {
            module12.Animated.timing(t.animatedWrapMarginBottom, {
              toValue: 0,
              duration: 300,
            }).start();
          }
        );
      },
    },
    {
      key: 'hideMenuView',
      value: function () {
        var t = this;
        module12.Animated.timing(this.animatedWrapMarginBottom, {
          toValue: -500,
          duration: 300,
        }).start(function () {
          t.setState({
            shouldShowMenuView: false,
          });
        });
      },
    },
    {
      key: 'getInnerFailedView',
      value: function (t, o) {
        var n = this;
        return React.default.createElement(
          module12.View,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          React.default.createElement(module381.TopImageButton, {
            image: t,
            color: 'rgba(0,0,0,0.3)',
            imageWidth: 120,
            imageHeight: 120,
            style: {},
            title: o,
            textColor: this.context.theme.mapObjectPhoto.detailColor,
            fontSize: 16,
            textTop: -5,
            onPress: function () {
              n.requestPhoto();
            },
          })
        );
      },
    },
    {
      key: 'render',
      value: function () {
        this.props.navigation.state.params.currentObj.percent;
        var t = this,
          o = this.context.theme,
          n = module12.Dimensions.get('window').width - 40,
          s = 0.75 * n,
          l = this.props.navigation.state.params.currentObj,
          u = l.x,
          c = l.y,
          h = this.props.navigation.state.params.currentObj.type,
          M = this.props.navigation.state.params.currentObj.photoId,
          C = React.default.createElement(module12.View, null);

        if (this.state.photoSize && this.state.rectInfo) {
          var x = n / this.state.photoSize.width,
            B = this.state.rectInfo.x0 * x,
            L = this.state.rectInfo.y0 * x,
            R = (this.state.rectInfo.x1 - this.state.rectInfo.x0) * x,
            F = (this.state.rectInfo.y1 - this.state.rectInfo.y0) * x,
            module1962 = B - 10 < 1 ? B - 1 : 10,
            Y = L - 10 < 1 ? L - 1 : 10,
            Z = L + F + 10 > s ? s - L - F - 2 : 10,
            $ = B + R + 10 > n ? n - B - R - 2 : 10;
          B -= module1962;
          L -= Y;
          R = R + module1962 + $;
          F = F + Y + Z;
          C = React.default.createElement(module12.View, {
            style: {
              position: 'absolute',
              left: B,
              top: L,
              width: R,
              height: F,
              borderColor: 'yellow',
              borderWidth: 1,
            },
          });
          var tt = new K();
          tt.moveTo(1, 8);
          tt.lineTo(1, 1);
          tt.lineTo(8, 1);
          tt.moveTo(R + 1 - 8, 1);
          tt.lineTo(R + 1, 1);
          tt.lineTo(R + 1, 8);
          tt.moveTo(R + 1, F + 1 - 8);
          tt.lineTo(R + 1, F + 1);
          tt.lineTo(R + 1 - 8, F + 1);
          tt.moveTo(9, F + 1);
          tt.lineTo(1, F + 1);
          tt.lineTo(1, F + 1 - 8);
          C = React.default.createElement(
            module12.View,
            {
              style: {
                position: 'absolute',
                left: module12.I18nManager.isRTL ? n - B - R - 1 : B - 1,
                top: L - 1,
                width: R + 2,
                height: F + 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module12.View, {
              style: {
                position: 'absolute',
                left: 1,
                top: 1,
                width: R,
                height: F,
                borderColor: '#007aff',
                borderWidth: 1,
                backgroundColor: '#007aff22',
              },
            }),
            React.default.createElement(
              U,
              {
                width: R + 2,
                height: F + 2,
                style: {
                  flex: 1,
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(q, {
                stroke: '#007aff',
                strokeWidth: 3,
                d: tt,
              })
            )
          );
        }

        var module1958 = this.getInnerFailedView(require('./1958'), module491.map_object_bubble_tip_no_photo),
          module1959 = this.getInnerFailedView(require('./1959'), module491.button_title_retry),
          module1276 = React.default.createElement(module925.default, {
            ref: function (o) {
              return (t.lottieView = o);
            },
            source: require('./1276'),
            loop: true,
            style: {
              width: 550,
              height: 550,
              alignSelf: 'center',
            },
          }),
          at = undefined !== this.state.photoSource && this.state.photoSource.length > 0,
          module1960 = React.default.createElement(
            module12.View,
            {
              style: {
                width: n,
                height: s - 20 / W,
                justifyContent: 'center',
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: 'transparent',
              },
            },
            React.default.createElement(
              module12.ImageBackground,
              {
                resizeMode: 'cover',
                style: {
                  width: n,
                  height: s,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                },
                source:
                  18 == h && M.length < 1
                    ? require('./1960')
                    : at
                    ? {
                        uri: this.state.photoSource,
                      }
                    : null,
              },
              C,
              this.state.readPhotoLoadingStatus == J.LOADING && module1276,
              this.state.readPhotoLoadingStatus == J.FAILED && module1959,
              this.state.readPhotoLoadingStatus == J.NOPHOTO && module1958
            )
          ),
          rt = module415.DMM.obstacleImagesMap.topBigImage[h],
          module1961 = React.default.createElement(
            module12.ImageBackground,
            {
              resizeMode: 'cover',
              style: {
                width: n,
                height: 0.45 * n,
                justifyContent: 'center',
                alignSelf: 'stretch',
              },
              source: require('./1961'),
            },
            React.default.createElement(module12.ImageBackground, {
              resizeMode: 'contain',
              style: {
                width: 147,
                height: 147,
                alignSelf: 'center',
              },
              source: rt,
            })
          ),
          lt = module934.obstacleNames[h];
        if (undefined === lt) lt = ' ';
        if (!(42 != h || module415.DMM.isV1)) lt += '(AI)';
        var ut = module1361.default.mapObjectPhotoEnabled && module386.default.isPhotoUploadSupported() && !module387.default.isShareUser() && module415.DMM.isTanosV_CN,
          ct = module386.default.isStructuredLightSupported() ? module934.obstacleRemoveTipsStructuredLight : module934.obstacleRemoveTips,
          ht = this.state.selfHeight > G ? G : this.state.selfHeight,
          dt = A(
            A({}, module1063.BaseShadow),
            {},
            {
              width: n,
              height: ht,
              radius: 14,
              color: o.shadowColor,
              style: {
                marginVertical: 20,
                marginHorizontal: 20,
              },
            }
          ),
          ft =
            this.state.shouldShowMenuView &&
            React.default.createElement(
              module935.default,
              {
                transparent: true,
                onRequestClose: function () {
                  t.hideMenuView();
                },
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: function () {
                    t.hideMenuView();
                  },
                },
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: [
                      X.modal,
                      {
                        opacity: this.animatedWrapMarginBottom.interpolate({
                          inputRange: [-500, 0],
                          outputRange: [0, 1],
                        }),
                        height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: {
                        height: 500,
                        marginBottom: this.animatedWrapMarginBottom,
                        justifyContent: 'flex-end',
                        paddingBottom: 25,
                        overflow: 'hidden',
                      },
                    },
                    React.default.createElement(module1115.ActionSheetView, {
                      actions: [module491.obstacle_photo_page_ignore, module491.obstacle_photo_page_feedback],
                      didSelectRow: function (o) {
                        return t._onSelectMenuViewMode(o);
                      },
                      onPressCancel: function () {
                        t.hideMenuView();
                      },
                      enabledAdapter: this.actionSheetEnabledAdapter.bind(this),
                    })
                  )
                )
              )
            );
        return React.default.createElement(
          module12.View,
          {
            style: [
              X.containter,
              {
                backgroundColor: o.settingBackgroundColor,
              },
            ],
          },
          React.default.createElement(
            module1065.BoxShadow,
            {
              setting: dt,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                bounces: false,
                alwaysBounceVertical: true,
                showsVerticalScrollIndicator: false,
                style: {
                  height: ht,
                  borderRadius: 14,
                  backgroundColor: o.componentBackgroundColor,
                },
              },
              React.default.createElement(
                module12.View,
                {
                  onLayout: this._onLayout.bind(this),
                  style: [
                    X.top,
                    {
                      backgroundColor: o.componentBackgroundColor,
                    },
                  ],
                },
                (module386.default.isFwFilterObstacleSupported() && module1361.default.mapObjectPhotoEnabled) ||
                  (module386.default.isFwFilterObstacleSupported() && module1361.default.mapObjectPhotoEnabled && 18 == h)
                  ? module1960
                  : module1961,
                React.default.createElement(
                  module12.View,
                  {
                    style: X.line,
                  },
                  React.default.createElement(module12.Image, {
                    resizeMode: 'stretch',
                    style: {
                      width: 26,
                      height: 26,
                    },
                    source: require('./1962'),
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        X.contentText,
                        {
                          color: o.mapObjectPhoto.titleColor,
                          fontSize: 16,
                          marginHorizontal: 5,
                          marginVertical: 0,
                          marginTop: 6,
                          marginBottom: 5,
                        },
                      ],
                    },
                    module491.obstacle_photo_page_subtitle + lt
                  )
                ),
                (function () {
                  if ((18 != h && 42 != h) || !module415.DMM.isV1) {
                    if (t.props.navigation.state.params.shouldShowPossibility) {
                      var n = !module415.DMM.isV1 && t.state.mapDebugInfoVisible ? ' | \u5750\u6807\u7cfb: ' + u + ' ' + c : '';
                      return React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            X.contentText,
                            {
                              color: o.mapObjectPhoto.detailColor,
                              marginTop: 2,
                            },
                          ],
                        },
                        module491.obstacle_photo_page_percent + Math.floor(t.props.navigation.state.params.currentObj.percent / 100) + '%' + n
                      );
                    }

                    return React.default.createElement(module12.View, null);
                  }

                  return React.default.createElement(module12.View, null);
                })(),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      X.contentText,
                      {
                        color: o.mapObjectPhoto.detailColor,
                        marginTop: 4,
                        marginBottom: 30,
                      },
                    ],
                  },
                  '' + ct[h]
                )
              )
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: X.bottom,
            },
            (18 != h || module386.default.isIgnoreUnknownMapObjectSupported()) &&
              React.default.createElement(module381.PureButton, {
                funcId: 'obstacle_photo_page_ignore_link',
                title: ut ? module491.obstacle_photo_page_identify_mistakes : module491.obstacle_photo_page_ignore_link,
                textColor: o.mapObjectPhoto.btnTextColor,
                style: [
                  X.bottomBtn,
                  {
                    backgroundColor: o.mapObjectPhoto.btnBackgroundColor,
                  },
                ],
                fontSize: 16,
                onPress: function () {
                  if (module377.RSM.mapSaveEnabled)
                    module377.RSM.isRunning
                      ? module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                          globals.showToast(module491.robot_communication_exception);
                        })
                      : ut
                      ? t.setMenuView && t.setMenuView()
                      : t.mapObjectIgnoreDescDialog && t.mapObjectIgnoreDescDialog.show();
                  else globals.showToast(module491.open_map_save_mode_tip);
                },
              })
          ),
          React.default.createElement(module1954.MapObjectIgnoreDescDialog, {
            ref: function (o) {
              return (t.mapObjectIgnoreDescDialog = o);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module491.rubys_location_confirm_button_confirm,
            onConfirm: function () {
              var o = t.props.navigation.state.params.currentObj,
                n = t.props.navigation.state.params.ignoredObjArray,
                s = module377.RobotStatusManager.sharedManager().currentMapId,
                l = module386.default.isStructuredLightSupported() ? -1 : o.type,
                u = [
                  [1, s],
                  [2, o.x, o.y, l],
                ];
              if (n)
                for (var c = 0; c < n.length; c++) {
                  var h = [2, n[c][0], n[c][1], n[c][2]];
                  u.push(h);
                }
              module407.default
                .setIgnoreIdentifyArea(u)
                .then(function () {
                  globals.showToast(module491.map_reset_page_operate_success);
                  module1247.setTimeout(function () {
                    t.props.navigation.pop();
                  }, 1e3);
                })
                .catch(function (t) {
                  console.log('' + t);
                  globals.showToast(module491.map_object_ignore_failed);
                });
            },
          }),
          ft
        );
      },
    },
    {
      key: '_onLayout',
      value: function (t) {
        var o = t.nativeEvent.layout.height;
        this.setState({
          selfHeight: o,
        });
      },
    },
  ]);
  return B;
})(React.Component);

exports.default = Q;
Q.contextType = module506.AppConfigContext;
var X = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 14,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    lineHeight: 19,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginVertical: 0,
  },
  bottomBtnText: {
    color: 'rgba(0,122,255,1)',
    fontSize: 16,
    alignSelf: 'center',
  },
  bottomBtn: {
    width: module12.Dimensions.get('window').width - 84,
    height: 42,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'center',
  },
  section: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  innerPhotoText: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 16,
    textAlign: 'center',
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module934.AppBorderRadius,
  },
});
