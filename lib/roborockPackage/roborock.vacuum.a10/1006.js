var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module936 = require('./936'),
  module1007 = require('./1007');

function y() {
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

var _ = (function (t, ...args) {
  module7.default(I, t);

  var _ = I,
    b = y(),
    x = function () {
      var t,
        n = module11.default(_);

      if (b) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function I() {
    var t;
    module4.default(this, I);

    (t = x.call(this, ...args))._getScreenOptions = function (n) {
      var o = t.props.descriptors[n];
      module1007.default(o.options, 'Cannot access screen descriptor options from drawer sidebar');
      return o.options;
    };

    t._getLabel = function (n) {
      var o = n.focused,
        s = n.tintColor,
        u = n.route,
        c = t._getScreenOptions(u.key),
        l = c.drawerLabel,
        f = c.title;

      if (l)
        return 'function' == typeof l
          ? l({
              tintColor: s,
              focused: o,
            })
          : l;
      else return 'string' == typeof f ? f : u.routeName;
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
          o = module936.StackActions.reset({
            index: 0,
            actions: [
              module936.NavigationActions.navigate({
                routeName: s.routes[0].routeName,
              }),
            ],
          });
        t.props.navigation.dispatch(
          module936.NavigationActions.navigate({
            routeName: s.routeName,
            action: o,
          })
        );
      }
    };

    return t;
  }

  module5.default(I, [
    {
      key: 'render',
      value: function () {
        var t = this.props.contentComponent;
        if (!t) return null;
        var o = this.props.navigation.state;
        module1007.default('number' == typeof o.index, 'should be set');
        return React.default.createElement(
          module12.View,
          {
            style: [P.container, this.props.style],
          },
          React.default.createElement(
            t,
            module21.default({}, this.props.contentOptions, {
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
var P = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
});
