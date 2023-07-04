var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1218 = require('./1218'),
  module1247 = require('./1247'),
  module1266 = require('./1266'),
  module1263 = require('./1263');

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
        module50.default(t, n, s[n]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var C = module13.NativeModules && module13.NativeModules.NativeAnimatedModule,
  E = (function (t, ...args) {
    module9.default(E, t);

    var module50 = E,
      module13 = j(),
      b = function () {
        var t,
          n = module12.default(module50);

        if (module13) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function E() {
      var t;
      module6.default(this, E);

      (t = b.call(this, ...args))._configureTransition = function (n, o) {
        return T(
          T({}, module1263.default.getTransitionConfig(t.props.navigationConfig.transitionConfig, n, o, 'modal' === t.props.navigationConfig.mode).transitionSpec),
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
          module1247.default,
          module22.default({}, p, {
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

    module7.default(E, [
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(module1266.default, {
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
                  module1218.StackActions.completeTransition({
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
var S = E;
exports.default = S;
