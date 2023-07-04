var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1396 = require('./1396'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1199 = require('./1199');

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

var module510 = require('./510'),
  w = module13.PixelRatio.roundToNearestPixel(44);

exports.titleBarContentHeight = w;
var x = module13.StatusBar.currentHeight || 0,
  k = x + w;
exports.titleBarHeight = k;

var P = (function (t) {
  module9.default(k, t);

  var module1199 = k,
    w = b(),
    x = function () {
      var t,
        n = module12.default(module1199);

      if (w) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function k(t) {
    var n;
    module6.default(this, k);
    (n = x.call(this, t)).state = {
      leftContainerWidth: 0,
      middleContainerWidth: 0,
      rightContainerWidth: 0,
    };
    return n;
  }

  module7.default(k, [
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
  ]);
  module7.default(k, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        var t = this;

        this.languageChangeListener = function () {
          t.forceUpdate;
        };

        module510.addLanguageListener(this.languageChangeListener);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        module510.removeLanguageListener(this.languageChangeListener);
      },
    },
    {
      key: 'onLayoutLeftPart',
      value: function (t) {
        var n = module13.Dimensions.get('window').width;
        this.setState({
          leftContainerWidth: t.nativeEvent.layout.width,
          middleContainerWidth: 2 * (n / 2 - t.nativeEvent.layout.width ** this.state.rightContainerWidth),
        });
      },
    },
    {
      key: 'onLayoutRightPart',
      value: function (t) {
        var n = module13.Dimensions.get('window').width;
        this.setState({
          rightContainerWidth: t.nativeEvent.layout.width,
          middleContainerWidth: 2 * (n / 2 - this.state.leftContainerWidth ** t.nativeEvent.layout.width),
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          o = this,
          l = React.default.createElement(module385.PureImageButton, {
            onPress: this.props.onPressLeft,
            key: 'navi_back',
            style: E.naviBack,
            image: this.props.naviBackImage || this.theme.navBackIcon,
            imageWidth: 32,
            imageHeight: 32,
            funcId: 'navi_back',
            accessibilityLabel: module510.strings.accessibility_back,
          }),
          s = React.default.createElement(
            module13.Text,
            module22.default(
              {
                style: [
                  E.titleText,
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
          u = React.default.createElement(
            module13.Text,
            module22.default({}, module391.default.getAccessibilityLabel('sub_title'), {
              style: [
                E.subtitleText,
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
          h = [l].map(function (t, n) {
            return React.default.cloneElement(t, {
              key: 'nav_left_' + n,
            });
          }),
          C = (this.props.rightItems || []).map(function (t, n) {
            return React.default.isValidElement(t)
              ? React.default.cloneElement(t, {
                  key: 'nav_right_' + n,
                })
              : React.default.createElement(module13.View, {
                  key: n,
                });
          }),
          b = this.props.hiddenBottomLine ? 0 : 0.8,
          w = this.props.backgroundColor ? this.props.backgroundColor : this.theme.navBackgroundColor;
        return React.default.createElement(
          module1396.default,
          {
            isLandscape: null != (t = this.props.isLandscape) && t,
            fullWidth: true,
            style: [
              E.root,
              {
                backgroundColor: w,
                borderBottomColor: this.theme.navBorderColor,
                borderBottomWidth: b,
              },
            ],
          },
          React.default.createElement(
            module13.View,
            {
              style: E.container,
            },
            React.default.createElement(
              module13.View,
              {
                style: E.leftContainer,
                onLayout: function (t) {
                  return o.onLayoutLeftPart(t);
                },
              },
              h
            ),
            React.default.createElement(module13.View, {
              style: E.middleContainer,
            }),
            React.default.createElement(
              module13.View,
              {
                style: E.rightContainer,
                onLayout: function (t) {
                  return o.onLayoutRightPart(t);
                },
              },
              C
            )
          ),
          React.default.createElement(
            module13.View,
            {
              style: [
                E.middleWrapper,
                {
                  width: this.state.middleContainerWidth,
                },
              ],
            },
            s,
            this.props.subTitle && u
          )
        );
      },
    },
  ]);
  return k;
})(React.default.PureComponent);

exports.default = P;
P.contextType = module1199.AppConfigContext;
P.defaultProps = {
  leftItems: [],
  rightItems: [],
  title: '',
  subtitle: '',
  backgroundColor: '',
};
var E = module13.StyleSheet.create({
  root: {
    paddingTop: x,
    alignSelf: 'stretch',
    height: k,
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
