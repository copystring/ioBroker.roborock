var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  React = require('react'),
  module12 = require('./12'),
  s = module12.Animated.Text,
  u = module12.StyleSheet.create({
    title: {
      fontSize: 'ios' === module12.Platform.OS ? 17 : 20,
      fontWeight: 'ios' === module12.Platform.OS ? '600' : '500',
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
