exports.default = function (t, n, k, x) {
  var w,
    E,
    R = module13.StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 99,
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

  E = w = (function (y) {
    module9.default(T, y);

    var x = T,
      w = _(),
      E = function () {
        var t,
          n = module12.default(x);

        if (w) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function T(t) {
      var n;
      module6.default(this, T);
      (n = E.call(this, t)).state = {
        visible: false,
      };
      n.animatedOpacity = new module13.Animated.Value(0);
      return n;
    }

    module7.default(T, [
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
          var c = this,
            u = this.context.theme.alert,
            s = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            f = this.props,
            h = f.onConfirm,
            y = f.onCancel,
            _ = f.confirmTitle,
            x = f.confirmTextColor,
            w = f.cancelTitle,
            E = f.shouldShowCancel,
            T = module56.default(f, ['onConfirm', 'onCancel', 'confirmTitle', 'confirmTextColor', 'cancelTitle', 'shouldShowCancel']),
            P = React.default.createElement(
              module13.View,
              {
                style: R.buttonsWrap,
              },
              E &&
                React.default.createElement(module386.PureButton, {
                  style: [
                    R.button,
                    {
                      borderTopColor: u.lineColor,
                      borderRightColor: u.lineColor,
                      backgroundColor: u.backgroundColor,
                    },
                  ],
                  title: w || module510.localization_strings_Main_MainPage_11,
                  textColor: u.textColor,
                  fontSize: 16,
                  funcId: 'hoc_alert_cancel',
                  onPress: function () {
                    if (y) y();
                    c.hide();
                  },
                }),
              React.default.createElement(module386.PureButton, {
                style: [
                  R.button,
                  {
                    borderTopColor: u.lineColor,
                    borderRightColor: u.lineColor,
                    backgroundColor: u.backgroundColor,
                  },
                ],
                title: _ || module510.localization_strings_Main_Error_ErrorDetailPage_3,
                textColor: x || u.textColor,
                funcId: 'hoc_alert_ok',
                fontSize: 16,
                onPress: function () {
                  if (h) h();
                  c.hide();
                },
              })
            ),
            O = React.default.createElement(
              module13.TouchableWithoutFeedback,
              {
                onPress: k ? this.hide.bind(this) : null,
                accessible: false,
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: [
                    R.container,
                    {
                      opacity: this.animatedOpacity,
                      height: module394.default.sharedCache().ScreenHeight,
                    },
                  ],
                },
                React.default.createElement(
                  module13.TouchableOpacity,
                  {
                    activeOpacity: 1,
                    accessible: false,
                  },
                  React.default.createElement(
                    module13.Animated.View,
                    {
                      style: {
                        backgroundColor: u.backgroundColor,
                        overflow: 'hidden',
                        borderRadius: 4,
                        transform: [
                          {
                            scaleX: s,
                          },
                          {
                            scaleY: s,
                          },
                        ],
                      },
                    },
                    React.default.createElement(
                      t,
                      module22.default({}, T, {
                        parent: this,
                      })
                    ),
                    !k && P
                  )
                )
              )
            ),
            A = React.default.createElement(
              module13.Modal,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  c.hide();
                },
              },
              O
            );
          return this.state.visible ? (n ? A : O) : null;
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.visible)
            module13.Animated.timing(this.animatedOpacity, {
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
              module13.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start();
            }
          );
        },
      },
    ]);
    return T;
  })(React.Component);

  w.contextType = module1193.AppConfigContext;
  w.defaultProps = {
    shouldShowCancel: true,
  };
  return E;
};

var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module386 = require('./386'),
  module1193 = require('./1193'),
  module394 = require('./394');

function _() {
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

var module510 = require('./510').strings;
