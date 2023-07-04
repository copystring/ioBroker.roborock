var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module973 = require('./973'),
  S = ['active', 'onComponentRef'],
  y = ['style', 'children'];

function C(t) {
  var n = R();
  return function () {
    var o,
      u = module11.default(t);

    if (n) {
      var f = module11.default(this).constructor;
      o = Reflect.construct(u, arguments, f);
    } else o = u.apply(this, arguments);

    return module9.default(this, o);
  };
}

function R() {
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

var N,
  E,
  w,
  A = false,
  M = function (t) {
    return undefined !== module12.UIManager.getViewManagerConfig ? module12.UIManager.getViewManagerConfig(t) : module12.UIManager[t];
  };

var k = {
    get NativeScreen() {
      N = N || module12.requireNativeComponent('RNSScreen', null);
      return N;
    },

    get NativeScreenContainer() {
      E = E || module12.requireNativeComponent('RNSScreenContainer', null);
      return E;
    },
  },
  V = (function (t, ...args) {
    module7.default(s, t);
    var l = C(s);

    function s() {
      var t;
      module4.default(this, s);

      (t = l.call(this, ...args)).setRef = function (n) {
        t._ref = n;
        if (t.props.onComponentRef) t.props.onComponentRef(n);
      };

      return t;
    }

    module5.default(s, [
      {
        key: 'setNativeProps',
        value: function (t) {
          this._ref.setNativeProps(t);
        },
      },
      {
        key: 'render',
        value: function () {
          if (A) {
            if (((w = w || module12.Animated.createAnimatedComponent(k.NativeScreen)), module973.version.minor >= 57))
              return React.default.createElement(
                w,
                module21.default({}, this.props, {
                  ref: this.setRef,
                })
              );
            var t = this.props,
              u = t.style,
              f = t.children,
              c = module55.default(t, y);
            return React.default.createElement(
              w,
              module21.default({}, c, {
                ref: this.setRef,
                style: module12.StyleSheet.absoluteFill,
              }),
              React.default.createElement(
                module12.Animated.View,
                {
                  style: u,
                },
                f
              )
            );
          }

          var l = this.props,
            s = module55.default(l, S);
          return React.default.createElement(
            module12.Animated.View,
            module21.default({}, s, {
              ref: this.setRef,
            })
          );
        },
      },
    ]);
    return s;
  })(React.default.Component),
  P = (function (t) {
    module7.default(o, t);
    var n = C(o);

    function o() {
      module4.default(this, o);
      return n.apply(this, arguments);
    }

    module5.default(o, [
      {
        key: 'render',
        value: function () {
          return A ? React.default.createElement(k.NativeScreenContainer, this.props) : React.default.createElement(module12.View, this.props);
        },
      },
    ]);
    return o;
  })(React.default.Component);

module.exports = {
  ScreenContainer: P,
  Screen: V,

  get NativeScreen() {
    return k.NativeScreen;
  },

  get NativeScreenContainer() {
    return k.NativeScreenContainer;
  },

  useScreens: function () {
    var t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
    if ((A = t) && !M('RNSScreen')) console.error("Screen native module hasn't been linked. Please check the react-native-screens README for more details");
  },
  screensEnabled: function () {
    return A;
  },
};
