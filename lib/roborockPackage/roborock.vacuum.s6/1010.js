var module49 = require('./49'),
  React = require('react'),
  module12 = require('./12'),
  module938 = require('./938'),
  module1011 = require('./1011'),
  f = function (t) {
    var f = t.items,
      v = t.activeItemKey,
      y = t.activeTintColor,
      C = t.activeBackgroundColor,
      b = t.inactiveTintColor,
      I = t.inactiveBackgroundColor,
      S = t.getLabel,
      k = t.renderIcon,
      w = t.onItemPress,
      p = t.itemsContainerStyle,
      E = t.itemStyle,
      P = t.labelStyle,
      T = t.activeLabelStyle,
      V = t.inactiveLabelStyle,
      h = t.iconContainerStyle,
      B = t.drawerPosition;
    return React.default.createElement(
      module12.View,
      {
        style: [s.container, p],
      },
      f.map(function (t, f) {
        var p,
          _ = v === t.key,
          x = _ ? y : b,
          L = _ ? C : I,
          j = {
            route: t,
            index: f,
            focused: _,
            tintColor: x,
          },
          z = k(j),
          A = S(j),
          D = _ ? T : V;

        return React.default.createElement(
          module1011.default,
          {
            key: t.key,
            onPress: function () {
              w({
                route: t,
                focused: _,
              });
            },
            delayPressIn: 0,
          },
          React.default.createElement(
            module938.SafeAreaView,
            {
              style: {
                backgroundColor: L,
              },
              forceInset: ((p = {}), module49.default(p, B, 'always'), module49.default(p, 'left' === B ? 'right' : 'left', 'never'), module49.default(p, 'vertical', 'never'), p),
            },
            React.default.createElement(
              module12.View,
              {
                style: [s.item, E],
              },
              z
                ? React.default.createElement(
                    module12.View,
                    {
                      style: [s.icon, _ ? null : s.inactiveIcon, h],
                    },
                    z
                  )
                : null,
              'string' == typeof A
                ? React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        s.label,
                        {
                          color: x,
                        },
                        P,
                        D,
                      ],
                    },
                    A
                  )
                : A
            )
          )
        );
      })
    );
  };

f.defaultProps = {
  activeTintColor: '#2196f3',
  activeBackgroundColor: 'rgba(0, 0, 0, .04)',
  inactiveTintColor: 'rgba(0, 0, 0, .87)',
  inactiveBackgroundColor: 'transparent',
};
var s = module12.StyleSheet.create({
    container: {
      paddingVertical: 4,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 16,
      width: 24,
      alignItems: 'center',
    },
    inactiveIcon: {
      opacity: 0.62,
    },
    label: {
      margin: 16,
      fontWeight: 'bold',
    },
  }),
  v = f;
exports.default = v;
