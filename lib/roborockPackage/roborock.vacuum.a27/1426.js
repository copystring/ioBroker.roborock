exports.default = function (t) {
  var h = t.style,
    f = t.visible,
    y = t.onPress,
    p = t.children,
    v = t.isModal,
    w = module1265.AppBorderRadius,
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
              height: module394.default.sharedCache().ScreenHeight,
              width: module12.Dimensions.get('window').width,
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
            accessibilityLabel: module505.accessibility_back,
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
      module1138.default,
      {
        visible: true,
        transparent: true,
      },
      E
    );
  return f ? (v ? k : E) : null;
};

var React = require('react'),
  module12 = require('./12'),
  module1265 = require('./1265'),
  module394 = require('./394'),
  module1138 = require('./1138'),
  module505 = require('./505').strings;

var b = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
