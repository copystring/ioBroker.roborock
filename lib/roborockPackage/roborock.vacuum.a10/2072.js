var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = C(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, s, f);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module2073 = require('./2073'),
  module381 = require('./381'),
  module387 = require('./387'),
  module506 = require('./506');

function C(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (C = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
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

var module389 = require('./389'),
  module491 = require('./491'),
  P = module12.Dimensions.get('window'),
  x = P.width,
  W = (module12.StatusBar.currentHeight || 0) + (module389.isWindowDisplay ? 8 : 0),
  E = (function (t) {
    module7.default(P, t);

    var module506 = P,
      C = w(),
      L = function () {
        var t,
          n = module11.default(module506);

        if (C) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = L.call(this, t)).state = {
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
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;

          this.languageChangeListener = function () {
            t.forceUpdate;
          };

          module491.addLanguageListener(this.languageChangeListener);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module491.removeLanguageListener(this.languageChangeListener);
        },
      },
      {
        key: 'onLayoutLeftPart',
        value: function (t) {
          this.setState({
            leftContainerWidth: t.nativeEvent.layout.width,
            middleContainerWidth: 2 * (x / 2 - t.nativeEvent.layout.width ** this.state.rightContainerWidth),
          });
        },
      },
      {
        key: 'onLayoutRightPart',
        value: function (t) {
          this.setState({
            rightContainerWidth: t.nativeEvent.layout.width,
            middleContainerWidth: 2 * (x / 2 - this.state.leftContainerWidth ** t.nativeEvent.layout.width),
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = React.default.createElement(module381.PureImageButton, {
              onPress: this.props.onPressLeft,
              key: 'navi_back',
              style: T.naviBack,
              image: this.theme.navBackIcon,
              imageWidth: 32,
              imageHeight: 32,
              funcId: 'navi_back',
              accessibilityLabel: module491.strings.accessibility_back,
            }),
            l = React.default.createElement(
              module12.Text,
              module21.default(
                {
                  style: [
                    T.titleText,
                    {
                      color: this.theme.navTitleColor,
                    },
                  ],
                  onPress: this.props.onPressTitle,
                  numberOfLines: 1,
                  suppressHighlighting: true,
                },
                module387.default.getAccessibilityLabel('main_title')
              ),
              this.props.title
            ),
            u = React.default.createElement(
              module12.Text,
              module21.default({}, module387.default.getAccessibilityLabel('sub_title'), {
                style: [
                  T.subtitleText,
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
            s = [o].map(function (t, n) {
              return React.default.cloneElement(t, {
                key: 'nav_left_' + n,
              });
            }),
            f = (this.props.rightItems || []).map(function (t, n) {
              return React.default.isValidElement(t)
                ? React.default.cloneElement(t, {
                    key: 'nav_right_' + n,
                  })
                : React.default.createElement(module12.View, {
                    key: n,
                  });
            }),
            b = this.props.hiddenBottomLine ? 0 : 0.8,
            C = this.props.backgroundColor ? this.props.backgroundColor : this.theme.navBackgroundColor;
          return React.default.createElement(
            module2073.default,
            {
              style: [
                T.root,
                {
                  backgroundColor: C,
                  borderBottomColor: this.theme.navBorderColor,
                  borderBottomWidth: b,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: T.container,
              },
              React.default.createElement(
                module12.View,
                {
                  style: T.leftContainer,
                  onLayout: function (n) {
                    return t.onLayoutLeftPart(n);
                  },
                },
                s
              ),
              React.default.createElement(module12.View, {
                style: T.middleContainer,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: T.rightContainer,
                  onLayout: function (n) {
                    return t.onLayoutRightPart(n);
                  },
                },
                f
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  T.middleWrapper,
                  {
                    width: this.state.middleContainerWidth,
                  },
                ],
              },
              l,
              this.props.subTitle && u
            )
          );
        },
      },
    ]);
    return P;
  })(React.default.PureComponent);

exports.default = E;
E.contextType = module506.AppConfigContext;
E.defaultProps = {
  leftItems: [],
  rightItems: [],
  title: '',
  subtitle: '',
  backgroundColor: '',
};
var T = module12.StyleSheet.create({
  root: {
    paddingTop: W,
    width: x,
    height: W + 44,
    borderBottomColor: '#rgba(0,0,0,0.1)',
  },
  container: {
    flex: 1,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    height: 44,
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
    height: 44,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: module387.default.scaledPixelForPad(module387.default.iOSAndroidReturn(17.6, 15)),
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: module387.default.iOSAndroidReturn(5, 0),
    fontSize: module387.default.scaledPixelForPad(13),
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
