var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module390 = require('./390'),
  module12 = require('./12'),
  module925 = require('./925'),
  module377 = require('./377'),
  module415 = require('./415'),
  module387 = require('./387'),
  module1260 = require('./1260');

require('./386');

function S(t, o) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (o)
      n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    s.push.apply(s, n);
  }

  return s;
}

function E(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      S(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      S(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function x() {
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

var module12 = require('./12'),
  j = module12.View,
  T = module12.Text,
  N = module12.Animated,
  B = module12.Image,
  M = module12.ImageBackground,
  L = module12.StyleSheet,
  R = module12.Dimensions,
  V = module12.I18nManager,
  k = module12.TouchableWithoutFeedback,
  module1265 = require('./1265'),
  module1247 = require('./1247'),
  module934 = require('./934'),
  module389 = require('./389'),
  module491 = require('./491').strings,
  W = R.get('window').width,
  module1245 = require('./1245'),
  module1275 = require('./1275'),
  q = 5e3,
  U = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
    REMINDER: 'reminder',
  };

exports.PhotoLoadingStatus = U;

var module1282 = (function (t) {
  module7.default(L, t);

  var module49 = L,
    S = x(),
    D = function () {
      var t,
        o = module11.default(module49);

      if (S) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function L(t) {
    var o;
    module4.default(this, L);

    (o = D.call(this, t)).onPressBubble = function () {
      if (1 != o.state.showAsReminder)
        if (o.state.photoStatus == U.FAILED) {
          o.requestPhoto();
          module1247.clearTimeout(o.timer);
          return void (o.timer = module1247.setTimeout(o.hideName.bind(module6.default(o)), q));
        } else {
          if (o.props.hasOwnProperty('percent') && o.props.onPressBubble) o.props.onPressBubble(E({}, o.props));
          return false;
        }
      if (o.props.onPressPhotoReminderBubble) o.props.onPressPhotoReminderBubble(E({}, o.props));
    };

    o.onBubbleTextLayout = function (t, s) {
      o.setState({
        nameTextSize: t,
      });
    };

    o.onPressObjectDelete = function () {
      if (o.props.onPressDelete) o.props.onPressDelete(E({}, o.props));
    };

    o.onPressObject = function () {
      if (o.props.showMapObjectName)
        module377.RSM.state != module377.RobotState.UPDATING &&
          (('ai' != o.props.popBoxType && 'photo' != o.props.popBoxType && 'reminder' != o.props.popBoxType) ||
            (1 != o.props.showAsBlackWall &&
              o.props.shouldShowBubbleChecker &&
              o.props.shouldShowBubbleChecker(function () {
                return o.onObjectPressed();
              })));
    };

    o.onObjectImageOnLoad = function (t) {
      if (o.props.mapObjectImageOnLoad) {
        o.props.mapObjectImageOnLoad();
        o.lastImage = t.nativeEvent.source.url;
      }
    };

    o.state = {
      nameTextSize: {
        width: 400,
        height: 22,
      },
      showNameView: false,
      photoSource: {
        uri: '',
      },
      photoStatus: U.LOADING,
      showAsReminder: false,
    };
    o.animatedOpacity = new N.Value(0);
    o.animatedLoading = new N.Value(0);
    o.unMount = false;
    return o;
  }

  module5.default(L, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (!(this.props.originX == t.originX && this.props.originY == t.originY && this.props.type == t.type)) this.hideBubbleNoDelay();
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        if (this.lottieView) this.lottieView.play();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.unMount = true;
      },
    },
    {
      key: 'UNSAFE_componentWillUpdate',
      value: function (t, o) {
        this.checkImageDiff(t);
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function (t, o) {
        return !module1245.objectShallowEqual(this.props, t, true) || !module1245.objectShallowEqual(this.state, o, true);
      },
    },
    {
      key: 'checkImageDiff',
      value: function (t) {
        if (this.props.mapObjectImageOnLoad) {
          var o = false;
          if (1 != t.visible) o = true;
          var s = module415.DMM.obstacleImagesMap.source[t.type];
          if (undefined === s) o = true;
          if (1 == t.showAsGeneralObject && 1 != t.showAsBlackWall && 1 != t.showDeleteButton && 1 != t.showDebugInfo) s = '/Resources/obstacle_new_general.png';
          if (!o && this.lastImage && -1 != this.lastImage.search(s)) o = true;
          if (o) this.props.mapObjectImageOnLoad();
        }
      },
    },
    {
      key: 'runLoadingView',
      value: function () {
        var t = this;
        this.animatedLoading = new N.Value(0);
        N.timing(this.animatedLoading, {
          toValue: 1,
          duration: 3e3,
        }).start(function () {
          t.runLoadingView();
        });
      },
    },
    {
      key: 'performShowNameAnimation',
      value: function () {
        var t = this;

        if (1 != this.state.showNameView) {
          this.animatedOpacity = new N.Value(0);
          this.setState(
            {
              showNameView: true,
            },
            function () {
              N.timing(t.animatedOpacity, {
                toValue: 1,
                duration: 500,
              }).start(function () {
                if ('photo' == t.props.popBoxType) t.requestPhoto();
                t.moveMapIfNeeded();
              });
            }
          );
        }
      },
    },
    {
      key: 'showName',
      value: function () {
        this.performShowNameAnimation();
        this.timer = module1247.setTimeout(this.hideName.bind(this), q);
        if (this.props.nameViewDidShow) this.props.nameViewDidShow(E({}, this.props));
      },
    },
    {
      key: 'hideName',
      value: function (t) {
        var o = this;
        if (0 != this.state.showNameView)
          N.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            o.setPhotoLoadingStatus(U.LOADING);
            o.setState({
              showNameView: false,
              showAsReminder: false,
            });
            if (t) t();
          });
      },
    },
    {
      key: 'hideBubbleNoDelay',
      value: function () {
        module1247.clearTimeout(this.timer);
        this.setPhotoLoadingStatus(U.LOADING);
        this.setState({
          showNameView: false,
          showAsReminder: false,
        });
      },
    },
    {
      key: 'setPhotoLoadingStatus',
      value: function (t) {
        if (!this.unMount)
          this.setState({
            photoStatus: t,
          });
      },
    },
    {
      key: 'requestPhoto',
      value: function () {
        var t = this;
        if (1 != this.state.showAsReminder)
          18 == this.props.type && this.props.photoId.length < 1
            ? this.setState({
                photoSource: module1275,
                photoStatus: U.FINISHED,
              })
            : !this.props.photoId || this.props.photoId.length < 1
            ? this.setPhotoLoadingStatus(U.NOPHOTO)
            : (this.setPhotoLoadingStatus(U.LOADING),
              module390.MC.mapObjectPhotos['' + this.props.photoId]
                ? this.setState({
                    photoSource: {
                      uri: module390.MC.mapObjectPhotos['' + this.props.photoId],
                    },
                    photoStatus: U.FINISHED,
                  })
                : module389.getPhotoBase64Data(this.props.photoId, 1, function (o, s) {
                    if (o) {
                      var n = '' + s.photoData;
                      module390.MC.mapObjectPhotos['' + t.props.photoId] = n;
                      if (!t.unMount)
                        t.setState({
                          photoSource: {
                            uri: n,
                          },
                          photoStatus: U.FINISHED,
                        });
                    } else {
                      console.warn('requestPhoto failed');
                      if (1 == t.state.showNameView) t.setPhotoLoadingStatus(U.FAILED);
                    }
                  }));
        else this.setPhotoLoadingStatus(U.REMINDER);
      },
    },
    {
      key: 'moveMapIfNeeded',
      value: function () {
        if (this.props.mapDeg % 360 == 0) {
          var t = this.props.parent.props.parent._translateXYFromMap(
            {
              x: this.props.x,
              y: this.props.y,
            },
            this.props.transform
          );

          if ('ai' == this.props.popBoxType && this.state.photoStatus != U.REMINDER) {
            if (this.state.nameTextSize.width >= 400) return;
            var o = 0,
              s = 0,
              n = this.state.nameTextSize.width / 2 + 40;
            if (t.x < n) o = n - t.x;
            if (t.x > W - n) o = W - t.x - n;
            if (o || s) this.props.parent.props.parent.moveMap(o, s);
          } else if ('photo' == this.props.popBoxType || this.state.photoStatus == U.REMINDER) {
            o = 0;
            s = 0;
            if (t.x < 80) o = 80;
            if (t.x > W - 80) o = -80;
            var p = 74 + module934.AppBarMarginTop + (module12.StatusBar.currentHeight || 0) + 80 + 160 + 30;
            if (t.y < p) s = p - t.y;
            if (o || s) this.props.parent.props.parent.moveMap(o, s);
          }
        }
      },
    },
    {
      key: 'onObjectPressed',
      value: function () {
        var t = this;

        if (1 == this.state.showNameView) {
          module1247.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(E({}, t.props));
          });
        } else {
          this.showName();
          if (this.props.mapObjectBubbleDidShow) this.props.mapObjectBubbleDidShow(E({}, this.props));
        }
      },
    },
    {
      key: 'showReminderBubble',
      value: function () {
        var t = this;
        this.setPhotoLoadingStatus(U.REMINDER);
        this.setState(
          {
            showAsReminder: true,
          },
          function () {
            t.showName();
          }
        );
      },
    },
    {
      key: 'hideBubble',
      value: function () {
        var t = this;

        if (1 == this.state.showNameView) {
          module1247.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(E({}, t.props));
          });
        }
      },
    },
    {
      key: 'getInnerLoadingView',
      value: function () {
        var t = this;
        return React.default.createElement(
          j,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
              width: 148,
              height: 148,
              backgroundColor: '#FFFFFF',
            },
          },
          React.default.createElement(module925.default, {
            ref: function (o) {
              return (t.lottieView = o);
            },
            source: require('./1276'),
            loop: true,
            style: {
              width: 350,
              height: 350,
              marginBottom: 40,
            },
          })
        );
      },
    },
    {
      key: 'getInnerFailedView',
      value: function (t, o) {
        return React.default.createElement(
          j,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
              width: 148,
              height: 148,
              backgroundColor: '#FFFFFF',
            },
          },
          React.default.createElement(N.Image, {
            resizeMethod: 'scale',
            style: {
              width: 68,
              height: 68,
            },
            source: t,
          }),
          React.default.createElement(
            T,
            {
              style: {
                color: 'rgba(0,0,0,0.6)',
                fontSize: 14,
                marginBottom: 50,
                marginTop: -5,
              },
            },
            o
          )
        );
      },
    },
    {
      key: 'getInnerImageView',
      value: function (t) {
        return React.default.createElement(M, {
          resizeMethod: 'scale',
          style: {
            width: 148,
            height: 148,
            justifyContent: 'flex-end',
          },
          source: t,
        });
      },
    },
    {
      key: 'renderInnerPhotoView',
      value: function () {
        var t = this.getInnerLoadingView();
        if (this.state.photoStatus == U.REMINDER) t = this.getInnerImageView(require('./1277'));
        else if (this.state.photoStatus == U.FINISHED) t = this.getInnerImageView(this.state.photoSource);
        else if (this.state.photoStatus == U.FAILED) t = this.getInnerFailedView(require('./1278'), module491.button_title_retry);
        else if (this.state.photoStatus == U.NOPHOTO) t = this.getInnerFailedView(require('./1279'), module491.map_object_bubble_tip_no_photo);
        return t;
      },
    },
    {
      key: 'renderPhotoBoxView',
      value: function () {
        var t = '';
        if (18 != this.props.type && 42 != this.props.type) t = ':' + Math.floor(this.props.percent / 100) + '%';
        var o = module934.obstacleNames[this.props.type];
        if (undefined === o) o = ' ';
        var s = module491.map_object_bubble_tip_avoid;
        if (this.props.hasOwnProperty('avoidTimes') && 1e3 == this.props.avoidTimes) s = module491.map_object_bubble_tip_regonized;
        var module1281 = React.default.createElement(
            j,
            {
              style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: 160,
                height: 160,
                justifyContent: 'flex-end',
              },
            },
            React.default.createElement(
              j,
              {
                style: X.innerPhotoTextRow,
              },
              React.default.createElement(
                j,
                {
                  style: X.innerPhotoTipLeft,
                },
                React.default.createElement(
                  j,
                  {
                    style: X.innerPhotoTextTitle,
                  },
                  React.default.createElement(
                    T,
                    {
                      style: [X.innerPhotoText],
                    },
                    s
                  )
                ),
                React.default.createElement(
                  j,
                  {
                    style: X.innerPhotoTextSubtitle,
                  },
                  React.default.createElement(B, {
                    resizeMode: 'stretch',
                    style: {
                      width: 20,
                      height: 14,
                    },
                    source: require('./1280'),
                  }),
                  React.default.createElement(
                    T,
                    {
                      style: X.innerPhotoSubText,
                      ellipsizeMode: 'middle',
                      numberOfLines: 1,
                    },
                    o + t
                  )
                )
              ),
              React.default.createElement(B, {
                resizeMode: 'stretch',
                style: {
                  width: 18,
                  height: 18,
                  marginLeft: 5,
                  marginRight: 8,
                  marginBottom: 3,
                  transform: [
                    {
                      rotateY: V.isRTL ? '180deg' : '0deg',
                    },
                  ],
                },
                source: require('./1281'),
              })
            )
          ),
          module1281 = React.default.createElement(
            j,
            {
              style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: 160,
                height: 160,
                justifyContent: 'flex-end',
              },
            },
            React.default.createElement(
              j,
              {
                style: X.innerPhotoGuideTextRow,
              },
              React.default.createElement(
                T,
                {
                  style: [
                    X.innerPhotoText,
                    {
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 10,
                    },
                  ],
                },
                module491.map_object_bubble_tip_show_photo
              ),
              React.default.createElement(B, {
                resizeMode: 'stretch',
                style: {
                  width: 18,
                  height: 18,
                  marginRight: 10,
                  marginBottom: 6,
                  transform: [
                    {
                      rotateY: V.isRTL ? '180deg' : '0deg',
                    },
                  ],
                },
                source: require('./1281'),
              })
            )
          );
        return React.default.createElement(
          j,
          {
            style: X.phoneContainer,
          },
          React.default.createElement(
            N.View,
            {
              style: {
                flexDirection: 'column',
                alignItems: 'center',
                opacity: this.animatedOpacity,
              },
            },
            React.default.createElement(
              k,
              {
                onPress: this.onPressBubble,
                rejectResponderTermination: true,
              },
              React.default.createElement(
                j,
                {
                  style: X.outBox,
                },
                this.renderInnerPhotoView(),
                this.state.photoStatus == U.REMINDER ? module1281 : module1281
              )
            ),
            React.default.createElement(
              j,
              {
                style: {
                  alignItems: 'center',
                  left: 3,
                },
              },
              React.default.createElement(j, {
                style: {
                  top: -0.5,
                  left: -3,
                  width: 0,
                  height: 0,
                  borderLeftColor: 'transparent',
                  borderLeftWidth: 8,
                  borderTopWidth: 8,
                  borderTopColor: '#000000CC',
                  borderRightWidth: 8,
                  borderRightColor: 'transparent',
                },
              }),
              React.default.createElement(j, {
                style: {
                  position: 'absolute',
                  top: -1,
                  left: -2.75,
                  width: 0,
                  height: 0,
                  borderLeftColor: 'transparent',
                  borderLeftWidth: 5.5,
                  borderTopWidth: 6,
                  borderTopColor: 'transparent',
                  borderRightWidth: 5.5,
                  borderRightColor: 'transparent',
                },
              })
            )
          )
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        if (1 != this.props.visible) return React.default.createElement(j, null);
        var s = module415.DMM.obstacleImagesMap.image[this.props.type];
        if (undefined === s) return React.default.createElement(j, null);
        if (1 == this.props.showAsGeneralObject && 1 != this.props.showAsBlackWall && 1 != this.props.showDeleteButton && 1 != this.props.showDebugInfo) s = require('./1282');
        var n = 8,
          p = 8;

        if (1 == this.props.showAsBlackWall) {
          n = 2;
          p = 2;
        }

        var h = n * this.props.transform.xx,
          l = p * this.props.transform.yy;

        if (1 != this.props.showAsBlackWall) {
          if (h > 56) h = 56;
          if (h < 16) h = 16;
          if (l > 56) l = 56;
          if (l < 16) l = 16;
        }

        var u = module934.obstacleNames[this.props.type];
        if (undefined === s) u = ' ';
        var c = '';
        if ((18 != this.props.type && 42 != this.props.type) || !module415.DMM.isV1)
          c = this.props.showOnlyGeneralObstacles ? '' : ':' + Math.floor(this.props.percent / 100) + '%';
        var module1283 = React.default.createElement(
            j,
            {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: (160 + h) / 2 + -2.1 * this.props.transform.xx,
                top: 168 - 1.3888888888888888 * this.props.transform.yy,
                width: 5 * this.props.transform.xx,
                height: 5 * this.props.transform.yy,
                overflow: 'visible',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
            React.default.createElement(
              k,
              {
                onPress: this.onPressObjectDelete,
              },
              React.default.createElement(module1265, {
                resizeMethod: 'scale',
                style: {
                  width: 5 * this.props.transform.xx,
                  height: 5 * this.props.transform.yy,
                },
                source: require('./1283'),
              })
            )
          ),
          y = React.default.createElement(module1260.default, {
            funcId: 'map_object_bubble_' + this.props.type,
            objectName: u + c,
            objectImage: s,
            center: {
              x: 79,
              y: 163,
            },
            animatedOpacity: this.animatedOpacity,
            onBubbleLayout: this.onBubbleTextLayout,
            onPressBubble: this.onPressBubble,
          });
        return React.default.createElement(
          j,
          {
            pointerEvents: 'box-none',
            style: [
              X.mainContainer,
              {
                left: this.props.x - 80,
                top: this.props.y - l / 2 - 168,
                height: 336 + l,
                transform: [
                  {
                    rotateZ: -1 * this.props.mapDeg + 'deg',
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.showNameView ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            ],
          },
          1 == this.props.showDebugInfo &&
            React.default.createElement(
              j,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: (160 - h) / 2,
                  top: l + 168,
                  width: 32 + 3 * this.props.transform.yy,
                  overflow: 'visible',
                  borderWidth: 1,
                  borderColor: 'red',
                },
              },
              React.default.createElement(
                T,
                {
                  style: {
                    color: 'red',
                    fontSize: Math.ceil(8 + this.props.transform.yy),
                  },
                },
                '' + Math.round(this.props.originX)
              ),
              React.default.createElement(
                T,
                {
                  style: {
                    color: 'red',
                    fontSize: Math.ceil(8 + this.props.transform.yy),
                  },
                },
                '' + Math.round(this.props.originY)
              )
            ),
          React.default.createElement(
            k,
            module21.default({}, module387.default.getAccessibilityLabel('map_object_view'), {
              onPress: this.onPressObject,
              rejectResponderTermination: true,
            }),
            React.default.createElement(module1265, {
              resizeMethod: 'scale',
              source: s,
              onLoad: this.props.mapObjectImageOnLoad
                ? function (o) {
                    return t.onObjectImageOnLoad(o);
                  }
                : null,
              style: {
                top: 168,
                left: (160 - h) / 2,
                width: h,
                height: l,
              },
            })
          ),
          this.state.showNameView && this.props.showMapObjectName && 'ai' == this.props.popBoxType && this.state.photoStatus != U.REMINDER && y,
          this.state.showNameView && this.props.showMapObjectName && ('photo' == this.props.popBoxType || this.state.photoStatus == U.REMINDER) && this.renderPhotoBoxView(),
          this.props.showDeleteButton && !this.props.showAsBlackWall && module1283
        );
      },
    },
  ]);
  return L;
})(React.default.Component);

exports.MapObjectView = module1282;
module1282.defaultProps = {
  showAsBlackWall: false,
  showAsGeneralObject: false,
  popBoxType: 'none',
  showOnlyGeneralObstacles: false,
};
var X = L.create({
  mainContainer: {
    position: 'absolute',
    overflow: 'visible',
    width: 160,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  phoneContainer: {
    position: 'absolute',
    left: 79,
    top: 84,
    width: 1,
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outBox: {
    left: 0,
    width: 160,
    height: 160,
    backgroundColor: '#000000B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerPhotoSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 3,
    maxWidth: 100,
  },
  innerPhotoText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    textAlign: 'center',
  },
  innerPhotoTextRow: {
    flexDirection: 'row',
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerPhotoGuideTextRow: {
    flexDirection: 'row',
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
  },
  innerPhotoTipLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 1,
    marginLeft: 10,
    marginBottom: 9,
  },
  innerPhotoTextTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 25,
  },
  innerPhotoTextSubtitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
