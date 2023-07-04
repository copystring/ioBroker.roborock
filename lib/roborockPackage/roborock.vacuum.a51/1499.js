exports.default = function (t) {
  var h = t.style,
    p = t.visible,
    v = t.onPress,
    y = t.children,
    w = t.isModal,
    E = t.showNavbar,
    S = module391.default.isIphoneX() ? module391.default.iphoneSafeareaTop() + 44 : 64,
    k = 44 + module391.default.statusbarHeight(true),
    _ = E ? module391.default.iOSAndroidReturn(S, k) : 0,
    O = React.default.createElement(
      module13.TouchableWithoutFeedback,
      {
        accessible: false,
        onPress: v,
      },
      React.default.createElement(
        module13.View,
        {
          style: [
            f.container,
            {
              top: 0,
              height: module394.default.sharedCache().ScreenHeight - _,
              width: module13.Dimensions.get('window').width,
            },
            h,
          ],
        },
        React.default.createElement(
          module13.TouchableWithoutFeedback,
          {
            onPress: v,
          },
          React.default.createElement(module13.View, {
            style: {
              flex: 1,
              backgroundColor: 'transparent',
              alignSelf: 'stretch',
            },
            accessibilityLabel: module510.accessibility_back,
          })
        ),
        React.default.createElement(
          module13.TouchableOpacity,
          {
            activeOpacity: 1,
            accessible: false,
          },
          y
        )
      )
    ),
    P = React.default.createElement(
      module1210.default,
      {
        visible: true,
        transparent: true,
      },
      O
    );

  return p ? (w ? P : O) : null;
};

var React = require('react'),
  module13 = require('./13'),
  module1337 = require('./1337'),
  module394 = require('./394'),
  module391 = require('./391'),
  module1210 = require('./1210'),
  module510 = require('./510').strings;

var f = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99999,
  },
});
