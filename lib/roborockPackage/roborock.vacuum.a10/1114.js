exports.default = function (t, B) {
  var S = module12.StyleSheet.create({
    container: {
      position: 'absolute',
      width: module12.Dimensions.get('window').width,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    wrap: {
      width: module12.Dimensions.get('window').width,
      paddingBottom: module934.AppBarMarginBottom,
      backgroundColor: 'white',
    },
  });
  return (function (P) {
    module7.default(A, P);

    var O = A,
      E = k(),
      R = function () {
        var t,
          n = module11.default(O);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function A(t) {
      var n;
      module4.default(this, A);
      (n = R.call(this, t)).animatedMarginBottom = new module12.Animated.Value(-200);
      n.state = {
        shouldShow: false,
      };
      return n;
    }

    module5.default(A, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var o = this,
            u = module21.default({}, this.props),
            l = this.animatedMarginBottom.interpolate({
              inputRange: [-200, 0],
              outputRange: [0, 1],
            }),
            s = module934.AppBorderRadius,
            c = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                accessible: false,
                onPress: function () {
                  if (o.props.onPressCloseButton) o.props.onPressCloseButton();
                  o.hide();
                },
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    S.container,
                    {
                      borderRadius: s,
                      opacity: l,
                      height: B ? module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight() : module390.default.sharedCache().ScreenHeight,
                    },
                    this.props.style,
                  ],
                },
                React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: function () {
                      if (o.props.onPressCloseButton) o.props.onPressCloseButton();
                      o.hide();
                    },
                  },
                  React.default.createElement(module12.View, {
                    style: {
                      flex: 1,
                      backgroundColor: 'transparent',
                      alignSelf: 'stretch',
                    },
                    accessibilityLabel: module491.accessibility_back,
                  })
                ),
                React.default.createElement(
                  module12.TouchableOpacity,
                  {
                    activeOpacity: 1,
                    accessible: false,
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: [
                        S.wrap,
                        {
                          paddingBottom: undefined != this.props.paddingBottom ? this.props.paddingBottom : module934.AppBarMarginBottom,
                          marginBottom: this.animatedMarginBottom,
                          backgroundColor: this.props.contentBackgroundColor ? this.props.contentBackgroundColor : 'transparent',
                        },
                      ],
                    },
                    React.default.createElement(
                      t,
                      module21.default({}, u, {
                        parent: this,
                      })
                    )
                  )
                ),
                React.default.createElement(module1062.default, {
                  ref: function (t) {
                    return (o.toast = t);
                  },
                }),
                React.default.createElement(module1060.default, {
                  ref: function (t) {
                    o.alertView = t;
                  },
                  isModal: true,
                })
              )
            ),
            k = React.default.createElement(
              module935.default,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: function () {
                  o.hide();
                },
              },
              c
            );
          return this.state.shouldShow ? (B ? k : c) : null;
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
        key: 'hide',
        value: function (t) {
          var n = this;
          if (0 != this.state.shouldShow)
            module12.Animated.timing(this.animatedMarginBottom, {
              toValue: -200,
              duration: 50,
            }).start(function () {
              n.setState({
                shouldShow: false,
              });
              if (t) t();
            });
          else if (t) t();
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
              module12.Animated.timing(t.animatedMarginBottom, {
                toValue: 0,
                duration: 250,
              }).start();
            }
          );
        },
      },
      {
        key: 'alert',
        value: function (t, n, o) {
          var u;
          if (!(null == (u = this.alertView))) u.alert(t, n, o);
        },
      },
    ]);
    return A;
  })(React.Component);
};

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = B(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, s, c);
        else u[s] = t[s];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module390 = require('./390'),
  module1062 = require('./1062'),
  module935 = require('./935'),
  module1060 = require('./1060');

function B(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (B = function (t) {
    return t ? o : n;
  })(t);
}

function k() {
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

var module934 = require('./934'),
  module491 = require('./491').strings;
