var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  React = require('react'),
  module12 = require('./12'),
  s = ['style'],
  u = module12.Animated.Text,
  c = module12.StyleSheet.create({
    title: {
      fontSize: 'ios' === module12.Platform.OS ? 17 : 20,
      fontWeight: 'ios' === module12.Platform.OS ? '600' : '500',
      color: 'rgba(0, 0, 0, .9)',
      marginHorizontal: 16,
    },
  }),
  y = function (t) {
    var f = t.style,
      y = module55.default(t, s);
    return React.default.createElement(
      u,
      module21.default(
        {
          numberOfLines: 1,
        },
        y,
        {
          style: [c.title, f],
          accessibilityTraits: 'header',
          accessible: false,
        }
      )
    );
  };

exports.default = y;
