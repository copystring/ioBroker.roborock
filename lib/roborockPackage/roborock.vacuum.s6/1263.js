exports.BubbleWrapper = function (t) {
  return (function (l) {
    module7.default(f, l);
    var s = y(f);

    function f() {
      module4.default(this, f);
      return s.apply(this, arguments);
    }

    module5.default(f, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(v, null, React.default.createElement(t, this.props));
        },
      },
    ]);
    return f;
  })(v);
};

var module4 = require('./4'),
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
    var n = p(o);
    if (n && n.has(t)) return n.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, s, c);
        else u[s] = t[s];
      }

    u.default = t;
    if (n) n.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1067 = require('./1067');

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (p = function (t) {
    return t ? n : o;
  })(t);
}

function y(t) {
  var o = b();
  return function () {
    var n,
      u = module11.default(t);

    if (o) {
      var c = module11.default(this).constructor;
      n = Reflect.construct(u, arguments, c);
    } else n = u.apply(this, arguments);

    return module9.default(this, n);
  };
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
  module7.default(s, t);
  var l = y(s);

  function s(t) {
    var n;
    module4.default(this, s);
    (n = l.call(this, t)).state = {
      size: {
        width: 0,
        height: 0,
        bubbleWidth: 0,
      },
    };
    return n;
  }

  module5.default(s, [
    {
      key: 'onLayoutBubble',
      value: function (t) {
        var o = {
          width: t.nativeEvent.layout.width,
          height: t.nativeEvent.layout.height,
        };
        if (!(this.state.size.width == o.width && this.state.size.height == o.height))
          this.setState({
            size: o,
          });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          o,
          n,
          u = this,
          l = this.state.size,
          s = l.width,
          p = l.height,
          y = (s / 2) ** (p / 2),
          b = {
            width: s,
            height: p,
            color: '#000000',
            border: 10,
            radius: y,
            opacity: 0.05,
            x: 0,
            y: 0,
          },
          v = p > 0 ? (null != (t = null == (o = this.props) ? undefined : null == (n = o.style) ? undefined : n.opacity) ? t : 1) : 0,
          B = (this.props.style && this.props.style.backgroundColor) || 'white';
        return React.default.createElement(
          module12.View,
          {
            style: [
              {
                flexDirection: 'column',
                alignItems: 'center',
                opacity: v,
                paddingBottom: this.props.hasBottomDecorator ? 5 : 0,
              },
            ],
          },
          this.props.hasShadow &&
            React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: s,
                  height: p,
                },
              },
              React.default.createElement(module1067.BoxShadow, {
                setting: b,
              })
            ),
          React.default.createElement(
            module12.View,
            {
              style: [
                {
                  backgroundColor: 'white',
                  borderRadius: y,
                },
                this.props.style,
              ],
              onLayout: function (t) {
                if (u.props.onLayout) u.props.onLayout(t);
                u.onLayoutBubble(t);
              },
            },
            this.props.children,
            this.props.hasBottomDecorator &&
              React.default.createElement(module12.View, {
                style: [
                  w.bottomTriangleContent,
                  {
                    borderTopColor: B,
                  },
                ],
              })
          )
        );
      },
    },
  ]);
  return s;
})(React.default.Component);

exports.Bubble = v;
v.defaultProps = {
  hasShadow: true,
  hasBottomDecorator: true,
};
var w = module12.StyleSheet.create({
  bottomTriangleContent: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -5,
    width: 5,
    borderLeftColor: 'transparent',
    borderLeftWidth: 5.5,
    borderTopWidth: 5,
    borderTopColor: 'white',
    borderRightWidth: 5.5,
    borderRightColor: 'transparent',
  },
});
