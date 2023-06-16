var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module394 = require('./394'),
  module12 = require('./12'),
  module1025 = require('./1025'),
  module381 = require('./381'),
  module422 = require('./422'),
  module391 = require('./391'),
  module1423 = require('./1423'),
  module1332 = require('./1332');

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

function x(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      S(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      S(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function D() {
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

var module12 = require('./12'),
  T = module12.View,
  B = module12.Text,
  N = module12.Animated,
  M = module12.Image,
  R = module12.ImageBackground,
  L = module12.StyleSheet,
  V = module12.Dimensions,
  k = module12.I18nManager,
  C = module12.TouchableWithoutFeedback,
  module1428 = require('./1428'),
  module1404 = require('./1404'),
  module1153 = require('./1153'),
  module393 = require('./393'),
  module500 = require('./500').strings,
  module1402 = require('./1402'),
  H = 5e3,
  q = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
    REMINDER: 'reminder',
  };

exports.PhotoLoadingStatus = q;

var module1439 = (function (t) {
  module7.default(L, t);

  var module50 = L,
    S = D(),
    j = function () {
      var t,
        o = module11.default(module50);

      if (S) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function L(t) {
    var o;
    module4.default(this, L);

    (o = j.call(this, t)).onPressBubble = function () {
      if (1 != o.state.showAsReminder)
        if (o.state.photoStatus == q.FAILED) {
          o.requestPhoto();
          module1404.clearTimeout(o.timer);
          return void (o.timer = module1404.setTimeout(o.hideName.bind(module6.default(o)), H));
        } else {
          if (o.props.hasOwnProperty('percent') && o.props.onPressBubble) o.props.onPressBubble(x({}, o.props));
          return false;
        }
      if (o.props.onPressPhotoReminderBubble) o.props.onPressPhotoReminderBubble(x({}, o.props));
    };

    o.onBubbleTextLayout = function (t, s) {
      o.setState({
        nameTextSize: t,
      });
    };

    o.onPressObjectDelete = function () {
      if (o.props.onPressDelete) o.props.onPressDelete(x({}, o.props));
    };

    o.onPressObject = function () {
      if (o.props.showMapObjectName)
        module381.RSM.state != module381.RobotState.UPDATING &&
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
      photoStatus: q.LOADING,
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
        return !module1402.objectShallowEqual(this.props, t, true) || !module1402.objectShallowEqual(this.state, o, true);
      },
    },
    {
      key: 'checkImageDiff',
      value: function (t) {
        if (this.props.mapObjectImageOnLoad) {
          var o = false;
          if (1 != t.visible) o = true;
          var s = module422.DMM.obstacleImagesMap.source[t.type];
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
        this.timer = module1404.setTimeout(this.hideName.bind(this), H);
        if (this.props.nameViewDidShow) this.props.nameViewDidShow(x({}, this.props));
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
            o.setPhotoLoadingStatus(q.LOADING);
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
        module1404.clearTimeout(this.timer);
        this.setPhotoLoadingStatus(q.LOADING);
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
        if (1 != this.state.showAsReminder) {
          if (!(!this.props.photoId || this.props.photoId.length < 1)) {
            this.setPhotoLoadingStatus(q.LOADING);
            if (module394.MC.mapObjectPhotos['' + this.props.photoId])
              this.setState({
                photoSource: {
                  uri: module394.MC.mapObjectPhotos['' + this.props.photoId],
                },
                photoStatus: q.FINISHED,
              });
            else
              module393.getPhotoBase64Data(this.props.photoId, 1, function (o, s) {
                if (o) {
                  var n = '' + s.photoData;
                  module394.MC.mapObjectPhotos['' + t.props.photoId] = n;
                  if (!t.unMount)
                    t.setState({
                      photoSource: {
                        uri: n,
                      },
                      photoStatus: q.FINISHED,
                    });
                } else {
                  console.warn('requestPhoto failed');
                  if (1 == t.state.showNameView) t.setPhotoLoadingStatus(q.FAILED);
                }
              });
          }
        } else this.setPhotoLoadingStatus(q.REMINDER);
      },
    },
    {
      key: 'moveMapIfNeeded',
      value: function () {
        if (this.props.mapDeg % 360 == 0) {
          var t = V.get('window').width,
            o = this.props.parent.props.parent._translateXYFromMap(
              {
                x: this.props.x,
                y: this.props.y,
              },
              this.props.transform
            );

          if ('ai' == this.props.popBoxType && this.state.photoStatus != q.REMINDER) {
            if (this.state.nameTextSize.width >= 400) return;
            var s = 0,
              n = 0,
              p = this.state.nameTextSize.width / 2 + 40;
            if (o.x < p) s = p - o.x;
            if (o.x > t - p) s = t - o.x - p;
            if (s || n) this.props.parent.props.parent.moveMap(s, n);
          } else if ('photo' == this.props.popBoxType || this.state.photoStatus == q.REMINDER) {
            s = 0;
            n = 0;
            if (o.x < 80) s = 80;
            if (o.x > t - 80) s = -80;
            var h = 74 + module1153.AppBarMarginTop + (module12.StatusBar.currentHeight || 0) + 80 + 160 + 30;
            if (o.y < h) n = h - o.y;
            if (s || n) this.props.parent.props.parent.moveMap(s, n);
          }
        }
      },
    },
    {
      key: 'onObjectPressed',
      value: function () {
        var t = this;

        if (1 == this.state.showNameView) {
          module1404.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(x({}, t.props));
          });
        } else {
          this.showName();
          if (this.props.mapObjectBubbleDidShow) this.props.mapObjectBubbleDidShow(x({}, this.props));
        }
      },
    },
    {
      key: 'showReminderBubble',
      value: function () {
        var t = this;
        this.setPhotoLoadingStatus(q.REMINDER);
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
          module1404.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(x({}, t.props));
          });
        }
      },
    },
    {
      key: 'getInnerLoadingView',
      value: function () {
        var t = this;
        return React.default.createElement(
          T,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
              width: 148,
              height: 148,
              backgroundColor: '#FFFFFF',
            },
          },
          React.default.createElement(module1025.default, {
            ref: function (o) {
              return (t.lottieView = o);
            },
            source: require('./1434'),
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
          T,
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
            B,
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
        return React.default.createElement(R, {
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
        if (this.state.photoStatus == q.REMINDER) t = this.getInnerImageView(require('./1435'));
        else if (this.state.photoStatus == q.FINISHED) t = this.getInnerImageView(this.state.photoSource);
        else if (this.state.photoStatus == q.FAILED) t = this.getInnerFailedView(require('./1436'), module500.button_title_retry);
        return t;
      },
    },
    {
      key: 'renderPhotoBoxView',
      value: function () {
        var t = '';
        if (18 != this.props.type && 42 != this.props.type) t = ':' + Math.floor(this.props.percent / 100) + '%';
        var s = module1153.obstacleNames[this.props.type];
        if (undefined === s) s = ' ';
        var n = module500.map_object_bubble_tip_avoid;
        if (this.props.hasOwnProperty('avoidTimes') && 1e3 == this.props.avoidTimes) n = module500.map_object_bubble_tip_regonized;
        var module1438 = React.default.createElement(
            T,
            module22.default({}, module391.default.getAccessibilityLabel('map_object_photo_tipview'), {
              style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: 160,
                height: 160,
                justifyContent: 'flex-end',
              },
            }),
            React.default.createElement(
              T,
              {
                style: Y.innerPhotoTextRow,
              },
              React.default.createElement(
                T,
                {
                  style: Y.innerPhotoTipLeft,
                },
                React.default.createElement(
                  T,
                  {
                    style: Y.innerPhotoTextTitle,
                  },
                  React.default.createElement(
                    B,
                    {
                      style: [Y.innerPhotoText],
                    },
                    n
                  )
                ),
                React.default.createElement(
                  T,
                  {
                    style: Y.innerPhotoTextSubtitle,
                  },
                  React.default.createElement(M, {
                    resizeMode: 'stretch',
                    style: {
                      width: 20,
                      height: 14,
                    },
                    source: require('./1437'),
                  }),
                  React.default.createElement(
                    B,
                    {
                      style: Y.innerPhotoSubText,
                      ellipsizeMode: 'middle',
                      numberOfLines: 1,
                    },
                    s + t
                  )
                )
              ),
              React.default.createElement(M, {
                resizeMode: 'stretch',
                style: {
                  width: 18,
                  height: 18,
                  marginLeft: 5,
                  marginRight: 8,
                  marginBottom: 3,
                  transform: [
                    {
                      rotateY: k.isRTL ? '180deg' : '0deg',
                    },
                  ],
                },
                source: require('./1438'),
              })
            )
          ),
          module1438 = React.default.createElement(
            T,
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
              T,
              {
                style: Y.innerPhotoGuideTextRow,
              },
              React.default.createElement(
                B,
                {
                  style: [
                    Y.innerPhotoText,
                    {
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 10,
                    },
                  ],
                },
                module500.map_object_bubble_tip_show_photo
              ),
              React.default.createElement(M, {
                resizeMode: 'stretch',
                style: {
                  width: 18,
                  height: 18,
                  marginRight: 10,
                  marginBottom: 6,
                  transform: [
                    {
                      rotateY: k.isRTL ? '180deg' : '0deg',
                    },
                  ],
                },
                source: require('./1438'),
              })
            )
          );
        return React.default.createElement(
          T,
          {
            style: Y.phoneContainer,
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
              C,
              {
                onPress: this.onPressBubble,
                rejectResponderTermination: true,
              },
              React.default.createElement(
                T,
                {
                  style: Y.outBox,
                },
                this.renderInnerPhotoView(),
                this.state.photoStatus == q.REMINDER ? module1438 : module1438
              )
            ),
            React.default.createElement(
              T,
              {
                style: {
                  alignItems: 'center',
                  left: 3,
                },
              },
              React.default.createElement(T, {
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
              React.default.createElement(T, {
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
        if (1 != this.props.visible) return React.default.createElement(T, null);
        var s = module422.DMM.obstacleImagesMap.image[this.props.type];
        if (undefined === s) return React.default.createElement(T, null);
        if (1 == this.props.showAsGeneralObject && 1 != this.props.showAsBlackWall && 1 != this.props.showDeleteButton && 1 != this.props.showDebugInfo) s = require('./1439');
        var n = 1 == this.props.showAsBlackWall ? 2 : module1332.Config.size.objectsRadius,
          p = 1 == this.props.showAsBlackWall ? 2 : module1332.Config.size.objectsRadius,
          h = n * this.props.transform.xx,
          l = p * this.props.transform.yy,
          u = module1153.obstacleNames[this.props.type];
        if (undefined === s) u = ' ';
        var c = '';
        if (18 != this.props.type)
          (42 == this.props.type && module422.DMM.isV1) || (c = this.props.showOnlyGeneralObstacles ? '' : ':' + Math.floor(this.props.percent / 100) + '%');
        var module1440 = React.default.createElement(
            T,
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
              C,
              {
                onPress: this.onPressObjectDelete,
              },
              React.default.createElement(module1428, {
                resizeMethod: 'scale',
                style: {
                  width: 5 * this.props.transform.xx,
                  height: 5 * this.props.transform.yy,
                },
                source: require('./1440'),
              })
            )
          ),
          y = React.default.createElement(module1423.default, {
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
          T,
          {
            pointerEvents: 'box-none',
            style: [
              Y.mainContainer,
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
              T,
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
                B,
                {
                  style: {
                    color: 'red',
                    fontSize: Math.ceil(8 + this.props.transform.yy),
                  },
                },
                '' + Math.round(this.props.originX)
              ),
              React.default.createElement(
                B,
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
            C,
            module22.default({}, module391.default.getAccessibilityLabel('map_object_view_' + this.props.type), {
              onPress: this.onPressObject,
              rejectResponderTermination: true,
            }),
            React.default.createElement(module1428, {
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
          this.state.showNameView && this.props.showMapObjectName && 'ai' == this.props.popBoxType && this.state.photoStatus != q.REMINDER && y,
          this.state.showNameView && this.props.showMapObjectName && ('photo' == this.props.popBoxType || this.state.photoStatus == q.REMINDER) && this.renderPhotoBoxView(),
          this.props.showDeleteButton && !this.props.showAsBlackWall && module1440
        );
      },
    },
  ]);
  return L;
})(React.default.Component);

exports.MapObjectView = module1439;
module1439.defaultProps = {
  showAsBlackWall: false,
  showAsGeneralObject: false,
  popBoxType: 'none',
  showOnlyGeneralObstacles: false,
  type: 18,
  showDeleteButton: false,
};
var Y = L.create({
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
