require('prop-types');

var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1213 = require('./1213'),
  module1271 = require('./1271');

function w() {
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

var b = (function (t) {
    module9.default(_, t);

    var module1213 = _,
      b = w(),
      k = function () {
        var t,
          n = module12.default(module1213);

        if (b) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function _(t) {
      var n;
      module6.default(this, _);

      (n = k.call(this))._mustAlwaysBeVisible = function () {
        return n.props.animationEnabled || n.props.swipeEnabled;
      };

      n.state = {
        awake: !t.lazy || t.isFocused,
      };
      return n;
    }

    module7.default(_, null, [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, n) {
          return t.isFocused && !n.awake
            ? {
                awake: true,
              }
            : null;
        },
      },
    ]);
    module7.default(_, [
      {
        key: 'render',
        value: function () {
          var t = this.state.awake,
            u = this.props,
            o = u.isFocused,
            c = u.childNavigation,
            f = u.removeClippedSubviews,
            s = module56.default(u, ['isFocused', 'childNavigation', 'navigation', 'removeClippedSubviews', 'lazy']);
          return React.default.createElement(
            module13.View,
            {
              style: S.container,
              collapsable: false,
              removeClippedSubviews: 'android' === module13.Platform.OS ? f : !o && f,
            },
            React.default.createElement(
              module13.View,
              {
                style: this._mustAlwaysBeVisible() || o ? S.innerAttached : S.innerDetached,
              },
              t
                ? React.default.createElement(
                    module1271.default,
                    module22.default({}, s, {
                      navigation: c,
                    })
                  )
                : null
            )
          );
        },
      },
    ]);
    return _;
  })(React.default.PureComponent),
  S = module13.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
    },
    innerAttached: {
      flex: 1,
    },
    innerDetached: {
      flex: 1,
      top: 3e3,
    },
  }),
  k = module1213.polyfill(b);

exports.default = k;
