var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  module387 = require('./387'),
  module394 = require('./394'),
  module424 = require('./424');

function P() {
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

var module1421 = require('./1421'),
  _ = 0,
  R = (function (t) {
    module9.default(x, t);

    var module1200 = x,
      R = P(),
      V = function () {
        var t,
          n = module12.default(module1200);

        if (R) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var n;
      module6.default(this, x);
      n = V.call(this, t);
      var o = t.screenProps,
        u = o.updateMotionParam,
        l = o.startMotion,
        c = o.stopMotion,
        p = o.startSendMove,
        h = o.stopSendMove;
      n.updateMotionParam = u;
      n.startMotion = l;
      n.stopMotion = c;
      n.startSendMove = p;
      n.stopSendMove = h;
      n.state = {
        center: {
          x: 0,
          y: 0,
        },
        innerRadius: 0,
        outerRadius: 0,
        pressState: _,
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

    module7.default(x, [
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

            case _:
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
                    var h = {
                        x: c + u / 2,
                        y: p + l / 2,
                      },
                      f = u / 375,
                      v = 30 * f,
                      S = 146 * f;
                    n.setState({
                      center: h,
                      innerRadius: v,
                      outerRadius: S,
                    });
                    module1421.setTimeout(function () {
                      return t();
                    }, 100);
                  }
                })
              );
            };

          module1421.setTimeout(function () {
            return o();
          });
        },
      },
      {
        key: '_updatePressState',
        value: function (t, n) {
          var o = !module424.DMM.isV1 && module394.default.sharedCache().maxVelocity ? module394.default.sharedCache().maxVelocity : 0.2,
            s = Math.round((Math.PI / 3) * 100) / 100;

          if (null === t || null === n) {
            this.setState({
              pressState: _,
            });
            return void this.updateMotionParam(0, 0);
          }

          var u = t - this.state.center.x,
            l = this.state.center.y - n,
            c = Math.sqrt(u * u + l * l);

          if (c < this.state.innerRadius || c > this.state.outerRadius) {
            this.setState({
              pressState: _,
            });
            return void this.updateMotionParam(0, 0);
          }

          var p = this.state.pressState,
            h = l ** u;

          if (h >= Math.PI / 4 && h < (3 * Math.PI) / 4) {
            this.setState({
              pressState: 1,
            });
            this.updateMotionParam(o, 0);
          } else if (h >= (3 * Math.PI) / 4 || h < (3 * -Math.PI) / 4) {
            this.setState({
              pressState: 3,
            });
            this.updateMotionParam(0, s);
          } else if (h >= (3 * -Math.PI) / 4 && h < -Math.PI / 4) {
            this.setState({
              pressState: 2,
            });
            this.updateMotionParam(-o, 0);
          } else {
            this.setState({
              pressState: 4,
            });
            this.updateMotionParam(0, -s);
          }

          if (p == _) this.startMotion();
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
            module13.View,
            module22.default(
              {
                style: C.remoteControlKeyView,
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
            React.default.createElement(module13.ImageBackground, {
              style: [
                C.remoteControlKeyViewImageBackground,
                {
                  width: module13.Dimensions.get('window').width,
                },
              ],
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
    return x;
  })(React.default.Component);

exports.default = R;
R.contextType = module1200.AppConfigContext;
var C = module13.StyleSheet.create({
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
