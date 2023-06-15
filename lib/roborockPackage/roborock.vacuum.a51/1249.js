var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1250 = require('./1250'),
  module1251 = require('./1251');

function p() {
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

var v = (function (t, ...args) {
  module9.default(C, t);

  var v = C,
    T = p(),
    P = function () {
      var t,
        n = module12.default(v);

      if (T) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function C() {
    var t;
    module6.default(this, C);
    (t = P.call(this, ...args)).state = {};

    t._onTextLayout = function (n) {
      if (!t.state.initialTextWidth)
        t.setState({
          initialTextWidth: n.nativeEvent.layout.x + n.nativeEvent.layout.width,
        });
    };

    return t;
  }

  module7.default(C, [
    {
      key: '_renderBackImage',
      value: function () {
        var t,
          n,
          o = this.props,
          l = o.backImage,
          s = o.title,
          c = o.tintColor;
        if (React.default.isValidElement(l)) return l;
        else {
          if (l) {
            t = l;
            n = {
              tintColor: c,
              title: s,
            };
          } else {
            t = module13.Image;
            n = {
              style: [
                b.icon,
                !!s && b.iconWithTitle,
                !!c && {
                  tintColor: c,
                },
              ],
              source: module1251.default,
            };
          }

          return React.default.createElement(t, n);
        }
      },
    },
    {
      key: '_maybeRenderTitle',
      value: function () {
        var t = this.props,
          n = t.layoutPreset,
          o = t.backTitleVisible,
          l = t.width,
          s = t.title,
          c = t.titleStyle,
          h = t.tintColor,
          y = t.truncatedTitle,
          p = !(!this.state.initialTextWidth || !l) && this.state.initialTextWidth > l ? y : s;
        return ('left' === n || 'android' === module13.Platform.OS || 'string' != typeof p) && !o
          ? null
          : React.default.createElement(
              module13.Text,
              {
                accessible: false,
                onLayout: this._onTextLayout,
                style: [
                  b.title,
                  !!h && {
                    color: h,
                  },
                  c,
                ],
                numberOfLines: 1,
              },
              p
            );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.onPress,
          o = t.pressColorAndroid,
          l = t.title,
          s = React.default.createElement(
            module1250.default,
            {
              accessible: false,
              accessibilityComponentType: 'button',
              accessibilityLabel: l,
              accessibilityTraits: 'button',
              testID: 'header-back',
              delayPressIn: 0,
              onPress: n,
              pressColor: o,
              style: b.container,
              borderless: true,
            },
            React.default.createElement(
              module13.View,
              {
                style: b.container,
              },
              this._renderBackImage(),
              this._maybeRenderTitle()
            )
          );
        return 'android' === module13.Platform.OS
          ? React.default.createElement(
              module13.View,
              {
                style: b.androidButtonWrapper,
              },
              s
            )
          : s;
      },
    },
  ]);
  return C;
})(React.default.PureComponent);

v.defaultProps = {
  pressColorAndroid: 'rgba(0, 0, 0, .32)',
  tintColor: module13.Platform.select({
    ios: '#037aff',
  }),
  truncatedTitle: 'Back',
};
var b = module13.StyleSheet.create({
    androidButtonWrapper: {
      margin: 13,
      backgroundColor: 'transparent',
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 17,
      paddingRight: 10,
    },
    icon:
      'ios' === module13.Platform.OS
        ? {
            height: 21,
            width: 13,
            marginLeft: 9,
            marginRight: 22,
            marginVertical: 12,
            resizeMode: 'contain',
            transform: [
              {
                scaleX: module13.I18nManager.isRTL ? -1 : 1,
              },
            ],
          }
        : {
            height: 24,
            width: 24,
            margin: 3,
            resizeMode: 'contain',
            transform: [
              {
                scaleX: module13.I18nManager.isRTL ? -1 : 1,
              },
            ],
          },
    iconWithTitle:
      'ios' === module13.Platform.OS
        ? {
            marginRight: 6,
          }
        : {},
  }),
  T = v;
exports.default = T;
