var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1073 = require('./1073'),
  module1074 = require('./1074');

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
  module7.default(C, t);

  var v = C,
    T = p(),
    P = function () {
      var t,
        n = module11.default(v);

      if (T) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function C() {
    var t;
    module4.default(this, C);
    (t = P.call(this, ...args)).state = {};

    t._onTextLayout = function (n) {
      if (!t.state.initialTextWidth)
        t.setState({
          initialTextWidth: n.nativeEvent.layout.x + n.nativeEvent.layout.width,
        });
    };

    return t;
  }

  module5.default(C, [
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
            t = module12.Image;
            n = {
              style: [
                b.icon,
                !!s && b.iconWithTitle,
                !!c && {
                  tintColor: c,
                },
              ],
              source: module1074.default,
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
        return ('left' === n || 'android' === module12.Platform.OS || 'string' != typeof p) && !o
          ? null
          : React.default.createElement(
              module12.Text,
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
            module1073.default,
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
              module12.View,
              {
                style: b.container,
              },
              this._renderBackImage(),
              this._maybeRenderTitle()
            )
          );
        return 'android' === module12.Platform.OS
          ? React.default.createElement(
              module12.View,
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
  tintColor: module12.Platform.select({
    ios: '#037aff',
  }),
  truncatedTitle: 'Back',
};
var b = module12.StyleSheet.create({
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
      'ios' === module12.Platform.OS
        ? {
            height: 21,
            width: 13,
            marginLeft: 9,
            marginRight: 22,
            marginVertical: 12,
            resizeMode: 'contain',
            transform: [
              {
                scaleX: module12.I18nManager.isRTL ? -1 : 1,
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
                scaleX: module12.I18nManager.isRTL ? -1 : 1,
              },
            ],
          },
    iconWithTitle:
      'ios' === module12.Platform.OS
        ? {
            marginRight: 6,
          }
        : {},
  }),
  T = v;
exports.default = T;
