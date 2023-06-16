exports.default = function (t, n) {
  var E = module13.StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },
    accessibility: {
      flex: 1,
      backgroundColor: 'transparent',
      alignSelf: 'stretch',
    },
    wrap: {
      paddingBottom: module1337.AppBarMarginBottom,
      backgroundColor: 'white',
      alignSelf: 'stretch',
      overflow: 'hidden',
    },
  });
  return (function (V) {
    module9.default(A, V);

    var _ = A,
      P = C(),
      R = function () {
        var t,
          n = module12.default(_);

        if (P) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function A(t) {
      var o;
      module6.default(this, A);

      (o = R.call(this, t))._onPressClose = function () {
        if (!(null == o.props.onPressCloseButton)) o.props.onPressCloseButton();
        o.hide();
      };

      o.animatedMarginBottom = new module13.Animated.Value(-200);
      o.state = {
        shouldShow: false,
      };
      o.isModal = undefined !== o.props.isModal ? o.props.isModal : n;
      return o;
    }

    module7.default(A, [
      {
        key: 'render',
        value: function () {
          var n = this,
            l = this.props,
            u = l.outterWrapStyle,
            c = module56.default(l, ['outterWrapStyle']),
            h = this.animatedMarginBottom.interpolate({
              inputRange: [-200, 0],
              outputRange: [0, 1],
            }),
            f = module1337.AppBorderRadius,
            C = {
              borderRadius: f,
              opacity: h,
              width: module13.Dimensions.get('window').width,
              height: this.isModal ? module394.MC.ScreenHeight - module391.default.statusbarHeight() : module394.MC.ScreenHeight,
            },
            V = React.default.createElement(
              module13.TouchableWithoutFeedback,
              {
                accessible: false,
                onPress: this._onPressClose,
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: [E.container, C, this.props.style],
                },
                React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: this._onPressClose,
                  },
                  React.default.createElement(module13.View, {
                    style: E.accessibility,
                    accessibilityLabel: module510.accessibility_back,
                  })
                ),
                React.default.createElement(
                  module13.TouchableOpacity,
                  {
                    activeOpacity: 1,
                    accessible: false,
                  },
                  React.default.createElement(
                    module13.Animated.View,
                    {
                      style: [
                        E.wrap,
                        {
                          paddingBottom: undefined != this.props.paddingBottom ? this.props.paddingBottom : module1337.AppBarMarginBottom,
                          marginBottom: this.animatedMarginBottom,
                          backgroundColor: this.props.contentBackgroundColor ? this.props.contentBackgroundColor : 'transparent',
                        },
                        u,
                      ],
                    },
                    React.default.createElement(
                      t,
                      module22.default(
                        {
                          ref: function (t) {
                            return (n.contentView = t);
                          },
                        },
                        c,
                        {
                          parent: this,
                        }
                      )
                    )
                  )
                ),
                React.default.createElement(module1495.default, {
                  ref: function (t) {
                    return (n.toast = t);
                  },
                }),
                React.default.createElement(module1493.default, {
                  ref: function (t) {
                    n.alertView = t;
                  },
                  isModal: true,
                })
              )
            ),
            _ = React.default.createElement(
              module1210.default,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: this._onPressClose,
              },
              V
            );

          return this.state.shouldShow ? (this.isModal ? _ : V) : null;
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          var n;
          if (!(null == (n = this.toast))) n.contentView.toast(t);
        },
      },
      {
        key: 'alert',
        value: function (t, n, o) {
          var s;
          if (!(null == (s = this.alertView))) s.alert(t, n, o);
        },
      },
      {
        key: 'hide',
        value: function (t) {
          var n = this;

          if (0 != this.state.shouldShow) {
            if (!this.isModal) this.removeBackListeners();
            module13.Animated.timing(this.animatedMarginBottom, {
              toValue: -200,
              duration: 50,
            }).start(function () {
              n.setState({
                shouldShow: false,
              });
              if (t) t();
            });
          } else if (t) t();
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          this.setState(
            {
              shouldShow: true,
            },
            function () {
              module13.Animated.timing(t.animatedMarginBottom, {
                toValue: 0,
                duration: 250,
              }).start();
            }
          );
          if (!this.isModal) this.addBackListener();
        },
      },
      {
        key: 'removeBackListeners',
        value: function () {
          var t;
          if (!(null == (t = this.backListener))) t.remove();
        },
      },
      {
        key: 'addBackListener',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.hide();
            return true;
          });
        },
      },
    ]);
    return A;
  })(React.Component);
};

var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1495 = require('./1495'),
  module1210 = require('./1210'),
  module1493 = require('./1493');

function C() {
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

var module1337 = require('./1337'),
  module510 = require('./510').strings;
