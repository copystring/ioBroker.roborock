var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = T(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, s, u);
        else l[s] = t[s];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (T = function (t) {
    return t ? n : o;
  })(t);
}

function b() {
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

var v = (function (t) {
  module7.default(x, t);

  var module506 = x,
    T = b(),
    v = function () {
      var t,
        o = module11.default(module506);

      if (T) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function x(t) {
    var o;
    module4.default(this, x);
    (o = v.call(this, t)).state = {};
    return o;
  }

  module5.default(x, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this.context.theme,
          module1877 = this.props.isCleanFinished ? require('./1876') : require('./1877'),
          l = this.props,
          c = l.cleanTime,
          s = l.startType,
          u = l.bottomText,
          h = React.default.createElement(module12.Image, {
            style: [
              w.leftIcon,
              {
                marginLeft: 10,
              },
            ],
            source: module1877,
            resizeMode: 'contain',
          }),
          T = React.default.createElement(
            module12.View,
            {
              style: w.leftWrap,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  w.cleanTime,
                  {
                    color: t.cleanHistory.titleColor,
                  },
                ],
              },
              c,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    w.startType,
                    {
                      color: t.cleanHistory.subTitleColor,
                    },
                  ],
                },
                '  ' + s
              )
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  w.bottomText,
                  {
                    color: t.cleanHistory.bottomTextColor,
                  },
                ],
              },
              u
            )
          ),
          b = React.default.createElement(
            module12.View,
            {
              style: w.rightWrap,
            },
            React.default.createElement(module12.Image, {
              style: w.arrow,
              source: t.cleanHistory.arrowImg,
            })
          );
        return React.default.createElement(
          module12.View,
          {
            style: w.outContainter,
          },
          React.default.createElement(
            module12.TouchableHighlight,
            module21.default(
              {
                style: {
                  borderRadius: 8,
                  marginBottom: this.props.isLast ? 15 : 0,
                },
                onPress: this.props.onPress,
                onLongPress: this.props.onLongPress,
                onShowUnderlay: this.props.onShowUnderlay,
                onHideUnderlay: this.props.onHideUnderlay,
              },
              module387.default.getAccessibilityLabel(this.props.accessibilityLabelKey)
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  w.containter,
                  this.props.style,
                  {
                    backgroundColor: t.cleanHistory.backgroundColor,
                  },
                ],
              },
              globals.isRTL && b,
              globals.isRTL && T,
              globals.isRTL && h,
              !globals.isRTL && h,
              !globals.isRTL && T,
              !globals.isRTL && b
            )
          )
        );
      },
    },
  ]);
  return x;
})(React.Component);

exports.default = v;
v.contextType = module506.AppConfigContext;
var w = module12.StyleSheet.create({
  outContainter: {
    paddingHorizontal: 15,
    marginVertical: 7,
  },
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 75,
    borderRadius: 8,
  },
  leftIcon: {
    width: 20,
    height: 20,
  },
  cleanTime: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  startType: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
  },
  bottomText: {
    marginTop: 5,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  rightText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    marginRight: 10,
  },
  arrow: {
    width: 10,
    height: 14,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  leftWrap: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
