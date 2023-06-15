require('./391');

require('./381');

var module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1200 = require('./1200'),
  module1435 = require('./1435');

function p(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      p(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      p(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

require('./393');

require('./510').strings;
var h = React.forwardRef(function (t, n) {
    var o = React.useContext(module1200.AppConfigContext).theme,
      p = t.children,
      h = t.info,
      O = undefined === h ? '****' : h,
      w = t.icon,
      j = t.actionIcon,
      v = t.action,
      P = React.useRef(),
      x = React.useRef();
    React.useImperativeHandle(n, function () {
      return {
        cleanButton: function () {
          return P.current;
        },
        chargeButton: function () {
          return x.current;
        },
      };
    });
    var C =
        w &&
        React.default.createElement(module13.Image, {
          source: w,
          style: y(
            y({}, b.icon),
            {},
            {
              marginLeft: globals.isRTL ? 20 : 0,
            }
          ),
        }),
      B =
        j &&
        React.default.createElement(module385.PureImageButton, {
          style: {
            width: 40,
            height: 20,
            paddingLeft: globals.isRTL ? 0 : 20,
            transform: [
              {
                rotate: globals.isRTL ? '180deg' : '0deg',
              },
            ],
          },
          image: j,
          imageWidth: 14,
          imageHeight: 14,
          onPress: function () {
            if (!(null == v)) v();
          },
        }),
      E = React.default.createElement(
        module13.View,
        {
          style: {
            width: module13.Dimensions.get('window').width,
          },
        },
        React.default.createElement(
          module13.TouchableWithoutFeedback,
          {
            onPress: function () {
              if (!(null == v)) v();
            },
            accessible: false,
          },
          React.default.createElement(
            module385.GradientView,
            {
              colors: o.infoWrapper.gradientColors,
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 0,
                y: 1,
              },
              style: {
                backgroundColor: '#ffffff',
                flex: 1,
                justifyContent: 'flex-end',
                borderRadius: 10,
                alignItems: 'center',
                paddingBottom: module1435.BottomControlBottom,
                marginBottom: -module1435.BottomControlBottom,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: b.top,
              },
              globals.isRTL ? B : C,
              '****' != O &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      b.tip,
                      {
                        color: o.mainTextColor,
                      },
                    ],
                  },
                  O
                ),
              globals.isRTL ? C : B
            ),
            p
          )
        )
      );
    return O ? E : p;
  }),
  b = module13.StyleSheet.create({
    top: {
      paddingVertical: 10,
      paddingHorizontal: module1435.HorizontalMargin,
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    tip: {
      fontSize: 12,
      paddingHorizontal: 10,
      flex: 1,
    },
    icon: {
      width: 34,
      height: 16.5,
    },
  }),
  O = h;
exports.default = O;
