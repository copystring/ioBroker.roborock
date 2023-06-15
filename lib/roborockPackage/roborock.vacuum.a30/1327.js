exports.BubbleWrapper = function (t) {
  return (function (o) {
    module7.default(h, o);
    var s = y(h);

    function h() {
      module4.default(this, h);
      return s.apply(this, arguments);
    }

    module5.default(h, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(v, null, React.default.createElement(t, this.props));
        },
      },
    ]);
    return h;
  })(v);
};

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1328 = require('./1328');

function y(t) {
  var o = b();
  return function () {
    var n,
      l = module11.default(t);

    if (o) {
      var u = module11.default(this).constructor;
      n = Reflect.construct(l, arguments, u);
    } else n = l.apply(this, arguments);

    return module9.default(this, n);
  };
}

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

var v = (function (t) {
  module7.default(s, t);
  var o = y(s);

  function s(t) {
    var l;
    module4.default(this, s);
    (l = o.call(this, t)).state = {
      size: {
        width: 0,
        height: 0,
        bubbleWidth: 0,
      },
    };
    return l;
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
          l = this,
          u = this.state.size,
          s = u.width,
          h = u.height,
          y = (s / 2) ** (h / 2),
          b = {
            width: s,
            height: h,
            color: '#000000',
            border: 10,
            radius: y,
            opacity: 0.05,
            x: 0,
            y: 0,
          },
          v = h > 0 ? (null != (t = null == (o = this.props) ? undefined : null == (n = o.style) ? undefined : n.opacity) ? t : 1) : 0,
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
                  height: h,
                },
              },
              React.default.createElement(module1328.BoxShadow, {
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
                if (l.props.onLayout) l.props.onLayout(t);
                l.onLayoutBubble(t);
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
