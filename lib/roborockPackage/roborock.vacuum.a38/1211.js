exports.default = function (t, n) {
  var E = module12.StyleSheet.create({
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
      paddingBottom: module1153.AppBarMarginBottom,
      backgroundColor: 'white',
      alignSelf: 'stretch',
    },
  });
  return (function (S) {
    module7.default(R, S);

    var V = R,
      _ = w(),
      P = function () {
        var t,
          n = module11.default(V);

        if (_) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);

      (o = P.call(this, t))._onPressClose = function () {
        if (!(null == o.props.onPressCloseButton)) o.props.onPressCloseButton();
        o.hide();
      };

      o.animatedMarginBottom = new module12.Animated.Value(-200);
      o.state = {
        shouldShow: false,
      };
      o.isModal = undefined !== o.props.isModal ? o.props.isModal : n;
      return o;
    }

    module5.default(R, [
      {
        key: 'render',
        value: function () {
          var n = this,
            s = module22.default({}, this.props),
            l = this.animatedMarginBottom.interpolate({
              inputRange: [-200, 0],
              outputRange: [0, 1],
            }),
            u = module1153.AppBorderRadius,
            c = {
              borderRadius: u,
              opacity: l,
              width: module12.Dimensions.get('window').width,
              height: this.isModal ? module394.MC.ScreenHeight - module391.default.statusbarHeight() : module394.MC.ScreenHeight,
            },
            h = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                accessible: false,
                onPress: this._onPressClose,
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [E.container, c, this.props.style],
                },
                React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: this._onPressClose,
                  },
                  React.default.createElement(module12.View, {
                    style: E.accessibility,
                    accessibilityLabel: module500.accessibility_back,
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
                        E.wrap,
                        {
                          paddingBottom: undefined != this.props.paddingBottom ? this.props.paddingBottom : module1153.AppBarMarginBottom,
                          marginBottom: this.animatedMarginBottom,
                          backgroundColor: this.props.contentBackgroundColor ? this.props.contentBackgroundColor : 'transparent',
                        },
                      ],
                    },
                    React.default.createElement(
                      t,
                      module22.default({}, s, {
                        parent: this,
                      })
                    )
                  )
                ),
                React.default.createElement(module1158.default, {
                  ref: function (t) {
                    return (n.toast = t);
                  },
                }),
                React.default.createElement(module1156.default, {
                  ref: function (t) {
                    n.alertView = t;
                  },
                  isModal: true,
                })
              )
            ),
            w = React.default.createElement(
              module1033.default,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: this._onPressClose,
              },
              h
            );
          return this.state.shouldShow ? (this.isModal ? w : h) : null;
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
            module12.Animated.timing(this.animatedMarginBottom, {
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
              module12.Animated.timing(t.animatedMarginBottom, {
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
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.hide();
            return true;
          });
        },
      },
    ]);
    return R;
  })(React.Component);
};

var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1158 = require('./1158'),
  module1033 = require('./1033'),
  module1156 = require('./1156');

function w() {
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

var module1153 = require('./1153'),
  module500 = require('./500').strings;
