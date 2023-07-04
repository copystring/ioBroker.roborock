var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module506 = require('./506'),
  module383 = require('./383');

function y() {
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
  M = 0,
  w = (function (t) {
    module7.default(C, t);

    var module506 = C,
      w = y(),
      R = function () {
        var t,
          n = module11.default(module506);

        if (w) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      n = R.call(this, t);
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
          module383.LogEventCommon('tap_remote_control_panel', {
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

    module5.default(C, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.stop();
        },
      },
      {
        key: '_getActiveImage',
        value: function (t, n, o, s, u) {
          var l = t;

          switch (this.state.pressState) {
            case 1:
              l = n;
              break;

            case 2:
              l = u;
              break;

            case 3:
              l = o;
              break;

            case 2:
            case 4:
              l = s;
              break;

            case M:
            default:
              l = t;
          }

          return l;
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
                    module1247.setTimeout(function () {
                      return t();
                    }, 100);
                  }
                })
              );
            };

          module1247.setTimeout(function () {
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

          if (p >= Math.PI / 4 && p < (3 * Math.PI) / 4) {
            this.setState({
              pressState: 1,
            });
            this.updateMotionParam(0.2, 0);
          } else if (p >= (3 * Math.PI) / 4 || p < (3 * -Math.PI) / 4) {
            this.setState({
              pressState: 3,
            });
            this.updateMotionParam(0, o);
          } else if (p >= (3 * -Math.PI) / 4 && p < -Math.PI / 4) {
            this.setState({
              pressState: 2,
            });
            this.updateMotionParam(-0.2, 0);
          } else {
            this.setState({
              pressState: 4,
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
            n = this.context.theme.remoteControl.imageDefaultNew,
            s = this.context.theme.remoteControl.imageForwardNew,
            u = this.context.theme.remoteControl.imageLeftNew,
            l = this.context.theme.remoteControl.imageRightNew,
            c = this.context.theme.remoteControl.imageDownNew;
          return React.default.createElement(
            module12.View,
            module21.default(
              {
                style: _.remoteControlKeyView,
                ref: function (n) {
                  return (t._panView = n);
                },
              },
              this._panResponder.panHandlers,
              {
                onLayout: this._onLayout.bind(this),
                collapsable: false,
              },
              Utils.getAccessibilityLabel('remote_control_key_wrapper_new')
            ),
            React.default.createElement(module12.ImageBackground, {
              style: _.remoteControlKeyViewImageBackground,
              source: this._getActiveImage(n, s, u, l, c),
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

exports.default = w;
w.contextType = module506.AppConfigContext;
module12.Dimensions.get('screen');

var _ = module12.StyleSheet.create({
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
    width: module12.Dimensions.get('window').width,
    aspectRatio: 1,
    borderWidth: 0,
    borderColor: 'transparent',
  },
});
