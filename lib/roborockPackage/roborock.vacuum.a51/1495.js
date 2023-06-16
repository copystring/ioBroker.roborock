var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module391 = require('./391'),
  module1428 = require('./1428'),
  module1193 = require('./1193'),
  module1496 = require('./1496');

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
        module50.default(t, o, s[o]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module13 = require('./13'),
  S = module13.StyleSheet,
  V = module13.Text,
  P = module13.View,
  k = module13.Animated,
  D = module13.Dimensions,
  module393 = require('./393'),
  A = D.get('window'),
  R = A.height,
  B = A.width,
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
    module9.default(b, t);

    var module50 = b,
      module1428 = O(),
      v = function () {
        var t,
          o = module12.default(module50);

        if (module1428) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var n;
      module6.default(this, b);
      (n = v.call(this, t)).count = 0;
      n.state = {
        margin: new k.Value(n.props.toastMarginBottom || E.animation.margin.start),
        opacity: new k.Value(E.animation.opacity.start),
        text: '',
      };
      return n;
    }

    module7.default(b, [
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
            k.delay(module393.isAutoTestSupported() ? 5e3 : 2e3),
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
            P,
            module22.default(
              {
                style: [
                  M.container,
                  {
                    width: D.get('screen').width,
                    height: D.get('screen').height,
                    overflow: this.state.text ? 'visible' : 'hidden',
                  },
                ],
                pointerEvents: 'none',
              },
              module391.default.getAccessibilityLabel(this.state.text ? 'global_msg_toast' : null)
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
                V,
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

_.contextType = module1193.AppConfigContext;
w(
  w({}, module1428.BaseShadow),
  {},
  {
    radius: 10,
  }
);
var M = S.create({
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: B,
      height: R,
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
  T = module1496.default(_);
exports.default = T;
