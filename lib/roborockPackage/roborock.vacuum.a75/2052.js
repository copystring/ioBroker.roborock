var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1199 = require('./1199'),
  module387 = require('./387');

function y() {
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

var module1420 = require('./1420'),
  M = 0,
  _ = (function (t) {
    module9.default(C, t);

    var module1199 = C,
      _ = y(),
      w = function () {
        var t,
          n = module12.default(module1199);

        if (_) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t) {
      var n;
      module6.default(this, C);
      n = w.call(this, t);
      var o = t.screenProps,
        u = o.updateMotionParam,
        l = o.startMotion,
        c = o.stopMotion,
        p = o.startSendMove,
        f = o.stopSendMove;
      n.updateMotionParam = u;
      n.startMotion = l;
      n.stopMotion = c;
      n.startSendMove = p;
      n.stopSendMove = f;
      n.state = {
        center: {
          x: 0,
          y: 0,
        },
        innerRadius: 0,
        outerRadius: 0,
        pressState: M,
      };
      n._panView = null;
      n._panViewLayout = null;
      n._panResponder = module13.PanResponder.create({
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
          n.startSendMove();
          console.log('onPanResponderGrant', t.nativeEvent);
          console.log(o);

          n._updatePressState(t.nativeEvent.pageX, t.nativeEvent.pageY);
        },
        onPanResponderMove: function (t, o) {
          n.startSendMove();
          console.log('onPanResponderMove', t.nativeEvent);
          console.log(o);

          n._updatePressState(t.nativeEvent.pageX, t.nativeEvent.pageY);
        },
        onPanResponderTerminationRequest: function (t, n) {
          return true;
        },
        onPanResponderRelease: function (t, o) {
          module387.LogEventCommon('tap_remote_control_panel', {
            direction: n.state.pressState,
          });
          n.stopSendMove();

          n._updatePressState(null, null);
        },
        onPanResponderTerminate: function (t, o) {
          n.stopSendMove();

          n._updatePressState(null, null);
        },
        onShouldBlockNativeResponder: function (t, n) {
          return true;
        },
      });
      return n;
    }

    module7.default(C, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.stop();
        },
      },
      {
        key: '_getActiveImage',
        value: function (t, n, o, s) {
          var u = t;

          switch (this.state.pressState) {
            case 1:
              u = n;
              break;

            case 2:
              u = o;
              break;

            case 3:
              u = s;
              break;

            case M:
            default:
              u = t;
          }

          return u;
        },
      },
      {
        key: '_onLayout',
        value: function (t) {
          var n = this,
            o = function t() {
              return (
                n._panView &&
                n._panView.measure(function (o, s, u, l, c, p) {
                  if ((console.log('RemoteControlKeyView::measure:', o, s, u, l, c, p), n._panViewLayout && n._panViewLayout.pageX === c && n._panViewLayout.pageY === p))
                    console.log('measure: final layout gotten:', n._panViewLayout);
                  else {
                    n._panViewLayout = {
                      x: o,
                      y: s,
                      width: u,
                      height: l,
                      pageX: c,
                      pageY: p,
                    };
                    var f = {
                        x: c + u / 2,
                        y: p + l / 2,
                      },
                      h = u / 375,
                      v = 30 * h,
                      S = 146 * h;
                    n.setState({
                      center: f,
                      innerRadius: v,
                      outerRadius: S,
                    });
                    module1420.setTimeout(function () {
                      return t();
                    }, 100);
                  }
                })
              );
            };

          module1420.setTimeout(function () {
            return o();
          });
        },
      },
      {
        key: '_updatePressState',
        value: function (t, n) {
          var o = Math.round((Math.PI / 3) * 100) / 100;

          if (null === t || null === n) {
            this.setState({
              pressState: M,
            });
            return void this.updateMotionParam(0, 0);
          }

          var s = t - this.state.center.x,
            u = this.state.center.y - n,
            l = Math.sqrt(s * s + u * u);

          if (l < this.state.innerRadius || l > this.state.outerRadius) {
            this.setState({
              pressState: M,
            });
            return void this.updateMotionParam(0, 0);
          }

          var c = this.state.pressState,
            p = u ** s;

          if (p >= Math.PI / 6 && p < (5 * Math.PI) / 6) {
            this.setState({
              pressState: 1,
            });
            this.updateMotionParam(0.2, 0);
          } else if (p >= (5 * Math.PI) / 6 || p < -Math.PI / 2) {
            this.setState({
              pressState: 2,
            });
            this.updateMotionParam(0, o);
          } else {
            this.setState({
              pressState: 3,
            });
            this.updateMotionParam(0, -o);
          }

          if (c == M) this.startMotion();
        },
      },
      {
        key: '_toPercentStr',
        value: function (t, n) {
          var o = (100 * t).toFixed(n || 0) + '%';
          console.log(o);
          return o;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.remoteControl.imageDefault,
            s = this.context.theme.remoteControl.imageForward,
            u = this.context.theme.remoteControl.imageLeft,
            l = this.context.theme.remoteControl.imageRight;
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: R.remoteControlKeyView,
                ref: function (n) {
                  return (t._panView = n);
                },
              },
              this._panResponder.panHandlers,
              {
                onLayout: this._onLayout.bind(this),
                collapsable: false,
              },
              Utils.getAccessibilityLabel('remote_control_key_wrapper')
            ),
            React.default.createElement(module13.ImageBackground, {
              style: [
                R.remoteControlKeyViewImageBackground,
                {
                  width: module13.Dimensions.get('window').width - 20,
                },
              ],
              source: this._getActiveImage(n, s, u, l),
            })
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
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.default.Component);

exports.default = _;
_.contextType = module1199.AppConfigContext;
var R = module13.StyleSheet.create({
  remoteControlKeyView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  remoteControlKeyViewImageBackground: {
    aspectRatio: 1,
    borderWidth: 0,
    borderColor: 'transparent',
  },
});
