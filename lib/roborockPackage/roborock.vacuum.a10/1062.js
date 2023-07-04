var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module387 = require('./387'),
  module1063 = require('./1063'),
  module506 = require('./506'),
  module1064 = require('./1064');

function x(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      x(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      x(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function O() {
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

var module12 = require('./12'),
  V = module12.StyleSheet,
  P = module12.Text,
  S = module12.View,
  k = module12.Animated,
  B = module12.Dimensions,
  module389 = require('./389'),
  A = B.get('window'),
  D = A.height,
  R = A.width,
  E = {
    animation: {
      opacity: {
        start: 0,
        stop: 1,
        middle: 0.3,
      },
      margin: {
        start: 270,
        stop: 50,
      },
      duration: {
        move: 400,
        stay: 1e3,
        disappear: 400,
      },
    },
  },
  _ = (function (t) {
    module7.default(b, t);

    var module49 = b,
      module1063 = O(),
      v = function () {
        var t,
          o = module11.default(module49);

        if (module1063) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var n;
      module4.default(this, b);
      (n = v.call(this, t)).count = 0;
      n.state = {
        margin: new k.Value(n.props.toastMarginBottom || E.animation.margin.start),
        opacity: new k.Value(E.animation.opacity.start),
        text: '',
      };
      return n;
    }

    module5.default(b, [
      {
        key: 'componentDidUpdate',
        value: function (t, n) {
          if (this.state.text) this.runAnimation();
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return n.text != this.state.text;
        },
      },
      {
        key: 'toast',
        value: function (t) {
          this.setState({
            text: t,
          });
        },
      },
      {
        key: 'runAnimation',
        value: function () {
          var t = this;
          ++this.count;
          this.state.opacity.setValue(0.5);
          k.sequence([
            k.parallel([
              k.timing(this.state.opacity, {
                toValue: E.animation.opacity.stop,
                duration: E.animation.duration.move,
              }),
              k.timing(this.state.margin, {
                toValue: (this.props.toastMarginBottom || 270) + 10,
                duration: E.animation.duration.move,
              }),
            ]),
            k.delay(module389.isAutoTestSupported() ? 5e3 : 2e3),
            k.timing(this.state.opacity, {
              toValue: E.animation.opacity.start,
              duration: E.animation.duration.disappear,
            }),
          ]).start(function () {
            return (
              !--t.count &&
              (t.setState({
                text: '',
              }),
              t.state.margin.setValue(t.props.toastMarginBottom || E.animation.margin.start),
              t.state.opacity.setValue(E.animation.opacity.start) || true)
            );
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            S,
            module21.default(
              {
                style: [
                  M.container,
                  {
                    width: B.get('screen').width,
                    height: B.get('screen').height,
                    overflow: this.state.text ? 'visible' : 'hidden',
                  },
                ],
                pointerEvents: 'none',
              },
              module387.default.getAccessibilityLabel(this.state.text ? 'global_msg_toast' : null)
            ),
            React.default.createElement(
              k.View,
              {
                style: [
                  M.animate,
                  {
                    backgroundColor: t.toastBackground,
                    marginBottom: this.state.margin,
                    opacity: this.state.opacity,
                  },
                ],
              },
              React.default.createElement(
                P,
                {
                  style: [
                    M.text,
                    {
                      color: t.toastTextColor,
                    },
                  ],
                },
                this.state.text
              )
            )
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

_.contextType = module506.AppConfigContext;
w(
  w({}, module1063.BaseShadow),
  {},
  {
    radius: 10,
  }
);
var M = V.create({
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: R,
      height: D,
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      flexDirection: 'row',
      zIndex: 999999,
    },
    animate: {
      maxWidth: 230,
      backgroundColor: '#000000',
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 12,
      lineHeight: 18,
      color: '#ffffff',
    },
  }),
  T = module1064.default(_);
exports.default = T;
