var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  React = require('react'),
  module13 = require('./13'),
  s = module13.Animated.Text,
  u = module13.StyleSheet.create({
    title: {
      fontSize: 'ios' === module13.Platform.OS ? 17 : 20,
      fontWeight: 'ios' === module13.Platform.OS ? '600' : '500',
      color: 'rgba(0, 0, 0, .9)',
      marginHorizontal: 16,
    },
  }),
  c = function (t) {
    var f = t.style,
      c = module56.default(t, ['style']);
    return React.default.createElement(
      s,
      module22.default(
        {
          numberOfLines: 1,
        },
        c,
        {
          style: [u.title, f],
          accessibilityTraits: 'header',
          accessible: false,
        }
      )
    );
  };

exports.default = c;
