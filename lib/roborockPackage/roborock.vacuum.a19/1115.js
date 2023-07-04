exports.default = function (t, w, O, P) {
  var S,
    x,
    E = module12.StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99,
        width: module12.Dimensions.get('window').width,
        height: module12.Dimensions.get('window').height,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      buttonsWrap: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
      },
      button: {
        flex: 1,
        borderTopWidth: 1,
        alignSelf: 'stretch',
        borderRightWidth: 1,
      },
    });

  x = S = (function (y) {
    module7.default(R, y);

    var P = R,
      S = _(),
      x = function () {
        var t,
          n = module11.default(P);

        if (S) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = x.call(this, t)).state = {
        visible: false,
      };
      n.animatedOpacity = new module12.Animated.Value(0);
      return n;
    }

    module5.default(R, [
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
          var l = this,
            c = this.context.theme.alert,
            u = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            s = this.props,
            f = s.onConfirm,
            y = s.onCancel,
            _ = s.confirmTitle,
            P = s.confirmTextColor,
            S = s.cancelTitle,
            x = s.shouldShowCancel,
            R = module55.default(s, v),
            T = React.default.createElement(
              module12.View,
              {
                style: E.buttonsWrap,
              },
              x &&
                React.default.createElement(module382.PureButton, {
                  style: [
                    E.button,
                    {
                      borderTopColor: c.lineColor,
                      borderRightColor: c.lineColor,
                      backgroundColor: c.backgroundColor,
                    },
                  ],
                  title: S || module491.localization_strings_Main_MainPage_11,
                  textColor: c.textColor,
                  fontSize: 16,
                  funcId: 'hoc_alert_cancel',
                  onPress: function () {
                    if (y) y();
                    l.hide();
                  },
                }),
              React.default.createElement(module382.PureButton, {
                style: [
                  E.button,
                  {
                    borderTopColor: c.lineColor,
                    borderRightColor: c.lineColor,
                    backgroundColor: c.backgroundColor,
                  },
                ],
                title: _ || module491.localization_strings_Main_Error_ErrorDetailPage_3,
                textColor: P || c.textColor,
                funcId: 'hoc_alert_ok',
                fontSize: 16,
                onPress: function () {
                  if (f) f();
                  l.hide();
                },
              })
            ),
            M = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: O ? this.hide.bind(this) : null,
                accessible: false,
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    E.container,
                    {
                      opacity: this.animatedOpacity,
                      height: module390.default.sharedCache().ScreenHeight,
                    },
                  ],
                },
                React.default.createElement(
                  module12.TouchableOpacity,
                  {
                    activeOpacity: 1,
                    accessible: false,
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: {
                        backgroundColor: c.backgroundColor,
                        overflow: 'hidden',
                        borderRadius: 4,
                        transform: [
                          {
                            scaleX: u,
                          },
                          {
                            scaleY: u,
                          },
                        ],
                      },
                    },
                    React.default.createElement(
                      t,
                      module21.default({}, R, {
                        parent: this,
                      })
                    ),
                    !O && T
                  )
                )
              )
            ),
            j = React.default.createElement(
              module12.Modal,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  l.hide();
                },
              },
              M
            );
          return this.state.visible ? (w ? j : M) : null;
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.visible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              t.setState({
                visible: false,
              });
              if (t.props.onHideListener) t.props.onHideListener();
            });
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          if (this.props.onShowListener) this.props.onShowListener();
          this.setState(
            {
              visible: true,
            },
            function () {
              module12.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start();
            }
          );
        },
      },
    ]);
    return R;
  })(React.Component);

  S.contextType = module506.AppConfigContext;
  S.defaultProps = {
    shouldShowCancel: true,
  };
  return x;
};

require('./387');

var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module382 = require('./382'),
  module506 = require('./506'),
  module390 = require('./390'),
  v = ['onConfirm', 'onCancel', 'confirmTitle', 'confirmTextColor', 'cancelTitle', 'shouldShowCancel'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function _() {
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

var module491 = require('./491').strings;
