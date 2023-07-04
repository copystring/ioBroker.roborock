var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1248 = require('./1248'),
  module1251 = require('./1251');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      b(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

function j() {
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

function P(t) {
  return 'ios' === module13.Platform.OS
    ? {
        accessibilityElementsHidden: !t,
      }
    : 'android' === module13.Platform.OS
    ? {
        importantForAccessibility: t ? 'yes' : 'no-hide-descendants',
      }
    : null;
}

var w = (function (t) {
    module9.default(b, t);

    var module50 = b,
      module13 = j(),
      O = function () {
        var t,
          o = module12.default(module50);

        if (module13) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, c);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function b() {
      module6.default(this, b);
      return O.apply(this, arguments);
    }

    module7.default(b, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.children,
            c = t.pointerEvents,
            u = t.style,
            l = t.position,
            f = t.scene,
            s = f.index,
            y = f.isActive,
            O = y
              ? 1
              : l.interpolate({
                  inputRange: [s, s + 1 - 1e-5, s + 1],
                  outputRange: [1, 1, 0],
                  extrapolate: 'clamp',
                });
          return React.default.createElement(
            module1248.Screen,
            module22.default(
              {
                pointerEvents: c,
                onComponentRef: this.props.onComponentRef,
                style: [R.main, u],
                active: O,
              },
              P(y)
            ),
            n
          );
        },
      },
    ]);
    return b;
  })(React.default.Component),
  R = module13.StyleSheet.create({
    main: v(
      v({}, module13.StyleSheet.absoluteFillObject),
      {},
      {
        backgroundColor: '#E9E9EF',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }
    ),
  }),
  S = module1251.default(w);

exports.default = S;
