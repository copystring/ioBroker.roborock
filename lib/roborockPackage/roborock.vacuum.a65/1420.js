var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module394 = require('./394'),
  module13 = require('./13'),
  module1204 = require('./1204'),
  module381 = require('./381'),
  module424 = require('./424'),
  module391 = require('./391'),
  module1405 = require('./1405'),
  module1127 = require('./1127'),
  module1408 = require('./1408'),
  module1200 = require('./1200');

function R(t, o) {
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

function j(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
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

var module13 = require('./13'),
  B = module13.View,
  N = module13.Text,
  M = module13.Animated,
  V = module13.Image,
  k = module13.ImageBackground,
  L = module13.StyleSheet,
  C = module13.Dimensions,
  _ = module13.TouchableWithoutFeedback,
  A = module13.PanResponder,
  module1415 = require('./1415'),
  module1421 = require('./1421'),
  module1344 = require('./1344'),
  module393 = require('./393'),
  module510 = require('./510').strings,
  module1340 = require('./1340'),
  U = 5e3,
  module1412 = require('./1412'),
  Y = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
    REMINDER: 'reminder',
  };

exports.PhotoLoadingStatus = Y;

var module1424 = (function (t) {
  module9.default(T, t);

  var module50 = T,
    module1200 = D(),
    R = function () {
      var t,
        o = module12.default(module50);

      if (module1200) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function T(t) {
    var o;
    module6.default(this, T);

    (o = R.call(this, t)).onPressBubble = function () {
      if (1 != o.state.showAsReminder)
        if (o.state.photoStatus == Y.FAILED) {
          o.requestPhoto();
          module1421.clearTimeout(o.timer);
          return void (o.timer = module1421.setTimeout(o.hideName.bind(module8.default(o)), U));
        } else {
          if (o.props.hasOwnProperty('percent') && o.props.onPressBubble) o.props.onPressBubble(j({}, o.props));
          return false;
        }
      if (o.props.onPressPhotoReminderBubble) o.props.onPressPhotoReminderBubble(j({}, o.props));
    };

    o.onBubbleTextLayout = function (t, n) {
      o.setState({
        nameTextSize: t,
      });
    };

    o.onPressObjectDelete = function () {
      if (o.props.onPressDelete) o.props.onPressDelete(j({}, o.props));
    };

    o.onPressObject = function () {
      if (o.props.showMapObjectName)
        module381.RSM.state != module381.RobotState.UPDATING &&
          (('ai' != o.props.popBoxType && 'photo' != o.props.popBoxType && 'merges' != o.props.popBoxType) ||
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
      photoStatus: Y.LOADING,
      showAsReminder: false,
    };
    o.animatedOpacity = new M.Value(0);
    o.animatedLoading = new M.Value(0);
    o.unMount = false;
    return o;
  }

  module7.default(T, [
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
        return !module1340.objectShallowEqual(this.props, t, true) || !module1340.objectShallowEqual(this.state, o, true);
      },
    },
    {
      key: '_obName',
      value: function (t) {
        var o = module1344.obstacleNames[t];
        return undefined === o ? ' ' : o;
      },
    },
    {
      key: '_obImage',
      value: function (t) {
        var o = module424.DMM.obstacleImagesMap.image[t];
        return undefined === o ? null : o;
      },
    },
    {
      key: '_obPercent',
      value: function (t) {
        return ':' + Math.floor(t / 100) + '%';
      },
    },
    {
      key: '_obNameAddOn',
      value: function (t, o) {
        var n = '';
        if (18 != t) (42 == t && module424.DMM.isV1) || (n = this.props.showOnlyGeneralObstacles ? '' : this._obPercent(o));
        return n;
      },
    },
    {
      key: 'checkImageDiff',
      value: function (t) {
        if (this.props.mapObjectImageOnLoad) {
          var o = false;
          if (1 != t.visible) o = true;
          var n = module424.DMM.obstacleImagesMap.source[t.type];
          if (undefined === n) o = true;
          if (!o && this.lastImage && -1 != this.lastImage.search(n)) o = true;
          if (o) this.props.mapObjectImageOnLoad();
        }
      },
    },
    {
      key: 'runLoadingView',
      value: function () {
        var t = this;
        this.animatedLoading = new M.Value(0);
        M.timing(this.animatedLoading, {
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
          this.animatedOpacity = new M.Value(0);
          this.setState(
            {
              showNameView: true,
            },
            function () {
              M.timing(t.animatedOpacity, {
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
        this.timer = module1421.setTimeout(this.hideName.bind(this), U);
        if (this.props.nameViewDidShow) this.props.nameViewDidShow(j({}, this.props));
      },
    },
    {
      key: 'hideName',
      value: function (t) {
        var o = this;
        if (0 != this.state.showNameView)
          M.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 200,
          }).start(function () {
            o.setPhotoLoadingStatus(Y.LOADING);
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
        module1421.clearTimeout(this.timer);
        this.setPhotoLoadingStatus(Y.LOADING);
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
            this.setPhotoLoadingStatus(Y.LOADING);
            if (module394.MC.mapObjectPhotos['' + this.props.photoId])
              this.setState({
                photoSource: {
                  uri: module394.MC.mapObjectPhotos['' + this.props.photoId],
                },
                photoStatus: Y.FINISHED,
              });
            else
              module393.getPhotoBase64Data(this.props.photoId, 1, function (o, n) {
                if (o) {
                  var s = '' + n.photoData;
                  module394.MC.mapObjectPhotos['' + t.props.photoId] = s;
                  if (!t.unMount)
                    t.setState({
                      photoSource: {
                        uri: s,
                      },
                      photoStatus: Y.FINISHED,
                    });
                } else {
                  console.warn('requestPhoto failed');
                  if (1 == t.state.showNameView) t.setPhotoLoadingStatus(Y.FAILED);
                }
              });
          }
        } else this.setPhotoLoadingStatus(Y.REMINDER);
      },
    },
    {
      key: 'moveMapIfNeeded',
      value: function () {
        if (this.props.mapDeg % 360 == 0) {
          var t = C.get('window').width,
            o = this.props.parent.props.parent._translateXYFromMap(
              {
                x: this.props.x,
                y: this.props.y,
              },
              this.props.transform
            );

          if ('ai' == this.props.popBoxType && this.state.photoStatus != Y.REMINDER) {
            if (this.state.nameTextSize.width >= 400) return;
            var n = 0,
              s = 0,
              p = this.state.nameTextSize.width / 2 + 40;
            if (o.x < p) n = p - o.x;
            if (o.x > t - p) n = t - o.x - p;
            if (n || s) this.props.parent.props.parent.moveMap(n, s);
          } else if ('photo' == this.props.popBoxType || this.state.photoStatus == Y.REMINDER) {
            n = 0;
            s = 0;
            if (o.x < 80) n = 80;
            if (o.x > t - 80) n = -80;
            var l = 74 + module1344.AppBarMarginTop + (module13.StatusBar.currentHeight || 0) + 80 + 160 + 30;
            if (o.y < l) s = l - o.y;
            if (n || s) this.props.parent.props.parent.moveMap(n, s);
          }
        }
      },
    },
    {
      key: 'onObjectPressed',
      value: function () {
        var t = this;

        if (1 == this.state.showNameView) {
          module1421.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(j({}, t.props));
          });
        } else {
          this.showName();
          if (this.props.mapObjectBubbleDidShow) this.props.mapObjectBubbleDidShow(j({}, this.props));
        }
      },
    },
    {
      key: 'onPressMergeItem',
      value: function (t) {
        if (t.length > 5) {
          var o = this.props.transform.point(t[3], t[4]),
            n = {
              originX: t[0],
              originY: t[1],
              type: t[2],
              x: o.x,
              y: o.y,
              percent: t[5],
              photoId: t[7],
            };
          if (this.props.onPressBubble) this.props.onPressBubble(n);
        }
      },
    },
    {
      key: 'showReminderBubble',
      value: function () {
        var t = this;
        this.setPhotoLoadingStatus(Y.REMINDER);
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
          module1421.clearTimeout(this.timer);
          this.hideName(function () {
            if (t.props.nameViewDidHide) t.props.nameViewDidHide(j({}, t.props));
          });
        }
      },
    },
    {
      key: 'getInnerLoadingView',
      value: function () {
        var t = this;
        return React.default.createElement(
          B,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
              width: 148,
              height: 148,
              backgroundColor: '#FFFFFF',
            },
          },
          React.default.createElement(module1204.default, {
            ref: function (o) {
              return (t.lottieView = o);
            },
            source: require('./1422'),
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
          B,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
              width: 148,
              height: 148,
              backgroundColor: '#FFFFFF',
            },
          },
          React.default.createElement(M.Image, {
            resizeMethod: 'scale',
            style: {
              width: 68,
              height: 68,
            },
            source: t,
          }),
          React.default.createElement(
            N,
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
        return React.default.createElement(k, {
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
        if (this.state.photoStatus == Y.REMINDER) t = this.getInnerImageView(require('./1423'));
        else if (this.state.photoStatus == Y.FINISHED) t = this.getInnerImageView(this.state.photoSource);
        else if (this.state.photoStatus == Y.FAILED) t = this.getInnerFailedView(require('./1424'), module510.button_title_retry);
        return t;
      },
    },
    {
      key: 'renderPhotoBoxView',
      value: function () {
        var t = '';
        if (18 != this.props.type && 42 != this.props.type) t = this._obPercent(this.props.percent);
        var n = module510.map_object_bubble_tip_avoid;
        if (this.props.hasOwnProperty('avoidTimes') && 1e3 == this.props.avoidTimes) n = module510.map_object_bubble_tip_regonized;
        var s = this._obName(this.props.type) + t,
          module1425 = React.default.createElement(V, {
            resizeMode: 'stretch',
            style: J.innerPhotoArrowImg,
            source: require('./1425'),
          }),
          module1426 = React.default.createElement(
            B,
            module22.default({}, module391.default.getAccessibilityLabel('map_object_photo_tipview'), {
              style: J.innerPhotoView,
            }),
            React.default.createElement(
              B,
              {
                style: J.innerPhotoTextRow,
              },
              React.default.createElement(
                B,
                {
                  style: J.innerPhotoTipLeft,
                },
                React.default.createElement(
                  N,
                  {
                    style: [J.innerPhotoText],
                  },
                  n
                ),
                React.default.createElement(
                  B,
                  {
                    style: J.innerPhotoTextSubtitle,
                  },
                  React.default.createElement(V, {
                    resizeMode: 'stretch',
                    style: {
                      width: 20,
                      height: 14,
                    },
                    source: require('./1426'),
                  }),
                  React.default.createElement(
                    N,
                    {
                      style: J.innerPhotoSubText,
                      ellipsizeMode: 'middle',
                      numberOfLines: 1,
                    },
                    s
                  )
                )
              ),
              module1425
            )
          ),
          h = React.default.createElement(
            B,
            {
              style: J.innerPhotoView,
            },
            React.default.createElement(
              B,
              {
                style: J.innerPhotoGuideTextRow,
              },
              React.default.createElement(
                N,
                {
                  style: J.innerPhotoText,
                },
                module510.map_object_bubble_tip_show_photo
              ),
              module1425
            )
          );
        return React.default.createElement(
          B,
          {
            style: J.phoneContainer,
          },
          React.default.createElement(
            M.View,
            {
              style: {
                flexDirection: 'column',
                alignItems: 'center',
                opacity: this.animatedOpacity,
              },
            },
            React.default.createElement(
              _,
              {
                onPress: this.onPressBubble,
                rejectResponderTermination: true,
              },
              React.default.createElement(
                B,
                {
                  style: J.outBox,
                },
                this.renderInnerPhotoView(),
                this.state.photoStatus == Y.REMINDER ? h : module1426
              )
            ),
            React.default.createElement(
              B,
              {
                style: {
                  alignItems: 'center',
                  left: 3,
                },
              },
              React.default.createElement(B, {
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
              React.default.createElement(B, {
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
      key: 'renderMergesView',
      value: function () {
        var t = this;
        if (!this.props.merges || this.props.merges.length <= 0) return null;
        var n = this.props.merges.length,
          s = this.props.merges.map(function (s, p) {
            var l = t.props.showOnlyGeneralObstacles ? 42 : s[2],
              h = t._obImage(l),
              u = s.length > 5 ? s[5] : '',
              c = t._obName(l) + t._obNameAddOn(l, u),
              b = p == n - 1;

            t.panResponderBubble = A.create({
              onStartShouldSetPanResponder: function () {
                return true;
              },
              onMoveShouldSetPanResponder: function () {
                return false;
              },
              onPanResponderStart: function (t, o) {},
              onStartShouldSetPanResponderCapture: function () {
                return true;
              },
              onPanResponderEnd: function (o, n) {
                t.onPressMergeItem(s);
              },
              onPanResponderMove: function (t, o) {},
              onPanResponderTerminationRequest: function (t, o) {
                return false;
              },
            });
            return React.default.createElement(
              B,
              module22.default({}, t.panResponderBubble.panHandlers, {
                key: p,
              }),
              React.default.createElement(
                module1408.Bubble,
                {
                  style: J.mergeViewBox,
                  hasShadow: false,
                  hasBottomDecorator: b,
                },
                React.default.createElement(V, {
                  resizeMethod: 'auto',
                  style: [J.mergeImage, t.imageStyle],
                  source: h,
                }),
                React.default.createElement(
                  N,
                  {
                    style: J.mergeText,
                    numberOfLines: 1,
                  },
                  ' ',
                  c,
                  ' '
                ),
                React.default.createElement(V, {
                  resizeMethod: 'auto',
                  style: J.mergeArrow,
                  source: module1412,
                })
              )
            );
          }),
          p = 40 * n;
        return React.default.createElement(
          B,
          {
            pointerEvents: 'box-none',
            style: [
              J.mergeView,
              {
                top: 160 - p,
                height: p,
              },
            ],
          },
          s
        );
      },
    },
    {
      key: 'renderNameView',
      value: function (t) {
        var o = j(
            j({}, this.imageStyle),
            {},
            {
              height: module391.default.scaledPixel(26),
              width: module391.default.scaledPixel(26),
              borderRadius: module391.default.scaledPixel(26) / 2,
            }
          ),
          n = this._obName(this.props.type) + this._obNameAddOn(this.props.type, this.props.percent);

        return React.default.createElement(module1405.default, {
          funcId: 'map_object_bubble_' + this.props.type,
          objectName: n,
          objectImage: t,
          imageStyle: o,
          center: {
            x: 79,
            y: 163,
          },
          animatedOpacity: this.animatedOpacity,
          onBubbleLayout: this.onBubbleTextLayout,
          onPressBubble: this.onPressBubble,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          n = this;
        if (1 != this.props.visible) return React.default.createElement(B, null);

        var s = this._obImage(this.props.type);

        if (null == s) return React.default.createElement(B, null);
        var p = 1 == this.props.showAsBlackWall ? 2 : module1127.Config.size.objectsRadius,
          l = 1 == this.props.showAsBlackWall ? 2 : module1127.Config.size.objectsRadius,
          h = p * this.props.transform.xx,
          u = l * this.props.transform.yy,
          c = 5 * this.props.transform.xx,
          b = 5 * this.props.transform.yy,
          module1427 = React.default.createElement(
            B,
            {
              pointerEvents: 'auto',
              style: {
                position: 'absolute',
                left: (160 + h) / 2 + -2.1 * this.props.transform.xx,
                top: 168 - b / 3.6,
                width: c,
                height: b,
                overflow: 'visible',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
            React.default.createElement(
              _,
              {
                onPress: this.onPressObjectDelete,
              },
              React.default.createElement(module1415, {
                resizeMethod: 'scale',
                style: {
                  width: c,
                  height: b,
                },
                source: require('./1427'),
              })
            )
          ),
          w = this.state.showNameView && this.props.showMapObjectName,
          v = 'ai' == this.props.popBoxType && this.state.photoStatus != Y.REMINDER,
          P = 'photo' == this.props.popBoxType || this.state.photoStatus == Y.REMINDER,
          S = 'merges' == this.props.popBoxType && this.state.photoStatus != Y.REMINDER,
          x = 168;
        if ('merges' == this.props.popBoxType && (null == (t = this.props.merges) ? undefined : t.length) > 0 && 40 * this.props.merges.length > x)
          x = 40 * this.props.merges.length;
        return React.default.createElement(
          B,
          {
            pointerEvents: 'box-none',
            style: [
              J.mainContainer,
              {
                left: this.props.x - 80,
                top: this.props.y - u / 2 - x,
                height: 2 * x + u,
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
              B,
              {
                pointerEvents: 'none',
                style: {
                  position: 'absolute',
                  left: (160 - h) / 2,
                  top: u + x,
                  width: 32 + 3 * this.props.transform.yy,
                  overflow: 'visible',
                  borderWidth: 1,
                  borderColor: 'red',
                },
              },
              React.default.createElement(
                N,
                {
                  style: {
                    color: 'red',
                    fontSize: Math.ceil(8 + this.props.transform.yy),
                  },
                },
                '' + Math.round(this.props.originX)
              ),
              React.default.createElement(
                N,
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
            _,
            module22.default({}, module391.default.getAccessibilityLabel('map_object_view_' + this.props.type), {
              onPress: this.onPressObject,
              rejectResponderTermination: true,
            }),
            React.default.createElement(module1415, {
              resizeMethod: 'scale',
              source: s,
              onLoad: this.props.mapObjectImageOnLoad
                ? function (t) {
                    return n.onObjectImageOnLoad(t);
                  }
                : null,
              imageStyle: j(
                j({}, this.imageStyle),
                {},
                {
                  borderRadius: u / 2,
                }
              ),
              style: {
                top: x,
                left: (160 - h) / 2,
                width: h,
                height: u,
              },
            })
          ),
          w && v && this.renderNameView(s),
          w && P && this.renderPhotoBoxView(),
          w && S && this.renderMergesView(),
          this.props.showDeleteButton && !this.props.showAsBlackWall && module1427
        );
      },
    },
    {
      key: 'theme',
      get: function () {
        return this.context.theme.mapObjects;
      },
    },
    {
      key: 'backgroundColor',
      get: function () {
        return this.theme.objectBackgroudColor[this.props.colorIndex - 1] || this.theme.objectBackgroudColor[0];
      },
    },
    {
      key: 'imageStyle',
      get: function () {
        return {
          tintColor: this.theme.objectBorderColor,
          backgroundColor: this.backgroundColor,
        };
      },
    },
  ]);
  return T;
})(React.default.Component);

exports.MapObjectView = module1424;
module1424.contextType = module1200.AppConfigContext;
module1424.defaultProps = {
  showAsBlackWall: false,
  popBoxType: 'none',
  showOnlyGeneralObstacles: false,
  type: 18,
  showDeleteButton: false,
};
var J = L.create({
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
  innerPhotoView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 160,
    height: 160,
    justifyContent: 'flex-end',
  },
  innerPhotoSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
    paddingHorizontal: 3,
    maxWidth: 100,
  },
  innerPhotoText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  innerPhotoTextRow: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 3,
  },
  innerPhotoGuideTextRow: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 3,
    height: 36,
  },
  innerPhotoTipLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 6,
  },
  innerPhotoTextSubtitle: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  innerPhotoArrowImg: {
    width: 18,
    height: 18,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  mergeView: {
    position: 'absolute',
    left: 0,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mergeViewBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
    marginTop: 3,
  },
  mergeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  mergeText: {
    fontSize: 14,
    color: '#4A4A4A',
    marginLeft: 3,
  },
  mergeArrow: {
    width: 18,
    height: 18,
    marginRight: 1,
  },
});
