var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1217 = require('./1217'),
  module1285 = require('./1285');

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

var _ = (function (t, ...args) {
  module9.default(I, t);

  var _ = I,
    b = y(),
    x = function () {
      var t,
        n = module12.default(_);

      if (b) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function I() {
    var t;
    module6.default(this, I);

    (t = x.call(this, ...args))._getScreenOptions = function (n) {
      var o = t.props.descriptors[n];
      module1285.default(o.options, 'Cannot access screen descriptor options from drawer sidebar');
      return o.options;
    };

    t._getLabel = function (n) {
      var o = n.focused,
        s = n.tintColor,
        u = n.route,
        c = t._getScreenOptions(u.key),
        f = c.drawerLabel,
        l = c.title;

      if (f)
        return 'function' == typeof f
          ? f({
              tintColor: s,
              focused: o,
            })
          : f;
      else return 'string' == typeof l ? l : u.routeName;
    };

    t._renderIcon = function (n) {
      var o = n.focused,
        s = n.tintColor,
        u = n.route,
        c = t._getScreenOptions(u.key).drawerIcon;

      return c
        ? 'function' == typeof c
          ? c({
              tintColor: s,
              focused: o,
            })
          : c
        : null;
    };

    t._onItemPress = function (n) {
      var o,
        s = n.route;

      if (!n.focused) {
        if (null != s.index && 0 !== s.index)
          o = module1217.StackActions.reset({
            index: 0,
            actions: [
              module1217.NavigationActions.navigate({
                routeName: s.routes[0].routeName,
              }),
            ],
          });
        t.props.navigation.dispatch(
          module1217.NavigationActions.navigate({
            routeName: s.routeName,
            action: o,
          })
        );
      }
    };

    return t;
  }

  module7.default(I, [
    {
      key: 'render',
      value: function () {
        var t = this.props.contentComponent;
        if (!t) return null;
        var o = this.props.navigation.state;
        module1285.default('number' == typeof o.index, 'should be set');
        return React.default.createElement(
          module13.View,
          {
            style: [P.container, this.props.style],
          },
          React.default.createElement(
            t,
            module22.default({}, this.props.contentOptions, {
              navigation: this.props.navigation,
              descriptors: this.props.descriptors,
              items: o.routes,
              activeItemKey: o.routes[o.index] ? o.routes[o.index].key : null,
              screenProps: this.props.screenProps,
              getLabel: this._getLabel,
              renderIcon: this._renderIcon,
              onItemPress: this._onItemPress,
              drawerPosition: this.props.drawerPosition,
            })
          )
        );
      },
    },
  ]);
  return I;
})(React.default.PureComponent);

exports.default = _;
var P = module13.StyleSheet.create({
  container: {
    flex: 1,
  },
});
