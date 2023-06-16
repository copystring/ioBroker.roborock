var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module938 = require('./938'),
  module970 = require('./970'),
  module989 = require('./989'),
  module986 = require('./986');

function b(t, n) {
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

function T(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
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

var C = module12.NativeModules && module12.NativeModules.NativeAnimatedModule,
  E = (function (t, ...args) {
    module7.default(E, t);

    var module49 = E,
      module12 = j(),
      b = function () {
        var t,
          n = module11.default(module49);

        if (module12) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E() {
      var t;
      module4.default(this, E);

      (t = b.call(this, ...args))._configureTransition = function (n, o) {
        return T(
          T({}, module986.default.getTransitionConfig(t.props.navigationConfig.transitionConfig, n, o, 'modal' === t.props.navigationConfig.mode).transitionSpec),
          {},
          {
            useNativeDriver: !!C,
          }
        );
      };

      t._render = function (o, s) {
        var c = t.props,
          u = c.screenProps,
          p = c.navigationConfig;
        return React.default.createElement(
          module970.default,
          module21.default({}, p, {
            onGestureBegin: t.props.onGestureBegin,
            onGestureCanceled: t.props.onGestureCanceled,
            onGestureEnd: t.props.onGestureEnd,
            screenProps: u,
            descriptors: t.props.descriptors,
            transitionProps: o,
            lastTransitionProps: s,
          })
        );
      };

      return t;
    }

    module5.default(E, [
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(module989.default, {
            render: this._render,
            configureTransition: this._configureTransition,
            screenProps: this.props.screenProps,
            navigation: this.props.navigation,
            descriptors: this.props.descriptors,
            onTransitionStart: this.props.onTransitionStart || this.props.navigationConfig.onTransitionStart,
            onTransitionEnd: function (n, o) {
              var s = t.props,
                c = s.navigationConfig,
                u = s.navigation,
                p = t.props.onTransitionEnd || c.onTransitionEnd;
              if (n.navigation.state.isTransitioning)
                u.dispatch(
                  module938.StackActions.completeTransition({
                    key: u.state.key,
                  })
                );
              if (p) p(n, o);
            },
          });
        },
      },
    ]);
    return E;
  })(React.default.Component);

E.defaultProps = {
  navigationConfig: {
    mode: 'card',
  },
};
var _ = E;
exports.default = _;
