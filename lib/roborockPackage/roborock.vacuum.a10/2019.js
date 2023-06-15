var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module407 = require('./407'),
  module377 = require('./377'),
  module409 = require('./409');

function M() {
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

var module491 = require('./491'),
  module389 = require('./389'),
  module385 = require('./385'),
  A = {
    omega: 0,
    velocity: 0,
    seqnum: 0,
    duration: 1500,
  },
  module2023 = (function (t) {
    module7.default(B, t);

    var module491 = B,
      module2023 = M(),
      k = function () {
        var t,
          o = module11.default(module491);

        if (module2023) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);
      (o = k.call(this, t)).defaultBackground = require('./2020');
      o.activeBackground = require('./2021');
      o.activeControlBall = require('./2022');
      o.activeOutterBorder = require('./2023');
      o.isRemoting = false;
      o.isRemoteStarted = false;
      o.loopTimer = setInterval(function () {
        o.move();
      }, 400);
      o.state = {
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
        shouldActiveOutterBorderShow: false,
      };
      o.motionParam = A;
      o._panView = null;
      o._panViewLayout = null;
      o._lastAngle = NaN;
      o._lastDL = NaN;
      o._panResponder = module12.PanResponder.create({
        onStartShouldSetPanResponder: function (t, o) {
          return true;
        },
        onStartShouldSetPanResponderCapture: function (t, o) {
          return true;
        },
        onMoveShouldSetPanResponder: function (t, o) {
          return true;
        },
        onMoveShouldSetPanResponderCapture: function (t, o) {
          return true;
        },
        onPanResponderGrant: function (t, n) {
          var s = o._calcControlBallParam(t.nativeEvent.pageX, t.nativeEvent.pageY),
            l = s.dL,
            u = s.angle,
            h = s.velocity,
            c = s.omega;

          o._startAnimation(u, -l);

          o._lastAngle = NaN;
          o._lastDL = NaN;
          o.setState({
            isControlling: true,
            shouldActiveOutterBorderShow: true,
          });
          o.updateMotionParam(h, c);
        },
        onPanResponderMove: function (t, n) {
          var s = o._calcControlBallParam(t.nativeEvent.pageX, t.nativeEvent.pageY),
            l = s.dL,
            u = s.angle,
            h = s.velocity,
            c = s.omega;

          if (Math.abs(o._lastAngle - u) > Math.PI / 3) {
            o._startAnimation(u, -l);

            console.log('_startAnimation(angle, dL):', u, -l);
          } else if (!(o.state.isAnimating && o._lastAngle == u)) {
            o.state.angle.setValue(u);
            o.state.offset.setValue(-l);
          }

          o._lastAngle = u;
          o._lastDL = l;
          o.updateMotionParam(h, c);
        },
        onPanResponderTerminationRequest: function (t, o) {
          return true;
        },
        onPanResponderRelease: function (t, n) {
          o._startAnimation(0, 0);

          o.setState({
            isControlling: false,
            shouldActiveOutterBorderShow: false,
          });
          o.updateMotionParam(0, 0);
        },
        onPanResponderTerminate: function (t, n) {
          o._startAnimation(0, 0);

          o.setState({
            isControlling: false,
            shouldActiveOutterBorderShow: false,
          });
          o.updateMotionParam(0, 0);
        },
        onShouldBlockNativeResponder: function (t, o) {
          return true;
        },
      });
      return o;
    }

    module5.default(B, [
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'askShouldStartOrMove',
        value: function (t) {
          if (!this.hasShownTranverseDialog)
            module377.RSM.state == module377.RobotState.BACK_TO_DOCK || module377.RSM.isCleanTaskShouldResume() || module377.RSM.isCleaning()
              ? ((this.hasShownTranverseDialog = true),
                module409.Log.log(module409.LogTypes.Monitor, 'ask if tranverse to remote,now state is ' + module377.RSM.state),
                this.props.askShouldRunCmd &&
                  this.props.askShouldRunCmd(function (o) {
                    if (o && t) t();
                  }, 'remote'))
              : t && t();
        },
      },
      {
        key: 'updateMotionParam',
        value: function (t, n) {
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
                      (s.omega = n),
                      (this.motionParam = s),
                      !(0 == t && 0 == n)
                        ? this.askShouldStartOrMove(function () {
                            return (l.shouldMove = true);
                          })
                        : this.stopRemoteMove(),
                      (u.t0 = !this.shouldMove),
                      !u.t0)
                    ) {
                      u.next = 11;
                      break;
                    }

                    u.next = 11;
                    return regeneratorRuntime.default.awrap(module407.default.remoteStop());

                  case 11:
                    if (this.props.didOperate) this.props.didOperate();

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
          var t = this;

          if (this.shouldMove && this.isRemoteStarted) {
            var o = JSON.parse(JSON.stringify(this.motionParam));
            o.seqnum += 1;
            this.motionParam = o;
            module389.callMethod(module385.Methods.AppRemoteControlMove, [o], {}, function (o, n) {
              console.log('callMethod remote - ' + o + ' - ' + JSON.stringify(n));
              if (!t.isRemoting) t._didBeginRemote();
            });
          }
        },
      },
      {
        key: '_didBeginRemote',
        value: function () {
          module377.RSM.state = module377.RobotState.REMOTE;
          module377.RSM.lockMotionStatus();
          this.isRemoting = true;
          this.hasShownTranverseDialog = false;
          if (this.props.didBeginRemote) this.props.didBeginRemote();
        },
      },
      {
        key: 'stopRemoteMove',
        value: function () {
          this.isRemoting = false;
          this.shouldMove = false;
          this.setState({
            isControlling: false,
            isAnimating: false,
          });
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
                    return regeneratorRuntime.default.awrap(module407.default.remoteStart());

                  case 4:
                    this._didBeginRemote();

                    module409.Log.log(module409.LogTypes.Monitor, 'remote start, now state is ' + module377.RSM.state, module409.InfoColors.Success);
                    t.next = 14;
                    break;

                  case 9:
                    t.prev = 9;
                    t.t0 = t.catch(0);
                    this.hasShownTranverseDialog = false;
                    this.isRemoteStarted = false;
                    module409.Log.log(module409.LogTypes.Monitor, 'remote start failed,' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0), module409.InfoColors.Fail);

                  case 14:
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
                    t.prev = 3;
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.remoteEnd());

                  case 6:
                    this.isRemoteStarted = false;
                    console.log('remoteEnd');
                    t.next = 14;
                    break;

                  case 11:
                    t.prev = 11;
                    t.t0 = t.catch(3);
                    console.log('remoteEnd  error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 14:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[3, 11]],
            Promise
          );
        },
      },
      {
        key: '_onLayout',
        value: function (t) {
          var o = this;
          setTimeout(function t() {
            return (
              o._panView &&
              o._panView.measure(function (n, s, l, u, h, c) {
                if ((console.log('RemoteControlJoyStickView::measure:', n, s, l, u, h, c), o._panViewLayout && o._panViewLayout.pageX === h && o._panViewLayout.pageY === c))
                  console.log('measure: final layout gotten:', o._panViewLayout);
                else {
                  o._panViewLayout = {
                    x: n,
                    y: s,
                    width: l,
                    height: u,
                    pageX: h,
                    pageY: c,
                  };
                  var f = {
                      x: h + l / 2,
                      y: c + u / 2,
                    },
                    p = (l / 700) * 160.4;
                  o.setState({
                    center: f,
                    radiusLimit: p,
                  });
                  setTimeout(t, 100);
                }
              })
            );
          });
        },
      },
      {
        key: '_calcControlBallParam',
        value: function (t, o) {
          var n = [this.state.center.x, this.state.center.y],
            s = t - n[0],
            l = n[1] - o,
            u = Math.sqrt(s * s + l * l),
            h = s ** l,
            c = s,
            f = l,
            p = h;

          if (u > this.state.radiusLimit) {
            c = (u = this.state.radiusLimit) * Math.sin(p);
            f = u * Math.cos(p);
          }

          if (!(h <= (39 * -Math.PI) / 40 || h < this.state.angleLimitLower || h >= (39 * Math.PI) / 40)) this.state.angleLimitUpper;
          var module407,
            S = Math.PI / 3,
            module409 = (f / this.state.radiusLimit) * 0.29;
          module407 = h >= -Math.PI / 2 && h <= Math.PI / 2 ? (-c / this.state.radiusLimit) * S : (c / this.state.radiusLimit) * S;
          module409 = Math.round(100 * module409) / 100;
          if (h >= -Math.PI / 12 && h <= Math.PI / 12) module407 = 0;
          else if (h <= (11 * -Math.PI) / 12 || h >= (11 * Math.PI) / 12) module407 = 0;
          else if (h >= (7 * -Math.PI) / 12 && h <= (5 * -Math.PI) / 12) {
            module409 = 0;
            module407 = 0.3;
          } else if (h <= (7 * Math.PI) / 12 && h >= (5 * Math.PI) / 12) {
            module409 = 0;
            module407 = -0.3;
          } else module407 = Math.round(100 * module407) / 100;

          if (u <= 20.25) {
            this.setState({
              shouldActiveOutterBorderShow: false,
            });
            module409 = 0;
          } else
            this.setState({
              shouldActiveOutterBorderShow: true,
            });

          return {
            angle: p,
            dL: u,
            velocity: module409,
            omega: module407,
          };
        },
      },
      {
        key: '_startAnimation',
        value: function (t, o) {
          var n = this;

          this._stopAnimation();

          var s = [],
            l = module12.Animated.timing(this.state.angle, {
              toValue: t,
              duration: 0,
            });

          if ((s.push(l), 'number' == typeof o)) {
            var u = module12.Animated.timing(this.state.offset, {
              toValue: o,
              duration: 0,
            });
            s.push(u);
          }

          var h = function () {
            return n.setState({
              isAnimating: false,
            });
          };

          module12.Animated.parallel(s).start(
            function () {
              if (0 === t || 0 === o) module12.Animated.delay(0).start(h);
              else h();
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
            o = this.state.angle.interpolate({
              inputRange: [-Math.PI, Math.PI],
              outputRange: ['-180deg', '180deg'],
            }),
            s = this.state.shouldActiveOutterBorderShow,
            l = this.state.isControlling || this.state.isAnimating,
            u = React.default.createElement(module12.Animated.Image, {
              style: [
                L.activeControlBall,
                {
                  transform: [
                    {
                      rotateZ: o,
                    },
                    {
                      translateY: this.state.offset,
                    },
                  ],
                },
              ],
              source: this.activeControlBall,
              resizeMode: 'contain',
            }),
            h = React.default.createElement(module12.Animated.Image, {
              style: [
                L.outterBackground,
                {
                  transform: [
                    {
                      rotateZ: o,
                    },
                  ],
                },
              ],
              source: this.activeOutterBorder,
              resizeMode: 'contain',
            }),
            c = React.default.createElement(module12.Animated.Image, {
              style: L.outterBackground,
              source: l ? this.activeBackground : this.defaultBackground,
              resizeMode: 'contain',
            });
          return React.default.createElement(
            module12.View,
            {
              style: [L.container, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module21.default(
                {
                  style: {
                    flex: 1,
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                    borderColor: 'transparent',
                  },
                },
                this._panResponder.panHandlers,
                {
                  onLayout: this._onLayout.bind(this),
                  collapsable: false,
                  ref: function (o) {
                    return (t._panView = o);
                  },
                }
              ),
              c,
              s && h,
              l && u
            )
          );
        },
      },
    ]);
    return B;
  })(React.default.Component);

exports.default = module2023;
var L = module12.StyleSheet.create({
  container: {},
  activeControlBall: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    width: '40%',
    height: '40%',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  outterBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
  },
});
