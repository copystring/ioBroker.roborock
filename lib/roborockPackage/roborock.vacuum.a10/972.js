var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module970 = require('./970'),
  module973 = require('./973');

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
        module49.default(t, o, c[o]);
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

function P(t) {
  return 'ios' === module12.Platform.OS
    ? {
        accessibilityElementsHidden: !t,
      }
    : 'android' === module12.Platform.OS
    ? {
        importantForAccessibility: t ? 'yes' : 'no-hide-descendants',
      }
    : null;
}

var w = (function (t) {
    module7.default(b, t);

    var module49 = b,
      module12 = j(),
      O = function () {
        var t,
          o = module11.default(module49);

        if (module12) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, c);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function b() {
      module4.default(this, b);
      return O.apply(this, arguments);
    }

    module5.default(b, [
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
            module970.Screen,
            module21.default(
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
  R = module12.StyleSheet.create({
    main: v(
      v({}, module12.StyleSheet.absoluteFillObject),
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
  E = module973.default(w);

exports.default = E;
