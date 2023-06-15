var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1036 = require('./1036');

require('./1042');

function v() {
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

var y = function (t, y, h) {
  var k = (function (l, ...args) {
    module7.default(C, l);

    var k = C,
      P = v(),
      R = function () {
        var t,
          n = module11.default(k);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C() {
      var t;
      module4.default(this, C);
      (t = R.call(this, ...args)).state = {
        descriptors: {},
        screenProps: t.props.screenProps,
      };
      return t;
    }

    module5.default(
      C,
      [
        {
          key: 'render',
          value: function () {
            return React.default.createElement(
              t,
              module22.default({}, this.props, {
                screenProps: this.state.screenProps,
                navigation: this.props.navigation,
                navigationConfig: h,
                descriptors: this.state.descriptors,
              })
            );
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (t, n) {
            var o = n.descriptors,
              s = t.navigation,
              c = t.screenProps,
              u = s.state,
              p = u.routes;
            if (undefined === p)
              throw new TypeError(
                'No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop'
              );
            var f = {};
            p.forEach(function (t) {
              if (o && o[t.key] && t === o[t.key].state && c === n.screenProps) f[t.key] = o[t.key];
              else {
                var u = y.getComponentForRouteName.bind(null, t.routeName),
                  p = s.getChildNavigation(t.key),
                  l = y.getScreenOptions(p, c);
                f[t.key] = {
                  key: t.key,
                  getComponent: u,
                  options: l,
                  state: t,
                  navigation: p,
                };
              }
            });
            return {
              descriptors: f,
              screenProps: c,
            };
          },
        },
      ]
    );
    return C;
  })(React.default.Component);

  k.router = y;
  k.navigationOptions = null;
  return module1036.polyfill(k);
};

exports.default = y;
