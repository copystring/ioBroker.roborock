exports.default = function (t) {
  var h = t.style,
    f = t.visible,
    y = t.onPress,
    p = t.children,
    v = t.isModal,
    w = module934.AppBorderRadius,
    E = React.default.createElement(
      module12.TouchableWithoutFeedback,
      {
        accessible: false,
        onPress: y,
      },
      React.default.createElement(
        module12.View,
        {
          style: [
            b.container,
            {
              borderRadius: w,
              height: module390.default.sharedCache().ScreenHeight,
            },
            h,
          ],
        },
        React.default.createElement(
          module12.TouchableWithoutFeedback,
          {
            onPress: y,
          },
          React.default.createElement(module12.View, {
            style: {
              flex: 1,
              backgroundColor: 'transparent',
              alignSelf: 'stretch',
            },
            accessibilityLabel: module491.accessibility_back,
          })
        ),
        React.default.createElement(
          module12.TouchableOpacity,
          {
            activeOpacity: 1,
            accessible: false,
          },
          p
        )
      )
    ),
    k = React.default.createElement(
      module935.default,
      {
        visible: true,
        transparent: true,
      },
      E
    );
  return f ? (v ? k : E) : null;
};

require('./389');

var React = require('react'),
  module12 = require('./12'),
  module934 = require('./934'),
  module390 = require('./390'),
  module935 = require('./935'),
  module491 = require('./491').strings;

var b = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
