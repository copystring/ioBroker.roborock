var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

function b() {
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

var v = (function (t) {
  module7.default(C, t);

  var module506 = C,
    v = b(),
    x = function () {
      var t,
        n = module11.default(module506);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var n;
    module4.default(this, C);
    (n = x.call(this, t)).state = {
      width: new module12.Animated.Value(30),
      animating: false,
    };
    return n;
  }

  module5.default(C, [
    {
      key: '_startAnimation',
      value: function () {
        var t = this;
        module12.Animated.sequence([
          module12.Animated.timing(this.state.width, {
            toValue: 37.5,
            duration: 170,
          }),
          module12.Animated.timing(this.state.width, {
            toValue: 30,
            duration: 100,
          }),
          module12.Animated.timing(this.state.width, {
            toValue: 33,
            duration: 100,
          }),
          module12.Animated.timing(this.state.width, {
            toValue: 30,
            duration: 100,
          }),
          module12.Animated.delay(500),
        ]).start(function () {
          if (t.props.animating) t._startAnimation();
        });
      },
    },
    {
      key: '_stopAnimation',
      value: function () {
        this.state.width.stopAnimation();
        console.log('stop animation');
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        var n = t.animating;

        if (n !== this.state.animating) {
          this.setState({
            animating: n,
          });

          if (n) {
            console.log('start animation');

            this._startAnimation();
          } else {
            console.log('stop animation');

            this._stopAnimation();
          }
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.context.theme,
          o = this.props,
          l = o.image,
          s = o.text,
          u = o.onPress,
          c = o.disabled,
          y = o.ignorePress;
        o.imageStyle;
        console.log('props:', this.props);
        return React.default.createElement(
          module12.View,
          {
            style: A.bottomButtonContainer,
          },
          React.default.createElement(
            module12.TouchableOpacity,
            module21.default({}, module387.default.getAccessibilityLabel(this.props.accessibilityKey), {
              style: [A.bottomButtonTouchableOpacity],
              onPress: u,
              disabled: c || y,
            }),
            React.default.createElement(module12.Image, {
              style: [A.bottomButtonImage],
              source: l,
            }),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  A.bottomButtonText,
                  c
                    ? {
                        color: t.remoteControl.diableTextColor,
                      }
                    : {
                        color: t.remoteControl.enableTextColor,
                      },
                ],
              },
              s
            )
          )
        );
      },
    },
  ]);
  return C;
})(React.default.Component);

exports.default = v;
v.contextType = module506.AppConfigContext;
module12.Dimensions.get('screen');
var A = module12.StyleSheet.create({
  bottomButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonTouchableOpacity: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bottomButtonImage: {
    width: 56,
    height: 56,
    alignSelf: 'center',
    top: 0,
    resizeMode: 'stretch',
  },
  bottomButtonText: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
});
