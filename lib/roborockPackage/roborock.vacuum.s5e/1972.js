var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module415 = require('./415'),
  module385 = require('./385'),
  module381 = require('./381'),
  module1973 = require('./1973'),
  module394 = require('./394'),
  module390 = require('./390'),
  module1558 = require('./1558'),
  module1125 = require('./1125'),
  module423 = require('./423'),
  module419 = require('./419'),
  module1328 = require('./1328'),
  module1121 = require('./1121'),
  module1355 = require('./1355'),
  module1138 = require('./1138'),
  module1427 = require('./1427'),
  module1122 = require('./1122'),
  module1974 = require('./1974');

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

function R(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      L(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      L(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function A() {
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

var module393 = require('./393'),
  module505 = require('./505').strings,
  module1265 = require('./1265'),
  module1340 = require('./1340'),
  W = module12.PixelRatio.get(),
  U = module12.ART.Surface,
  G = module12.ART.Shape,
  q = module12.ART.Path,
  K = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
  };

exports.PhotoLoadingStatus = K;

var X = (function (t) {
  module7.default(L, t);

  var o = L,
    module50 = A(),
    T = function () {
      var t,
        s = module11.default(o);

      if (module50) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(s, arguments, l);
      } else t = s.apply(this, arguments);

      return module9.default(this, t);
    };

  function L(t) {
    var o;
    module4.default(this, L);

    (o = T.call(this, t))._onLayout = function (t) {
      var n = t.nativeEvent.layout.height;
      o.setState({
        selfHeight: n,
      });
    };

    o._onPressBottomBtn = function () {
      var t;
      if (module381.RSM.mapSaveEnabled)
        module381.RSM.isRunning
          ? module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module505.robot_communication_exception);
            })
          : module1558.default.mapObjectPhotoEnabled &&
            module390.default.isPhotoUploadSupported() &&
            !module391.default.isShareUser() &&
            (module423.DMM.isTanosV_CN || module423.DMM.isTopazSV_CN)
          ? o.setMenuView && o.setMenuView()
          : null == (t = o.mapObjectIgnoreDescDialog) || t.show();
      else globals.showToast(module505.open_map_save_mode_tip);
    };

    o._onConfirmIgnoreObject = function () {
      var t = o.props.navigation.state.params.currentObj,
        n = o.props.navigation.state.params.ignoredObjArray,
        s = module381.RobotStatusManager.sharedManager().currentMapId,
        l = module390.default.isShowGeneralObstacle() ? -1 : t.type,
        c = [
          [1, s],
          [2, t.x, t.y, l],
        ];
      if (n)
        for (var u = 0; u < n.length && u < 49; u++) {
          var h = [2, n[u][0], n[u][1], n[u][2]];
          c.push(h);
        }
      module415.default
        .setIgnoreIdentifyArea(c)
        .then(function () {
          globals.showToast(module505.map_reset_page_operate_success);
          module1340.setTimeout(function () {
            o.props.navigation.pop();
          }, 1e3);
        })
        .catch(function (t) {
          console.log('' + t);
          globals.showToast(module505.map_object_ignore_failed);
        });
    };

    o.unMount = false;
    o.state = {
      gotPhoto: false,
      photoSource: '',
      photoSize: null,
      rectInfo: null,
      readPhotoLoadingStatus: K.LOADING,
      mapDebugInfoVisible: false,
      selfHeight: 300,
      shouldShowMenuView: false,
    };
    o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
    return o;
  }

  module5.default(L, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.unMount = true;
        module1974.default.isConnected.removeEventListener('connectionChange', this.onNetWorkChange.bind(this));
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        if (this.lottieView) this.lottieView.play();
        this.requestPhoto();
        var o;
        regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MapDebugInfoVisible));

                case 2:
                  o = !!n.sent;
                  t.setState({
                    mapDebugInfoVisible: o,
                  });

                case 4:
                case 'end':
                  return n.stop();
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
        module1974.default.isConnected.addEventListener('connectionChange', this.onNetWorkChange.bind(this));
      },
    },
    {
      key: 'onNetWorkChange',
      value: function () {
        this.setState({
          shouldShowMenuView: false,
        });
        if (this.mapObjectIgnoreDescDialog) this.mapObjectIgnoreDescDialog.hide();
      },
    },
    {
      key: 'requestPhoto',
      value: function () {
        var t = this,
          o = this.props.navigation.state.params.currentObj.photoId;
        if (!(!o || o.length < 1))
          module390.default.isFwFilterObstacleSupported() &&
            module1558.default.mapObjectPhotoEnabled &&
            o &&
            (this.setState({
              readPhotoLoadingStatus: K.LOADING,
            }),
            module394.MC.mapObjectLargePhotos['' + o]
              ? (this.setState({
                  photoSource: module394.MC.mapObjectLargePhotos['' + o].photoData,
                  photoSize: module394.MC.mapObjectLargePhotos['' + o].photoSize,
                  rectInfo: module394.MC.mapObjectLargePhotos['' + o].rectInfo,
                }),
                this.setState({
                  readPhotoLoadingStatus: K.FINISHED,
                }))
              : module393.getPhotoBase64Data(o, 0, function (n, s) {
                  if (n) {
                    var l = '' + s.photoData;
                    module394.MC.mapObjectLargePhotos['' + o] = s;
                    if (!t.unMount)
                      t.setState({
                        photoSource: l,
                        photoSize: s.photoSize,
                        rectInfo: s.rectInfo,
                        readPhotoLoadingStatus: K.FINISHED,
                      });
                  } else
                    !t.unMount &&
                      t.setState({
                        readPhotoLoadingStatus: K.FAILED,
                      });
                }));
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
        var o = this;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  setTimeout(function () {
                    if (0 == t) o.mapObjectIgnoreDescDialog && o.mapObjectIgnoreDescDialog.show();
                    else if (1 == t) {
                      var n = o.props.navigation.state.params.currentObj;
                      o.props.navigation.navigate('ObstacleTypeSelection', {
                        title: module505.actual_type_of_obstacle,
                        currentObj: n,
                      });
                    }
                  }, 500);
                  this.hideMenuView();

                case 2:
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
          React.default.createElement(module385.TopImageButton, {
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
          n = module12.Dimensions.get('window').height - module1265.StatusBarHeight - 44 - 150,
          s = module12.Dimensions.get('window').width - 40,
          l = 0.75 * s,
          c = this.props.navigation.state.params.currentObj,
          u = c.x,
          h = c.y,
          f = this.props.navigation.state.params.currentObj.type,
          y = this.props.navigation.state.params.currentObj.photoId,
          v = React.default.createElement(module12.View, null);

        if (this.state.photoSize && this.state.rectInfo) {
          var V = s / this.state.photoSize.width,
            T = this.state.rectInfo.x0 * V,
            x = this.state.rectInfo.y0 * V,
            B = (this.state.rectInfo.x1 - this.state.rectInfo.x0) * V,
            L = (this.state.rectInfo.y1 - this.state.rectInfo.y0) * V,
            A = T - 10 < 1 ? T - 1 : 10,
            F = x - 10 < 1 ? x - 1 : 10,
            H = x + L + 10 > l ? l - x - L - 2 : 10,
            module1985 = T + B + 10 > s ? s - T - B - 2 : 10;
          T -= A;
          x -= F;
          B = B + A + module1985;
          L = L + F + H;
          v = React.default.createElement(module12.View, {
            style: {
              position: 'absolute',
              left: T,
              top: x,
              width: B,
              height: L,
              borderColor: 'yellow',
              borderWidth: 1,
            },
          });
          var Q = new q();
          Q.moveTo(1, 8);
          Q.lineTo(1, 1);
          Q.lineTo(8, 1);
          Q.moveTo(B + 1 - 8, 1);
          Q.lineTo(B + 1, 1);
          Q.lineTo(B + 1, 8);
          Q.moveTo(B + 1, L + 1 - 8);
          Q.lineTo(B + 1, L + 1);
          Q.lineTo(B + 1 - 8, L + 1);
          Q.moveTo(9, L + 1);
          Q.lineTo(1, L + 1);
          Q.lineTo(1, L + 1 - 8);
          v = React.default.createElement(
            module12.View,
            {
              style: {
                position: 'absolute',
                left: module12.I18nManager.isRTL ? s - T - B - 1 : T - 1,
                top: x - 1,
                width: B + 2,
                height: L + 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module12.View, {
              style: {
                position: 'absolute',
                left: 1,
                top: 1,
                width: B,
                height: L,
                borderColor: '#007aff',
                borderWidth: 1,
                backgroundColor: '#007aff22',
              },
            }),
            React.default.createElement(
              U,
              {
                width: B + 2,
                height: L + 2,
                style: {
                  flex: 1,
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(G, {
                stroke: '#007aff',
                strokeWidth: 3,
                d: Q,
              })
            )
          );
        }

        var module1983 = this.getInnerFailedView(require('./1983'), module505.button_title_retry),
          module1341 = React.default.createElement(module1125.default, {
            ref: function (o) {
              return (t.lottieView = o);
            },
            source: require('./1341'),
            loop: true,
            style: {
              width: 550,
              height: 550,
              alignSelf: 'center',
            },
          }),
          $ = undefined !== this.state.photoSource && this.state.photoSource.length > 0,
          ee = React.default.createElement(
            module12.View,
            {
              style: {
                width: s,
                height: l - 20 / W,
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
                  width: s,
                  height: l,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                },
                source: $
                  ? {
                      uri: this.state.photoSource,
                    }
                  : null,
              },
              v,
              this.state.readPhotoLoadingStatus == K.LOADING && module1341,
              this.state.readPhotoLoadingStatus == K.FAILED && module1983
            )
          ),
          te = module423.DMM.obstacleImagesMap.topBigImage[f],
          module1984 = React.default.createElement(
            module12.ImageBackground,
            {
              resizeMode: 'cover',
              style: {
                width: s,
                height: 0.45 * s,
                justifyContent: 'center',
                alignSelf: 'stretch',
              },
              source: require('./1984'),
            },
            React.default.createElement(module12.ImageBackground, {
              resizeMode: 'contain',
              style: {
                width: 147,
                height: 147,
                alignSelf: 'center',
              },
              source: te,
            })
          ),
          ne = module1265.obstacleNames[f];
        if (undefined === ne) ne = ' ';
        if (!(42 != f || module423.DMM.isV1)) ne += '(AI)';
        var ae =
            module1558.default.mapObjectPhotoEnabled &&
            module390.default.isPhotoUploadSupported() &&
            !module391.default.isShareUser() &&
            (module423.DMM.isTanosV_CN || module423.DMM.isTopazSV_CN),
          ie = module1265.obstacleRemoveTips,
          re = this.state.selfHeight ** n,
          se = R(
            R({}, module1355.BaseShadow),
            {},
            {
              width: s,
              height: re,
              radius: 14,
              color: o.shadowColor,
              style: {
                marginVertical: 20,
                marginHorizontal: 20,
              },
            }
          ),
          le =
            this.state.shouldShowMenuView &&
            React.default.createElement(
              module1138.default,
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
                      J.modal,
                      {
                        opacity: this.animatedWrapMarginBottom.interpolate({
                          inputRange: [-500, 0],
                          outputRange: [0, 1],
                        }),
                        height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
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
                        paddingBottom: module391.default.isIphoneX() ? 25 : 0,
                        overflow: 'hidden',
                      },
                    },
                    React.default.createElement(module1427.ActionSheetView, {
                      actions: [module505.obstacle_photo_page_ignore, module505.obstacle_photo_page_feedback],
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
              J.containter,
              {
                backgroundColor: o.settingBackgroundColor,
              },
            ],
          },
          React.default.createElement(
            module1328.BoxShadow,
            {
              setting: se,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                bounces: false,
                alwaysBounceVertical: true,
                showsVerticalScrollIndicator: false,
                style: {
                  height: re,
                  borderRadius: 14,
                  backgroundColor: o.componentBackgroundColor,
                },
              },
              React.default.createElement(
                module12.View,
                {
                  onLayout: this._onLayout,
                  style: [
                    J.top,
                    {
                      backgroundColor: o.componentBackgroundColor,
                    },
                  ],
                },
                module390.default.isFwFilterObstacleSupported() && module1558.default.mapObjectPhotoEnabled && y && y.length >= 1 ? ee : module1984,
                React.default.createElement(
                  module12.View,
                  {
                    style: J.line,
                  },
                  React.default.createElement(module12.Image, {
                    resizeMode: 'stretch',
                    style: {
                      width: 26,
                      height: 26,
                    },
                    source: require('./1985'),
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        J.contentText,
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
                    module505.obstacle_photo_page_subtitle + ne
                  )
                ),
                (function () {
                  if (18 == f) return React.default.createElement(module12.View, null);
                  if (42 == f && module423.DMM.isV1) return React.default.createElement(module12.View, null);

                  if (t.props.navigation.state.params.shouldShowPossibility) {
                    var n = !module423.DMM.isV1 && t.state.mapDebugInfoVisible ? ' | \u5750\u6807\u7cfb: ' + u + ' ' + h : '';
                    return React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          J.contentText,
                          {
                            color: o.mapObjectPhoto.detailColor,
                            marginTop: 2,
                            alignSelf: globals.isRTL ? 'flex-end' : 'flex-start',
                          },
                        ],
                      },
                      module505.obstacle_photo_page_percent + Math.floor(t.props.navigation.state.params.currentObj.percent / 100) + '%' + n
                    );
                  }

                  return React.default.createElement(module12.View, null);
                })(),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      J.contentText,
                      {
                        color: o.mapObjectPhoto.detailColor,
                        marginTop: 4,
                        marginBottom: 30,
                        textAlign: globals.isRTL ? 'right' : 'left',
                      },
                    ],
                  },
                  '' + ie[f]
                )
              )
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: J.bottom,
            },
            (18 != f || module390.default.isIgnoreUnknownMapObjectSupported()) &&
              React.default.createElement(module385.PureButton, {
                funcId: 'obstacle_photo_page_ignore_link',
                title: ae ? module505.obstacle_photo_page_identify_mistakes : module505.obstacle_photo_page_ignore_link,
                textColor: o.mapObjectPhoto.btnTextColor,
                style: [
                  J.bottomBtn,
                  {
                    backgroundColor: o.mapObjectPhoto.btnBackgroundColor,
                  },
                ],
                fontSize: 16,
                onPress: this._onPressBottomBtn,
              })
          ),
          React.default.createElement(module1973.MapObjectIgnoreDescDialog, {
            ref: function (o) {
              return (t.mapObjectIgnoreDescDialog = o);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module505.rubys_location_confirm_button_confirm,
            onConfirm: this._onConfirmIgnoreObject,
          }),
          le
        );
      },
    },
  ]);
  return L;
})(React.Component);

exports.default = X;
X.contextType = module1121.AppConfigContext;
var J = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  top: {
    justifyContent: 'center',
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
    borderRadius: 14,
  },
  line: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
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
    height: 70,
    marginVertical: 0,
  },
  bottomBtn: {
    marginHorizontal: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  modal: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module1265.AppBorderRadius,
    alignItems: 'stretch',
  },
});
