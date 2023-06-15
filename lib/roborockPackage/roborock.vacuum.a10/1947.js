var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module377 = require('./377'),
  module506 = require('./506');

function S() {
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

require('./491').strings;

var module1247 = require('./1247'),
  R = (function (t) {
    module7.default(P, t);

    var module506 = P,
      R = S(),
      _ = function () {
        var t,
          n = module11.default(module506);

        if (R) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      n = _.call(this, t);
      var o = t.screenProps,
        l = o.updateMotionParam,
        u = o.startMotion,
        c = o.stopMotion,
        p = o.startSendMove,
        h = o.stopSendMove;
      n.updateMotionParam = l;
      n.startMotion = u;
      n.stopMotion = c;
      n.startSendMove = p;
      n.stopSendMove = h;
      n.isRemoting = false;
      n.isRemoteStarted = false;
      n.loopTimer = setInterval(function () {
        n.move();
      }, 400);
      n.state = {
        center: {
          x: 0,
          y: 0,
        },
        radiusLimit: 0,
        angleLimitLower: -Math.PI,
        angleLimitUpper: Math.PI,
        angle: new module12.Animated.Value(0),
        offset: new module12.Animated.Value(0),
        isControlling: false,
        isAnimating: false,
        isIndicatorShow: false,
      };
      n._panView = null;
      n._panViewLayout = null;
      n._lastAngle = NaN;
      n._lastDL = NaN;
      n._panResponder = module12.PanResponder.create({
        onStartShouldSetPanResponder: function (t, n) {
          return true;
        },
        onStartShouldSetPanResponderCapture: function (t, n) {
          return true;
        },
        onMoveShouldSetPanResponder: function (t, n) {
          return true;
        },
        onMoveShouldSetPanResponderCapture: function (t, n) {
          return true;
        },
        onPanResponderGrant: function (t, o) {
          console.warn('start=', n.loopTimer);
          n.startSendMove();
          console.log('onPanResponderGrant', t.nativeEvent.target, t.nativeEvent.locationX, t.nativeEvent.locationY, t.nativeEvent.pageX, t.nativeEvent.pageY, o.x0, o.y0);

          var s = n._calcControlBallParam(t.nativeEvent.pageX, t.nativeEvent.pageY),
            l = s.dL,
            u = s.angle,
            c = s.velocity,
            p = s.omega;

          n._startAnimation(u, -l);

          n._lastAngle = NaN;
          n._lastDL = NaN;
          n.setState({
            isControlling: true,
            isIndicatorShow: true,
          });
          n.updateMotionParam(c, p);
          n.startMotion();
        },
        onPanResponderMove: function (t, o) {
          console.warn('start');
          n.startSendMove();
          console.log('onPanResponderMove', t.nativeEvent.target, t.nativeEvent.locationX, t.nativeEvent.locationY, t.nativeEvent.pageX, t.nativeEvent.pageY, o.x0, o.y0);

          var s = n._calcControlBallParam(t.nativeEvent.pageX, t.nativeEvent.pageY),
            l = s.dL,
            u = s.angle,
            c = s.velocity,
            p = s.omega;

          if (Math.abs(n._lastAngle - u) > Math.PI / 3) {
            n._startAnimation(u, -l);

            console.log('_startAnimation(angle, dL):', u, -l);
          } else if (!(n.state.isAnimating && n._lastAngle == u)) {
            n.state.angle.setValue(u);
            console.log('setval(angle):', u);
            n.state.offset.setValue(-l);
            console.log('setval(dl):', -l);
          }

          n._lastAngle = u;
          n._lastDL = l;
          n.updateMotionParam(c, p);
        },
        onPanResponderTerminationRequest: function (t, n) {
          return true;
        },
        onPanResponderRelease: function (t, o) {
          n.stopSendMove();
          n.stopRemoteMove();
          console.warn('stop');

          n._startAnimation(0, 0);

          n.setState({
            isControlling: false,
            isIndicatorShow: false,
          });
          n.updateMotionParam(0, 0);
        },
        onPanResponderTerminate: function (t, o) {
          n.stopSendMove();
          n.stopRemoteMove();
          console.warn('stop');

          n._startAnimation(0, 0);

          n.setState({
            isControlling: false,
            isIndicatorShow: false,
          });
          n.updateMotionParam(0, 0);
        },
        onShouldBlockNativeResponder: function (t, n) {
          return true;
        },
      });
      return n;
    }

    module5.default(P, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.stop();
        },
      },
      {
        key: 'askShouldStartOrMove',
        value: function (t) {
          if (module377.RSM.state == module377.RobotState.BACK_TO_DOCK || module377.RSM.isCleanTaskShouldResume() || module377.RSM.isCleaning()) {
            if (this.props.askShouldRunCmd)
              this.props.askShouldRunCmd(function (n) {
                if (n && t) t();
              });
          } else if (t) t();
        },
      },
      {
        key: 'updateMotionParam',
        value: function (t, o) {
          var s,
            l = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      (!this.isRemoteStarted &&
                        this.askShouldStartOrMove(function () {
                          return l.start();
                        }),
                      ((s = JSON.parse(JSON.stringify(this.motionParam))).velocity = t),
                      (s.omega = o),
                      (this.motionParam = s),
                      console.log('updateMotionParam  - ' + JSON.stringify(this.motionParam)),
                      !(0 == t && 0 == o)
                        ? this.askShouldStartOrMove(function () {
                            return (l.shouldMove = true);
                          })
                        : this.stopRemoteMove(),
                      (u.t0 = !this.shouldMove),
                      !u.t0)
                    ) {
                      u.next = 12;
                      break;
                    }

                    u.next = 12;
                    return regeneratorRuntime.default.awrap(RobotApi.remoteStop());

                  case 12:
                  case 'end':
                    return u.stop();
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
        key: 'move',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this.shouldMove && this.isRemoteStarted) {
                      s.next = 3;
                      break;
                    }

                    return s.abrupt('return');

                  case 3:
                    t = JSON.parse(JSON.stringify(this.motionParam));
                    console.log('paras - ' + JSON.stringify(t));
                    t.seqnum += 1;
                    this.motionParam = t;
                    s.next = 9;
                    return regeneratorRuntime.default.awrap(RobotApi.remoteMove(t));

                  case 9:
                    o = s.sent;
                    console.log('callMethod remote - ' + JSON.stringify(o));
                    if (!this.isRemoting) this._didBeginRemote();

                  case 12:
                  case 'end':
                    return s.stop();
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
        key: '_didBeginRemote',
        value: function () {
          module377.RSM.state = module377.RobotState.REMOTE;
          module377.RSM.lockMotionStatus();
          this.isRemoting = true;
          if (this.props.didBeginRemote) this.props.didBeginRemote();
        },
      },
      {
        key: 'stopRemoteMove',
        value: function () {
          this.isRemoting = false;
          this.shouldMove = false;
        },
      },
      {
        key: 'start',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    this.isRemoteStarted = true;
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(RobotApi.remoteStart());

                  case 4:
                    this._didBeginRemote();

                    console.log('remoteStart');
                    t.next = 13;
                    break;

                  case 9:
                    t.prev = 9;
                    t.t0 = t.catch(0);
                    this.isRemoteStarted = false;
                    console.log('remoteStart  error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 13:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'stop',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    clearInterval(this.loopTimer);
                    this.loopTimer = null;
                    this.shouldMove = false;
                    this.isRemoteStarted = false;

                  case 4:
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
        key: '_onLayout',
        value: function (t) {
          var n = this;
          module1247.setTimeout(function t() {
            return (
              n._panView &&
              n._panView.measure(function (o, s, l, u, c, p) {
                if ((console.log('RemoteControlJoyStickView::measure:', o, s, l, u, c, p), n._panViewLayout && n._panViewLayout.pageX === c && n._panViewLayout.pageY === p))
                  console.log('measure: final layout gotten:', n._panViewLayout);
                else {
                  n._panViewLayout = {
                    x: o,
                    y: s,
                    width: l,
                    height: u,
                    pageX: c,
                    pageY: p,
                  };
                  var h = {
                      x: c + l / 2,
                      y: p + u / 2,
                    },
                    f = (l / 700) * 165;
                  n.setState({
                    center: h,
                    radiusLimit: f,
                  });
                  module1247.setTimeout(t, 100);
                }
              })
            );
          });
        },
      },
      {
        key: '_calcControlBallParam',
        value: function (t, n) {
          var o = [this.state.center.x, this.state.center.y],
            s = t - o[0],
            l = o[1] - n,
            u = Math.sqrt(s * s + l * l),
            c = s ** l,
            p = s,
            h = l,
            f = c;

          if (u > this.state.radiusLimit) {
            p = (u = this.state.radiusLimit) * Math.sin(f);
            h = u * Math.cos(f);
          }

          if (c < this.state.angleLimitLower) {
            f = this.state.angleLimitLower;
            h = p / Math.tan(f);
            u = Math.sqrt(p * p + h * h);
          } else if (c > this.state.angleLimitUpper) {
            f = this.state.angleLimitUpper;
            h = p / Math.tan(f);
            u = Math.sqrt(p * p + h * h);
          }

          var v = Math.PI / 3,
            M = (h / this.state.radiusLimit) * 0.29,
            S = (-p / this.state.radiusLimit) * v,
            y = {
              angle: f,
              dL: u,
              velocity: (M = Math.round(100 * M) / 100),
              omega: (S = Math.round(100 * S) / 100),
            };
          console.log('control ball:', y);
          return y;
        },
      },
      {
        key: '_startAnimation',
        value: function (t, n) {
          var o = this;

          this._stopAnimation();

          var s = [],
            l = module12.Animated.timing(this.state.angle, {
              toValue: t,
              duration: 100,
            });
          s.push(l);

          var u = function () {
            return o.setState({
              isAnimating: false,
            });
          };

          module12.Animated.parallel(s).start(
            function () {
              if (0 === t || 0 === n) module12.Animated.delay(50).start(u);
              else u();
            },
            {
              stopTogether: false,
            }
          );
          this.setState({
            isAnimating: true,
          });
        },
      },
      {
        key: '_stopAnimation',
        value: function () {
          this.state.angle.stopAnimation();
          this.state.offset.stopAnimation();
          this.setState({
            isAnimating: false,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.remoteControl.imageDefaultJoy,
            s = this.context.theme.remoteControl.imageCleanBackground,
            l = this.context.theme.remoteControl.imageCleanControlBall,
            u = this.context.theme.remoteControl.imageCleanIndicator,
            c = this.state.angle.interpolate({
              inputRange: [-Math.PI, Math.PI],
              outputRange: ['-180deg', '180deg'],
            }),
            p = this.state.isIndicatorShow,
            v = this.state.isControlling || this.state.isAnimating;
          return React.default.createElement(
            module12.View,
            {
              style: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0,
                borderColor: 'transparent',
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0,
                  borderColor: 'transparent',
                },
                onLayout: this._onLayout.bind(this),
                collapsable: false,
                ref: function (n) {
                  return (t._panView = n);
                },
              },
              React.default.createElement(
                module12.Animated.Image,
                module21.default(
                  {
                    style: {
                      position: 'absolute',
                      top: '14.5%',
                      left: '14.5%',
                      width: '71%',
                      height: '71%',
                      borderWidth: 0,
                      borderColor: 'transparent',
                    },
                  },
                  this._panResponder.panHandlers,
                  {
                    source: v ? s : n,
                    resizeMode: 'contain',
                  }
                )
              ),
              p
                ? React.default.createElement(module12.Animated.Image, {
                    style: [
                      {
                        position: 'absolute',
                        top: '7.5%',
                        left: '7.5%',
                        width: '85%',
                        height: '85%',
                        borderWidth: 0,
                        borderColor: 'transparent',
                      },
                      {
                        transform: [
                          {
                            rotateZ: c,
                          },
                        ],
                      },
                    ],
                    source: u,
                    resizeMode: 'contain',
                  })
                : null,
              v
                ? React.default.createElement(module12.Animated.Image, {
                    style: [
                      {
                        position: 'absolute',
                        top: '35%',
                        left: '35%',
                        width: '30%',
                        height: '30%',
                        borderWidth: 0,
                        borderColor: 'transparent',
                      },
                      {
                        transform: [
                          {
                            rotateZ: c,
                          },
                          {
                            translateY: this.state.offset,
                          },
                        ],
                      },
                    ],
                    source: l,
                    resizeMode: 'contain',
                  })
                : null
            )
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

exports.default = R;
R.contextType = module506.AppConfigContext;
