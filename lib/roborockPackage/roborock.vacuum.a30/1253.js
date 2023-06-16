require('prop-types');

var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1141 = require('./1141'),
  module1199 = require('./1199');

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
    module7.default(_, t);

    var module1141 = _,
      b = w(),
      k = function () {
        var t,
          n = module11.default(module1141);

        if (b) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);

      (n = k.call(this))._mustAlwaysBeVisible = function () {
        return n.props.animationEnabled || n.props.swipeEnabled;
      };

      n.state = {
        awake: !t.lazy || t.isFocused,
      };
      return n;
    }

    module5.default(_, null, [
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
    module5.default(_, [
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
            module12.View,
            {
              style: S.container,
              collapsable: false,
              removeClippedSubviews: 'android' === module12.Platform.OS ? f : !o && f,
            },
            React.default.createElement(
              module12.View,
              {
                style: this._mustAlwaysBeVisible() || o ? S.innerAttached : S.innerDetached,
              },
              t
                ? React.default.createElement(
                    module1199.default,
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
  S = module12.StyleSheet.create({
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
  k = module1141.polyfill(b);

exports.default = k;
