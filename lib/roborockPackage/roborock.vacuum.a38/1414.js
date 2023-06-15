var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1415 = require('./1415'),
  module385 = require('./385'),
  module391 = require('./391'),
  module515 = require('./515');

function b() {
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

var module500 = require('./500'),
  x = module12.Dimensions.get('window'),
  k = x.width,
  w = module12.PixelRatio.roundToNearestPixel(44);

exports.titleBarContentHeight = w;
var P = module12.StatusBar.currentHeight || 0,
  E = P + w;
exports.titleBarHeight = E;

var T = (function (t) {
  module7.default(P, t);

  var module515 = P,
    x = b(),
    w = function () {
      var t,
        n = module11.default(module515);

      if (x) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var n;
    module4.default(this, P);
    (n = w.call(this, t)).state = {
      leftContainerWidth: 0,
      middleContainerWidth: 0,
      rightContainerWidth: 0,
    };
    return n;
  }

  module5.default(P, [
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
  ]);
  module5.default(P, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        var t = this;

        this.languageChangeListener = function () {
          t.forceUpdate;
        };

        module500.addLanguageListener(this.languageChangeListener);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        module500.removeLanguageListener(this.languageChangeListener);
      },
    },
    {
      key: 'onLayoutLeftPart',
      value: function (t) {
        this.setState({
          leftContainerWidth: t.nativeEvent.layout.width,
          middleContainerWidth: 2 * (k / 2 - t.nativeEvent.layout.width ** this.state.rightContainerWidth),
        });
      },
    },
    {
      key: 'onLayoutRightPart',
      value: function (t) {
        this.setState({
          rightContainerWidth: t.nativeEvent.layout.width,
          middleContainerWidth: 2 * (k / 2 - this.state.leftContainerWidth ** t.nativeEvent.layout.width),
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = React.default.createElement(module385.PureImageButton, {
            onPress: this.props.onPressLeft,
            key: 'navi_back',
            style: W.naviBack,
            image: this.props.naviBackImage || this.theme.navBackIcon,
            imageWidth: 32,
            imageHeight: 32,
            funcId: 'navi_back',
            accessibilityLabel: module500.strings.accessibility_back,
          }),
          l = React.default.createElement(
            module12.Text,
            module22.default(
              {
                style: [
                  W.titleText,
                  {
                    color: this.theme.navTitleColor,
                  },
                ],
                onPress: this.props.onPressTitle,
                numberOfLines: 1,
                suppressHighlighting: true,
              },
              module391.default.getAccessibilityLabel('main_title')
            ),
            this.props.title
          ),
          s = React.default.createElement(
            module12.Text,
            module22.default({}, module391.default.getAccessibilityLabel('sub_title'), {
              style: [
                W.subtitleText,
                {
                  color: this.theme.navSubtitleColor,
                },
              ],
              numberOfLines: 1,
              onPress: this.props.onPressTitle,
              suppressHighlighting: true,
            }),
            this.props.subTitle
          ),
          u = [o].map(function (t, n) {
            return React.default.cloneElement(t, {
              key: 'nav_left_' + n,
            });
          }),
          h = (this.props.rightItems || []).map(function (t, n) {
            return React.default.isValidElement(t)
              ? React.default.cloneElement(t, {
                  key: 'nav_right_' + n,
                })
              : React.default.createElement(module12.View, {
                  key: n,
                });
          }),
          C = this.props.hiddenBottomLine ? 0 : 0.8,
          b = this.props.backgroundColor ? this.props.backgroundColor : this.theme.navBackgroundColor;
        return React.default.createElement(
          module1415.default,
          {
            fullWidth: true,
            style: [
              W.root,
              {
                backgroundColor: b,
                borderBottomColor: this.theme.navBorderColor,
                borderBottomWidth: C,
              },
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: W.container,
            },
            React.default.createElement(
              module12.View,
              {
                style: W.leftContainer,
                onLayout: function (n) {
                  return t.onLayoutLeftPart(n);
                },
              },
              u
            ),
            React.default.createElement(module12.View, {
              style: W.middleContainer,
            }),
            React.default.createElement(
              module12.View,
              {
                style: W.rightContainer,
                onLayout: function (n) {
                  return t.onLayoutRightPart(n);
                },
              },
              h
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                W.middleWrapper,
                {
                  width: this.state.middleContainerWidth,
                },
              ],
            },
            l,
            this.props.subTitle && s
          )
        );
      },
    },
  ]);
  return P;
})(React.default.PureComponent);

exports.default = T;
T.contextType = module515.AppConfigContext;
T.defaultProps = {
  leftItems: [],
  rightItems: [],
  title: '',
  subtitle: '',
  backgroundColor: '',
};
var W = module12.StyleSheet.create({
  root: {
    paddingTop: P,
    width: k,
    height: E,
    borderBottomColor: '#rgba(0,0,0,0.1)',
  },
  container: {
    flex: 1,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    height: w,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
  },
  middleWrapper: {
    position: 'absolute',
    bottom: 0,
    height: w,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: module391.default.scaledPixelForPad(module391.default.iOSAndroidReturn(17.6, 15)),
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: module391.default.iOSAndroidReturn(5, 0),
    fontSize: module391.default.scaledPixelForPad(13),
    textAlign: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  naviBack: {
    width: 32,
    height: 32,
    overflow: 'hidden',
    resizeMode: 'contain',
    marginRight: 8,
    marginLeft: 8,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
});
