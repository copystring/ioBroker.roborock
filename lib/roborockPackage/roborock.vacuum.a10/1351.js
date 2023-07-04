require('./387');

require('./377');

var React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = c(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = f ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506'),
  module1063 = require('./1063');

function c(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (c = function (t) {
    return t ? o : n;
  })(t);
}

require('./389');

require('./491').strings;
var s = React.forwardRef(function (t, c) {
    var s = React.useContext(module506.AppConfigContext).theme,
      y = t.children,
      h = t.info,
      w = t.icon,
      v = t.actionIcon,
      x = t.action,
      C = React.useRef(),
      b = React.useRef();
    React.useImperativeHandle(c, function () {
      return {
        cleanButton: function () {
          return C.current;
        },
        chargeButton: function () {
          return b.current;
        },
      };
    });
    var j = React.default.createElement(
      module12.View,
      {
        style: p.container,
      },
      React.default.createElement(
        module381.GradientView,
        {
          colors: s.infoWrapper.gradientColors,
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
            paddingBottom: module1063.BottomControlBottom,
            marginBottom: -module1063.BottomControlBottom,
          },
        },
        React.default.createElement(
          module12.View,
          {
            style: p.top,
          },
          w &&
            React.default.createElement(module12.Image, {
              source: w,
              style: p.icon,
            }),
          React.default.createElement(
            module12.Text,
            {
              style: [
                p.tip,
                {
                  color: s.mainTextColor,
                },
              ],
            },
            h
          ),
          v &&
            React.default.createElement(module381.PureImageButton, {
              style: {
                width: 40,
                height: 20,
                paddingLeft: 20,
              },
              image: v,
              imageWidth: 14,
              imageHeight: 14,
              onPress: function () {
                if (!(null == x)) x();
              },
            })
        ),
        y
      )
    );
    return h ? j : y;
  }),
  p = module12.StyleSheet.create({
    container: {
      width: module12.Dimensions.get('window').width,
    },
    top: {
      paddingVertical: 10,
      paddingHorizontal: module1063.HorizontalMargin,
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
  y = s;
exports.default = y;
