var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1250 = require('./1250');

function S(t) {
  var n = y();
  return function () {
    var o,
      u = module12.default(t);

    if (n) {
      var c = module12.default(this).constructor;
      o = Reflect.construct(u, arguments, c);
    } else o = u.apply(this, arguments);

    return module11.default(this, o);
  };
}

function y() {
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

var C,
  R,
  N,
  E = false,
  w = function (t) {
    return undefined !== module13.UIManager.getViewManagerConfig ? module13.UIManager.getViewManagerConfig(t) : module13.UIManager[t];
  };

var A = {
    get NativeScreen() {
      C = C || module13.requireNativeComponent('RNSScreen', null);
      return C;
    },

    get NativeScreenContainer() {
      R = R || module13.requireNativeComponent('RNSScreenContainer', null);
      return R;
    },
  },
  M = (function (t, ...args) {
    module9.default(s, t);
    var l = S(s);

    function s() {
      var t;
      module6.default(this, s);

      (t = l.call(this, ...args)).setRef = function (n) {
        t._ref = n;
        if (t.props.onComponentRef) t.props.onComponentRef(n);
      };

      return t;
    }

    module7.default(s, [
      {
        key: 'setNativeProps',
        value: function (t) {
          this._ref.setNativeProps(t);
        },
      },
      {
        key: 'render',
        value: function () {
          if (E) {
            if (((N = N || module13.Animated.createAnimatedComponent(A.NativeScreen)), module1250.version.minor >= 57))
              return React.default.createElement(
                N,
                module22.default({}, this.props, {
                  ref: this.setRef,
                })
              );
            var t = this.props,
              u = t.style,
              c = t.children,
              f = module56.default(t, ['style', 'children']);
            return React.default.createElement(
              N,
              module22.default({}, f, {
                ref: this.setRef,
                style: module13.StyleSheet.absoluteFill,
              }),
              React.default.createElement(
                module13.Animated.View,
                {
                  style: u,
                },
                c
              )
            );
          }

          var l = this.props,
            s = module56.default(l, ['active', 'onComponentRef']);
          return React.default.createElement(
            module13.Animated.View,
            module22.default({}, s, {
              ref: this.setRef,
            })
          );
        },
      },
    ]);
    return s;
  })(React.default.Component),
  k = (function (t) {
    module9.default(o, t);
    var n = S(o);

    function o() {
      module6.default(this, o);
      return n.apply(this, arguments);
    }

    module7.default(o, [
      {
        key: 'render',
        value: function () {
          return E ? React.default.createElement(A.NativeScreenContainer, this.props) : React.default.createElement(module13.View, this.props);
        },
      },
    ]);
    return o;
  })(React.default.Component);

module.exports = {
  ScreenContainer: k,
  Screen: M,

  get NativeScreen() {
    return A.NativeScreen;
  },

  get NativeScreenContainer() {
    return A.NativeScreenContainer;
  },

  useScreens: function () {
    var t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
    if ((E = t) && !w('RNSScreen')) console.error("Screen native module hasn't been linked. Please check the react-native-screens README for more details");
  },
  screensEnabled: function () {
    return E;
  },
};
