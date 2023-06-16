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
  module7.default(x, t);

  var v = x,
    b = p(),
    C = function () {
      var t,
        n = module11.default(v);

      if (b) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x() {
    var t;
    module4.default(this, x);
    (t = C.call(this, ...args)).state = {};

    t._onTextLayout = function (n) {
      if (!t.state.initialTextWidth)
        t.setState({
          initialTextWidth: n.nativeEvent.layout.x + n.nativeEvent.layout.width,
        });
    };

    return t;
  }

  module5.default(x, [
    {
      key: '_renderBackImage',
      value: function () {
        var t,
          n,
          l = this.props,
          o = l.backImage,
          c = l.title,
          u = l.tintColor;
        if (React.default.isValidElement(o)) return o;
        else {
          if (o) {
            t = o;
            n = {
              tintColor: u,
              title: c,
            };
          } else {
            t = module12.Image;
            n = {
              style: [
                T.icon,
                !!c && T.iconWithTitle,
                !!u && {
                  tintColor: u,
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
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.onPress,
          l = t.width,
          o = t.title,
          c = t.titleStyle,
          u = t.tintColor,
          y = t.truncatedTitle,
          p = !(!this.state.initialTextWidth || !l) && this.state.initialTextWidth > l ? y : o;
        if (p && p.length > 8) p = y;
        var v = this.props,
          b = v.ButtonContainerComponent,
          C = v.LabelContainerComponent;
        return React.default.createElement(
          module1073.default,
          {
            accessibilityComponentType: 'button',
            accessibilityLabel: p,
            accessibilityTraits: 'button',
            testID: 'header-back',
            delayPressIn: 0,
            onPress: n,
            style: T.container,
            borderless: true,
          },
          React.default.createElement(
            module12.View,
            {
              style: T.container,
            },
            React.default.createElement(b, null, this._renderBackImage()),
            'string' == typeof p &&
              React.default.createElement(
                C,
                null,
                React.default.createElement(
                  module12.Text,
                  {
                    onLayout: this._onTextLayout,
                    style: [
                      T.title,
                      !!u && {
                        color: u,
                      },
                      c,
                    ],
                    numberOfLines: 1,
                  },
                  p
                )
              )
          )
        );
      },
    },
  ]);
  return x;
})(React.default.PureComponent);

v.defaultProps = {
  tintColor: '#037aff',
  truncatedTitle: 'Back',
};
var T = module12.StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 17,
      paddingRight: 10,
    },
    icon: {
      height: 21,
      width: 12,
      marginLeft: 9,
      marginRight: 22,
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [
        {
          scaleX: module12.I18nManager.isRTL ? -1 : 1,
        },
      ],
    },
    iconWithTitle: {
      marginRight: 3,
    },
  }),
  b = v;
exports.default = b;
