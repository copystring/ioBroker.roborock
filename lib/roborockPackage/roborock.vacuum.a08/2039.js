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
  module409 = require('./409'),
  module387 = require('./387'),
  module506 = require('./506'),
  module383 = require('./383');

function P() {
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

require('./389');

var module491 = require('./491').strings,
  k = 0,
  T = Math.round((Math.PI / 3) * 100) / 100,
  x = {
    omega: 0,
    velocity: 0,
    seqnum: 0,
    duration: 1500,
  },
  module2044 = (function (t) {
    module7.default(O, t);

    var module506 = O,
      module2044 = P(),
      L = function () {
        var t,
          o = module11.default(module506);

        if (module2044) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);
      (o = L.call(this, t)).motionParam = x;
      o.motionParam.seqnum = t.seqnum || 0;
      o.isRemoting = module377.RSM.state == module377.RobotState.REMOTE;
      o.isRemoteStarted = module377.RSM.state == module377.RobotState.REMOTE;
      o.isTouched = false;
      o.loopTimer = setInterval(function () {
        o.move();
      }, 400);
      o.state = {
        isRemoteLaunching: false,
        pressState: k,
      };
      o.center = {
        x: 0,
        y: 0,
      };
      o.innerRadius = 0;
      o.outerRadius = 0;
      o._panView = null;
      o._panViewLayout = null;
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
          o._handlePressEvent(t.nativeEvent.pageX, t.nativeEvent.pageY);
        },
        onPanResponderMove: function (t, n) {
          o._handlePressEvent(t.nativeEvent.pageX, t.nativeEvent.pageY);
        },
        onPanResponderTerminationRequest: function (t, o) {
          return true;
        },
        onPanResponderRelease: function (t, n) {
          o._handlePressEvent(null, null);
        },
        onPanResponderTerminate: function (t, n) {
          o._handlePressEvent(null, null);
        },
        onShouldBlockNativeResponder: function (t, o) {
          return true;
        },
      });
      return o;
    }

    module5.default(O, [
      {
        key: 'askShouldStartOrMove',
        value: function (t) {
          var o = this;
          if (!this.hasShownTranverseDialog)
            module377.RSM.state == module377.RobotState.BACK_TO_DOCK ||
            module377.RSM.isCleanTaskShouldResume() ||
            module377.RSM.isCleaning() ||
            module377.RSM.state == module377.RobotState.GOTO_TARGET
              ? ((this.hasShownTranverseDialog = true),
                module409.Log.log(module409.LogTypes.Monitor, 'ask if tranverse to remote,now state is ' + module377.RSM.state),
                this.props.askShouldRunCmd &&
                  this.props.askShouldRunCmd(function (n) {
                    if (n && t) t();
                    if (!n) o.hasShownTranverseDialog = false;
                  }, 'remote'))
              : t && t();
        },
      },
      {
        key: 'updateMotionParam',
        value: function (t, n) {
          var s,
            u,
            l = this;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (
                      (console.log(t, n),
                      (s = !(0 == t && 0 == n)),
                      !this.isRemoteStarted &&
                        s &&
                        this.askShouldStartOrMove(function () {
                          return l.start();
                        }),
                      ((u = JSON.parse(JSON.stringify(this.motionParam))).velocity = t),
                      (u.omega = n),
                      (this.motionParam = u),
                      s
                        ? this.askShouldStartOrMove(function () {
                            return (l.shouldMove = true);
                          })
                        : this.stopRemoteMove(),
                      (h.t0 = !this.shouldMove),
                      !h.t0)
                    ) {
                      h.next = 12;
                      break;
                    }

                    h.next = 12;
                    return regeneratorRuntime.default.awrap(module407.default.remoteStop());

                  case 12:
                  case 'end':
                    return h.stop();
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
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this.shouldMove && this.isRemoteStarted && !this.state.isRemoteLaunching) {
                      s.next = 3;
                      break;
                    }

                    return s.abrupt('return');

                  case 3:
                    (t = JSON.parse(JSON.stringify(this.motionParam))).seqnum += 1;
                    this.motionParam = t;
                    if (this.props.updateSeqnum) this.props.updateSeqnum(t.seqnum);
                    s.prev = 7;
                    s.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.remoteMove(t));

                  case 10:
                    n = s.sent;
                    console.log('remote move - ' + JSON.stringify(n) + ' - ' + JSON.stringify(t));
                    if (!this.isRemoting) this._didBeginRemote();
                    s.next = 18;
                    break;

                  case 15:
                    s.prev = 15;
                    s.t0 = s.catch(7);
                    console.log('remote move  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 18:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[7, 15]],
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
          this.hasShownTranverseDialog = false;
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
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    this.isRemoteStarted = true;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.remoteStart());

                  case 4:
                    this.setState({
                      isRemoteLaunching: true,
                      pressState: k,
                    });
                    setTimeout(function () {
                      t.setState({
                        isRemoteLaunching: false,
                      });

                      t._didBeginRemote();
                    }, 6e3);

                    this._didBeginRemote();

                    module409.Log.log(module409.LogTypes.Monitor, 'remote start, now state is ' + module377.RSM.state, module409.InfoColors.Success);
                    n.next = 16;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(0);
                    this.hasShownTranverseDialog = false;
                    this.isRemoteStarted = false;
                    module409.Log.log(module409.LogTypes.Monitor, 'remote start failed,' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0), module409.InfoColors.Fail);

                  case 16:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 11]],
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
        key: 'componentWillUnmount',
        value: function () {
          if (this.loopTimer) clearInterval(this.loopTimer);
        },
      },
      {
        key: 'lightImgs',
        value: function () {
          return [
            this.context.theme.remoteControl.imageDefaultNew,
            this.context.theme.remoteControl.imageForwardNew,
            this.context.theme.remoteControl.imageDownNew,
            this.context.theme.remoteControl.imageLeftNew,
            this.context.theme.remoteControl.imageRightNew,
          ];
        },
      },
      {
        key: 'darkImgs',
        value: function () {
          return [require('./2040'), require('./2041'), require('./2042'), require('./2043'), require('./2044')];
        },
      },
      {
        key: '_getActiveImage',
        value: function (t) {
          var o = this.state.pressState;
          return t ? this.lightImgs()[o] : this.darkImgs()[o];
        },
      },
      {
        key: '_onLayout',
        value: function (t) {
          var o = this,
            n = function t() {
              return (
                o._panView &&
                o._panView.measure(function (n, s, u, l, h, c) {
                  if ((console.log('RemoteControlView::measure:', n, s, u, l, h, c), o._panViewLayout && o._panViewLayout.pageX === h && o._panViewLayout.pageY === c))
                    console.log('measure: final layout gotten:', o._panViewLayout);
                  else {
                    o._panViewLayout = {
                      x: n,
                      y: s,
                      width: u,
                      height: l,
                      pageX: h,
                      pageY: c,
                    };
                    o.center = {
                      x: h + u / 2,
                      y: c + l / 2,
                    };
                    var p = u / 375;
                    o.innerRadius = 30 * p;
                    o.outerRadius = 200 * p;
                    setTimeout(function () {
                      return t();
                    }, 100);
                  }
                })
              );
            };

          setTimeout(function () {
            return n();
          });
        },
      },
      {
        key: '_handlePressEvent',
        value: function (t, o) {
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else {
            if (((this.isTouched = true), this.props.didOperate && this.props.didOperate(), null === t || null === o)) {
              console.log('none1 ');
              this.isTouched = false;
              this.setState({
                pressState: k,
              });
              return void this.updateMotionParam(0, 0);
            }

            if (!this.state.isRemoteLaunching) {
              var n = t - this.center.x,
                s = this.center.y - o,
                u = Math.sqrt(n * n + s * s);

              if (u < this.innerRadius || u > this.outerRadius) {
                console.log('none2 ');
                this.setState({
                  pressState: k,
                });
                return void this.updateMotionParam(0, 0);
              }

              var l = this.state.pressState,
                h = k,
                c = 0,
                p = 0,
                f = s ** n;

              if (f >= Math.PI / 4 && f < (3 * Math.PI) / 4) {
                h = 1;
                c = 0.2;
                p = 0;
              } else if (f >= (3 * Math.PI) / 4 || f < (3 * -Math.PI) / 4) {
                h = 3;
                c = 0;
                p = T;
              } else if (f >= (3 * -Math.PI) / 4 && f < -Math.PI / 4) {
                h = 2;
                c = -0.2;
                p = 0;
              } else {
                h = 4;
                c = 0;
                p = -T;
              }

              if (l != h) {
                this.updateMotionParam(c, p);
                this.setState({
                  pressState: h,
                });
                module383.LogEventCommon('tap_remote_control_panel', {
                  direction: h,
                  isPortrait: this.props.isPortrait,
                });
              }
            }
          }
        },
      },
      {
        key: 'render',
        value: function () {
          this.context.theme;
          var t = this,
            o = this.props,
            s = o.style,
            u = o.width,
            l = o.isPortrait;
          if (!l) module387.default.textShadow();
          return React.default.createElement(
            module12.View,
            module21.default(
              {
                style: [I.RemoteControlView, s],
                ref: function (o) {
                  return (t._panView = o);
                },
              },
              this._panResponder.panHandlers,
              {
                onLayout: this._onLayout.bind(this),
                collapsable: false,
              }
            ),
            React.default.createElement(module12.ImageBackground, {
              style: [
                I.RemoteControlViewImageBackground,
                u && {
                  width: u,
                },
                {
                  opacity: this.state.isRemoteLaunching ? 0.5 : 1,
                },
              ].filter(Boolean),
              source: this._getActiveImage(l),
            })
          );
        },
      },
    ]);
    return O;
  })(React.default.Component);

exports.default = module2044;
module2044.contextType = module506.AppConfigContext;
module12.Dimensions.get('screen');
var I = module12.StyleSheet.create({
  loadingTip: {
    position: 'absolute',
    zIndex: 99,
    elevation: 99,
    fontSize: 14,
  },
  RemoteControlView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  RemoteControlViewImageBackground: {
    width: module12.Dimensions.get('window').width,
    aspectRatio: 1,
    borderWidth: 0,
    borderColor: 'transparent',
  },
});
