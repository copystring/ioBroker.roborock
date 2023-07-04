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
  module9.default(x, t);

  var v = x,
    b = p(),
    C = function () {
      var t,
        n = module12.default(v);

      if (b) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function x() {
    var t;
    module6.default(this, x);
    (t = C.call(this, ...args)).state = {};

    t._onTextLayout = function (n) {
      if (!t.state.initialTextWidth)
        t.setState({
          initialTextWidth: n.nativeEvent.layout.x + n.nativeEvent.layout.width,
        });
    };

    return t;
  }

  module7.default(x, [
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
            t = module13.Image;
            n = {
              style: [
                T.icon,
                !!c && T.iconWithTitle,
                !!u && {
                  tintColor: u,
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
          module1250.default,
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
            module13.View,
            {
              style: T.container,
            },
            React.default.createElement(b, null, this._renderBackImage()),
            'string' == typeof p &&
              React.default.createElement(
                C,
                null,
                React.default.createElement(
                  module13.Text,
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
var T = module13.StyleSheet.create({
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
          scaleX: module13.I18nManager.isRTL ? -1 : 1,
        },
      ],
    },
    iconWithTitle: {
      marginRight: 3,
    },
  }),
  b = v;
exports.default = b;
