require('prop-types');

var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module938 = require('./938'),
  module999 = require('./999'),
  w = ['isFocused', 'childNavigation', 'navigation', 'removeClippedSubviews', 'lazy'];

function b() {
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

var S = (function (t) {
    module7.default(E, t);

    var module938 = E,
      S = b(),
      _ = function () {
        var t,
          n = module11.default(module938);

        if (S) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);

      (n = _.call(this))._mustAlwaysBeVisible = function () {
        return n.props.animationEnabled || n.props.swipeEnabled;
      };

      n.state = {
        awake: !t.lazy || t.isFocused,
      };
      return n;
    }

    module5.default(
      E,
      [
        {
          key: 'render',
          value: function () {
            var t = this.state.awake,
              u = this.props,
              o = u.isFocused,
              c = u.childNavigation,
              f = u.removeClippedSubviews,
              s = module55.default(u, w);
            return React.default.createElement(
              module12.View,
              {
                style: k.container,
                collapsable: false,
                removeClippedSubviews: 'android' === module12.Platform.OS ? f : !o && f,
              },
              React.default.createElement(
                module12.View,
                {
                  style: this._mustAlwaysBeVisible() || o ? k.innerAttached : k.innerDetached,
                },
                t
                  ? React.default.createElement(
                      module999.default,
                      module21.default({}, s, {
                        navigation: c,
                      })
                    )
                  : null
              )
            );
          },
        },
      ],
      [
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
      ]
    );
    return E;
  })(React.default.PureComponent),
  k = module12.StyleSheet.create({
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
  _ = module938.polyfill(S);

exports.default = _;
