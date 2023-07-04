var module22 = require('./22'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module416 = require('./416'),
  module381 = require('./381'),
  module418 = require('./418'),
  module391 = require('./391'),
  module1199 = require('./1199'),
  module387 = require('./387'),
  module390 = require('./390');

function O(t, o) {
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

function b(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      O(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function T() {
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

require('./393');

var module510 = require('./510').strings,
  C = 0,
  x = Math.round((Math.PI / 3) * 100) / 100,
  I = {
    omega: 0,
    velocity: 0,
    seqnum: 0,
    duration: 1500,
  },
  module2191 = (function (t) {
    module9.default(module2187, t);

    var module50 = module2187,
      module1199 = T(),
      O = function () {
        var t,
          o = module12.default(module50);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function module2187(t) {
      var o;
      module6.default(this, module2187);
      (o = O.call(this, t)).motionParam = I;
      o.motionParam.seqnum = t.seqnum || 0;
      o.isRemoting = module381.RSM.state == module381.RobotState.REMOTE;
      o.isRemoteStarted = module381.RSM.state == module381.RobotState.REMOTE;
      o.isTouched = false;
      o.state = {
        isRemoteLaunching: false,
        pressState: C,
      };
      o.center = {
        x: 0,
        y: 0,
      };
      o.innerRadius = 0;
      o.outerRadius = 0;
      o.loopTimer = setInterval(function () {
        o.move();
      }, 400);
      o._panView = null;
      o._panViewLayout = null;
      o._panResponder = module13.PanResponder.create({
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

    module7.default(module2187, [
      {
        key: 'askShouldStartOrMove',
        value: function (t) {
          var o = this;
          if (!this.hasShownTranverseDialog)
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
            module381.RSM.isCleanTaskShouldResume() ||
            module381.RSM.isCleaning() ||
            module381.RSM.state == module381.RobotState.GOTO_TARGET
              ? ((this.hasShownTranverseDialog = true),
                module418.Log.log(module418.LogTypes.Monitor, 'ask if tranverse to remote,now state is ' + module381.RSM.state),
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
        value: function (t, o) {
          var n,
            u,
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      (console.log(t, o),
                      (n = !(0 == t && 0 == o)),
                      !this.isRemoteStarted &&
                        n &&
                        this.askShouldStartOrMove(function () {
                          return l.start();
                        }),
                      ((u = JSON.parse(JSON.stringify(this.motionParam))).velocity = t),
                      (u.omega = o),
                      (this.motionParam = u),
                      n
                        ? this.askShouldStartOrMove(function () {
                            return (l.shouldMove = true);
                          })
                        : this.stopRemoteMove(),
                      (c.t0 = !this.shouldMove),
                      !c.t0)
                    ) {
                      c.next = 12;
                      break;
                    }

                    c.next = 12;
                    return regeneratorRuntime.default.awrap(module416.default.remoteStop());

                  case 12:
                  case 'end':
                    return c.stop();
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.shouldMove && this.isRemoteStarted && !this.state.isRemoteLaunching) {
                      n.next = 3;
                      break;
                    }

                    return n.abrupt('return');

                  case 3:
                    (t = JSON.parse(JSON.stringify(this.motionParam))).seqnum += 1;
                    this.motionParam = t;
                    if (this.props.updateSeqnum) this.props.updateSeqnum(t.seqnum);
                    n.prev = 7;
                    n.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.remoteMove(t));

                  case 10:
                    o = n.sent;
                    console.log('remote move - ' + JSON.stringify(o) + ' - ' + JSON.stringify(t));
                    if (!this.isRemoting) this._didBeginRemote();
                    n.next = 18;
                    break;

                  case 15:
                    n.prev = 15;
                    n.t0 = n.catch(7);
                    console.log('remote move  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 18:
                  case 'end':
                    return n.stop();
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
          module381.RSM.preMockMotionStatus(module381.RobotState.REMOTE);
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module381.RSM.voiceChat || module390.default.isSupportRemoteControlInCall()) {
                      o.next = 3;
                      break;
                    }

                    globals.showToast(module510.voice_chat_title2);
                    return o.abrupt('return');

                  case 3:
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.remoteStart());

                  case 6:
                    this.isRemoteStarted = true;
                    this.setState({
                      isRemoteLaunching: true,
                      pressState: C,
                    });
                    setTimeout(function () {
                      t.setState({
                        isRemoteLaunching: false,
                      });
                    }, 6e3);
                    this.loopTimer = setInterval(function () {
                      t.move();
                    }, 400);

                    this._didBeginRemote();

                    module418.Log.log(module418.LogTypes.Monitor, 'remote start, now state is ' + module381.RSM.state, module418.InfoColors.Success);
                    o.next = 20;
                    break;

                  case 15:
                    o.prev = 15;
                    o.t0 = o.catch(3);
                    this.hasShownTranverseDialog = false;
                    this.isRemoteStarted = false;
                    module418.Log.log(module418.LogTypes.Monitor, 'remote start failed,' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0), module418.InfoColors.Fail);

                  case 20:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 15]],
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
                    return regeneratorRuntime.default.awrap(module416.default.remoteEnd());

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
          return [require('./2187'), require('./2188'), require('./2189'), require('./2190'), require('./2191')];
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
                o._panView.measure(function (n, s, u, l, c, h) {
                  if ((console.log('RemoteControlView::measure:', n, s, u, l, c, h), o._panViewLayout && o._panViewLayout.pageX === c && o._panViewLayout.pageY === h))
                    console.log('measure: final layout gotten:', o._panViewLayout);
                  else {
                    o._panViewLayout = {
                      x: n,
                      y: s,
                      width: u,
                      height: l,
                      pageX: c,
                      pageY: h,
                    };
                    o.center = {
                      x: c + u / 2,
                      y: h + l / 2,
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
          if (!module381.RSM.voiceChat || module390.default.isSupportRemoteControlInCall()) {
            if (((this.isTouched = true), this.props.didOperate && this.props.didOperate(), null === t || null === o)) {
              console.log('none1 ');
              this.isTouched = false;
              this.setState({
                pressState: C,
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
                  pressState: C,
                });
                return void this.updateMotionParam(0, 0);
              }

              var l = this.state.pressState,
                c = C,
                h = 0,
                p = 0,
                f = s ** n;

              if (f >= Math.PI / 4 && f < (3 * Math.PI) / 4) {
                c = 1;
                h = 0.2;
                p = 0;
              } else if (f >= (3 * Math.PI) / 4 || f < (3 * -Math.PI) / 4) {
                c = 3;
                h = 0;
                p = x;
              } else if (f >= (3 * -Math.PI) / 4 && f < -Math.PI / 4) {
                c = 2;
                h = -0.2;
                p = 0;
              } else {
                c = 4;
                h = 0;
                p = -x;
              }

              if (l != c) {
                this.updateMotionParam(h, p);
                this.setState({
                  pressState: c,
                });
                module387.LogEventCommon('tap_remote_control_panel', {
                  direction: c,
                  isPortrait: this.props.isPortrait,
                });
              }
            }
          } else globals.showToast(module510.voice_chat_title2);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = this.props,
            u = s.style,
            l = s.width,
            c = s.isPortrait,
            h = c ? {} : module391.default.textShadow(),
            p = c
              ? {
                  bottom: 0,
                }
              : {
                  top: -15,
                };
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: [L.RemoteControlView, u],
                ref: function (o) {
                  return (t._panView = o);
                },
              },
              this._panResponder.panHandlers,
              {
                onLayout: this._onLayout.bind(this),
                collapsable: false,
              },
              module391.default.getAccessibilityLabel('remote_control_view')
            ),
            React.default.createElement(
              module13.ImageBackground,
              {
                style: [
                  L.RemoteControlViewImageBackground,
                  l && {
                    width: l,
                  },
                  {
                    opacity: this.state.isRemoteLaunching ? 0.5 : 1,
                  },
                ].filter(Boolean),
                source: this._getActiveImage(c),
              },
              this.state.isRemoteLaunching &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      L.loadingTip,
                      b(
                        b({}, p),
                        {},
                        {
                          color: c ? n.monitor.tabTitleSelColor : 'white',
                        },
                        h
                      ),
                    ],
                  },
                  module510.localization_strings_Setting_RemoteControlPage_61
                )
            )
          );
        },
      },
    ]);
    return module2187;
  })(React.default.Component);

exports.default = module2191;
module2191.contextType = module1199.AppConfigContext;
module13.Dimensions.get('screen');
var L = module13.StyleSheet.create({
  loadingTip: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 99,
    elevation: 99,
    fontSize: 10,
  },
  RemoteControlView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  RemoteControlViewImageBackground: {
    alignItems: 'center',
    width: module13.Dimensions.get('window').width,
    aspectRatio: 1,
  },
});
